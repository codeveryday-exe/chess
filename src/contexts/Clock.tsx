import { useEffect, useRef, useState } from 'react';

export function Clock({ timeLimit }: { timeLimit: number }) {
  // for UI
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  // for logic
  const msLeftRef = useRef(timeLeft * 1000);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const startTime = new Date().getTime();
    const msLeft = msLeftRef.current;

    const intervalId = setInterval(() => {
      const timeSpent = new Date().getTime() - startTime;
      setTimeLeft(Math.floor((msLeft - timeSpent) / 1000));
      msLeftRef.current = msLeft - timeSpent;
    }, 0);

    return () => {
      const timeSpent = new Date().getTime() - startTime;
      msLeftRef.current = msLeft - timeSpent;
      clearInterval(intervalId);
    };
  }, [timeLimit, isPaused]);

  return (
    <div>
      <div>
        <p>{timeLeft}</p>
        <button onClick={() => setIsPaused((pause) => !pause)}>{isPaused ? 'resume' : 'pause'}</button>
      </div>
    </div>
  );
}

// format pretty clock in UI e.g. 05:00
// time should tick on turn
// end game when clock runs out
// commit each task when finished
