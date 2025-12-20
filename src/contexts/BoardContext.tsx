import { Chess, Move, WHITE, type Color, type Square } from 'chess.js';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { BoardPiece } from '../types';
import { useSound } from '../components/hooks/useSound';
import moveSrc from '../assets/move.mp3';
import captureSrc from '../assets/capture.mp3';
import gameOverSrc from '../assets/gameOver.mp3';
import { useSetClock } from './ClockContext';

type TimeControl = { time: number; increment: number };

interface BoardContextValues {
  board: (BoardPiece | null)[][];
  makeMove: (move: Move) => void;
  getMoves: (square: Square) => Move[];
  inCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  isStalemate: boolean;
  isTimeout: boolean;
  finishGameByTimeout: () => void;
  turn: Color;
  reset: () => void;
  promotionWaitingMove: Move | undefined;
  setPromotionWaitingMove: (move: Move | undefined) => void;
  selectedPiece: BoardPiece | undefined;
  setSelectedPiece: (piece: BoardPiece | undefined) => void;
  selectedTimeControl: TimeControl | undefined;
  setSelectedTimeControl: (newTimeControl: TimeControl | undefined) => void;
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
  const [isTimeout, setIsTimeout] = useState(false);
  const [turn, setTurn] = useState(() => chess.turn());
  const [promotionWaitingMove, setPromotionWaitingMove] = useState<Move>();
  const [selectedPiece, setSelectedPiece] = useState<BoardPiece>();
  const [selectedTimeControl, _setSelectedTimeControl] = useState<TimeControl>();

  const [moveSound] = useSound(moveSrc);
  const [captureSound] = useSound(captureSrc);
  const [gameOverSound] = useSound(gameOverSrc);

  function setSelectedTimeControl(newTimeControl: TimeControl | undefined) {
    _setSelectedTimeControl(newTimeControl);
    if (newTimeControl) {
      setWhiteTimeLeft(newTimeControl.time);
      setBlackTimeLeft(newTimeControl.time);
      whiteMsLeftRef.current = newTimeControl.time * 1000;
      blackMsLeftRef.current = newTimeControl.time * 1000;
    }
  }

  const { setWhiteTimeLeft, setBlackTimeLeft, whiteMsLeftRef, blackMsLeftRef } = useSetClock();

  function syncState() {
    setBoard(chess.board());
    setInCheck(chess.inCheck());
    setIsDraw(chess.isDraw());
    setIsStalemate(chess.isStalemate());
    setIsCheckmate(chess.isCheckmate());
    setIsTimeout(false);
    setTurn(chess.turn());
  }

  function reset() {
    chess.reset();
    syncState();
    setSelectedTimeControl(undefined);
    setSelectedPiece(undefined);
    setPromotionWaitingMove(undefined);
  }

  function makeMove(move: Move) {
    if (move.isCapture()) {
      captureSound();
    } else {
      moveSound();
    }
    chess.move(move);
    if (chess.isGameOver()) {
      gameOverSound();
    }
    syncState();
    if (turn === WHITE) {
      whiteMsLeftRef.current += selectedTimeControl!.increment * 1000;
      setWhiteTimeLeft(Math.ceil(whiteMsLeftRef.current / 1000));
    } else {
      blackMsLeftRef.current += selectedTimeControl!.increment * 1000;
      setBlackTimeLeft(Math.ceil(blackMsLeftRef.current / 1000));
    }
  }

  const finishGameByTimeout = useCallback(() => {
    setIsTimeout(true);
    setSelectedPiece(undefined);
    gameOverSound();
  }, [gameOverSound]);

  const getMoves = useCallback(
    (square: Square) => {
      return chess.moves({ square, verbose: true });
    },
    [chess],
  );

  return (
    <BoardContext
      value={{
        board,
        inCheck,
        isCheckmate,
        isDraw,
        isStalemate,
        isTimeout,
        finishGameByTimeout,
        promotionWaitingMove,
        setPromotionWaitingMove,
        selectedPiece,
        setSelectedPiece,
        selectedTimeControl,
        setSelectedTimeControl,
        turn,
        reset,
        makeMove,
        getMoves,
      }}
    >
      {children}
    </BoardContext>
  );
}
