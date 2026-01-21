import { Board } from './components/Board';
import { EndgameAlertBox } from './components/EndgameAlertBox';
import { PromotionPieceSelector } from './components/PromotionPieceSelector';
import { useBoard } from './contexts/BoardContext';
import styles from './App.module.css';
import { Clock } from './contexts/Clock';
import { TimeLimitSelectionBox } from './components/TimeLimitSelectionBox';
import { BLACK, WHITE } from 'chess.js';

export default function App() {
  const { promotionWaitingMove, selectedTimeControl, playerColor } = useBoard();

  return (
    <main className={styles.app}>
      {!selectedTimeControl && <TimeLimitSelectionBox />}
      {selectedTimeControl && (
        <div className={styles.clockBox}>
          <Clock timeLimit={selectedTimeControl.time} color={playerColor === WHITE ? WHITE : BLACK} />
          <Clock timeLimit={selectedTimeControl.time} color={playerColor === WHITE ? BLACK : WHITE} />
        </div>
      )}
      <Board />
      <EndgameAlertBox />
      {promotionWaitingMove && <PromotionPieceSelector promotionWaitingMove={promotionWaitingMove} />}
    </main>
  );
}
