import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 30, 30, 5, false);
    this.panorama = new MyPanorama(this, 30, 30, 5, false);
    this.terrain = new MyTerrain(this);

    this.bird = new MyBird(this);
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 0.3;
    this.displayNormals = false;
    this.shouldMagnify = true;

    this.displayPanorama = false;
    this.displaySphere = false;
    this.displayTerrain = false;

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
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    if (this.displayPanorama){ this.panorama.display();}

    this.pushMatrix();
    this.bird.display();
    this.popMatrix();

    

    // ---- END Primitive drawing section
  }
}