import { BLACK, Chess, Move, WHITE, type Color, type Square } from 'chess.js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { BoardPiece } from '../types';
import { useSound } from '../components/hooks/useSound';
import moveSrc from '../assets/move.mp3';
import captureSrc from '../assets/capture.mp3';
import gameOverSrc from '../assets/gameOver.mp3';
import { useSetClock } from './ClockContext';
import Peer, { type DataConnection } from 'peerjs';

export type TimeControl = { time: number; increment: number };

type StartGameMessage = {
  type: 'start_game';
  timeControl: TimeControl;
};

type MakeMoveMessage = {
  type: 'make_move';
  move: Move;
};

type AnyMessage = StartGameMessage | MakeMoveMessage;

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
  playerColor: Color;
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
  const [playerColor, setPlayerColor] = useState<Color>(WHITE);

  const [moveSound] = useSound(moveSrc);
  const [captureSound] = useSound(captureSrc);
  const [gameOverSound] = useSound(gameOverSrc);

  function setSelectedTimeControl(newTimeControl: TimeControl | undefined, isMessage = false) {
    _setSelectedTimeControl(newTimeControl);
    if (newTimeControl) {
      setWhiteTimeLeft(newTimeControl.time);
      setBlackTimeLeft(newTimeControl.time);
      whiteMsLeftRef.current = newTimeControl.time * 1000;
      blackMsLeftRef.current = newTimeControl.time * 1000;

      if (!isMessage) {
        sendMessage({ type: 'start_game', timeControl: newTimeControl });
        setPlayerColor(WHITE);
      }
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

  function sendMessage(message: AnyMessage) {
    console.log('sent: ', message);

    connectionRef.current?.send(message);
  }

  function makeMove(move: Move, isMessage = false) {
    if (move.isCapture()) {
      captureSound();
    } else {
      moveSound();
    }
    chess.move(move);

    // if my move, send message
    if (!isMessage) {
      sendMessage({ type: 'make_move', move });
    }

    if (chess.isGameOver()) {
      gameOverSound();
    }
    syncState();
    console.log({ selectedTimeControl });

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

  const peerRef = useRef<Peer>(null);
  const connectionRef = useRef<DataConnection>(null);

  // eslint-disable-next-line react-hooks/immutability
  const onData = useEffectEvent((data: unknown) => {
    const message = data as AnyMessage;

    console.log(message);

    if (message.type === 'start_game') {
      setSelectedTimeControl(message.timeControl, true);
      setPlayerColor(BLACK);
    }

    if (message.type === 'make_move') {
      const opponentMove = chess.moves({ verbose: true }).find((m) => {
        return (
          m.from === message.move.from &&
          m.to === message.move.to &&
          (!m.promotion || m.promotion === message.move.promotion)
        );
      });

      if (!opponentMove) {
        throw new Error('Something went wrong here...');
      }
      makeMove(opponentMove, true);
    }
  });

  const onOpen = useEffectEvent((id: string) => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('opponent')) {
      // joining game
      connectionRef.current = peerRef.current!.connect(params.get('opponent')!);
      connectionRef.current.on('data', onData);
    } else {
      // creating game
      params.append('opponent', id);
      console.log(`${window.location.origin}?${params}`);
      peerRef.current!.on('connection', (conn) => {
        connectionRef.current = conn;
        connectionRef.current.on('data', onData);
      });
    }
  });

  useEffect(() => {
    peerRef.current = new Peer();
    peerRef.current.on('open', onOpen);

    return () => {
      peerRef.current?.disconnect();
      peerRef.current?.destroy();
    };
  }, []);

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
        playerColor,
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
