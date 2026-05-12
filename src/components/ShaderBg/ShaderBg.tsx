import { useEffect, useRef } from 'react';
import styles from './ShaderBg.module.css';

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision mediump float;
  uniform float uTime;
  uniform vec2  uRes;

  // smooth noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1,0));
    float c = hash(i + vec2(0,1));
    float d = hash(i + vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float t  = uTime * 0.18;

    // layered noise plasma
    float n  = noise(uv * 2.5 + vec2(t * 0.6, t * 0.4));
          n += noise(uv * 5.0 - vec2(t * 0.4, t * 0.7)) * 0.5;
          n += noise(uv * 10.0 + vec2(t * 0.3)) * 0.25;
    n /= 1.75;

    // brand colour palette
    vec3 orange = vec3(1.0,   0.42, 0.21);   // #ff6b35
    vec3 teal   = vec3(0.024, 0.84, 0.63);   // #06d6a0
    vec3 purple = vec3(0.66,  0.33, 0.97);   // #a855f7
    vec3 bg     = vec3(0.031, 0.035, 0.051); // --bg

    vec3 accent = mix(orange, teal,   sin(t + n * 3.14) * 0.5 + 0.5);
         accent = mix(accent, purple, sin(t * 0.7 + n * 2.0) * 0.3 + 0.3);

    // very subtle — just a tint above the dark bg
    vec3 col = mix(bg, accent, n * 0.09);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, src: string, type: number) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function ShaderBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, VERT, gl.VERTEX_SHADER));
    gl.attachShader(prog, compileShader(gl, FRAG, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes  = gl.getUniformLocation(prog, 'uRes');

    let rafId: number;
    let lastFrame = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = (ts: number) => {
      // cap at ~24fps to save GPU
      if (ts - lastFrame < 42) { rafId = requestAnimationFrame(draw); return; }
      lastFrame = ts;
      gl.uniform1f(uTime, ts * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} />;
}
