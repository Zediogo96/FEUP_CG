import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyTriangularPrism } from "./objects/MyTriangularPrism.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyEgg } from "./MyEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBird } from "./bird/MyBird.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyTreeSpawner } from "./MyTreeSpawner.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // -- Update the scene every 12 milliseconds -- //
    this.setUpdatePeriod(12);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 30, 30, 5, false);
    this.panorama = new MyPanorama(this, 30, 30, 5, false);
    this.terrain = new MyTerrain(this);
    this.egg = new MyEgg(this, 0, 32.5, 21);
    this.nest = new MyNest(this, -45, 32.5, -27);
    this.bird = new MyBird(this, 30);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 0.45;
    this.tree = new MyBillboard(this);
    this.treeGroupPatch = new MyTreeGroupPatch(this);
    this.treeRowPatch = new MyTreeRowPatch(this);
    this.treeSpawner = new MyTreeSpawner(this, 10, 10);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 2;
    this.displayNormals = false;
    this.shouldMagnify = true;
    this.followCamera = true;

    this.displayPanorama = false;
    this.displaySphere = false;
    this.displayTerrain = true;
    this.displayEgg = true;
    this.displayNest = true

    this.displayBird = true;
    this.displayTrees = true;

    this.fps = 0;
    this.terrainFrameTime = 0;
    this.sphereFrameTime = 0;
    this.panoramaFrameTime = 0;
    this.birdFrameTime = 0;
    this.treesFrameTime = 0;

    // MOVEMENT RELATED VARIABLES
    this.speedFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/earth.jpg");
    this.texture2 = new CGFtexture(this, "images/egg.png");

    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(0.7, 0.7, 0.7, 1.0);
    this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.appearance.setSpecular(0.4, 0.4, 0.4, 1.0);
    this.appearance.setShininess(10.0);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
  }

  initLights() {
    this.lights[0].setPosition(15, 5, 5, 1);
    this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(0, 5, 0, 1);
    this.lights[1].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();

  }

  initCameras() {
    this.camera = new CGFcamera(
      45,
      0.1,
      500,
      vec3.fromValues(115, 225, 115),
      vec3.fromValues(0, 30, 0)
    );
  }

  checkKeys() {
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      this.bird.accelerate(0.01 * this.speedFactor);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      this.bird.accelerate(-0.08 * this.speedFactor);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      this.bird.turn(Math.PI / 90);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      this.bird.turn(-Math.PI / 90);
    }
    if (this.gui.isKeyPressed("Space")) {
      this.bird.ascend(0.1 * this.speedFactor);
    }
    if (this.gui.isKeyPressed("ControlLeft")) {
      this.bird.ascend(-0.1 * this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      this.bird.reset();
    }
    /* if (keysPressed)
      console.log(text); */
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t) {
    this.checkKeys();
    this.bird.update(t);
  }

  display() {

    // console.log(this.camera.position);

    let fullStart = new Date().getTime();
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.setDefaultAppearance();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

    // Draw axis
    if (this.displayAxis) this.axis.display();

    if (this.displayEgg) {
      this.pushMatrix();
      this.translate(this.egg.position[0], this.egg.position[1], this.egg.position[2])
      this.appearance.apply();
      this.egg.display();
      this.popMatrix();
    }

    if (this.displayNest) {
      this.pushMatrix();
      this.translate(this.nest.position[0], this.nest.position[1], this.nest.position[2])
      this.appearance.apply();
      this.nest.display();
      this.popMatrix();
    }
    // ---- BEGIN Primitive drawing section
    if (this.displaySphere) {
      let sphereStartTime = new Date().getTime();
      this.pushMatrix();
      this.appearance.apply();
      this.sphere.display();
      this.popMatrix();
      let sphereEndTime = new Date().getTime();
      this.sphereFrameTime = sphereEndTime - sphereStartTime;
    }

    if (this.displayTerrain) {
      let terrainStartTime = new Date().getTime();
      this.pushMatrix();
      this.appearance.setTexture(this.texture2);
      this.appearance.apply();
      this.terrain.display();
      this.appearance.setTexture(this.texture);
      this.popMatrix();
      let terrainEndTime = new Date().getTime();
      this.terrainFrameTime = terrainEndTime - terrainStartTime;
    }

    if (this.displayPanorama) {
      let panoramaStartTime = new Date().getTime();
      this.panorama.display();
      let panoramaEndTime = new Date().getTime();
      this.panoramaFrameTime = panoramaEndTime - panoramaStartTime;
    }

    let treeStartTime = new Date().getTime();

    if (this.displayTrees) {
      this.pushMatrix();
      this.treeSpawner.display();
      this.popMatrix();
    }
    let treesEndTime = new Date().getTime();
    this.treesFrameTime = treesEndTime - treeStartTime;

    let actualSpeed = Math.max(this.speedFactor * 4, 1);

    if (this.followCamera) {

      // let offsetX = 100; // Adjust the X-axis offset as desired
      // let offsetY = 100; // Adjust the Y-axis offset as desired
      // let offsetZ = 100; // Adjust the Z-axis offset as desired

      // this.camera.setPosition(vec3.fromValues(
      //   this.bird.posX * actualSpeed + offsetX,
      //   this.bird.posY * 3 + offsetY,
      //   this.bird.posZ * actualSpeed + offsetZ
      // ));

      this.camera.setTarget(vec3.fromValues(
        this.bird.posX * actualSpeed,
        this.bird.posY * 3,
        this.bird.posZ * actualSpeed
      ));

    }


    if (this.displayPanorama) { this.panorama.display(); }





    if (this.displayBird) {
      let birdStartTime = new Date().getTime();
      this.pushMatrix();
      this.setActiveShader(this.defaultShader);
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor)
      this.bird.display();
      this.popMatrix();
      let birdEndTime = new Date().getTime();
      this.birdFrameTime = birdEndTime - birdStartTime;

    }
    //this.camera.setPosition(this.bird.x, this.bird.y, this.bird.z);

    let fullEnd = new Date().getTime();
    let fullTime = fullEnd - fullStart;
    this.fps = 1000 / fullTime;
    // console.log(fullTime);

    // ---- END Primitive drawing section
  }
}
