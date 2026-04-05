# Giuseppe's Real-Time Todo Dashboard + Personality AI System

**Status:** Production-Ready  
**Last Updated:** 2026-04-05  
**Components:** 3 (Dashboard, Memory System, Daily Briefing)

---

## 📋 System Overview

This integrated system consists of three interconnected components:

### 1. Real-Time To-Do Dashboard (Next.js + Supabase)
- Multi-view interface (Kanban, List, Timeline)
- Instant updates via Supabase Realtime
- Priority-based sorting and filtering
- Drag-and-drop task management

### 2. Personality Memory System (/memory)
- **CLAUDE.md:** Personality profile & reasoning style
- **user.md:** Current state & personal context
- **preferences.md:** Communication & format preferences
- **people.md:** Key relationships & contacts
- **decisions.md:** Decision-making history & rationale

### 3. Daily Briefing Generator
- Reads all memory files at 8:00 AM
- Analyzes active.md for current tasks
- Generates top 5 priorities
- Sends summary to Stack via webhook

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm
- Supabase account (free tier works)
- ChromeOS with Linux VM (or any Linux/macOS/Windows with Node)
- Git

### 1. Clone & Install
```bash
cd /path/to/project
npm install
```

### 2. Create .env.local
```bash
# Get these from your Supabase dashboard:
# https://app.supabase.com/project/[your-project]/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here

# For daily briefing delivery
STACK_WEBHOOK_URL=https://your-stack-instance/webhooks/briefing
```

### 3. Set Up Database
```bash
npm run setup-db
```

This creates the `todos` table with:
- UUID primary key
- Status: todo | in_progress | blocked | done
- Priority: low | medium | high | critical
- Assigned agent (for AI tracking)
- Realtime subscriptions enabled

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:3000

---

## 📁 File Structure

```
/
├── CLAUDE.md                          # Personality profile (read first!)
├── memory/
│   ├── user.md                        # Personal state
│   ├── preferences.md                 # Communication style
│   ├── people.md                      # Key relationships
│   └── decisions.md                   # Decision history
│
├── todos/
│   ├── active.md                      # Current active tasks (markdown checklist)
│   └── briefings/                     # Daily briefing archive
│
├── dashboard/
│   ├── package.json
│   ├── next.config.js
│   ├── pages/
│   │   └── index.tsx                  # Main dashboard
│   ├── components/
│   │   ├── KanbanView.tsx
│   │   ├── ListView.tsx
│   │   ├── TimelineView.tsx
│   │   ├── TodoCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Header.tsx
│   │   ├── CreateTodoModal.tsx
│   │   └── EditTodoModal.tsx
│   └── lib/
│       ├── supabase.ts                # Realtime hooks & CRUD
│       └── store.ts                   # Zustand UI state
│
└── scripts/
    ├── daily-briefing.js              # Morning briefing generator
    └── setup-supabase.js              # Database initialization
```

---

## 🎯 Core Features

### Dashboard Views

#### Kanban
- Drag-and-drop between columns (todo → in_progress → blocked → done)
- Real-time synchronization across all connected clients
- Priority-based sorting within each column
- Visual status indicators

#### List
- Detailed task listing with full descriptions
- Sortable by priority, due date, or assigned agent
- Quick-edit inline support
- Filter & search integration

#### Timeline
- Calendar-based view for due dates
- Gantt-style visualization
- Milestone tracking
- Deadline warnings

### Realtime Synchronization
- Supabase Postgres Changes listening
- Instant UI updates across all tabs/devices
- Offline support (local-first architecture)
- Automatic reconnection handling

### Personality-Driven Context
Every interaction informed by:
- **Reasoning style:** Hierarchical, data-driven, synthesis-first
- **Communication:** Formal, structured, precise
- **Priorities:** Passion alignment > credentials, realistic constraints
- **Integration:** Connect disparate domains (neuroscience + AI + psychology)

---

## 📊 Database Schema

```sql
CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'blocked', 'done')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assigned_agent TEXT,              -- AI agent or person name
  description TEXT,
  due_date TIMESTAMP,
  tags JSONB DEFAULT '[]'::jsonb,  -- Array of string tags
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_todos_status ON public.todos(status);
CREATE INDEX idx_todos_priority ON public.todos(priority);
CREATE INDEX idx_todos_updated_at ON public.todos(updated_at DESC);
CREATE INDEX idx_todos_assigned_agent ON public.todos(assigned_agent);

-- Realtime enabled via ALTER PUBLICATION
ALTER TABLE public.todos REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.todos;
```

---

## ⏰ Daily Briefing Setup

### Local Testing
```bash
# Generate briefing immediately
npm run generate-briefing

# Check output
cat todos/briefings/briefing-2026-04-05.json
```

### Production Scheduling

#### Option 1: Cron Job (Linux/macOS)
```bash
# Edit crontab
crontab -e

# Add line (runs daily at 8:00 AM)
0 8 * * * cd /path/to/project && npm run generate-briefing
```

#### Option 2: GitHub Actions (Recommended)
```yaml
# .github/workflows/daily-briefing.yml
name: Daily Briefing

on:
  schedule:
    - cron: '0 8 * * *'  # 8:00 AM UTC daily

jobs:
  briefing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run generate-briefing
        env:
          STACK_WEBHOOK_URL: ${{ secrets.STACK_WEBHOOK_URL }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
```

