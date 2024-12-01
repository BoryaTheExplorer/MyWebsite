import Activity from "../Activity.js";



class BankingGame extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, "Banking Game", './Models/Placeholder.glb', 'banking-game-card');
        this.bankingGameString = 'banking_game';
    }
}

export default BankingGame;