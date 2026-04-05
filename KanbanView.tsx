// components/KanbanView.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Todo } from '../lib/supabase';
import { useTodoMutations } from '../lib/supabase';
import TodoCard from './TodoCard';

interface KanbanViewProps {
  todos: Todo[];
}

const KanbanView: React.FC<KanbanViewProps> = ({ todos }) => {
  const { updateTodo } = useTodoMutations();
  const [draggedTodo, setDraggedTodo] = React.useState<Todo | null>(null);

  const columns: { status: Todo['status']; title: string; color: string }[] = [
    { status: 'todo', title: 'To Do', color: 'bg-gray-50' },
    { status: 'in_progress', title: 'In Progress', color: 'bg-blue-50' },
    { status: 'blocked', title: 'Blocked', color: 'bg-red-50' },
    { status: 'done', title: 'Done', color: 'bg-green-50' },
  ];

  const handleDragStart = (todo: Todo) => {
    setDraggedTodo(todo);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: Todo['status']) => {
    if (draggedTodo && draggedTodo.status !== status) {
      await updateTodo(draggedTodo.id, { status });
      setDraggedTodo(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <motion.div
          key={column.status}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: columns.indexOf(column) * 0.1 }}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.status)}
          className={`${column.color} rounded-lg p-4 min-h-[500px] border-2 border-dashed border-transparent hover:border-gray-300 transition-colors`}
        >
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">{column.title}</h3>
            <p className="text-sm text-gray-500">
              {todos.filter((t) => t.status === column.status).length} items
            </p>
          </div>

          <div className="space-y-3">
            {todos
              .filter((todo) => todo.status === column.status)
              .sort((a, b) => {
                const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((todo) => (
                <div
                  key={todo.id}
                  draggable
                  onDragStart={() => handleDragStart(todo)}
                  className="cursor-move"
                >
                  <TodoCard todo={todo} />
                </div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KanbanView;
