
import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';

import { MyHemisphere } from './MyHemisphere.js';


/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEgg extends CGFobject {
    constructor(scene) {

        super(scene);

        this.tex1 = new CGFtexture(this.scene, 'images/cape_hill.jpg');
        this.tex2 = new CGFtexture(this.scene, 'images/terrain.jpg');

        this.hemisphere1 = new MyHemisphere(this.scene, 30, 16, 2, false);
        this.hemisphere2 = new MyHemisphere(this.scene, 30, 16, 2, false);

        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {
        const setMaterialProperties = (material, texture) => {
            material.setAmbient(0.9, 0.9, 0.9, 1);
            material.setDiffuse(0.9, 0.9, 0.9, 1);
            material.setSpecular(0.1, 0.1, 0.1, 1);
            material.setShininess(10.0);
            material.loadTexture(texture);
            material.setTextureWrap('REPEAT', 'REPEAT');
        };

        this.firstHemisphere = new CGFappearance(this.scene);
        setMaterialProperties(this.firstHemisphere, 'images/egg.png');

        this.secondHemisphere = new CGFappearance(this.scene);
        setMaterialProperties(this.secondHemisphere, 'images/egg.png');

    }


    processTextureFiltering() {
        if (this.scene.shouldMagnify) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }


    display() {

        //this.processTextureFiltering();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);

        this.scene.translate(0, 0, -0.4);
        this.scene.rotate(Math.PI , 0, 0, 1);
        this.scene.scale(0.2, 0.2, 0.3);
        this.firstHemisphere.apply();
        this.hemisphere1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.secondHemisphere.apply();
        this.scene.translate(0, 0.4, 0);
        this.scene.rotate(-Math.PI / 2, Math.PI/4, 0, 0);
        this.scene.scale(0.2, 0.2, 0.2);
        this.hemisphere2.display();
        this.scene.popMatrix();
        
    }
}