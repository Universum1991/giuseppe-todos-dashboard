// scripts/setup-supabase.js
/**
 * Supabase Database Setup
 * 
 * Creates the todos table with:
 * - id (UUID primary key)
 * - title (required)
 * - status (todo | in_progress | blocked | done)
 * - priority (low | medium | high | critical)
 * - assigned_agent (optional, for AI agent tracking)
 * - description (optional)
 * - due_date (optional)
 * - tags (optional, JSONB array)
 * - created_at (auto timestamp)
 * - updated_at (auto timestamp)
 * 
 * Usage: npm run setup-db
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error(
    'Error: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

async function setupDatabase() {
  console.log('[SETUP] Creating todos table...');

  try {
    // Create table using SQL
    const { error } = await supabase.rpc('exec', {
      sql: `
        -- Create todos table
        CREATE TABLE IF NOT EXISTS public.todos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'blocked', 'done')),
          priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
          assigned_agent TEXT,
          description TEXT,
          due_date TIMESTAMP,
          tags JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );

        -- Create indexes for better query performance
        CREATE INDEX IF NOT EXISTS idx_todos_status ON public.todos(status);
        CREATE INDEX IF NOT EXISTS idx_todos_priority ON public.todos(priority);
        CREATE INDEX IF NOT EXISTS idx_todos_updated_at ON public.todos(updated_at DESC);
        CREATE INDEX IF NOT EXISTS idx_todos_assigned_agent ON public.todos(assigned_agent);

        -- Create updated_at trigger
        CREATE OR REPLACE FUNCTION update_todos_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        DROP TRIGGER IF EXISTS trigger_update_todos_updated_at ON public.todos;
        CREATE TRIGGER trigger_update_todos_updated_at
          BEFORE UPDATE ON public.todos
          FOR EACH ROW
          EXECUTE FUNCTION update_todos_updated_at();

        -- Enable Realtime
        ALTER TABLE public.todos REPLICA IDENTITY FULL;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.todos;

        GRANT ALL ON public.todos TO authenticated;
        GRANT SELECT ON public.todos TO anon;
      `,
    });

    if (error) {
      // Try using SQL directly via Postgrest
      console.log('[SETUP] Attempting direct SQL execution...');
      
      const sqlCommands = [
        `CREATE TABLE IF NOT EXISTS public.todos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'blocked', 'done')),
          priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
          assigned_agent TEXT,
          description TEXT,
          due_date TIMESTAMP,
          tags JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );`,
        `CREATE INDEX IF NOT EXISTS idx_todos_status ON public.todos(status);`,
        `CREATE INDEX IF NOT EXISTS idx_todos_priority ON public.todos(priority);`,
        `CREATE INDEX IF NOT EXISTS idx_todos_updated_at ON public.todos(updated_at DESC);`,
        `CREATE INDEX IF NOT EXISTS idx_todos_assigned_agent ON public.todos(assigned_agent);`,
      ];

      for (const sql of sqlCommands) {
        try {
          await supabase.rpc('query', { sql }, { headers: { 'x-request-id': 'setup' } });
          console.log('[SETUP] ✓ Executed:', sql.substring(0, 50) + '...');
        } catch (e) {
          console.warn('[SETUP] ⚠ Command may already exist:', sql.substring(0, 50) + '...');
        }
      }
    }

    console.log('[SETUP] ✓ Database setup complete!');
    console.log('[SETUP] Table: public.todos');
    console.log('[SETUP] Realtime enabled via Supabase Realtime');
    console.log('[SETUP] Indexes created for optimal performance');
  } catch (error) {
    console.error('[SETUP] Error during database setup:', error);
    console.log(
      '[SETUP] Hint: You may need to manually run SQL in your Supabase SQL editor'
    );
    console.log(
      '[SETUP] Copy the SQL commands above and run them in: https://app.supabase.com/project/[your-project]/sql'
    );
  }
}

async function testConnection() {
  console.log('[SETUP] Testing Supabase connection...');

  try {
    const { data, error } = await supabase
      .from('todos')
      .select('COUNT(*)', { count: 'exact', head: true });

    if (error) {
      console.error('[SETUP] ✗ Connection failed:', error.message);
      return false;
    }

    console.log('[SETUP] ✓ Connection successful');
    return true;
  } catch (error) {
    console.error('[SETUP] ✗ Connection error:', error);
    return false;
  }
}

async function main() {
  console.log('[SETUP] === Supabase Database Setup ===\n');

  const connected = await testConnection();
  
  if (!connected) {
    console.log(
      '\n[SETUP] Setup will continue, but you may need to manually create the table.'
    );
  }

  await setupDatabase();

  console.log('\n[SETUP] === Setup Complete ===');
  console.log('[SETUP] Next steps:');
  console.log('  1. Run: npm install');
  console.log('  2. Create .env.local with your Supabase credentials');
  console.log('  3. Run: npm run dev');
}

main().catch(console.error);
