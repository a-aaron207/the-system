// SYSTEM v5 - QUICK INTEGRATION GUIDE
// Copy-paste these examples in browser console to test

// ═══════════════════════════════════════════════════
// 1. TASK MANAGEMENT
// ═══════════════════════════════════════════════════

// Create some sample tasks
const task1 = SYSTEM_V5.addTask("Learn React Hooks", "JavaScript", 45, "P1");
const task2 = SYSTEM_V5.addTask("Solve Algorithm Problems", "DSA", 60, "P1");
const task3 = SYSTEM_V5.addTask("Review State Management", "React", 30, "P2");

// View all tasks
console.log("All tasks:", SYSTEM_V5.tasks);

// Start a task
SYSTEM_V5.startTask(task1.id);
// → Timer starts for 45 minutes
// → Task status becomes "active"
// → UI updates with FINISH button

// ═══════════════════════════════════════════════════
// 2. TIMER SYSTEM
// ═══════════════════════════════════════════════════

// Start a 5-minute timer (for testing instead of 45)
SYSTEM_V5.startTimer(5);
// → Timer displays in top bar: "05:00" → "00:00"
// → Color changes: cyan → orange → red
// → After 5 min: auto-triggers recall, plays sound

// Stop timer manually if needed
SYSTEM_V5.stopTimer();

// ═══════════════════════════════════════════════════
// 3. ACTIVE RECALL
// ═══════════════════════════════════════════════════

// When timer finishes, recall box appears automatically
// User clicks: Good / Partial / Fail

// Or manually record recall:
SYSTEM_V5.recordRecall(task1.id, "good");
// → Increases recallAccuracy by 5%
// → Sets task.recallDone = true
// → Shows toast: "✓ Excellent recall!"

SYSTEM_V5.recordRecall(task1.id, "partial");
// → Decreases recallAccuracy by 2%

SYSTEM_V5.recordRecall(task1.id, "fail");
// → Decreases recallAccuracy by 10%

// ═══════════════════════════════════════════════════
// 4. DISCIPLINE ENGINE
// ═══════════════════════════════════════════════════

// Automatically runs - just start a task and switch tabs!
// Switches tabs → disciplineScore -= 10%
// Alert shows: "⚠ SYSTEM BREACH DETECTED"

// Check current discipline score
console.log("Discipline:", SYSTEM_V5.disciplineScore + "%");

// ═══════════════════════════════════════════════════
// 5. EXAM MODE
// ═══════════════════════════════════════════════════

// Enable exam mode (P1 tasks only)
SYSTEM_V5.toggleExamMode();
// → Filters task list to show only P1 tasks
// → Adds red indicator line at top of page
// → Message: "EXAM MODE: ACTIVE — P1 Tasks Only"

// Disable exam mode
SYSTEM_V5.toggleExamMode();
// → Shows all tasks again
// → Removes red indicator

// Check exam mode status
console.log("Exam mode active:", SYSTEM_V5.examMode);

// ═══════════════════════════════════════════════════
// 6. PERFORMANCE STATS
// ═══════════════════════════════════════════════════

// View all performance metrics
console.log("Performance Stats:", SYSTEM_V5.stats);

// Output:
// {
//   deepWorkTime: 3600,        // seconds (1 hour)
//   tasksCompleted: 2,
//   recallAccuracy: 75,        // percentage
//   disciplineScore: 90        // percentage
// }

// Update stats (called automatically)
SYSTEM_V5.updateStats();

// Stats are also displayed in UI if these elements exist:
// <span id="stat-hours"></span>      → "1h 0m"
// <span id="stat-tasks"></span>      → "2"
// <span id="stat-recall"></span>     → "75%"
// <span id="stat-discipline"></span> → "90%"

// ═══════════════════════════════════════════════════
// 7. DAILY LOG
// ═══════════════════════════════════════════════════

// Save end-of-day summary (prompts for input)
SYSTEM_V5.endDayLog();
// → Prompt: "Enter your daily summary:"
// → Saves: date, summary, all stats, timestamp
// → Output to console: console.table(log)

// View all daily logs
console.log("Daily logs:", SYSTEM_V5.dailyLogs);

// Output example:
// [
//   {
//     date: "2026-04-16",
//     summary: "Completed React module, good recall",
//     tasksCompleted: 3,
//     deepWorkTime: 7200,
//     recallAccuracy: 80,
//     disciplineScore: 95,
//     timestamp: 1745520000000
//   }
// ]

// ═══════════════════════════════════════════════════
// FULL WORKFLOW EXAMPLE
// ═══════════════════════════════════════════════════

// 1. Create a task
const myTask = SYSTEM_V5.addTask(
  "Study Advanced JavaScript",
  "Web Development",
  60,
  "P1"
);

// 2. Enable exam mode if this is exam prep
SYSTEM_V5.toggleExamMode();

// 3. Start the task (timer begins)
SYSTEM_V5.startTask(myTask.id);
// → Focus for the next 60 minutes
// → Timer updates in top bar

// 4. [After 60 min] Timer auto-completes
// → Recall box appears: "How well did you recall?"
// → Click: Good / Partial / Fail

// 5. Complete the task
SYSTEM_V5.completeTask(myTask.id);
// → Task marked as completed
// → deepWorkTime updated
// → tasksCompleted incremented

// 6. End of day
SYSTEM_V5.endDayLog();
// → Summary saved
// → Stats logged to console
// → Data persisted to localStorage

// ═══════════════════════════════════════════════════
// DATA PERSISTENCE
// ═══════════════════════════════════════════════════

// All data auto-saves to localStorage['system_v5']
// Survives page refresh

// Reset all V5 data (rarely needed)
localStorage.removeItem('system_v5');

// ═══════════════════════════════════════════════════
// INTEGRATION WITH SYSTEM v4
// ═══════════════════════════════════════════════════

// SYSTEM v5 runs ALONGSIDE SYSTEM v4
// They use SEPARATE storage:
// - v4 uses: localStorage['system_v4']
// - v5 uses: localStorage['system_v5']

// Both systems are fully functional independently
// You can use v4 quests AND v5 tasks at the same time

// Example: Use v5 for focused study sessions
// During active task: Hide v4 quests
// After task: Log completion in both systems if desired

// ═══════════════════════════════════════════════════
// CONSOLE HELPER
// ═══════════════════════════════════════════════════

// Quick status check
console.group("SYSTEM v5 STATUS");
console.log("Tasks:", SYSTEM_V5.tasks.length);
console.log("Completed:", SYSTEM_V5.stats.tasksCompleted);
console.log("Deep Work Time:", SYSTEM_V5.formatSeconds(SYSTEM_V5.stats.deepWorkTime));
console.log("Recall Accuracy:", SYSTEM_V5.stats.recallAccuracy + "%");
console.log("Discipline:", SYSTEM_V5.disciplineScore + "%");
console.log("Exam Mode:", SYSTEM_V5.examMode ? "ON" : "OFF");
console.log("Active Task:", SYSTEM_V5.activeTaskId ? "YES" : "NO");
console.log("Daily Logs:", SYSTEM_V5.dailyLogs.length);
console.groupEnd();
