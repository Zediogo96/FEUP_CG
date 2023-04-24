
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

        // -- AUTOPILOT -- //
        // TODO
        // TODO
        // TODO

        // -- OBJECTS -- //
        this.bird = new MyBirdObjects(this.scene);
    }

    reset () {
        this.velocity = 0;
        this.angleY = 0;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.lastUpdate = 0;
    }

    turn(val) {
        this.angleY += val;        
    }
    
    accelerate(val) {

        this.velocity += val;
        this.velocity = ((this.velocity > 0) ? this.velocity : 0);
        this.velocity = Math.min(this.velocity, 1);
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
        this.scene.rotate(-this.angleY, 0, 0, 1);

        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        
        this.bird.display();
        this.scene.popMatrix();
    }
}