import { useState, useEffect } from 'react';
import styles from './RatingWidget.module.css';

const STORAGE_KEY = 'portfolio_rating';
const EMOJIS = ['😐', '🙂', '😊', '🤩', '🔥'] as const;
const LABELS = ['Meh', 'Good', 'Nice!', 'Awesome!', 'Mind-blowing!'] as const;

export function RatingWidget() {
  const [open,      setOpen]      = useState(false);
  const [hover,     setHover]     = useState(-1);
  const [selected,  setSelected]  = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) { setSelected(Number(saved)); setSubmitted(true); }
  }, []);

  const submit = (i: number) => {
    setSelected(i);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, String(i));
  };

  const active = hover >= 0 ? hover : selected;

  return (
    <div className={`${styles.wrap} ${open ? styles.wrapOpen : ''}`}>

      {/* toggle button */}
      <button
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}
        title="Rate this portfolio"
      >
        {submitted && selected >= 0 ? EMOJIS[selected] : '⭐'}
      </button>

      {/* panel */}
      {open && (
        <div className={styles.panel}>
          {submitted ? (
            <div className={styles.thanks}>
              <span className={styles.bigEmoji}>{selected >= 0 ? EMOJIS[selected] : '⭐'}</span>
              <p className={styles.thanksText}>Thanks for rating!</p>
              <p className={styles.thanksLabel}>{selected >= 0 ? LABELS[selected] : ''}</p>
              <button
                className={styles.resetBtn}
                onClick={() => { setSubmitted(false); setSelected(-1); localStorage.removeItem(STORAGE_KEY); }}
              >
                Change rating
              </button>
            </div>
          ) : (
            <>
              <p className={styles.question}>Rate this portfolio</p>
              <div className={styles.stars}>
                {EMOJIS.map((e, i) => (
                  <button
                    key={i}
                    className={`${styles.star} ${i <= active ? styles.starActive : ''}`}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}
                    onClick={() => submit(i)}
                    title={LABELS[i]}
                  >
                    {e}
                  </button>
                ))}
              </div>
              {active >= 0 && (
                <p className={styles.hoverLabel}>{LABELS[active]}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
