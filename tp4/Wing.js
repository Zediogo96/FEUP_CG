import { CGFobject } from '../lib/CGF.js';
import { MyRectangle } from './MyRectangle.js';
import { MyIsoTriangle } from './MyIsoTriangle.js';

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.wingtip = new MyIsoTriangle(scene, 1, 1.5);
        this.wing = new MyRectangle(scene, 1, 2);
    }

    display() {
        //wing
        this.scene.pushMatrix();
        this.wing.display();
        this.scene.popMatrix();
        //wingtip
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        //tilt the wingtip
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.wingtip.display();
        this.scene.popMatrix();
    }
    
}
