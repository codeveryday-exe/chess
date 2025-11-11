import { Square } from '../Square';
import type { PieceSymbol, Color, Piece } from 'chess.js';
import styles from './Board.module.css';

export function Board() {
  let isWhite = true;
  const letters = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];

  return (
    <>
      <div className={styles.board}>
        {Array.from({ length: 8 }, (_, columnIndex) => {
          isWhite = !isWhite;
          return Array.from({ length: 8 }, (_, rowIndex) => {
            isWhite = !isWhite;
            return (
              <Square
                key={rowIndex}
                letter={
                  columnIndex === 0
                    ? letters[rowIndex]
                    : columnIndex === 1
                      ? letters[rowIndex + 8]
                      : columnIndex === 6
                        ? letters[rowIndex + 8].toUpperCase()
                        : columnIndex === 7
                          ? letters[rowIndex].toUpperCase()
                          : undefined
                }
                squareColor={isWhite ? 'white' : 'black'}
              />
            );
          });
        })}
      </div>
    </>
  );
}
