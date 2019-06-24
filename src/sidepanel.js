import {bombData} from './data/data'; 


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
        const bombObject = bombData[bombName];

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
        const bombs = Object.keys(bombData);
        bombs.forEach(bomb => {
            let newOption = document.createElement('option');
            const bombObject = bombData[bomb]
            newOption.text = bombObject.origin + ' \u21D2 ' + bomb + ' \u21D2 ' + bombObject.yield + ' \u21D2 ' + bombObject.date;
            newOption.value = bomb;
            yieldSelect.appendChild(newOption);
        });
        yieldSelect.addEventListener('change', this.whenSelected );
    }

}

export default SidePanel;