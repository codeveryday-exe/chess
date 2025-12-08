import type { Color, PieceSymbol, Square } from 'chess.js';

export interface BoardPiece {
  square: Square;
  type: PieceSymbol;
  color: Color;
}
