// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM v5 TECHNICAL ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════

/*
OVERVIEW:
SYSTEM v5 is a modular execution engine that extends SYSTEM v4 without 
modifying any existing code. It provides task management, timed sessions,
active recall learning, discipline monitoring, and performance analytics.

DESIGN PRINCIPLES:
1. Isolation - All code under SYSTEM_V5 namespace
2. Non-invasive - Zero modifications to v4 code
3. Safe DOM - Checks before modifying HTML
4. Persistent - localStorage for data recovery
5. Modular - Each feature is independent
6. Extendable - Easy to add new modules
*/

// ═══════════════════════════════════════════════════════════════════════════
// NAMESPACE & INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

const SYSTEM_V5 = {
  // All state and methods contained here
  // Auto-initializes when DOM is ready (line ~400 in system-v5.js)
  // Can be accessed globally: window.SYSTEM_V5
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 1: TASK ENGINE
// ═══════════════════════════════════════════════════════════════════════════

/*
Task Object Structure:
{
  id: string              // 'task_<timestamp>_<random>'
  title: string           // User-provided task name
  subject: string         // Category/subject
  timeRequired: number    // Minutes (will be converted to seconds internally)
  type: string            // 'P1' (priority 1) or 'P2' (priority 2)
  status: string          // 'pending' | 'active' | 'completed'
  recallDone: boolean     // Has recall been scored?
  recallScore: string     // 'good' | 'partial' | 'fail' | null
  createdAt: timestamp    // When task was created
  startedAt: timestamp    // When task was started
  completedAt: timestamp  // When task was completed
}
*/

const SYSTEM_V5_TaskEngine = {
  // State
  tasks: [],              // Array of task objects
  activeTaskId: null,     // Currently active task ID

  // Core methods
  addTask: function(title, subject, timeRequired, type = 'P2', recallDone = false) {
    // Validates: title (required), timeRequired (number)
    // Creates unique ID
    // Adds to tasks array
    // Persists to localStorage
    // Re-renders task list UI
    // Returns: task object
  },

  startTask: function(taskId) {
    // Finds task by ID
    // Sets status to 'active'
    // Records startedAt timestamp
    // Stops any previous active task
    // Calls startTimer()
    // Updates UI
  },

  completeTask: function(taskId) {
    // Sets status to 'completed'
    // Records completedAt timestamp
    // Stops timer
    // Calls showRecallBox() automatically
    // Updates stats
    // Triggers achievement checks (if integrated with v4)
  },

  deleteTask: function(taskId) {
    // Removes from tasks array
    // Stops timer if was active
    // Persists changes
    // Updates UI
  },

  renderTaskList: function() {
    // Finds or creates #task-list container
    // Builds HTML for all tasks
    // Filters by examMode if enabled
    // Shows action buttons (START/FINISH/DELETE)
    // Highlights active task
    // Shows P1/P2 badges
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 2: EXECUTION TIMER
// ═══════════════════════════════════════════════════════════════════════════

/*
Timer Design:
- Runs in seconds using setInterval
- Updates #timer element in top bar
- Counts down from N minutes to 0:00
- Color coding: cyan → orange → red (5m → 1m)
- Auto-triggers recall when reaches 0:00
- Can be stopped manually via stopTimer()
- Does NOT interfere with any v4 timers
*/

const SYSTEM_V5_Timer = {
  // State
  timerRunning: boolean,      // Is timer currently active?
  timerValue: number,         // Remaining seconds
  timerInterval: intervalId,  // setInterval reference (for cleanup)

  // Core methods
  startTimer: function(minutes) {
    // Convert minutes to seconds
    // Set timerValue
    // Set timerRunning = true
    // Create #timer element if needed
    // Start setInterval (1000ms ticks)
    // Call updateTimerDisplay() each tick
  },

  stopTimer: function() {
    // Set timerRunning = false
    // Clear interval
    // Leave display showing (doesn't erase)
  },

  updateTimerDisplay: function() {
    // Calculate MM:SS from timerValue
    // Format: "MM:SS" (e.g., "04:32")
    // Update #timer.textContent
    // Color logic:
    //   > 5 min: cyan
    //   1-5 min: orange
    //   < 1 min: red with pulse
  },

  onTimerComplete: function() {
    // Stop timer
    // Get active task
    // Show recall box
    // Play sound (optional, AudioContext)
    // Set timerRunning = false
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 3: ACTIVE RECALL SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

/*
Recall Design:
- Modal/box shown after task timer completes
- Three response buttons: Good / Partial / Fail
- Each response updates recallAccuracy stat differently
- Stores recallScore in task object
- Sets recallDone = true
- Auto-dismisses after recording
- Can be manually triggered via recordRecall()
*/

const SYSTEM_V5_Recall = {
  // Core methods
  showRecallBox: function(task) {
    // Find or create #recall-box container
    // Build HTML with three buttons
    // Display task title and subject
    // Make it visible
  },

  recordRecall: function(taskId, score) {
    // Find task by ID
    // Set task.recallScore = score ('good'|'partial'|'fail')
    // Set task.recallDone = true
    // Update stat: recallAccuracy
    //   Good:    +5%
    //   Partial: -2%
    //   Fail:    -10%
    // Min: 0%, Max: 100%
    // Show toast feedback
    // Hide recall box
    // Persist changes
  },

  createRecallBox: function() {
    // Create div#recall-box
    // Set initial display:none
    // Insert into #mainContent
    // Return reference
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 4: DISCIPLINE ENGINE
// ═══════════════════════════════════════════════════════════════════════════

/*
Discipline Design:
- Monitors visibility API (visibilitychange event)
- Detects when user switches tabs/windows
- Only triggers penalty if task is ACTIVE
- Reduces disciplineScore by 10% per violation
- Shows alert to warn user
- Logs violation in console
- Persists score
*/

const SYSTEM_V5_Discipline = {
  // State
  disciplineScore: number  // 0-100, starts at 100

  // Core methods
  initDisciplineTracking: function() {
    // Add visibilitychange event listener to document
    // Check: if(document.hidden && activeTaskId) → violation
  },

  disciplineViolation: function() {
    // disciplineScore -= 10
    // Clamp: min 0
    // Show alert: "⚠ SYSTEM BREACH DETECTED"
    // Update stats
    // Persist to storage
    // Log to console
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 5: EXAM MODE
// ═══════════════════════════════════════════════════════════════════════════

/*
Exam Mode Design:
- Boolean flag: examMode (true/false)
- When enabled:
  * Only show tasks with type="P1"
  * Add "exam-mode" class to <body>
  * CSS shows red indicator line at top
  * Filter applied in renderTaskList()
- When disabled:
  * Show all tasks
  * Remove "exam-mode" class
  * Return to normal display
- Does NOT affect underlying task data (just filter)
- Toggle-able anytime (doesn't lock other modes)
*/

const SYSTEM_V5_ExamMode = {
  // State
  examMode: boolean,  // false by default

  // Core methods
  toggleExamMode: function() {
    // examMode = !examMode
    // If enabled:
    //   - Add class to body
    //   - Show toast
    // If disabled:
    //   - Remove class from body
    //   - Show toast
    // Re-render task list
    // Persist to storage
  }

  // Filtering logic in renderTaskList():
  // let displayTasks = examMode
  //   ? tasks.filter(t => t.type === 'P1')
  //   : tasks
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 6: PERFORMANCE STATS
// ═══════════════════════════════════════════════════════════════════════════

/*
Stats Object:
{
  deepWorkTime: number        // Total seconds of focused work
  tasksCompleted: number      // Count of completed tasks
  recallAccuracy: number      // Percentage (0-100)
  disciplineScore: number     // Percentage (0-100)
}

Calculation Logic:
- deepWorkTime = sum of all (task.timeRequired * 60) for completed tasks
- tasksCompleted = count of tasks where status='completed'
- recallAccuracy = weighted average of recall responses (-10 to +5)
- disciplineScore = 100 - (violations * 10), min 0
*/

const SYSTEM_V5_Stats = {
  // State
  stats: {
    deepWorkTime: 0,
    tasksCompleted: 0,
    recallAccuracy: 50,
    disciplineScore: 100
  },

  // Core methods
  updateStats: function() {
    // Recalculate deepWorkTime from completed tasks
    // Count tasksCompleted
    // Get recallAccuracy (already tracking)
    // Get disciplineScore (already tracking)
    // Update UI elements if they exist:
    //   - #stat-hours (format: "2h 30m")
    //   - #stat-tasks (count)
    //   - #stat-recall (e.g., "75%")
    //   - #stat-discipline (e.g., "90%")
    // Persist to storage
  },

  updateStatDisplay: function(elementId, value) {
    // Find element by ID
    // If exists: set textContent to value
    // If not exists: silently skip (safe!)
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MODULE 7: DAILY LOG SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

/*
Daily Log Entry:
{
  date: string                // ISO format: "2026-04-16"
  summary: string             // User input
  tasksCompleted: number      // From stats
  deepWorkTime: number        // In seconds, from stats
  recallAccuracy: number      // Percentage
  disciplineScore: number     // Percentage
  timestamp: number           // Unix timestamp
}

Daily Logs Array:
- Stores multiple daily entries
- Persists to localStorage
- Logged to console for debugging
*/

const SYSTEM_V5_DailyLog = {
  // State
  dailyLogs: [],  // Array of log entry objects

  // Core methods
  endDayLog: function() {
    // Prompt user for summary text
    // If cancelled: return early
    // Create log entry with current date, all stats
    // Push to dailyLogs array
    // Persist to storage
    // Log to console (console.table)
    // Show success toast
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// STORAGE & PERSISTENCE
// ═══════════════════════════════════════════════════════════════════════════

const SYSTEM_V5_Storage = {
  DB_KEY_V5: 'system_v5',  // localStorage key

  saveToStorage: function() {
    // Create data object with all state:
    // {
    //   tasks,
    //   activeTaskId,
    //   examMode,
    //   stats,
    //   disciplineScore,
    //   dailyLogs,
    //   timestamp
    // }
    // JSON.stringify and save to localStorage
    // Catch errors silently (quota full, etc.)
  },

  loadFromStorage: function() {
    // Check if localStorage['system_v5'] exists
    // If exists: parse JSON and restore all state
    // If missing: initialize defaults
    // Called on init()
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION FLOW
// ═══════════════════════════════════════════════════════════════════════════

/*
1. HTML loads
2. V4 code runs (untouched)
3. V4 initialization complete
4. <script src="system-v5.js"> tag runs
5. SYSTEM_V5 object created
6. Event listener added: DOMContentLoaded or document.readyState check
7. SYSTEM_V5.init() called:
   a. loadFromStorage() - restore previous state
   b. initDisciplineTracking() - set up visibility tracking
   c. createTaskListContainer() - ensure #task-list exists
   d. createRecallBox() - ensure #recall-box exists
   e. createTimerDisplay() - ensure #timer exists
   f. renderTaskList() - initial render
   g. updateStats() - update UI
   h. Log success to console
8. App fully initialized, both v4 and v5 ready to use
*/

// ═══════════════════════════════════════════════════════════════════════════
// DOM SAFETY
// ═══════════════════════════════════════════════════════════════════════════

/*
Safe DOM Pattern Used Throughout:

Before creating element:
  const el = document.getElementById('my-element');
  if (!el) {
    // Create it
  }

Before modifying element:
  const el = document.getElementById('my-element');
  if (el) {
    el.textContent = 'new value';  // Only if exists
  }

Benefits:
✓ No overwrites if element already exists
✓ No errors if element missing
✓ Compatible with other code modifying DOM
✓ Can coexist with custom HTML additions
*/

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRATION WITH SYSTEM v4
// ═══════════════════════════════════════════════════════════════════════════

/*
Data Separation:
- v4: localStorage['system_v4']
- v5: localStorage['system_v5']
- No data mixing
- No conflicts

Code Separation:
- v4: All code in <script> tag in index.html
- v5: All code in system-v5.js
- v4 doesn't reference v5
- v5 checks for v4 functions (e.g., showToast, sendNotif) if available

Namespacing:
- v4: Global variable S, functions like render(), addQuest()
- v5: Global object SYSTEM_V5 with all methods/state
- No conflicts in global scope

UI Integration:
- v4: Uses #mainContent, .page divs, .bnav nav
- v5: Injects #task-list, #recall-box at top of #mainContent
- v4 displays in .page divs when active
- v5 elements visible anytime

Both systems fully functional simultaneously
*/

// ═══════════════════════════════════════════════════════════════════════════
// EXTENSION POINTS
// ═══════════════════════════════════════════════════════════════════════════

/*
To extend SYSTEM v5, modify system-v5.js:

1. ADD NEW MODULE:
   - Create new section in SYSTEM_V5 object
   - Follow existing pattern
   - Add to init() if needed

2. ADD NEW STATE:
   - Add property to SYSTEM_V5 object
   - Include in saveToStorage()
   - Include in loadFromStorage()

3. ADD NEW METHOD:
   - Add function to relevant module in SYSTEM_V5
   - Call this.saveToStorage() if modifying state
   - Call this.renderTaskList() if modifying UI
   - Test for null/undefined before using DOM

4. ADD NEW UI ELEMENT:
   - Create container with safe check
   - Store reference in SYSTEM_V5
   - Update in renderTaskList() or dedicated render function
   - Add CSS to style section at bottom

5. HOOK WITH V4:
   - Check if window.S exists (v4 state)
   - Check if window.showToast exists (v4 function)
   - Can safely modify S if needed (though not recommended)
   - Better: emit events or callbacks
*/

// ═══════════════════════════════════════════════════════════════════════════
// DEBUGGING
// ═══════════════════════════════════════════════════════════════════════════

console.group("SYSTEM v5 Debug Commands");
console.log("SYSTEM_V5 object:", window.SYSTEM_V5);
console.log("Current tasks:", SYSTEM_V5.tasks);
console.log("Active task ID:", SYSTEM_V5.activeTaskId);
console.log("Performance stats:", SYSTEM_V5.stats);
console.log("Daily logs:", SYSTEM_V5.dailyLogs);
console.log("LocalStorage v5:", JSON.parse(localStorage.getItem('system_v5')));
console.groupEnd();

// ═══════════════════════════════════════════════════════════════════════════
// END ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════
