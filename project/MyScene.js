import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyTriangularPrism } from "./objects/MyTriangularPrism.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBird } from "./bird/MyBird.js";


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

    this.bird = new MyBird(this,3);

    this.test = new MyTriangularPrism(this, 5);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 0.3;
    this.displayNormals = false;
    this.shouldMagnify = true;

    this.displayPanorama = false;
    this.displaySphere = false;
    this.displayTerrain = true;
    this.displayBird = true;

    // MOVEMENT RELATED VARIABLES
    this.speedFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/earth.jpg");

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
      2,
      0.1,
      1000,
      vec3.fromValues(5, 1, 5),
      vec3.fromValues(0, 0, 0)
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

    // ---- BEGIN Primitive drawing section
    if (this.displaySphere) {
      this.pushMatrix();
      this.appearance.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if (this.displayTerrain) {
      this.pushMatrix();
      this.appearance.apply();
      this.terrain.display();
      this.popMatrix();
    }

    if (this.displayPanorama) { this.panorama.display(); }

    if (this.displayBird) {
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor)
      this.bird.display();
      this.popMatrix();
    }

    // this.pushMatrix();
    // this.test.display();
    // this.popMatrix();

    // ---- END Primitive drawing section
  }
}
