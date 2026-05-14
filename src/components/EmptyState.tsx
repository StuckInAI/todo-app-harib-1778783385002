import { Sparkles, CheckCircle2, ClipboardList } from 'lucide-react';
import type { FilterType } from '@/types';
import styles from './EmptyState.module.css';

type EmptyStateProps = {
  filter: FilterType;
};

const MESSAGES: Record<FilterType, { title: string; sub: string; Icon: React.ElementType }> = {
  all: {
    title: 'Your board is empty',
    sub: 'Add your first task above and start crushing your goals.',
    Icon: ClipboardList,
  },
  active: {
    title: 'All tasks complete!',
    sub: "You're on fire \uD83D\uDD25 \u2014 no active tasks remaining.",
    Icon: Sparkles,
  },
  completed: {
    title: 'Nothing completed yet',
    sub: 'Finish some tasks and they will appear here.',
    Icon: CheckCircle2,
  },
};

export default function EmptyState({ filter }: EmptyStateProps) {
  const { title, sub, Icon } = MESSAGES[filter];
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconRing}>
        <Icon size={30} strokeWidth={1.5} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.sub}>{sub}</p>
    </div>
  );
}
