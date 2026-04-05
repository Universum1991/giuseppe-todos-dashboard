// components/TodoCard.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Todo } from '../lib/supabase';
import { useUIStore } from '../lib/store';

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const setActiveModal = useUIStore((state) => state.setActiveModal);
  const setSelectedTodoId = useUIStore((state) => state.setSelectedTodoId);

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'border-l-4 border-gray-400',
    in_progress: 'border-l-4 border-blue-400',
    blocked: 'border-l-4 border-red-400',
    done: 'border-l-4 border-green-400',
  };

  const handleEdit = () => {
    setSelectedTodoId(todo.id);
    setActiveModal('edit');
  };

  return (
    <div
      onClick={handleEdit}
      className={`${statusColors[todo.status]} bg-white rounded-lg shadow-sm hover:shadow-md p-3 cursor-pointer transition-all hover:scale-105`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
            {todo.title}
          </h4>
          {todo.description && (
            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
              {todo.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className={`text-xs px-2 py-1 rounded font-semibold ${priorityColors[todo.priority]}`}>
          {todo.priority}
        </span>

        {todo.due_date && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {formatDistanceToNow(new Date(todo.due_date), { addSuffix: true })}
          </span>
        )}

        {todo.assigned_agent && (
          <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded">
            @{todo.assigned_agent}
          </span>
        )}
      </div>

      {todo.tags && todo.tags.length > 0 && (
        <div className="flex gap-1 mt-2 flex-wrap">
          {todo.tags.map((tag, idx) => (
            <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-400 mt-2">
        {formatDistanceToNow(new Date(todo.updated_at))}
      </div>
    </div>
  );
};

export default TodoCard;
