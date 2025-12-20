import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

interface ClockContextValues {
  whiteTimeLeft: number;
  blackTimeLeft: number;
}

interface SetClockContextValues {
  setWhiteTimeLeft: (time: number) => void;
  setBlackTimeLeft: (time: number) => void;
  whiteMsLeftRef: React.RefObject<number>;
  blackMsLeftRef: React.RefObject<number>;
}

const ClockContext = createContext<ClockContextValues | null>(null);
const SetClockContext = createContext<SetClockContextValues | null>(null);

export function useClock() {
  const value = useContext(ClockContext);

  if (!value) {
    throw new Error('useClock() must be used within ClockContextProvider');
  }

  return value;
}

export function useSetClock() {
  const value = useContext(SetClockContext);

  if (!value) {
    throw new Error('useSetClock() must be used within ClockContextProvider');
  }

  return value;
}

export function ClockContextProvider({ children }: { children: ReactNode }) {
  // move ref & state for each color (2 in total for each)
  const [whiteTimeLeft, setWhiteTimeLeft] = useState(Infinity);
  const [blackTimeLeft, setBlackTimeLeft] = useState(Infinity);

  const whiteMsLeftRef = useRef(Infinity);
  const blackMsLeftRef = useRef(Infinity);
  const setters = useMemo(() => {
    return { setWhiteTimeLeft, setBlackTimeLeft, whiteMsLeftRef, blackMsLeftRef };
  }, []);

  return (
    <ClockContext value={{ whiteTimeLeft, blackTimeLeft }}>
      <SetClockContext value={setters}>{children}</SetClockContext>
    </ClockContext>
  );
}
