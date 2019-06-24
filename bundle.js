/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/nuclear.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calculator.js":
/*!***************************!*\
  !*** ./src/calculator.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_equations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/equations */ "./src/data/equations.js");


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
        return this._polyLog(x, _data_equations__WEBPACK_IMPORTED_MODULE_0__["default"][id].args, logbase);
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

/* harmony default export */ __webpack_exports__["default"] = (Calculator);

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

/***/ }),

/***/ "./src/data/data.js":
/*!**************************!*\
  !*** ./src/data/data.js ***!
  \**************************/
/*! exports provided: bombData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bombData", function() { return bombData; });

//Store nuclear bomb / warhead data to be displayed in selector, in addition to a custom yield input

const bombData = {

    //usa first

    'Davy Crockett': {
        yield: '0.02 kt [TNT]',
        origin: 'U.S.A',
        date: '7-July-1962' ,
        dropLocation: 'Nevada Test Site, Nevada' ,
        description: "The M-28 or M-29 Davy Crockett Weapon System was the tactical nuclear recoilless gun\
        for firing the M-388 nuclear projectile that was deployed by the United States during the Cold War.\
        It was one of the smallest nuclear weapon systems ever built, and was developed for use against Soviet\
        and North Korean armor and troops in case war broke out in Europe or the Korean peninsula. The M-388 round\
        used a version of the Mk-54 warhead, a very small sub-kiloton fission device. Tested under the code-name\
        Little-Feller nuclear test."

    },
    
    'Little Boy': {
        yield: '15 kt [TNT]',
        origin: 'U.S.A',
        date: '6-August-1945' ,
        dropLocation: 'Hiroshima, Japan',
        description: "First atomic bomb dropped on the Japanese city of Hiroshima during World War II.\
        It was the first nuclear weapon used in warfare. The Hiroshima bombing was the second man-made\
        nuclear explosion in history, after the Trinity test, and the first uranium-based detonation.\
        Its components were fabricated at three different plants so that no one would have a copy of the\
        complete design. After the war ended, it was not expected that the inefficient Little Boy design\
        would ever again be required, and many plans and diagrams were destroyed."
    },
    'Fat Man': {
        yield: '15 kt [TNT]',
        origin: 'U.S.A',
        date: '9-August-1945',
        dropLocation: 'Nagasaki, Japan',
        description: "Implosion type plutonium-239 fission bomb (the second of the two nuclear weapons used in warfare).\
        The name Fat Man refers to the early design of the bomb because it had a wide, round shape; it was also known as\
        the Mark III. The first of that type to be detonated was the Gadget in the Trinity nuclear test less than a month earlier.\
        The Fat Man was retired in 1950."
    },
    // 'W-76': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-80': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-87': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'B-61 Mod 7': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-87': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-88': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'Ivy-King': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-59': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'B-83': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-39': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-53': {
    //     yield: ,
    //     origin: 'U.S.A'Ivy-Mike
    //     date:   ,
    //     dropLocation: ,Ivy-Mike
    //     description:

    // },
    'Ivy-Mike': {
        yield: '104000.0 kt [TNT]' ,
        origin: 'U.S.A',
        date: '1-November-1952'  ,
        dropLocation: 'Enewetak Atoll, Marshall Islands',
        description: " Designed by Richard Garwin, a student of Enrico Fermi, Ivy Mike\
        was the first test of a thermonuclear device, in which part of the explosive yield\
        comes from nuclear fusion, also known as a hydrogen bomb. It was detonated as part of Operation Ivy.\
        It was the first full test of the Teller–Ulam design, a staged fusion device.Due to its physical size\
        and fusion fuel type(cryogenic liquid deuterium), the Mike device was not suitable for use as a deliverable weapon.\
        In fact, the 82-ton device was essentially a building that resembled a factory rather than a weapon.\
        At its center, a very large cylindrical thermos flask or cryostat held the cryogenic deuterium fusion fuel.\
        A regular fission bomb at one end was used to create the conditions needed to initiate the fusion reaction."
    },
    'Castle-Bravo': {
        yield: '15000.0 kt [TNT]',
        origin: 'U.S.A',
        date:  '1-March-1954' ,
        dropLocation: 'Bikini Atoll, Marshall Islands' ,
        description: 
        "The first test of a deployable (solid fuel) thermonuclear weapon.\
        Also (accidentally) the largest weapon ever tested by \
        the United States (15 megatons). It was also the single largest U.S. radiological\
        accident in connection with nuclear testing. \
        The unanticipated yield,\
        and a change in the weather, resulted in nuclear fallout spreading eastward onto\
        the inhabited Rongelap and Rongerik atolls, which were soon evacuated.\
        Many of the Marshall Islands natives have since suffered from birth defects and have received\
        some compensation from the federal government of the United States. A Japanese fishing boat,\
        the Daigo Fukuryū Maru, also came into contact with the fallout, which caused many of the crew to grow ill;\
        one eventually died."

    },
    'Gadget': {
        yield: '22.1 kt [TNT]',
        origin: 'U.S.A',
        date: '16-July-1945',
        dropLocation: 'Soccoro, New Mexico',
        description: "The first detonation of a nuclear weapon in the Trinity test, as part of the Manhattan Project.\
        Bomb was an implosion-design plutonium device, of the same design as the Fat Man bomb later detonated over Nagasaki.\
        The complexity of the design required a major effort from the Los Alamos Laboratory, and concerns about whether it would\
        work led to a decision to conduct the first nuclear test."

    },
};

//More bomb data to implement possibly later when I have time.
// 'B61 Mod 3': {                       
//         yield: ,
//         origin: 'U.S.A' ,
//         date:  ,
//         dropLocation: ,
//         description: ""

//     },


/***/ }),

