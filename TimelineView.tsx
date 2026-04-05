// components/TimelineView.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow, startOfDay, isToday, isTomorrow, isThisWeek } from 'date-fns';
import type { Todo } from '../lib/supabase';
import TodoCard from './TodoCard';

interface TimelineViewProps {
  todos: Todo[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ todos }) => {
  const groupedTodos = {
    overdue: todos.filter(
      (t) => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'done'
    ),
    today: todos.filter((t) => t.due_date && isToday(new Date(t.due_date))),
    tomorrow: todos.filter((t) => t.due_date && isTomorrow(new Date(t.due_date))),
    thisWeek: todos.filter((t) => t.due_date && isThisWeek(new Date(t.due_date))),
    later: todos.filter((t) => t.due_date && !isThisWeek(new Date(t.due_date))),
    noDueDate: todos.filter((t) => !t.due_date),
  };

  const sections = [
    { key: 'overdue', label: '⚠️ Overdue', color: 'border-red-500 bg-red-50' },
    { key: 'today', label: '📌 Today', color: 'border-blue-500 bg-blue-50' },
    { key: 'tomorrow', label: '📅 Tomorrow', color: 'border-purple-500 bg-purple-50' },
    { key: 'thisWeek', label: '📆 This Week', color: 'border-green-500 bg-green-50' },
    { key: 'later', label: '🗓️ Later', color: 'border-gray-500 bg-gray-50' },
    { key: 'noDueDate', label: '📝 No Due Date', color: 'border-slate-500 bg-slate-50' },
  ] as const;

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => {
        const items = groupedTodos[section.key as keyof typeof groupedTodos];

        if (items.length === 0) return null;

        return (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className={`border-l-4 ${section.color} rounded-lg p-4`}
          >
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              {section.label}
              <span className="text-sm font-normal text-gray-500">({items.length})</span>
            </h3>

            <div className="space-y-3">
              {items
                .sort((a, b) => {
                  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TimelineView;
