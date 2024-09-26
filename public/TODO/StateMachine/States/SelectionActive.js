import State from "../State.js";



class SelectionActive extends State{


    onClick(event){
        const isOverUI = event.target.closest('#ui-card-header') != null || event.target.closest('#ui-card') != null;

        if(isOverUI == true) return;

        const subject = this.subject;

        subject.raycaster.setFromCamera(mouse, camera);

        let intersections = subject.raycaster.intersectObjects(subject.scene.children);

        if(intersections.length > 0){
            let intersectedObject = intersections[0].object.parent;

            //Check if intersected Object leads to any tiles
            if(!subject.grid.tileMap.has(intersectedObject)) {
                intersectedObject = intersectedObject.parent;

                if(!subject.grid.tileMap.has(intersectedObject))
                return
            }
            //Check if those tiles are null or undefined
            if(subject.grid.tileMap.get(intersectedObject) == null ||
                subject.grid.tileMap.get(intersectedObject) == undefined){
                return;
            } 
    
            if(subject.selectedTile != null && subject.selectedTile != undefined){
                if(subject.selectedTile == subject.grid.tileMap.get(intersectedObject)) {
                    return;
                }
                subject.hideUI();

                subject.selectedTile.deselect();
                subject.selectedTile = null;
            }

            if(subject.grid.tileMap.get(intersectedObject).activity == null 
                || subject.grid.tileMap.get(intersectedObject).activity == undefined){
                return; 
            }

            if(subject.selectedTile != subject.grid.tileMap.get(intersectedObject)){
                //console.log('Selected Tile: ' + selectedTile + ' Grid Tile: ' + grid.tileMap.get(intersectedObject));
                subject.selectedTile = subject.grid.tileMap.get(intersectedObject);
                subject.selectedTile.select();

                subject.openUI();
  
                let h2Element = document.querySelector('#ui-card-header h2');
                h2Element.textContent = subject.selectedTile.activity.name;  
            }
        }
        else{
            if(subject.selectedTile != null && subject.selectedTile != undefined){
                subject.hideUI();

                subject.selectedTile.deselect();
                subject.selectedTile = null;
            }
        }
    }
}