/***/ "./src/data/equations.js":
/*!*******************************!*\
  !*** ./src/data/equations.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

//Sources for the blast characteristics equations come from:
//      E.Royce Fletcher, Ray W.Albright, Robert F.D.Perret,
//      Mary E.Franklin, I.Gerald Bowen, and Clayton S.White,
//      "NUCLEAR BOMB EFFECTS COMPUTER (Including Slide-rule Design
//      and Curve Fits for Weapons Effects), " (CEX-62.2) U.S. Atomic Energy Commission
//      Civil Effects Test Operations, February 1963.
//
//      Samuel Glasstone and Philip J. Dolan, THE EFFECTS OF NUCLEAR WEAPONS, 1977 edn.

//The organization and derivation of the equations can be attributed to Alex Wellerstein from NuclearSecrecy
//and credit should go to him for the data organization of this part

//this will hold all the constants and range data of parameters in our blast characteristics
// used in performing our calculations

const eq = {};

eq['2-4'] = [];
eq['2-4'].xmin = 0.0472;
eq['2-4'].xmax = 4.82;
eq['2-4'].args = [-0.1877932, -1.3986162, 0.3255743, -0.0267036];
eq['2-4'].desc = "Max overpressure (surface): psi from scaled range";

//Eq. 2.5 - maximum overpressure at 0 feet; input is psi; output in scaled range
eq['2-5'] = [];
eq['2-5'].xmin = 0.1;
eq['2-5'].xmax = 200;
eq['2-5'].args = [-0.1307982, -0.6836211, 0.1091296, -0.0167348];
eq['2-5'].desc = "Max overpressure (surface): scaled range from psi";

//Eq. 2.19 - maximum overpressure at 100 feet; input is psi; output in scaled range
eq['2-19'] = [];
eq['2-19'].xmin = 1;
eq['2-19'].xmax = 200;
eq['2-19'].args = [-0.0985896, -0.6788230, 0.0846268, -0.0089153];
eq['2-19'].desc = "Max overpressure (100 ft): scaled range from psi";

//Eq. 2.25 - maximum overpressure at 200 feet; input is psi; output in scaled range
eq['2-25'] = [];
eq['2-25'].xmin = 1;
eq['2-25'].xmax = 200;
eq['2-25'].args = [-0.0564384, -0.7063068, 0.0838300, -0.0057337];
eq['2-25'].desc = "Max overpressure (200 ft): scaled range from psi";

//Eq. 2.31 - maximum overpressure at 300 feet; input is psi; output in scaled range
eq['2-31'] = [];
eq['2-31'].xmin = 1;
eq['2-31'].xmax = 100;
eq['2-31'].args = [-0.0324052, -0.6430061, -0.0307184, 0.0375190];
eq['2-31'].desc = "Max overpressure (300 ft): scaled range from psi";

//Eq. 2.37 - maximum overpressure at 400 feet; input is psi; output in scaled range
eq['2-37'] = [];
eq['2-37'].xmin = 1;
eq['2-37'].xmax = 50;
eq['2-37'].args = [-0.0083104, -0.6809590, 0.0443969, 0.0032291];
eq['2-37'].desc = "Max overpressure (400 ft): scaled range from psi";

//Eq. 2.43 - maximum overpressure at 500 feet; input is psi; output in scaled range
eq['2-43'] = [];
eq['2-43'].xmin = 1;
eq['2-43'].xmax = 50;
eq['2-43'].args = [0.0158545, -0.7504681, 0.1812493, -0.0573264];
eq['2-43'].desc = "Max overpressure (500 ft): scaled range from psi";

//Eq. 2.49 - maximum overpressure at 600 feet; input is psi; output in scaled range
eq['2-49'] = [];
eq['2-49'].xmin = 1;
eq['2-49'].xmax = 30;
eq['2-49'].args = [0.0382755, -0.8763984, -0.4701227, -0.02046373];
eq['2-49'].desc = "Max overpressure (600 ft): scaled range from psi";

//Eq. 2.55 - maximum overpressure at 700 feet; input is psi; output in scaled range
eq['2-55'] = [];
eq['2-55'].xmin = 1;
eq['2-55'].xmax = 20;
eq['2-55'].args = [0.0468997, -0.7764501, 0.3312436, -0.1647522];
eq['2-55'].desc = "Max overpressure (700 ft): scaled range from psi";

//Eq. 2.61 - maximum overpressure at optimum blast height; input is psi; output in scaled range
eq['2-61'] = [];
eq['2-61'].xmin = 1;
eq['2-61'].xmax = 200;
eq['2-61'].args = [0.1292768, -0.7227471, 0.0147366, 0.0135239];
eq['2-61'].desc = "Max overpressure (OBH): scaled range from psi";

//Eq. 2.60 - maximum overpressure at optimum height of burst; input is scaled range; output in psi
eq['2-60'] = [];
eq['2-60'].xmin = 0.0508;
eq['2-60'].xmax = 1.35;
eq['2-60'].args = [0.1829156, -1.4114030, -0.0373825, -0.1635453];
eq['2-60'].desc = "Max overpressure (OBH): psi from scaled range";

//Eq. 2.6 - maximum dynamic pressure at 0 feet; input is scaled range; output in psi
eq['2-6'] = [];
eq['2-6'].xmin = 0.0615;
eq['2-6'].xmax = 4.73;
eq['2-6'].args = [-1.9790344, -2.7267144, 0.5250615, -0.1160756];
eq['2-6'].desc = "Max dynamic pressure (surface): psi from scaled range";

//Eq. 2.62 - maximum dynamic pressure at optimum height of burst; input is scaled range; output in psi
eq['2-62'] = [];
eq['2-62'].xmin = 0.154;
eq['2-62'].xmax = 1.37;
eq['2-62'].args = [1.2488468, -2.7368746];
eq['2-62'].desc = "Max dynamic pressure (OBH): psi from scaled range";

//Eq. 2.64 - maximum dynamic pressure at optimum height of burst; input is scaled range; output in psi
eq['2-64'] = [];
eq['2-64'].xmin = 0.0932;
eq['2-64'].xmax = 0.154;
eq['2-64'].args = [-3.8996912, -6.0108828];
eq['2-64'].desc = "Max dynamic pressure (OBH): psi from scaled range";

//Eq. 2.8 - duration of positive overpressure at 0 feet; input is scaled range; output in sec
eq['2-8'] = [];
eq['2-8'].xmin = 0.0677;
eq['2-8'].xmax = 0.740;
eq['2-8'].args = [-0.1739890, 0.5265382, -0.0772505, 0.0654855];
eq['2-8'].desc = "Duration of positive overpressure (surface): sec from scaled range";

//Eq. 2.12 - blast wave arrival time at 0 feet; input is scaled range; output in sec
eq['2-12'] = [];
eq['2-12'].xmin = 0.0570;
eq['2-12'].xmax = 1.10;
eq['2-12'].args = [0.6078753, 1.1039021, -0.2836934, 0.1006855];

//Eq. 2.16 - maximum wind velocity at 0 feet; input is scaled range; output in mph
eq['2-16'] = [];
eq['2-16'].xmin = 0.0589;
eq['2-16'].xmax = 4.73;
eq['2-16'].args = [1.3827823, -1.3518147, 0.1841482, 0.0361427];

//Eq. 2.74 - maximum wind velocity at optimum burst height; input is scaled range; output in mph
eq['2-74'] = [];
eq['2-74'].xmin = 0.2568;
eq['2-74'].xmax = 1.4;
eq['2-74'].args = [1.7110032, -1.2000278, 0.8182584, 1.0652528];

//Eq. 2.76 - maximum wind velocity at optimum burst height; input is scaled range; output in mph
eq['2-76'] = [];
eq['2-76'].xmin = 0.0762;
eq['2-76'].xmax = 0.2568;
eq['2-76'].args = [3.8320701, 5.6357427, 6.6091754, 1.5690375];

/* OPTIMUM HEIGHT OF BURST */

