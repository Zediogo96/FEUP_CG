import { CGFappearance, CGFobject } from '../lib/CGF.js';
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

        this.initMaterial(scene);

        this.scene = scene;
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);

    }

    initMaterial(scene) {
        this.tangramMaterial = new CGFappearance(scene, 'images/tangram.png');
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture("images/tangram.png");
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        // n radians = 180º ~= 3.14159 radians 

        // Diamond
        this.scene.pushMatrix();

        this.scene.translate(-1.5, -1, 0);
        this.diamond.display();
        this.scene.popMatrix();

        // This needs to be done for each object, in order to updated at runtime (even if it's the first one)
        this.triangle.updateTexCoords([0, 0, 0, 0.5, 0.25, 0.25])

        // Bottom Right Triangles
        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1); // rotate 45º
        this.triangle.display();
        this.scene.popMatrix();

        this.triangle.updateTexCoords([0.5, 0.5, 0.25, 0.75, 0.75, 0.75])

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1); // rotate 225º
        this.triangle.display();
        this.scene.popMatrix();

        this.triangle.updateTexCoords([0, 0, 0.5, 0.5, 1, 0])

        // Top Right Triangle
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.scene.translate(1, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        // apply a reflection matrix to mirror the model
        var reflectionMatrix = [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        this.scene.multMatrix(reflectionMatrix);

        this.parallelogram.display();
        this.scene.popMatrix();

        this.triangle.updateTexCoords([0, 0.5, 0, 1, 0.5, 1])

        // Triangle Top Left 1
        this.scene.pushMatrix();
        this.scene.translate(-2, 2, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1); // rotate 270º
        this.triangle.display();
        this.scene.popMatrix();

        this.triangle.updateTexCoords([0.5, 0.5, 1, 1, 1, 0]);

        // Triangle Top Left 2
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 2.5, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1); // rotate 90º
        this.scene.scale(1.5, 1.5, 1.5);
        this.triangle.display();
        this.scene.popMatrix();
    }
}