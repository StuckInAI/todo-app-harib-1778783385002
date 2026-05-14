import { useState } from 'react';
import { Trash2, Pencil, Check, X, GripVertical } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  index: number;
  isDeleting: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const PRIORITY_LABELS: Record<string, string> = {
  high: '🔴',
  medium: '🟡',
  low: '🟢',
};

export default function TodoItem({
  todo,
  index,
  isDeleting,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [hovered, setHovered] = useState(false);

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

  const timeAgo = (() => {
    const diff = Date.now() - todo.createdAt;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  })();

  return (
    <li
      className={clsx(
        styles.item,
        todo.completed && styles.completed,
        styles[`priority-${todo.priority}`],
        isDeleting && styles.deleting
      )}
      style={{ animationDelay: `${index * 40}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.grip}>
        <GripVertical size={14} />
      </div>

      <button
        className={clsx(styles.checkbox, todo.completed && styles.checkboxDone)}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        <span className={styles.checkboxInner}>
          {todo.completed && <Check size={11} strokeWidth={3.5} />}
        </span>
      </button>

      <div className={styles.content}>
        {editing ? (
          <input
            className={styles.editInput}
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className={styles.textBlock}>
            <span className={styles.text}>{todo.text}</span>
            <span className={styles.meta}>
              <span className={styles.priorityDot}>{PRIORITY_LABELS[todo.priority]}</span>
              <span className={clsx(styles.priorityLabel, styles[`label-${todo.priority}`])}>
                {todo.priority}
              </span>
              <span className={styles.dot}>·</span>
              <span className={styles.timeAgo}>{timeAgo}</span>
            </span>
          </div>
        )}
      </div>

      <div className={clsx(styles.actions, hovered && styles.actionsVisible)}>
        {!editing ? (
          <button
            className={styles.actionBtn}
            onClick={() => setEditing(true)}
            aria-label="Edit todo"
            title="Edit"
          >
            <Pencil size={13} />
          </button>
        ) : (
          <button
            className={clsx(styles.actionBtn, styles.cancelBtn)}
            onClick={() => {
              setEditText(todo.text);
              setEditing(false);
            }}
            aria-label="Cancel edit"
            title="Cancel"
          >
            <X size={13} />
          </button>
        )}
        <button
          className={clsx(styles.actionBtn, styles.deleteBtn)}
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </li>
  );
}
