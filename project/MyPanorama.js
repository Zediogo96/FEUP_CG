import { MySphere } from "./MySphere.js";
import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene) {

        super(scene);
        this.sphere = new MySphere(this.scene, 30, 30, 5, true);
        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {
        const setTextureProperties = (material, texture) => {
            material.setAmbient(0.9, 0.9, 0.9, 1);
            material.setDiffuse(1.0, 1.0, 1.0, 1);
            material.setSpecular(1.0, 1.0, 1.0, 1);
            material.setShininess(10);
            material.setTexture(texture);
            material.setTextureWrap('REPEAT', 'REPEAT');
        };

        this.appeareance = new CGFappearance(this.scene);
        this.panoramaTexture = new CGFtexture(this.scene, 'images/panorama4.jpg');
        console.log(this.panoramaTexture)

        setTextureProperties(this.appeareance, this.panoramaTexture);
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
        this.appeareance.apply();
        this.sphere.display();
        (this.scene.displayNormals) ? this.sphere.enableNormalViz() : this.sphere.disableNormalViz();
        this.scene.popMatrix();
    }
        
}