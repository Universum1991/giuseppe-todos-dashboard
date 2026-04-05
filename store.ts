// lib/store.ts
import { create } from 'zustand';
import type { Todo } from './supabase';

interface UIState {
  // Filters
  filterStatus: Todo['status'][];
  filterPriority: Todo['priority'][];
  searchTerm: string;
  
  // View mode
  viewMode: 'kanban' | 'list' | 'timeline';
  
  // Selected todos
  selectedTodos: Set<string>;
  
  // Modal
  activeModal: 'create' | 'edit' | 'filters' | null;
  selectedTodoId: string | null;
}

interface UIActions {
  setFilterStatus: (statuses: Todo['status'][]) => void;
  setFilterPriority: (priorities: Todo['priority'][]) => void;
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: 'kanban' | 'list' | 'timeline') => void;
  toggleTodoSelection: (id: string) => void;
  clearSelection: () => void;
  setActiveModal: (modal: UIState['activeModal']) => void;
  setSelectedTodoId: (id: string | null) => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  // Initial state
  filterStatus: [],
  filterPriority: [],
  searchTerm: '',
  viewMode: 'kanban',
  selectedTodos: new Set(),
  activeModal: null,
  selectedTodoId: null,

  // Actions
  setFilterStatus: (statuses) => set({ filterStatus: statuses }),
  setFilterPriority: (priorities) => set({ filterPriority: priorities }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setViewMode: (viewMode) => set({ viewMode }),
  
  toggleTodoSelection: (id) =>
    set((state) => {
      const newSelected = new Set(state.selectedTodos);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return { selectedTodos: newSelected };
    }),
  
  clearSelection: () => set({ selectedTodos: new Set() }),
  setActiveModal: (activeModal) => set({ activeModal }),
  setSelectedTodoId: (selectedTodoId) => set({ selectedTodoId }),
}));

// Helper to filter todos based on UI state
export const useFilteredTodos = (todos: Todo[]) => {
  const { filterStatus, filterPriority, searchTerm } = useUIStore();

  return todos.filter((todo) => {
    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(todo.status);
    const matchesPriority = filterPriority.length === 0 || filterPriority.includes(todo.priority);
    const matchesSearch = searchTerm === '' || 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });
};
