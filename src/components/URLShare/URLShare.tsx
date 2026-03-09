import { useState } from 'react';
import styles from './URLShare.module.css';
import { useBoard } from '../../contexts/BoardContext';
import clsx from 'clsx';

export function URLShare() {
  const { URLShare } = useBoard();
  const [copied, setCopied] = useState(false);

  if (!URLShare) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(URLShare);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.share_url_box}>
      <section className={styles.share_url_section}>
        <button onClick={handleCopy} className={clsx(styles.share_url_btn, { [styles.copied]: copied })}>
          Copy
        </button>
        <p className={styles.share_url_notifier}>Share link: </p>
        <p className={styles.url}>{URLShare}</p>
      </section>
    </div>
  );
}
