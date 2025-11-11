import type { Color, PieceSymbol } from 'chess.js';
import { Piece } from './components/Piece';
import styles from './components/Square.module.css';

interface Props {
  squareColor: string;
  pieceType?: string;
  columnIndex?: number;
  type?: PieceSymbol;
  pieceColor?: Color;
}

export function Square({ squareColor, type: letter, pieceColor }: Props) {
  return (
    <div className={`${styles.square} ${styles[squareColor]}`}>
      {letter && <Piece type={letter} color={pieceColor} />}
    </div>
  );
}
