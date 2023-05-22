import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad(scene);

        // -- Shaders -- //
        this.treeShader = new CGFshader(scene.gl, "shaders/tree.vert", "shaders/tree.frag");
        this.scene.setActiveShader(this.treeShader);

        this.texture1 = new CGFtexture(scene, 'images/billboardtree.png');
        this.texture2 = new CGFtexture(scene, 'images/heightmap.jpg');
        this.yCalculated = false;
        this.treeCounter = 0;
        this.treeHeights = [];




    }



    /**
     * Displays the billboard in a certain position
    */
    display(x, z, treeNumber) {

        let start = performance.now();

        var imageURL = "images/heightmap.jpg";
        var imageCoords;
        let yCoord;
        if (!this.yCalculated) {
            imageCoords = convertCoordinatesToImage(x, z, 128);
            yCoord = getRedFromJPEG(imageURL, imageCoords.x, imageCoords.y);
            this.treeHeights.push(yCoord);
        }
        else {
            yCoord = this.treeHeights[this.treeCounter % this.treeHeights.length];
        }
        this.treeCounter++;
        if (this.treeCounter >= treeNumber && !this.yCalculated) {
            this.yCalculated = true;
        }

        if (yCoord == null) return;
        else if (yCoord < 78 || yCoord > 150) return;
        else if (yCoord >= 78 && yCoord < 90) yCoord = yCoord * 0.385;
        else if (yCoord >= 120 && yCoord <= 150) yCoord = yCoord * 0.375;
        else yCoord = yCoord * 0.37;



        this.scene.pushMatrix();
        // -- Rotation -- //
        this.camPos = this.scene.camera.target;

        this.billboardToCamera = [this.camPos[0] - x , 0, this.camPos[2] - z];
        let billboardToCameraNorm = vec3.create();
        vec3.normalize(billboardToCameraNorm, this.billboardToCamera);
        //this.billboardToCameraNorm = Math.sqrt(this.billboardToCamera[0] * this.billboardToCamera[0] + this.billboardToCamera[1] * this.billboardToCamera[1] + this.billboardToCamera[2] * this.billboardToCamera[2]);
        this.normalDir = [this.quad.normals[0], 0, this.quad.normals[2]];
        let normalDirNorm = vec3.create();
        //this.normalNorm = Math.sqrt(this.normalDir[0] * this.normalDir[0] + this.normalDir[1] * this.normalDir[1] + this.normalDir[2] * this.normalDir[2]);
        vec3.normalize(normalDirNorm, this.normalDir);
        //this.billboardToCamera = [this.billboardToCamera[0] / this.billboardToCameraNorm, this.billboardToCamera[1] / this.billboardToCameraNorm, this.billboardToCamera[2] / this.billboardToCameraNorm];
        
        this.angle = vec3.create();
        this.angle = vec3.dot(billboardToCameraNorm, normalDirNorm);
        this.rotationAngle = Math.acos(this.angle);
        this.rotationAxis = vec3.create();
        vec3.cross(this.rotationAxis, normalDirNorm, billboardToCameraNorm);



        this.scene.translate(x, yCoord, z);
        // if(this.rotationAngle > 1 || this.rotationAngle < -1){
            this.scene.rotate(this.rotationAngle, this.rotationAxis[2], this.rotationAxis[1], 0);
        // 
        this.scene.scale(6, 12, 1);
        this.quad.display();
        this.scene.popMatrix();

        let end = performance.now();
        let time = end - start;
        // if(time > 0){
        //     console.log("Billboard Group: " + time + " ms");
        // }



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

function getRedFromJPEG(imageURL, x, y) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageURL;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var imageData = context.getImageData(0, 0, img.width, img.height).data;

    var pixelIndex = (y * img.width + x) * 4;
    var red = imageData[pixelIndex + 1];

    return red;

}




function convertCoordinatesToImage(x, y, imageSize) {
    var newX = Math.floor((x + 200) * (imageSize - 1) / 400);
    var newY = Math.floor((y + 200) * (imageSize - 1) / 400);
    return { x: newX, y: newY };
}
