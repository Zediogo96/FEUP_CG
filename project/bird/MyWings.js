
import { CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyTriangle } from '../objects/MyTriangle.js';
import { MyCuboid } from '../objects/MyCuboid.js';
import { MyTriangularPrism } from '../objects/MyTriangularPrism.js';


/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWings extends CGFobject {
  constructor(scene, quadHeight, quadWidth, triangleSize, tex1) {

    super(scene);
    // this.wing = new MyQuad(this.scene, quadHeight, quadWidth);
    // this.wing = new MyCuboid(this.scene, quadHeight, quadWidth, 0.1, tex1, tex1, tex1, tex1, tex1, tex1);
    // this.wingEnd = new MyTriangle(this.scene, triangleSize);

    this.wing = new MyTriangularPrism(this.scene, quadHeight, 0.2);

    this.wingEnd = new MyTriangularPrism(this.scene, quadHeight, 0.2);
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0, 3, 3);
    this.scene.scale(0.7, 1, -1.3);
    this.scene.rotate(- Math.PI / 2, 0, 0, 1);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 3, -3);
    this.scene.scale(-0.7, 1, 1.3);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.8, 0.5, 0.5)
    this.scene.translate(-4.5, 5.3, -12.3);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    // rotate 20 degrees
    this.scene.rotate(Math.PI / 9, 0, 0, 1);
    this.wingEnd.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.8, 0.5, -0.5)
    this.scene.translate(-4.5, 5.3, -12.3);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    // rotate 20 degrees
    this.scene.rotate(Math.PI / 9, 0, 0, 1);
    this.wingEnd.display();
    this.scene.popMatrix();


  }
}