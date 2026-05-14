import clsx from 'clsx';
import type { FilterType } from '@/types';
import styles from './FilterBar.module.css';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.stats}>
        <span className={styles.stat}>
          <span className={styles.statNum}>{activeCount}</span> remaining
        </span>
      </div>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={clsx(styles.filterBtn, filter === f.value && styles.active)}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
