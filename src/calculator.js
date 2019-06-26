import eq from './data/equations';

class Calculator {

    constructor(bombYield){
        this.bombYield = parseFloat(bombYield);
        this.ambientPressure = 14.7; //normal pressure equal to 1 atm. Units are psi
        this._nLog = this._nLog.bind(this);
    }

    //These will be helper functions for calculating the equations

    _mi2km(distMi){
        return distMi* 1.60934;
    }

    //this function retrieves the right equation based on the id of the equation in the hash, and takes in a log base 
    //based on the one given in the source text, and outputs the appropriate result

    _eqOutput(id, x, logbase) {
        return this._polyLog(x, eq[id].args, logbase);
    }

    //logarithm function to a specified base 
    //we use conditionals for 2 and 10 instead of only putting the last conditional statement
    //because the built-in base 10 and base 2 functions take care of floating point inconsistencies that the 
    //log base converter would show. Not significant, but why not?

    _nLog(base, n) {
        if (base === Math.E) {
            //return natural logarithm if base is euler's constant
            return Math.log(n);
        } else if (base === 10) {
            //return logarithm with a base 10
            return Math.log10(n);
        } else if (base === 2) {
            //return logarithm with a base of 2
            return Math.log2(n);
        } else {
            //return logarithm for any other log base
            return (Math.log(n)) / (Math.log(base));
        }
    }

    //runs the polynomial
    _polyLog(x, args, logbase=10) {
        const logN = this._nLog(logbase, x);

        const y = this._polynomial(logN, args);

        return logbase**y;
    }

    //polynomial builder 
    _polynomial(x, args){
        var y = 0;
        for (let i = 0; i < args.length; i++) {
            y += args[i] * (x**i);
        }
        return y;
    }

    //scales from one bombYield effect to another  according to the cube root law
    //takes in a distance and bombyield to reference 
    _scalebombYield(bombYield, distScale, bombYieldScale) {
        return distScale * (bombYieldScale/ bombYield)**(-1 / 3);
    }

    //initial nuclear radiation (rem)
    //input is distance (slant range), bombYield, airburst (bool); output is rem
    //We note that the initial radiation dose (gamma + neutron radiation emitted by uranium/plutonium after fission)
    //is greater for a surface impact than an higher altitude detonation
    //for very small yields (< 10 kt) the scaling ratio of the yield reaches unity
    getOnsetNuclearRadiation(distance, bombYield, airburst) {
            let scalingRatio;
            let surface;
            let densityRatio;

            if (bombYield < 10) {
                scalingRatio = 1;
            } else {
                scalingRatio = this._eqOutput('2-115', bombYield);
            }

            if (airburst === true) { //scales for surface vs. airbursts
                surface = 1;
                densityRatio = 0.9;
            } else {
                surface = 2 / 3;
                densityRatio = 1;
            }

            //eq. 2-116
            const r = (bombYield / distance**2) * (4997.41 * Math.exp(-9.263158 * (densityRatio) * distance) + (surface * 1033) * (scalingRatio) * Math.exp(-5.415384 * (densityRatio) * distance));
            return r;
    }

    //initial nuclear radiation (distance)
	//input is yield and rem; output is slant range
    getOnsetNuclearRadiationRadius(bombYield, radRem){

                const a = +0.1237561; const aPrime = +0.0143624;
                const b = +0.0994027; const bPrime = -0.0000816;
                const c = +0.0011878; const cPrime = -0.0000014;
                const d = -0.0002481; const dPrime = +0.0054734;
                const e = +0.0000096; const ePrime = -0.0003272;
                const f = -0.1308215; const fPrime = +0.0000106;
                const g = +0.0009881; const gPrime = -0.0001220;
                const h = -0.0032363; const hPrime = +0.0000217; //note! h is positive in the original, but this gives nonsense answers
                const i = +0.0000111; const iPrime = -0.0000006; 

                const logI = this._nLog(10,radRem);
                const logI2 = logI**2;
                const logI3 = logI**3;
                const logW = this._nLog(10, bombYield);

                //eq. 2.116	
                let distance = a + (b + aPrime * logI + dPrime * logI2 + gPrime * logI3) * logW;
                distance += (c + bPrime * logI + ePrime * logI2 + hPrime * logI3) * (logW**3);
                distance += (d + (cPrime * logI) + (fPrime * logI2) + (iPrime * logI3)) * (logW**5);
                distance += (e * (logW**7)) + (f * logI) + (g * logI2) + (h * logI3);
                distance += (i * (logI**5));

                return 10**distance;

    }


    getAirBurstRadius(bombYield, airburst){

    }

    //maximum fireball radius, input yield and whether airburst, output miles
    getFireballRadius(bombYield, airburst){
        switch (airburst) {
            case (false): 
                return 0.04924 * (bombYield**0.4);  //surface
            case (true): 
                return 0.03788 * (bombYield**0.4);  //airburst
            default: 
                return 0.04356 * (bombYield**0.4);  //average
        }
    }

    //For airbursts only, this is the minimum height from the ground the detonation needs to occur for the 
    //radioactive fallout to be considered negligible
    getMinHeightNegligibleFallout(bombYield){
        return 0.03409 * (bombYield**0.4); 
    }

    getCraterParams(bombYield, terrain){
        const crater = {};
        switch(terrain) {
          case('soil'):
            crater.lip = 0.02398 * (bombYield**1 / 3); //lip
            crater.apparentDiam = 0.01199 * (bombYield**1 / 3); //apparent
            crater.apparentDepth = 0.005739 * (bombYield**1 / 3); //depth
            return crater;
          case('rock'): 
            crater.lip = 0.01918 * (bombYield**1 / 3); //lip
            crater.apparentDiam = 0.009591 * (bombYield**1 / 3); //apparent
            crater.apparentDepth = 0.004591 * (bombYield**1 / 3); //depth 
            return crater;
        }
    }

