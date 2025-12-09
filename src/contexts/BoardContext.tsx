import { Chess, Move, type Color, type Square } from 'chess.js';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { BoardPiece } from '../types';

interface BoardContextValues {
  board: (BoardPiece | null)[][];
  makeMove: (...args: Parameters<(typeof Chess)['prototype']['move']>) => void;
  getMoves: (square: Square) => Move[];
  inCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  isStalemate: boolean;
  turn: Color;
  reset: () => void;
}

const BoardContext = createContext<BoardContextValues | null>(null);

export function useBoard() {
  const value = useContext(BoardContext);

  if (!value) {
    throw new Error('useBoard() must be used within BoardContextProvider');
  }

  return value;
}

export function BoardContextProvider({ children }: { children: ReactNode }) {
  const chess = useMemo(() => {
    return new Chess();
  }, []);

  const [board, setBoard] = useState(() => chess.board());
  const [inCheck, setInCheck] = useState(() => chess.inCheck());
  const [isCheckmate, setIsCheckmate] = useState(() => chess.isCheckmate());
  const [isDraw, setIsDraw] = useState(() => chess.isDraw());
  const [isStalemate, setIsStalemate] = useState(() => chess.isStalemate());
  const [turn, setTurn] = useState(() => chess.turn());

  function syncState() {
    setBoard(chess.board());
    setInCheck(chess.inCheck());
    setIsDraw(chess.isDraw());
    setIsStalemate(chess.isStalemate());
    setIsCheckmate(chess.isCheckmate());
    setTurn(chess.turn());
  }

  function reset() {
    chess.reset();
    syncState();
  }

  function makeMove(...args: Parameters<typeof chess.move>) {
    chess.move(...args);
    syncState();
  }

  const getMoves = useCallback(
    (square: Square) => {
      return chess.moves({ square, verbose: true });
    },
    [chess],
  );

  return (
    <BoardContext value={{ board, inCheck, isCheckmate, isDraw, isStalemate, turn, reset, makeMove, getMoves }}>
      {children}
    </BoardContext>
  );
}
