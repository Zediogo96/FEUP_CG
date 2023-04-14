
import { CGFobject } from '../../lib/CGF.js';
import { MyQuad } from '../objects/MyQuad.js';
import { MyTriangle } from '../objects/MyTriangle.js';


/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWings extends CGFobject {
  constructor(scene, quadHeight, quadWidth, triangleSize) {
    super(scene);
    this.wing = new MyQuad(this.scene, quadHeight, quadWidth);
    this.wingEnd = new MyTriangle(this.scene, triangleSize);
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0, 2.5, 3.9);
    this.scene.rotate(- Math.PI / 3, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 2.5, -3.9);
    this.scene.rotate(Math.PI / 3, 1, 0, 0);
    this.scene.scale(1, -1, -1);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 1.8, 7.5);
    // rotate 45 degrees in y axis
    this.scene.rotate(- Math.PI / 2, 0, 1, 0);
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.rotate(- Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI / 9, 1, 0, 0);
    this.wingEnd.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 1.8, -7.5);
    // rotate 45 degrees in y axis
    this.scene.rotate(- Math.PI / 2, 0, 1, 0);
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    // rotate 20 degrees is Math.PI / 9
    this.scene.rotate(Math.PI / 9, 1, 0, 0);

    this.wingEnd.display();
    this.scene.popMatrix();
  }
}