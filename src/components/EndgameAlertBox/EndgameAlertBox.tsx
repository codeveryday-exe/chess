import { WHITE } from 'chess.js';
import { useBoard } from '../../contexts/BoardContext';
import styles from './EndgameAlertBox.module.css';

export function EndgameAlertBox() {
  const { isCheckmate, isDraw, isStalemate, isTimeout, turn, reset } = useBoard();

  const message = isCheckmate
    ? `Checkmate, ${turn === WHITE ? 'Black' : 'White'} won!`
    : isDraw
      ? 'Draw'
      : isStalemate
        ? 'Stalemate'
        : isTimeout
          ? `Times Up, ${turn === WHITE ? 'Black' : 'White'} won!`
          : '';
  return (
    <>
      {message && (
        <div className={styles.outerBox}>
          <div className={styles.innerBox}>
            <p className={styles.text}>{message}</p>
            <button onClick={reset} type="button" className={styles.restartBtn}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
