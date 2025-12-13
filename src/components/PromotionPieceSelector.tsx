import { QUEEN } from 'chess.js';
import { useBoard } from '../contexts/BoardContext';

export function PromotionPieceSelector() {
  const { promotionWaitingMove, setPromotionWaitingMove, setSelectedPiece, makeMove } = useBoard();

  if (!promotionWaitingMove) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          makeMove({ from: promotionWaitingMove.from, to: promotionWaitingMove.to, promotion: QUEEN });
          setSelectedPiece(undefined);
          setPromotionWaitingMove(undefined);
        }}
      >
        bruhQueen
      </button>
    </>
  );
}

// block making moves when waiting for promotion => (tactic: look for HTML inert)
// show 4 piece in promotionPieceSelector => make it look like a box
