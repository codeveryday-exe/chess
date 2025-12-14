import { BLACK, WHITE, type Color } from 'chess.js';
import styles from './Square.module.css';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { useBoard } from '../contexts/BoardContext';

interface Props {
  squareColor: Color;
  children: ReactNode;
  isCheck: boolean;
}

export function Square({ squareColor, isCheck, children }: Props) {
  const { promotionWaitingMove } = useBoard();

  return (
    <div
      inert={promotionWaitingMove !== undefined}
      className={clsx(styles.square, {
        [styles.white]: squareColor === WHITE,
        [styles.black]: squareColor === BLACK,
        [styles.check]: isCheck,
      })}
    >
      {children}
    </div>
  );
}
