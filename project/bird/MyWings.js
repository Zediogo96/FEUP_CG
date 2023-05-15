
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
  constructor(scene, quadHeight) {
    super(scene);

    this.lastUpdate = 0;
    this.flap = true;
    this.flapAngle = 0; // Initial angle
    this.flapDirection = 1; // 1 for up, -1 for down

    this.wing = new MyTriangularPrism(this.scene, quadHeight, 0.2);
    this.wingEnd = new MyTriangularPrism(this.scene, quadHeight, 0.2);
  }

  update(t) {
    let delta_t = t - this.lastUpdate;

    if (delta_t > 15) { // Adjust the time interval based on the desired speed of the animation
      this.flapAngle += 0.05 * this.flapDirection; // Adjust the increment value based on the desired rotation speed

      if (this.flapAngle >= Math.PI / 6 || this.flapAngle <= -Math.PI / 6) {
        this.flapDirection *= -1; // Reverse direction when reaching the maximum or minimum angle
      }
      
      this.lastUpdate = t;
    }
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 3, 3);
    this.scene.scale(0.7, 1, -1.3);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(this.flapAngle, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 3, -3);
    this.scene.scale(-0.7, 1, 1.3);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-this.flapAngle, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();
  }
}
