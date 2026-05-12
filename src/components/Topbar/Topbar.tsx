import { useId } from 'react';
import { Link } from 'react-router-dom';
import { useTopbarScroll } from '../../hooks/useTopbarScroll';
import { pathForSection, type PortfolioSectionId } from '../../data/sections';
import styles from './Topbar.module.css';

interface TopbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  activeSection: string;
  askAiOpen: boolean;
  onToggleAskAi: () => void;
}

const NAV_LINKS: { sectionId: PortfolioSectionId; label: string }[] = [
  { sectionId: 'hero',         label: 'Home'     },
  { sectionId: 'about',        label: 'About'    },
  { sectionId: 'skills',       label: 'Skills'   },
  { sectionId: 'projects',     label: 'Projects' },
  { sectionId: 'github',       label: 'GitHub'   },
  { sectionId: 'services',     label: 'Services' },
  // { sectionId: 'testimonials', label: 'Recommendations' },
  { sectionId: 'contact',      label: 'Contact'  },
];

function AskAiIcon({ gradId }: { gradId: string }) {
  return (
    <svg className={styles.askAiIcon} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="55%" stopColor="var(--accent2)" />
          <stop offset="100%" stopColor="var(--accent3)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 2c1.3 3.2 2.2 4.1 5.4 5.4c-3.2 1.3-4.1 2.2-5.4 5.4c-1.3-3.2-2.2-4.1-5.4-5.4C9.8 6.1 10.7 5.2 12 2Z"
      />
      <path fill={`url(#${gradId})`} opacity="0.85" d="M19 14l1.2 2.9L23 18l-2.8 1.1L19 22l-1.2-2.9L15 18l2.8-1.1L19 14Z" />
      <path fill={`url(#${gradId})`} opacity="0.65" d="M5 8l.9 2.1L8 11l-2.1.9L5 14l-.9-2.1L2 11l2.1-.9L5 8Z" />
    </svg>
  );
}

export function Topbar({
  isDark,
  onToggleTheme,
  onOpenMenu,
  activeSection,
  askAiOpen,
  onToggleAskAi,
}: TopbarProps) {
  const scrolled = useTopbarScroll();
  const askAiGradId = useId().replace(/[:]/g, '');

  return (
    <header className={`${styles.topbar} ${scrolled ? styles.scrolled : ''}`}>

      <Link to="/" className={styles.logo}>
        <span className={styles.logoAvatar}>
          <span className={styles.logoAvatarRing} aria-hidden />
          <span className={styles.logoAvatarRing2} aria-hidden />
          <span className={styles.logoAvatarInner}>
            <img src="/sana.png" alt="Sana Tariq" className={styles.logoImg} />
          </span>
        </span>
        <span className={styles.logoText}>Sana<span>.</span>Tariq</span>
      </Link>

      <nav className={styles.nav}>
        {NAV_LINKS.map(({ sectionId, label }) => (
          <Link
            key={sectionId}
            to={pathForSection(sectionId)}
            className={`${styles.navLink} ${activeSection === sectionId ? styles.navLinkActive : ''}`}
          >
            {label}
            <span className={styles.navDot} />
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        {/* <button
          type="button"
          className={`${styles.askAiBtn} ${askAiOpen ? styles.askAiBtnActive : ''}`}
          onClick={onToggleAskAi}
          aria-expanded={askAiOpen}
          aria-controls="portfolio-chat-panel"
        >
          <span className={styles.askAiShine} aria-hidden />
          <AskAiIcon gradId={`askai-grad-${askAiGradId}`} />
          <span className={styles.askAiText}>
            Ask <span className={styles.askAiAccent}>AI</span>
          </span>
        </button> */}

        <button
          className={styles.themeBtn}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '🌙' : '☀️'}
        </button>

        <button className={styles.menuBtn} onClick={onOpenMenu}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect width="16" height="2" rx="1" fill="currentColor" />
            <rect y="5" width="10" height="2" rx="1" fill="currentColor" />
            <rect y="10" width="13" height="2" rx="1" fill="currentColor" />
          </svg>
          <span className={styles.menuText}>MENU</span>
        </button>
      </div>

    </header>
  );
}
