import { useRef, ReactNode } from 'react';
import styles from './MagneticButton.module.css';

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({ children, strength = 0.35, className }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const rect  = el.getBoundingClientRect();
    const dx    = e.clientX - (rect.left + rect.width  / 2);
    const dy    = e.clientY - (rect.top  + rect.height / 2);
    inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    if (innerRef.current)
      innerRef.current.style.transform = 'translate(0,0)';
  };

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${className ?? ''}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={innerRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
