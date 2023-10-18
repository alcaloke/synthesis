#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_ksEnergy;
uniform float u_sec;

#define TWO_PI 6.28318530718
#define PI 3.14159265359

float thickness = 0.4;
float plotx(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.y)
  - smoothstep(pct, thickness + pct, st.y);
}
float ploty(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.x)
  - smoothstep(pct, thickness + pct, st.x);
}

vec3 lineColor = vec3(1., .6, 0.5);
vec3 colorA = vec3(0.1, 0., 0.5);
vec3 colorB = vec3(0.1, 0.3, 1.0);

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec2 ms = u_mouse / u_resolution;

  // Polar coordinates
  vec2 toCenter = vec2(0.5) - st;
  float r = length(toCenter) * 2.;
  float angle = atan(toCenter.x, toCenter.y);
  angle = (angle / TWO_PI) + 0.5;

  // sin & cos helpers
  // cartesian
  float sinx = 0.5 + sin(st.x * TWO_PI * 2.0 + u_time) * 0.5;
  float cosx = 0.5 + cos(st.x * TWO_PI + u_time) * 0.5;
  
  // polar
  float sina = 0.5 + sin(angle * TWO_PI + u_time) * 0.5;
  float cosa = 0.5 + cos(angle * TWO_PI + u_time) * 0.5;
  float sinr = 0.05 + sin(5. + r * TWO_PI * u_ksEnergy * 2. - u_sec * .5) * 0.05;
  float cosr = 0.5 + cos(r * TWO_PI + u_time) * 0.5;

  // shaper functions
  float f1 = 0.5 + sin(r * TWO_PI * 50. * sinr) * 0.5;
  // float a = sinr * 0.9; 
  // float f2 = smoothstep(0.0, 0.1 + a, angle) - smoothstep(0.9 - a, 1.0, angle);
  float a = sinr * 0.1; 
  float f2 = smoothstep(0.0, 0.4 + a, r) - smoothstep(0.6 - a, 1.0, r);

  // Set pct
  vec3 pct = vec3(f2);
  pct.r = f1;

  // Set shader colors
  vec3 color = mix(colorA, colorB, pct);

  // Set plotline color
  float plpct = f2 - f1;
  color = mix(color, lineColor * 1.3, plotx(st, plpct));

  gl_FragColor = vec4(color, 1.0);
}
