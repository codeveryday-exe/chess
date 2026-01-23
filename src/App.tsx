import { Board } from './components/Board/Board';
import { EndgameAlertBox } from './components/EndgameAlertBox/EndgameAlertBox';
import { PromotionPieceSelector } from './components/PromotionPieceSelector/PromotionPieceSelector';
import { useBoard } from './contexts/BoardContext';
import styles from './App.module.css';
import { Clock } from './components/Clock/Clock';
import { TimeLimitSelectionBox } from './components/TimeLimitSelectionBox/TimeLimitSelectionBox';
import { BLACK, WHITE } from 'chess.js';

export default function App() {
  const { promotionWaitingMove, selectedTimeControl, playerColor } = useBoard();

  return (
    <main className={styles.app}>
      {!selectedTimeControl && <TimeLimitSelectionBox />}
      {selectedTimeControl && (
        <div className={styles.clockBox}>
          <Clock timeLimit={selectedTimeControl.time} color={playerColor} />
          <Clock timeLimit={selectedTimeControl.time} color={playerColor === WHITE ? BLACK : WHITE} />
        </div>
      )}
      <Board />
      <EndgameAlertBox />
      {promotionWaitingMove && <PromotionPieceSelector promotionWaitingMove={promotionWaitingMove} />}
    </main>
  );
}
