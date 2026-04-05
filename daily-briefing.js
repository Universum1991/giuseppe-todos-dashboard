// scripts/daily-briefing.js
/**
 * Daily Briefing Generator for Giuseppe
 * 
 * Runs at 8:00 AM daily:
 * 1. Reads all files in /memory
 * 2. Checks todos/active.md for active tasks
 * 3. Summarizes current progress
 * 4. Generates top 5 priorities
 * 5. Sends briefing to Stack via webhook
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const MEMORY_DIR = path.join(process.cwd(), '..', 'memory');
const TODOS_DIR = path.join(process.cwd(), '..', 'todos');
const WEBHOOK_URL = process.env.STACK_WEBHOOK_URL;

interface MemoryFiles {
  user: string;
  preferences: string;
  people: string;
  decisions: string;
}

interface BriefingData {
  timestamp: string;
  context: MemoryFiles;
  activeTodos: string[];
  summary: string;
  topPriorities: string[];
  recommendations: string[];
}

async function readMemoryFiles(): Promise<MemoryFiles> {
  console.log('[BRIEFING] Reading memory files...');
  
  const files = {
    user: '',
    preferences: '',
    people: '',
    decisions: '',
  };

  try {
    for (const [key, fileName] of Object.entries({
      user: 'user.md',
      preferences: 'preferences.md',
      people: 'people.md',
      decisions: 'decisions.md',
    })) {
      const filePath = path.join(MEMORY_DIR, fileName);
      if (fs.existsSync(filePath)) {
        files[key as keyof MemoryFiles] = fs.readFileSync(filePath, 'utf-8');
      } else {
        console.warn(`[BRIEFING] Missing file: ${fileName}`);
      }
    }
  } catch (error) {
    console.error('[BRIEFING] Error reading memory files:', error);
  }

  return files;
}

async function readActiveTodos(): Promise<string[]> {
  console.log('[BRIEFING] Reading active todos...');
  
  try {
    const activePath = path.join(TODOS_DIR, 'active.md');
    if (!fs.existsSync(activePath)) {
      console.warn('[BRIEFING] No active.md file found');
      return [];
    }

    const content = fs.readFileSync(activePath, 'utf-8');
    // Parse markdown checklist format
    const todoMatches = content.match(/^- \[(x| )\] .+$/gm) || [];
    return todoMatches
      .filter((match) => match.includes('[ ]')) // Only uncompleted items
      .map((match) => match.replace(/^- \[ \] /, '').trim());
  } catch (error) {
    console.error('[BRIEFING] Error reading active todos:', error);
    return [];
  }
}

function generateSummary(memory: MemoryFiles, activeTodos: string[]): string {
  /**
   * Analyze memory to generate contextual summary
   */
  let summary = '';

  // Extract current status from user.md
  const userMatch = memory.user.match(/### Current Status\n([\s\S]*?)(?=###|$)/);
  if (userMatch) {
    summary += `Current Status: ${userMatch[1].trim()}\n\n`;
  }

  // Extract recent activity from decisions.md
  const decisionMatch = memory.decisions.match(/## Pending Decisions\n([\s\S]*?)$/);
  if (decisionMatch) {
    summary += `Pending Decisions: ${decisionMatch[1].substring(0, 200)}...\n\n`;
  }

  summary += `Active Tasks: ${activeTodos.length} items in progress\n`;

  return summary;
}

function generatePriorities(memory: MemoryFiles, activeTodos: string[]): string[] {
  /**
   * Generate top 5 priorities based on:
   * 1. Decision urgency
   * 2. Task deadlines
   * 3. Cognitive load optimization
   * 4. Integration with existing interests
   */

  const priorities: string[] = [];

  // Extract from user.md deadlines
  const deadlineMatch = memory.user.match(/## Key Dates & Deadlines\n([\s\S]*?)(?=##|$)/);
  if (deadlineMatch) {
    const dateLines = deadlineMatch[1].match(/\| .+ \|/g) || [];
    dateLines.slice(0, 3).forEach((line) => {
      const [date, event] = line.split('|').slice(1, 3).map((s) => s.trim());
      if (event) priorities.push(`[DEADLINE] ${event} - ${date}`);
    });
  }

  // Extract active high-priority todos
  const highPriorityTodos = activeTodos.filter((todo) =>
    todo.toLowerCase().includes('critical') || todo.toLowerCase().includes('urgent')
  );
  highPriorityTodos.slice(0, 2).forEach((todo) => {
    priorities.push(`[ACTIVE] ${todo}`);
  });

  // Add thesis-related priority (based on his decision history)
  priorities.push('[THESIS] Schedule advisor meeting to finalize research direction');

  // Add wellness priority
  priorities.push('[WELLNESS] Establish consistent sleep/eating rhythm (bipolar type 2 optimization)');

  // Add development priority
  if (!priorities.some((p) => p.includes('Spanish'))) {
    priorities.push('[LEARNING] Spanish practice (15 min, base-intermediate level)');
  }

  return priorities.slice(0, 5);
}

function generateRecommendations(memory: MemoryFiles): string[] {
  /**
   * Generate personalized recommendations based on personality profile
   */
  const recommendations: string[] = [];

  // Energy management for bipolar cycling
  recommendations.push(
    'Monitor energy levels for bipolar cycling; adjust workload accordingly (avoid all-or-nothing)'
  );

  // Integration of interests
  recommendations.push(
    'Connect current thesis research to AI/ML component for intellectual integration'
  );

  // Realistic scheduling
  recommendations.push(
    'Max 80 pages/day study cap; use 50-min focus + 10-min break blocks'
  );

  // Credential alignment
  recommendations.push(
    'Ensure passion-first decision making; reference "SIPhaB lesson" for authentic alignment check'
  );

  // Health integration
  recommendations.push(
    'Schedule fitness: use audio-guided workouts (female voice, harp background)'
  );

  return recommendations.slice(0, 5);
}

async function sendToStack(briefing: BriefingData): Promise<boolean> {
  /**
   * Send briefing to Stack via webhook
   */
  if (!WEBHOOK_URL) {
    console.warn('[BRIEFING] STACK_WEBHOOK_URL not set; skipping webhook delivery');
    return false;
  }

  try {
    console.log('[BRIEFING] Sending to Stack webhook...');
    
    const payload = {
      type: 'daily-briefing',
      timestamp: briefing.timestamp,
      user: 'giuseppe',
      summary: briefing.summary,
      priorities: briefing.topPriorities,
      recommendations: briefing.recommendations,
      activeTasks: briefing.activeTodos.length,
    };

    const response = await axios.post(WEBHOOK_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    console.log('[BRIEFING] Webhook sent successfully');
    return response.status === 200;
  } catch (error) {
    console.error('[BRIEFING] Failed to send webhook:', error);
    return false;
  }
}

async function saveBriefing(briefing: BriefingData): Promise<void> {
  /**
   * Save briefing to local file for audit trail
   */
  try {
    const briefingDir = path.join(TODOS_DIR, 'briefings');
    if (!fs.existsSync(briefingDir)) {
      fs.mkdirSync(briefingDir, { recursive: true });
    }

    const date = new Date().toISOString().split('T')[0];
    const filePath = path.join(briefingDir, `briefing-${date}.json`);

    fs.writeFileSync(filePath, JSON.stringify(briefing, null, 2));
    console.log(`[BRIEFING] Saved to ${filePath}`);
  } catch (error) {
    console.error('[BRIEFING] Error saving briefing:', error);
  }
}

async function generateDailyBriefing(): Promise<void> {
  console.log('[BRIEFING] === Daily Briefing Generator Started ===');
  console.log(`[BRIEFING] Time: ${new Date().toISOString()}`);

  try {
    // 1. Read memory
    const memory = await readMemoryFiles();

    // 2. Read active todos
    const activeTodos = await readActiveTodos();

    // 3. Generate summary
    const summary = generateSummary(memory, activeTodos);

    // 4. Generate priorities
    const topPriorities = generatePriorities(memory, activeTodos);

    // 5. Generate recommendations
    const recommendations = generateRecommendations(memory);

    // 6. Build briefing object
    const briefing: BriefingData = {
      timestamp: new Date().toISOString(),
      context: memory,
      activeTodos,
      summary,
      topPriorities,
      recommendations,
    };

    // 7. Save locally
    await saveBriefing(briefing);

    // 8. Send to Stack
    const sent = await sendToStack(briefing);

    console.log('[BRIEFING] === Daily Briefing Complete ===');
    console.log(`[BRIEFING] Status: ${sent ? 'SUCCESS' : 'SAVED_LOCALLY'}`);
    console.log(`[BRIEFING] Priorities:`);
    topPriorities.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  } catch (error) {
    console.error('[BRIEFING] Fatal error:', error);
    process.exit(1);
  }
}

// Run immediately if called directly
if (require.main === module) {
  generateDailyBriefing();
}

module.exports = { generateDailyBriefing };
