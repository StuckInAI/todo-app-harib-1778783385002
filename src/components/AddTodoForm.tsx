import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Priority } from '@/types';
import styles from './AddTodoForm.module.css';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="Add a new task…"
        aria-label="New todo text"
      />
      <select
        className={styles.select}
        value={priority}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPriority(e.target.value as Priority)
        }
        aria-label="Priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className={styles.button} type="submit" disabled={!text.trim()}>
        <PlusCircle size={18} />
        <span>Add</span>
      </button>
    </form>
  );
}
