import styles from './Dot.module.css';

export function Dot({ onMove }: { onMove: () => void }) {
  return <button type="button" className={styles.dot} onClick={onMove} />;
}
