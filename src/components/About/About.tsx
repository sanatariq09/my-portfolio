import { useState } from 'react';
import { timelineItems, techStack, type TimelineItem } from '../../data/timeline';
import { getTechIconSources } from '../../utils/techIcons';
import { orgInitials } from '../../utils/timelineLogo';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import styles from './About.module.css';

function ExperienceMark({ org, logo }: Pick<TimelineItem, 'org' | 'logo'>) {
  const [imgFailed, setImgFailed] = useState(() => !logo);
  const initials = orgInitials(org);

  return (
    <div className={styles.expMark} aria-hidden>
      {logo && !imgFailed ? (
        <img
          src={logo}
          alt=""
          className={styles.expMarkImg}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className={styles.expMarkInitials}>{initials}</span>
      )}
    </div>
  );
}

const FACTS: { value: string; label: string; symbol?: boolean }[] = [
  { value: '1+',  label: 'Years of Experience' },
  { value: '40+', label: 'Projects Delivered'  },
  { value: '15+', label: 'Happy Clients'        },
  { value: '\u221E', label: 'Lines of Code', symbol: true },
];

export function About() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const filtered = timelineItems.filter((i) => i.type === activeTab);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={styles.section} id="about">
      <div className="sec">
        <div className="sec-tag reveal">About Me</div>
        <h2 className="sec-title reveal">The Person Behind the Code</h2>

        {/* ── Top two-column ── */}
        <div className={`${styles.top} reveal`}>

          {/* Left: bio */}
          <div className={styles.bio}>
            <p className={styles.bioText}>
              Hey! I'm <strong>Sana Tariq</strong>, a Full-Stack Developer with 1+ years of experience
              building modern, responsive, and scalable web applications. I have strong skills in frontend 
              and backend development using HTML, CSS, JavaScript, Node.js, Laravel, MySQL, and REST APIs.
              I also have experience working with WordPress, including website creation, theme customization,
              plugin usage, and content management. I focus on delivering clean, user-friendly, and high-performance
              digital solutions.
            </p>
            <p className={styles.bioText}>
              I love solving complex problems and turning rough ideas into polished products. When I'm
              not coding, you'll find me exploring new frameworks, contributing to open-source, or
              sipping way too much coffee.
            </p>
            <div className={styles.traits}>
              {['Problem Solver', 'Team Player', 'Fast Learner', 'Open Source Fan'].map((t) => (
                <span key={t} className={styles.trait}>{t}</span>
              ))}
            </div>
            <a
              href="/resume.pdf"
              className={`btn btn-primary ${styles.cvBtn}`}
              download
            >
              ↓ Download CV
            </a>
          </div>

          {/* Right: fact cards */}
          <div className={styles.facts}>
            {FACTS.map(({ value, label, symbol }) => (
              <div key={label} className={styles.fact}>
                <div
                  className={`${styles.factVal} ${symbol ? styles.factValSymbol : ''}`}
                >
                  {value}
                </div>
                <div className={styles.factLbl}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech stack logo wall ── */}
        <div className={`${styles.techWrap} reveal`}>
          <p className={styles.techTitle}>Technologies I work with</p>
          <p className={styles.techHint}>
            Hover for depth — click any icon to open its official site in a new tab.
          </p>
          <div className={styles.techGrid}>
            {techStack.map(({ name, icon, color, website }) => (
              <MagneticButton key={name} strength={prefersReducedMotion ? 0 : 0.26}>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.techCard}
                  data-tip={name}
                  data-icon={icon}
                  aria-label={`${name} official website (opens in new tab)`}
                >
                  <img
                    src={getTechIconSources(icon, color)[0]}
                    alt=""
                    className={styles.techIcon}
                    loading="lazy"
                    aria-hidden
                    onError={(e) => {
                      const img = e.currentTarget;
                      const parent = img.closest('[data-icon]') as HTMLElement | null;
                      const iconName = parent?.dataset.icon ?? icon;
                      const sources = getTechIconSources(iconName, color);
                      const idx = Number(img.dataset.fallbackIdx ?? '0') + 1;
                      if (idx < sources.length) {
                        img.dataset.fallbackIdx = String(idx);
                        img.src = sources[idx];
                        return;
                      }
                      img.style.display = 'none';
                    }}
                  />
                  <span className={styles.techName}>{name}</span>
                  <span className={styles.techTooltip}>{name}</span>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className={`${styles.timelineWrap} reveal`}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'work' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('work')}
            >
              💼 Work Experience
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'education' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('education')}
            >
              🎓 Education
            </button>
          </div>

          <div className={styles.timeline}>
            {filtered.map((item, idx) => (
              <div key={item.id} className={styles.item} style={{ '--idx': idx } as React.CSSProperties}>
                {/* connector */}
                <div className={styles.connector}>
                  <div className={styles.dot} />
                  {idx < filtered.length - 1 && <div className={styles.line} />}
                </div>

                {/* card */}
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <div className={styles.cardHeadLeft}>
                      <ExperienceMark org={item.org} logo={item.logo} />
                      <div>
                        <div className={styles.role}>{item.role}</div>
                        <div className={styles.org}>{item.org} · {item.location}</div>
                      </div>
                    </div>
                    <div className={styles.period}>{item.period}</div>
                  </div>
                  <p className={styles.desc}>{item.desc}</p>
                  <div className={styles.cardTags}>
                    {item.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
