# User Stories: Simple To-Do List App (TodoApp)

| Field | Value |
|---|---|
| **Product Name** | TodoApp — Simple To-Do List App |
| **Version** | 1.0 |
| **Date** | 2026-05-03 |
| **Status** | Draft |
| **Related PRD** | PRD-TodoApp.md v1.0 |
| **Related FRD** | FRD-TodoApp.md v1.0 |
| **Related Personas** | PERSONAS-TodoApp.md v1.0 |

---

## Table of Contents

1. [Epic 0: Task Creation (F0)](#epic-0-task-creation-f0)
2. [Epic 1: Task List View (F1)](#epic-1-task-list-view-f1)
3. [Epic 2: Task Completion (F2)](#epic-2-task-completion-f2)
4. [Epic 3: Task Deletion (F3)](#epic-3-task-deletion-f3)
5. [Epic 4: Local Persistence (F4)](#epic-4-local-persistence-f4)
6. [Story Index](#story-index)
7. [Priority Definitions](#priority-definitions)

---

## Epic 0: Task Creation (F0)

> Users can add new tasks instantly via keyboard or button. This is the primary entry point for all task data — the experience must be frictionless, with zero setup and immediate feedback.

---

### US-0.1: Add a Task by Pressing Enter

**As a** Marcus Webb, **I want to** type a task name and press Enter to add it, **so that** I can capture action items instantly without breaking my workflow.

**Acceptance Criteria:**
- [ ] A text input field is visible and focused automatically on page load
- [ ] Pressing Enter while the input is focused submits the task
- [ ] The new task appears at the top of the task list immediately after submission
- [ ] The input field is cleared and focus is returned to it after a successful submission
- [ ] No page reload or navigation occurs when submitting a task

**Priority:** P0 | **Feature Ref:** F0

---

### US-0.2: Add a Task by Clicking the Add Button

**As a** Priya Nair, **I want to** click an "Add" button to submit my task, **so that** I can add tasks comfortably using a mouse or touch device without relying on keyboard shortcuts.

**Acceptance Criteria:**
- [ ] An "Add" button is present adjacent to the task input field
- [ ] Clicking the Add button submits the task currently typed in the input field
- [ ] The new task appears at the top of the task list immediately after the button click
- [ ] The input field is cleared and focus is returned to it after a successful submission
- [ ] The Add button is accessible and has a visible label

**Priority:** P0 | **Feature Ref:** F0

---

### US-0.3: Reject Empty Task Submission

**As a** Marcus Webb, **I want to** be prevented from adding a blank task, **so that** my task list only contains meaningful entries and stays clean.

**Acceptance Criteria:**
- [ ] Submitting an empty input field (via Enter or button) does not create a task
- [ ] Submitting a whitespace-only input (spaces, tabs) does not create a task
- [ ] An inline validation message — "Task name cannot be empty" — appears below the input field on rejected submission
- [ ] The validation message clears as soon as the user begins typing
- [ ] The input field retains focus after a rejected submission
- [ ] No task is added to the task list or saved to `localStorage` on a rejected submission

**Priority:** P0 | **Feature Ref:** F0

---

### US-0.4: Reject Task Name That Is Too Long

**As a** Priya Nair, **I want to** be informed when my task name is too long to be saved, **so that** I know to shorten it before submitting.

**Acceptance Criteria:**
- [ ] Submitting a task name longer than 500 characters is rejected
- [ ] An inline validation message — "Task name must be 500 characters or fewer" — appears below the input field
- [ ] The task is not added to the task list or saved to `localStorage`
- [ ] The input field retains focus and content so the user can edit and resubmit
- [ ] Task names of exactly 500 characters are accepted

**Priority:** P0 | **Feature Ref:** F0

---

### US-0.5: Input Is Trimmed Before Submission

**As a** Marcus Webb, **I want to** have leading and trailing whitespace stripped from my task name automatically, **so that** I don't end up with tasks that have invisible padding characters.

**Acceptance Criteria:**
- [ ] Leading whitespace is removed from the task name before it is saved
- [ ] Trailing whitespace is removed from the task name before it is saved
- [ ] A task entered as "  Buy milk  " is stored and displayed as "Buy milk"
- [ ] A task that is only whitespace after trimming is rejected with the empty-task validation message

**Priority:** P0 | **Feature Ref:** F0

---

## Epic 1: Task List View (F1)

> The task list is the primary display surface of the application. It shows all tasks — active and completed — in real time, and adapts its display depending on whether any tasks exist.

---

### US-1.1: View All Tasks in a Scrollable List

**As a** Marcus Webb, **I want to** see all my tasks in a single scrollable list, **so that** I can quickly scan what's pending and what I've already completed.

**Acceptance Criteria:**
- [ ] All tasks are rendered in a vertical list on the main page
- [ ] The list is scrollable when the number of tasks exceeds the visible viewport height
- [ ] Each task row displays the task name as the primary text
- [ ] Active tasks (incomplete) are displayed with normal text styling
- [ ] The list renders on every page load with all previously saved tasks

**Priority:** P0 | **Feature Ref:** F1

---

### US-1.2: See Completed Tasks Visually Distinguished

**As a** Priya Nair, **I want to** see completed tasks styled differently from active tasks, **so that** I can immediately tell what I've finished and what still needs doing.

**Acceptance Criteria:**
- [ ] Completed tasks display with strikethrough text
- [ ] Completed tasks display with a muted or reduced-contrast text color
- [ ] Both strikethrough and color change are applied simultaneously (color is not the sole differentiator)
- [ ] Active tasks have no strikethrough and use normal text styling
- [ ] The visual distinction is immediately apparent without requiring explanation

**Priority:** P0 | **Feature Ref:** F1

---

### US-1.3: See Empty State When No Tasks Exist

**As a** Marcus Webb, **I want to** see a helpful message when my task list is empty, **so that** I understand the app is working and know where to add my first task.

**Acceptance Criteria:**
- [ ] When the task array is empty, the message "No tasks yet. Add one above!" is displayed in the list area
- [ ] The empty state message is shown on first load when no tasks have been created
- [ ] The empty state message is shown after all tasks have been deleted
- [ ] The empty state message disappears as soon as a task is added
- [ ] The empty state message is announced by screen readers via an `aria-live` region

**Priority:** P0 | **Feature Ref:** F1

---

### US-1.4: Task List Updates in Real Time

**As a** Priya Nair, **I want to** see the task list update instantly when I add, complete, or delete a task, **so that** the list always reflects my current state without requiring a page refresh.

**Acceptance Criteria:**
- [ ] A newly added task appears at the top of the list immediately after submission — no page reload required
- [ ] A task's visual style updates immediately when its completion toggle is clicked
- [ ] A deleted task is removed from the list immediately when the delete button is clicked
- [ ] The list maintains newest-first order (most recently added task at top)
- [ ] No perceptible delay between user action and list update

**Priority:** P0 | **Feature Ref:** F1

---

### US-1.5: Each Task Row Shows Completion Toggle and Delete Control

**As a** Marcus Webb, **I want to** see a completion checkbox and a delete button on every task, **so that** I can act on any task directly from the list without additional navigation.

**Acceptance Criteria:**
- [ ] Every task row includes a completion checkbox or toggle control
- [ ] Every task row includes a delete button or icon
- [ ] Both controls are visible without hovering or expanding the task row
- [ ] Delete buttons have an accessible label (e.g., `aria-label="Delete task: [task name]"`)
- [ ] All interactive controls on each task row are keyboard-accessible via Tab and Enter/Space

**Priority:** P0 | **Feature Ref:** F1

---

## Epic 2: Task Completion (F2)

> Users can mark tasks as done (or un-done). Completion is a bidirectional toggle that updates the task's visual state immediately and persists the change so it survives page refreshes.

---

### US-2.1: Mark a Task as Complete

**As a** Marcus Webb, **I want to** click a checkbox to mark a task as complete, **so that** I get a visible sense of progress as I work through my list.

**Acceptance Criteria:**
- [ ] Clicking the completion checkbox on an active task marks it as complete
- [ ] The task name immediately displays with strikethrough text and muted color on completion
- [ ] The checkbox reflects the checked state visually
- [ ] No page reload is required for the visual update to take effect
- [ ] The completed state is saved to `localStorage` immediately after the toggle

**Priority:** P0 | **Feature Ref:** F2

---

### US-2.2: Unmark a Completed Task (Toggle Back to Incomplete)

**As a** Priya Nair, **I want to** click the checkbox on a completed task to mark it as incomplete again, **so that** I can correct a mistaken completion or reopen a task I need to revisit.

**Acceptance Criteria:**
- [ ] Clicking the completion checkbox on a completed task marks it as incomplete
- [ ] The strikethrough and muted color styling are removed immediately on toggle back
- [ ] The checkbox returns to an unchecked visual state
- [ ] The incomplete state is saved to `localStorage` immediately after the toggle
- [ ] The task remains in its original position in the list after being toggled back

**Priority:** P0 | **Feature Ref:** F2

---

### US-2.3: Completion State Persists Across Page Refreshes

**As a** Marcus Webb, **I want to** see my tasks' completion state preserved when I refresh the page or reopen my browser, **so that** I don't have to re-check tasks I've already completed.

**Acceptance Criteria:**
- [ ] A task marked complete before a page refresh is shown as complete after the refresh
- [ ] A task marked incomplete before a page refresh is shown as incomplete after the refresh
- [ ] Completion state is loaded from `localStorage` correctly on every page initialisation
- [ ] No task loses its `completed` value across normal browser close/reopen cycles

**Priority:** P0 | **Feature Ref:** F2

---

## Epic 3: Task Deletion (F3)

> Users can permanently remove tasks from the list. Deletion is instant and irreversible in v1 — no confirmation dialog, no undo. This keeps the interaction model as simple as possible.

---

### US-3.1: Delete a Task from the List

**As a** Marcus Webb, **I want to** click a delete button on a task to remove it permanently, **so that** I can keep my list clean and free of stale or cancelled tasks.

**Acceptance Criteria:**
- [ ] Each task row displays a delete button or icon
- [ ] Clicking the delete button removes the task from the list immediately
- [ ] No confirmation dialog is shown before deletion (v1 simplicity constraint)
- [ ] The deleted task is removed from `localStorage` immediately
- [ ] The list re-renders correctly with the remaining tasks after deletion

**Priority:** P0 | **Feature Ref:** F3

---

### US-3.2: Deletion Is Permanent with No Undo

**As a** Priya Nair, **I want to** understand that deleting a task is final, **so that** I am not confused when a deleted task does not reappear.

**Acceptance Criteria:**
- [ ] Deleted tasks are removed from both the in-memory task array and `localStorage`
- [ ] A deleted task does not reappear after a page refresh
- [ ] No undo option or recovery mechanism is offered (v1 scope)
- [ ] The delete action removes exactly one task — no batch deletion occurs via this control

**Priority:** P0 | **Feature Ref:** F3

---

### US-3.3: Empty State Shown After Last Task Is Deleted

**As a** Marcus Webb, **I want to** see the empty state message after I delete my last task, **so that** I know the list is clear and can see where to add a new task.

**Acceptance Criteria:**
- [ ] Deleting the last remaining task causes the empty state message to appear immediately
- [ ] The empty state message reads "No tasks yet. Add one above!"
- [ ] The task input field remains visible and functional after the list becomes empty
- [ ] No error or broken UI state is produced by deleting the final task

**Priority:** P0 | **Feature Ref:** F3

---

## Epic 4: Local Persistence (F4)

> All task data is saved to the browser's `localStorage` so it survives page refreshes, tab closures, and browser restarts. No backend or account is required. The app must degrade gracefully if storage is unavailable.

---

### US-4.1: Tasks Are Loaded from Storage on Page Open

**As a** Marcus Webb, **I want to** open the app and immediately see all the tasks I previously added, **so that** I can trust the app to remember my work without any manual saving on my part.

**Acceptance Criteria:**
- [ ] On page load, the app reads from `localStorage` key `"todoapp_tasks"`
- [ ] All previously saved tasks are rendered in the task list before the user interacts with anything
- [ ] Tasks are displayed in the correct order (newest first) as they were when the page was last closed
- [ ] If `localStorage` returns `null` (no prior data), the app renders the empty state message with no error

**Priority:** P0 | **Feature Ref:** F4

---

### US-4.2: Tasks Are Saved Automatically on Every Change

**As a** Priya Nair, **I want to** have my tasks saved automatically every time I add, complete, or delete one, **so that** I never have to manually save and never lose work by forgetting to save.

**Acceptance Criteria:**
- [ ] Creating a new task immediately writes the updated task array to `localStorage`
- [ ] Toggling a task's completion state immediately writes the updated task array to `localStorage`
- [ ] Deleting a task immediately writes the updated task array to `localStorage`
- [ ] No explicit "Save" button exists — all saves are automatic
- [ ] Data written to storage is the full task array serialised as JSON under the key `"todoapp_tasks"`

**Priority:** P0 | **Feature Ref:** F4

---

### US-4.3: Tasks Survive Page Refresh and Browser Restart

**As a** Marcus Webb, **I want to** close my browser and reopen it the next day to find my task list exactly as I left it, **so that** I can use the app as a reliable daily scratchpad.

**Acceptance Criteria:**
- [ ] All tasks present before a page refresh are present and correct after the refresh
- [ ] All tasks present before closing the browser are present and correct after reopening
- [ ] Task names, completion states, and list order are all preserved across sessions
- [ ] Zero tasks are lost during a normal browser close/reopen cycle

**Priority:** P0 | **Feature Ref:** F4

---

### US-4.4: Warning Banner When Storage Is Unavailable at Load

**As a** Priya Nair, **I want to** be told clearly if the app cannot save my tasks, **so that** I am not surprised to find my task list empty the next time I open my browser.

**Acceptance Criteria:**
- [ ] On page load, the app detects whether `localStorage` is available
- [ ] If `localStorage` is unavailable (e.g., blocked in private browsing), a persistent warning banner is displayed: "Storage is unavailable. Tasks will not be saved between sessions."
- [ ] The warning banner remains visible until the storage condition is resolved — it does not auto-dismiss
- [ ] The app continues to function in-memory for the current session even when storage is unavailable
- [ ] Tasks can still be added, completed, and deleted within the session even without persistence

**Priority:** P0 | **Feature Ref:** F4

---

### US-4.5: Non-Blocking Warning When Storage Write Fails

**As a** Marcus Webb, **I want to** be notified if a task change could not be saved, **so that** I know the change may not survive a page refresh without my task list crashing or disappearing.

**Acceptance Criteria:**
- [ ] If `localStorage.setItem` throws an error during a create, complete, or delete operation, a non-blocking banner is displayed: "Changes could not be saved — storage unavailable"
- [ ] The warning banner auto-dismisses after 5 seconds
- [ ] The app does not crash and the in-memory task list remains intact and usable
- [ ] The task action (create/complete/delete) is still reflected in the UI for the current session even if the save failed
- [ ] The banner does not block or obscure the task input or task list

**Priority:** P0 | **Feature Ref:** F4

---

### US-4.6: Warning When Storage Quota Is Exceeded

**As a** Priya Nair, **I want to** see a specific message if my storage is full and a task could not be saved, **so that** I know I need to delete some tasks to free space rather than thinking the app is broken.

**Acceptance Criteria:**
- [ ] If `localStorage.setItem` throws a `QuotaExceededError`, a non-blocking banner is displayed: "Storage full — task not saved"
- [ ] The banner auto-dismisses after 5 seconds
- [ ] The quota-exceeded banner message is distinct from the general write-failure message
- [ ] The app does not crash on a quota exceeded error
- [ ] When a quota exceeded error occurs, the task input field is NOT cleared — the failed task name is retained so the user can delete tasks to free space and resubmit without retyping

**Priority:** P0 | **Feature Ref:** F4

---

### US-4.7: Graceful Recovery from Corrupt Storage Data

**As a** Marcus Webb, **I want to** start with a clean, empty task list if my saved data is unreadable, **so that** the app never gets stuck in a broken state because of corrupted browser storage.

**Acceptance Criteria:**
- [ ] If the data in `localStorage` cannot be parsed as JSON, the app initialises with an empty task array
- [ ] If the parsed data is not a JavaScript array, the app initialises with an empty task array
- [ ] The parse error is logged to the browser console for debugging but no user-facing error is shown
- [ ] The app renders the empty state message normally and the user can immediately add new tasks
- [ ] New tasks added after a corrupt-data recovery are saved correctly to `localStorage`, overwriting the corrupt data

**Priority:** P0 | **Feature Ref:** F4

---

## Story Index

| Story ID | Title | Persona | Priority | Feature Ref |
|---|---|---|---|---|
| US-0.1 | Add a Task by Pressing Enter | Marcus Webb | P0 | F0 |
| US-0.2 | Add a Task by Clicking the Add Button | Priya Nair | P0 | F0 |
| US-0.3 | Reject Empty Task Submission | Marcus Webb | P0 | F0 |
| US-0.4 | Reject Task Name That Is Too Long | Priya Nair | P0 | F0 |
| US-0.5 | Input Is Trimmed Before Submission | Marcus Webb | P0 | F0 |
| US-1.1 | View All Tasks in a Scrollable List | Marcus Webb | P0 | F1 |
| US-1.2 | See Completed Tasks Visually Distinguished | Priya Nair | P0 | F1 |
| US-1.3 | See Empty State When No Tasks Exist | Marcus Webb | P0 | F1 |
| US-1.4 | Task List Updates in Real Time | Priya Nair | P0 | F1 |
| US-1.5 | Each Task Row Shows Completion Toggle and Delete Control | Marcus Webb | P0 | F1 |
| US-2.1 | Mark a Task as Complete | Marcus Webb | P0 | F2 |
| US-2.2 | Unmark a Completed Task (Toggle Back to Incomplete) | Priya Nair | P0 | F2 |
| US-2.3 | Completion State Persists Across Page Refreshes | Marcus Webb | P0 | F2 |
| US-3.1 | Delete a Task from the List | Marcus Webb | P0 | F3 |
| US-3.2 | Deletion Is Permanent with No Undo | Priya Nair | P0 | F3 |
| US-3.3 | Empty State Shown After Last Task Is Deleted | Marcus Webb | P0 | F3 |
| US-4.1 | Tasks Are Loaded from Storage on Page Open | Marcus Webb | P0 | F4 |
| US-4.2 | Tasks Are Saved Automatically on Every Change | Priya Nair | P0 | F4 |
| US-4.3 | Tasks Survive Page Refresh and Browser Restart | Marcus Webb | P0 | F4 |
| US-4.4 | Warning Banner When Storage Is Unavailable at Load | Priya Nair | P0 | F4 |
| US-4.5 | Non-Blocking Warning When Storage Write Fails | Marcus Webb | P0 | F4 |
| US-4.6 | Warning When Storage Quota Is Exceeded | Priya Nair | P0 | F4 |
| US-4.7 | Graceful Recovery from Corrupt Storage Data | Marcus Webb | P0 | F4 |

**Total Stories: 23** across 5 Epics

---

## Priority Definitions

| Priority | Label | Definition |
|---|---|---|
| **P0** | Critical | Must be in v1 MVP; the app is not shippable without it |
| **P1** | High | Important; should be in v1 if capacity allows |
| **P2** | Medium | Nice to have; defer to v2 if needed |
| **P3** | Low | Future consideration only |

> All 23 stories in this document are **P0**. This reflects the intentionally narrow v1 scope defined in PRD-TodoApp.md — every story maps to a core MVP feature (F0–F4) and every feature is classified as P0 Critical.

---

*Document generated: 2026-05-03*
*Source: PRD-TodoApp.md v1.0, FRD-TodoApp.md v1.0, PERSONAS-TodoApp.md v1.0*
