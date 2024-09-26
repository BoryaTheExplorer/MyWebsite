

class StateMachine{

    constructor(subject, startingState){
        this.subject = subject;
        this.startingState = startingState;
        this.activeState;
    }

    init(){
        this.activeState = this.startingState;
        this.activeState.enter();
    }

    switchState(newState){
        if(this.activeState != null && this.activeState != undefined) this.activeState.exit();

        this.activeState = newState;
        this.activeState.enter();
    }
}