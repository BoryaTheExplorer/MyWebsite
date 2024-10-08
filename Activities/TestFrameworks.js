import Activity from "../Activity.js";



class TestFrameworks extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, 'Testing Frameworks', './Models/Hex_TestFrameworks.glb', 'skills')
        this.skillListString = 'skill-list';
    }

    showUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove('hidden');
        uiElement.classList.add(this.skillListString);


        const newUIElement = document.getElementById('experience');
        console.log(newUIElement.classList);
    }
    hideUI(){
        console.log('HIDING SKILLS SPECIFIC UI');

        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove(this.skillListString);
        uiElement.classList.add('hidden');
    }
}

export default TestFrameworks;