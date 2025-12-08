import { Chess, Move, type Square } from 'chess.js';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { BoardPiece } from '../types';

interface BoardContextValues {
  board: (BoardPiece | null)[][];
  makeMove: (...args: Parameters<(typeof Chess)['prototype']['move']>) => void;
  getMoves: (square: Square) => Move[];
  inCheck: boolean;
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

  function makeMove(...args: Parameters<typeof chess.move>) {
    chess.move(...args);
    setBoard(chess.board());
    setInCheck(chess.inCheck());
  }

  const getMoves = useCallback(
    (square: Square) => {
      return chess.moves({ square, verbose: true });
    },
    [chess],
  );

  return <BoardContext value={{ board, inCheck, makeMove, getMoves }}>{children}</BoardContext>;
}
