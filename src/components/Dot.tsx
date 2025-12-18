import styles from './Dot.module.css';

export function Dot({ isCapture, onMove }: { isCapture: boolean; onMove: () => void }) {
  return <button type="button" className={isCapture ? styles.capture : styles.dot} onClick={onMove} />;
}
