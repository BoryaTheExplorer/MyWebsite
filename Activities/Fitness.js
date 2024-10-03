import Activity from '../Activity.js';



class Fitness extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, 'Fitness', './Models/Placeholder.glb', '');
        this.fitnessString = 'fitness';
    }
}

export default Fitness;