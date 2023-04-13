import { CGFobject } from '../lib/CGF.js';

export class MyIsoTriangle extends CGFobject {
  constructor(scene, base, height) {
    super(scene);

    this.base = base;
    this.height = height;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      -this.base / 2, 0, 0,    // 0
      this.base / 2, 0, 0,     // 1
      0, this.height, 0        // 2
    ];

    this.indices = [
      0, 1, 2
    ];

    // other face
    this.indices.push(2, 1, 0);

    // normal vectors for each vertex
    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ];

    //this.texCoords = [
    //  0, 0,
    // 1, 0,
    // 0.5, 1
    //];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
