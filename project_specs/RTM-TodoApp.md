# Requirements Traceability Matrix: Simple To-Do List App (TodoApp)

**Version:** 1.0  
**Date:** 2026-05-03  
**Status:** Draft  
**Project Acronym:** TodoApp

---

## Table of Contents

1. [Overview](#1-overview)
2. [Requirements Summary](#2-requirements-summary)
3. [Traceability Matrix](#3-traceability-matrix)
4. [Requirements Detail](#4-requirements-detail)
5. [Test Case Coverage](#5-test-case-coverage)
6. [Change Management](#6-change-management)
7. [Approval](#7-approval)

---

## 1. Overview

This Requirements Traceability Matrix (RTM) provides bidirectional traceability between all TodoApp specification documents. It ensures every product requirement is implemented in the technical architecture, exercised by at least one user story, and covered by a corresponding test case. The RTM serves as the authoritative cross-reference for the v1 MVP release.

TodoApp is a single-user, client-side browser application for personal task management. Its v1 scope is deliberately narrow: five features (F0–F4) covering core CRUD operations (Create, Read, Update, Delete) and local persistence via `localStorage`. This constrained scope means every requirement in this RTM is P0 Critical — there are no optional features in the v1 release.

Traceability is maintained at four levels:

- **PRD Level** — Feature requirements defined in PRD-TodoApp.md (F0–F4). These represent the product intent: what the user must be able to do.
- **FRD Level** — Functional requirements defined in FRD-TodoApp.md. These decompose PRD features into precise behavioral specifications, including inputs, outputs, validation rules, and error states.
- **TechArch Level** — Implementation specifications defined in TechArch-TodoApp.md. These define the technical contracts: JavaScript function signatures, data model schemas, component responsibilities, and error codes.
- **UserStory Level** — Acceptance-criteria-backed user stories defined in UserStories-TodoApp.md (US-0.1 through US-4.7). These are the testable units of delivery.

Any change to a requirement at any level must be propagated to all linked levels in this matrix. All 23 user stories, 5 PRD features, 5 FRD feature specifications, and all TechArch function contracts are fully represented below.

---

## 2. Requirements Summary

### PRD Features (Source: PRD-TodoApp.md)

- **F0 — Task Creation (P0):** Users add tasks by typing a name and pressing Enter or clicking Add. Tasks appear immediately at the top of the list. Empty and oversized inputs are rejected with inline feedback.
- **F1 — Task List View (P0):** All tasks rendered in a scrollable list; completed tasks visually distinguished; empty state shown when no tasks exist; list updates in real time.
- **F2 — Task Completion (P0):** Bidirectional checkbox toggle per task item; completion state persisted to `localStorage` immediately; survives page refresh.
- **F3 — Task Deletion (P0):** Permanent, no-confirmation delete per task item; task removed from in-memory array and `localStorage` immediately; empty state shown when last task deleted.
- **F4 — Local Persistence (P0):** Tasks serialised as JSON to `localStorage` on every mutation; loaded on page initialisation; graceful degradation when storage is unavailable or corrupt.

### FRD Functional Specifications (Source: FRD-TodoApp.md)

- **F0 specs:** Input trimming, empty rejection (`ERR_EMPTY_TASK`), max-length rejection (`ERR_TASK_TOO_LONG`), UUID/timestamp ID generation, `createdAt` timestamp, prepend-to-array insertion, post-submit field clear.
- **F1 specs:** Array iteration and DOM render, empty-state conditional, real-time re-render on state change, task item structure (name + checkbox + delete), error fallback (`ERR_RENDER_FAILED`).
- **F2 specs:** `completed` boolean flip via `toggleTask()`, DOM class toggle, immediate `localStorage` write, error on unknown ID (`ERR_TASK_NOT_FOUND`).
- **F3 specs:** `array.filter` removal via `deleteTask()`, DOM element removal, empty-state trigger after last deletion, immediate `localStorage` write.
- **F4 specs:** `isStorageAvailable()` probe, `loadTasks()` with JSON parse and array validation, `saveTasks()` with quota/write error handling, storage key `"todoapp_tasks"`, graceful fallback to `[]` on all failure modes.

### TechArch Specifications (Source: TechArch-TodoApp.md)

- **Component contracts:** `index.html` DOM structure (form `#task-form`, list `#task-list`, banner `#banner`, validation `#validation-msg`, empty state `#empty-state`); `styles.css` classes (`.task-item`, `.task-item--completed`, `.banner--persistent`, `.banner--dismissible`, `.validation-msg--visible`); `app.js` module sections (Constants, State, Storage, Task, Render, Event Handlers, Init).
- **Data model:** Single `Task` entity — fields `id` (string, UUID), `name` (string, 1–500 chars), `completed` (boolean, default `false`), `createdAt` (ISO 8601 string). Storage key `"todoapp_tasks"`, value type `Task[]` serialised as JSON.
- **Function contracts:** `initApp()`, `isStorageAvailable()`, `loadTasks()`, `saveTasks()`, `addTask()`, `toggleTask()`, `deleteTask()`, `renderTaskList()`, `renderTaskItem()`, `showBanner()`, `clearBanner()`, `showValidationMsg()`, `clearValidationMsg()`, `generateId()`, `validateTaskName()`, `handleFormSubmit()`, `handleTaskListClick()`.
- **Error codes:** `ERR_EMPTY_TASK`, `ERR_TASK_TOO_LONG`, `ERR_STORAGE_READ`, `ERR_STORAGE_WRITE`, `ERR_STORAGE_QUOTA`, `ERR_STORAGE_PARSE`, `ERR_TASK_NOT_FOUND`, `ERR_RENDER_FAILED`.
- **Security:** XSS prevention via `textContent` (never `innerHTML`) for all user-supplied strings; recommended CSP `<meta>` header; no authentication; `localStorage` origin-scoped.

### User Stories (Source: UserStories-TodoApp.md)

- **Epic 0 (F0):** US-0.1 (Enter key submit), US-0.2 (Add button submit), US-0.3 (empty rejection), US-0.4 (too-long rejection), US-0.5 (input trimming) — 5 stories.
- **Epic 1 (F1):** US-1.1 (scrollable list), US-1.2 (completed styling), US-1.3 (empty state), US-1.4 (real-time updates), US-1.5 (per-row controls) — 5 stories.
- **Epic 2 (F2):** US-2.1 (mark complete), US-2.2 (toggle back to incomplete), US-2.3 (completion state persists) — 3 stories.
- **Epic 3 (F3):** US-3.1 (delete task), US-3.2 (permanent deletion, no undo), US-3.3 (empty state after last deletion) — 3 stories.
- **Epic 4 (F4):** US-4.1 (load on open), US-4.2 (auto-save on change), US-4.3 (survive refresh/restart), US-4.4 (unavailable banner), US-4.5 (write-fail banner), US-4.6 (quota exceeded banner), US-4.7 (corrupt data recovery) — 7 stories.
- **Total: 23 stories, all P0 Critical.**

### Non-Functional Requirements (Source: PRD-TodoApp.md, FRD-TodoApp.md)

- **Performance:** Page load < 1 second; task list re-render within 16ms for up to 500 tasks; no network calls post-load.
- **Responsiveness:** Functional at 320px–2560px viewports; touch targets ≥ 44×44px; no horizontal scroll.
- **Accessibility:** Keyboard-navigable; auto-focus on input; ARIA labels on delete buttons; `aria-live` regions for validation and empty state; strikethrough required (color not sole differentiator).
- **Browser Support:** Chrome, Firefox, Safari, Edge (current versions); no IE11.
- **Offline:** Fully functional offline after initial load; no external dependencies.
- **Storage:** No degradation up to 500 tasks (~100KB, well within 5MB `localStorage` limit).
- **Code Simplicity:** No build tools, bundlers, or external dependencies.

---

## 3. Traceability Matrix

### 3.1 PRD → FRD → TechArch → User Story

| PRD Feature | FRD Specification | TechArch Contract | User Story |
|-------------|-------------------|-------------------|------------|
| F0: Task Creation | Task Creation (F0) — input trim, empty rejection, max-length rejection, ID generation, timestamp, prepend, field clear | `addTask()`, `validateTaskName()`, `generateId()`, `handleFormSubmit()`, `showValidationMsg()`, `clearValidationMsg()`, `ERR_EMPTY_TASK`, `ERR_TASK_TOO_LONG` | US-0.1 |
| F0: Task Creation | Task Creation (F0) — submit via button | `handleFormSubmit()`, `#task-form` submit event | US-0.2 |
| F0: Task Creation | Task Creation (F0) — empty/whitespace rejection, inline validation | `validateTaskName()`, `showValidationMsg()`, `ERR_EMPTY_TASK` | US-0.3 |
| F0: Task Creation | Task Creation (F0) — max-length (500 char) rejection | `validateTaskName()`, `ERR_TASK_TOO_LONG`, `MAX_TASK_NAME_LENGTH` | US-0.4 |
| F0: Task Creation | Task Creation (F0) — whitespace trim before storage | `validateTaskName()`, `addTask()` (trims internally) | US-0.5 |
| F1: Task List View | Task List View (F1) — full array render, scrollable list, task name display | `renderTaskList()`, `renderTaskItem()`, `#task-list` | US-1.1 |
| F1: Task List View | Task List View (F1) — `.task-item--completed` styling (strikethrough + muted color) | `.task-item--completed` CSS class, `renderTaskItem()` | US-1.2 |
| F1: Task List View | Task List View (F1) — empty state when array is empty | `renderTaskList()`, `#empty-state`, `"No tasks yet. Add one above!"` | US-1.3 |
| F1: Task List View | Task List View (F1) — real-time re-render on every state change | `renderTaskList()` called after `addTask()`, `toggleTask()`, `deleteTask()` | US-1.4 |
| F1: Task List View | Task List View (F1) — per-row completion toggle and delete button | `renderTaskItem()`, `handleTaskListClick()`, `aria-label` on delete | US-1.5 |
| F2: Task Completion | Task Completion (F2) — toggle `completed` boolean, apply `.task-item--completed` | `toggleTask()`, `handleTaskListClick()`, `saveTasks()` | US-2.1 |
| F2: Task Completion | Task Completion (F2) — bidirectional toggle, remove `.task-item--completed` | `toggleTask()`, `handleTaskListClick()`, `saveTasks()` | US-2.2 |
| F2: Task Completion | Task Completion (F2) — `completed` persisted to `localStorage` on toggle | `toggleTask()` → `saveTasks()` → `localStorage.setItem("todoapp_tasks")` | US-2.3 |
| F3: Task Deletion | Task Deletion (F3) — `array.filter` removal, DOM element removed | `deleteTask()`, `handleTaskListClick()`, `saveTasks()` | US-3.1 |
| F3: Task Deletion | Task Deletion (F3) — permanent removal from in-memory array and `localStorage` | `deleteTask()` → `saveTasks()`, no undo mechanism | US-3.2 |
| F3: Task Deletion | Task Deletion (F3) — empty state shown when array length reaches 0 | `deleteTask()` → `renderTaskList()` → `#empty-state` | US-3.3 |
| F4: Local Persistence | Local Persistence (F4) — `loadTasks()` on `DOMContentLoaded` | `initApp()` → `loadTasks()` → `localStorage.getItem("todoapp_tasks")` | US-4.1 |
| F4: Local Persistence | Local Persistence (F4) — `saveTasks()` called after every mutation | `addTask()`, `toggleTask()`, `deleteTask()` all call `saveTasks()` | US-4.2 |
| F4: Local Persistence | Local Persistence (F4) — task array JSON-serialised to `"todoapp_tasks"` key | `saveTasks()`, `JSON.stringify`, `localStorage.setItem("todoapp_tasks")` | US-4.3 |
| F4: Local Persistence | Local Persistence (F4) — `isStorageAvailable()` probe; persistent banner on failure | `isStorageAvailable()`, `showBanner({variant: "persistent"})`, `ERR_STORAGE_READ` | US-4.4 |
| F4: Local Persistence | Local Persistence (F4) — auto-dismiss banner on `setItem` failure | `saveTasks()`, `showBanner({variant: "dismissible"})`, `ERR_STORAGE_WRITE` | US-4.5 |
| F4: Local Persistence | Local Persistence (F4) — `QuotaExceededError` banner; input field NOT cleared | `saveTasks()`, `ERR_STORAGE_QUOTA`, `showBanner({variant: "dismissible"})` | US-4.6 |
| F4: Local Persistence | Local Persistence (F4) — JSON parse error and non-array fallback to `[]` | `loadTasks()`, `ERR_STORAGE_PARSE`, silent console log | US-4.7 |

### 3.2 User Story → FRD → PRD (Reverse Traceability)

| User Story | Title | FRD Specification | PRD Feature |
|------------|-------|-------------------|-------------|
| US-0.1 | Add a Task by Pressing Enter | Task Creation (F0) — Enter key submit, input auto-focus | F0 |
| US-0.2 | Add a Task by Clicking the Add Button | Task Creation (F0) — Add button submit | F0 |
| US-0.3 | Reject Empty Task Submission | Task Creation (F0) — empty/whitespace rejection | F0 |
| US-0.4 | Reject Task Name That Is Too Long | Task Creation (F0) — 500 character max-length rejection | F0 |
| US-0.5 | Input Is Trimmed Before Submission | Task Creation (F0) — whitespace trim | F0 |
| US-1.1 | View All Tasks in a Scrollable List | Task List View (F1) — vertical scrollable list, task name | F1 |
| US-1.2 | See Completed Tasks Visually Distinguished | Task List View (F1) — strikethrough + muted color styling | F1 |
| US-1.3 | See Empty State When No Tasks Exist | Task List View (F1) — empty state message | F1 |
| US-1.4 | Task List Updates in Real Time | Task List View (F1) — real-time re-render | F1 |
| US-1.5 | Each Task Row Shows Completion Toggle and Delete Control | Task List View (F1) — per-row controls, accessible labels | F1 |
| US-2.1 | Mark a Task as Complete | Task Completion (F2) — toggle to `completed: true` | F2 |
| US-2.2 | Unmark a Completed Task (Toggle Back to Incomplete) | Task Completion (F2) — toggle to `completed: false` | F2 |
| US-2.3 | Completion State Persists Across Page Refreshes | Task Completion (F2) — `completed` value persisted via `saveTasks()` | F2 |
| US-3.1 | Delete a Task from the List | Task Deletion (F3) — immediate removal from list and storage | F3 |
| US-3.2 | Deletion Is Permanent with No Undo | Task Deletion (F3) — permanent; no undo; no batch delete | F3 |
| US-3.3 | Empty State Shown After Last Task Is Deleted | Task Deletion (F3) — empty state on array length 0 | F3 |
| US-4.1 | Tasks Are Loaded from Storage on Page Open | Local Persistence (F4) — `loadTasks()` on init | F4 |
| US-4.2 | Tasks Are Saved Automatically on Every Change | Local Persistence (F4) — `saveTasks()` on every mutation | F4 |
| US-4.3 | Tasks Survive Page Refresh and Browser Restart | Local Persistence (F4) — JSON persist to `"todoapp_tasks"` | F4 |
| US-4.4 | Warning Banner When Storage Is Unavailable at Load | Local Persistence (F4) — persistent banner, `isStorageAvailable()` | F4 |
| US-4.5 | Non-Blocking Warning When Storage Write Fails | Local Persistence (F4) — auto-dismiss banner on write fail | F4 |
| US-4.6 | Warning When Storage Quota Is Exceeded | Local Persistence (F4) — `QuotaExceededError` handling | F4 |
| US-4.7 | Graceful Recovery from Corrupt Storage Data | Local Persistence (F4) — silent fallback to `[]` on parse error | F4 |

---

## 4. Requirements Detail

### F0: Task Creation

**PRD Intent:** Users add a new task by typing a name and pressing Enter or clicking Add. The task immediately appears at the top of the list. Empty and oversized inputs are rejected with inline feedback.

**FRD Requirements:**
- Input field auto-focused on page load; accepts text from keyboard or mouse
- Submit action triggered by Enter key press or Add button click
- Leading and trailing whitespace trimmed from input before validation
- Empty input (after trim) rejected with inline message: `"Task name cannot be empty"` (`ERR_EMPTY_TASK`)
- Input exceeding 500 characters rejected with inline message: `"Task name must be 500 characters or fewer"` (`ERR_TASK_TOO_LONG`)
- Inline validation message clears when user begins typing; never surfaced as `alert()`
- On successful submission: unique `id` generated via `crypto.randomUUID()` (fallback: timestamp + `Math.random()`); `createdAt` set to `new Date().toISOString()`; `completed` defaulted to `false`
- New task object `{ id, name, completed: false, createdAt }` prepended to in-memory array (index 0)
- Task list DOM re-rendered with new task at top immediately after creation
- `localStorage` written (`saveTasks()`) immediately after in-memory update
- Input field cleared and focus returned after successful submission
- On `localStorage` write failure: task added to UI and in-memory array; non-blocking banner displayed (`ERR_STORAGE_WRITE`); banner auto-dismisses after 5 seconds

**TechArch Implementations:**
- `handleFormSubmit(event)` — form submit event handler; reads `#task-input` value; calls `addTask()`
- `addTask(name: string): Task | null` — validates, creates task, prepends to array, calls `saveTasks()`, calls `renderTaskList()`
- `validateTaskName(rawName: string): ValidationResult` — trims, checks empty, checks length; returns `{ valid, errorCode, errorMessage }`
- `generateId(): string` — `crypto.randomUUID()` with timestamp fallback
- `showValidationMsg(message: string): void` — displays message in `#validation-msg` (`aria-live="polite"`)
- `clearValidationMsg(): void` — clears `#validation-msg`
- Error codes: `ERR_EMPTY_TASK`, `ERR_TASK_TOO_LONG`

**Linked User Stories:**
- US-0.1: Add a Task by Pressing Enter
- US-0.2: Add a Task by Clicking the Add Button
- US-0.3: Reject Empty Task Submission
- US-0.4: Reject Task Name That Is Too Long
- US-0.5: Input Is Trimmed Before Submission

---

### F1: Task List View

**PRD Intent:** All tasks displayed in a scrollable list. Completed tasks visually distinguished. Empty state message when no tasks exist. List updates in real time.

**FRD Requirements:**
- Task array iterated in index order (index 0 = top of list) on every render
- Each task item row rendered with: task name (text), completion checkbox (checked if `completed === true`), delete button (with `aria-label="Delete task: [task name]"`)
- Completed tasks rendered with `.task-item--completed` class (strikethrough text + muted color); color is not the sole differentiator (strikethrough also required)
- Active tasks rendered without `.task-item--completed` class; normal text styling
- Empty state message `"No tasks yet. Add one above!"` displayed in `#empty-state` when array length is 0; hidden otherwise
- `#empty-state` element uses `aria-live` region for screen reader announcement
- Full re-render (`renderTaskList()`) triggered after every `addTask()`, `toggleTask()`, and `deleteTask()` call
- On DOM render failure: fallback message `"Unable to display tasks. Please refresh the page."` shown (`ERR_RENDER_FAILED`)
- Corrupt or non-array task data: treated as empty array; empty state shown; logged to console
- Task items missing required fields (`id`, `name`, `completed`): skipped during render; logged to console

**TechArch Implementations:**
- `renderTaskList(tasks: Task[]): void` — clears and repopulates `#task-list`; shows/hides `#empty-state`
- `renderTaskItem(task: Task): HTMLLIElement` — creates single task row DOM element
- `handleTaskListClick(event: Event): void` — event delegation on `#task-list`; dispatches to `toggleTask()` or `deleteTask()`
- CSS classes: `.task-item` (base row), `.task-item--completed` (strikethrough + muted)
- DOM elements: `#task-list` (`<ul aria-label="Task list">`), `#empty-state` (`<p hidden>`)
- Error code: `ERR_RENDER_FAILED`

**Linked User Stories:**
- US-1.1: View All Tasks in a Scrollable List
- US-1.2: See Completed Tasks Visually Distinguished
- US-1.3: See Empty State When No Tasks Exist
- US-1.4: Task List Updates in Real Time
- US-1.5: Each Task Row Shows Completion Toggle and Delete Control

---

### F2: Task Completion

**PRD Intent:** Checkbox toggle per task item. Marks task complete (or incomplete). Completion state persisted and survives page refresh.

**FRD Requirements:**
- Every task item includes a completion checkbox (`<input type="checkbox">` or equivalent ARIA role)
- Single click/tap on checkbox triggers `toggleTask(taskId)` via event delegation
- `toggleTask()` flips `task.completed` boolean: `task.completed = !task.completed`
- If `completed === true` after toggle: `.task-item--completed` class applied; checkbox checked state set
- If `completed === false` after toggle: `.task-item--completed` class removed; checkbox unchecked
- DOM updated immediately; no page reload required
- `saveTasks()` called immediately after in-memory update; writes full array to `localStorage`
- `taskId` must match existing task in array; no action (and console warning) if ID not found (`ERR_TASK_NOT_FOUND`)
- On `localStorage` write failure: in-memory state and DOM updated; non-blocking banner shown (`ERR_STORAGE_WRITE`); auto-dismisses after 5 seconds
- Completion state loaded correctly on page initialisation via `loadTasks()`

**TechArch Implementations:**
- `toggleTask(taskId: string): void` — flips `completed`, calls `saveTasks()`, updates task item DOM class
- `handleTaskListClick(event: Event)` — detects checkbox click, extracts `taskId` from `data-*` attribute, calls `toggleTask()`
- CSS class toggle: `.task-item--completed` added/removed on `<li>` element
- `saveTasks(tasks: Task[]): void` — writes full array to `localStorage`
- Error code: `ERR_TASK_NOT_FOUND`

**Linked User Stories:**
- US-2.1: Mark a Task as Complete
- US-2.2: Unmark a Completed Task (Toggle Back to Incomplete)
- US-2.3: Completion State Persists Across Page Refreshes

---

### F3: Task Deletion

**PRD Intent:** Delete button per task. Permanent, no-undo removal. Empty state shown when last task deleted.

**FRD Requirements:**
- Every task item includes a delete button with `aria-label="Delete task: [task name]"`
- Single click/tap on delete button triggers `deleteTask(taskId)` via event delegation
- `deleteTask()` removes task from in-memory array via `tasks = tasks.filter(t => t.id !== taskId)`
- Task item DOM element removed from `#task-list` immediately
- `saveTasks()` called immediately after in-memory update; writes remaining array to `localStorage`
- If array is now empty: `renderTaskList()` shows `#empty-state` with `"No tasks yet. Add one above!"`
- No confirmation dialog; no undo mechanism (v1 simplicity constraint)
- `taskId` must match existing task in array; no action (and console warning) if ID not found (`ERR_TASK_NOT_FOUND`)
- Delete removes exactly one task; no batch deletion via this function
- On `localStorage` write failure: task removed from in-memory array and DOM; non-blocking banner shown; task may reappear on next page load if storage was successfully read at startup

**TechArch Implementations:**
- `deleteTask(taskId: string): void` — filters array, calls `saveTasks()`, calls `renderTaskList()` or removes DOM element
- `handleTaskListClick(event: Event)` — detects delete button click, extracts `taskId`, calls `deleteTask()`
- `renderTaskList()` — triggered after deletion to show empty state if applicable
- Error code: `ERR_TASK_NOT_FOUND`

**Linked User Stories:**
- US-3.1: Delete a Task from the List
- US-3.2: Deletion Is Permanent with No Undo
- US-3.3: Empty State Shown After Last Task Is Deleted

---

### F4: Local Persistence

**PRD Intent:** All tasks saved to `localStorage` on every mutation. Loaded on page init. Graceful degradation when storage unavailable or data corrupt.

**FRD Requirements:**

**On Page Load (Read Path):**
- `isStorageAvailable()` probe called at startup: attempts `setItem`/`removeItem` with test key
- If probe fails: in-memory array set to `[]`; persistent warning banner shown: `"Storage is unavailable. Tasks will not be saved between sessions."` (`ERR_STORAGE_READ`); app functional in-memory for session
- If probe passes: `localStorage.getItem("todoapp_tasks")` called
- If result is `null`: in-memory array set to `[]`; empty state rendered (no error)
- If `JSON.parse` throws: in-memory array set to `[]`; error logged to console (silent to user) (`ERR_STORAGE_PARSE`)
- If parsed value is not an array: in-memory array set to `[]`; warning logged to console (silent to user)
- If parsed value is a valid `Task[]`: in-memory array populated; task list rendered

**On Write (Save Path):**
- `saveTasks(tasks)` called after every `addTask()`, `toggleTask()`, `deleteTask()`
- `JSON.stringify(tasks)` serialises full array
- `localStorage.setItem("todoapp_tasks", serialisedString)` writes to storage
- If `setItem` throws (general failure): non-blocking banner shown: `"Changes could not be saved — storage unavailable"` (`ERR_STORAGE_WRITE`); auto-dismisses after 5 seconds
- If `setItem` throws `QuotaExceededError`: non-blocking banner: `"Storage full — task not saved"` (`ERR_STORAGE_QUOTA`); input field NOT cleared — task name retained for retry

**Storage Contract:**
- Storage key: `"todoapp_tasks"` (fixed; no dynamic key generation)
- Value type: JSON string encoding `Task[]`
- Fallback value: `[]` on all failure/empty modes

**TechArch Implementations:**
- `initApp(): void` — called on `DOMContentLoaded`; orchestrates storage check, load, render, and event binding
- `isStorageAvailable(): boolean` — probe function; returns `false` on exception
- `loadTasks(): Task[]` — reads, parses, validates; returns `Task[]` or `[]`
- `saveTasks(tasks: Task[]): void` — serialises and writes; handles write errors with banner
- `showBanner(options: BannerOptions): void` — `variant: "persistent"` for load failure; `variant: "dismissible"` for write failure
- `clearBanner(): void` — dismisses active banner
- Storage key constant: `STORAGE_KEY = "todoapp_tasks"`
- Error codes: `ERR_STORAGE_READ`, `ERR_STORAGE_WRITE`, `ERR_STORAGE_QUOTA`, `ERR_STORAGE_PARSE`

**Linked User Stories:**
- US-4.1: Tasks Are Loaded from Storage on Page Open
- US-4.2: Tasks Are Saved Automatically on Every Change
- US-4.3: Tasks Survive Page Refresh and Browser Restart
- US-4.4: Warning Banner When Storage Is Unavailable at Load
- US-4.5: Non-Blocking Warning When Storage Write Fails
- US-4.6: Warning When Storage Quota Is Exceeded
- US-4.7: Graceful Recovery from Corrupt Storage Data

---

## 5. Test Case Coverage

### 5.1 Test Case Matrix

| Test Case ID | Description | User Story | PRD Feature | FRD Spec | TechArch Contract | Expected Result |
|--------------|-------------|------------|-------------|----------|-------------------|-----------------|
| TEST-001 | Add task by pressing Enter | US-0.1 | F0 | Task Creation (F0) | `handleFormSubmit()`, `addTask()` | Task appears at top of list; input cleared; `localStorage` updated |
| TEST-002 | Add task by clicking Add button | US-0.2 | F0 | Task Creation (F0) | `handleFormSubmit()`, `addTask()` | Task appears at top of list; input cleared; `localStorage` updated |
| TEST-003 | Submit empty input — rejected | US-0.3 | F0 | Task Creation (F0) | `validateTaskName()`, `ERR_EMPTY_TASK` | No task created; inline message "Task name cannot be empty" shown |
| TEST-004 | Submit whitespace-only input — rejected | US-0.3 | F0 | Task Creation (F0) | `validateTaskName()`, `ERR_EMPTY_TASK` | No task created; inline validation message shown |
| TEST-005 | Inline validation clears on typing | US-0.3 | F0 | Task Creation (F0) | `clearValidationMsg()` | Validation message disappears on first keypress |
| TEST-006 | Submit task name > 500 characters — rejected | US-0.4 | F0 | Task Creation (F0) | `validateTaskName()`, `ERR_TASK_TOO_LONG` | No task created; inline message "Task name must be 500 characters or fewer" |
| TEST-007 | Submit task name = 500 characters — accepted | US-0.4 | F0 | Task Creation (F0) | `validateTaskName()` | Task created successfully |
| TEST-008 | Leading/trailing whitespace stripped | US-0.5 | F0 | Task Creation (F0) | `addTask()` trims internally | Task stored and displayed without leading/trailing spaces |
| TEST-009 | Task list renders all tasks on page load | US-1.1 | F1 | Task List View (F1) | `initApp()`, `renderTaskList()` | All stored tasks shown in correct order (newest first) |
| TEST-010 | Task list is scrollable with many tasks | US-1.1 | F1 | Task List View (F1) | `renderTaskList()`, CSS layout | List scrolls without horizontal overflow |
| TEST-011 | Completed task shows strikethrough and muted color | US-1.2 | F1 | Task List View (F1) | `.task-item--completed` CSS class | `.task-item--completed` applied; both strikethrough and muted color visible |
| TEST-012 | Active task shows normal styling | US-1.2 | F1 | Task List View (F1) | `.task-item` base class | No strikethrough; normal text color |
| TEST-013 | Empty state shown when no tasks | US-1.3 | F1 | Task List View (F1) | `renderTaskList()`, `#empty-state` | "No tasks yet. Add one above!" visible in `#empty-state` |
| TEST-014 | Empty state hidden when tasks exist | US-1.3 | F1 | Task List View (F1) | `renderTaskList()`, `#empty-state` | `#empty-state` hidden; task list visible |
| TEST-015 | Task list updates immediately on add | US-1.4 | F1 | Task List View (F1) | `renderTaskList()` after `addTask()` | New task visible at top without page reload |
| TEST-016 | Task list updates immediately on toggle | US-1.4 | F1 | Task List View (F1) | `toggleTask()` → DOM class update | Completed style applies without page reload |
| TEST-017 | Task list updates immediately on delete | US-1.4 | F1 | Task List View (F1) | `deleteTask()` → `renderTaskList()` | Deleted task disappears without page reload |
| TEST-018 | Every task row has completion checkbox | US-1.5 | F1 | Task List View (F1) | `renderTaskItem()` | Checkbox present on each task row |
| TEST-019 | Every task row has delete button with aria-label | US-1.5 | F1 | Task List View (F1) | `renderTaskItem()`, `aria-label` | Delete button present; `aria-label="Delete task: [name]"` |
| TEST-020 | Clicking checkbox marks task complete | US-2.1 | F2 | Task Completion (F2) | `toggleTask()`, `saveTasks()` | `completed: true`; `.task-item--completed` applied; `localStorage` updated |
| TEST-021 | Clicking checkbox again toggles back to incomplete | US-2.2 | F2 | Task Completion (F2) | `toggleTask()`, `saveTasks()` | `completed: false`; `.task-item--completed` removed; `localStorage` updated |
| TEST-022 | Completion state survives page refresh | US-2.3 | F2, F4 | Task Completion (F2), Local Persistence (F4) | `saveTasks()`, `loadTasks()` | Refreshed page shows same completion state |
| TEST-023 | Click delete removes task from list | US-3.1 | F3 | Task Deletion (F3) | `deleteTask()`, `saveTasks()` | Task removed from DOM and `localStorage` immediately |
| TEST-024 | Deleted task absent after page refresh | US-3.2 | F3, F4 | Task Deletion (F3), Local Persistence (F4) | `deleteTask()`, `saveTasks()`, `loadTasks()` | Deleted task not present after refresh |
| TEST-025 | No confirmation dialog on delete | US-3.2 | F3 | Task Deletion (F3) | `deleteTask()` — no `confirm()` call | Deletion occurs immediately with no dialog |
| TEST-026 | Empty state shown after last task deleted | US-3.3 | F3 | Task Deletion (F3) | `deleteTask()` → `renderTaskList()` → `#empty-state` | "No tasks yet. Add one above!" displayed |
| TEST-027 | Tasks loaded from `localStorage` on page open | US-4.1 | F4 | Local Persistence (F4) | `initApp()`, `loadTasks()` | Previously saved tasks visible immediately on load |
| TEST-028 | `localStorage` written on task create | US-4.2 | F4 | Local Persistence (F4) | `addTask()` → `saveTasks()` | `localStorage["todoapp_tasks"]` updated after create |
| TEST-029 | `localStorage` written on task toggle | US-4.2 | F4 | Local Persistence (F4) | `toggleTask()` → `saveTasks()` | `localStorage["todoapp_tasks"]` updated after toggle |
| TEST-030 | `localStorage` written on task delete | US-4.2 | F4 | Local Persistence (F4) | `deleteTask()` → `saveTasks()` | `localStorage["todoapp_tasks"]` updated after delete |
| TEST-031 | All tasks present after browser close/reopen | US-4.3 | F4 | Local Persistence (F4) | `saveTasks()`, `loadTasks()` | Task names, completion states, order all preserved |
| TEST-032 | Persistent banner on storage unavailable at load | US-4.4 | F4 | Local Persistence (F4) | `isStorageAvailable()`, `showBanner({variant: "persistent"})`, `ERR_STORAGE_READ` | Banner visible with correct message; does not auto-dismiss |
| TEST-033 | App functional in-memory when storage unavailable | US-4.4 | F4 | Local Persistence (F4) | `loadTasks()` fallback to `[]` | Tasks can be added, toggled, deleted within session |
| TEST-034 | Auto-dismiss banner on `setItem` write failure | US-4.5 | F4 | Local Persistence (F4) | `saveTasks()`, `ERR_STORAGE_WRITE` | Banner shown; dismisses after 5 seconds; task visible in UI |
| TEST-035 | `QuotaExceededError` banner; input not cleared | US-4.6 | F4 | Local Persistence (F4) | `saveTasks()`, `ERR_STORAGE_QUOTA` | "Storage full — task not saved" banner; input retains task name |
| TEST-036 | Corrupt JSON in `localStorage` — empty list shown | US-4.7 | F4 | Local Persistence (F4) | `loadTasks()`, `ERR_STORAGE_PARSE` | App initialises with empty array; empty state shown; no user-facing error |
| TEST-037 | Non-array parsed value — empty list shown | US-4.7 | F4 | Local Persistence (F4) | `loadTasks()` | App initialises with empty array; new tasks save correctly |
| TEST-038 | New task added after corrupt recovery saves correctly | US-4.7 | F4 | Local Persistence (F4) | `loadTasks()`, `saveTasks()` | New task persists to `localStorage`, overwriting corrupt data |

### 5.2 Coverage Summary

| PRD Feature | User Stories | Test Cases | Story Coverage | Test Coverage |
|-------------|-------------|------------|----------------|---------------|
| F0: Task Creation | 5 (US-0.1–0.5) | 8 (TEST-001–008) | 100% | 100% |
| F1: Task List View | 5 (US-1.1–1.5) | 11 (TEST-009–019) | 100% | 100% |
| F2: Task Completion | 3 (US-2.1–2.3) | 3 (TEST-020–022) | 100% | 100% |
| F3: Task Deletion | 3 (US-3.1–3.3) | 4 (TEST-023–026) | 100% | 100% |
| F4: Local Persistence | 7 (US-4.1–4.7) | 12 (TEST-027–038) | 100% | 100% |
| **Total** | **23** | **38** | **100%** | **100%** |

### 5.3 Error Code Coverage

| Error Code | Feature | TechArch Trigger | Test Case | User Story |
|------------|---------|-----------------|-----------|------------|
| `ERR_EMPTY_TASK` | F0 | `validateTaskName()` on blank/whitespace input | TEST-003, TEST-004 | US-0.3 |
| `ERR_TASK_TOO_LONG` | F0 | `validateTaskName()` on input > 500 chars | TEST-006 | US-0.4 |
| `ERR_STORAGE_READ` | F4 | `isStorageAvailable()` probe fails at startup | TEST-032, TEST-033 | US-4.4 |
| `ERR_STORAGE_WRITE` | F4 | `localStorage.setItem` throws (general) | TEST-034 | US-4.5 |
| `ERR_STORAGE_QUOTA` | F4 | `localStorage.setItem` throws `QuotaExceededError` | TEST-035 | US-4.6 |
| `ERR_STORAGE_PARSE` | F4 | `JSON.parse` throws on load | TEST-036, TEST-038 | US-4.7 |
| `ERR_TASK_NOT_FOUND` | F2, F3 | Toggle/delete fired for unknown task ID | (Console-only; no user-facing UI to test) | — |
| `ERR_RENDER_FAILED` | F1 | Unhandled exception in `renderTaskList()` | (Edge case; manual/exception injection test) | — |

### 5.4 Non-Functional Requirements Coverage

| NFR Category | Target | Test Approach |
|--------------|--------|---------------|
| Performance — Page Load | < 1 second | Lighthouse audit; browser DevTools Network panel |
| Performance — List Render | < 16ms for 500 tasks | Browser performance profiler; 500-task load test |
| Responsiveness — Min Viewport | Functional at 320px | Browser DevTools responsive mode; manual test |
| Responsiveness — Touch Targets | ≥ 44×44px for checkbox + delete | Browser DevTools computed size inspection |
| Accessibility — Keyboard Nav | Full Tab/Enter/Space navigation | Manual keyboard-only walkthrough |
| Accessibility — Auto-focus | Input focused on load | Manual and automated check (`document.activeElement`) |
| Accessibility — ARIA | `aria-live`, `aria-label`, `role="alert"` | Screen reader test (NVDA/VoiceOver); WAVE audit |
| Accessibility — Color | Strikethrough required alongside color change | Visual inspection; WCAG contrast check |
| Browser Support | Chrome, Firefox, Safari, Edge current | Cross-browser functional test matrix |
| Offline | Fully functional with no network | DevTools offline mode; Service Worker not required |
| Storage Limit | No degradation at 500 tasks | Programmatic: load 500 tasks, verify render and save |
| Code Simplicity | No build tools; opens in browser | Manual: open `index.html` directly in browser |
| Lighthouse Score | ≥ 90 | Lighthouse CLI or DevTools Lighthouse panel |

---

## 6. Change Management

| Change ID | Date | Version | Section Affected | Change Description | Author | Status |
|-----------|------|---------|------------------|--------------------|--------|--------|
| CHG-001 | 2026-05-03 | 1.0 | All | Initial RTM created from PRD v1.0, FRD v1.0, TechArch v1.0, UserStories v1.0 | Pivota Spec Generator | Approved |

---

## 7. Approval

| Role | Name | Signature | Date | Status |
|------|------|-----------|------|--------|
| Product Owner | — | — | — | Pending |
| Technical Lead | — | — | — | Pending |
| QA Lead | — | — | — | Pending |
| Project Manager | — | — | — | Pending |

---

### Traceability Completeness Checklist

| Check | Status |
|-------|--------|
| All 5 PRD features (F0–F4) have FRD traceability | ✅ |
| All 5 PRD features (F0–F4) have TechArch traceability | ✅ |
| All 5 PRD features (F0–F4) have at least one user story | ✅ |
| All 23 user stories map to a PRD feature | ✅ |
| All 23 user stories map to an FRD specification | ✅ |
| All 23 user stories map to at least one TechArch contract | ✅ |
| All 23 user stories have at least one test case | ✅ |
| All 8 error codes map to a feature and a trigger | ✅ |
| All 17 TechArch function contracts map to at least one FRD requirement | ✅ |
| Reverse traceability (US → FRD → PRD) table complete | ✅ |
| Non-functional requirements have defined test approach | ✅ |

---

*RTM generated: 2026-05-03*  
*Source documents: PRD-TodoApp.md v1.0, FRD-TodoApp.md v1.0, TechArch-TodoApp.md v1.0, UserStories-TodoApp.md v1.0*  
*Next review: Before v1 release sign-off*
