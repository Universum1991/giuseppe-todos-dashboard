// pages/index.tsx
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { useRealtimeTodos } from '../lib/supabase';
import { useUIStore, useFilteredTodos } from '../lib/store';
import KanbanView from '../components/KanbanView';
import ListView from '../components/ListView';
import TimelineView from '../components/TimelineView';
import FilterBar from '../components/FilterBar';
import CreateTodoModal from '../components/CreateTodoModal';
import EditTodoModal from '../components/EditTodoModal';
import Header from '../components/Header';

const Dashboard: NextPage = () => {
  const { todos, loading, error } = useRealtimeTodos();
  const { viewMode, setViewMode, activeModal, setActiveModal } = useUIStore();
  const filteredTodos = useFilteredTodos(todos);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Todos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Make sure your Supabase credentials are set in .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Bar: Filters + View Mode */}
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <FilterBar />
          
          <div className="flex gap-2 bg-white rounded-lg shadow-sm p-2 border border-slate-200">
            {(['kanban', 'list', 'timeline'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveModal('create')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-medium transition-all"
          >
            + New Todo
          </button>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['todo', 'in_progress', 'blocked', 'done'] as const).map((status) => {
            const count = todos.filter((t) => t.status === status).length;
            const colors = {
              todo: 'bg-gray-50 border-gray-200 text-gray-600',
              in_progress: 'bg-blue-50 border-blue-200 text-blue-600',
              blocked: 'bg-red-50 border-red-200 text-red-600',
              done: 'bg-green-50 border-green-200 text-green-600',
            };
            return (
              <div key={status} className={`${colors[status]} border rounded-lg p-4`}>
                <div className="text-sm font-semibold capitalize">{status.replace('_', ' ')}</div>
                <div className="text-2xl font-bold mt-1">{count}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="inline-flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
                <span className="text-gray-600 font-medium">Loading todos...</span>
              </div>
            </div>
          ) : (
            <>
              {viewMode === 'kanban' && <KanbanView todos={filteredTodos} />}
              {viewMode === 'list' && <ListView todos={filteredTodos} />}
              {viewMode === 'timeline' && <TimelineView todos={filteredTodos} />}
            </>
          )}
        </motion.div>

        {filteredTodos.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {todos.length === 0 ? 'No todos yet. Create one to get started!' : 'No todos match your filters.'}
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      {activeModal === 'create' && <CreateTodoModal />}
      {activeModal === 'edit' && <EditTodoModal />}
    </div>
  );
};

export default Dashboard;
