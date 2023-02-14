import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        // TP1

        this.gui.add(this.scene, 'displayDiamond').name('Diamond'); // neste exemplo, displayDiamond é o nome da variável criada na classe MyScene

        this.gui.add(this.scene, 'displayTriangle').name('Triangle');

        this.gui.add(this.scene, 'displayParallelogram').name('Paralellogram');

        this.gui.add(this.scene, 'displayTriangleSmall').name('Triangle Small');

        this.gui.add(this.scene, 'displayTriangleBig').name('Triangle Big');

        return true;
    }
}