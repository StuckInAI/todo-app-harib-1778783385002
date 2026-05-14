import { Sparkles } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.iconWrapper}>
          <Sparkles size={22} strokeWidth={1.8} />
        </div>
        <div>
          <p className={styles.greeting}>{greeting}</p>
          <h1 className={styles.title}>Task Board</h1>
        </div>
      </div>
      <div className={styles.dateChip}>
        <span className={styles.dateText}>{dateStr}</span>
      </div>
    </header>
  );
}
