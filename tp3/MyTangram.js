import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);

    }

    initMaterials() {
        // VERDE LIMA
        this.verdeLima = new CGFappearance(this.scene);
		this.verdeLima.setAmbient(0.1961, 0.8039, 0.1961, 1.0);
    	this.verdeLima.setDiffuse(0, 0, 0, 1.0);
    	this.verdeLima.setSpecular(0.1961, 0.8039, 0.1961, 1.0); 
    	this.verdeLima.setShininess(10.0);

        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1, 0.6471, 0.31, 1.0);
        this.orange.setDiffuse(0, 0, 0, 1.0);
        this.orange.setSpecular(1, 0.6471, 0.31, 1.0);
        this.orange.setShininess(10.0);

        // dark purple 38%, 25%, 32%
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.47, 0.14, 0.56, 1.0);
        this.purple.setDiffuse(0, 0, 0, 1.0);
        this.purple.setSpecular(0.47, 0.14, 0.56, 1.0);
        this.purple.setShininess(10.0);


        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.8039, 0.1961, 0.1961, 1.0);
        this.red.setDiffuse(0, 0, 0, 1.0);
        this.red.setSpecular(0.8039, 0.1961, 0.1961, 1.0);
        this.red.setShininess(10.0);

        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.1961, 0.1961, 0.9039, 1.0);
        this.blue.setDiffuse(0, 0, 0, 1.0);
        this.blue.setSpecular(0.1961, 0.1961, 0.8039, 1.0);
        this.blue.setShininess(10.0);

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(0.8039, 0.8039, 0.1961, 1.0);
        this.yellow.setDiffuse(0, 0, 0, 1.0);
        this.yellow.setSpecular(0.8039, 0.8039, 0.1961, 1.0);
        this.yellow.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(0.8039, 0.1961, 0.8039, 1.0);
        this.pink.setDiffuse(0, 0, 0, 1.0);
        this.pink.setSpecular(0.8039, 0.1961, 0.8039, 1.0);
        this.pink.setShininess(10.0);




        
    }

    display() {

        this.initMaterials();

        // n radians = 180º ~= 3.14159 radians 
        
        // Diamond
        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.translate(-1.5, -1, 0);

        this.diamond.display();
        
        this.scene.popMatrix();

        // Bottom Right Triangles
        this.scene.pushMatrix();
        
        this.scene.translate(2, -1, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1); // rotate 45º

        this.purple.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1); // rotate 225º

        this.red.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Top Right Triangle
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.scene.translate(1, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.blue.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-3, 1, 1);
        this.scene.rotate(Math.PI, 1, 0, 0); // rotate 180º
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        // Triangle Top Left 1
        this.scene.pushMatrix();
        this.scene.translate(-2, 2, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1); // rotate 270º
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Triangle Top Left 2
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 2.5, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1); // rotate 90º
        this.scene.scale(1.5, 1.5, 1.5);
        this.orange.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }

    updateBuffers() {}

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }
}