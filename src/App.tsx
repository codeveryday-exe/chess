import { Board } from './components/Board';
import { EndgameAlertBox } from './components/EndgameAlertBox';
import { PromotionPieceSelector } from './components/PromotionPieceSelector';

export default function App() {
  return (
    <>
      <Board />
      <EndgameAlertBox />
      <PromotionPieceSelector />
    </>
  );
}
