// components/ListView.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Todo } from '../lib/supabase';
import TodoCard from './TodoCard';

interface ListViewProps {
  todos: Todo[];
}

const ListView: React.FC<ListViewProps> = ({ todos }) => {
  const sorted = [...todos].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <motion.div className="space-y-3">
      {sorted.map((todo, index) => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <TodoCard todo={todo} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ListView;
