// components/Header.tsx
import React from 'react';
import { useRealtimeTodos } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';

const Header: React.FC = () => {
  const { todos } = useRealtimeTodos();
  
  const stats = {
    total: todos.length,
    inProgress: todos.filter((t) => t.status === 'in_progress').length,
    blocked: todos.filter((t) => t.status === 'blocked').length,
    completed: todos.filter((t) => t.status === 'done').length,
    critical: todos.filter((t) => t.priority === 'critical').length,
  };

  const lastUpdated = todos.length > 0 
    ? formatDistanceToNow(new Date(Math.max(...todos.map((t) => new Date(t.updated_at).getTime()))))
    : 'never';

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Giuseppe's Dashboard</h1>
            <p className="text-blue-100 text-sm mt-1">
              Real-time task management + Personality-driven AI
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-blue-100 text-xs">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">{stats.critical}</div>
              <div className="text-blue-100 text-xs">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">{stats.blocked}</div>
              <div className="text-blue-100 text-xs">Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{stats.completed}</div>
              <div className="text-blue-100 text-xs">Done</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-blue-100 border-t border-blue-500 pt-3">
          Last updated: {lastUpdated} ago • System running • Realtime enabled ✓
        </div>
      </div>
    </header>
  );
};

export default Header;
