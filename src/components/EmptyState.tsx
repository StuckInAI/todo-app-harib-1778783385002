import { ClipboardList } from 'lucide-react';
import type { FilterType } from '@/types';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  filter: FilterType;
};

const MESSAGES: Record<FilterType, { title: string; sub: string }> = {
  all: { title: 'No tasks yet', sub: 'Add your first task above to get started!' },
  active: { title: 'All done!', sub: 'No active tasks — great job!' },
  completed: { title: 'Nothing completed yet', sub: 'Finish some tasks and they will appear here.' },
};

export default function EmptyState({ filter }: EmptyStateProps) {
  const msg = MESSAGES[filter];
  return (
    <div className={styles.wrapper}>
      <ClipboardList size={48} strokeWidth={1.5} className={styles.icon} />
      <h2 className={styles.title}>{msg.title}</h2>
      <p className={styles.sub}>{msg.sub}</p>
    </div>
  );
}