//Eq. 2.78 - optimum height of burst for given overpressure; input is maximum overpressure; output is scaled height
eq['2-78'] = [];
eq['2-78'].xmin = 1;
eq['2-78'].xmax = 200;
eq['2-78'].args = [3.2015016, -0.3263444];

//Eq. 2.79 - optimum height of burst to maximize overpressure; input is scaled range; output is scaled height
eq['2-79'] = [];
eq['2-79'].xmin = 0.0512;
eq['2-79'].xmax  = 1.35;
eq['2-79'].args = [3.1356018, 0.3833517, -0.1159125];

/* THERMAL RADIATION */

//Eq. 2.106 - thermal radiation, input is slant range, for airburst, output is Q(1/W); for surface, input is range, output is Q(1/.7W)
eq['2-106'] = [];
eq['2-106'].xmin = 0.05;
eq['2-106'].xmax  = 50;
eq['2-106'].args = [-0.0401874, -2.0823477, -0.0511744, -0.0074958];

//Eq. 2.108 - thermal radiation, input for airburst is Q(1/W); for surface, is Q(1/.7W); output is distance/slant distance
eq['2-108'] = [];
eq['2-108'].xmin = 0.0001;
eq['2-108'].xmax  = 100;
eq['2-108'].args = [-0.0193419, -0.4804553, -0.0055685, 0.0002013];

