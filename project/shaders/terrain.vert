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
uniform sampler2D uSampler2;

varying vec3 height;

void main() {
    vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;

    vec3 offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).z *0.2;
    height = aVertexPosition + offset;

    gl_Position = uPMatrix * uMVMatrix * vec4(height, 1.0);

}