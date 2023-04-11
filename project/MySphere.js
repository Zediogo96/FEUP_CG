import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
  constructor(scene, slices, sectors, radius) {
    super(scene);
    this.numSlices = sectors * 2;
    this.numSectors = slices;
    this.radius = radius;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let phi = 0;
    let theta = 0;
    const phiIncrement = Math.PI / this.numSlices;
    const thetaIncrement = (2 * Math.PI) / this.numSectors;
    const numVerticesPerSlice = this.numSectors + 1;

    const sectorSize = 1 / this.numSectors;
    const sliceSize = 1 / this.numSlices;

    for (let slice = 0; slice <= this.numSlices; slice++) {
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      theta = 0;
      for (let sector = 0; sector <= this.numSectors; sector++) {
        const x = this.radius * Math.cos(theta) * sinPhi;
        const y = this.radius * cosPhi;
        const z = this.radius * Math.sin(-theta) * sinPhi;
        this.vertices.push(x, y, z);

        if (slice < this.numSlices && sector < this.numSectors) {
          const currentIndex = slice * numVerticesPerSlice + sector;
          const nextIndex = currentIndex + numVerticesPerSlice;

          this.indices.push(currentIndex + 1, currentIndex, nextIndex);
          this.indices.push(currentIndex + 1, nextIndex, nextIndex + 1);
        }

        this.normals.push(x, y, z);
        theta += thetaIncrement;

        const tu = 0.25 + sectorSize * sector;
        const tv = sliceSize * slice;
        this.texCoords.push(tu, tv);
      }
      phi += phiIncrement;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
