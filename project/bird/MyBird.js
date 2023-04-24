
import { CGFobject } from '../../lib/CGF.js';

import { MyBirdObjects } from './MyBirdObjects.js';

export class MyBird extends CGFobject {
    constructor(scene, initial_y) {

        super(scene);

        // -- VARIABLES -- //
        this.velocity = 0;
        this.angleY = 0;
        this.posX = 0;
        this.posY = initial_y;
        this.posZ = 0;
        this.lastUpdate = 0;

        this.y_state = {
            NORMAL: 1,
            ASCENDING: 2,
            DESCENDING: 3,
            WAITING_CHANGE: 4
        };

        this.last_y_state = this.y_state.NORMAL;
        this.current_y_state = this.y_state.NORMAL;

        // -- AUTOPILOT -- //
        // TODO
        // TODO
        // TODO

        // -- OBJECTS -- //
        this.bird = new MyBirdObjects(this.scene);
    }

    reset() {
        this.velocity = 0;
        this.angleY = 0;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.lastUpdate = 0;
        this.current_y_state = 1;
    }

    turn(val) {
        this.angleY += val;
        this.angleY = this.angleY % (2 * Math.PI);
    }

    accelerate(val) {

        this.velocity += val;
        this.velocity = ((this.velocity > 0) ? this.velocity : 0);
        this.velocity = Math.min(this.velocity, 1);
        this.current_y_state = 1;
    }

    ascend(val) {
        this.posY += val;
        (val > 0) ? this.current_y_state = this.y_state.ASCENDING : this.current_y_state = this.y_state.DESCENDING;
    }


    update(t) {
        var delta_t = t - this.lastUpdate;

        this.posX += this.velocity * Math.sin(this.angleY);
        this.posZ += this.velocity * Math.cos(this.angleY);

        this.position += this.velocity * (delta_t / 1000);

        this.lastUpdate = t;

        this.bird.update(t);

        this.bird.body.update(t);

        this.bird.wings.update(t);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.posX, this.posY, this.posZ);

        let rotationAngle = Math.min(Math.abs(this.angleY), 0.3);
        (this.angleY < 0) ? rotationAngle *= -1 : rotationAngle *= 1;
        this.scene.rotate(this.angleY, 0, 1, 0);
        this.scene.rotate(-rotationAngle, 0, 0, 1)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);

        if (this.current_y_state == 2) this.scene.rotate(Math.PI / 10 , 0, 0, 1);
        else if (this.current_y_state == 3) this.scene.rotate(-Math.PI / 10 , 0, 0, 1);
        else if (this.current_y_state == 1 && this.last_y_state != 1) {
            (this.last_y_state == 2) ? this.scene.rotate(-Math.PI / 10 , 0, 0, 1) : this.scene.rotate(Math.PI / 10 , 0, 0, 1);
        }

        this.last_y_state = this.current_y_state;
        
        this.bird.display();
        this.scene.popMatrix();
    }
}