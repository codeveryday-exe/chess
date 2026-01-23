import { useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import styles from './TimeLimitSelectionBox.module.css';

export function TimeLimitSelectionBox() {
  const { setSelectedTimeControl } = useBoard();
  const [toggleCustomTimeSelector, setToggleCustomTimeSelector] = useState(false);

  const timeControlPresets = [
    { time: 60, increment: 0 },
    { time: 120, increment: 1 },
    { time: 180, increment: 0 },
    { time: 180, increment: 2 },
    { time: 300, increment: 0 },
    { time: 300, increment: 3 },
    { time: 600, increment: 0 },
    { time: 600, increment: 5 },
    { time: 900, increment: 10 },
    { time: 1800, increment: 0 },
    { time: 1800, increment: 20 },
  ];

  return (
    <>
      <div className={styles.box}>
        <p className={styles.infoText}>Select Time Limit</p>
        <div className={styles.timeSelectionBox}>
          {timeControlPresets.map((preset, index) => {
            const minute = preset.time / 60;
            return (
              <button
                onClick={() => setSelectedTimeControl(preset)}
                key={index}
                type="button"
                className={styles.timeSelectionBtn}
              >
                <p>
                  {minute}+{preset.increment}
                </p>
                <p>{minute < 3 ? 'Bullet' : minute < 10 ? 'Blitz' : minute < 30 ? 'Rapid' : 'Classical'}</p>
              </button>
            );
          })}
          <button
            onClick={() => setToggleCustomTimeSelector((value) => !value)}
            type="button"
            className={styles.timeSelectionBtn}
          >
            <p>Custom</p>
          </button>
          {toggleCustomTimeSelector && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);
                setSelectedTimeControl({
                  time: Number(formData.get('minutes')) * 60,
                  increment: Number(formData.get('increment')),
                });
              }}
              className={styles.customTimeBox}
            >
              <input
                className={styles.input}
                name="minutes"
                type="number"
                min={0.1}
                step={0.01}
                placeholder="Minutes per side"
                required
              />
              <input
                className={styles.input}
                name="increment"
                type="number"
                min={0}
                step={1}
                placeholder="Increment in seconds"
                required
              />
              <button className={styles.customTimeBtn} type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
