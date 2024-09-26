import { cube } from './main.js';
import { camera } from './main.js';
import * as THREE from 'three';
const moveSpeed = 0.05;

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};


document.addEventListener('keydown', (event) => {
    switch(event.key.toLowerCase()){
        case 'w':
            keys.w = true;
            break;
        case 'a':
            keys.a = true;
            break;
        case 's':
            keys.s = true;
            break;
        case 'd':
            keys.d = true;
            break;
        default:
            break;
    }
})
document.addEventListener('keyup', (event) => {
    switch(event.key.toLowerCase()){
        case 'w':
            keys.w = false;
            break;
        case 'a':
            keys.a = false;
            break;
        case 's':
            keys.s = false;
            break;
        case 'd':
            keys.d = false;
            break;
        default:
            break;
    }
})

export function updateCube(){
    if (keys.w) camera.position.z -= moveSpeed;
    if (keys.s) camera.position.z += moveSpeed;
    if (keys.a) camera.position.x -= moveSpeed;
    if (keys.d) camera.position.x += moveSpeed;
}

/**
 * 
 * Adds Direction Vector to the objects position
 * 
 * @param {THREE.Vector3} moveVector - Direction Vector 
 */
export function moveCube(moveVector){
    if(moveVector != null && moveVector != undefined){
        cube.position.x += moveVector.x;
        cube.position.z += moveVector.z;
    }
}