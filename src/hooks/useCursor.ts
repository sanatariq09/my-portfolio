import { useEffect, useRef } from 'react';

const TRAIL_COLORS = ['#ff6b35', '#ff9f1c', '#06d6a0', '#3b82f6', '#a855f7', '#ec4899'];

function useCustomCursorEligible(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!window.matchMedia('(min-width: 901px)').matches) return false;
  if (!window.matchMedia('(hover: hover)').matches) return false;
  if (!window.matchMedia('(pointer: fine)').matches) return false;
  return true;
}

function spawnTrail(x: number, y: number) {
  const dot = document.createElement('div');
  const size = Math.random() * 6 + 3;
  const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];

  Object.assign(dot.style, {
    position:     'fixed',
    left:         `${x}px`,
    top:          `${y}px`,
    width:        `${size}px`,
    height:       `${size}px`,
    borderRadius: '50%',
    background:   color,
    pointerEvents:'none',
    zIndex:       '999997',
    transform:    'translate(-50%, -50%)',
  });

  document.body.appendChild(dot);

  dot.animate(
    [
      { opacity: 0.8, transform: `translate(-50%,-50%) scale(1)` },
      { opacity: 0,   transform: `translate(-50%,-50%) scale(0)` },
    ],
    { duration: 500 + Math.random() * 300, easing: 'ease-out', fill: 'forwards' }
  ).onfinish = () => dot.remove();
}

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let innerCleanup: (() => void) | undefined;

    const apply = () => {
      innerCleanup?.();
      innerCleanup = undefined;

      if (!useCustomCursorEligible()) {
        document.body.style.cursor = '';
        if (dotRef.current) {
          dotRef.current.style.display = 'none';
          dotRef.current.classList.remove('big');
        }
        if (ringRef.current) {
          ringRef.current.style.display = 'none';
          ringRef.current.classList.remove('big');
        }
        return;
      }

      if (dotRef.current) dotRef.current.style.display = '';
      if (ringRef.current) ringRef.current.style.display = '';

      let mx = 0;
      let my = 0;
      let rx = 0;
      let ry = 0;
      let rafId = 0;
      let lastTrailAt = 0;
      let lastMoveX = 0;
      let lastMoveY = 0;
      let dotFrameQueued = false;
      let ringActive = true;
      let lowPowerZone = false;
      let usingNativeCursor = false;

      const isLowPowerZone = (target: EventTarget | null) => {
        const el = target as HTMLElement | null;
        if (!el) return false;
        return Boolean(
          el.closest(
            '[role="dialog"], aside, [class*="overlay"], [class*="backdrop"], [class*="modal"], [class*="sidebar"], [class*="palette"], [class*="panel"]'
          )
        );
      };

      const setCursorMode = (nativeCursor: boolean) => {
        if (nativeCursor === usingNativeCursor) return;
        usingNativeCursor = nativeCursor;
        document.body.style.cursor = nativeCursor ? 'auto' : 'none';
        if (dotRef.current) dotRef.current.style.display = nativeCursor ? 'none' : '';
        if (ringRef.current) ringRef.current.style.display = nativeCursor ? 'none' : '';
      };

      const onMove = (e: MouseEvent) => {
        if (!useCustomCursorEligible()) return;
        mx = e.clientX;
        my = e.clientY;
        lowPowerZone = isLowPowerZone(e.target);
        setCursorMode(lowPowerZone);

        if (!dotFrameQueued) {
          dotFrameQueued = true;
          requestAnimationFrame(() => {
            if (!usingNativeCursor && dotRef.current) {
              dotRef.current.style.left = `${mx}px`;
              dotRef.current.style.top = `${my}px`;
            }
            dotFrameQueued = false;
          });
        }

        const now = performance.now();
        const movedEnough =
          Math.abs(mx - lastMoveX) + Math.abs(my - lastMoveY) > 12;
        if (!lowPowerZone && movedEnough && now - lastTrailAt > 90) {
          spawnTrail(mx, my);
          lastTrailAt = now;
          lastMoveX = mx;
          lastMoveY = my;
        }
      };

      const loop = () => {
        if (!ringActive) return;
        const easing = lowPowerZone ? 0.22 : 0.12;
        rx += (mx - rx) * easing;
        ry += (my - ry) * easing;
        if (!usingNativeCursor && ringRef.current) {
          ringRef.current.style.left = `${rx}px`;
          ringRef.current.style.top  = `${ry}px`;
          ringRef.current.style.opacity = '';
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      const grow = () => {
        dotRef.current?.classList.add('big');
        ringRef.current?.classList.add('big');
      };
      const shrink = () => {
        dotRef.current?.classList.remove('big');
        ringRef.current?.classList.remove('big');
      };

      const targets =
        'a, button, .sk-card, .proj-card, .serv-card, .testi-card, .ci';
      const onOver = (e: MouseEvent) => {
        if ((e.target as HTMLElement | null)?.closest(targets)) grow();
      };
      const onOut = (e: MouseEvent) => {
        if ((e.target as HTMLElement | null)?.closest(targets)) shrink();
      };
      const onVisibility = () => {
        if (document.hidden) {
          ringActive = false;
          cancelAnimationFrame(rafId);
        } else if (!ringActive) {
          ringActive = true;
          rafId = requestAnimationFrame(loop);
        }
      };

      document.body.style.cursor = 'none';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);
      document.addEventListener('visibilitychange', onVisibility);

      innerCleanup = () => {
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseout', onOut);
        document.removeEventListener('visibilitychange', onVisibility);
        cancelAnimationFrame(rafId);
      };
    };

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqWide = window.matchMedia('(min-width: 901px)');
    const mqHover = window.matchMedia('(hover: hover)');
    const mqFine = window.matchMedia('(pointer: fine)');

    apply();
    const onMq = () => apply();
    mqReduce.addEventListener('change', onMq);
    mqWide.addEventListener('change', onMq);
    mqHover.addEventListener('change', onMq);
    mqFine.addEventListener('change', onMq);

    return () => {
      mqReduce.removeEventListener('change', onMq);
      mqWide.removeEventListener('change', onMq);
      mqHover.removeEventListener('change', onMq);
      mqFine.removeEventListener('change', onMq);
      innerCleanup?.();
    };
  }, []);

  return { dotRef, ringRef };
}
