import {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  WHITE,
  type Color,
  type PieceSymbol /* type Square */,
} from 'chess.js';
import { Bishop } from './Pieces/Bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/Knight';
import { Pawn } from './Pieces/Pawn';
import { Queen } from './Pieces/Queen';
import { Rook } from './Pieces/Rook';

interface Props {
  // square: Square;
  type: PieceSymbol | undefined;
  color: Color | undefined;
}

export function Piece({ /* square, */ type, color }: Props) {
  switch (type) {
    case PAWN:
      return <Pawn side={color === WHITE ? 'white' : 'black'} />;

    case ROOK:
      return <Rook side={color === WHITE ? 'white' : 'black'} />;

    case KNIGHT:
      return <Knight side={color === WHITE ? 'white' : 'black'} />;

    case BISHOP:
      return <Bishop side={color === WHITE ? 'white' : 'black'} />;

    case QUEEN:
      return <Queen side={color === WHITE ? 'white' : 'black'} />;

    case KING:
      return <King side={color === WHITE ? 'white' : 'black'} />;

    default:
      return type;
  }
}
// ADD BOARD CONTEXT
