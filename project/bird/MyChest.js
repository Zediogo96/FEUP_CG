
import { CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../objects/MySphere.js';


/**
 * MyChest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyChest extends CGFobject {
    constructor(scene) {

        super(scene);

        this.lastUpdate = 0;
        this.flap = true;

        this.bodySphere = new MySphere(this.scene, 30, 16, 2, false);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(2.1, 0.8, 1);
        this.scene.translate(0, 4, 0);
        this.bodySphere.display();
        this.scene.popMatrix();
    }
}