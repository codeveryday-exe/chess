import { Board } from './components/Board';
import { EndgameAlertBox } from './components/EndgameAlertBox';
import { PromotionPieceSelector } from './components/PromotionPieceSelector';
import { useBoard } from './contexts/BoardContext';
import styles from './App.module.css';
import { Clock } from './contexts/Clock';

export default function App() {
  const { promotionWaitingMove } = useBoard();

  return (
    <main className={styles.app}>
      <div className={styles.clockBox}>
        <Clock timeLimit={3} color={'w'} />
        <Clock timeLimit={3} color={'b'} />
      </div>
      <Board />
      <EndgameAlertBox />
      {promotionWaitingMove && <PromotionPieceSelector promotionWaitingMove={promotionWaitingMove} />}
    </main>
  );
}
