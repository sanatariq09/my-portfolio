import { useEffect } from 'react';

const COLORS = ['#ff6b35', '#ff9f1c', '#06d6a0', '#3b82f6', '#a855f7', '#ec4899'];

export function useRipple() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // skip ripple on interactive elements that have their own feedback
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, button')) return;

      const ripple = document.createElement('div');
      const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size   = 12 + Math.random() * 8;

      Object.assign(ripple.style, {
        position:     'fixed',
        left:         `${e.clientX}px`,
        top:          `${e.clientY}px`,
        width:        `${size}px`,
        height:       `${size}px`,
        borderRadius: '50%',
        border:       `2px solid ${color}`,
        transform:    'translate(-50%, -50%) scale(0)',
        pointerEvents:'none',
        zIndex:       '9995',
      });

      document.body.appendChild(ripple);

      ripple.animate(
        [
          { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
          { transform: 'translate(-50%,-50%) scale(6)', opacity: 0 },
        ],
        { duration: 550, easing: 'ease-out', fill: 'forwards' }
      ).onfinish = () => ripple.remove();
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);
}
