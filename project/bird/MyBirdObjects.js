
import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';


import { MyWings } from './MyWings.js';
import { MyChest } from './MyChest.js';
import { MyHead } from './MyHead.js';

import { MyTail } from './MyTail.js';

import { MyLegs } from './MyLegs.js';

/**
 * MyBirdObjects
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdObjects extends CGFobject {
    constructor(scene) {

        super(scene);

        // -- ANIMATIONS -- //
        this.flap = false;
        this.lastUpdate = 0;
        this.flapDirection = 1;
        this.offset = 0;

        // -- TEXTURES -- //
        this.tex1 = new CGFtexture(this.scene, 'images/beak.jpg');
        this.tex2 = new CGFtexture(this.scene, 'images/wing.jpg');

        // -- OBJECTS -- //

        this.wings = new MyWings(this.scene, 5, 0.2, 5, this.tex2);

        this.body = new MyChest(this.scene);

        this.head = new MyHead(this.scene, this.beakTex, this.wingTex, this.eyeTex);

        this.tail = new MyTail(this.scene);

        this.legs = new MyLegs(this.scene, this.tex1);

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

    update(t) {
        let delta_t = t - this.lastUpdate;

        if (delta_t > 20) {

            if (this.offset >= 0.1 || this.offset <= -0.1) {
                this.flapDirection *= -1;
            }

            this.offset += 0.01 * this.flapDirection;
            
            this.lastUpdate = t;
        }
    
    }

    display() {

        this.processTextureFiltering();

        this.scene.pushMatrix();
        this.birdBody.apply();
        this.scene.translate(0, this.offset, 0)
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wingTex.apply();
        this.wings.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -this.offset, 0)
        this.scene.translate(1.5, 1.6, 0)
        this.scene.scale(0.7, 0.7, 0.7);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tail.display();
        this.scene.popMatrix();       
        
        this.scene.pushMatrix();
        this.beakTex.apply();
        this.scene.translate(0, 0.8, 0);
        this.legs.display();
        this.scene.popMatrix();    
        
        
    }
}