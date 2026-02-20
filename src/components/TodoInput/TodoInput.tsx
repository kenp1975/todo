import { useState, KeyboardEvent } from 'react';
import styles from './TodoInput.module.css';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="新しいタスクを入力..."
        maxLength={200}
      />
      <button
        className={styles.addButton}
        onClick={handleAdd}
        disabled={!text.trim()}
        aria-label="タスクを追加"
      >
        追加
      </button>
    </div>
  );
}
