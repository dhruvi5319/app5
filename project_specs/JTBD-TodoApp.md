# JTBD: Simple To-Do List App (TodoApp)

| Field | Value |
|---|---|
| **Product Name** | TodoApp — Simple To-Do List App |
| **Version** | 1.0 |
| **Date** | 2026-05-03 |
| **Status** | Draft |
| **Related Personas** | PERSONAS-TodoApp.md (PER-01, PER-02) |
| **Related PRD** | PRD-TodoApp.md |

---

## JTBD Summary Table

| JTBD-ID | Persona | Job Statement (abbreviated) | Priority |
|---|---|---|---|
| JTBD-01.1 | PER-01: Marcus Webb | Capture a task the instant it surfaces, without leaving my flow | P0 |
| JTBD-01.2 | PER-01: Marcus Webb | Assess outstanding work and decide what to act on next | P0 |
| JTBD-01.3 | PER-01: Marcus Webb | Confirm completed work and prune stale tasks to keep the list current | P0 |
| JTBD-01.4 | PER-01: Marcus Webb | Trust that tomorrow's session starts exactly where today's left off | P0 |
| JTBD-02.1 | PER-02: Priya Nair | Capture tasks across contexts without interrupting what I'm already doing | P0 |
| JTBD-02.2 | PER-02: Priya Nair | Maintain a focused, clutter-free list that reflects my real priorities | P0 |
| JTBD-02.3 | PER-02: Priya Nair | Signal progress by toggling tasks complete and back as my situation changes | P0 |
| JTBD-02.4 | PER-02: Priya Nair | Access my full task list on any screen without losing data or usability | P0 |

---

## PER-01: Marcus Webb — Jobs

### JTBD-01.1: Zero-Friction Task Capture

**Job Statement:**
When a new action item surfaces during a client call, email review, or document edit, I want to capture it immediately with a single keystroke, so I can stay in my current task without losing the thread.

**Current Alternatives:**
- Types into a plain text file open in a browser tab
- Writes on a sticky note beside the monitor
- Pastes into a Slack message to himself

**Hiring Criteria:**
- Task input field is visible and focused without any extra navigation
- Task is submitted and confirmed with a single Enter keystroke — no mouse required
- No sign-up, configuration, or loading delay before the first task can be added
- Empty submission is silently rejected so accidental presses don't pollute the list

**Success Measure:** Marcus adds his first task within 10 seconds of opening the app for the first time, using only the keyboard.

**Related Features:** F0, F4
**Priority:** P0

---

### JTBD-01.2: Rapid Daily Prioritization

**Job Statement:**
When I sit down to start my workday or return from a meeting, I want to scan all my outstanding tasks in a single uncluttered view, so I can decide what to work on next without switching contexts.

**Current Alternatives:**
- Opens 2–3 sticky notes and a plain text file and manually scans each
- Reviews inbox to reconstruct what's pending
- Relies on memory, which causes items to be forgotten

**Hiring Criteria:**
- All active tasks are visible in a single scrollable list with no filtering or tab switching required
- Completed and incomplete tasks are visually distinct at a glance (e.g., strikethrough, muted color)
- List updates instantly when tasks are added, completed, or deleted — no reload needed
- No visual noise from tags, dates, priority labels, or category headers

**Success Measure:** Marcus can identify his top-priority pending task within 15 seconds of opening the app, without reading any instructions or navigating any menus.

**Related Features:** F1, F2
**Priority:** P0

---

### JTBD-01.3: Satisfying Completion and List Hygiene

**Job Statement:**
When I finish a piece of work or cancel a task, I want to mark it done or remove it cleanly, so I can maintain a list that only shows items that still need action.

**Current Alternatives:**
- Deletes the line from a plain text file (no visible completion moment)
- Crumples the sticky note — tactile but the "done" state is lost
- Leaves old tasks in the list until it becomes too cluttered to read

**Hiring Criteria:**
- A single click or keystroke marks a task complete with immediate visual feedback
- A separate delete action permanently removes the task from the list and storage
- Completion and deletion each require no more than 2 interactions
- No confirmation dialog for delete (v1 simplicity — single action is sufficient)

**Success Measure:** Marcus can mark a task complete and delete a stale task in under 5 seconds combined, without consulting documentation.

