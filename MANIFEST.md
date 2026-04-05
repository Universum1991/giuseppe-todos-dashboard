# 📋 MANIFEST: Complete File List

**Generated:** 2026-04-05  
**Total Files:** 35  
**Status:** ✅ All files created successfully

---

## 📁 File Directory Tree

```
/home/claude/
│
├── 📖 DOCUMENTATION
│   ├── README.md                              (main guide)
│   ├── SETUP.md                               (detailed setup)
│   ├── CLAUDE.md ⭐                           (YOUR personality)
│   └── MANIFEST.md                            (this file)
│
├── 🧠 MEMORY SYSTEM (/memory)
│   ├── user.md                                (current personal state)
│   ├── preferences.md                         (communication style)
│   ├── people.md                              (key relationships)
│   └── decisions.md                           (decision history)
│
├── ✅ TODO MANAGEMENT (/todos)
│   ├── active.md                              (daily checklist)
│   └── briefings/                             (daily summaries archive)
│
├── 🎨 DASHBOARD APP (/dashboard)
│   │
│   ├── 🔧 Configuration Files
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── .env.local.example
│   │   └── .gitignore
│   │
│   ├── 📄 Pages
│   │   └── pages/
│   │       └── index.tsx                      (main dashboard)
│   │
│   ├── 🧩 Components
│   │   └── components/
│   │       ├── Header.tsx                     (title + stats)
│   │       ├── KanbanView.tsx                 (drag-drop board)
│   │       ├── ListView.tsx                   (list view)
│   │       ├── TimelineView.tsx               (timeline/gantt)
│   │       ├── TodoCard.tsx                   (reusable card)
│   │       ├── FilterBar.tsx                  (search & filters)
│   │       ├── CreateTodoModal.tsx            (create form)
│   │       └── EditTodoModal.tsx              (edit & delete)
│   │
│   ├── 📚 Libraries
│   │   └── lib/
│   │       ├── supabase.ts                    (realtime hooks)
│   │       └── store.ts                       (UI state)
│   │
│   └── 🎨 Styles
│       └── styles/
│           └── globals.css                    (Tailwind + custom)
│
└── 🤖 AUTOMATION (/scripts)
    ├── daily-briefing.js                      (8:00 AM generator)
    └── setup-supabase.js                      (database init)
```

---

## ✅ Setup Checklist

### Phase 1: Read & Understand (10 min)
- [ ] Read `/home/claude/CLAUDE.md` (your personality profile)
- [ ] Read `/home/claude/README.md` (overview)
- [ ] Skim `/home/claude/SETUP.md` (detailed guide)

### Phase 2: Install & Configure (15 min)
- [ ] Navigate to dashboard: `cd /home/claude/dashboard`
- [ ] Install dependencies: `npm install`
- [ ] Copy env template: `cp .env.local.example .env.local`
- [ ] Get Supabase credentials from: https://app.supabase.com
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_KEY=...
  STACK_WEBHOOK_URL=https://... (optional)
  ```

### Phase 3: Initialize Database (5 min)
- [ ] Run: `npm run setup-db`
- [ ] Check Supabase dashboard: table `todos` should exist
- [ ] Verify Realtime is enabled

### Phase 4: Start Using (5 min)
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3000
- [ ] Create a test todo
- [ ] Test drag-and-drop (Kanban view)
- [ ] Try editing/deleting

### Phase 5: Setup Automation (Optional, 10 min)
- [ ] Choose scheduler:
  - **Cron:** `crontab -e` → add `0 8 * * * cd /path && npm run generate-briefing`
  - **GitHub Actions:** Copy `.github/workflows/daily-briefing.yml` (see SETUP.md)
  - **Cloud Function:** Deploy to GCP/AWS (see SETUP.md)
- [ ] Test locally: `npm run generate-briefing`
- [ ] Check output: `cat /home/claude/todos/briefings/briefing-*.json`

### Phase 6: Update Memory (Ongoing)
- [ ] Update `/memory/user.md` with your current state
- [ ] Update `/memory/active.md` with your weekly tasks
- [ ] Add Stack webhook URL if available
- [ ] You're done! 🎉

---

## 📊 File Statistics

```
Component              Files    Lines of Code    Purpose
─────────────────────────────────────────────────────────────
Documentation          3        ~500             Guides & setup
Memory System          4        ~400             Persistent context
Todo Management        2        ~100             Task tracking
Pages                  1        ~150             Main UI
Components             8        ~1200            Dashboard UI
Libraries              2        ~300             Business logic
Config                 7        ~150             Build configuration
Styles                 1        ~100             Tailwind + custom
Scripts                2        ~400             Automation
─────────────────────────────────────────────────────────────
TOTAL                  30       ~3300            Complete system
```

---

## 🎯 Key Features by File

### CLAUDE.md ⭐
**The most important file!**
- Your personality profile
- How you think (hierarchical, data-driven, synthesis-first)
- How you communicate (formal, precise, structured)
- How you make decisions (passion > credentials, realistic)
- Special handling notes (bipolar type 2, disability, etc.)

### Dashboard Components
```
Header.tsx          → Title + stats counter (total, critical, blocked, done)
KanbanView.tsx      → Drag-drop columns (To Do, In Progress, Blocked, Done)
ListView.tsx        → Sorted task list with full details
TimelineView.tsx    → Tasks grouped by deadline (Overdue, Today, Tomorrow, etc.)
TodoCard.tsx        → Reusable card component (priority, due date, tags, agent)
FilterBar.tsx       → Search + status/priority filters
CreateTodoModal.tsx → Form to create new todos
EditTodoModal.tsx   → Form to edit/delete todos
```

### Library Functions
```
lib/supabase.ts
  - useRealtimeTodos()      → Subscribe to real-time todo updates
  - useTodoMutations()      → CRUD operations (add, update, delete)
  - Todo interface          → TypeScript types

