
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
    

    this.wing = new MyTriangularPrism(this.scene, quadHeight, 0.2);

    this.wingEnd = new MyTriangularPrism(this.scene, quadHeight, 0.2);
  }

  update(t) {
    let delta_t = t - this.lastUpdate;
    if (delta_t > 500) {
      this.flap = !this.flap;
      this.lastUpdate = t;
    }
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0, 3, 3);
    this.scene.scale(0.7, 1, -1.3);
    this.scene.rotate(- Math.PI / 2, 0, 0, 1);
    if (this.flap) this.scene.rotate(-Math.PI / 6, 0, 1, 0); else this.scene.rotate(Math.PI / 6, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 3, -3);
    this.scene.scale(-0.7, 1, 1.3);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    if (this.flap) this.scene.rotate(Math.PI / 6, 0, 1, 0); else this.scene.rotate(-Math.PI / 6, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    // this.scene.pushMatrix();
    // this.scene.scale(0.8, 0.5, 0.5)
    // this.scene.translate(-4.5, 5.3, -12.3);
    // this.scene.rotate(Math.PI / 2, 0, 0, 1);
    // this.scene.rotate(Math.PI / 9, 0, 0, 1);
    // if (this.flap) {
    //   this.scene.translate(-3, 1, 0)
    //   this.scene.rotate(Math.PI / 8, 0, 1, 0)
    // }
    // this.wingEnd.display();
    // this.scene.popMatrix();

    // this.scene.pushMatrix();
    // this.scene.scale(0.8, 0.5, -0.5)
    // this.scene.translate(-4.5, 5.3, -12.3);
    // this.scene.rotate(Math.PI / 2, 0, 0, 1);
    // this.scene.rotate(Math.PI / 9, 0, 0, 1);
    // this.wingEnd.display();
    // this.scene.popMatrix();


  }
}