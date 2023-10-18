#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_sec;
uniform vec2 u_mouse;
uniform float u_drumEnergy;

float thickness = 0.5;

float plotx(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.y) 
  - smoothstep(pct, pct + thickness, st.y);
}

float ploty(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.x)
  - smoothstep(pct, pct + thickness, st.x);
}

vec3 colorB = vec3(.9, 1., .5);
vec3 colorA = vec3(1., 0.5, .9);
// vec3 colorB = vec3(0., 0., 0.);

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec2 ms = u_mouse / u_resolution;

  float f1 = 0.5 + cos(st.x * 2000. * u_drumEnergy - u_sec * 1.) * 0.5;
  float f2 = pow(st.x, 2.);
  float f3 = 1. - st.x;
  float f4 = st.x / 4.;

  float f = (f1 * f2 + f3);

  vec3 pct = vec3(f);

  float f5 = 0.5 + cos(st.y * 5. + u_sec * 0.5) * 0.5;
  pct.b = f5;

  vec3 color = vec3(pct);

  color = mix(colorB, colorA, pct);
  // color = mix(color, vec3(1., 0.5, .9), plotx(st, f1));

  gl_FragColor = vec4(color, 1.0);
}