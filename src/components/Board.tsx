import { Square } from './Square';
import styles from './Board.module.css';
import { useBoard } from '../contexts/BoardContext';
import { BLACK, KING, WHITE } from 'chess.js';
import { Piece } from './Piece';
import { useMemo } from 'react';
import { Dot } from './Dot';

const boardNotationWhite = [
  ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
  ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
  ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
  ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
  ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
  ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
];

const boardNotationBlack = [
  ['h1', 'g1', 'f1', 'e1', 'd1', 'c1', 'b1', 'a1'],
  ['h2', 'g2', 'f2', 'e2', 'd2', 'c2', 'b2', 'a2'],
  ['h3', 'g3', 'f3', 'e3', 'd3', 'c3', 'b3', 'a3'],
  ['h4', 'g4', 'f4', 'e4', 'd4', 'c4', 'b4', 'a4'],
  ['h5', 'g5', 'f5', 'e5', 'd5', 'c5', 'b5', 'a5'],
  ['h6', 'g6', 'f6', 'e6', 'd6', 'c6', 'b6', 'a6'],
  ['h7', 'g7', 'f7', 'e7', 'd7', 'c7', 'b7', 'a7'],
  ['h8', 'g8', 'f8', 'e8', 'd8', 'c8', 'b8', 'a8'],
];

export function Board() {
  const {
    board,
    inCheck,
    turn,
    selectedPiece,
    setSelectedPiece,
    promotionWaitingMove,
    setPromotionWaitingMove,
    selectedTimeControl,
    isTimeout,
    getMoves,
    makeMove,
    playerColor,
  } = useBoard();

  const boardNotation = playerColor === WHITE ? boardNotationWhite : boardNotationBlack;
  const boardMap =
    playerColor === WHITE
      ? board
      : board
          .slice()
          .reverse()
          .map((row) => row.slice().reverse());

  const possibleMoves = useMemo(() => {
    return selectedPiece ? getMoves(selectedPiece.square) : [];
  }, [getMoves, selectedPiece]);

  return (
    <div
      className={styles.board}
      inert={
        promotionWaitingMove !== undefined || selectedTimeControl === undefined || isTimeout || turn !== playerColor
      }
    >
      {boardMap.map((row, columnIndex) =>
        row.map((piece, rowIndex) => {
          const matchingMove = possibleMoves.find((move) => move.to === boardNotation[columnIndex][rowIndex]);

          return (
            <Square
              key={rowIndex}
              isCheck={inCheck && piece?.type === KING && piece.color === turn}
              squareColor={(rowIndex + (columnIndex % 2)) % 2 === 0 ? WHITE : BLACK}
            >
              {piece && <Piece piece={piece} onSelectedPiece={() => setSelectedPiece(piece)} />}
              {matchingMove && (
                <Dot
                  isCapture={matchingMove !== undefined && matchingMove.isCapture()}
                  onMove={() => {
                    if (matchingMove.isPromotion()) {
                      setPromotionWaitingMove(matchingMove);
                    } else {
                      makeMove(matchingMove);
                      setSelectedPiece(undefined);
                    }
                  }}
                />
              )}
            </Square>
          );
        }),
      )}
    </div>
  );
}
