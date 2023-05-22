import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
import { MyTreeGroupPatch } from './MyTreeGroupPatch.js';
import { MyTreeRowPatch } from './MyTreeRowPatch.js';
    /**
     * MyBillboard
     * @constructor
     * @param scene - Reference to MyScene object
    */
    export class MyTreeSpawner extends CGFobject {
        constructor(scene, groupQuantity, rowQuantity) {
            super(scene);
            
            this.groupQuantity = groupQuantity;
            this.rowQuantity = rowQuantity;

            

            this.treeGroup = new MyTreeGroupPatch(scene);
            this.treeRow = new MyTreeRowPatch(scene);      
            
            this.xCoords = [];
            this.zCoords = [];

            for(let i = 0; i < this.groupQuantity; i++){
                this.xCoords.push(((Math.random() *2)-1) * 150);
                this.zCoords.push(((Math.random() *2)-1) * 150);
                
            }
            
            for(let i = 0; i < this.rowQuantity; i++){
                this.xCoords.push(((Math.random() *2)-1) * 150);
                this.zCoords.push(((Math.random() *2)-1) * 150);
            }
            
            // restore default shader (will be needed for drawing the axis in next frame)
            this.scene.setActiveShader(this.scene.defaultShader);
        }

        
        
        /**
         * Displays the billboard in a certain position
        */
       display() {
        let counter = 0;
        let treeNumberGroup = this.groupQuantity*9;
        let treeNumberRow = this.rowQuantity*6;

            for(let i = 0; i < this.groupQuantity; i++){
                this.treeGroup.display(this.xCoords[i], this.zCoords[i], treeNumberGroup);
                counter++;
            }

            for(let i = 0; i < this.rowQuantity; i++){
                this.treeRow.display(this.xCoords[i+counter], this.zCoords[i+counter], treeNumberRow);
            }
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
