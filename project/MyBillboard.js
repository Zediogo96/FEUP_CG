import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';
/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad(scene);

        this.treeShader = new CGFshader(scene.gl, 'shaders/tree.vert', 'shaders/tree.frag');
        this.texture1 = new CGFtexture(scene, 'images/billboardtree.png');
        this.texture2 = new CGFtexture(scene, 'images/heightmap.jpg');

        this.treeShader.setUniformsValues({ uSampler4: 4, uSampler5: 5});

        // -- Materials -- //
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.material.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.material.setShininess(5.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        // -- Textures -- //
        this.treetex = new CGFtexture(scene, "images/billboardtree.png");

    }

    /**
     * Displays the billboard in a certain position
     */
    display(x, y, z) {


        this.scene.pushMatrix();
        this.scene.setActiveShader(this.treeShader);
        this.texture1.bind(4);
        this.texture2.bind(5);
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        // -- Rotation -- //
       // this.camDir = this.scene.camera.direction;
        this.camPos = this.scene.camera.position;
        this.billboardToCamera = [this.camPos[0] - x, 0, this.camPos[2] - z];
        this.billboardToCameraNorm = Math.sqrt(this.billboardToCamera[0]*this.billboardToCamera[0] + this.billboardToCamera[1]*this.billboardToCamera[1] + this.billboardToCamera[2]*this.billboardToCamera[2]);
        this.normalDir = [this.quad.normals[0], 0, this.quad.normals[2]];
        this.normalNorm = Math.sqrt(this.normalDir[0]*this.normalDir[0] + this.normalDir[1]*this.normalDir[1] + this.normalDir[2]*this.normalDir[2]);
        // this.camDirNorm = Math.sqrt(this.camDir[0]*this.camDir[0] + this.camDir[1]*this.camDir[1] + this.camDir[2]*this.camDir[2]);
        //this.camDir = [-this.camDir[0]/this.camDirNorm, -this.camDir[1]/this.camDirNorm, -this.camDir[2]/this.camDirNorm];
        this.normalDir = [this.normalDir[0]/this.normalNorm, this.normalDir[1]/this.normalNorm, this.normalDir[2]/this.normalNorm];
        this.billboardToCamera = [this.billboardToCamera[0]/this.billboardToCameraNorm, this.billboardToCamera[1]/this.billboardToCameraNorm, this.billboardToCamera[2]/this.billboardToCameraNorm];
        //console.log(this.billboardToCamera);
        this.angle = vec3.create();
        this.angle = vec3.dot(this.billboardToCamera, this.normalDir);
        this.rotationAngle = Math.acos(this.angle);
        this.rotationAxis = vec3.create();
        vec3.cross(this.rotationAxis, this.normalDir,this.billboardToCamera);

        if(this.rotationAxis[z] < 0)
            this.rotationAngle = this.rotationAngle;
    
        // -- Planes -- //
        // -- Material -- //
        this.material.setTexture(this.treetex);
        this.material.apply();
        // -- Object Front -- //
        if(this.billboardToCamera[y] < 0)
        this.rotationAngle = this.rotationAngle;
        this.scene.translate(x,y,z);
        this.scene.rotate(this.rotationAngle, this.rotationAxis[2], this.rotationAxis[1], 0);
        this.scene.scale(6, 12, 1);

        this.quad.display();
        this.scene.popMatrix();

        
        // restore default shader (will be needed for drawing the axis in next frame)
        this.scene.setActiveShader(this.scene.defaultShader);
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