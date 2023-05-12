#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

uniform sampler2D uSampler1;

varying vec3 height;


void main() {
    
    vec4 color = texture2D(uSampler1, vTextureCoord);
    if (color.a < 0.75) discard;
    // color = vec4(height.y, 0, 0, 1.0);
    gl_FragColor = color;

    
}