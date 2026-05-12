import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GITHUB_URL } from '../../data/social';
import { pathForSection, type PortfolioSectionId } from '../../data/sections';
import styles from './CommandPalette.module.css';

interface Command {
  id: string;
  icon: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_SECTIONS: { id: PortfolioSectionId; label: string; icon: string }[] = [
  { id: 'hero',         label: 'Home',            icon: '⌂' },
  { id: 'about',        label: 'About Me',         icon: '◑' },
  { id: 'skills',       label: 'Skills',           icon: '◈' },
  { id: 'projects',     label: 'Projects',         icon: '◉' },
  { id: 'github',       label: 'GitHub Activity',  icon: '⎋' },
  { id: 'services',     label: 'Services',         icon: '◎' },
  { id: 'testimonials', label: 'Recommendations', icon: '❝' },
  { id: 'contact',      label: 'Contact',          icon: '◌' },
];

export function CommandPalette({ isDark, onToggleTheme }: Props) {
  const navigate = useNavigate();
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState('');
  const [cursor,  setCursor]  = useState(0);
  const inputRef  = useRef<HTMLInputElement>(null);

  // build command list
  const commands = useMemo<Command[]>(() => [
    ...NAV_SECTIONS.map((s) => ({
      id:     `nav-${s.id}`,
      icon:   s.icon,
      label:  `Go to ${s.label}`,
      action: () => { navigate(pathForSection(s.id)); },
    })),
    {
      id:       'theme',
      icon:     isDark ? '☀️' : '🌙',
      label:    isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      shortcut: 'T',
      action:   onToggleTheme,
    },
    {
      id:       'copy-email',
      icon:     '✉',
      label:    'Copy Email Address',
      shortcut: 'E',
      action:   () => { navigator.clipboard.writeText('ubaidsheikh91@gmail.com'); },
    },
    {
      id:       'github',
      icon:     '⎋',
      label:    'Open GitHub Profile',
      shortcut: 'G',
      action:   () => { window.open(GITHUB_URL, '_blank'); },
    },
    {
      id:       'cv',
      icon:     '↓',
      label:    'Download CV',
      shortcut: 'D',
      action:   () => { window.open('/resume.pdf', '_blank'); },
    },
    {
      id:       'top',
      icon:     '↑',
      label:    'Scroll to Top',
      shortcut: '↑',
      action:   () => { window.scrollTo({ top: 0, behavior: 'smooth' }); },
    },
  ], [isDark, onToggleTheme, navigate]);

  const filtered = useMemo(() =>
    query.trim()
      ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
      : commands,
    [query, commands]
  );

  // keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // focus input on open, reset cursor
  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // arrow navigation + enter
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown')  { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    if (e.key === 'Enter' && filtered[cursor]) {
      filtered[cursor].action();
      setOpen(false);
    }
  };

  if (!open) return (
    <button
      className={styles.hint}
      onClick={() => setOpen(true)}
      aria-label="Open command palette"
    >
      <kbd>⌘</kbd><kbd>K</kbd>
    </button>
  );

  return (
    <>
      <div className={styles.backdrop} onClick={() => setOpen(false)} />

      <div className={styles.palette} role="dialog" aria-label="Command palette">
        <div className={styles.searchRow}>
          <span className={styles.searchIcon}>⌘</span>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search commands…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
            onKeyDown={onKeyDown}
          />
          <kbd className={styles.esc} onClick={() => setOpen(false)}>ESC</kbd>
        </div>

        <ul className={styles.list}>
          {filtered.map((cmd, i) => (
            <li
              key={cmd.id}
              className={`${styles.item} ${i === cursor ? styles.active : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => { cmd.action(); setOpen(false); }}
            >
              <span className={styles.itemIcon}>{cmd.icon}</span>
              <span className={styles.itemLabel}>{cmd.label}</span>
              {cmd.shortcut && <kbd className={styles.itemKey}>{cmd.shortcut}</kbd>}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className={styles.empty}>No commands found for "{query}"</li>
          )}
        </ul>

        <div className={styles.footer}>
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>ESC</kbd> close</span>
        </div>
      </div>
    </>
  );
}
