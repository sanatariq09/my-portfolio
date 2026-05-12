import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypewriter }  from '../../hooks/useTypewriter';
import { useCountUp }     from '../../hooks/useCountUp';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { ParticleWeb }    from '../ParticleWeb/ParticleWeb';
import styles from './Hero.module.css';

function useGreeting() {
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 5)  return { text: 'Burning midnight oil', emoji: '🌙' };
    if (h < 12) return { text: 'Good morning',         emoji: '🌅' };
    if (h < 17) return { text: 'Good afternoon',       emoji: '☀️' };
    if (h < 21) return { text: 'Good evening',         emoji: '🌆' };
    return              { text: 'Good night',           emoji: '🌙' };
  };

  const [greeting, setGreeting] = useState(getGreeting);

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  return greeting;
}

const STATS = [
  { num: 1,  suffix: '+', label: 'Years Exp.'          },
  { num: 20, suffix: '+', label: 'Projects Shipped'    },
  { num: 98, suffix: '%', label: 'Client Satisfaction' },
  // { num: 12, suffix: 'k', label: 'GitHub Stars'        },
] as const;

function StatItem({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(num);
  return (
    <div className={styles.stat} ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={styles.statNum}>{count}<span>{suffix}</span></div>
      <div className={styles.statLbl}>{label}</div>
    </div>
  );
}

export function Hero() {
  const greeting  = useGreeting();
  const typeText  = useTypewriter({
    words: ['Web Apps', 'REST APIs', 'E-commerce Stores', 'Web Development Projects', 'Laravel Application', 'CMS panel' , 'Responsive website' , 'Wordpress websites'],
  });

  useEffect(() => {
    const handler = () => {
      const sy = window.scrollY;
      document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
        const sp = parseFloat(el.dataset.speed ?? '0.2');
        el.style.transform = `translateY(${sy * sp}px)`;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg}>
        <div className={styles.orb1} data-speed="0.3" />
        <div className={styles.orb2} data-speed="0.2" />
        <div className={styles.orb3} data-speed="0.4" />
        <div className={styles.gridBg} />
        <ParticleWeb />
      </div>

      {/* ── Two-column layout ── */}
      <div className={styles.heroInner}>

        {/* ── Left: text content ── */}
        <div className={styles.heroContent}>
          <div className={styles.greetLine}>
            {greeting.emoji}&nbsp;{greeting.text}, visitor — it's currently{' '}
            <strong>
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </strong>{' '}in Karachi
          </div>

          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for Open work
          </div>

          <h1 className={styles.title}>
            <span className={styles.line1}>Full-Stack</span>
            <span className={styles.line2}>Developer</span>
            {/* <span className={styles.line3}>& Digital Craftsman</span> */}
          </h1>

          <p className={styles.tagline}>
            I build&nbsp;
            <span className={styles.typeword}>{typeText}</span>
            <span className={styles.typeCursor} aria-hidden="true">|</span>
          </p>

          <p className={styles.sub}>
            I am a Full Stack Web Developer with experience in building modern and responsive web applications.
            I have worked with technologies like HTML, CSS, JavaScript, React.js, Node.js, PHP, Laravel, MySQL, 
            and MongoDB.
            I enjoy creating user-friendly websites, APIs, and admin dashboards. I have also completed several projects 
            like e-commerce websites, food ordering systems, and social media applications.
          </p>

          <div className={styles.cta}>
            <MagneticButton><Link to="/projects" className="btn btn-primary">View My Work →</Link></MagneticButton>
            <MagneticButton><Link to="/contact" className="btn btn-outline">Let's Talk</Link></MagneticButton>
          </div>

          <div className={styles.stats}>
            {STATS.map((s) => <StatItem key={s.label} {...s} />)}
          </div>
        </div>

        {/* ── Right: photo ── */}
        <div className={styles.photoWrap}>
          <div className={styles.photoRing} />
          <div className={styles.photoRing2} />
          <div className={styles.photoGlow} />
          <img
            src="/sana.png"
            alt="Sana Tariq"
            className={styles.photo}
          />
          <div className={styles.photoOverlay} />
          <div className={styles.photoBadge}>
            <span className={styles.photoBadgeDot} />
            Open to work
          </div>
        </div>

      </div>

      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
        scroll
      </div>
    </section>
  );
}
