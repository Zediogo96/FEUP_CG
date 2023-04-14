
import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';

import { MySphere } from "../objects/MySphere.js";
import { MyTriangle } from '../objects/MyTriangle.js';

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

        this.tex1 = new CGFtexture(this.scene, 'images/birdBody.jpg');

        this.beak = new MyBeak(this.scene);

        this.wings = new MyWings(this.scene, 3, 5, 1.6);

        this.eyes = new MyEyes(this.scene);

        this.bodySphere = new MySphere(this.scene, 30, 16, 2, false);
        this.headSphere = new MySphere(this.scene, 30, 16, 2, false);

        this.tail = new MyTriangle(this.scene, 1.6);

        this.headSpike = new MyTriangle(this.scene, 0.5);

        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {

        this.birdBody = new CGFappearance(this.scene);
        this.birdBody.setAmbient(0.9, 0.9, 0.9, 1);
        this.birdBody.setDiffuse(0.9, 0.9, 0.9, 1);
        this.birdBody.setSpecular(0.1, 0.1, 0.1, 1);
        this.birdBody.setShininess(10.0);
        this.birdBody.loadTexture('images/birdBody.jpg');
        this.birdBody.setTextureWrap('REPEAT', 'REPEAT');

        this.beakTex = new CGFappearance(this.scene);
        this.beakTex.setAmbient(0.9, 0.9, 0.9, 1);
        this.beakTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beakTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.beakTex.setShininess(10.0);
        this.beakTex.loadTexture('images/beak.jpg');
        this.beakTex.setTextureWrap('REPEAT', 'REPEAT');

        this.wingTex = new CGFappearance(this.scene);
        this.wingTex.setAmbient(0.9, 0.9, 0.9, 1);
        this.wingTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wingTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.wingTex.setShininess(10.0);
        this.wingTex.loadTexture('images/wing.jpg');
        this.wingTex.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeTex = new CGFappearance(this.scene);
        this.eyeTex.setAmbient(0.9, 0.9, 0.9, 1);
        this.eyeTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeTex.setShininess(10.0);
        this.eyeTex.loadTexture('images/eye.jpg');
        this.eyeTex.setTextureWrap('REPEAT', 'REPEAT');

        this.normalTex = new CGFappearance(this.scene);
        this.normalTex.setAmbient(0.9, 0.9, 0.9, 1);
        this.normalTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.normalTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.normalTex.setShininess(10.0);
        this.normalTex.loadTexture('images/altimetry.jpg');
        this.normalTex.setTextureWrap('REPEAT', 'REPEAT');


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
        this.scene.scale(2.1, 1.2, 1);
        this.scene.translate(0, 2.5, 0);
        this.birdBody.apply();
        this.bodySphere.display();
        this.birdBody.apply();
    
        this.scene.popMatrix();
        this.normalTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(5, 4, 0);
        this.scene.scale(1.2, 1 , 1);
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
        this.scene.rotate( - Math.PI / 2 , 1 , 0 ,0);
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-5.5, 3, 2);
        this.scene.scale(1, 1, -1);
        this.scene.rotate(Math.PI / 2 , 1 , 0 ,0);
        this.scene.rotate( - Math.PI / 2 , 0, 0 ,1);
        this.tail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5, 6.3, 0);
        this.headSpike.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(4, 6.3, 0);
        this.scene.rotate(Math.PI / 8, 0, 0, 1);
        this.headSpike.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.3, 5.7, 0);
        this.scene.rotate(Math.PI / 8, 0, 0, 1);
        this.headSpike.display();
        this.scene.popMatrix();


      }
}