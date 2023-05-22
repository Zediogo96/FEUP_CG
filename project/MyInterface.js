import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Axis');
        this.gui.add(this.scene, 'displayNormals').name('Normals');
        this.gui.add(this.scene, 'shouldMagnify').name('Magnify');

        this.gui.add(this.scene, 'displayPanorama').name('Panorama');
        this.gui.add(this.scene, 'displaySphere').name('Sphere');
        this.gui.add(this.scene, 'displayTerrain').name('Terrain');
        this.gui.add(this.scene, 'displayEgg').name('Egg');
        this.gui.add(this.scene, 'displayNest').name('Nest');
        this.gui.add(this.scene, 'displayBird').name('Bird');
        this.gui.add(this.scene, 'displayTrees').name('Trees');
        this.gui.add(this.scene, 'followCamera').name('Follow Camera');
        this.gui.add(this.scene, 'thirdPersonCamera').name('Third Person');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        //Frame rate element in GUI
        this.gui.add(this.scene, 'fps').name('FPS').listen();
        this.gui.add(this.scene, 'terrainFrameTime').name('Terrain Time').listen();
        this.gui.add(this.scene, 'sphereFrameTime').name('Sphere Time').listen();
        this.gui.add(this.scene, 'panoramaFrameTime').name('Panorama Time').listen();
        this.gui.add(this.scene, 'birdFrameTime').name('Bird Time').listen();
        this.gui.add(this.scene, 'treesFrameTime').name('Trees Time').listen();



        this.initKeys();

        return true;
    }

    initKeys() {
        // Create reference from the scene to GUI 
        this.scene.gui = this;
  
        // disable processKeyboard
        this.processKeyboard = function() {};
  
        // array to store which keys are being pressed
        this.activeKeys = {};
        // mark it as active in the array to process only one time
        this.keysDown = {};
      }
  
      processKeyDown(event) {
        // called when a key is pressed down, mark it as active in the array
        this.activeKeys[event.code]=true;
        this.keysDown[event.code]=true;
      }
  
      processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
      }
  
      keyPressedDown(keyCode) {
        if (this.keysDown[keyCode])
          return !(this.keysDown[keyCode] = false);
        return false;
      }
  
      isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
      }
}