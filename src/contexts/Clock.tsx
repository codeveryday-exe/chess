import { useEffect, useRef, useState } from 'react';
import styles from './Clock.module.css';
import { useBoard } from './BoardContext';
import { WHITE } from 'chess.js';
import clsx from 'clsx';

export function Clock({ timeLimit, color }: { timeLimit: number; color: 'w' | 'b' }) {
  const { turn, isTimeout, setIsTimeout, isCheckmate, isDraw, isStalemate } = useBoard();

  // for UI
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  // for logic
  const msLeftRef = useRef(timeLeft * 1000);
  const isPaused = turn !== color || isTimeout || isCheckmate || isDraw || isStalemate;

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const startTime = Date.now(); // 20:00 |> 20:10
    const msLeft = msLeftRef.current; // 30min |> 27min

    const intervalId = setInterval(() => {
      // e.g. 1min tick
      const timeSpent = Date.now() - startTime; // 1min -> 2min -> 3min |> 1min -> 2min
      setTimeLeft(Math.ceil((msLeft - timeSpent) / 1000)); // for UI
      msLeftRef.current = msLeft - timeSpent; // 29min -> 28min -> 27min |> 26min -> 25min
      if (msLeftRef.current <= 0) {
        setIsTimeout(true);
        clearInterval(intervalId);
      }
    }, 0);

    return () => {
      // update remaining time one last time before clearing interval
      const timeSpent = Date.now() - startTime;
      msLeftRef.current = msLeft - timeSpent;
      clearInterval(intervalId);
    };
  }, [isPaused, setIsTimeout]);

  let seconds = timeLeft;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const time =
    timeLimit >= 3600
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className={styles.timeBox}>
      <p className={styles.timeSide}>{color === WHITE ? 'White' : 'Black'}</p>
      <p
        className={clsx(styles.timeText, {
          [styles.paused]: isPaused,
          [styles.shortTime]: hours === 0 && minutes === 0 && seconds <= 10,
        })}
      >
        {time}
      </p>
    </div>
  );
}
