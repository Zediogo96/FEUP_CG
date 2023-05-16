
import { CGFobject } from '../../lib/CGF.js';
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

  update(t, y_state, velocity) {
    let delta_t = t - this.lastUpdate;

    if (delta_t > 15) { // Adjust the time interval based on the desired speed of the animation

      if (y_state === 5) {
        this.flapAngle += 0.05 * this.flapDirection / 1.9
      }
      else {
      
      this.flapAngle += 0.05 * this.flapDirection * ((velocity < 0.7) ? 2.5 : velocity); // Adjust the increment value based on the desired rotation speed
      }
      if (this.flapAngle >= Math.PI / 6 || this.flapAngle <= -Math.PI / 6) {
        this.flapDirection *= -1; // Reverse direction when reaching the maximum or minimum angle
      }

      this.lastUpdate = t;
    }
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0, 3, 2);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(this.flapAngle, 0, 1, 0);
    this.scene.scale(1, -0.5, -1.3);
    this.scene.translate(0, -0.7, -0.8);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 3, -2);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-this.flapAngle, 0, 1, 0);
    this.scene.scale(1, -0.5, 1.3);
    this.scene.translate(0, -0.7, -0.8);
    this.wing.display();
    this.scene.popMatrix();
  }
}
