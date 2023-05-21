#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

uniform sampler2D uSampler4;
uniform float xOff;
uniform float time;

varying vec3 height;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    float chanceRed = random(vec2(xOff *8767543.2341, xOff));
    float chanceGreen = random(vec2(xOff*5671253.12313, xOff * 23123123.0));
    vec4 color = texture2D(uSampler4, vTextureCoord);
    if (color.a < 0.9) discard;

    float redVariation = xOff / 900.0;
    float greenVarition = (xOff / 300.0);
    //if(chanceRed > 0.05)
        color.r += redVariation;
    //if(chanceGreen > 0.2)
       // color.g += greenVarition;
    gl_FragColor = color;

    
}