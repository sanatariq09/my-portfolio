import { GITHUB_USERNAME } from '../../data/github';
import { GITHUB_URL } from '../../data/social';
import { GitHubContributions } from '../GitHubContributions/GitHubContributions';
import styles from './GitHubActivity.module.css';

export function GitHubActivity() {
  return (
    <section className={styles.section} id="github">
      <div className="sec">
        <div className="sec-tag reveal">Open source</div>
        <h2 className="sec-title reveal">Shipping in public</h2>
        <p className="sec-sub reveal">
          I maintain repos, review PRs, and push code almost daily. Here&apos;s a full year of
          contribution activity — hover squares for details.
        </p>

        <div className={`${styles.actions} reveal`}>
          <a href={GITHUB_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            GitHub profile
            <span className={styles.btnExt} aria-hidden>
              ↗
            </span>
          </a>
          <a
            href={`${GITHUB_URL}?tab=repositories`}
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repositories
          </a>
        </div>

        <div className={`${styles.graphBlock} reveal d2`}>
          <GitHubContributions username={GITHUB_USERNAME} layout="section" />
        </div>
      </div>
    </section>
  );
}
