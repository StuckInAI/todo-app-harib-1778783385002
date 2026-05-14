import { CheckSquare } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.iconWrapper}>
        <CheckSquare size={32} strokeWidth={2} />
      </div>
      <div>
        <h1 className={styles.title}>My Todo List</h1>
        <p className={styles.subtitle}>Stay organized, stay productive</p>
      </div>
    </header>
  );
}
