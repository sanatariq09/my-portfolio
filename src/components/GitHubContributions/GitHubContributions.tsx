import { useEffect, useState } from 'react';
import styles from './GitHubContributions.module.css';

/* ── Types ─────────────────────────────────────────────── */
interface Day {
  date:  string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total:         Record<string, number>;
  contributions: Day[];
}

interface Props {
  username: string;
  /** When embedded under a section heading, use a slimmer header (no duplicate title). */
  layout?: 'card' | 'section';
}

/* ── Helpers ────────────────────────────────────────────── */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function groupByWeek(days: Day[]): Day[][] {
  if (!days.length) return [];

  // pad the first week so it starts on Sunday
  const firstDow = new Date(days[0].date).getDay();
  const padded: (Day | null)[] = [
    ...Array(firstDow).fill(null),
    ...days,
  ];

  const weeks: Day[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(
      padded.slice(i, i + 7).map((d) =>
        d ?? { date: '', count: 0, level: 0 as const }
      )
    );
  }
  return weeks;
}

function getMonthLabels(weeks: Day[][]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const first = week.find((d) => d.date);
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) {
      labels.push({ label: MONTHS[m], col });
      lastMonth = m;
    }
  });
  return labels;
}

/* ── Component ──────────────────────────────────────────── */
export function GitHubContributions({ username, layout = 'card' }: Props) {
  const [data,    setData]    = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed');
        return r.json() as Promise<ApiResponse>;
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [username]);

  const rootClass =
    layout === 'section' ? `${styles.card} ${styles.cardSection}` : styles.card;

  if (loading) return (
    <div className={rootClass}>
      <div className={styles.skeleton}>
        {Array.from({ length: 53 * 7 }).map((_, i) => (
          <div key={i} className={styles.skeletonCell} />
        ))}
      </div>
    </div>
  );

  if (error || !data) return (
    <div className={rootClass}>
      <p className={styles.errorMsg}>
        Could not load contributions.{' '}
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
          View on GitHub ↗
        </a>
      </p>
    </div>
  );

  const weeks        = groupByWeek(data.contributions);
  const monthLabels  = getMonthLabels(weeks);
  const totalThisYear = Object.values(data.total).reduce((a, b) => a + b, 0);

  const CELL  = 13;  // cell size px
  const GAP   = 3;   // gap px
  const STEP  = CELL + GAP;

  const profileHref = `https://github.com/${username}`;

  return (
    <div className={rootClass}>
      {layout === 'card' ? (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.dot} />
            <span className={styles.title}>GitHub Contributions</span>
            <a href={profileHref} target="_blank" rel="noreferrer" className={styles.username}>
              @{username}
            </a>
          </div>
          <div className={styles.totalBadge}>
            <strong>{totalThisYear.toLocaleString()}</strong> contributions in the last year
          </div>
        </div>
      ) : (
        <div className={styles.sectionMeta}>
          <a href={profileHref} target="_blank" rel="noreferrer" className={styles.sectionMetaUser}>
            @{username}
            <span className={styles.sectionMetaExt} aria-hidden>
              ↗
            </span>
          </a>
          <div className={styles.totalBadge}>
            <strong>{totalThisYear.toLocaleString()}</strong>
            <span className={styles.totalBadgeHint}> contributions (last year)</span>
          </div>
        </div>
      )}

      {/* ── Grid ── */}
      <div className={styles.graphWrap}>
        {/* day labels (Mon / Wed / Fri) */}
        <div className={styles.dayLabels}>
          {DAYS.map((d, i) => (
            <span
              key={d}
              className={styles.dayLabel}
              style={{ visibility: i % 2 === 0 ? 'hidden' : 'visible' }}
            >
              {d}
            </span>
          ))}
        </div>

        <div className={styles.graphRight}>
          {/* month labels */}
          <div className={styles.monthRow} style={{ marginLeft: 0 }}>
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className={styles.monthLabel}
                style={{ left: col * STEP }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* cell grid */}
          <div className={styles.grid}>
            {weeks.map((week, wi) => (
              <div key={wi} className={styles.weekCol}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`${styles.cell} ${day.date ? styles[`level${day.level}`] : styles.empty}`}
                    onMouseEnter={(e) => {
                      if (!day.date) return;
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
                      setTooltip({
                        text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className={styles.legend}>
        <span className={styles.legendLabel}>Less</span>
        {([0, 1, 2, 3, 4] as const).map((l) => (
          <div key={l} className={`${styles.legendCell} ${styles[`level${l}`]}`} />
        ))}
        <span className={styles.legendLabel}>More</span>
      </div>

      {/* ── Tooltip ── */}
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
