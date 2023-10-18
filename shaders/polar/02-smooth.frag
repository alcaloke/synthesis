#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float thickness = 0.005;
float plot(vec2 st, float pct, float thickness){
  return smoothstep(pct - thickness, pct, st.y) 
  - smoothstep(pct, pct + thickness, st.y);
}

vec3 one = vec3(0.5, 0.35, 0.85);
vec3 two = vec3(0.45, 0.75, 0.65);
// vec3 one = vec3(0.7, 0.35, 0.15);
// vec3 two = vec3(0.95, 0.75, 0.4);

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(0.0);

  vec2 toCenter = vec2(0.5) - st;
  float r = length(toCenter) * 2.0;
  float angle = atan(toCenter.x, toCenter.y);
  angle = (angle / TWO_PI) + 0.5;

  vec3 pct = vec3(r);

  float f1 = pow(r, 5.0);
  float f2 = 0.6 * sin(r*6.0 - u_time * 1.0) + 0.5;
  float f3 = 0.75 - 0.75 * r;

  float f1x = pow(st.x, 3.0);
  float f2x = 0.5 * sin(st.x*6.0 - u_time * 2.0) + 0.5;
  float f3x = 0.75 - 0.75 * st.x;
  float fx = f1x + f2x * f3x;
  
  pct.r = clamp(f1 + f2 * f3, 0.0, 1.0);
  pct.g = f2;
  pct.b = f3;

  
  color = mix(one, two, pct);
  color = mix(color, vec3(0.6275, 0.9059, 0.9686), plot(st, pct.r, thickness));

  gl_FragColor = vec4(color, 1.0);
}