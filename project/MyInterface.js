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
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name('Display Normals');
        this.gui.add(this.scene, 'shouldMagnify').name('Magnify');

        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayTerrain').name('Display Terrain');
        this.gui.add(this.scene, 'displayBird').name('Display Bird');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');


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