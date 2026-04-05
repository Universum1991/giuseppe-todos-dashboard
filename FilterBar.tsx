// components/FilterBar.tsx
import React from 'react';
import { useUIStore } from '../lib/store';
import type { Todo } from '../lib/supabase';

const FilterBar: React.FC = () => {
  const {
    filterStatus,
    filterPriority,
    searchTerm,
    setFilterStatus,
    setFilterPriority,
    setSearchTerm,
  } = useUIStore();

  const statusOptions: Todo['status'][] = ['todo', 'in_progress', 'blocked', 'done'];
  const priorityOptions: Todo['priority'][] = ['low', 'medium', 'high', 'critical'];

  const toggleStatus = (status: Todo['status']) => {
    setFilterStatus(
      filterStatus.includes(status)
        ? filterStatus.filter((s) => s !== status)
        : [...filterStatus, status]
    );
  };

  const togglePriority = (priority: Todo['priority']) => {
    setFilterPriority(
      filterPriority.includes(priority)
        ? filterPriority.filter((p) => p !== priority)
        : [...filterPriority, priority]
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex-1 max-w-md">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Status Filter */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase">Status</label>
        <div className="flex gap-2 flex-wrap mt-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`text-xs px-3 py-1 rounded transition-all ${
                filterStatus.includes(status)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="text-xs font-semibold text-gray-600 uppercase">Priority</label>
        <div className="flex gap-2 flex-wrap mt-2">
          {priorityOptions.map((priority) => (
            <button
              key={priority}
              onClick={() => togglePriority(priority)}
              className={`text-xs px-3 py-1 rounded transition-all ${
                filterPriority.includes(priority)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filterStatus.length > 0 || filterPriority.length > 0 || searchTerm) && (
        <button
          onClick={() => {
            setFilterStatus([]);
            setFilterPriority([]);
            setSearchTerm('');
          }}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
