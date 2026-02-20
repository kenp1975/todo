import { useMemo } from 'react';
import { Todo, FilterType } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoInput } from './components/TodoInput/TodoInput';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import styles from './App.module.css';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage<FilterType>('filter', 'all');

  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const hasCompleted = useMemo(() => todos.some((t) => t.completed), [todos]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>TODOリスト</h1>
        </header>
        <TodoInput onAdd={handleAdd} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          hasCompleted={hasCompleted}
          onClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  );
}

export default App;
