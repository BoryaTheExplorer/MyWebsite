import Activity from "../Activity.js"



class Experience extends Activity{
    constructor(hex){
        super(hex, 'Experience', './Models/Placeholder.glb', 'experience')
        this.experienceListString = 'experience-list'
    }

    showUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove('hidden');
        uiElement.classList.add(this.experienceListString);

        console.log(uiElement.classList);
    }
    hideUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove(this.experienceListString);
        uiElement.classList.add('hidden');
    }
}

export default Experience;