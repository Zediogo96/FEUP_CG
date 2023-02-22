import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
		this.initBuffers();
	}
	
	display() {

        // Face 1
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.01);
        this.quad.display();
        this.scene.popMatrix();

        // Face 2 (oposta a 1)
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -1.01);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Face 3
        this.scene.pushMatrix();
        this.scene.translate(0, 1, -0.51);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Face 4 (oposta a 3)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.51);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Face 5
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, -0.51);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Face 6 (oposta a 5)
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, -0.51);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();






    }
}