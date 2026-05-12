import { marqueeItems } from '../../data/marquee';
import styles from './Marquee.module.css';

export function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
