# 🎯 Giuseppe's Integrated Dashboard System

**Status:** ✅ Complete & Production-Ready  
**Created:** April 5, 2026  
**Language:** English (with Italian context)

---

## 📦 What You Have

A complete system with **3 integrated components**:

### 1. **Real-Time To-Do Dashboard** (Next.js + Supabase)
- Multi-view interface: Kanban, List, Timeline
- Instant synchronization across devices
- Priority & status filtering
- Drag-and-drop task management

### 2. **Memory System** (/memory)
- **CLAUDE.md** - Your personality profile
- **user.md** - Current personal state
- **preferences.md** - Communication style & formats
- **people.md** - Key relationships
- **decisions.md** - Decision history & rationale

### 3. **Daily Briefing Generator** (8:00 AM)
- Reads all memory files
- Analyzes active todos
- Generates top 5 priorities
- Sends to Stack via webhook

---

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd dashboard/
npm install
```

### Step 2: Create Environment File
```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
STACK_WEBHOOK_URL=https://your-stack-instance/webhooks/briefing
```

**Get these from:** https://app.supabase.com/project/[your-project]/settings/api

### Step 3: Initialize Database
```bash
npm run setup-db
```

This creates the `todos` table with Realtime enabled.

### Step 4: Start Development Server
```bash
npm run dev
```

Open http://localhost:3000 ✅

---

## 📁 Complete File Structure

```
/home/claude/
│
├── 📄 CLAUDE.md                              ⭐ START HERE
│   ├── How you think (reasoning style)
│   ├── How you communicate (tone & clarity)
│   └── How you make decisions (logic & priorities)
│
├── 📄 SETUP.md                               (this guide)
├── 📄 README.md                              (project overview)
│
├── 📂 memory/                                (persistent context)
│   ├── user.md                               (current state)
│   ├── preferences.md                        (formats & communication)
│   ├── people.md                             (relationships)
│   └── decisions.md                          (decision history)
│
├── 📂 todos/                                 (task management)
│   ├── active.md                             (daily checklist)
│   └── briefings/                            (daily summaries archive)
│
├── 📂 dashboard/                             (Next.js app)
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.local.example
│   ├── .gitignore
│   │
│   ├── 📂 pages/
│   │   └── index.tsx                         (main dashboard)
│   │
│   ├── 📂 components/
│   │   ├── Header.tsx                        (stats & title)
│   │   ├── KanbanView.tsx                    (drag-drop board)
│   │   ├── ListView.tsx                      (list view)
│   │   ├── TimelineView.tsx                  (timeline/gantt)
│   │   ├── TodoCard.tsx                      (reusable card)
│   │   ├── FilterBar.tsx                     (search & filters)
│   │   ├── CreateTodoModal.tsx               (create form)
│   │   └── EditTodoModal.tsx                 (edit & delete)
│   │
│   ├── 📂 lib/
│   │   ├── supabase.ts                       (realtime hooks & CRUD)
│   │   └── store.ts                          (UI state w/ Zustand)
│   │
│   └── 📂 styles/
│       ├── globals.css                       (Tailwind + custom)
│       └── _app.tsx                          (app wrapper)
│
└── 📂 scripts/
    ├── daily-briefing.js                     (morning generator)
    └── setup-supabase.js                     (database init)
```

---

## 🎮 Using the Dashboard

### Kanban View
1. Drag tasks between columns (To Do → In Progress → Done)
2. Real-time sync: Changes appear instantly everywhere
3. Priority sorting: Critical tasks float to top
4. Click any card to edit

### List View
1. See all tasks in a list
2. Sort by priority, due date, agent
3. Filter by status or search by title
4. Quick inline editing

### Timeline View
1. View tasks by deadline
2. Sections: Overdue, Today, Tomorrow, This Week
3. See which tasks are behind schedule
4. Organized by due date

### Creating a Todo

**Via UI:**
1. Click "+ New Todo" button
2. Fill title, priority, status
3. Add due date, assign to agent, add tags
4. Click "Create"

**Priority Levels:**
- 🔴 **Critical** - Do immediately
- 🟠 **High** - This week
- 🟡 **Medium** - Important but flexible
- 🟢 **Low** - Can wait

**Status Options:**
- **To Do** - Not started
- **In Progress** - Currently working
- **Blocked** - Waiting on something
- **Done** - Completed

---

## 💾 Memory System

### How It Works

**At Session Start:**
1. Claude reads CLAUDE.md → learns your personality
2. Claude reads user.md → understands current state
3. Claude reads preferences.md → knows your communication style
4. Claude reads people.md → remembers key relationships
5. Claude reads decisions.md → understands past choices

**During Our Chat:**
- Claude responds in YOUR style (formal, structured, precise)
- Claude integrates knowledge across domains (neuroscience + biotech + AI)
- Claude respects YOUR constraints (80 pages/day, bipolar cycling, disability)
- Claude follows YOUR decision framework (passion > credentials)

**At Session End:**
- Claude updates decisions.md with new reasoning
- Claude updates user.md with life changes
- Claude updates preferences.md with format discoveries
- Claude updates people.md with new contacts
- Claude logs what we discussed

**Tomorrow:**
- All updated context ready for next session
- No repeat of basics ✓
- Continuous improvement of understanding ✓

### Memory Files Explained

**CLAUDE.md** (Your Brain)
```markdown
# Core Identity
- How you think: hierarchical, data-driven, synthesis-first
- How you communicate: formal, precise, structured
- How you decide: passion alignment > credentials, realistic constraints

