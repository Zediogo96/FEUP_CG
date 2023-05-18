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
    // Compute the vertical texture coordinates for the altimeter texture
    vec2 altimeterTexCoord2D = vec2(0, -height.z * 5.0); // Use 0.5 as the x-coordinate for horizontal alignment

    vec4 altimeterColor = texture2D(uSampler3, altimeterTexCoord2D);
    color *= 0.7;
    altimeterColor *= 0.3;
    color += altimeterColor;
    color.a = 1.0;

    gl_FragColor = color;

    
}