//Eq. 2.110 - thermal radiation for 1st degree burns; input is yield, output is Q (cal/cm^2)
eq['2-110'] = [];
eq['2-110'].xmin = 1;
eq['2-110'].xmax  = 100000;
eq['2-110'].args = [0.3141555, 0.059904, 0.0007636, -0.0002015];

//Eq. 2.111 - thermal radiation for 2nd degree burns; input is yield, output is Q (cal/cm^2)
eq['2-111'] = [];
eq['2-111'].xmin = 1;
eq['2-111'].xmax  = 100000;
eq['2-111'].args = [0.6025982, 0.0201394, 0.0139640, 0.0008559];

/* Following 5 equations derived from figure 12.65 of Glasstone and Dolan 1977 */

// These are technically only bound between 1kt and 20 MT but the scaling looks fine enough 
//Eq. 77-12.65-1st-50 - thermal radiation for 50% probability of an unshielded population for 1st degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-1st-50'] = [];
eq['77-12.65-1st-50'].xmin = 1;
eq['77-12.65-1st-50'].xmax  = 20000;
eq['77-12.65-1st-50'].args = [1.93566176470914, 0.325315457507999, -0.113516274769641, 0.0300971575115961, -0.00330445814836616, 0.000129665656335876];

//Eq. 77-12.65-2nd-50 - thermal radiation for 50% probability of an unshielded population for 2nd degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-2nd-50'] = [];
eq['77-12.65-2nd-50'].xmin = 1;
eq['77-12.65-2nd-50'].xmax  = 20000;
eq['77-12.65-2nd-50'].args = [4.0147058823566697E+00, 3.7180525416799937E-01, -4.5026131075683193E-02, 1.3549565337157871E-02, -1.6559848551158524E-03, 7.0380159845451207E-05];

