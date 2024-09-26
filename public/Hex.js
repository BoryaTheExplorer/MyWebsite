import * as THREE from 'three';
import { cameraModule } from './main.js';
import { cameraBasePos } from './main.js';
//import Activity from './Activity';


class Hex{
    /**
     * 
     * @param {object} model Hex Model
     * @param {number[]} value Hex coordinates on a Grid  
     * @param {*} activity Activity
     */
    constructor(model, value, activity = null){
        this.model = model;
        this.value = value;
        this.baseHeight = 0;
        this.selectOffset = 2;
        this.activity = activity;
    }
    /**
    * Sets grid slot indexes
    * 
    * @param {number[]} value - Grid slot 
    */
    setValue(value){
        this.value = value;
    }

    setActivity(activity){
        this.activity = activity
    }
    /**
     * 
     * Increases hexes base height
     * 
     * @param {number} modifier - increase to the hexes base height
     * 
     */
    addBaseHeight(modifier){
        if(modifier == null || modifier == undefined) return;
        this.baseHeight += modifier;

        this.model.position.setY(this.baseHeight + this.selectOffset);
    }

    /**
     * 
     * Method updates the visual to indicate that the Hex is selected
     */
    select(){
        if(this.model == null || this.model == undefined) return;
        console.log(`${this.value} tile selected`);

        this.model.position.add(new THREE.Vector3(0, this.selectOffset, 0));

        let target = this.model.position.clone();
        cameraModule.transitionCameraPosition(target.add(new THREE.Vector3(-3, 5, 5)), 0.1);
        cameraModule.camera.setRotationFromEuler(new THREE.Euler(Math.PI * 1.85, 0, 0, "XYZ"));
    }
    /**
     * 
     * Method updates the visual to indicate that the Hex is not selected
     */
    deselect(){
        if(this.model == null || this.model == undefined) return;
        
        this.model.position.add(new THREE.Vector3(0, -this.selectOffset, 0));
        cameraModule.transitionCameraPositionBack();
    }
    getWorldPosition(){
        return this.model.position;
    }
}

export default Hex;