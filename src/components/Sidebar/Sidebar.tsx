import { GITHUB_URL, LINKEDIN_URL } from '../../data/social';
import { Link } from 'react-router-dom';
import { pathForSection, type PortfolioSectionId } from '../../data/sections';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const navLinks: { sectionId: PortfolioSectionId; label: string; icon: string; num: string }[] = [
  { sectionId: 'hero',         label: 'Home',            icon: '⌂', num: '01' },
  { sectionId: 'about',        label: 'About',           icon: '◑', num: '02' },
  { sectionId: 'skills',       label: 'Skills',          icon: '◈', num: '03' },
  { sectionId: 'projects',     label: 'Projects',        icon: '◉', num: '04' },
  { sectionId: 'github',       label: 'GitHub',         icon: '⎋', num: '05' },
  { sectionId: 'services',     label: 'Services',        icon: '◎', num: '06' },
  // { sectionId: 'testimonials', label: 'Recommendations', icon: '❝', num: '07' },
  { sectionId: 'contact',      label: 'Contact',         icon: '◌', num: '08' },
];

const socialLinks = [
  {
    href: GITHUB_URL,
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.58 2.36 1.13 2.94.87.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 6.84c.85 0 1.7.12 2.5.37 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.45.1 2.71.65.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.58 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.18 10.18 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    href: LINKEDIN_URL,
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4 1.56 1.56 0 0 1 6.94 8.5ZM5.6 9.8h2.68V18H5.6V9.8Zm4.34 0h2.56v1.12h.03c.36-.68 1.22-1.4 2.52-1.4 2.7 0 3.2 1.8 3.2 4.13V18h-2.68v-3.84c0-.92-.02-2.1-1.27-2.1-1.28 0-1.48 1.02-1.48 2.03V18H9.94V9.8Z" />
      </svg>
    ),
  },
  // {
  //   href: '#',
  //   label: 'X',
  //   icon: (
  //     <svg viewBox="0 0 24 24" aria-hidden="true">
  //       <path d="M18.9 3H22l-6.79 7.76L23 21h-6.12l-4.8-6.28L6.5 21H3.4l7.26-8.3L3 3h6.27l4.34 5.73L18.9 3Zm-1.08 16.1h1.7L8.34 4.83H6.5L17.82 19.1Z" />
  //     </svg>
  //   ),
  // },
  // {
  //   href: '#',
  //   label: 'Dribbble',
  //   icon: (
  //     <svg viewBox="0 0 24 24" aria-hidden="true">
  //       <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.88 4.65a8.02 8.02 0 0 1 1.05 4.56c-1.62-.32-3.4-.31-5.17.02-.2-.46-.4-.9-.62-1.34 1.67-.68 3.15-1.67 4.74-3.24ZM17.4 5.3a12.98 12.98 0 0 1-4.06 2.74 30.5 30.5 0 0 0-2.2-3.35A7.92 7.92 0 0 1 12 4c2.03 0 3.88.76 5.4 1.3ZM9.08 4.97c.82 1.06 1.58 2.2 2.26 3.4-2.77.73-5.42.75-7.2.62a8 8 0 0 1 4.94-4.02ZM4 12v-.1c1.97.03 5.19-.2 8.4-1.03.18.36.35.73.51 1.1-.09.03-.17.05-.26.08-3.35 1.08-5.1 3.13-5.93 4.52A8 8 0 0 1 4 12Zm4.32 5.95c.64-1.06 2.11-2.78 5.18-3.82.08-.02.15-.05.23-.07a17.4 17.4 0 0 1 1.36 5.04A7.92 7.92 0 0 1 12 20a7.95 7.95 0 0 1-3.68-.95Zm8.71-.77a19.6 19.6 0 0 0-1.2-4.55c1.5-.22 2.95-.17 4.2.1a8.03 8.03 0 0 1-3 4.45Z" />
  //     </svg>
  //   ),
  // },
];

export function Sidebar({ isOpen, onClose, activeSection }: SidebarProps) {
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
          ✕
        </button>

        <div className={styles.logo}>
          Sana<span>   </span>Tariq
        </div>

        <div className={styles.available}>
          <span className={styles.dot} />
          Available for new projects
        </div>

        <nav className={styles.nav}>
          {navLinks.map(({ sectionId, label, icon, num }) => {
            const isActive  = activeSection === sectionId;
            return (
              <Link
                key={sectionId}
                to={pathForSection(sectionId)}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={onClose}
              >
                <span className={styles.activeBar} />
                <span className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}>
                  {icon}
                </span>
                <span className={styles.navLabel}>{label}</span>
                <span className={`${styles.navNum} ${isActive ? styles.navNumActive : ''}`}>
                  {num}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.social}>
          {socialLinks.map(({ href, label, icon }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