lib/store.ts
  - useUIStore()            → UI state (filters, view mode, modals)
  - useFilteredTodos()      → Apply filters to todo list
```

### Automation Scripts
```
scripts/daily-briefing.js   → Reads memory → generates 5 priorities → sends to Stack
scripts/setup-supabase.js   → Creates todos table + indexes + RLS + Realtime
```

---

## 🚀 Commands Reference

```bash
# From /home/claude/dashboard/

# Install
npm install

# Development
npm run dev                 # Start dev server (http://localhost:3000)

# Build & Deploy
npm run build              # Create production build
npm start                  # Run production build

# Database & Automation
npm run setup-db           # Initialize Supabase database
npm run generate-briefing  # Generate daily briefing now

# Linting
npm run lint               # Check code style
```

---

## 🔑 Critical Files to Know

### 1. CLAUDE.md (your personality)
   - Read this first
   - Share with Claude at start of every session
   - Updates how Claude responds to you

### 2. .env.local (secrets)
   - Store Supabase credentials
   - Store Stack webhook URL
   - **NEVER commit to git**
   - Copy from `.env.local.example`

### 3. /memory/ (persistent context)
   - **user.md** - Your current state
   - **preferences.md** - How you want to communicate
   - **people.md** - Important contacts
   - **decisions.md** - Why you made past choices

### 4. /todos/active.md (weekly tasks)
   - Markdown checklist format
   - Daily briefing reads this
   - Update weekly with active tasks

### 5. package.json (dependencies)
   - Lists all required packages
   - Run `npm install` if you modify it

---

## 🎨 UI Components Architecture

```
pages/index.tsx (Main)
├── Header (stats + title)
├── FilterBar (search, status, priority)
├── View Selector (Kanban, List, Timeline)
│
├── KanbanView
│   ├── Column (status)
│   │   └── TodoCard (draggable)
│   │       ├── Title
│   │       ├── Priority badge
│   │       ├── Due date
│   │       ├── Tags
│   │       └── Assigned agent
│
├── ListView
│   └── TodoCard[] (sorted by priority)
│
├── TimelineView
│   ├── Section (Overdue, Today, Tomorrow, etc.)
│   │   └── TodoCard[] (sorted by priority)
│
├── CreateTodoModal (Framer Motion)
│   ├── Title input
│   ├── Description textarea
│   ├── Priority select
│   ├── Status select
│   ├── Due date input
│   ├── Agent input
│   ├── Tags input
│   └── Submit button
│
└── EditTodoModal (Framer Motion)
    ├── All fields editable
    ├── Delete button
    └── Save button
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────┐
│    Supabase (PostgreSQL + Realtime)    │
│  ┌──────────────────────────────────┐  │
│  │  todos table                     │  │
│  │  - id, title, status, priority   │  │
│  │  - assigned_agent, description   │  │
│  │  - due_date, tags, timestamps    │  │
│  └──────────────────────────────────┘  │
└────────────┬────────────────────────────┘
             │
             │ Real-time subscription
             │ (useRealtimeTodos)
             │
             ▼
