
#ifdef GL_ES
precision highp float;
#endif
uniform int spherical; // 1 for spherical; 0 for cylindrical

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
uniform sampler2D uSampler2;

varying vec3 height;


void main() {
    vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;
    mat4 modelView = uMVMatrix;
    // First colunm.
  modelView[0][0] = 1.0; 
  modelView[0][1] = 0.0; 
  modelView[0][2] = 0.0; 

  if (spherical == 1)
  {
    // Second colunm.
    modelView[1][0] = 0.0; 
    modelView[1][1] = 1.0; 
    modelView[1][2] = 0.0; 
  }

  // Thrid colunm.
  modelView[2][0] = 0.0; 
  modelView[2][1] = 0.0; 
  modelView[2][2] = 1.0; 
    


    gl_Position = uPMatrix * modelView * vec4(height, 1.0);

}

