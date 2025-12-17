import { useState } from 'react';
import { useBoard } from '../contexts/BoardContext';
import styles from './TimeLimitSelectionBox.module.css';

export function TimeLimitSelectionBox() {
  const { setSelectedTime } = useBoard();
  const [toggleCustomTimeSelector, setToggleCustomTimeSelector] = useState(false);

  return (
    <>
      <div className={styles.box}>
        <p className={styles.infoText}>Select Time Limit</p>
        <div className={styles.timeSelectionBox}>
          <button onClick={() => setSelectedTime(60)} type="button" className={styles.timeSelectionBtn}>
            <p>1+0</p>
            <p>Bullet</p>
          </button>
          <button onClick={() => setSelectedTime(180)} type="button" className={styles.timeSelectionBtn}>
            <p>3+0</p>
            <p>Blitz</p>
          </button>
          <button onClick={() => setSelectedTime(300)} type="button" className={styles.timeSelectionBtn}>
            <p>5+0</p>
            <p>Blitz</p>
          </button>
          <button onClick={() => setSelectedTime(600)} type="button" className={styles.timeSelectionBtn}>
            <p>10+0</p>
            <p>Rapid</p>
          </button>
          <button onClick={() => setSelectedTime(1800)} type="button" className={styles.timeSelectionBtn}>
            <p>30+0</p>
            <p>Classical</p>
          </button>
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
                setSelectedTime(Number(formData.get('minutes')) * 60);
              }}
              className={styles.customTimeBox}
            >
              <input
                className={styles.input}
                name="minutes"
                type="number"
                min={0.1}
                placeholder="Enter as minutes"
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
