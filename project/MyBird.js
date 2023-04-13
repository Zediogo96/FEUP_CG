
import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';

import { MySphere } from "./MySphere.js";
import { MyQuad } from './MyQuad.js';
import { MyCuboid } from './MyCuboid.js';
import { MyCone } from './MyCone.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {

        super(scene);

        this.tex1 = new CGFtexture(this.scene, 'images/birdBody.jpg');

        this.sphere = new MySphere(this.scene, 30, 30, 0.5, false);
        this.bodyCuboid = new MyCuboid(this.scene, 8, 4, 5, this.tex1, this.tex1, 0 , this.tex1);
        this.headCuboid = new MyCuboid(this.scene, 4, 4, 4);
        this.cone = new MyCone(this.scene, 10,10, 1, 2);

        this.wing = new MyQuad(this.scene, 3, 5);

        this.wingEnd = new MyTriangle(this.scene, 1.6);

        this.eye = new MySphere(this.scene, 30, 30, 0.5, false);

        // this.oval_teste = new MyOval(20,20,50)
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
        this.birdBody.apply();
        this.bodyCuboid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5, 2, 0);
        this.headCuboid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beakTex.apply();
        this.scene.translate(7, 3.1, 0);
        this.scene.rotate( - Math.PI / 2 , 0 , 0 ,1);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beakTex.apply();
        this.scene.translate(7.2, 2.5, 0);
        this.scene.rotate( - Math.PI / 2 , 0 , 0 ,1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wingTex.apply();
        this.scene.translate(0, 2.5 , 4);
        this.scene.rotate( - Math.PI / 3 , 1 , 0 ,0);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2.5 , -4);
        this.scene.rotate(Math.PI / 3 , 1 , 0 ,0);
        this.scene.scale(1, -1, -1);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.8 , 7.6);
        // rotate 45 degrees in y axis
        this.scene.rotate( - Math.PI / 2 , 0 , 1 ,0);
        this.scene.rotate( - Math.PI / 2 , 1 , 0 ,0);
        this.scene.rotate( - Math.PI / 2 , 0 , 0 ,1);
        this.scene.rotate(Math.PI / 9 , 1 , 0 ,0);
        this.wingEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.8 , -7.6);
        // rotate 45 degrees in y axis
        this.scene.rotate( - Math.PI / 2 , 0 , 1 ,0);
        this.scene.rotate( - Math.PI / 2 , 1 , 0 ,0);
        this.scene.rotate(Math.PI / 2 , 0 , 0 ,1);
        // rotate 20 degrees is Math.PI / 9
        this.scene.rotate(Math.PI / 9 , 1 , 0 ,0);
        
        this.wingEnd.display();
        this.scene.popMatrix();


        this.eyeTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(6.7, 5, 1);
        this.scene.rotate(- Math.PI / 3   , 0 , 1 ,0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(6.7, 5, -1);
        this.scene.rotate(- 2* Math.PI / 3  , 0 , 1 ,0);
        this.eye.display();
        this.scene.popMatrix();


      }
}