import { CGFobject } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyPlane } from './MyPlane.js';

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.upperWing = new MyPlane(scene, 10);
        this.lowerWing = new MyPlane(scene, 10);
        this.tip = new MyTriangle(scene);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 1, 1);
        this.upperWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 1, 1);
        this.lowerWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 1, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.tip.display();
        this.scene.popMatrix();
    }
}
