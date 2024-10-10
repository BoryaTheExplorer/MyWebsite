import * as THREE from 'three'
import Hex from './Hex.js';
import Activity from './Activity.js';


class Grid{
    constructor(cols, rows, cellSize){
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.map = [
            [0, 0, 1, 1, 1, 1, 0],
              [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1],
              [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0]
          ];
        this.tileMap = new Map();
        this.indexMap = new Map();
    }
    /**
     * @param {number} x 
     * @param {number} z 
     * @returns return a string of 'x, z' format
     */
    convertToKey(x, z){
        return `${x}, ${z}`
    }
    /**
     * Binds Content to the provided cell indexes
     * @param {object} content 
     * @param {number} posX 
     * @param {number} posZ 
     */
    setTile(content, posX, posZ){
        this.tileMap.set(content, new Hex(content, [posX, posZ]));
        this.indexMap.set(this.convertToKey(posX, posZ), this.tileMap.get(content));
    }
    /**
     * Sets Activity at provided indexes
     * @param {number} posX 
     * @param {number} posZ 
     */
    setActivity(posX, posZ, name, path){
        this.getTileFromIndex(posX, posZ).setActivity(new Activity(this.getTileFromIndex(posX, posZ), name, path));
    }
    /**
     * 
     * @param {number} posX 
     * @param {number} posZ 
     * @returns Tile from provided indexes
     */
    getTileFromIndex(posX, posZ){
        return this.indexMap.get(this.convertToKey(posX, posZ))
    }
    /**
     * @param {number} posX 
     * @param {number} posZ 
     * @returns Vector3 with a world position of a tile from indexes
     */
    getWorldPositionFromIndexes(posX, posZ){
        const xCenter = this.rows * (-1/2) * this.cellSize;
        const zCenter = this.cols * (-1/2) * this.cellSize;

        const xPos = (3 / 2) * posZ * this.cellSize;
        const zPos = Math.sqrt(3) * (posX + (posZ % 2)/ 2) * this.cellSize;
        
        return new THREE.Vector3(zPos + xCenter, 0, xPos + zCenter); 
    }
    build(loader, scene){
      const thisMap = this.map;
      const thisCols = this.cols;
      const thisRows = this.rows;
      const grid = this;
      loader.load(
        './Models/Hex.glb',
        function(gltf){
            const model = gltf.scene;
            model.traverse((child) => {
                if(child.isMesh){
                    child.material = new THREE.MeshToonMaterial({
                        map: child.material.map,
                        side: THREE.DoubleSide,
                    });

                    child.geometry.computeVertexNormals();
                    child.material.shadowSide = THREE.DoubleSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            for(let i = 0; i < thisCols; i++){
                for(let j = 0; j < thisRows; j++){
                    if(thisMap[j][i] == 0) {
                      continue;
                    }
                    (function(i, j){
                      const tile = model.clone(true);
                    
                      tile.position.copy(grid.getWorldPositionFromIndexes(i, j));

                      grid.setTile(tile, i, j);
                      scene.add(tile);
                    })(i, j);
                }
            }
            const MODEL_LOADED_EVENT = 'modelLoaded';
            const event = new Event(MODEL_LOADED_EVENT);
            document.dispatchEvent(event);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred while loading the model:', error);
        }
    )
    }
}

export default Grid;

