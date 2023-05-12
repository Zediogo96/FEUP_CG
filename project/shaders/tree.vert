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

    vec3 up = vec3(0.0, 1.0, 0.0);

    vec3 offset = up * (texture2D(uSampler2, vTextureCoord).y * 2.5);

    height = aVertexPosition + offset;

    gl_Position = uPMatrix * uMVMatrix * vec4(height, 1);

}