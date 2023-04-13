import {CGFobject} from '../lib/CGF.js';

/**
* MyCone
* @constructor
* @param scene - Reference to MyScene object
* @param slices - number of divisions around the Y axis
* @param stacks - number of divisions along the Y axis
* @param radius - radius of the base of the cone
* @param height - height of the cone
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var texCoordX = 0;

        for(var i = 0; i < this.slices; i++){
            var x = Math.cos(ang) * this.radius;
            var z = -Math.sin(ang) * this.radius;

            this.vertices.push(x, 0, z);
            this.normals.push(x, this.radius / Math.sqrt(this.radius * this.radius + this.height * this.height), z);
            this.texCoords.push(texCoordX, 1);
            texCoordX += 1/this.slices;

            ang+=alphaAng;
        }

        this.vertices.push(0, this.height, 0);
        this.normals.push(0, this.radius / Math.sqrt(this.radius * this.radius + this.height * this.height), 0);
        this.texCoords.push(0.5, 0);

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(i, (i+1) % this.slices, this.slices);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
    * Called when user interacts with GUI to change object's complexity.
    * @param {integer} complexity - changes number of slices
    */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
