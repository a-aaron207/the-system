# SYSTEM v5 — QUICK REFERENCE GUIDE

## ✅ WHAT'S NEW

| Module | Capability | Command | Result |
|--------|-----------|---------|--------|
| **Task Engine** | Create tasks with priority, duration, subject | `SYSTEM_V5.addTask(title, subject, mins, type)` | Task added to list |
| **Execution Timer** | Dedicated countdown for focused work | `SYSTEM_V5.startTimer(45)` | 45-min timer in top bar |
| **Active Recall** | Measure learning retention post-task | `SYSTEM_V5.recordRecall(taskId, 'good')` | Recall score recorded |
| **Discipline Tracking** | Detect tab-switching during work | (Auto) | Score penalized -10% |
| **Exam Mode** | Filter to priority tasks only | `SYSTEM_V5.toggleExamMode()` | P1 tasks displayed |
| **Stats Dashboard** | Track productivity metrics | `SYSTEM_V5.updateStats()` | Metrics displayed |
| **Daily Log** | Save end-of-day summary | `SYSTEM_V5.endDayLog()` | Summary logged |

---

## 📋 COMPLETE API REFERENCE

### TASK MANAGEMENT
```javascript
// Create a task (required: title, subject, timeRequired; optional: type='P2')
SYSTEM_V5.addTask("Learn TypeScript", "Programming", 60, "P1")
// Returns: { id, title, subject, timeRequired, type, status, ... }

// Start a task (begins timer, marks active)
SYSTEM_V5.startTask(taskId)

// Complete a task (stops timer, shows recall, updates stats)
SYSTEM_V5.completeTask(taskId)

// Delete a task
SYSTEM_V5.deleteTask(taskId)

// Get all tasks
SYSTEM_V5.tasks  // Array of task objects
```

### TIMER CONTROL
```javascript
// Start countdown timer (in minutes)
SYSTEM_V5.startTimer(45)  // Runs 45-minute countdown

// Stop timer manually
SYSTEM_V5.stopTimer()

// Check timer status
SYSTEM_V5.timerRunning   // true/false
SYSTEM_V5.timerValue     // seconds remaining
```

### RECALL & LEARNING
```javascript
// Record how well you recalled information
SYSTEM_V5.recordRecall(taskId, 'good')     // +5% accuracy
SYSTEM_V5.recordRecall(taskId, 'partial')  // -2% accuracy
SYSTEM_V5.recordRecall(taskId, 'fail')     // -10% accuracy

// View accuracy score
SYSTEM_V5.stats.recallAccuracy  // 0-100%
```

### DISCIPLINE
```javascript
// Check discipline score (auto-updated on tab switch)
SYSTEM_V5.disciplineScore  // 0-100%, starts at 100%

// Each tab switch: -10 (clamped at 0)
```

### EXAM MODE
```javascript
// Toggle exam mode (P1 tasks only)
SYSTEM_V5.toggleExamMode()

// Check status
SYSTEM_V5.examMode  // true/false
```

### PERFORMANCE METRICS
```javascript
// View all stats
SYSTEM_V5.stats
// {
//   deepWorkTime: 7200,      // seconds
//   tasksCompleted: 3,
//   recallAccuracy: 78,      // %
//   disciplineScore: 95      // %
// }

// Update/recalculate
SYSTEM_V5.updateStats()

// Format time nicely
SYSTEM_V5.formatSeconds(7200)  // "2h 0m"
```

### DAILY LOG
```javascript
// Save end-of-day summary
SYSTEM_V5.endDayLog()
// Prompts for text input
// Saves: date, summary, all stats, timestamp

// View logs
SYSTEM_V5.dailyLogs  // Array of log objects
// [{date, summary, tasksCompleted, deepWorkTime, ...}, ...]
```

### STORAGE
```javascript
// Manual save (auto-called after actions)
SYSTEM_V5.saveToStorage()

// Manual load (auto-called on init)
SYSTEM_V5.loadFromStorage()

// Reset v5 data
localStorage.removeItem('system_v5')
```

---

## 🎯 COMMON WORKFLOWS

### Study Session
```javascript
// 1. Create task
const task = SYSTEM_V5.addTask("Study Biology Ch5", "Biology", 45, "P1")

// 2. Start (5-45 min timer begins)
SYSTEM_V5.startTask(task.id)
// [User studies for 45 minutes]

// 3. Timer ends → Recall box auto-appears
// User clicks: Good / Partial / Fail

// 4. Complete task
SYSTEM_V5.completeTask(task.id)

// Results:
// ✓ Task marked done
// ✓ 45 minutes added to deepWorkTime
// ✓ tasksCompleted += 1
// ✓ recallAccuracy adjusted
// ✓ Stats updated
```

### Exam Prep Day
```javascript
// 1. Enable exam mode
SYSTEM_V5.toggleExamMode()
// Shows only P1 (priority) tasks

// 2. Create 3 P1 study sessions
SYSTEM_V5.addTask("Math Formulas", "Math", 60, "P1")
SYSTEM_V5.addTask("History Timeline", "History", 45, "P1")
SYSTEM_V5.addTask("Chemistry Lab", "Chemistry", 90, "P1")

// 3. Work through each one
// [Start → Study → Recall → Complete]

// 4. End of day
SYSTEM_V5.endDayLog()
// Summary: "Prepared for 3 subjects, good recall on Math"

// View performance
console.table(SYSTEM_V5.stats)
// deepWorkTime: 195 min (3.25 hrs)
// tasksCompleted: 3
// recallAccuracy: 82%
// disciplineScore: 100%
```

