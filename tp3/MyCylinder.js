import { CGFobject } from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
    
        var theta = 0;
        var thetaIncrement = (2 * Math.PI) / this.slices;
        var stackIncrement = 2.0 / this.stacks;
    
        for (var i = 0; i <= this.slices; i++) {
    
            var x = Math.cos(theta) * 0.5;
            var y = Math.sin(theta) * 0.5;
            var z = -1;
    
            for (var j = 0; j <= this.stacks; j++) {
    
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
    
                z += stackIncrement;
            }
    
            theta += thetaIncrement;
        }
    
        this.indices = [];
    
        var vertexNumber = 1;
    
        for (var i = 0; i < this.slices; i++) {
    
            for (var j = 0; j < this.stacks; j++) {
    
                this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber + this.stacks + 1);
                this.indices.push(vertexNumber + this.stacks, vertexNumber, vertexNumber - 1);
                this.indices.push(vertexNumber + this.stacks + 1, vertexNumber + this.stacks, vertexNumber);
                this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber - 1);
    
                vertexNumber++;
            }
    
            vertexNumber++;
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}