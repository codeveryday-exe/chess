import { Piece } from './components/Piece';
import styles from './components/Square.module.css';

interface Props {
  squareColor: string;
  pieceType?: string;
  columnIndex?: number;
  letter?: string;
}

export function Square({ squareColor, letter }: Props) {
  return <div className={`${styles.square} ${styles[squareColor]}`}>{letter && <Piece letter={letter} />}</div>;
}
