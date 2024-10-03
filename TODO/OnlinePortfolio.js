import * as THREE from 'three';
import CameraModule from './CameraModule';
import Grid from '../Grid';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



class OnlinePortfolio{
    constructor(){
        this.stateMachine;
        //Scene
        this.scene;
        this.camera;
        this.raycaster;
        this.renderer;
            //Light
            this.dirLight;
            this.aLight;
        this.loader = new GLTFLoader();
        //Input
        this.cameraModule;
        this.mouse;
        //Grid
        this.grid;
        this.selectedTile;
    }

    init(){
        this.scene = new THREE.Scene();
        const scene = this.scene;

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const camera = this.camera;

        this.cameraModule = new CameraModule(camera);
        const cameraModule = this.cameraModule;

        cameraModule.camera.setRotationFromEuler(new THREE.Euler(Math.PI * 1.85, 0, 0, "XYZ"));
        camera.position.set(26.5, 9, 10);

        this.renderer = new THREE.WebGLRenderer();
        const renderer = this.renderer;

        renderer = new THREE.WebGLRenderer();
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('scene-container').appendChild(renderer.domElement);
        
        const cols = 7;
        const rows = 7;
        const cellSize = 3.5;
        this.grid = new Grid(cols, rows, cellSize);
        const grid = this.grid;

        grid.build();

        this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        const dirLight = this.dirLight;

        dirLight.position.set(0, 5, 5);
        dirLight.target.position.set(0, 0, 0);
        dirLight.castShadow = true;
        dirLight.receiveShadow = true;

        this.aLight = new THREE.AmbientLight(0xffffff, 0.25);
        const aLight = this.aLight;

        scene.add(dirLight);
        scene.add(dirLight.target);

        scene.add(aLight);

        this.stateMachine = new StateMachine()
        
        this.animate();
    }

    onClick(event){
        if(this.stateMachine.currentState != null || this.stateMachine.currentState != undefined)
            this.stateMachine.currentState.onClick(event);
    }
    animate(){
        requestAnimationFrame(this.animate);
        if(this.stateMachine.currentState != null || this.stateMachine.currentState != undefined)
            this.stateMachine.currentState.animate();
    }

    //OI DO THIS SHIT
    hideUI(){

    }
    openUI(){

    }

    setActivities(){
        const grid = this.grid;

        grid.getTileFromIndex(3, 3).activity = new AboutMe(loader, scene, grid.getTileFromIndex(3, 3));
        grid.getTileFromIndex(2, 5).activity = new Skills(loader, scene, grid.getTileFromIndex(2, 5));
        grid.getTileFromIndex(4, 5).activity = new Experience(loader, scene, grid.getTileFromIndex(4, 5));
      }
}