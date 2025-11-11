import { Chess, type Color, type PieceSymbol, type Square } from 'chess.js';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface Piece {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

interface BoardContextValues {
  board: (Piece | null)[][];
  makeMove: (...args: Parameters<(typeof Chess)['prototype']['move']>) => void;
  moves: (typeof Chess)['prototype']['moves'];
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

  function makeMove(...args: Parameters<typeof chess.move>) {
    chess.move(...args);
    setBoard(chess.board());
  }

  return <BoardContext value={{ board, makeMove, moves: chess.moves }}>{children}</BoardContext>;
}
