import { useEffect, useRef } from 'react';
import styles from './ParticleWeb.module.css';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
}

const COLORS   = ['#ff6b35', '#06d6a0', '#ff9f1c', '#3b82f6', '#a855f7'];
const COUNT    = 70;
const LINK_D   = 130;   // max distance to draw a connection line
const REPEL_D  = 110;   // cursor repel radius
const REPEL_F  = 1.8;   // repel force strength

export function ParticleWeb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = 0, H = 0;
    let mx = -9999, my = -9999;
    let rafId: number;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r:  Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    init();

    const onResize = () => { resize(); };
    const onMouse  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };

    window.addEventListener('resize', onResize, { passive: true });
    canvas.addEventListener('mousemove', onMouse, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // update + draw particles
      particles.forEach((p) => {
        // cursor repel
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_D && dist > 0) {
          const force = (REPEL_D - dist) / REPEL_D * REPEL_F;
          p.vx += (dx / dist) * force * 0.05;
          p.vy += (dy / dist) * force * 0.05;
        }

        // damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.5) { p.vx = (p.vx / spd) * 1.5; p.vy = (p.vy / spd) * 1.5; }

        p.x += p.vx;
        p.y += p.vy;

        // wrap edges
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + 'cc';
        ctx.fill();
      });

      // draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_D) {
            const alpha = (1 - d / LINK_D) * 0.35;
            const grad  = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, a.color + Math.round(alpha * 255).toString(16).padStart(2,'0'));
            grad.addColorStop(1, b.color + Math.round(alpha * 255).toString(16).padStart(2,'0'));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      // cursor highlight dot
      if (mx > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, REPEL_D);
        g.addColorStop(0, 'rgba(255,107,53,0.08)');
        g.addColorStop(1, 'rgba(255,107,53,0)');
        ctx.beginPath();
        ctx.arc(mx, my, REPEL_D, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} />;
}
