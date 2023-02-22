import { CGFobject } from '../lib/CGF.js';
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

    display() {

        // n radians = 180º ~= 3.14159 radians 
        
        // Diamond
        this.scene.pushMatrix();
    
        this.scene.translate(-1.5, -1, 0);
        this.diamond.display();
        this.scene.popMatrix();

        // Bottom Right Triangles
        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1); // rotate 45º
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.75);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1); // rotate 225º
        this.triangle.display();
        this.scene.popMatrix();

        // Top Right Triangle
        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.scene.translate(1, 1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-3, 1, 1);
        this.scene.rotate(Math.PI, 1, 0, 0); // rotate 180º
        this.parallelogram.display();
        this.scene.popMatrix();

        // Triangle Top Left 1
        this.scene.pushMatrix();
        this.scene.translate(-2, 2, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1); // rotate 270º
        this.triangle.display();
        this.scene.popMatrix();

        // Triangle Top Left 2
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 2.5, 1.5);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1); // rotate 90º
        this.scene.scale(1.5, 1.5, 1.5);
        this.triangle.display();
        this.scene.popMatrix();
    }
}