    // input is yield and one of the following strings:
    //    _1st-50: 50% chance of 1st degree burn
    //    _2nd-50: 50% chance of 2nd degree burn
    //    _3rd-50: 50% chance of 3rd degree burn
    //    _3rd-100: 100% chance of 3rd degree burn
    //    noharm-100: 100% chance of no thermal damage (min radius)
    //    output is in q (cal/cm^2), based on Glasstone and Dolan 1977
    getThermalRadiation(bombYield, paramType){
        switch (paramType) {
            case ('_1st-50'): 
                return this._nLog(Math.E, this._eqOutput('77-12.65-1st-50', bombYield, Math.E)); 
            case ('_2nd-50'): 
                return this._nLog(Math.E, this._eqOutput('77-12.65-2nd-50', bombYield, Math.E)); 
            case ('_3rd-50'): 
                return this._nLog(Math.E, this._eqOutput('77-12.65-3rd-50', bombYield, Math.E)); 
            case ('_3rd-100'): 
                return this._nLog(Math.E, this._eqOutput('77-12.65-3rd-100', bombYield, Math.E)); 
            case ('_noharm-100'): 
                return this._nLog(Math.E, this._eqOutput('77-12.65-noharm-100', bombYield, Math.E)); 
        }
    }

    getThermalRadiationDistance(radiation, bombYield, airburst){
            switch (airburst) {
                case (true): 
                    return this._eqOutput('2-108', radiation * (bombYield**-1));  //airburst
                case (false): 
                    return this._eqOutput('2-108', radiation * ( (0.7 * bombYield)**-1) ); //surface
            }
    }

    getThermalRadiationRadius(bombYield, thermalType, airburst){
        let distScale;
        let d;

            if (bombYield < 1) {
                //low yield scaling					
                distScale = this.getThermalRadiationDistance(this.getThermalRadiation(1, thermalType), 1, airburst);
                d = this._scalebombYield(bombYield, distScale, 1);
            } else if (bombYield > 20000) {
                //high yield scaling					
                distScale = this.getThermalRadiationDistance(this.getThermalRadiation(bombYield, thermalType), 20000, airburst);
                d = this._scalebombYield(bombYield, distScale, 20000);
            } else {
                //default range
                d = this.getThermalRadiationDistance(this.getThermalRadiation(bombYield, thermalType), bombYield, airburst);
            }

        return d;
    }

    //gives you the height of burst in order to maximum the range of a given overpressure at a given yield
	//input is yield and overpressure, output is feet
	getOptimumHeightOverpressure(bombYield, maxOverpressure) {
        return this._eqOutput('2-78', maxOverpressure) / (1 / bombYield**(1 / 3) );
    }

    //calculates the burst altitude from distance and a yield, output is feet
    //maximizes overpressure at a given distance
    getOptimumBurstHeight(distance, bombYield) {
        return this._eqOutput('2-79', distance * ( 1 / bombYield**(1 / 3) )) / ( (1 / bombYield)**(1 / 3) );
    }


    //input is psi, output is scaled range
    getMaxOverpressureRange(x, airburst) {
        switch (airburst) {
            case (false): 
                return this._eqOutput('2-5', x);
            case (true): 
                return this._eqOutput('2-61', x);
        }
    }

    //input is scaled range, output in psi
    getMaxOverpressurePsi(x, airburst) {
        switch (airburst) {
            case (false): 
                return this._eqOutput('2-4', x);
            case (true): 
                return this._eqOutput('2-60', x);
        }
    }

    //input is scaled range, output in psi
    getMaxDynamicPressurePsi(x, airburst) {
        switch (airburst) {
            case (false):
                 return this._eqOutput('2-6', x);
            case (true): 
                if (x < 0.154) {
                    return this._eqOutput('2-64', x);
                } else {
                    return this._eqOutput('2-62', x);
                }
        }
    }


    //input in scaled range, output in mph
    getMaxWindVelocityMph(x, airburst) {
        switch (airburst) {
            case (false): 
                return this._eqOutput('2-16', x);
            case (true): 
                if (x > 0.2568) {
                    return this._eqOutput('2-74', x);
                } else {
                    return this._eqOutput('2-76', x);
                }
        }
    }	

    
   
}

export default Calculator;

   // //simple linear interpolation -- returns x3 for a given y3
    // _lerp(x1, y1, x2, y2, y3) {
    //     if (y2 == y1) {
    //         return false; //division by zero avoidance
    //     } else {
    //         return ((y2 - y3) * x1 + (y3 - y1) * x2) / (y2 - y1);
    //     }
    // }

    // //turns distance (miles) and yield into scaled range
    // this.scaled_range = function (distance, bombYield) {
    //     return distance * Math.pow(1 / bombYield, 1 / 3) * Math.pow(this.ambient_pressure / 14.7, 1 / 3);
    // }

    // //gets distance from scaled range if bombYield is known
    // //returns in miles
    // this.distance_from_scaled_range = function (scaled_range, bombYield) {
    //     return scaled_range / Math.pow(1 / bombYield, 1 / 3) * Math.pow(this.ambient_pressure / 14.7, 1 / 3);
    // }

    // //gets bombYield from scaled range if distance is known
    // this.bombYield_from_scaled_range = function (scaled_range, distance) {
    //     return 1 / Math.pow(scaled_range / distance / Math.pow(this.ambient_pressure / 14.7, 1 / 3), 3);
    // }