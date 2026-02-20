import { FilterType } from '../../types';
import styles from './TodoFilter.module.css';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

export function TodoFilter({
  filter,
  onFilterChange,
  activeCount,
  hasCompleted,
  onClearCompleted,
}: TodoFilterProps) {
  return (
    <div className={styles.footer}>
      <span className={styles.count}>
        残り <strong>{activeCount}</strong> 件
      </span>
      <div className={styles.tabs} role="tablist" aria-label="フィルター">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.tab} ${filter === value ? styles.active : ''}`}
            onClick={() => onFilterChange(value)}
            role="tab"
            aria-selected={filter === value}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        className={`${styles.clearButton} ${!hasCompleted ? styles.hidden : ''}`}
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        完了を削除
      </button>
    </div>
  );
}
