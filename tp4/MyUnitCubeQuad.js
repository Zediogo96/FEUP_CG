import {MyQuad} from './MyQuad.js';
import { CGFappearance, CGFobject } from '../lib/CGF.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, tex1, tex2, tex3, tex4, tex5, tex6) {
		super(scene);
        this.quad = new MyQuad(this.scene);
		this.initBuffers();
        this.tex1 = tex1;
        this.tex2 = tex2;
        this.tex3 = tex3;
        this.tex4 = tex4;
        this.tex5 = tex5;
        this.tex6 = tex6;

        this.initMaterials();
	}

    initMaterials() {

        const setTextureProperties = (material, texture) => {
            material.setAmbient(0.1, 0.1, 0.1, 1);
            material.setDiffuse(0.9, 0.9, 0.9, 1);
            material.setSpecular(0.1, 0.1, 0.1, 1);
            material.setShininess(10.0);
            material.setTexture(texture);
            material.setTextureWrap('REPEAT', 'REPEAT');
        };
    
        this.topTex = new CGFappearance(this.scene);
        setTextureProperties(this.topTex, this.tex1);

        this.frontTex = new CGFappearance(this.scene);
        setTextureProperties(this.frontTex, this.tex2);

        this.rightTex = new CGFappearance(this.scene);
        setTextureProperties(this.rightTex, this.tex3);
    
        this.backTex = new CGFappearance(this.scene);
        setTextureProperties(this.backTex, this.tex4);

        this.leftTex = new CGFappearance(this.scene);
        setTextureProperties(this.leftTex, this.tex5);
              
        this.bottomTex = new CGFappearance(this.scene);
        setTextureProperties(this.bottomTex, this.tex6);
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


        this.frontTex.apply();

        this.processTextureFiltering();

        // Face 1 - front
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.backTex.apply();

        this.processTextureFiltering();

        // Face 2 (oposta a 1) - back
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Face 3 - top

        this.topTex.apply();

        this.processTextureFiltering();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.bottomTex.apply();
        
        this.processTextureFiltering();

        // Face 4 (oposta a 3) - bottom
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.leftTex.apply();

        this.processTextureFiltering();

        // Face 5 - right
        this.scene.pushMatrix();
        
        this.scene.translate(0.5, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.rightTex.apply();

        this.processTextureFiltering();

        // Face 6 (oposta a 5) - left

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();






    }
}