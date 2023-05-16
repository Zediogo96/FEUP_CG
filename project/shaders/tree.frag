#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

uniform sampler2D uSampler4;

varying vec3 height;


void main() {
    
    vec4 color = texture2D(uSampler4, vTextureCoord);
    if (color.a < 0.75) discard;
    gl_FragColor = color;

    
}