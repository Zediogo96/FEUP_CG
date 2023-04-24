
import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../objects/MySphere.js';
import { MyEyes } from '../bird/MyEyes.js';
import { MyPrism } from '../objects/MyPrism.js';
import { MyBeak } from '../bird/MyBeak.js';

/**
 * MyChest
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
    constructor(scene, beakTex, wingTex, eyeTex) {

        super(scene);

        this.lastUpdate = 0;
        this.flap = true;

        this.beakTex = beakTex;
        this.wingTex = wingTex;
        this.eyeTex = eyeTex;
        
        this.headSphere = new MySphere(this.scene, 30, 16, 2, false);
        this.eyes = new MyEyes(this.scene);
        this.beak = new MyBeak(this.scene);
        this.feather = new MyPrism(this.scene, 1, 3, 3);

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

        this.wingTex = new CGFappearance(this.scene);
        setMaterialProperties(this.wingTex, 'images/wing.jpg');

        this.beakTex = new CGFappearance(this.scene);
        setMaterialProperties(this.beakTex, 'images/beak.jpg');

        this.eyeTex = new CGFappearance(this.scene);
        setMaterialProperties(this.eyeTex, 'images/eye.jpg');

        this.normalTex = new CGFappearance(this.scene);
        setMaterialProperties(this.normalTex, 'images/altimetrsy.png'); /* de proposito para dar o branco, lazy af */
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(5, 4, 0);
        this.scene.scale(1.2, 0.9, 0.8);
        this.normalTex.apply();
        this.headSphere.display();
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