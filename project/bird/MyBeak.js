
import { CGFobject } from '../../lib/CGF.js';
import { MyCone } from '../objects/MyCone.js';

/**
 * MyBeak
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBeak extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cone = new MyCone(this.scene, 10,10, 1, 2);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(6.8, 3.1, 0);
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        // rotate 10 degrees is Math.PI/18
        this.scene.rotate(- Math.PI / 6, 0, 0, 1);
        this.scene.scale(0.7, 0.7, 0.7);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(6.8, 3.1, 0);
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        // rotate 10 degrees is Math.PI/18
        this.scene.rotate(- Math.PI / 6, 0, 0, 1);
        this.scene.rotate(- Math.PI / 18, 0, 0, 1);
        this.scene.scale(0.7, 0.7, 0.7);
        this.cone.display();
        this.scene.popMatrix();
    }
}