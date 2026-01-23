import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from 'chess.js';
import { Bishop } from '../Pieces/Bishop';
import { King } from '../Pieces/King';
import { Knight } from '../Pieces/Knight';
import { Pawn } from '../Pieces/Pawn';
import { Queen } from '../Pieces/Queen';
import { Rook } from '../Pieces/Rook';
import type { BoardPiece } from '../../types';

interface Props {
  piece: BoardPiece;
  onSelectedPiece: VoidFunction;
}

function PieceIcon({ piece }: { piece: BoardPiece }) {
  switch (piece.type) {
    case PAWN:
      return <Pawn side={piece.color === WHITE ? 'white' : 'black'} />;
    case ROOK:
      return <Rook side={piece.color === WHITE ? 'white' : 'black'} />;
    case KNIGHT:
      return <Knight side={piece.color === WHITE ? 'white' : 'black'} />;
    case BISHOP:
      return <Bishop side={piece.color === WHITE ? 'white' : 'black'} />;
    case QUEEN:
      return <Queen side={piece.color === WHITE ? 'white' : 'black'} />;
    case KING:
      return <King side={piece.color === WHITE ? 'white' : 'black'} />;
    default:
      throw new Error('Piece not found');
  }
}

export function Piece({ piece, onSelectedPiece }: Props) {
  return (
    <button
      onClick={() => {
        onSelectedPiece();
      }}
      type="button"
    >
      <PieceIcon piece={piece} />
    </button>
  );
}
