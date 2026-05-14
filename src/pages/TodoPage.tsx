import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import EmptyState from '@/components/EmptyState';
import StatsBar from '@/components/StatsBar';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>
      <div className={styles.container}>
        <Header />
        <StatsBar
          total={allTodos.length}
          active={activeCount}
          completed={completedCount}
        />
        <AddTodoForm onAdd={addTodo} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
        {todos.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
      </div>
    </div>
  );
}
