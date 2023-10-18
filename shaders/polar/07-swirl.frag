#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float thickness = 0.3;

float ploty(vec2 st, float pct, float thickness){
  return smoothstep(pct - thickness, pct, st.x) 
  - smoothstep(pct, pct + thickness, st.x);
}

float plotx(vec2 st, float pct, float thickness){
  return smoothstep(pct - thickness, pct, st.y) 
  - smoothstep(pct, pct + thickness, st.y);
}

vec3 colorA = vec3(.0, .0, 0.4);
vec3 colorB = vec3(0.1, 0.05 ,.75);

// vec3 colorA = vec3(1., 1.0, 1.);
// vec3 colorB = vec3(.0, .0 ,.0);

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec2 ms = u_mouse / u_resolution;

  vec2 toCenter = vec2(0.5) - st;
  float r = length(toCenter) * 2.;
  float angle = atan(toCenter.x, toCenter.y);
  angle = (angle / TWO_PI) + 0.5;

  // float fa = smoothstep(0., 0.49, angle) - smoothstep(0.51, 1., angle);
  float fa = 0.5 + sin(angle * 2. * PI - u_time * 2.) * 0.5;
  float fr = 0.5 + sin(r * 16. * PI - u_time) * 0.5;

  float fab = 0.5 + sin(angle * 2. * PI + u_time * 1.5) * 0.5;
  float frb = 0.5 + sin(r * 4. * PI + u_time * 0.5) * 0.5;

  float f = fa + fr;
  float fb = fab + frb;

  vec3 pct = vec3(f);
  pct.b = fb;

  vec3 color = mix(colorA, colorB, pct);

  float p = plotx(st, f - fb, thickness);

  color = mix(color, vec3(0.2, .7, 1.), p);

  gl_FragColor = vec4(color, 1.);
}
