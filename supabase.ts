// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/realtime-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Todo {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigned_agent?: string;
  updated_at: string;
  created_at: string;
  description?: string;
  due_date?: string;
  tags?: string[];
}

/**
 * useRealtimeTodos - Subscribe to real-time todos updates
 * Updates instantly when any client modifies the database
 */
export const useRealtimeTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('todos')
          .select('*')
          .order('updated_at', { ascending: false });

        if (fetchError) throw fetchError;
        setTodos(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTodos();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTodos((prev) => [payload.new as Todo, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTodos((prev) =>
              prev.map((todo) =>
                todo.id === payload.new.id ? (payload.new as Todo) : todo
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setTodos((prev) => prev.filter((todo) => todo.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { todos, loading, error };
};

/**
 * useTodoMutations - CRUD operations for todos
 */
export const useTodoMutations = () => {
  const addTodo = async (todo: Omit<Todo, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ ...todo, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const bulkUpdateStatus = async (ids: string[], status: Todo['status']) => {
    const { error } = await supabase
      .from('todos')
      .update({ status, updated_at: new Date().toISOString() })
      .in('id', ids);

    if (error) throw error;
  };

  return { addTodo, updateTodo, deleteTodo, bulkUpdateStatus };
};
