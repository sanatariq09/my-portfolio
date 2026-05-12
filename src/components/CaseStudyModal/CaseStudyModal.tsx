import { useEffect, useState, useRef, useCallback } from 'react';
import { Project } from '../../data/projects';
import styles from './CaseStudyModal.module.css';

// ── Screenshot Slider ─────────────────────────────────────────────────
function ScreenshotSlider({ project }: { project: Project }) {
  const shots      = project.caseStudy.screenshots;
  const [idx, setIdx]       = useState(0);
  const [drag, setDrag]     = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [anim, setAnim]     = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((to: number) => {
    setAnim(true);
    setIdx((to + shots.length) % shots.length);
  }, [shots.length]);

  // autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => go(idx + 1), 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [idx, go]);

  // keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { go(idx - 1); }
      if (e.key === 'ArrowRight') { go(idx + 1); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [idx, go]);

  // touch / mouse swipe
  const onDragStart = (clientX: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setAnim(false);
    setDrag(clientX);
    setOffset(0);
  };
  const onDragMove = (clientX: number) => {
    if (drag === null) return;
    setOffset(clientX - drag);
  };
  const onDragEnd = () => {
    if (drag === null) return;
    if (offset < -60)      go(idx + 1);
    else if (offset > 60)  go(idx - 1);
    else { setAnim(true); }
    setDrag(null);
    setOffset(0);
  };

  const current = shots[idx];

  return (
    <div className={styles.slider}>

      {/* main slide */}
      <div
        className={styles.slideWrap}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => { if (drag !== null) onDragMove(e.clientX); }}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          className={styles.slide}
          style={{
            background: current.gradient,
            transform: `translateX(${offset}px)`,
            transition: anim && drag === null ? 'transform 0.4s ease, opacity 0.4s ease' : 'none',
          }}
        >
          {/* mock screen UI inside each slide */}
          <div className={styles.mockScreen}>
            <div className={styles.mockBar}>
              <span className={styles.mockDot} style={{background:'#ff5f57'}} />
              <span className={styles.mockDot} style={{background:'#febc2e'}} />
              <span className={styles.mockDot} style={{background:'#28c840'}} />
              <div className={styles.mockUrl}>app.trackflow.io</div>
            </div>
            <div className={styles.mockBody}>
              <div className={styles.mockSidebar}>
                {['Dashboard','Projects','Team','Analytics','Settings'].map((m) => (
                  <div key={m} className={styles.mockMenuItem}>{m}</div>
                ))}
              </div>
              <div className={styles.mockMain}>
                <div className={styles.mockTitle}>{current.label}</div>
                <div className={styles.mockBlocks}>
                  {[80,60,90,45,70].map((w,i) => (
                    <div key={i} className={styles.mockBlock} style={{ width:`${w}%`, opacity: 0.15 + i * 0.12 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* label badge */}
          <div className={styles.slideLabel}>{current.label}</div>
        </div>

        {/* prev / next arrows */}
        <button
          className={`${styles.arrow} ${styles.arrowL}`}
          onClick={(e) => { e.stopPropagation(); go(idx - 1); }}
          aria-label="Previous"
        >‹</button>
        <button
          className={`${styles.arrow} ${styles.arrowR}`}
          onClick={(e) => { e.stopPropagation(); go(idx + 1); }}
          aria-label="Next"
        >›</button>
      </div>

      {/* dot strip + counter */}
      <div className={styles.sliderFooter}>
        <div className={styles.dots}>
          {shots.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
        <span className={styles.counter}>{idx + 1} / {shots.length}</span>
      </div>

      {/* thumbnail strip */}
      <div className={styles.thumbStrip}>
        {shots.map((s, i) => (
          <div
            key={i}
            className={`${styles.thumb} ${i === idx ? styles.thumbActive : ''}`}
            style={{ background: s.gradient }}
            onClick={() => go(i)}
            title={s.label}
          >
            <span className={styles.thumbLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────
interface Props {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const cs = project.caseStudy;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* close */}
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        {/* ── header banner ── */}
        <div className={`${styles.banner} ${styles[project.thumbVariant]}`}>
          <div className={styles.bannerLabel}>{project.label}</div>
          <h2 className={styles.bannerTitle}>{project.name}</h2>
          <div className={styles.bannerMeta}>
            <span>👤 {cs.role}</span>
            <span>⏱ {cs.duration}</span>
          </div>
        </div>

        {/* ── body ── */}
        <div className={styles.body}>

          {/* tags */}
          <div className={styles.tags}>
            {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          {/* ── Screenshot slider ── */}
          <ScreenshotSlider project={project} />

          {/* ── Problem + Solution ── */}
          <div className={styles.cols}>
            <div className={styles.block}>
              <div className={styles.blockLabel}><span className={styles.blockIcon}>🔍</span> The Problem</div>
              <p className={styles.blockText}>{cs.problem}</p>
            </div>
            <div className={styles.block}>
              <div className={styles.blockLabel}><span className={styles.blockIcon}>⚡</span> The Solution</div>
              <p className={styles.blockText}>{cs.solution}</p>
            </div>
          </div>

          {/* ── Results ── */}
          <div className={styles.results}>
            <div className={styles.blockLabel}><span className={styles.blockIcon}>📈</span> Key Results</div>
            <div className={styles.resultGrid}>
              {cs.results.map((r, i) => (
                <div key={i} className={styles.resultCard}>
                  <span className={styles.resultNum}>0{i + 1}</span>
                  <p className={styles.resultText}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <a href={project.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              {project.linkLabel}
            </a>
            <button className="btn btn-outline" onClick={onClose}>← Back to Projects</button>
          </div>
        </div>
      </div>
    </div>
  );
}
