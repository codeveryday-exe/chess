import { WHITE, type Color } from 'chess.js';
import styles from './components/Square.module.css';
import type { ReactNode } from 'react';

interface Props {
  squareColor: Color;
  children: ReactNode;
}

export function Square({ squareColor, children }: Props) {
  return <div className={`${styles.square} ${squareColor === WHITE ? styles.white : styles.black}`}>{children}</div>;
}
