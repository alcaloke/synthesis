#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_energy;

float thickness = 0.004;

float plotx(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.y)
  - smoothstep(pct, pct + thickness, st.y);
}

float ploty(vec2 st, float pct){
  return smoothstep(pct - thickness, pct, st.x)
  - smoothstep(pct, pct + thickness, st.x);
}

vec3 one = vec3(0.1, 0.0, 0.5);
vec3 two = vec3(0.1, 0.3, 1.0);

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec3 pct = vec3(st.y);

  float f1 = 0.5 + sin(st.y * 32.0 - u_time) * 0.25;
  float f2 = 0.5 + sin(st.y * 16.0 + u_time) * 0.5;
  // pct.r = f1 * f2;


  float f3 = 0.5 + sin(st.x * 32.0 * u_energy - u_time) * 0.25;
  float f4 = 0.5 + sin(st.x * 16.0 + u_time) * 0.5;
  pct.b = f3 * f4;
  // float f1 = 0.75 + sin(16.0 * st.x + u_time) * 0.25;
  // float f2 = 0.5 + sin(2.0 * st.x + u_time) * 0.5;
  // float f3 = 0.5 + sin(4.0 * st.y - u_time * 2.0) * 0.5;

  // pct.r = f1 * f2;
  // pct.g = f3;
  // pct.b = f2 / f1 / 2.0;
  
  vec3 color = mix(one, two, pct);

  // color = mix(color, vec3(1.0, 0.0, 1.0), ploty(st, pct.r));
  // color = mix(color, vec3(0.3, 0.6, 0.3), plotx(st, pct.g));
  // color = mix(color, vec3(0.3, 0.0, 1.0), ploty(st, pct.b));

  gl_FragColor = vec4(color, 1.0);
}