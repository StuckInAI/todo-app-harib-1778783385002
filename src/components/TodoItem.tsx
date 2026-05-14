import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSubmit(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        styles.item,
        todo.completed && styles.completed,
        styles[`priority-${todo.priority}`]
      )}
    >
      <button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      <div className={styles.content}>
        {editing ? (
          <input
            className={styles.editInput}
            value={editText}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className={styles.text}>{todo.text}</span>
        )}
        <span className={clsx(styles.badge, styles[`badge-${todo.priority}`])}>
          {todo.priority}
        </span>
      </div>

      <div className={styles.actions}>
        {!editing && (
          <button
            className={styles.actionBtn}
            onClick={() => setEditing(true)}
            aria-label="Edit todo"
          >
            <Pencil size={15} />
          </button>
        )}
        {editing && (
          <button
            className={clsx(styles.actionBtn, styles.cancelBtn)}
            onClick={() => {
              setEditText(todo.text);
              setEditing(false);
            }}
            aria-label="Cancel edit"
          >
            <X size={15} />
          </button>
        )}
        <button
          className={clsx(styles.actionBtn, styles.deleteBtn)}
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
}