# Special Handling
- Bipolar type 2: recognize as real constraint
- 80% disability: offer practical solutions
- Medical school pivot: you're confident; don't rehash
```

**user.md** (Current State)
```markdown
Current Status
- Program: M.Sc. Medical Biotech, Siena
- Health: Bipolar type 2, 80% disability
- Relationship: Engaged to Arianna
- Key Dates: Thesis proposal 2026-06-30
```

**preferences.md** (Communication)
```markdown
Tone: Formal, precise, academic
Format: Outline-first, hierarchical, printable
Avoid: Emoji, casual tone, approximations
Appreciate: Honest trade-offs, balanced pros/cons
```

**people.md** (Relationships)
```markdown
Arianna - Fiancée, supportive
Prof. Iadanza - Faculty contact
Lab PI - Thesis advisor (TBD)
DSU Toscana - Disability services
```

**decisions.md** (History)
```markdown
Decision: Master's Program Selection
Options: SIPhaB vs BMC vs Medical Biotech
Chosen: Medical Biotech
Reason: Passion alignment > credentials
Lesson: Avoid credential-chasing without intellectual engagement
```

---

## ⏰ Daily Briefing

### How It Works

**Every Day at 8:00 AM:**

1. **Read Memory** (takes 1 sec)
   - Loads all 4 memory files
   - Understands your current context

2. **Check Active Todos** (takes 1 sec)
   - Reads `/todos/active.md`
   - Sees what you marked as active

3. **Analyze Context** (takes 2 sec)
   - Looks at your recent decisions
   - Reviews your constraints & priorities
   - Checks deadlines

4. **Generate 5 Priorities** (takes 2 sec)
   ```
   1. [DEADLINE] Thesis proposal - 2026-06-30
   2. [EXAM] Genetica Umana exam prep
   3. [THESIS] Schedule advisor meeting
   4. [WELLNESS] Maintain sleep rhythm (bipolar)
   5. [LEARNING] Spanish practice + AI module
   ```

5. **Send via Webhook** (takes 1 sec)
   ```json
   {
     "user": "giuseppe",
     "timestamp": "2026-04-05T08:00:00Z",
     "priorities": [...],
     "recommendations": [...],
     "activeTasks": 12
   }
   ```

### Setup Scheduling

**Option 1: Cron Job (Linux/macOS)**
```bash
crontab -e
# Add this line:
0 8 * * * cd /path/to/project && npm run generate-briefing
```

**Option 2: GitHub Actions** (Recommended)
```yaml
# .github/workflows/daily-briefing.yml
name: Daily Briefing
on:
  schedule:
    - cron: '0 8 * * *'
jobs:
  briefing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run generate-briefing
```

**Option 3: Cloud Scheduler**
- Deploy as Google Cloud Function
- AWS Lambda with EventBridge
- Or any serverless platform

### Test Locally
```bash
npm run generate-briefing
# Check output: cat todos/briefings/briefing-2026-04-05.json
```

---

## 🔐 Security

### Environment Variables
- Keep `.env.local` secret (add to `.gitignore`)
- Never commit `SUPABASE_SERVICE_KEY`
- `NEXT_PUBLIC_*` variables are safe (used in browser)

### Supabase RLS (Optional)
For personal use, RLS is less critical. But if sharing:
```sql
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view todos" ON public.todos
  FOR SELECT USING (true);
```

---

## 🛠️ Customization

### Add New View Types
1. Create `components/NewView.tsx`
2. Import in `pages/index.tsx`
3. Add to view mode selector

### Extend Memory System
1. Create new file in `/memory` (e.g., `research.md`)
2. Add to CLAUDE.md initialization
3. Update `daily-briefing.js` to parse it

### Modify Briefing Logic
Edit `scripts/daily-briefing.js`:
```javascript
function generateCustomPriorities() {
  // Your logic here
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Dashboard shows no todos** | Check Supabase credentials, run `npm run setup-db` |
| **Real-time updates not working** | Ensure RLS policies allow access, check browser console |
| **Daily briefing not sending** | Verify `STACK_WEBHOOK_URL`, check `/todos/briefings` for logs |
| **Memory not updating** | Check `/memory` folder exists & is writable |
| **Module errors** | Run `npm install` to ensure all deps are installed |

---

## 📞 Support

1. **Check CLAUDE.md** - Your personality profile
2. **Review SETUP.md** - Detailed setup guide
3. **Check logs** - `/todos/briefings/briefing-*.json`
4. **Verify .env.local** - All credentials set correctly
5. **Test locally** - `npm run generate-briefing`

---

## 📚 Resources

- **Supabase Realtime:** https://supabase.com/docs/guides/realtime
- **Next.js Docs:** https://nextjs.org/docs
- **Zustand Store:** https://github.com/pmndrs/zustand
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion

---

## ✅ Checklist: Getting Started

- [ ] Read CLAUDE.md (5 min)
- [ ] Install dependencies: `npm install`
- [ ] Copy `.env.local.example` → `.env.local`
- [ ] Add Supabase credentials to `.env.local`
- [ ] Run `npm run setup-db` (creates table)
- [ ] Run `npm run dev` (starts server)
- [ ] Open http://localhost:3000
- [ ] Create a test todo
- [ ] Test drag-and-drop
- [ ] Set up briefing schedule (cron/GitHub Actions)
- [ ] Update `/todos/active.md` with your tasks

---

## 🎓 Giuseppe's Notes

This system is built around **you specifically**:

✅ Respects bipolar type 2 cycles  
✅ Accommodates 80% disability constraints  
✅ Follows passion-first decision making  
✅ Uses your preferred communication style  
✅ Integrates disparate interests  
✅ Learns from your history  

Every component serves your actual needs, not generic productivity.

---

**Ready to use. Start with CLAUDE.md! 🚀**
