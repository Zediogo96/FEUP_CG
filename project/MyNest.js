
import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';

import { MyHemisphere } from './MyHemisphere.js';


/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
    constructor(scene, posX, posY, posZ) {

        super(scene);


        //this.nestShader = new CGFshader(scene.gl, 'lib/CGF/shaders/Gouraud/textured/fragment.glsl');
        this.tex1 = new CGFtexture(this.scene, 'images/cape_hill.jpg');
        this.tex2 = new CGFtexture(this.scene, 'images/terrain.jpg');

        this.position = [posX, posY, posZ];

        this.hemisphere1 = new MyHemisphere(this.scene, 30, 16, 2, false);
        this.hemisphere2 = new MyHemisphere(this.scene, 30, 16, 2, true);

        this.initBuffers();
        this.initMaterials();

        this.currentEggs = [];

        this.eggs_available_positions = [
            [0.6, 1, 0.6],
            [0.6, 1, -0.6],
            [-0.6, 1, 0.6],
            [-0.6, 1, -0.6],
        ];
    }

    getPosition() {
        return this.position;
    }

    checkEggCollision(egg) {

        let eggPos = egg.getPosition();
        let eggRadius = egg.getRadius();

        let nestPos = this.getPosition();
        let nestRadius = 5;

        let distance = Math.sqrt(Math.pow((eggPos[0] * 2) - nestPos[0], 2) + Math.pow((eggPos[1] * 2) - nestPos[1], 2) + Math.pow((eggPos[2] * 2) - nestPos[2], 2));

        if (distance < eggRadius + nestRadius) {
            return true;
        }
        else {
            return false;
        }
    }

    addEgg(egg) {
        let index = this.currentEggs.length;
        let pos = this.eggs_available_positions[index];
        egg.beingCarried = false;
        egg.position = pos;
        this.currentEggs.push(egg);
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

        this.hemisphere = new CGFappearance(this.scene);
        setMaterialProperties(this.hemisphere, 'images/nest.png');

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
        this.hemisphere.apply();
        this.scene.rotate(-Math.PI / 2, Math.PI / 4, 0, 0);
        this.scene.scale(0.8, 0.8, 0.4);
        this.scene.translate(0, 0, 2);
        this.hemisphere1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.hemisphere.apply();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.8, 0.4, 0.8);
        this.scene.translate(0, -2, 0);
        this.hemisphere2.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.currentEggs.length; i++) {
            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5)
            this.scene.translate(this.currentEggs[i].position[0], this.currentEggs[i].position[1], this.currentEggs[i].position[2]);
            this.currentEggs[i].display();
            this.scene.popMatrix();

        }

    }
}