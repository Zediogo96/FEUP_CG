
import { CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../objects/MySphere.js';


/**
 * MyChest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyChest extends CGFobject {
    constructor(scene, quadHeight) {

        super(scene);

        this.lastUpdate = 0;
        this.flap = true;

        this.bodySphere = new MySphere(this.scene, 30, 16, 2, false);
    }

    update(t) {
        let delta_t = t - this.lastUpdate;
        if (delta_t > 500) {
            this.flap = !this.flap;
            this.lastUpdate = t;
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(2.1, 0.8, 1);
        this.scene.translate(0, 4, 0);
        if (this.flap) this.scene.translate(0, 0.1, 0); else this.scene.translate(0, -0.1, 0);
        this.bodySphere.display();
        this.scene.popMatrix();
    }
}