#### Option 3: Cloud Scheduler (GCP/AWS)
```bash
# Deploy as Cloud Function with HTTP trigger
# Briefing generator will run on schedule automatically
```

### Briefing Contents

Each briefing includes:
1. **Summary:** Current status from memory files
2. **Active Tasks:** Uncompleted todos from active.md
3. **Top 5 Priorities:**
   - Deadline-based (from user.md)
   - Thesis-related (from decisions.md)
   - Wellness goals (from preferences.md)
   - Learning goals (from user.md)
   - Pending decisions (from decisions.md)
4. **Recommendations:** Personalized suggestions based on:
   - Bipolar type 2 energy optimization
   - Interest integration (neuroscience + AI + psychology)
   - Realistic scheduling constraints
   - Passion-first decision framework

### Webhook Payload to Stack
```json
{
  "type": "daily-briefing",
  "timestamp": "2026-04-05T08:00:00Z",
  "user": "giuseppe",
  "summary": "Current program status, active research, pending decisions...",
  "priorities": [
    "[DEADLINE] Thesis proposal due - 2026-06-30",
    "[ACTIVE] Prepare for Genetica Umana exam",
    "[THESIS] Schedule advisor meeting",
    "[WELLNESS] Establish consistent sleep rhythm",
    "[LEARNING] Spanish practice (15 min)"
  ],
  "recommendations": [
    "Monitor energy levels for bipolar cycling",
    "Connect thesis to AI/ML component",
    "Max 80 pages/day study cap",
    "Use passion-first decision framework",
    "Schedule audio-guided fitness (harp background)"
  ],
  "activeTasks": 7
}
```

---

## 🔐 Security

### Environment Variables
- `NEXT_PUBLIC_*` → Safe to expose (used in browser)
- `SUPABASE_SERVICE_KEY` → Keep secret! Never commit to repo
- Use `.env.local` (add to `.gitignore`)

### Supabase RLS (Row-Level Security)
For personal use (recommended setup):
```sql
-- Allow all authenticated users to see their own data
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view todos" ON public.todos
  FOR SELECT USING (true);

CREATE POLICY "Users can manage todos" ON public.todos
  FOR ALL USING (true);
```

---

## 📝 Memory System Usage

### At Session Start
Claude automatically reads:
1. CLAUDE.md (personality profile)
2. user.md (current personal state)
3. preferences.md (communication style)
4. people.md (relationships)
5. decisions.md (decision history)

### During Sessions
Claude responds using:
- **Reasoning:** Hierarchical, granular, synthesis-first
- **Format:** Outline-first, structured, precise
- **Content:** Evidence-based, no emoji, formal tone
- **Integration:** Connect domains (neuroscience + biotech + AI)

### At Session End
Claude updates:
1. **decisions.md** - New decisions or reasoning shifts
2. **preferences.md** - New format preferences discovered
3. **user.md** - Life updates, deadline changes
4. **people.md** - New contacts or relationship changes
5. **Log entry** - Topics covered, next session focus

---

## 🛠️ Customization

### Add New Memory Categories
1. Create new file in `/memory` (e.g., `research.md`)
2. Add to CLAUDE.md initialization protocol
3. Update `daily-briefing.js` to parse new file

### Extend Briefing Logic
Edit `scripts/daily-briefing.js`:
```javascript
// Add custom priority generation
function generateCustomPriorities(memory: MemoryFiles) {
  // Your logic here
}
```

### Add New Dashboard Views
1. Create `components/NewView.tsx`
2. Import in `pages/index.tsx`
3. Add to view mode selector

---

## 🐛 Troubleshooting

### Dashboard shows no todos
- Check Supabase connection: `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Run `npm run setup-db` to create table
- Ensure Realtime is enabled in Supabase dashboard

### Daily briefing not sending
- Check `STACK_WEBHOOK_URL` is set and valid
- Check logs: `cat todos/briefings/briefing-*.json`
- Verify scheduler is running (cron/GitHub Actions)

### Real-time updates not working
- Confirm RLS policies allow access
- Check browser console for errors
- Ensure `ALTER PUBLICATION supabase_realtime ADD TABLE public.todos` ran

### Memory files not updating
- Check file permissions: `chmod 644 memory/*.md`
- Verify `/memory` folder exists and is writable
- Check Claude's session end routine ran

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Zustand Store:** https://github.com/pmndrs/zustand
- **Framer Motion:** https://www.framer.com/motion

---

## 📞 Support

For issues:
1. Check this documentation
2. Review memory files for context
3. Check `/todos/briefings` for recent activity
4. Review environment variables in `.env.local`

---

## 🎓 Giuseppe's Framework Notes

This system is designed specifically around:

- **Intellectual Honesty:** Memory system captures decision rationale for continuous improvement
- **Integration:** All three components work together (UI + personality + briefing)
- **Realistic Constraints:** 80-page max, bipolar cycling, disability accommodation
- **Passion Alignment:** Briefing reminds about credential-seeking vs. authentic engagement
- **Structured Clarity:** Formal tone, hierarchical organization, exact terminology

Every piece reflects your reasoning style and communication preferences.

---

**Built for Giuseppe | April 2026**
