import clsx from 'clsx';
import { ListFilter, Trash2 } from 'lucide-react';
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
      <div className={styles.left}>
        <ListFilter size={14} className={styles.filterIcon} />
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={clsx(styles.filterBtn, filter === f.value && styles.active)}
              onClick={() => onFilterChange(f.value)}
            >
              {f.label}
              {f.value === 'active' && activeCount > 0 && (
                <span className={styles.badge}>{activeCount}</span>
              )}
              {f.value === 'completed' && completedCount > 0 && (
                <span className={clsx(styles.badge, styles.badgeDone)}>{completedCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          <Trash2 size={13} />
          <span>Clear done</span>
        </button>
      )}
    </div>
  );
}
