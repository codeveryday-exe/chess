import { Square } from '../Square';
import styles from './Board.module.css';
import { useBoard } from '../contexts/BoardContext';

export function Board() {
  const { board /* makeMove */ } = useBoard();

  console.log(board);

  return (
    <>
      <div className={styles.board}>
        {board.map((row, columnIndex) =>
          row.map((piece, rowIndex) => (
            <Square
              key={rowIndex}
              type={piece?.type}
              squareColor={(rowIndex + (columnIndex % 2)) % 2 === 0 ? 'white' : 'black'}
              pieceColor={piece?.color}
            />
          )),
        )}
      </div>
    </>
  );
}
