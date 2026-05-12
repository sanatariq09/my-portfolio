import { useCursor } from '../../hooks/useCursor';
import styles from './Cursor.module.css';

export function Cursor() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      <div ref={dotRef}  className={styles.cursor} />
      <div ref={ringRef} className={styles.cursorRing} />
    </>
  );
}
