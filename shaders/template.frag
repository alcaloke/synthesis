#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define TWO_PI 6.28318530718
#define PI 3.14159265359

float thickness = 0.005;
float plotx(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.y)
  - smoothstep(pct, thickness + pct, st.y);
}
float ploty(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.x)
  - smoothstep(pct, thickness + pct, st.x);
}

vec3 lineColor = vec3(0.0, 0.9, 0.9);
vec3 colorA = vec3(0.0, 0.0, 0.0);
vec3 colorB = vec3(.2, 0.5, 0.7);

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
  float sinx = 0.5 + sin(st.x * TWO_PI + u_time) * 0.5;
  float cosx = 0.5 + cos(st.x * TWO_PI + u_time) * 0.5;
  
  // polar
  float sina = 0.5 + sin(angle * TWO_PI + u_time) * 0.5;
  float cosa = 0.5 + cos(angle * TWO_PI + u_time) * 0.5;
  float sinr = 0.5 + sin(r * TWO_PI + u_time) * 0.5;
  float cosr = 0.5 + cos(r * TWO_PI + u_time) * 0.5;

  // shaper functions
  float f = sinx;

  // Set pct
  vec3 pct = vec3(f);

  // Set shader colors
  vec3 color = mix(colorA, colorB, pct);

  // Set plotline color
  float plpct = f;
  color = mix(color, lineColor, plotx(st, plpct));

  gl_FragColor = vec4(color, 1.0);
}
