import { useRef, useState, useEffect, useCallback } from 'react';
import { skills } from '../../data/skills';
import { TechIcon } from '../TechIcon/TechIcon';
import styles from './Skills.module.css';

const delayClass = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];

// ── Animated progress bar ─────────────────────────────────────────────
function ProfBar({ pct, color }: { pct: number; color: string }) {
  const barRef  = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(pct), 200);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div className={styles.barWrap} ref={barRef}>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width:      `${width}%`,
            background: `var(--ic_${color}_grad)`,
            transition: 'width 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      </div>
      <span className={styles.barPct}>{pct}%</span>
    </div>
  );
}

// ── Draggable skill tag ───────────────────────────────────────────────
function DragTag({ label }: { label: string }) {
  const ref      = useRef<HTMLSpanElement>(null);
  const dragging = useRef(false);
  const offset   = useRef({ x: 0, y: 0 });
  const pos      = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    dragging.current = true;
    const rect = el.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    pos.current    = { x: rect.left, y: rect.top };
    el.style.position  = 'fixed';
    el.style.left      = `${rect.left}px`;
    el.style.top       = `${rect.top}px`;
    el.style.zIndex    = '99999';
    el.style.margin    = '0';
    el.style.transition= 'none';
    el.style.cursor    = 'grabbing';
    el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !ref.current) return;
      ref.current.style.left = `${e.clientX - offset.current.x}px`;
      ref.current.style.top  = `${e.clientY - offset.current.y}px`;
    };
    const onUp = () => {
      if (!dragging.current || !ref.current) return;
      dragging.current = false;
      const el = ref.current;
      el.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.position   = '';
      el.style.left       = '';
      el.style.top        = '';
      el.style.zIndex     = '';
      el.style.margin     = '';
      el.style.cursor     = 'grab';
      el.style.boxShadow  = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`tag ${styles.dragTag}`}
      onMouseDown={onMouseDown}
      title="Drag me!"
    >
      <TechIcon label={label} className={styles.tagIcon} />
      {label}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────
export function Skills() {
  return (
    <section className={styles.section} id="skills">
      <div className="sec">
        <div className="sec-tag reveal">Skills &amp; Expertise</div>
        <h2 className="sec-title reveal">What I'm great at</h2>
        <p className="sec-sub reveal">
          A versatile stack covering the full spectrum of modern web development.
          <span className={styles.dragHint}> ✦ Skill tags are draggable — try it!</span>
        </p>

        <div className={styles.grid}>
          {skills.map((skill, i) => (
            <div key={skill.name} className={`${styles.card} reveal ${delayClass[i]}`}>
              <div className={`${styles.icon} ${styles[`ic_${skill.iconColor}`]}`}>
                {skill.icon}
              </div>
              <div className={styles.name}>{skill.name}</div>

              {/* proficiency bar */}
              <ProfBar pct={skill.proficiency} color={skill.iconColor} />

              <div className={styles.desc}>{skill.description}</div>
              <div className={styles.tags}>
                {skill.tags.map((tag) => <DragTag key={tag} label={tag} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