//Eq. 77-12.65-3rd-50 - thermal radiation for 50% probability of an unshielded population for 3rd degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-3rd-50'] = [];
eq['77-12.65-3rd-50'].xmin = 1;
eq['77-12.65-3rd-50'].xmax  = 20000;
eq['77-12.65-3rd-50'].args = [5.9981617647112317E+00, 5.3350791551060528E-01, -2.3435878115600033E-02, 1.0395274013807305E-02, -1.4366360115630195E-03, 6.3930657856814399E-05];

//Eq. 77-12.65-noharm-100 - thermal radiation for 100% probability of an unshielded population for no burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-noharm-100'] = [];
eq['77-12.65-noharm-100'].xmin = 1;
eq['77-12.65-noharm-100'].xmax  = 20000;
eq['77-12.65-noharm-100'].args = [1.14705882353066, 0.124659908645308, -0.0160088216223604, 0.00359441786929512, -0.000263841056172493, 0.0000053050769836388];

//Eq. 77-12.65-3rd-100 - thermal radiation for 100% probability of an unshielded population for 3rd degree burns
//input is yield, output is Q (cal/cm^2)
eq['77-12.65-3rd-100'] = [];
eq['77-12.65-3rd-100'].xmin = 1;
eq['77-12.65-3rd-100'].xmax  = 20000;
eq['77-12.65-3rd-100'].args = [7.0018382352996857, 0.55437306382914320, 0.056501270479506649, -0.015219252753643841, 0.0017062986685328282, -0.000067950215125955893];


/* INITIAL NUCLEAR RADIATION */

//Eq. 2.115 - ratio of scaling factor to yield, used for 2.114; input is yield, output is scaling factor
eq['2-115'] = [];
eq['2-115'].xmin = 10;
eq['2-115'].xmax  = 20000;
eq['2-115'].args = [-2.1343121, 5.6948378, -5.7707609, 2.7712520, -0.6206012, 0.0526380];

/* harmony default export */ __webpack_exports__["default"] = (eq);





/***/ }),

/***/ "./src/nuclear.js":
/*!************************!*\
  !*** ./src/nuclear.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidepanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidepanel */ "./src/sidepanel.js");
/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculator */ "./src/calculator.js");



