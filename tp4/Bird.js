import { CGFobject } from '../lib/CGF.js';
import { MyWing } from './Wing.js';

export class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.leftwing = new MyWing(scene);
        this.rightwing = new MyWing(scene);
    }

    display() {
        //left wing
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.leftwing.display();
        this.scene.popMatrix();
        //right wing
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(-Math.PI, 0, 0, 1);
        this.rightwing.display();
        this.scene.popMatrix();
    }
}