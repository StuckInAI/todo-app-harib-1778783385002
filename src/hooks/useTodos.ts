import { useState, useEffect, useCallback } from 'react';
import type { Todo, FilterType, Priority } from '@/types';

const STORAGE_KEY = 'todos-app-data';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch {
    // ignore
  }
  return [];
}

function saveToStorage(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // ignore
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority): void {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, newText: string): void {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t))
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const reorderTodos = useCallback((sourceId: string, targetId: string) => {
    setTodos((prev) => {
      const allTodos = [...prev];
      const sourceIdx = allTodos.findIndex((t) => t.id === sourceId);
      const targetIdx = allTodos.findIndex((t) => t.id === targetId);
      if (sourceIdx === -1 || targetIdx === -1 || sourceIdx === targetIdx) return prev;
      const [removed] = allTodos.splice(sourceIdx, 1);
      allTodos.splice(targetIdx, 0, removed);
      return allTodos;
    });
  }, []);

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodos,
    activeCount,
    completedCount,
  };
}
