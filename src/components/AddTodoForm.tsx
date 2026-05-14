import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';
import styles from './AddTodoForm.module.css';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  high: { label: '🔴 High', color: styles.priorityHigh },
  medium: { label: '🟡 Medium', color: styles.priorityMedium },
  low: { label: '🟢 Low', color: styles.priorityLow },
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      className={clsx(styles.form, focused && styles.formFocused)}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <Plus size={18} className={styles.inputIcon} />
          <input
            className={styles.input}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Add a new task…"
            aria-label="New todo text"
          />
        </div>
        <div className={clsx(styles.selectWrapper, styles[`select-${priority}`])}>
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            aria-label="Priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <ChevronDown size={14} className={styles.selectArrow} />
        </div>
      </div>
      <button className={styles.button} type="submit" disabled={!text.trim()}>
        <Plus size={18} strokeWidth={2.5} />
        <span>Add Task</span>
      </button>
    </form>
  );
}
