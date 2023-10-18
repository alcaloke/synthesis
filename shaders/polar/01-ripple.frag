#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float plot(vec2 st, float pct){
  return smoothstep(pct - 0.01, pct, st.y) 
  - smoothstep(pct, pct + 0.01, st.y);
}

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(0.0);

  vec2 toCenter = vec2(0.5) - st;
  float angle = atan(toCenter.x, toCenter.y);
  angle = (angle / TWO_PI) + 0.5;
  float radius = length(toCenter) * 2.0;

  float f1 = 0.15 * sin(radius * 128.0) + 1.0;
  float f2 = 0.1 * sin(u_time * 1.0) + 1.0;
  float f3 = radius * 0.3 + 0.45;
  float hue = f1 * f2 * f3;

  color = hsb2rgb(vec3(hue, 1.0, 0.8));

  gl_FragColor = vec4(color, 1.0);
}