import { BLACK, WHITE, type Color } from 'chess.js';
import styles from './Square.module.css';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  squareColor: Color;
  children: ReactNode;
  isCheck: boolean;
  isLastMovedSquare: boolean;
}

export function Square({ squareColor, isCheck, children, isLastMovedSquare }: Props) {
  return (
    <div
      className={clsx(styles.square, {
        [styles.white]: squareColor === WHITE,
        [styles.black]: squareColor === BLACK,
        [styles.check]: isCheck,
        [styles.last_move]: isLastMovedSquare,
      })}
    >
      {children}
    </div>
  );
}
