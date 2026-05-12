import { useState } from 'react';
import { SnakeGame }  from '../SnakeGame/SnakeGame';
// import { GITHUB_URL, LINKEDIN_URL } from '../../data/social';
import styles from './Footer.module.css';

export function Footer() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <span className={styles.logoAvatar}>
            <span className={styles.logoAvatarRing} aria-hidden />
            <span className={styles.logoAvatarRing2} aria-hidden />
            <span className={styles.logoAvatarInner}>
              <img src="/sana.png" alt="Sana Tariq" className={styles.logoImg} />
            </span>
          </span>
          <span className={styles.logoText}>Sana<span>.</span>Tariq</span>
        </div>
        <div className={styles.copy}>© 2026 — Built with passion </div>
        <div className={styles.links}>
          {/* <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.36 1.13 2.94.87.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 6.84c.85 0 1.7.12 2.5.37 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.45.1 2.71.65.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.58 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.18 10.18 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4 1.56 1.56 0 0 1 6.94 8.5ZM5.6 9.8h2.68V18H5.6V9.8Zm4.34 0h2.56v1.12h.03c.36-.68 1.22-1.4 2.52-1.4 2.7 0 3.2 1.8 3.2 4.13V18h-2.68v-3.84c0-.92-.02-2.1-1.27-2.1-1.28 0-1.48 1.02-1.48 2.03V18H9.94V9.8Z" />
            </svg>
          </a>
          <a href="#">Twitter</a> */}
          <button
            className={styles.secretBtn}
            onClick={() => setPlaying(true)}
            title="🕹️ Secret!"
          >
            🎮
          </button>
        </div>
      </footer>

      {playing && <SnakeGame onClose={() => setPlaying(false)} />}
    </>
  );
}
