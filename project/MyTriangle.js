import { CGFobject } from '../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param size - Scale factor to apply to the triangle (optional, defaults to 1)
 */
export class MyTriangle extends CGFobject {
	constructor(scene, size = 1) {
		super(scene);
		this.size = size;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-this.size, -this.size, 0,	//0
			this.size, -this.size, 0,	//1
			-this.size, this.size, 0	//2
		];

		this.texCoords = [
			0, 0,
			1, 0,
			0, 1,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];
		

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
