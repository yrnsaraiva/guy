"use client";

import { useEffect, useRef } from "react";
import { live, prefersReducedMotion } from "@/lib/live";

/**
 * O ring light. Um shader de ecrã inteiro desenha o anel de luz atrás do ecrã vertical,
 * com grão de vídeo, linhas de varrimento e interferência que cresce com a velocidade do scroll.
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uTime;
uniform float uVel;
uniform float uPower;
uniform vec3 uTint;
uniform float uMotion;

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// luz do anel: núcleo sólido (o tubo de LEDs) + halo que decai com a distância
vec3 ringLight(vec2 uv, float r, vec3 warm, vec3 tint){
  float d = abs(length(uv) - r);
  float tube = r * 0.075;
  float core = smoothstep(tube, tube * 0.55, d);
  float halo = exp(-d / (r * 0.10)) * 0.55 + exp(-d / (r * 0.38)) * 0.22;
  // pequenos LEDs ao longo do anel
  float a = atan(uv.y, uv.x);
  float leds = 0.88 + 0.12 * smoothstep(0.2, 0.9, sin(a * 96.0));
  vec3 c = warm * core * leds * 1.15;
  c += mix(warm, tint, 0.55) * halo;
  return c;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - uCenter) / uRes.y;

  // interferência horizontal (rasgos) proporcional à velocidade
  float band = floor(frag.y / 7.0);
  float tear = (hash(vec2(band, floor(uTime * 24.0))) - 0.5);
  tear *= step(0.82 - uVel * 0.5, hash(vec2(band * 1.7, floor(uTime * 12.0))));
  uv.x += tear * uVel * 0.06 * uMotion;

  float r = uRadius / uRes.y;
  vec3 warm = vec3(1.0, 0.902, 0.78);
  float split = (0.0025 + uVel * 0.018) * uMotion;

  vec3 col;
  col.r = ringLight(uv + vec2(split, 0.0), r, warm, uTint).r;
  col.g = ringLight(uv, r, warm, uTint).g;
  col.b = ringLight(uv - vec2(split, 0.0), r, warm, uTint).b;

  // luz rebatida no "quarto": um brilho amplo e quente à volta
  col += mix(warm, uTint, 0.7) * 0.05 * exp(-length(uv) / (r * 1.6));

  col *= uPower;

  // vinheta
  vec2 q = frag / uRes;
  col *= 0.55 + 0.45 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.22);

  // linhas de varrimento + grão
  col *= 0.95 + 0.05 * sin(frag.y * 3.14159);
  float g = hash(frag + fract(uTime * uMotion) * 91.7) - 0.5;
  col += g * 0.055;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}

export default function SignalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uCenter = u("uCenter"), uRadius = u("uRadius"), uTime = u("uTime");
    const uVel = u("uVel"), uPower = u("uPower"), uTint = u("uTint"), uMotion = u("uMotion");

    const reduced = prefersReducedMotion();
    // o shader é barato, mas em ecrãs densos limitamos a resolução
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const s = { radius: 0, cx: 0, cy: 0, power: 0, vel: 0, tint: [...live.tint] as number[] };
    let raf = 0;
    const t0 = performance.now();

    const loop = () => {
      const now = performance.now();
      const H = canvas.height, W = canvas.width;

      // posição e tamanho do ecrã vertical
      let cx = W / 2, cy = H / 2, fh = H * 0.7;
      const fr = live.frame?.getBoundingClientRect();
      if (fr && fr.height > 0) {
        cx = (fr.left + fr.width / 2) * dpr;
        cy = H - (fr.top + fr.height / 2) * dpr;
        fh = fr.height * dpr;
      }
      const targetR = fh * 0.5 * live.ringScale;
      const k = reduced ? 1 : 0.08;
      s.radius += (targetR - s.radius) * (s.radius === 0 ? 1 : k);
      s.cx += (cx - s.cx) * (s.cx === 0 ? 1 : 0.25);
      s.cy += (cy - s.cy) * (s.cy === 0 ? 1 : 0.25);
      const targetPower = live.booted && live.on ? live.power : 0;
      s.power += (targetPower - s.power) * (reduced ? 1 : 0.06);
      s.vel += (Math.min(live.velocity, 1) - s.vel) * 0.15;
      for (let i = 0; i < 3; i++) s.tint[i] += (live.tint[i] - s.tint[i]) * 0.05;

      gl.uniform2f(uRes, W, H);
      gl.uniform2f(uCenter, s.cx, s.cy);
      gl.uniform1f(uRadius, s.radius);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform1f(uVel, reduced ? 0 : s.vel);
      gl.uniform1f(uPower, s.power);
      gl.uniform3f(uTint, s.tint[0], s.tint[1], s.tint[2]);
      gl.uniform1f(uMotion, reduced ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="signal" aria-hidden="true" />;
}
