import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [
			0.5, 0.5, 0.5,      //0
            -0.5, 0.5, 0.5,     //1
            -0.5, -0.5, 0.5,    //2
            0.5, -0.5, 0.5,     //3
            0.5, 0.5, -0.5,     //4
            -0.5, 0.5, -0.5,    //5
            -0.5, -0.5, -0.5,   //6
            0.5, -0.5, -0.5,    // 7

            0.5, 0.5, 0.5,      //8
            -0.5, 0.5, 0.5,     //1
            -0.5, -0.5, 0.5,    //2
            0.5, -0.5, 0.5,     //3
            0.5, 0.5, -0.5,     //4
            -0.5, 0.5, -0.5,    //5
            -0.5, -0.5, -0.5,   //6
            0.5, -0.5, -0.5,    // 7

            0.5, 0.5, 0.5,      //0
            -0.5, 0.5, 0.5,     //1
            -0.5, -0.5, 0.5,    //2
            0.5, -0.5, 0.5,     //3
            0.5, 0.5, -0.5,     //4
            -0.5, 0.5, -0.5,    //5
            -0.5, -0.5, -0.5,   //6
            0.5, -0.5, -0.5,    // 7


		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2, 3, 0,
            4, 0, 3,
            3, 7, 4,
            5, 4, 7,
            7, 6, 5,
            1, 5, 6,
            6, 2, 1,
            3, 2, 6,
            6, 7, 3,
            4, 5, 1,
            1, 0, 4,

            8, 9, 10,
            10, 11, 8,
            12, 8, 11,
            11, 15, 12,
            13, 12, 15,
            15, 14, 13,
            9, 13, 14,
            14, 10, 9,
            11, 10, 14,
            14, 15, 11,
            12, 13, 9,
            9, 8, 12,

            16, 17, 18,
            18, 19, 16,
            20, 16, 19,
            19, 23, 20,
            21, 20, 23,
            23, 22, 21,
            17, 21, 22,
            22, 18, 17,
            19, 18, 22,
            22, 23, 19,
            20, 21, 17,
            17, 16, 20
		];

        this.normals = [
            0, 1, 0,      //0
            0, 1, 0,     //1
            0, -1, 0,    //2
            0, 1, 0,     //3
            0, 1, 0,     //4
            0, 1, 0,    //5
            0, -1, 0,   //6
            0, -1, 0,    // 7

            0, 0, 1,      //8
            0, 0, 1,     //9
            0, 0, 1,    //10
            0, 0, 1,     //11
            0, 0, -1,     //12
            0, 0, -1,    //13
            0, 0, -1,   //14
            0, 0, -1,    // 15

            1, 0, 0,      //16
            -1, 0, 0,     //17
            -1, 0, 0,    //18
            1, 0, 0,     //19
            1, 0, 0,     //20
            -1, 0, 0,    //21
            -1, 0, 0,   //22
            1, 0, 0,    // 23
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}