
import { CGFobject } from '../../lib/CGF.js';
import { MyWing } from './MyWing.js';

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

    this.wing = new MyWing(this.scene, quadHeight);
  }

  update(t, y_state, velocity) {
    let delta_t = t - this.lastUpdate;

    if (delta_t > 15) { // Adjust the time interval based on the desired speed of the animation

      if (y_state === 5) {
        this.flapAngle = 0.5 * Math.sin(t / 200);
      }
      else {
      this.flapAngle = ((velocity < 0.3) ? 0.5 * Math.sin(t / 100) : 0.5 * Math.sin(t / 150)); // Adjust the increment value based on the desired rotation speed
      }

      this.lastUpdate = t;

      this.wing.update(t, delta_t, y_state, velocity, this.flapAngle);
    }
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0, 3, 1.6);
    this.scene.rotate(this.flapAngle, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 3, -1.6);
    this.scene.rotate(-this.flapAngle, 1, 0, 0);
    this.scene.scale(1, 1, -1);
    this.wing.display();
    this.scene.popMatrix();

  }
}
