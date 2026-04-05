// components/EditTodoModal.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTodoMutations, useRealtimeTodos } from '../lib/supabase';
import { useUIStore } from '../lib/store';
import type { Todo } from '../lib/supabase';

const EditTodoModal: React.FC = () => {
  const { todos } = useRealtimeTodos();
  const { updateTodo, deleteTodo } = useTodoMutations();
  const { setActiveModal, selectedTodoId } = useUIStore();

  const [formData, setFormData] = useState<Partial<Todo>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todo = todos.find((t) => t.id === selectedTodoId);

  useEffect(() => {
    if (todo) {
      setFormData(todo);
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!selectedTodoId) return;
      if (!formData.title?.trim()) {
        setError('Title is required');
        return;
      }

      await updateTodo(selectedTodoId, formData);
      setActiveModal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTodoId) return;
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    setIsLoading(true);
    try {
      await deleteTodo(selectedTodoId);
      setActiveModal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  if (!todo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setActiveModal(null)}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-600">Todo not found</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveModal(null)}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Todo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority || 'medium'}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as Todo['priority'] })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status || 'todo'}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as Todo['status'] })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="datetime-local"
              value={formData.due_date?.substring(0, 16) || ''}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Agent
            </label>
            <input
              type="text"
              value={formData.assigned_agent || ''}
              onChange={(e) => setFormData({ ...formData, assigned_agent: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={(formData.tags as string[])?.join(', ') || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 font-medium transition-all disabled:opacity-50"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditTodoModal;
