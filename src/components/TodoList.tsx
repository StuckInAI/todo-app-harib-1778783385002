import { useState, useRef } from 'react';
import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import styles from './TodoList.module.css';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onReorder: (sourceId: string, targetId: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }: TodoListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragSourceId = useRef<string | null>(null);

  function handleDelete(id: string) {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 250);
  }

  function handleDragStart(id: string) {
    dragSourceId.current = id;
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    if (dragSourceId.current !== id) {
      setDragOverId(id);
    }
  }

  function handleDrop(e: React.DragEvent, targetId: string) {
    e.preventDefault();
    if (dragSourceId.current && dragSourceId.current !== targetId) {
      onReorder(dragSourceId.current, targetId);
    }
    dragSourceId.current = null;
    setDragOverId(null);
  }

  function handleDragEnd() {
    dragSourceId.current = null;
    setDragOverId(null);
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          isDeleting={deletingId === todo.id}
          isDragOver={dragOverId === todo.id}
          onToggle={onToggle}
          onDelete={handleDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      ))}
    </ul>
  );
}
