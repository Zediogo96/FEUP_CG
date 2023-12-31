import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -1, 0, 3,	//0
            0, 1, 3,	//1
            1, 0, 3		//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
