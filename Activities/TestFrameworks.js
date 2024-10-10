import Activity from "../Activity.js";



class TestFrameworks extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, 'Testing Frameworks', './Models/Hex_TestFrameworks.glb', 'testing-frameworks-card')
        this.testingFrameworksString = 'testing-frameworks';
    }

    showUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove('hidden');
        uiElement.classList.add(this.testingFrameworksString);
    }
    hideUI(){
        const uiElement = document.getElementById(this.uiElementName);

        uiElement.classList.remove(this.testingFrameworksString);
        uiElement.classList.add('hidden');
    }
}

export default TestFrameworks;