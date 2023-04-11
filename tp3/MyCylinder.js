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
        this.indices = [];
    
        var phi = 0;
        var phiIncrement = Math.PI / this.slices;
        var thetaIncrement = (2 * Math.PI) / this.stacks;
    
        for (var i = 0; i <= this.slices; i++) {
    
            var theta = 0;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);
    
            for (var j = 0; j <= this.stacks; j++) {
    
                var x = cosPhi * Math.cos(theta);
                var y = cosPhi * Math.sin(theta);
                var z = sinPhi;
    
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
    
                theta += thetaIncrement;
            }
    
            phi += phiIncrement;
        }
    
        var vertexNumber = 0;
    
        for (var i = 0; i < this.slices; i++) {
    
            for (var j = 0; j < this.stacks; j++) {
    
                var vertex1 = vertexNumber;
                var vertex2 = vertexNumber + this.stacks + 1;
                var vertex3 = vertexNumber + this.stacks;
                var vertex4 = vertexNumber + 1;
    
                this.indices.push(vertex1, vertex2, vertex3);
                this.indices.push(vertex3, vertex2, vertex1);
                this.indices.push(vertex3, vertex1, vertex4);
                this.indices.push(vertex4, vertex1, vertex3);
    
                vertexNumber++;
            }
    
            vertexNumber++;
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
