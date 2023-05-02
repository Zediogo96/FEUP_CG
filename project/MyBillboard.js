import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';
/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad(scene);

        // -- Materials -- //
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.material.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.material.setShininess(5.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        // -- Textures -- //
        this.treetex = new CGFtexture(scene, "images/billboardtree.png");

    }

    /**
     * Displays the billboard in a certain position
     */
    display(x, y, z) {
        // -- Planes -- //
        // -- Material -- //
        this.material.setTexture(this.treetex);
        this.material.apply();
        // -- Object Front -- //
        this.scene.pushMatrix();
        this.scene.translate(x,y,z);
        this.scene.scale(6, 12, 1);
        this.quad.display();
        this.scene.popMatrix();
    }

    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.quad.enableNormalViz()
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.quad.disableNormalViz()
    }
}