import { CGFshader, CGFtexture, CGFobject } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

export class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.terrainShader = new CGFshader(scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
        this.texture1 = new CGFtexture(scene, 'images/terrain.jpg');
        this.texture2 = new CGFtexture(scene, 'images/heightmap.jpg');

        this.terrainShader.setUniformsValues({ uSampler1: 1});
        this.terrainShader.setUniformsValues({ uSampler2: 2});
        this.plane = new MyPlane(scene, 20);
    }

    display() {
        this.scene.setActiveShader(this.terrainShader);
        this.scene.pushMatrix();

        this.texture1.bind(1);
        this.texture2.bind(2);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-2 * Math.PI / 3, 0, 0, 1);
        this.scene.scale(400,400,400);
        this.scene.translate(0, 0, -0.4);
        this.plane.display();

        this.scene.popMatrix();

        // restore default shader (will be needed for drawing the axis in next frame)
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    setFillMode() {
        this.plane.setFillMode();
    }

    setLineMode()
    {
        this.plane.setLineMode();

    };
}