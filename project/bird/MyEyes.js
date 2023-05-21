
import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../objects/MySphere.js';

/**
 * MyEyes
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEyes extends CGFobject {
    constructor(scene) {
        super(scene);
        this.eye = new MySphere(this.scene, 30, 30, 0.5, false);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(6.5, 4.5, 1);
        this.scene.rotate(- Math.PI / 3, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(6.5, 4.5, -1);
        this.scene.rotate(- 2 * Math.PI / 3, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();
    }
}