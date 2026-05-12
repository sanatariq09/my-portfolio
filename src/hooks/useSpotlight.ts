import { useEffect, useRef } from 'react';

export function useSpotlight() {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position:      'fixed',
      inset:         '0',
      pointerEvents: 'none',
      zIndex:        '9996',
      background:    'radial-gradient(circle 280px at -999px -999px, transparent 100%, rgba(0,0,0,0.18) 100%)',
      transition:    'background 0.08s linear',
    });
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    const onMove = (e: MouseEvent) => {
      overlay.style.background = `radial-gradient(circle 280px at ${e.clientX}px ${e.clientY}px, transparent 40%, rgba(0,0,0,0.18) 100%)`;
    };

    const onLeave = () => {
      overlay.style.background = 'rgba(0,0,0,0)';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      overlay.remove();
    };
  }, []);
}
