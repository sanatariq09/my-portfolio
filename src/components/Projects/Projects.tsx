import { useRef, useState } from 'react';
import { projects, Project }  from '../../data/projects';
import { useTilt }            from '../../hooks/useTilt';
import { CaseStudyModal }     from '../CaseStudyModal/CaseStudyModal';
import { MediaModal }         from '../MediaModal/MediaModal'; // ← NEW
import styles from './Projects.module.css';

const delayClass = ['d1', 'd2', 'd3', 'd4'];

function TiltCard({ children, className, onClick }: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, { max: 10 });
  return <div ref={ref} className={className} onClick={onClick}>{children}</div>;
}

export function Projects() {
  const [active,     setActive]     = useState<Project | null>(null);
  const [mediaProj,  setMediaProj]  = useState<Project | null>(null); // ← NEW

  return (
    <section className={styles.section} id="projects">
      <div className="sec">
        <div className="sec-tag reveal">Featured Work</div>
        <h2 className="sec-title reveal">Projects I'm proud of</h2>
        <p className="sec-sub reveal">
          A selection of recent work spanning SaaS, fintech, e-commerce, and AI.
          <span className={styles.hint}> Click any card to read the full case study.</span>
        </p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <TiltCard
              key={project.name}
              className={`${styles.card} reveal ${delayClass[i]}`}
              onClick={() => setActive(project)}
            >
              <div className={`${styles.thumb} ${styles[project.thumbVariant]}`}>
                {/* ── If project has an image, show it; otherwise show the label ── */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', opacity: 0.85,
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  project.label
                )}

                {/* ── Media preview button (image or video icon) ── */}
                {(project.image || project.video) && (
                  <button
                    className={styles.mediaBtn}
                    onClick={(e) => { e.stopPropagation(); setMediaProj(project); }}
                    aria-label={`Preview ${project.name}`}
                    title={project.video ? 'View image & video' : 'View image'}
                  >
                    {project.video ? '▶' : '🔍'}
                  </button>
                )}

                <span className={styles.readMore}>Read Case Study →</span>
              </div>

              <div className={styles.body}>
                <div className={styles.name}>{project.name}</div>
                <div className={styles.desc}>{project.description}</div>
                <div className={styles.footer}>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    className={styles.link}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.linkLabel}
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Existing case study modal – untouched */}
      <CaseStudyModal project={active} onClose={() => setActive(null)} />

      {/* NEW: media preview modal */}
      {mediaProj && (
        <MediaModal
          title={mediaProj.name}
          image={mediaProj.image}
          video={mediaProj.video}
          onClose={() => setMediaProj(null)}
        />
      )}
    </section>
  );
}
