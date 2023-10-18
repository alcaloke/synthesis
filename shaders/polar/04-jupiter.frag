#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_energy;

float thickness = 0.005;
float plot(vec2 st, float pct, float thickness){
  return smoothstep(pct - thickness, pct, st.y) 
  - smoothstep(pct, pct + thickness, st.y);
}

vec3 one = vec3(1., 0.9, 0.45);
vec3 two = vec3(1., 0.5, 0.);
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

  float f1 = 0.5 * sin(r * 4.* u_energy  - u_time) + 0.5;
  float f2 = 0.5 * sin(r * 24.  - u_time) + 0.5;
  float f3 = pow(r, 2.);

  pct.g = f1;
  pct.b = f2 * f3;
  
  color = mix(one, two, pct);
  color = mix(color, vec3(1., 0.8, 0.8), plot(st, pct.g, thickness));
  color = mix(color, vec3(0.9, 1., 0.8), plot(st, pct.b, thickness));

  gl_FragColor = vec4(color, 1.0);
}