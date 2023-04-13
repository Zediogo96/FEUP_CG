import { CGFobject } from '../../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Number} width - Width of the quad (optional, default is 1)
 * @param {Number} height - Height of the quad (optional, default is 1)
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyQuad extends CGFobject {
	constructor(scene, width = 1, height = 1, coords) {
		super(scene);
		this.width = width;
		this.height = height;
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-this.width/2, -this.height/2, 0,    //0
			this.width/2, -this.height/2, 0,    //1
			-this.width/2, this.height/2, 0,    //2
			this.width/2, this.height/2, 0        //3
		];
	
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];
	
		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
	
		/*
		Texture coords (s,t)
		+----------> s
		|
		|
		|
		v
		t
		*/
	
		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
	
}
