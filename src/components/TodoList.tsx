import { useState } from 'react';
import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import styles from './TodoList.module.css';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 250);
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          isDeleting={deletingId === todo.id}
          onToggle={onToggle}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
