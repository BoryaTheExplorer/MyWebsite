


class State{

    constructor(subject, stateMachine){
        this.subject = subject;
        this.stateMachine = stateMachine;
        this.enterTime;
    }

    enter(){
        const date = new Date();
        this.enterTime = date.getSeconds();
    }

    onClick(event){

    }

    handleCamera(){

    }

    exit(){

    }

    
}