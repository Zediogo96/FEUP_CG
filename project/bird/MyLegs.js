
import { CGFobject} from '../../lib/CGF.js';
import { MyCuboid } from '../objects/MyCuboid.js';
import { MyTriangle } from '../objects/MyTriangle.js';


/**
 * MyLegs
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLegs extends CGFobject {
    constructor(scene, tex1) {

        super(scene);

        this.lastUpdate = 0;
        this.flap = true;

        this.tex1 = tex1;

        this.leg = new MyCuboid(this.scene, 0.2, 1.5, 0.2, this.tex1, this.tex1, this.tex1, this.tex1, this.tex1,this.tex1);
        this.legEnd = new MyTriangle(this.scene, 0.5);
    }

    

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-3, 0, -1)
        this.scene.rotate(- Math.PI / 8, 0, 0, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, 0, 1)
        this.scene.rotate(- Math.PI / 8, 0, 0, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, -0.5, -1)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.scene.rotate(- 2.3 * Math.PI / 3, 0, 0, 1)
        this.legEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, -0.5, 1)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.scene.rotate(- 2.3 * Math.PI / 3, 0, 0, 1)
        this.legEnd.display();
        this.scene.popMatrix();
    }
}