import { CGFobject } from '../../lib/CGF.js';

import { MyTriangle } from '../objects/MyTriangle.js';

/**
 * MyTail
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTail extends CGFobject {

  constructor(scene) {
    super(scene);

    this.lastUpdate = 0;
    this.flap = true;
    this.flapAngle = 0; // Initial angle
    this.flapDirection = 1; // 1 for up, -1 for down

    this.tail = new MyTriangle(this.scene, 1.6);
  }

  update(t) {
    let delta_t = t - this.lastUpdate;

    if (delta_t > 15) { // Adjust the time interval based on the desired speed of the animation
      this.flapAngle += 0.05 * this.flapDirection; // Adjust the increment value based on the desired rotation speed

      if (this.flapAngle >= Math.PI / 7 || this.flapAngle <= -Math.PI / 7) {
        this.flapDirection *= -1; // Reverse direction when reaching the maximum or minimum angle
      }

      this.lastUpdate = t;
    }
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(-4, 3, -3.5);
    this.scene.rotate(- Math.PI / 2, 1, 0, 0);
    this.scene.rotate(this.flapAngle, 0,1,0)

    this.scene.translate(-1.4, -1.3, 0);
    this.tail.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-4, 3, 3.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(- Math.PI / 2, 0, 0, 1);
    this.scene.rotate(this.flapAngle, 1, 0, 0);
    this.scene.translate(1.4, -1.3, 0);
    this.scene.scale(-1, 1, 1);
    this.tail.display();
    this.scene.popMatrix();
  }
}