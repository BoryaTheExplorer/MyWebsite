



class OnlinePortfolio{
    //Remake this bs. Just instantiate this stuff in the cunstructor
    constructor(stateMachine, raycaster, mouse, cameraModule, grid){
        this.stateMachine = stateMachine;
        this.raycaster = raycaster;
        //Input
        this.mouse = mouse;
        this.cameraModule = cameraModule;
        //Grid
        this.grid = grid;
        this.selectedTile;
    }

    onClick(event){
        if(this.stateMachine.currentState != null || this.stateMachine.currentState != undefined)
        this.stateMachine.currentState.onClick(event);
    }

    //OI DO THIS SHIT
    hideUI(){

    }
    openUI(){

    }
}