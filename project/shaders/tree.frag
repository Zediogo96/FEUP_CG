#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

varying vec3 height;


void main() {
    
    vec4 color = texture2D(uSampler1, vTextureCoord);
    gl_FragColor = color;

    
}