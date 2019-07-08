import {bombData} from './data/data'; 
import Calculator from './calculator';


class SidePanel {
    constructor(){
        this.initYield = this.initYield.bind(this);
        this.whenSelected = this.whenSelected.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);
        this.initYieldRange = this.initYieldRange.bind(this);

        this.airburst = document.getElementById('airburst');
        this.surface = document.getElementById('surface');
        this.bombInfo = document.getElementById('bombInfo');
        this.yieldRangeValue = document.getElementById('range-value');
        this.yieldRange = document.getElementById('yield');
        this.yieldSelect = document.getElementById('yieldSelect');
        this.detonateButton = document.getElementById('detonate');


        this.airburstVal = true; 
        this.yield = null;
    }

    initPanel(){
        this.initYield();
        this.initYieldRange();
    }

    whenSelected(e){
        e.preventDefault();

        while (this.bombInfo.firstChild){
            this.bombInfo.removeChild(bombInfo.firstChild);
        }

        const bombName = e.target.value;
        const bombObject = bombData[bombName];

        this.yieldRangeValue.innerText = bombObject.yield;
        this.yieldRange.value = `${parseFloat(bombObject.yield)}`;
        this.yield = parseFloat(bombObject.yield);

        Object.keys(bombObject).forEach(attr => {
            let newListItem = document.createElement('li');
            newListItem.append(bombObject[attr]);
            this.bombInfo.appendChild(newListItem);
        });
        
    }

    initYield(){
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Or choose one that has been tested already.';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.value = null;
        this.yieldSelect.appendChild(defaultOption);
        const bombs = Object.keys(bombData);

        bombs.forEach(bomb => {
            let newOption = document.createElement('option');
            const bombObject = bombData[bomb];
            newOption.text = bombObject.origin + ' \u21D2 ' + bomb + ' \u21D2 ' + bombObject.yield + ' \u21D2 ' + bombObject.date;
            newOption.value = bomb;
            this.yieldSelect.appendChild(newOption);
        });

        this.yieldSelect.addEventListener('change', this.whenSelected );
    }

    onRangeChange(e){
        const currentValue = e.currentTarget.value;
        this.yieldRangeValue.innerText = currentValue + " kt [TNT]";
        this.yield = parseFloat(currentValue);
    }

    initYieldRange(){
        this.yieldRangeValue.innerText = this.yieldRange.value + " kt [TNT]";
        this.yield = this.yieldRange.value;
        this.yieldRange.addEventListener('input', this.onRangeChange);
    }

    getRadii(){
        this.airburstVal = this.airburst.checked;
        const calculator = new Calculator();
        const radii = {};

        radii.fireballRad = calculator._mi2m(calculator.getFireballRadius(this.yield, this.airburstVal));
        radii.onsetNuclearRadiation500Rem = calculator._mi2m(calculator.getOnsetNuclearRadiationRadius(this.yield, 500));
        radii.thermalRadiation3rdDegreeBurns = calculator._mi2m(calculator.getThermalRadiationRadius(this.yield, '_3rd-100', this.airburstVal));

        if (!this.airburstVal) {
            radii.craterRadius = calculator._mi2m(calculator.getCraterParams(this.yield, 'soil').apparentDiam / 2.0);
        } 

        return radii;
    }

}

export default SidePanel;