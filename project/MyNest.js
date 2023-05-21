
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
        this.scene.rotate(-Math.PI / 2, Math.PI/4, 0, 0);
        this.scene.scale(0.8, 0.8, 0.4);
        this.scene.translate(0, 0, 2);
        this.hemisphere1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.hemisphere.apply();
        this.scene.rotate(Math.PI , 1,0,0);
        this.scene.scale(0.8, 0.4, 0.8);
        this.scene.translate(0,  -2, 0);
        this.hemisphere2.display();
        this.scene.popMatrix();
        
    }
}