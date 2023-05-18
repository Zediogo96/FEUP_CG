#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float time;
uniform float xOff;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
uniform sampler2D uSampler5;


varying vec3 height;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;
    float swayOffset = random(vec2(xOff , xOff*0.9231)) * 2.0;
    if(aVertexPosition.y >0.0){
        height = aVertexPosition + vec3((sin(time+ swayOffset)/6.0) , 0.0, 0.0);
        height.y = height.y + (cos(time+ swayOffset*3.0)/70.0);
    }
    else {
        height = aVertexPosition ;
    }
    // height = aVertexPosition + vec3(0.0, 0.0, 0.0);




    gl_Position = uPMatrix * uMVMatrix * vec4(height, 1);

}