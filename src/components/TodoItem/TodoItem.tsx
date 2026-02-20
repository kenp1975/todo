import { Todo } from '../../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`タスク完了: ${todo.text}`}
        />
        <span className={styles.customCheckbox} />
        <span className={styles.text}>{todo.text}</span>
      </label>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        aria-label={`削除: ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
}
