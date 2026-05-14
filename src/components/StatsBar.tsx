import { CheckCircle2, Circle, LayoutList } from 'lucide-react';
import styles from './StatsBar.module.css';

type StatsBarProps = {
  total: number;
  active: number;
  completed: number;
};

export default function StatsBar({ total, active, completed }: StatsBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon} data-type="total">
            <LayoutList size={16} />
          </div>
          <div>
            <p className={styles.cardNum}>{total}</p>
            <p className={styles.cardLabel}>Total</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon} data-type="active">
            <Circle size={16} />
          </div>
          <div>
            <p className={styles.cardNum}>{active}</p>
            <p className={styles.cardLabel}>Active</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon} data-type="done">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className={styles.cardNum}>{completed}</p>
            <p className={styles.cardLabel}>Done</p>
          </div>
        </div>
      </div>
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Overall progress</span>
          <span className={styles.progressPct}>{pct}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
