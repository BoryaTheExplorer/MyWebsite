import * as THREE from 'three';

class Activity{
    constructor(loader, scene, hex, name, modelPath = null, uiElementName = null){
        this.modelPath = modelPath;
        this.hex = hex;
        this.name = name;
        this.model;
        this.loader = loader;
        this.scene = scene;
        this.uiElementName = uiElementName;
        this.load(this.modelPath);
    }

    load(path){
        this.loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;
                model.traverse((child) =>{
                    if(child.isMesh){
                        child.material = new THREE.MeshPhysicalMaterial({
                            map: child.material.map,
                            side: THREE.FrontSide,
                        });

                        child.geometry.computeVertexNormals();
                        child.material.shadowSide = THREE.BackSide;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                this.model = model.clone(true);
                this.scene.add(this.model);
                this.hex.model.add(this.model);
                
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