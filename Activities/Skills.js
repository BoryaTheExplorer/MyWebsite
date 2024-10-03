import Activity from "../Activity.js";



class Skills extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, 'Skills', './Models/Hex_Skills_Tile_No_Model.glb', 'skills')
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

export default Skills;