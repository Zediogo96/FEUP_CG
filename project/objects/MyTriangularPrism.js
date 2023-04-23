import { CGFobject } from '../../lib/CGF.js';

import { MyTriangle } from './MyTriangle.js';
import { MyQuad } from './MyQuad.js';

export class MyTriangularPrism extends CGFobject {

	constructor(scene, size = 1, width = 1) {
		super(scene);
		this.size = size;
		this.width = width;

		this.triangle = new MyTriangle(scene, size / 2);
		this.quad = new MyQuad(scene, width, size);

		this.initBuffers();

	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -this.size / 2, -this.size / 3.3)
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(this.width / 2, 0, -1.5);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(- this.width / 2, 0, -1.5);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-this.size / 3.3);
		let hip = Math.sqrt( Math.pow(this.size, 2) + Math.pow(this.size, 2));
		let factor = hip / this.size;
		this.scene.scale(1, factor, factor);
		this.scene.rotate(Math.PI, 1, 0, 0);
		let angle = Math.asin(this.size / hip);
		this.scene.rotate(angle, 1, 0 ,0 );
		this.quad.display();
		this.scene.popMatrix();

	}
}


