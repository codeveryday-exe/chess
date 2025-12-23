import { BISHOP, KNIGHT, Move, QUEEN, ROOK, type PieceSymbol } from 'chess.js';
import { useBoard } from '../contexts/BoardContext';
import { Queen } from './Pieces/Queen';
import { Rook } from './Pieces/Rook';
import { Bishop } from './Pieces/Bishop';
import { Knight } from './Pieces/Knight';
import styles from './PromotionPieceSelector.module.css';

export function PromotionPieceSelector({ promotionWaitingMove }: { promotionWaitingMove: Move }) {
  const { setPromotionWaitingMove, setSelectedPiece, turn, makeMove } = useBoard();

  function promote(promotion: PieceSymbol) {
    promotionWaitingMove.promotion = promotion;
    makeMove(promotionWaitingMove);
    setSelectedPiece(undefined);
    setPromotionWaitingMove(undefined);
  }

  return (
    <div className={styles.outerBox}>
      <div className={styles.innerBox}>
        <button className={styles.pieceBtn} type="button" onClick={() => promote(QUEEN)}>
          <Queen side={turn === 'w' ? 'white' : 'black'} />
        </button>
        <button className={styles.pieceBtn} type="button" onClick={() => promote(ROOK)}>
          <Rook side={turn === 'w' ? 'white' : 'black'} />
        </button>
        <button className={styles.pieceBtn} type="button" onClick={() => promote(BISHOP)}>
          <Bishop side={turn === 'w' ? 'white' : 'black'} />
        </button>
        <button className={styles.pieceBtn} type="button" onClick={() => promote(KNIGHT)}>
          <Knight side={turn === 'w' ? 'white' : 'black'} />
        </button>
      </div>
    </div>
  );
}
