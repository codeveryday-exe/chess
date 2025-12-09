import { WHITE } from 'chess.js';
import { useBoard } from '../contexts/BoardContext';
import styles from './EndgameAlertBox.module.css';

export function EndgameAlertBox() {
  const { isCheckmate, isDraw, isStalemate, turn, reset } = useBoard();

  const message = isCheckmate
    ? `Checkmate, ${turn === WHITE ? 'Black' : 'White'} won!`
    : isDraw
      ? 'Draw'
      : isStalemate
        ? 'Stalemate'
        : '';
  return (
    <>
      {message && (
        <div className={styles.box}>
          <p className={styles.text}>{message}</p>
          <button onClick={reset} type="button" className={styles.restartBtn}>
            Play Again
          </button>
        </div>
      )}
    </>
  );
}
