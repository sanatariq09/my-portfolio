import { useEffect, useState } from 'react';
import styles from './PageLoader.module.css';

export function PageLoader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  useEffect(() => {
    const fadeTimer  = setTimeout(() => setPhase('fading'), 1800);
    const goneTimer  = setTimeout(() => setPhase('gone'),   2400);
    return () => { clearTimeout(fadeTimer); clearTimeout(goneTimer); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`${styles.loader} ${phase === 'fading' ? styles.fadeOut : ''}`}>
      {/* animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.inner}>
        {/* logo mark */}
        <div className={styles.logo}>
          <span className={styles.logoU}>S</span>
          <span className={styles.logoN}>T</span>
        </div>

        {/* name */}
        <p className={styles.name}>Sana Tariq</p>

        {/* progress bar */}
        <div className={styles.bar}>
          <div className={styles.barFill} />
        </div>

        <p className={styles.hint}>Full-Stack Developer</p>
      </div>
    </div>
  );
}
