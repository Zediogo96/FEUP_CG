import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
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
    
    this.bird = new MyBird(this, 30);
    this.initCameras();
    this.initLights();

    this.eggHeight = 29.5;

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
    // Creation of 4 eggs
    this.eggs = [];
    this.eggs.push(new MyEgg(this, -5, this.eggHeight, 19));
    this.eggs.push(new MyEgg(this, 0, this.eggHeight, -100));
    this.eggs.push(new MyEgg(this, 100, this.eggHeight, 0));
    this.eggs.push(new MyEgg(this, -65, this.eggHeight, -10));

    this.nest = new MyNest(this, -121, 65.2, -50);

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
    this.followCamera = false;
    this.thirdPersonCamera = false;

    this.displayPanorama = true;
    this.displaySphere = false;
    this.displayTerrain = true;
    this.displayEgg = false;
    this.displayNest = false;
    
    this.displayBird = false;
    this.displayTrees = true;

    this.fps = 0;
    this.terrainFrameTime = 0;
    this.sphereFrameTime = 0;
    this.panoramaFrameTime = 0;
    this.birdFrameTime = 0;
    this.treesFrameTime = 0;

    this.birdOffset = [0, 0, 0];
    this.previousOffset = [0, 0, 0];

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
      vec3.fromValues(50, 200 ,50),
      vec3.fromValues(0, 30, 0)
    );
  }

  checkKeys() {
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/

    if (this.bird.current_y_state != this.bird.y_state.RAPING) {
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
      if (this.gui.isKeyPressed("KeyX")) {
        this.bird.ascend(-0.1 * this.speedFactor);
      }
      if (this.gui.isKeyPressed("KeyR")) {
        this.bird.reset();
      }
      
      if (this.gui.isKeyPressed("KeyP") & ((this.bird.posY * 2) + 4 > this.eggHeight) & !this.bird.carrying_egg) {
        this.bird.startRaping();
      }

      if (this.gui.isKeyPressed("KeyO") & this.bird.carrying_egg) {
        if (this.nest.checkEggCollision(this.bird.getEggBeingCarried())) {
          this.nest.addEgg(this.bird.getEggBeingCarried());
          this.bird.setCarringEgg(false, null);
        }
      }

    }
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t) {

    if (this.bird.lowest_point_raping){
      for (let i = 0; i < this.eggs.length; i++) {
        if (this.bird.checkEggCollision(this.eggs[i])) {
          this.bird.setCarringEgg(true, this.eggs[i]);
          this.eggs.splice(i, 1);
        }
      }
    }

    this.checkKeys();
    this.bird.update(t);
  }

  display() {
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
      this.eggs.forEach(e => {
        this.pushMatrix();
        this.translate(e.position[0], e.position[1], e.position[2])
        e.display();
        this.popMatrix();
      });
    }

    if (this.displayNest) {
      this.pushMatrix();
      this.translate(this.nest.position[0], this.nest.position[1], this.nest.position[2])
      this.scale(2, 2, 2)
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
      this.setActiveShader(this.defaultShader);
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

    if (this.followCamera || this.thirdPersonCamera) {


      let offset = vec3.fromValues(0, 2, -20);

      const birdPosition = [this.bird.posX * actualSpeed, (this.bird.posY * 3 * 1.3)+2, this.bird.posZ * actualSpeed];
      //const birdOrientation = this.birdOffset;
      console.log("Bird: " + birdPosition);
      console.log("Camera: " + this.camera.position);

      // Calculate the camera position by adding the offset to the bird's position
      const cameraPosition = vec3.create();

      if(this.thirdPersonCamera){
        if(this.bird.velocity == 0) {
          if(this.previousOffset[0]== 0 && this.previousOffset[2] == 0 && this.previousOffset[1] == 0){
            offset = [0, 5, -20];
          }
          else{
            offset = [-this.previousOffset[0] * 20, 5, -this.previousOffset[2] * 20];
          }
        }
        else{
          offset = [(-this.birdOffset[0] * (20*(1/this.bird.velocity))) , 5*(1+this.bird.velocity), (-this.birdOffset[2] * (20*(1/this.bird.velocity)))];
          vec3.normalize(this.previousOffset, this.birdOffset);
          
        }
        vec3.add(cameraPosition, birdPosition, offset);

        // Set the camera's position and target
        this.camera.setPosition(cameraPosition);
        birdPosition[1] += 5;
        
        // Update the camera's orientation to match the bird's orientation
      }
      else{
        vec3.add(cameraPosition, birdPosition, offset);
        this.camera.setPosition(cameraPosition);
      }
      this.camera.setTarget(birdPosition);
      }

    if (this.displayPanorama) {this.setActiveShader(this.defaultShader); this.panorama.display(); }

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

    let fullEnd = new Date().getTime();
    let fullTime = fullEnd - fullStart;
    this.fps = 1000 / fullTime;
    // ---- END Primitive drawing section
  }
}
