import { activityLoader } from './main.js';
import { scene } from './main.js';

class Activity{
    constructor(hex, name, modelPath = null, uiElementName = null){
        this.modelPath = modelPath;
        this.hex = hex;
        this.name = name;
        this.model;
        this.uiElementName = uiElementName;
        this.load(this.modelPath);
    }

    load(path){
        activityLoader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                model.traverse((child) =>{
                    if(child.isMesh)
                    child.castShadow = true;
                });
                this.model = model.clone(true);
                scene.add(this.model);
                this.hex.model.add(this.model);
                //this.model.position.copy(hex.model.position);
                
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.error('An error occurred while loading the model:', error);
            }
        )
    }

    showUI(){
    }
    hideUI(){
    }
}

export default Activity;