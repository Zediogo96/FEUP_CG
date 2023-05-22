import { CGFobject } from '../../lib/CGF.js';
import { MyTriangularPrism } from '../objects/MyTriangularPrism.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
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

        console.log(y_state)
    
        if (delta_t > 15) { // Adjust the time interval based on the desired speed of the animation
    
          if (y_state === 5) {
            this.flapAngle = 0.5 * Math.sin(t / 200);
          }
          else {
          
          this.flapAngle = ((velocity < 0.3) ? 0.5 * Math.sin(t / 100) : 0.5 * Math.sin(t / 150)); // Adjust the increment value based on the desired rotation speed
          }
    
          this.lastUpdate = t;
        }
      }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(1, -0.5, -1.3);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.3, 0, 6.6);
        this.scene.rotate(Math.PI / 9, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.5, -0.5, 0.5);
        this.scene.rotate(-this.flapAngle, 0,0,1);
        this.scene.translate(0, 2.5, -1);
        this.wingEnd.display();
        this.scene.popMatrix();
    }
}