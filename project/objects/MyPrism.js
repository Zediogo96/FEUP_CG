import { CGFobject } from '../../lib/CGF.js';

export class MyPrism extends CGFobject {
    constructor(scene, size, slices, stacks) {
        super(scene);
        this.size = size;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        var ang = 0;
        var angIncrement = (2 * Math.PI) / this.slices;
        var stackIncrement = this.size / this.stacks;

        var bottomCenter = [0, 0, -this.size / 2];
        var topCenter = [0, 0, this.size / 2];

        for (var i = 0; i < this.slices; i++) {

            var x0 = Math.cos(ang) * this.size / 2;
            var y0 = Math.sin(ang) * this.size / 2;
            var xn = Math.cos(ang + angIncrement / 2) * this.size / 2;
            var yn = Math.sin(ang + angIncrement / 2) * this.size / 2;
            var x1 = Math.cos(ang + angIncrement) * this.size / 2;
            var y1 = Math.sin(ang + angIncrement) * this.size / 2;
            var z = -this.size / 2;

            for (var j = 0; j <= this.stacks; j++) {

                this.vertices.push(x0, y0, z);
                this.vertices.push(x1, y1, z);
                this.normals.push(xn, yn, 0);
                this.normals.push(xn, yn, 0);
                this.texCoords.push(i / this.slices, j / this.stacks);
                this.texCoords.push((i + 1) / this.slices, j / this.stacks);

                z += stackIncrement;
            }

            ang += angIncrement;
        }



        var vertexNumber = 2;

        for (var i = 0; i < this.slices; i++) {

            for (var j = 0; j < this.stacks; j++) {

                this.indices.push(vertexNumber, vertexNumber - 1, vertexNumber + 1);
                this.indices.push(vertexNumber - 1, vertexNumber, vertexNumber - 2);
                this.indices.push(vertexNumber + 1, vertexNumber - 1, vertexNumber);
                this.indices.push(vertexNumber, vertexNumber - 1, vertexNumber - 2);

                vertexNumber += 2;
            }

            vertexNumber += 2;
        }

        for (var i = 0; i < this.slices; i++) {

            var x0 = Math.cos(ang) * this.size / 2;
            var y0 = Math.sin(ang) * this.size / 2;
            var x1 = Math.cos(ang + angIncrement) * this.size / 2;
            var y1 = Math.sin(ang + angIncrement) * this.size / 2;

            var s0 = (x0 / this.size + 1) / 2;
            var t0 = (y0 / this.size + 1) / 2;
            var s1 = (x1 / this.size + 1) / 2;
            var t1 = (y1 / this.size + 1) / 2;

            // Bottom face
            this.vertices.push(...bottomCenter);
            this.vertices.push(x1, y1, -this.size / 2);
            this.vertices.push(x0, y0, -this.size / 2);

            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, -1);

            this.texCoords.push(s0, t0);
            this.texCoords.push(s1, t0);
            this.texCoords.push(s0, t1);

            var bottomCenterIdx = this.vertices.length / 3 - 3;
            var bottomIdx1 = this.vertices.length / 3 - 2;
            var bottomIdx2 = this.vertices.length / 3 - 1;

            this.indices.push(bottomCenterIdx, bottomIdx1, bottomIdx2);

            // Top face
            this.vertices.push(...topCenter);
            this.vertices.push(x0, y0, this.size / 2);
            this.vertices.push(x1, y1, this.size / 2);

            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);

            this.texCoords.push(s0, t0);
            this.texCoords.push(s0, t1);
            this.texCoords.push(s1, t0);

            var topCenterIdx = this.vertices.length / 3 - 3;
            var topIdx1 = this.vertices.length / 3 - 1;
            var topIdx2 = this.vertices.length / 3 - 2;

            this.indices.push(topIdx2, topIdx1, topCenterIdx);

            ang += angIncrement;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
