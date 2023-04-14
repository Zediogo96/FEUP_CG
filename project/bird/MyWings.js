
import { CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyTriangle } from '../objects/MyTriangle.js';
import { MyCuboid } from '../objects/MyCuboid.js';


/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWings extends CGFobject {
  constructor(scene, quadHeight, quadWidth, triangleSize, tex1) {

    super(scene);
    // this.wing = new MyQuad(this.scene, quadHeight, quadWidth);
    this.wing = new MyCuboid(this.scene, quadHeight, quadWidth, 0.1, tex1, tex1, tex1, tex1, tex1, tex1);
    this.wingEnd = new MyTriangle(this.scene, triangleSize);
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0, 1.2, 5.8);
    this.scene.rotate(- Math.PI / 3, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
     
    this.scene.translate(0, 1.2, -5.8);
    this.scene.rotate(Math.PI / 3, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 1.8, 7.3);
    this.scene.rotate(- Math.PI / 2, 0, 1, 0);
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.rotate(- Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI / 9, 1, 0, 0);
    this.wingEnd.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 1.8, -7.3);
    this.scene.rotate(- Math.PI / 2, 0, 1, 0);
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI / 9, 1, 0, 0);

    this.wingEnd.display();
    this.scene.popMatrix();
  }
}