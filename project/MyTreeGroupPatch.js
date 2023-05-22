import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
*/
export class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
        super(scene);

        this.tree = new MyBillboard(scene);

        // -- Shaders -- //
        this.treeShader = new CGFshader(scene.gl, "shaders/tree.vert", "shaders/tree.frag");
        // -- Random Offsets -- //
        this.offset1 = ((Math.random() * 2) - 1) * 3;
        this.offset2 = ((Math.random() * 2) - 1) * 3;
        this.offset3 = ((Math.random() * 2) - 1) * 2;
        this.offset4 = ((Math.random() * 2) - 1) * 4;
        this.offset5 = ((Math.random() * 2) - 1) * 3;
        this.offset6 = ((Math.random() * 2) - 1) * 3;
        this.offset7 = ((Math.random() * 2) - 1) * 1;
        this.offset8 = ((Math.random() * 2) - 1) * 3;
        this.offset9 = ((Math.random() * 2) - 1) * 2;

        this.counter = 0;

        // -- Materials -- //
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.material.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.material.setShininess(5.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        // -- Textures -- //
        this.treetex1 = new CGFtexture(scene, "images/billboardtree.png");
        this.treetex2 = new CGFtexture(scene, "images/tree2.png");
        this.treetex6 = new CGFtexture(scene, "images/tree6.png");

        this.textures = [this.treetex1, this.treetex2, this.treetex6];

        this.textures = mixElements(this.textures);
        this.textureSelection1 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection2 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection3 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection4 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection5 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection6 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection7 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection8 = this.textures[0];

        this.textures = mixElements(this.textures);
        this.textureSelection9 = this.textures[0];
    }

    /**
     * Displays the billboard in a certain position
    */
    display(x, z, treeNumberGroup) {
        this.counter++;

        this.scene.setActiveShader(this.treeShader);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x - 10 + this.offset1 });
        this.material.setTexture(this.textureSelection1);
        this.material.apply();
        this.tree.display(x - 10 + this.offset1, z - 10 + this.offset6, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x + this.offset5 });
        this.material.setTexture(this.textureSelection2);
        this.material.apply();
        this.tree.display(x + this.offset5, z - 10 + this.offset3, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x + 10 + this.offset9 });
        this.material.setTexture(this.textureSelection3);
        this.material.apply();
        this.tree.display(x + 10 + this.offset9, z - 10 + this.offset4, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x - 10 + this.offset4 });
        this.material.setTexture(this.textureSelection4);
        this.material.apply();
        this.tree.display(x - 10 + this.offset4, z + this.offset5, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x + this.offset2 });
        this.material.setTexture(this.textureSelection5);
        this.material.apply();
        this.tree.display(x + this.offset2, z + this.offset8, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x + 10 + this.offset6 });
        this.material.setTexture(this.textureSelection6);
        this.material.apply();
        this.tree.display(x + 10 + this.offset6, z + this.offset7, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x - 10 + this.offset7 });
        this.material.setTexture(this.textureSelection7);
        this.material.apply();
        this.tree.display(x - 10 + this.offset7, z + 10 + this.offset1, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x + this.offset8 });
        this.material.setTexture(this.textureSelection8);
        this.material.apply();
        this.tree.display(x + this.offset8, z + 10 + this.offset9, treeNumberGroup);

        this.treeShader.setUniformsValues({ time: performance.now() / 1000, xOff: x + 10 + this.offset3 });
        this.material.setTexture(this.textureSelection9);
        this.material.apply();
        this.tree.display(x + 10 + this.offset3, z + 10 + this.offset2, treeNumberGroup);
    }

    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.quad.enableNormalViz()
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.quad.disableNormalViz()
    }
}

function mixElements(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