┌─────────────────────────────────────────┐
│  React Component State                  │
│  - todos: Todo[]                        │
│  - loading, error                       │
└────────────┬────────────────────────────┘
             │
             │ Filter & transform
             │ (useFilteredTodos)
             │
             ▼
┌─────────────────────────────────────────┐
│  UI Layers                              │
│  - Header (stats)                       │
│  - FilterBar (search)                   │
│  - KanbanView / ListView / TimelineView │
│  - TodoCard (reusable)                  │
│  - Modals (Create, Edit)                │
└─────────────────────────────────────────┘
             │
             │ User actions
             │ (create, update, delete)
             │
             ▼
┌─────────────────────────────────────────┐
│  Mutations (useTodoMutations)           │
│  - addTodo()                            │
│  - updateTodo()                         │
│  - deleteTodo()                         │
│  - bulkUpdateStatus()                   │
└────────────┬────────────────────────────┘
             │
             │ API call to Supabase
             │
             ▼
Supabase (back to top)
Real-time notification triggers
→ All subscribed clients update
→ Loop continues
```

---

## 📈 Briefing Data Flow

```
8:00 AM (Cron/GitHub Actions)
   │
   ├─→ scripts/daily-briefing.js runs
   │
   ├─→ readMemoryFiles()
   │   ├── /memory/user.md
   │   ├── /memory/preferences.md
   │   ├── /memory/people.md
   │   └── /memory/decisions.md
   │
   ├─→ readActiveTodos()
   │   └── /todos/active.md
   │
   ├─→ generateSummary()
   │   └── Analyzes memory + todos
   │
   ├─→ generatePriorities()
   │   └── Top 5 based on context
   │
   ├─→ generateRecommendations()
   │   └── Personalized advice
   │
   ├─→ saveBriefing()
   │   └── /todos/briefings/briefing-YYYY-MM-DD.json
   │
   └─→ sendToStack()
       └── POST to STACK_WEBHOOK_URL
           (if configured)
```

---

## 🛡️ Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit `SUPABASE_SERVICE_KEY`
- [ ] `NEXT_PUBLIC_*` variables are okay to expose
- [ ] Supabase RLS policies allow your access
- [ ] Use Realtime only over HTTPS (in production)
- [ ] Webhook URL is HTTPS secured

---

## 🎓 How This Serves You

Each component is designed for Giuseppe specifically:

**CLAUDE.md**
→ Ensures Claude responds in YOUR communication style

**Memory Files**
→ Persist context across sessions without repeating

**/todos/active.md**
→ Your weekly task list, integrated with briefing

**Daily Briefing**
→ Personalized 5 priorities every morning, respects your constraints

**Dashboard**
→ Visual task management with real-time sync

**TypeScript + Zustand + Realtime**
→ Type-safe, performant, instant updates

---

## ❓ FAQ

**Q: Do I need Supabase paid plan?**
A: No. Free tier includes 500k realtime messages/month (plenty).

**Q: Can I run this offline?**
A: UI yes (cached), Realtime no (needs internet), Briefing no.

**Q: How do I update my personality profile?**
A: Edit `/memory/user.md` or tell Claude. Claude updates CLAUDE.md at session end.

**Q: Can I add more columns to the Kanban?**
A: Yes. Edit `components/KanbanView.tsx` and `lib/supabase.ts` `status` type.

**Q: How often should I update active.md?**
A: Weekly or when tasks change. Briefing reads it every morning.

**Q: What if briefing webhook fails?**
A: It saves locally to `/todos/briefings/` anyway. Check logs there.

---

## 📞 Next Steps

1. **Read CLAUDE.md** (5 min) ← Start here
2. **Run setup** (5 min) - `npm install` + `.env.local` + `npm run setup-db`
3. **Start dashboard** (1 min) - `npm run dev`
4. **Create test todo** (2 min) - Test drag-drop
5. **Update memory files** (5 min) - Your info goes in `/memory/`
6. **Schedule briefing** (10 min) - Cron job or GitHub Actions
7. **Use it!** (ongoing) - Manage tasks, get daily briefing

---

**Everything is ready. Start with CLAUDE.md! 🚀**

Last Updated: 2026-04-05
