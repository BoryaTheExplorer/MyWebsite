import * as THREE from 'three';

class CameraModule{

    static keys = {
        w: false,
        a: false,
        s: false,
        d: false
    };

    constructor(camera){
        this.camera = camera;
        this.previousPosition;
        this.cameraInitRotation = camera.rotation;
        this.target;
        this.moveSpeed = 0.09;
    }

    updateMoveCamera(){
        let moveVector = new THREE.Vector3(0, 0, 0);
        
        if (CameraModule.keys.w) moveVector.z--;
        if (CameraModule.keys.s) moveVector.z++;
        if (CameraModule.keys.a) moveVector.x--;
        if (CameraModule.keys.d) moveVector.x++;

        moveVector.normalize();
        moveVector.multiplyScalar(this.moveSpeed);
        this.camera.position.add(moveVector);
    }

    transitionCameraPosition(newPosition){
        this.previousPosition = this.camera.position.clone();
        this.target = newPosition;
    }
    transitionCameraPositionBack(){
        this.target = this.previousPosition.clone();
    }
    update(deltaTime){
        if(this.target != null && this.target != undefined){
            this.camera.position.lerp(this.target, deltaTime);

            if(this.camera.position.distanceTo(this.target) < 0.3){
                this.target = null;
            }
        }
    }
}

export default CameraModule;

document.addEventListener('keydown', (event) => {
    const keys = CameraModule.keys;
    switch(event.code){
        case 'KeyW':
            keys.w = true;
            break;
        case 'KeyA':
            keys.a = true;
            break;
        case 'KeyS':
            keys.s = true;
            break;
        case 'KeyD':
            keys.d = true;
            break;
        default:
            break;
    }
})
document.addEventListener('keyup', (event) => {
    const keys = CameraModule.keys;
    switch(event.code){
        case 'KeyW':
            keys.w = false;
            break;
        case 'KeyA':
            keys.a = false;
            break;
        case 'KeyS':
            keys.s = false;
            break;
        case 'KeyD':
            keys.d = false;
            break;
        default:
            break;
    }
})