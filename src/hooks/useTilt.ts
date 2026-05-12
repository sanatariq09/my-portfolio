import { useEffect, RefObject } from 'react';

interface TiltOptions {
  max?: number;
  glare?: boolean;
}

export function useTilt(ref: RefObject<HTMLElement>, { max = 12, glare = true }: TiltOptions = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // inject a glare layer
    let glareEl: HTMLDivElement | null = null;
    if (glare) {
      glareEl = document.createElement('div');
      Object.assign(glareEl.style, {
        position:     'absolute',
        inset:        '0',
        borderRadius: 'inherit',
        background:   'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
        opacity:      '0',
        transition:   'opacity 0.3s',
        pointerEvents:'none',
        zIndex:       '2',
      });
      el.style.position = 'relative';
      el.appendChild(glareEl);
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;   // -0.5 → +0.5
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale3d(1.03,1.03,1.03)`;
      if (glareEl) glareEl.style.opacity = String(0.1 + Math.abs(x) * 0.15);
    };

    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
      if (glareEl) glareEl.style.opacity = '0';
    };

    el.style.transition = 'transform 0.15s ease';
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseleave', onLeave);
      glareEl?.remove();
    };
  }, [ref, max, glare]);
}
