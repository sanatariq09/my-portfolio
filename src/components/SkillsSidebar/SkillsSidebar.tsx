import { useState } from 'react';
import { skills } from '../../data/skills';
import { TechIcon } from '../TechIcon/TechIcon';
import styles from './SkillsSidebar.module.css';

const colorMap: Record<string, string> = {
  orange: styles.icOrange,
  green:  styles.icGreen,
  amber:  styles.icAmber,
  purple: styles.icPurple,
  blue:   styles.icBlue,
  pink:   styles.icPink,
};

export function SkillsSidebar() {
  const [open, setOpen]         = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      {/* ── Prominent toggle button ── */}
      <button
        className={`${styles.tab} ${open ? styles.tabOpen : ''}`}
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? 'Close skills panel' : 'Open skills panel'}
      >
        <span className={styles.tabIcon}>⚡</span>
        <span className={styles.tabLabel}>Skills</span>
        <span className={styles.tabArrow}>{open ? '←' : '→'}</span>
      </button>

      {/* ── Left panel ── */}
      <aside className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerTitle}>My Skills</span>
            <span className={styles.headerSub}>Tech I work with</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close skills panel"
          >
            ✕
          </button>
        </div>

        <div className={styles.list}>
          {skills.map((skill, i) => (
            <div key={skill.name} className={styles.item}>
              <button
                className={`${styles.itemHeader} ${expanded === i ? styles.itemHeaderOpen : ''}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className={`${styles.icon} ${colorMap[skill.iconColor]}`}>
                  {skill.icon}
                </div>
                <span className={styles.itemName}>{skill.name}</span>
                <span className={`${styles.chevron} ${expanded === i ? styles.chevronOpen : ''}`}>
                  ›
                </span>
              </button>

              <div className={`${styles.tagWrap} ${expanded === i ? styles.tagWrapOpen : ''}`}>
                {skill.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    <TechIcon label={tag} className={styles.tagIcon} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Backdrop ── */}
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}
    </>
  );
}
