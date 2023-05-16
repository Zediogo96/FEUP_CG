#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
uniform sampler2D uSampler5;


varying vec3 height;

void main() {
    vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;

    float xCoord = (aVertexPosition.x + 200.0) / 400.0;
    float yCoord = (aVertexPosition.z + 200.0) / 400.0;


    vec3 offset = vec3(0.0,1.0,0.0) * texture2D(uSampler5, vTextureCoord).x * 1.0;
    height = aVertexPosition + offset;

    gl_Position = uPMatrix * uMVMatrix * vec4(height, 1);

}