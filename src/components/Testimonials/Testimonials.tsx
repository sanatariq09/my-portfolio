import { useState, useEffect, useCallback, useRef } from 'react';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.css';

/** Shorten long LinkedIn-style quotes; full text opens in a dialog. */
const PREVIEW_MAX_CHARS = 400;

function testimonialPreview(
  full: string,
  maxChars: number
): { preview: string; truncated: boolean } {
  const text = full.trim();
  if (text.length <= maxChars) return { preview: text, truncated: false };
  const slice = text.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(' ');
  const cut =
    lastSpace > maxChars * 0.55 ? slice.slice(0, lastSpace) : slice;
  return { preview: `${cut.trimEnd()}…`, truncated: true };
}

function TestimonialAvatar({
  photo,
  initials,
  gradientClass,
  activeIndex,
}: {
  photo?: string;
  initials: string;
  gradientClass: string;
  activeIndex: number;
}) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [activeIndex, photo]);

  const useGradient = !photo || broken;

  return (
    <div
      className={`${styles.avatar} ${useGradient ? gradientClass : styles.avatarPhoto}`}
    >
      {photo && !broken ? (
        <img
          src={photo}
          alt=""
          className={styles.avatarImg}
          onError={() => setBroken(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);
  const [slidePaused, setSlidePaused] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const prev = useCallback(() => {
    const idx = (active - 1 + testimonials.length) % testimonials.length;
    goTo(idx, 'right');
  }, [active, goTo]);

  const next = useCallback(() => {
    const idx = (active + 1) % testimonials.length;
    goTo(idx, 'left');
  }, [active, goTo]);

  useEffect(() => {
    setSlidePaused(false);
    dialogRef.current?.close();
  }, [active]);

  useEffect(() => {
    if (slidePaused) return undefined;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slidePaused]);

  const t = testimonials[active];
  const { preview, truncated } = testimonialPreview(t.text, PREVIEW_MAX_CHARS);

  const openFull = () => {
    setSlidePaused(true);
    dialogRef.current?.showModal();
  };

  const closeFull = () => {
    dialogRef.current?.close();
  };

  // return (
  //   <section className={styles.section} id="testimonials">
  //     <div className="sec">
  //       <div className="sec-tag reveal">Recommendations</div>
  //       <h2 className="sec-title reveal">What colleagues say</h2>
  //       <p className="sec-sub reveal">
  //         Recommendations from managers and teammates on LinkedIn.
  //       </p>

  //       <div className={styles.sliderWrap}>
  //         {/* ── Card ── */}
  //         <div
  //           className={`${styles.card} ${
  //             animating
  //               ? direction === 'left'
  //                 ? styles.exitLeft
  //                 : styles.exitRight
  //               : styles.enter
  //           }`}
  //         >
  //           <div className={styles.quoteIcon}>"</div>

  //           <div className={styles.source}>LinkedIn recommendation</div>
  //           <div className={styles.textBlock}>
  //             <p className={styles.text}>
  //               {truncated ? preview : t.text}
  //             </p>
  //             {truncated && (
  //               <button
  //                 type="button"
  //                 className={styles.readMore}
  //                 onClick={openFull}
  //               >
  //                 Read full recommendation
  //               </button>
  //             )}
  //           </div>

  //           <div className={styles.person}>
  //             <TestimonialAvatar
  //               photo={t.photo}
  //               initials={t.initials}
  //               gradientClass={styles[t.avatarVariant as keyof typeof styles]}
  //               activeIndex={active}
  //             />
  //             <div>
  //               <div className={styles.name}>{t.name}</div>
  //               <div className={styles.role}>{t.role}</div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* ── Controls ── */}
  //         <div className={styles.controls}>
  //           <button className={styles.arrow} onClick={prev} aria-label="Previous">
  //             ←
  //           </button>

  //           <div className={styles.dots}>
  //             {testimonials.map((_, i) => (
  //               <button
  //                 key={i}
  //                 className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
  //                 onClick={() => goTo(i, i > active ? 'left' : 'right')}
  //                 aria-label={`Go to testimonial ${i + 1}`}
  //               />
  //             ))}
  //           </div>

  //           <button className={styles.arrow} onClick={next} aria-label="Next">
  //             →
  //           </button>
  //         </div>

  //         {/* ── Progress bar ── */}
  //           <div className={styles.progressWrap}>
  //           <div
  //             key={active}
  //             className={`${styles.progressBar} ${slidePaused ? styles.progressPaused : ''}`}
  //           />
  //         </div>
  //       </div>

  //       <dialog
  //         ref={dialogRef}
  //         className={styles.fullDialog}
  //         aria-labelledby="testimonial-dialog-title"
  //         onClose={() => setSlidePaused(false)}
  //         onClick={(e) => {
  //           if (e.target === dialogRef.current) closeFull();
  //         }}
  //       >
  //         <div
  //           className={styles.fullDialogPanel}
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           <button
  //             type="button"
  //             className={styles.fullDialogClose}
  //             onClick={closeFull}
  //             aria-label="Close"
  //           >
  //             ×
  //           </button>
  //           <p className={styles.fullDialogSource}>LinkedIn recommendation</p>
  //           <h3 id="testimonial-dialog-title" className={styles.fullDialogName}>
  //             {t.name}
  //           </h3>
  //           <p className={styles.fullDialogRole}>{t.role}</p>
  //           <p className={styles.fullDialogText}>{t.text}</p>
  //         </div>
  //       </dialog>
  //     </div>
  //   </section>
  // );
}
