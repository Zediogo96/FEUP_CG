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
        this.sphere = new MySphere(this.scene, 20, 20, 200, true);
        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {
        const setTextureProperties = (material, texture) => {
        //    make it transparent
            material.setEmission(1, 1, 1, 1);
            material.setTexture(texture);
            material.setTextureWrap('REPEAT', 'REPEAT');

        };

        this.appeareance = new CGFappearance(this.scene);
        this.panoramaTexture = new CGFtexture(this.scene, 'images/panorama4.jpg');
        

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

    update(t) {
        // Update texture matrix to scale texture based on distance to camera
        const distance = vec3.distance(this.scene.camera.position, this.position);
        mat4.identity(this.textureMatrix);
        mat4.scale(this.textureMatrix, this.textureMatrix, [1 / distance, 1 / distance, 1 / distance]);
    }


    display() {

        this.processTextureFiltering();
      
        const cameraPos = this.scene.camera.position;
      
        this.scene.pushMatrix();
        this.appeareance.apply();
        // translate the sphere to be centered on the camera position
        // this.scene.translate(cameraPos[0], cameraPos[1] + (this.sphere.radius / 2), cameraPos[2]);
        // rotate the sphere so that the camera is always looking at the center of the sphere
        this.scene.rotate(- Math.PI / 2, 0, 0, 1);
        this.sphere.display();
        (this.scene.displayNormals) ? this.sphere.enableNormalViz() : this.sphere.disableNormalViz();
        this.scene.popMatrix();
      }
      
        
}