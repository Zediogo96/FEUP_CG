
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
        this.offset = 0;
        this.offset_dir = 1;
        this.initial_y = initial_y;

        this.carrying_egg = false;
        this.egg_being_carried = null;

        this.y_state = {
            NORMAL: 1,
            ASCENDING: 2,
            DESCENDING: 3,
            WAITING_CHANGE: 4,
            STATIONARY: 5
        };

        this.last_y_state = this.y_state.NORMAL;
        this.current_y_state = this.y_state.NORMAL;

        // -- OBJECTS -- //
        this.bird = new MyBirdObjects(this.scene);
    }

    setCarringEgg(val, egg) {
        this.carrying_egg = val;
        this.egg_being_carried = egg;
        if (egg != null) egg.setBeingCarried(val);

    }

    isCarryingEgg() {
        return this.carrying_egg;
    }

    getEggBeingCarried() {
        return this.egg_being_carried;
    }


    checkEggCollision(egg) {
        let egg_pos = egg.getPosition();
        let egg_radius = egg.getRadius();
        let bird_pos = [this.posX * 2, this.posY * 2, this.posZ * 2];  
        let bird_radius = 5;

        let distanceSquared = Math.pow(egg_pos[0] - bird_pos[0], 2) + Math.pow(egg_pos[1] - bird_pos[1], 2) + Math.pow(egg_pos[2] - bird_pos[2], 2);
        let radiusSquared = Math.pow(egg_radius + bird_radius, 2);

        if (distanceSquared <= radiusSquared) {
            return true;
        }

        return false;
    }

    reset() {
        this.velocity = 0;
        this.angleY = 0;
        this.posX = 0;
        this.posY = this.initial_y;
        this.posZ = 0;
        this.lastUpdate = 0;
        this.current_y_state = 5;
        this.last_y_state = 1;
    }

    turn(val) {
        this.angleY += val;
        this.angleY = this.angleY % (2 * Math.PI);
    }

    accelerate(val) {
        this.velocity += val * this.scene.speedFactor;
        this.velocity = ((this.velocity > 0) ? this.velocity : 0);
        this.current_y_state = 1;
    }

    ascend(val) {
        this.posY += val;
        (val > 0) ? this.current_y_state = this.y_state.ASCENDING : this.current_y_state = this.y_state.DESCENDING;
    }

    update(t) {

        let birdOldPos = [this.posX, this.posY, this.posZ];
        var delta_t = t - this.lastUpdate;

        if (this.velocity === 0) {
            this.current_y_state = this.y_state.STATIONARY;
        }

        if (delta_t > 10) {

            if ((this.current_y_state == this.y_state.STATIONARY || this.current_y_state === this.y_state.ASCENDING || this.current_y_state === this.y_state.DESCENDING) && this.velocity === 0) {
                this.posY += 0.05 * Math.sin(t / 200);
            }
        }

        this.posX += this.velocity * Math.sin(this.angleY);
        this.posZ += this.velocity * Math.cos(this.angleY);       

        this.lastUpdate = t;

        if (this.egg_being_carried != null) {
            this.egg_being_carried.setPosition(this.posX, this.posY, this.posZ);
        }

        this.bird.update(t);
        
        this.bird.tail.update(t);
        
        this.bird.wings.update(t, this.current_y_state, this.velocity);

        let birdNewPos = [this.posX, this.posY, this.posZ];
        let birdOffset = [(birdNewPos[0] - birdOldPos[0]) , (birdNewPos[1] - birdOldPos[1]), (birdNewPos[2] - birdOldPos[2])];
        // vec3.normalize(birdOffset, birdOffset);
        birdOffset[0] *= -4;
        birdOffset[1] *= 0;
        birdOffset[2] *= -4;

        this.scene.birdOffset = birdOffset;

    }

    display() {

        if (this.egg_being_carried != null) {
            this.scene.pushMatrix();
            let new_pos = [this.posX, this.posY - 0.2, this.posZ];
            this.egg_being_carried.position = new_pos;
            this.scene.translate(new_pos[0], new_pos[1], new_pos[2])

            // TODO - fix egg position when bird is rotating

            this.scene.scale(0.5, 0.5, 0.5);
            this.egg_being_carried.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.translate(this.posX, this.posY, this.posZ);

        let rotationAngle = Math.min(Math.abs(this.angleY), 0.3);

        if (this.velocity === 0) (rotationAngle > 0) ? rotationAngle -= rotationAngle : rotationAngle += rotationAngle;

        (this.angleY < 0) ? rotationAngle *= -1 : rotationAngle *= 1;

        if (rotationAngle < 0.22 || rotationAngle > -0.22) this.scene.rotate(-rotationAngle, 0, 0, 1);

        this.scene.rotate(this.angleY, 0, 1, 0);
        this.scene.rotate(-rotationAngle, 0, 0, 1)
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);

        if (this.current_y_state == 2) this.scene.rotate(Math.PI / 10, 0, 0, 1);
        else if (this.current_y_state == 3) this.scene.rotate(-Math.PI / 10, 0, 0, 1);
        else if (this.current_y_state == 1 && this.last_y_state != 1) {
            (this.last_y_state == 2) ? this.scene.rotate(-Math.PI / 10, 0, 0, 1) : this.scene.rotate(Math.PI / 10, 0, 0, 1);
        }

        this.last_y_state = this.current_y_state;
        this.scene.scale(0.1, 0.1, 0.1);
        this.bird.display();
        this.scene.popMatrix();
    }
}