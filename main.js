import * as THREE from 'three';
import { moveCube } from './cubeMovement.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import Hex from './Hex.js';
import Grid from './Grid.js';
import CameraModule from './TODO/CameraModule.js';
import Skills from './Activities/Skills.js';
import Experience from './Activities/Experience.js';
import AboutMe from './Activities/AboutMe.js';

const uiCard = document.getElementById('ui-card');
const uiCardHeader = document.getElementById('ui-card-header');
const uiCloseButton = document.getElementById('button-close');
const MODEL_LOADED_EVENT = 'modelLoaded';

export let scene;
export let camera;
export let cameraModule;
export let cameraBasePos;
let previousTime = performance.now();
let deltaTime;

export let cube;
export let renderer;
export const activityLoader = new GLTFLoader();
const loader = new GLTFLoader();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

const cols = 7;
const rows = 7;
const cellSize = 3.5;

let grid = new Grid(cols, rows, cellSize)

let selectedTile;
let targetTile;

let moveVector = new THREE.Vector3(0, 0, 0);

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xadd8e6);
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.setRotationFromEuler(new THREE.Euler(Math.PI * 1.75, 0, 0, "XYZ"));

    cameraModule = new CameraModule(camera);
    camera.position.z = 26.5;
    camera.position.x = 9;
    camera.position.y = 10;

    cameraBasePos = new THREE.Vector3(0, 0, 0);
    cameraBasePos.copy(camera.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRation(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.getElementById('scene-container').appendChild(renderer.domElement);

    grid.build(loader, scene);
    
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({color: 0x88ff});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    
    light.position.set(0, 5, 5);
    light.target.position.set(0, 0, 0);

    scene.add(light.target);
    scene.add(light);

    animate();
}

function setActivities(){
  //grid.setActivity(3, 3, 'About Me', './Models/Hex_PC_table_10_pose.glb');
  grid.getTileFromIndex(3, 3).activity = new AboutMe(grid.getTileFromIndex(3, 3));
  grid.getTileFromIndex(2, 5).activity = new Skills(grid.getTileFromIndex(2, 5));
  grid.getTileFromIndex(4, 5).activity = new Experience(grid.getTileFromIndex(4, 5));
}
function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function openUI(){
  uiCard.classList.remove('hidden');
  uiCard.classList.add('visible');

  uiCardHeader.classList.remove('hidden');
  uiCardHeader.classList.add('visible');

  selectedTile.activity.showUI();
}
function hideUI(){
  uiCard.classList.remove('visible');
  uiCard.classList.add('hidden');

  uiCardHeader.classList.remove('visible');
  uiCardHeader.classList.add('hidden');

  selectedTile.activity.hideUI();
}

function onClick(event){
  const isUIVisible = uiCard.classList.contains('visible');
  const isOverUI = event.target.closest('#ui-card-header') != null || event.target.closest('#ui-card') != null;

  if(isUIVisible && isOverUI) return;

  raycaster.setFromCamera(mouse, camera);

  let intersections = raycaster.intersectObjects(scene.children);

  if(intersections.length > 0){
    let intersectedObject = intersections[0].object.parent;

    //Check if intersected Object leads to any tiles
    if(!grid.tileMap.has(intersectedObject)) {
      intersectedObject = intersectedObject.parent;

      if(!grid.tileMap.has(intersectedObject))
      return
    }
    //Check if those tiles are null or undefined
    if(grid.tileMap.get(intersectedObject) == null ||
       grid.tileMap.get(intersectedObject) == undefined){
      return;
    } 
    
    if(selectedTile != null && selectedTile != undefined){
      if(selectedTile == grid.tileMap.get(intersectedObject)) {
        return;
      }
      hideUI();

      selectedTile.deselect();
      selectedTile = null;
    }

    if(grid.tileMap.get(intersectedObject).activity == null || grid.tileMap.get(intersectedObject).activity == undefined){
      return; 
    }
    //
    if(selectedTile != grid.tileMap.get(intersectedObject)){
      console.log('Selected Tile: ' + selectedTile + ' Grid Tile: ' + grid.tileMap.get(intersectedObject));
      selectedTile = grid.tileMap.get(intersectedObject);
      selectedTile.select();

      openUI();
  
      let h2Element = document.querySelector('#ui-card-header h2');
      h2Element.textContent = selectedTile.activity.name;  
    }
  }
  else{
    if(selectedTile != null && selectedTile != undefined){
      hideUI();

      selectedTile.deselect();
      selectedTile = null;
    }
  }
}


function animate(){
  requestAnimationFrame(animate);

  const currentTime = performance.now();
  deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  raycaster.setFromCamera(mouse, camera);
  let intersections = raycaster.intersectObjects(scene.children);

  if (intersections.length > 0) {
      intersections.forEach(function(intersection, index) {
      });
  }

  moveCamera();
  cameraModule.update(deltaTime * 10);

  scene.children[0].rotation.x += 0.01;
  scene.children[0].rotation.y += 0.01;

  
  renderer.render(scene, camera);
}

function moveCamera() {
  cameraModule.updateMoveCamera();
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onClick, false);
uiCloseButton.addEventListener('click', function(event){
  event.stopPropagation();

  hideUI();

  selectedTile.deselect();
  selectedTile = null;
});
window.addEventListener('resize', () =>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

document.addEventListener(MODEL_LOADED_EVENT, setActivities);
document.addEventListener('keydown', (event) => {
  switch(event.key.toLowerCase()){
      case 'escape':
          if(selectedTile != null){
              hideUI();

              selectedTile.deselect();
              selectedTile = null;
          }
          break;
      case ' ':
        if(selectedTile != null && selectedTile != undefined){
          moveVector.set(((selectedTile.model.position.x - cube.position.x)), 
          ((selectedTile.model.position.y - cube.position.y)),
          ((selectedTile.model.position.z - cube.position.z)) 
        );
          moveVector.normalize();
          moveVector.multiplyScalar(deltaTime * 5);

          selectedTile.deselect();
          targetTile = selectedTile;

          hideUI();

          selectedTile = null;
        }
        break;
      case 'b':
        
        break;
      default:
          break;
  }
})

init();

