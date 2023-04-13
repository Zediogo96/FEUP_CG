import {CGFobject} from '../lib/CGF.js';

/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 */
export class MyRectangle extends CGFobject {
    constructor(scene, width, height) {
        super(scene);

        this.width = width;
        this.height = height;

        this.initBuffers();
    }

    initBuffers() {
        // Calculate half width and half height
        var hw = this.width / 2;
        var hh = this.height / 2;

        // Generate vertices
        this.vertices = [
            -hw, hh, 0,
            -hw, -hh, 0,
            hw, hh, 0,
            hw, -hh, 0
        ];

        // Generating indices
        this.indices = [
            0, 1, 2,
            3, 2, 1
        ];

        //indices for the other face
        this.indices.push(0, 2, 1);
        this.indices.push(3, 1, 2);
        
        // Generating normals
        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity){
        // no update needed
    }
}
