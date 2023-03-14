import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelgram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			3,1,1,
			1,1,1,
			2,0,1,
			0,0,1
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 2, 1,
			2, 1, 0,
			1, 2, 3
		];

		this.texCoords=[
            1, 1,
            0.75, 0.75,
            0.75, 1,
            0.5, 0.75,
            0.5, 1,
            0.25, 0.75,
        ];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

