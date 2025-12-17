import { useEffect, useRef, useState } from 'react';
import styles from './Clock.module.css';
import { useBoard } from './BoardContext';

export function Clock({ timeLimit, color }: { timeLimit: number; color: 'w' | 'b' }) {
  const { turn, setIsTimeout, isCheckmate } = useBoard();

  // for UI
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  // for logic
  const msLeftRef = useRef(timeLeft * 1000);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (turn !== color || timeLeft === 0 || isCheckmate) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }

    if (isPaused) {
      return;
    }

    const startTime = Date.now(); // 20:00 |> 20:10
    const msLeft = msLeftRef.current; // 30min |> 27min

    const intervalId = setInterval(() => {
      // e.g. 1min tick
      const timeSpent = Date.now() - startTime; // 1min -> 2min -> 3min |> 1min -> 2min
      setTimeLeft(Math.floor((msLeft - timeSpent) / 1000)); // for UI
      msLeftRef.current = msLeft - timeSpent; // 29min -> 28min -> 27min |> 26min -> 25min
    }, 0);

    return () => {
      // update remaining time one last time before clearing interval
      const timeSpent = Date.now() - startTime;
      msLeftRef.current = msLeft - timeSpent;
      clearInterval(intervalId);
    };
  }, [timeLimit, isPaused, turn, color, timeLeft]);

  if (timeLeft === 0) {
    setIsTimeout(true);
  }

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
      <p className={styles.timeSide}>{color === 'w' ? 'White' : 'Black'}</p>
      <p className={styles.timeText}>{time}</p>
    </div>
  );
}