**Related Features:** F2, F3
**Priority:** P0

---

### JTBD-01.4: Reliable Cross-Session Continuity

**Job Statement:**
When I close my browser at the end of the day or my machine restarts unexpectedly, I want my full task list to be exactly as I left it when I reopen the app, so I can resume work immediately without reconstructing what I was tracking.

**Current Alternatives:**
- Leaves the browser tab pinned and never closes it (fragile — any crash loses everything)
- Copies the list into an email draft as a backup before closing
- Accepts the loss and rebuilds from memory the next morning

**Hiring Criteria:**
- All tasks — including completion states — are saved automatically on every action (no manual save)
- List fully restores on page reload with zero user intervention
- Persistence works across browser restarts, not just page refreshes
- App degrades gracefully (clear warning) if localStorage is unavailable rather than silently losing data

**Success Measure:** Zero tasks lost across a standard browser close and reopen cycle; list state is 100% identical before and after.

**Related Features:** F4
**Priority:** P0

---

## PER-02: Priya Nair — Jobs

### JTBD-02.1: Frictionless Capture Between Activities

**Job Statement:**
When a task, errand, or idea comes to mind while I'm switching between studying, commuting, or browsing, I want to add it to my list in under 5 seconds without navigating away from what I'm doing, so I can offload it from memory and return to my current activity immediately.

**Current Alternatives:**
- Sends herself a WhatsApp message as a reminder
- Types into the iOS Notes app on her phone
- Mentally defers it and sometimes forgets

**Hiring Criteria:**
- The task input field is immediately visible when the app opens — no navigation, no onboarding modal
- A task can be added by typing and pressing Enter with no other required fields (no due date, no category)
- The app opens and is ready to accept input in under 1 second
- Works equally well on a laptop keyboard and a mobile soft keyboard

**Success Measure:** Priya adds a task in under 5 seconds from app open on both desktop and a 375px mobile viewport without reading any instructions.

**Related Features:** F0
**Priority:** P0

---

### JTBD-02.2: Focused List That Reflects Real Priorities

**Job Statement:**
When I open the app to review what I need to do today, I want to see a clean, uncluttered list that shows only the information I entered, so I can scan my priorities quickly without processing visual noise or navigating feature-heavy menus.

**Current Alternatives:**
- Uses Any.do but dismisses prompts for due dates, recurring tasks, and categories before she can see her list
- Maintains a physical notebook but can't easily reorder or check off items
- Uses the iOS Reminders app but finds the sidebar navigation slow on mobile

**Hiring Criteria:**
- Task list shows task name and completion status — nothing else by default
- No mandatory metadata fields (due date, category, priority) between the user and the list
- Empty state is friendly and clearly prompts the first action
- Completed and active tasks are visually distinct without requiring a filter toggle

**Success Measure:** Priya can review her full task list and identify her next action within 20 seconds of opening the app, with no learning curve after first use.

**Related Features:** F1, F2, F3
**Priority:** P0

---

### JTBD-02.3: Fluid Progress Tracking With Reversibility

**Job Statement:**
When my plan changes mid-day — an errand is delayed, an assignment submission is rescheduled — I want to toggle a task's completion status back to incomplete without losing it, so I can keep my list accurate without deleting and re-entering the task.

**Current Alternatives:**
- Deletes the task and re-types it when it becomes active again
- Leaves it checked even though it's not truly done (list becomes unreliable)
- Creates a duplicate entry for the revived task

**Hiring Criteria:**
- Completion checkbox or toggle is clearly visible on each task item
- A single click toggles between complete and incomplete states
- Toggled state is immediately reflected visually with no delay
- Toggled completion state is persisted — remains correct after page refresh

**Success Measure:** Priya can toggle a task from complete back to incomplete and confirm the change survived a page reload, in under 3 interactions total.

**Related Features:** F2, F4
**Priority:** P0

---

### JTBD-02.4: Consistent Experience Across Screens and Sessions

**Job Statement:**
When I switch from my laptop to my phone, or reopen the app after a browser restart, I want to find my task list intact and the interface usable on whatever screen I'm on, so I can continue managing my tasks without data loss or an awkward layout.

