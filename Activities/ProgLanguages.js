import Activity from "../Activity.js";



class ProgLanguages extends Activity{
    constructor(loader, scene, hex){
        super(loader, scene, hex, 'Programming Languages', './Models/Hex_Prog_Lang.glb', '');
        this.progLanguagesString = 'prog-lang';
    }
}

export default ProgLanguages;