### Productivity Tracking
```javascript
// Throughout the week
// → Create tasks
// → Complete with recall
// → Track discipline (no tab switching!)
// → Log daily

// Weekly review
SYSTEM_V5.dailyLogs.forEach(log => {
  console.log(`${log.date}: ${log.summary}`)
  console.log(`  Deep work: ${SYSTEM_V5.formatSeconds(log.deepWorkTime)}`)
  console.log(`  Recall: ${log.recallAccuracy}%`)
  console.log(`  Discipline: ${log.disciplineScore}%`)
})
```

---

## 🔧 UI ELEMENTS

### Auto-Created Elements
| ID | Purpose | Created if missing |
|----|---------|--------------------|
| `task-list` | Task display & controls | Yes |
| `recall-box` | Recall scoring interface | Yes |
| `timer` | Countdown display | Yes (in top bar) |

### Optional Elements (Updated if exist)
| ID | What shows | Format |
|----|-----------|--------|
| `stat-hours` | Deep work time | "2h 30m" |
| `stat-tasks` | Tasks completed | "5" |
| `stat-recall` | Recall accuracy | "75%" |
| `stat-discipline` | Discipline score | "90%" |

---

## 🎨 STYLING

### Custom CSS Added
```css
/* Exam mode indicator (red pulse at top) */
body.exam-mode::after { ... }

/* Recall box animation */
.recall-box-v5.show { ... }

/* Timer styling */
#timer { ... }

/* Task list styling */
#task-list { ... }
```

No conflicts with v4 styles — uses different selectors.

---

## 📱 MOBILE / RESPONSIVE

✅ Works on all screen sizes
✅ Touch-friendly buttons
✅ Top bar elements responsive
✅ Task list scrollable
✅ Modal/recall box adapts

---

## 🔒 DATA PRIVACY

- **LocalStorage only** - No server, no cloud sync
- **Separate storage** - v4 and v5 data don't mix
- **No tracking** - No analytics or external requests
- **Delete anytime** - Simply clear localStorage

---

## ⚡ KEYBOARD SHORTCUTS

While v5 doesn't define shortcuts, you can add them:

```javascript
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 't') {
    // Ctrl+T: Toggle exam mode
    SYSTEM_V5.toggleExamMode()
  }
  if (e.ctrlKey && e.key === 'l') {
    // Ctrl+L: End day log
    SYSTEM_V5.endDayLog()
  }
})
```

---

## 🐛 TROUBLESHOOTING

### Timer not counting down?
```javascript
// Check if running
console.log(SYSTEM_V5.timerRunning)

// Verify value
console.log(SYSTEM_V5.timerValue)

// Try starting manually
SYSTEM_V5.startTimer(1)  // 1 minute test
```

### Recall box not appearing?
```javascript
// Verify task exists
console.log(SYSTEM_V5.tasks)

// Check active task
console.log(SYSTEM_V5.activeTaskId)

// Try manually
const task = SYSTEM_V5.tasks[0]
SYSTEM_V5.showRecallBox(task)
```

### Data not saving?
```javascript
// Check localStorage
console.log(localStorage.getItem('system_v5'))

// Manual save
SYSTEM_V5.saveToStorage()

// Check localStorage quota
console.log(navigator.storage)
```

### Exam mode not filtering?
```javascript
// Verify mode enabled
console.log(SYSTEM_V5.examMode)

// Check task types
SYSTEM_V5.tasks.forEach(t => console.log(t.type))
// Should have 'P1' or 'P2'

// Force re-render
SYSTEM_V5.renderTaskList()
```

---

## 📊 EXAMPLE DATA

### Sample Tasks Array
```javascript
[
  {
    id: "task_1700000000000_abc123",
    title: "Learn React Hooks",
    subject: "JavaScript",
    timeRequired: 60,
    type: "P1",
    status: "completed",
    recallDone: true,
    recallScore: "good",
    createdAt: 1700000000000,
    startedAt: 1700000060000,
    completedAt: 1700003660000
  },
  {
    id: "task_1700010000000_def456",
    title: "Algorithm Practice",
    subject: "DSA",
    timeRequired: 45,
    type: "P2",
    status: "active",
    recallDone: false,
    recallScore: null,
    createdAt: 1700010000000,
    startedAt: 1700010000000,
    completedAt: null
  }
]
```

### Sample Stats Object
```javascript
{
  deepWorkTime: 10800,    // 3 hours in seconds
  tasksCompleted: 5,
  recallAccuracy: 78,     // percentage
  disciplineScore: 85     // percentage
}
```

### Sample Daily Log
```javascript
{
  date: "2026-04-16",
  summary: "Strong study day, completed 3 priority tasks",
  tasksCompleted: 3,
  deepWorkTime: 9000,     // 2.5 hours
  recallAccuracy: 82,
  disciplineScore: 90,
  timestamp: 1745520000000
}
```

---

## 📞 GETTING HELP

1. **Check SYSTEM_V5_README.md** - Full docs
2. **Check SYSTEM_V5_EXAMPLES.js** - Code samples
3. **Check SYSTEM_V5_ARCHITECTURE.md** - Technical details
4. **Browser Console (F12)** - Real-time debugging
5. **localStorage** - Check persisted data

---

## 🚀 READY TO USE

✅ Open index.html in browser
✅ Open DevTools (F12)
✅ Run: `SYSTEM_V5.addTask("Test", "Demo", 5, "P1")`
✅ Run: `SYSTEM_V5.startTask(taskId)`
✅ Watch timer count down
✅ After 5 min: See recall box
✅ Success! v5 is working

---

**System upgraded from v4 to v4+v5 = Full execution engine** ✨
