import styles from './Piece.module.css';
import { Bishop } from './Pieces/Bishop';
import { King } from './Pieces/King';
import { Knight } from './Pieces/Knight';
import { Pawn } from './Pieces/Pawn';
import { Queen } from './Pieces/Queen';
import { Rook } from './Pieces/Rook';

interface Props {
  letter?: string;
}

export function Piece({ letter }: Props) {
  if (letter === 'p') {
    return <Pawn side="black" />;
  }

  if (letter === 'P') {
    return <Pawn side="white" />;
  }

  if (letter === 'r') {
    return <Rook side="black" />;
  }

  if (letter === 'R') {
    return <Rook side="white" />;
  }

  if (letter === 'n') {
    return <Knight side="black" />;
  }

  if (letter === 'N') {
    return <Knight side="white" />;
  }

  if (letter === 'b') {
    return <Bishop side="black" />;
  }

  if (letter === 'B') {
    return <Bishop side="white" />;
  }

  if (letter === 'q') {
    return <Queen side="black" />;
  }

  if (letter === 'Q') {
    return <Queen side="white" />;
  }

  if (letter === 'k') {
    return <King side="black" />;
  }

  if (letter === 'K') {
    return <King side="white" />;
  }

  return letter;
}
// USE SWITCH-CASE NOT IF
// USE TYPES FROM CHESS.JS, NOT LETTERS
// USE GIT
