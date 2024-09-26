import Activity from "../Activity.js";



class AboutMe extends Activity{
    constructor(hex){
        super(hex, 'About Me', './Models/Hex_PC_table_10_pose.glb', 'about-me');
        this.aboutMeString = 'about-me';
    }

    showUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove('hidden');
        uiElement.classList.add(this.aboutMeString);
    }
    hideUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove(this.aboutMeString);
        uiElement.classList.add('hidden');
    }
}

export default AboutMe;