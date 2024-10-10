import Activity from "../Activity.js";



class Software extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, "Software", './Models/Placeholder.glb', 'software-card');
        this.softwareString = 'software';
    }

    showUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove('hidden');
        uiElement.classList.add(this.softwareString);
    }
    hideUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove(this.softwareString);
        uiElement.classList.add('hidden');
    }
}

export default Software;