document.addEventListener('DOMContentLoaded', () => {

    function getPosition(){
        return new Promise((resolve, reject) => {
            function success(position) {
                    // for when getting location is a success
                    const coordinates = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }
                    resolve(coordinates);
            }

            function error(error_message) {
                        // for when getting location results in an error
                        reject(console.error('An error has occured while retrieving location', error_message));
            }  

            if ("geolocation" in navigator) {
                // check if geolocation is supported/enabled on current browser
                const mapOptions = {
                    enableHighAccuracy: true
                }
                navigator.geolocation.getCurrentPosition(
                        success,
                        error,
                        mapOptions
                );

            } else {
            // geolocation is not supported
            // get your location some other way
                alert('geolocation is not enabled on this browser')
            }

        });
    }
    window.getPosition = getPosition;

    getPosition().then((coords) => {

            const latitude = coords.lat;
            const longitude = coords.long;
             //Place a script tag at the header containing our map initialization function
            const head = document.getElementsByTagName('head')[0];
            const scriptMap = document.createElement('script');
            scriptMap.type = 'text/javascript';
            scriptMap.id = 'scriptMap';
            scriptMap.setAttribute('data-lat', `${latitude}`);
            scriptMap.setAttribute('data-long', `${longitude}`)
            head.appendChild(scriptMap);

            function initMap() {
                const lat = document.getElementById('scriptMap').getAttribute('data-lat');
                const long = document.getElementById('scriptMap').getAttribute('data-long');

                var currentLocation = { lat: parseFloat(lat) , lng: parseFloat(long) };
                // debugger
                var map = new google.maps.Map(
                    document.getElementById('map'),
                    { zoom: 11, 
                    center: currentLocation,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: ['roadmap', 'terrain', 'satellite']
                    } });
                var marker = new google.maps.Marker({
                    position: currentLocation,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
            }
            
            scriptMap.innerHTML = initMap;

        //Make an api request to google maps to get the map access and pass the initMap callback inside of the api request body
            // debugger
            const body = document.getElementsByTagName('body')[0];
            const scriptAPI = document.createElement('script');
            scriptAPI.type = 'text/javascript';
        scriptAPI.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD0RuIHcxsFDgZPuy2B3Kg_y7XqXaIfNEY&callback=initMap';
            body.appendChild(scriptAPI);

   
    });

    var side = new _sidepanel__WEBPACK_IMPORTED_MODULE_0__["default"]();
    side.initYield();



    // https://nuclearsecrecy.com/nukemap/
    // http://nuclearweaponarchive.org/Nwfaq/Nfaq5.html#nfaq5.1
    // https://hackernoon.com/d3-js-and-google-maps-api-in-10-easy-steps-4f258323525b
    // https://console.cloud.google.com/google/maps-apis/api-list?project=detonationmap
    // https://developers.google.com/maps/documentation/javascript/tutorial
    // https://developers.google.com/maps/documentation/javascript/examples/layer-data-polygon

    //test
    window.getInfo = function (){
        return fetch('https://cors-anywhere.herokuapp.com/https://www.osti.gov/api/v1/records/4706703', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
        })//.then( response => console.log( response.json() ) ); // parses JSON response into native Javascript objects 
    };

    window.calc = new _calculator__WEBPACK_IMPORTED_MODULE_1__["default"]();

});

// https://www.fourmilab.ch/etexts/www/effects/eonw_3.pdf#zoom=100
           
        

   




/***/ }),

/***/ "./src/sidepanel.js":
/*!**************************!*\
  !*** ./src/sidepanel.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/data */ "./src/data/data.js");
 


class SidePanel {
    constructor(){
        this.initYield = this.initYield.bind(this);
        this.whenSelected = this.whenSelected.bind(this);
        this.initPanel = this.initPanel.bind(this);
    }

    initPanel(){
        this.initYield();
    }

    whenSelected(e){
        e.preventDefault();
        const bombInfo = document.getElementById('bombInfo');

        while (bombInfo.firstChild){
            bombInfo.removeChild(bombInfo.firstChild);
        }

        const bombName = e.target.value;
        const bombObject = _data_data__WEBPACK_IMPORTED_MODULE_0__["bombData"][bombName];

        Object.keys(bombObject).forEach(attr => {
            let newListItem = document.createElement('li');
            newListItem.append(bombObject[attr]);
            bombInfo.appendChild(newListItem);
        });
        
    }

    initYield(){
        const yieldSelect = document.getElementById('yieldSelect');
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Or choose one that has been tested already.';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.value = null;
        yieldSelect.appendChild(defaultOption);
        const bombs = Object.keys(_data_data__WEBPACK_IMPORTED_MODULE_0__["bombData"]);
        bombs.forEach(bomb => {
            let newOption = document.createElement('option');
            const bombObject = _data_data__WEBPACK_IMPORTED_MODULE_0__["bombData"][bomb]
            newOption.text = bombObject.origin + ' \u21D2 ' + bomb + ' \u21D2 ' + bombObject.yield + ' \u21D2 ' + bombObject.date;
            newOption.value = bomb;
            yieldSelect.appendChild(newOption);
        });
        yieldSelect.addEventListener('change', this.whenSelected );
    }

}

/* harmony default export */ __webpack_exports__["default"] = (SidePanel);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map