**Current Alternatives:**
- Uses a separate app on her phone because the laptop app doesn't work well on mobile
- Screenshots her task list before closing the browser as a backup
- Accepts data loss and rebuilds the list when switching devices

**Hiring Criteria:**
- All task data is restored from localStorage on every page load without user action
- Layout reflows and remains fully usable on a 375px wide mobile viewport (touch targets, readable text, scrollable list)
- No horizontal scrolling or hidden UI elements on small screens
- App is fully functional offline after initial load

**Success Measure:** Priya opens the app on a 375px mobile viewport after a browser restart and finds her full task list intact, with all actions (add, complete, delete) reachable without scrolling horizontally.

**Related Features:** F1, F4
**Priority:** P0

---

## Outcome-to-Feature Traceability

| JTBD-ID | Related Feature(s) | Expected Outcome |
|---|---|---|
| JTBD-01.1 | F0, F4 | Task captured in ≤ 10 seconds via keyboard; no sign-up gate |
| JTBD-01.2 | F1, F2 | All tasks visible in a single view; completion state visually distinct |
| JTBD-01.3 | F2, F3 | Complete + delete achievable in ≤ 2 interactions each |
| JTBD-01.4 | F4 | 100% task state restoration after browser close/reopen |
| JTBD-02.1 | F0 | Task added in ≤ 5 seconds on desktop and 375px mobile |
| JTBD-02.2 | F1, F2, F3 | List shows only task name + status; no mandatory metadata |
| JTBD-02.3 | F2, F4 | Toggle completion reversible; state survives page reload |
| JTBD-02.4 | F1, F4 | List intact after restart; layout usable on 375px viewport |

**Feature Coverage Check:**

| Feature ID | Feature Name | Covered By |
|---|---|---|
| F0 | Task Creation | JTBD-01.1, JTBD-02.1 |
| F1 | Task List View | JTBD-01.2, JTBD-02.2, JTBD-02.4 |
| F2 | Task Completion | JTBD-01.2, JTBD-01.3, JTBD-02.2, JTBD-02.3 |
| F3 | Task Deletion | JTBD-01.3, JTBD-02.2 |
| F4 | Local Persistence | JTBD-01.1, JTBD-01.4, JTBD-02.3, JTBD-02.4 |

---

## NaC Preview

Candidate Natural Acceptance Criteria derived from job success measures. These will be refined in STORY-MAP.

| JTBD-ID | Outcome | Candidate Natural Acceptance Criteria |
|---|---|---|
| JTBD-01.1 | Task captured in ≤ 10 seconds via keyboard | Given a first-time user opens the app, when they type a task name and press Enter, then the task appears in the list in under 10 seconds with no sign-up required |
| JTBD-01.2 | All tasks visible in single view; states distinct | Given tasks exist with mixed completion states, when the user opens the app, then all tasks are visible in one scrollable list with completed tasks visually distinct from active tasks |
| JTBD-01.3 | Complete + delete in ≤ 2 interactions each | Given a task exists, when the user clicks the completion toggle, then the task is marked complete in 1 interaction; when the user clicks delete, the task is permanently removed in 1 interaction |
| JTBD-01.4 | 100% state restoration after browser close/reopen | Given the user has tasks saved, when they close the browser and reopen the app, then all tasks and their completion states are identical to the pre-close state |
| JTBD-02.1 | Task added in ≤ 5 seconds on 375px mobile | Given the app is open on a 375px viewport, when the user types a task and submits, then the task appears in the list in under 5 seconds with no navigation required |
| JTBD-02.2 | List shows only task name + status; no extra fields | Given the task list is displayed, then each task row shows only the task name and a completion control — no date, category, or priority fields are visible |
| JTBD-02.3 | Toggle completion reversible; survives reload | Given a completed task exists, when the user toggles it back to incomplete and refreshes the page, then the task remains in incomplete state |
| JTBD-02.4 | List intact on 375px viewport after restart | Given tasks were saved on desktop, when the user opens the app on a 375px mobile viewport, then all tasks load and all actions (add, complete, delete) are accessible without horizontal scrolling |

---

*Document generated: 2026-05-03*
*Source: PERSONAS-TodoApp.md v1.0, PRD-TodoApp.md v1.0*
*Next: STORY-MAP-TodoApp.md, UserStories-TodoApp.md*
