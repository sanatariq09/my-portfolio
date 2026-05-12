import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.inner}>
        {/* glitchy 404 number */}
        <div className={styles.code} data-text="404">404</div>

        {/* floating astronaut illustration built from CSS */}
        <div className={styles.astro}>
          <div className={styles.helmet}>
            <div className={styles.visor} />
            <div className={styles.reflection} />
          </div>
          <div className={styles.body}>
            <div className={styles.armL} />
            <div className={styles.armR} />
            <div className={styles.legL} />
            <div className={styles.legR} />
          </div>
          <div className={styles.stars}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.star} style={{ '--i': i } as React.CSSProperties} />
            ))}
          </div>
        </div>

        <h1 className={styles.heading}>Lost in Space?</h1>
        <p className={styles.sub}>
          This page has drifted into the void. Let's get you back to safety.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={`btn btn-primary ${styles.homeBtn}`}>
            ← Back to Home
          </Link>
          <Link to="/contact" className={`btn btn-outline ${styles.contactBtn}`}>
            Contact Me
          </Link>
        </div>

        <p className={styles.breadcrumb}>
          <span>Sana Tariq.dev</span>
          <span className={styles.sep}>›</span>
          <span className={styles.missing}>page-not-found</span>
        </p>
      </div>
    </div>
  );
}
