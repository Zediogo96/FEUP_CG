
import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';

import { MySphere } from "../objects/MySphere.js";
import { MyTriangle } from '../objects/MyTriangle.js';
import { MyCuboid } from '../objects/MyCuboid.js';
import { MyPrism } from '../objects/MyPrism.js';

import { MyWings } from './MyWings.js';
import { MyBeak } from './MyBeak.js';
import { MyEyes } from './MyEyes.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
    constructor(scene) {

        super(scene);

        this.tex1 = new CGFtexture(this.scene, 'images/beak.jpg');
        this.tex2 = new CGFtexture(this.scene, 'images/wing.jpg');

        this.beak = new MyBeak(this.scene);

        this.wings = new MyWings(this.scene, 5, 0.2, 5, this.tex2);

        this.eyes = new MyEyes(this.scene);

        this.bodySphere = new MySphere(this.scene, 30, 16, 2, false);
        this.headSphere = new MySphere(this.scene, 30, 16, 2, false);

        this.tail = new MyTriangle(this.scene, 1.6);

        this.headSpike = new MyTriangle(this.scene, 0.5);

        this.leg = new MyCuboid(this.scene, 0.2, 1.5, 0.2, this.tex1, this.tex1, this.tex1, this.tex1, this.tex1, this.tex1);

        this.legEnd = new MyTriangle(this.scene, 0.5);

        this.feather = new MyPrism(this.scene, 1, 3, 3);

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

        this.birdBody = new CGFappearance(this.scene);
        setMaterialProperties(this.birdBody, 'images/birdBody.jpg');

        this.beakTex = new CGFappearance(this.scene);
        setMaterialProperties(this.beakTex, 'images/beak.jpg');

        this.wingTex = new CGFappearance(this.scene);
        setMaterialProperties(this.wingTex, 'images/wing.jpg');

        this.eyeTex = new CGFappearance(this.scene);
        setMaterialProperties(this.eyeTex, 'images/eye.jpg');

        this.normalTex = new CGFappearance(this.scene);
        setMaterialProperties(this.normalTex, 'images/altimetrsy.png'); /* de proposito para dar o branco, lazy af */

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

        this.processTextureFiltering();

        this.scene.pushMatrix();
        this.scene.scale(2, 1.1, 0.9);
        this.scene.translate(0, 2.4, 0);
        this.normalTex.apply();
        this.bodySphere.display();
        this.birdBody.apply();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(2.1, 1.1, 1);
        this.scene.translate(0, 2.5, 0);
        this.birdBody.apply();
        this.bodySphere.display();
        this.birdBody.apply();
        this.scene.popMatrix();

        this.normalTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(5, 4, 0);
        this.scene.scale(1.2, 0.9, 0.8);
        this.headSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wingTex.apply();
        this.wings.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beakTex.apply();
        this.beak.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.eyeTex.apply();
        this.eyes.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wingTex.apply();
        this.scene.translate(-5.5, 3, -2);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-5.5, 3, 2);
        this.scene.scale(1, 1, -1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, 0, -1)
        this.scene.rotate(- Math.PI / 8, 0, 0, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beakTex.apply();
        this.scene.translate(-3, 0, 1)
        this.scene.rotate(- Math.PI / 8, 0, 0, 1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, -0.5, -1)
        this.scene.rotate(Math.PI / 2,0 , 1, 0)
        this.scene.rotate(- 2.3 * Math.PI / 3 , 0 , 0, 1)
        this.legEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3, -0.5, 1)
        this.scene.rotate(Math.PI / 2,0 , 1, 0)
        this.scene.rotate(- 2.3 * Math.PI / 3 , 0 , 0, 1)
        this.legEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wingTex.apply();
        this.scene.translate(5, 6.0, 0);
        this.scene.scale(1, 1, 0.2)
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.feather.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 5.8, 0);
        this.scene.scale(1, 1, 0.2)
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.scene.rotate(Math.PI / 8, 0, 0, 1);
        this.feather.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, 5.2, 0);
        this.scene.scale(1, 1, 0.2)
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.scene.rotate(Math.PI / 5, 0, 0, 1);
        this.feather.display();
        this.scene.popMatrix();
    }
}