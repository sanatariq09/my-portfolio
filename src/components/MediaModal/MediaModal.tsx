/**
 * MediaModal
 * ──────────
 * Lightweight media preview modal for project cards.
 * - Shows a large image with optional zoom-on-click
 * - Plays MP4 files OR iframe embeds (YouTube / Vimeo)
 * - Tab switcher appears only when BOTH image AND video exist
 * - Fully keyboard-accessible (Escape to close)
 * - Zero changes to existing project card UI
 */

import { useEffect, useRef, useState } from 'react';
import styles from './MediaModal.module.css';

interface MediaModalProps {
  /** Project title shown in the modal header */
  title: string;
  /** Absolute or relative image URL */
  image?: string;
  /** MP4 path  OR  iframe-embeddable URL (YouTube /embed/, Vimeo, etc.) */
  video?: string;
  onClose: () => void;
}

function isEmbedUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('//');
}

export function MediaModal({ title, image, video, onClose }: MediaModalProps) {
  const [tab, setTab]     = useState<'image' | 'video'>(image ? 'image' : 'video');
  const [zoomed, setZoomed] = useState(false);
  const overlayRef          = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Click outside → close */
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  const hasBoth = !!(image && video);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} media preview`}
    >
      <div className={styles.panel}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>{title}</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* ── Tab switcher (only when both exist) ── */}
        {hasBoth && (
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'image' ? styles.tabActive : ''}`}
              onClick={() => setTab('image')}
            >
              🖼 Preview
            </button>
            <button
              className={`${styles.tab} ${tab === 'video' ? styles.tabActive : ''}`}
              onClick={() => { setTab('video'); setZoomed(false); }}
            >
              ▶ Video
            </button>
          </div>
        )}

        {/* ── Media area ── */}
        <div className={styles.mediaWrap}>
          {/* IMAGE */}
          {tab === 'image' && image && (
            <img
              src={image}
              alt={title}
              className={`${styles.image} ${zoomed ? styles.imageZoomed : ''}`}
              onClick={() => setZoomed((z) => !z)}
              title={zoomed ? 'Click to zoom out' : 'Click to zoom in'}
              draggable={false}
            />
          )}

          {/* VIDEO */}
          {tab === 'video' && video && (
            isEmbedUrl(video)
              ? (
                <iframe
                  src={video}
                  className={styles.iframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${title} video`}
                />
              )
              : (
                <video
                  src={video}
                  className={styles.video}
                  controls
                  autoPlay
                  playsInline
                />
              )
          )}
        </div>

        {/* Zoom hint */}
        {tab === 'image' && image && (
          <p className={styles.hint}>
            {zoomed ? 'Click image to zoom out' : 'Click image to zoom in'}
          </p>
        )}
      </div>
    </div>
  );
}
