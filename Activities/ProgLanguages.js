import Activity from "../Activity.js";



class ProgLanguages extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, 'Programming Languages', './Models/Hex_Prog_Lang.glb', 'prog-langs-card');
        this.progLanguagesString = 'prog-langs';
    }

    showUI(){
        const uiElement = document.getElementById(this.uiElementName);
    
        uiElement.classList.remove('hidden');
        uiElement.classList.add(this.progLanguagesString);
    }
    hideUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove(this.progLanguagesString);
        uiElement.classList.add('hidden');
    }
}





export default ProgLanguages;