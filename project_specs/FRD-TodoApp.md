# FRD: Simple To-Do List App (TodoApp)

**Version:** 1.0  
**Date:** 2026-05-03  
**Status:** Draft  
**Based On:** PRD-TodoApp.md v1.0

---

## Table of Contents

1. [Feature Specifications](#feature-specifications)
   - [F0: Task Creation](#1-task-creation-f0)
   - [F1: Task List View](#2-task-list-view-f1)
   - [F2: Task Completion](#3-task-completion-f2)
   - [F3: Task Deletion](#4-task-deletion-f3)
   - [F4: Local Persistence](#5-local-persistence-f4)
2. [Data Model](#data-model)
3. [LocalStorage API Specification](#localstorage-api-specification)
4. [Client-Side Function Signatures](#client-side-function-signatures)
5. [Error Handling](#error-handling)
6. [Non-Functional Specifications](#non-functional-specifications)

---

## Feature Specifications

---

## 1. Task Creation (F0)

**Description:** Task Creation is the primary entry point for all task data in the app. The user types a task name into a text input field and submits it by pressing Enter or clicking the Add button. The task is immediately inserted into the task list and the input field is cleared. Any attempt to submit a blank or whitespace-only task is silently rejected with inline feedback, ensuring the task list contains only meaningful entries.

**Terminology:**
- **Task Name:** The user-supplied text describing the task; must be a non-empty string after trimming whitespace
- **Task ID:** A unique identifier assigned at creation time; used as the canonical reference for all subsequent operations on the task
- **Submit Action:** Either pressing the Enter key while the input field is focused, or clicking the "Add" button

**Sub-features:**
- Text input field for entering a task name
- Submit via Enter key press or Add button click
- Trim leading/trailing whitespace from input before processing
- Reject empty or whitespace-only submissions with inline validation feedback
- Clear the input field immediately after a successful task is created
- Insert the new task at the top of the task list
- Assign a unique ID and creation timestamp to each new task
- Persist the new task to `localStorage` immediately after creation

**Process:**
1. User focuses the task input field (auto-focused on page load)
2. User types a task name string
3. User triggers submit via Enter key or Add button click
4. System trims leading/trailing whitespace from the input value
5. System checks if the trimmed value is empty
   - If empty → display inline validation message; do not create task; retain cursor in input field
   - If non-empty → proceed to step 6
6. System generates a unique Task ID (UUID v4 or timestamp-based)
7. System records the current timestamp as `createdAt`
8. System constructs the task object: `{ id, name, completed: false, createdAt }`
9. System prepends the new task to the in-memory task array
10. System re-renders the task list UI to include the new task at the top
11. System saves the updated task array to `localStorage`
12. System clears the input field and returns focus to it

**Inputs:**
- `taskName` (string, required): The text entered by the user; trimmed before use; must be non-empty after trim

**Outputs:**
- A new task object added to the in-memory task array
- The task list UI updated with the new task rendered at the top
- The task input field cleared
- `localStorage` updated with the full task array

**Validation:**
- Input value after whitespace trim must have a length of at least 1 character
- Input value after whitespace trim must not exceed 500 characters
- Null or undefined input values must be treated as empty and rejected

**Error States:**

| Scenario | Trigger | UI Behavior | Recovery |
|----------|---------|-------------|----------|
| Empty submission | User submits blank or whitespace-only input | Display inline message: "Task name cannot be empty" below the input field | Message clears when user begins typing; input retains focus |
| Input too long | Input exceeds 500 characters | Display inline message: "Task name must be 500 characters or fewer" | Truncation hint shown; user must shorten text before submitting |
| `localStorage` write failure | `localStorage.setItem` throws | Task added to UI and in-memory array; display non-blocking banner: "Changes could not be saved — storage unavailable" | Banner auto-dismisses after 5 seconds; task remains visible for the session |

---

## 2. Task List View (F1)

**Description:** The Task List View is the primary display surface of the application. It renders all tasks held in the in-memory task array as a scrollable vertical list. Each task item displays the task name, a completion toggle, and a delete control. The list reflects the current application state in real time — any task creation, completion toggle, or deletion triggers an immediate re-render. When no tasks exist, a contextual empty state message is displayed in place of the list.

**Terminology:**
- **Task Item:** A single rendered row in the task list representing one task object
- **Active Task:** A task where `completed === false`; rendered with normal styling
- **Completed Task:** A task where `completed === true`; rendered with strikethrough text and a muted color
- **Empty State:** The UI treatment shown when the task array contains zero items

**Sub-features:**
- Render all tasks as a vertical scrollable list
- Display task name as the primary text for each task item
- Visually distinguish completed tasks from active tasks (strikethrough, muted color)
- Show a completion checkbox/toggle on each task item
- Show a delete button/icon on each task item
- Display an empty state message when no tasks exist
- Re-render the list automatically on any state change (create, complete, delete)
- Maintain task insertion order (newest at top)

**Process:**
1. Application loads and reads task array from `localStorage` (see F4)
2. System checks if the task array is empty
   - If empty → render empty state message: "No tasks yet. Add one above!"
   - If non-empty → proceed to step 3
3. System iterates over the task array in order (index 0 = top of list)
4. For each task, system renders a task item row containing:
   - Completion checkbox (checked if `completed === true`)
   - Task name text (strikethrough + muted if `completed === true`)
   - Delete button
5. System binds event listeners on each task item for completion toggle and deletion
6. System renders the complete list to the DOM
7. On any subsequent state change, system repeats steps 2–6 (full re-render or targeted DOM update)

**Inputs:**
- Task array (array of task objects loaded from memory/`localStorage`)

**Outputs:**
- Rendered list of task item rows in the DOM
- Empty state message when task array is empty
- Real-time visual updates on state changes

**Validation:**
- Task array must be a valid JavaScript array before render; if corrupt or non-array, treat as empty and show empty state
- Each task object must have `id`, `name`, and `completed` fields; items missing required fields are skipped during render and logged to the browser console

**Error States:**

| Scenario | Trigger | UI Behavior | Recovery |
|----------|---------|-------------|----------|
| Corrupt task array in storage | Parsed `localStorage` data is not an array | Treat as empty; show empty state; log error to console | User can add new tasks; corrupted data is overwritten on next save |
| Task object missing required fields | Task item lacks `id`, `name`, or `completed` | Skip rendering that item; log warning to console | Remaining valid tasks render normally |
| DOM render error | Unexpected JavaScript exception during list render | Show fallback message: "Unable to display tasks. Please refresh the page." | User refreshes; app re-initialises from `localStorage` |

---

## 3. Task Completion (F2)

**Description:** Task Completion allows users to toggle any task between a completed and an incomplete state. Clicking the checkbox or toggle on a task item flips the task's `completed` boolean, applies the appropriate visual treatment (strikethrough and muted color for completed; normal style for incomplete), and immediately persists the updated state to `localStorage`. The toggle is bidirectional — a completed task can be uncompleted at any time.

**Terminology:**
- **Completion Toggle:** The checkbox or clickable control on each task item that triggers the completed/incomplete state change
- **Completed State:** `completed === true`; task name rendered with strikethrough and muted color
- **Incomplete State:** `completed === false`; task name rendered in normal style

**Sub-features:**
- Checkbox or toggle control displayed on every task item
- Single click/tap toggles `completed` between `true` and `false`
- Visual style updates immediately on toggle (no page reload)
- Toggle state reflects the persisted value on page load
- Completion state saved to `localStorage` on every toggle

**Process:**
1. User clicks or taps the completion toggle on a task item
2. System identifies the target task by its `id`
3. System flips the `completed` boolean: `task.completed = !task.completed`
4. System updates the in-memory task array with the modified task object
5. System updates the DOM for that task item:
   - If `completed === true`: add strikethrough style, mute text color, check the checkbox
   - If `completed === false`: remove strikethrough style, restore normal text color, uncheck the checkbox
6. System saves the updated task array to `localStorage`

**Inputs:**
- `taskId` (string, required): The unique ID of the task to toggle — derived from the task item's data attribute in the DOM

**Outputs:**
- In-memory task array updated with new `completed` value
- Task item visual style updated in the DOM
- `localStorage` updated with the full task array

**Validation:**
- `taskId` must match an existing task in the in-memory array; no action taken if ID not found
- Toggle action must update exactly one task object; no batch updates permitted via this function

**Error States:**

| Scenario | Trigger | UI Behavior | Recovery |
|----------|---------|-------------|----------|
| Task ID not found | Toggle fired for an ID not present in task array | No state change; log warning to console | UI remains unchanged; user can retry |
| `localStorage` write failure | `setItem` throws on save | In-memory state updated; DOM updated; display non-blocking banner: "Changes could not be saved — storage unavailable" | Banner auto-dismisses after 5 seconds; toggle state visible for session |

---

## 4. Task Deletion (F3)

**Description:** Task Deletion permanently removes a task from the application. Clicking the delete button on a task item immediately removes the task from both the in-memory array and `localStorage`, and removes the task item from the DOM. Deletion is irreversible in v1 — there is no undo mechanism. This deliberate constraint preserves the app's simplicity.

**Terminology:**
- **Delete Button:** The clickable control (button or icon) on each task item that triggers permanent removal
- **Permanent Deletion:** Removal from both in-memory state and `localStorage`; not recoverable within the session

**Sub-features:**
- Delete button or icon displayed on every task item
- Single click/tap removes the task immediately from the list
- Task removed from in-memory array
- Task removed from `localStorage`
- No confirmation dialog required (v1 simplicity; deletion is instant)
- If deleting the last task, the empty state message is displayed

**Process:**
1. User clicks or taps the delete button on a task item
2. System identifies the target task by its `id`
3. System removes the task object from the in-memory task array (`array.filter`)
4. System removes the task item element from the DOM
5. System checks if the task array is now empty
   - If empty → render the empty state message
   - If non-empty → list remains with remaining tasks
6. System saves the updated task array to `localStorage`

**Inputs:**
- `taskId` (string, required): The unique ID of the task to delete — derived from the task item's data attribute in the DOM

**Outputs:**
- Task object removed from in-memory task array
- Task item removed from DOM
- `localStorage` updated with the remaining task array
- Empty state displayed if no tasks remain

**Validation:**
- `taskId` must match an existing task in the in-memory array; no action taken if ID not found
- Delete action must remove exactly one task object; no batch deletes via this function

**Error States:**

| Scenario | Trigger | UI Behavior | Recovery |
|----------|---------|-------------|----------|
| Task ID not found | Delete fired for an ID not in task array | No state change; log warning to console | UI remains unchanged |
| `localStorage` write failure | `setItem` throws on save | Task removed from in-memory array and DOM; display non-blocking banner: "Changes could not be saved — storage unavailable" | Task gone from UI for the session but may reappear on next page load if storage was read successfully at startup |

---

## 5. Local Persistence (F4)

**Description:** Local Persistence ensures that all task data survives page refreshes, tab closures, and browser restarts without requiring a backend or user account. The full task array is serialised as JSON and stored under a single, app-specific key in the browser's `localStorage`. Every mutating operation (create, complete, delete) triggers an immediate write. On page load, the app reads this key, deserialises the JSON, and initialises the in-memory task array. If `localStorage` is unavailable (e.g., private browsing with storage blocked), the app degrades gracefully with a persistent warning banner.

**Terminology:**
- **Storage Key:** The fixed string key used for all read/write operations: `"todoapp_tasks"`
- **Serialisation:** Converting the in-memory task array to a JSON string via `JSON.stringify`
- **Deserialisation:** Parsing the JSON string from storage back to a JavaScript array via `JSON.parse`
- **Storage Unavailable:** A state where `localStorage` API calls throw exceptions; detected at page load

**Sub-features:**
- Detect `localStorage` availability at page load
- Display a persistent warning banner if storage is unavailable
- Load task array from `localStorage` on page initialisation
- Save full task array to `localStorage` on every create, complete, and delete action
- Use a fixed storage key: `"todoapp_tasks"`
- Handle JSON parse errors on load (treat corrupt data as empty array)
- Handle `setItem` quota exceeded or permission errors gracefully

**Process — Page Load (Read):**
1. Application initialises; system calls `isStorageAvailable()` — a probe that attempts a test `setItem`/`removeItem` to confirm read/write access
2. If probe fails (storage blocked or unavailable) → set in-memory array to `[]`; display persistent warning banner: "Storage is unavailable. Tasks will not be saved between sessions."; skip to app render
3. If probe passes → system calls `localStorage.getItem("todoapp_tasks")`
4. If return value is `null` → no prior data; set in-memory array to `[]`; proceed to render
5. System attempts `JSON.parse` on the returned string
6. If parse throws → set in-memory array to `[]`; log parse error to console; proceed to render (silent — no user-facing error per ERR_STORAGE_PARSE)
7. If parsed value is not an array → set in-memory array to `[]`; log warning; proceed to render
8. If parsed value is a valid array → set in-memory array to parsed value; proceed to render
9. System renders the task list (see F1)

> **Note:** The `isStorageAvailable()` probe is the single authoritative check for storage availability at load. Steps 3–8 assume storage is accessible; any unexpected exception in those steps is treated as a data error (silent recovery), not a storage-unavailable error. A `getItem` throw after a passing probe is handled the same as a parse failure — empty array, log to console.

**Process — On Write (Save):**
1. A mutating operation (create, complete, delete) completes its in-memory update
2. System calls `JSON.stringify` on the current in-memory task array
3. System calls `localStorage.setItem("todoapp_tasks", serialisedString)`
4. If `setItem` throws (quota exceeded, storage blocked) → log error to console; display non-blocking banner: "Changes could not be saved — storage unavailable"; banner auto-dismisses after 5 seconds
5. If `setItem` succeeds → no additional action required

**Inputs:**
- In-memory task array (array of task objects, written on every mutation)
- `localStorage.getItem("todoapp_tasks")` return value (string or null, read on page load)

**Outputs:**
- On load: populated in-memory task array (or empty array on failure/empty storage)
- On save: updated `localStorage` entry under key `"todoapp_tasks"`
- On storage failure: warning banner displayed in the UI

**Validation:**
- Storage key must always be `"todoapp_tasks"` — no dynamic key generation
- Data written to storage must always be a JSON-serialised array
- On load, parsed data must be validated as an array before use

**Error States:**

| Scenario | Trigger | UI Behavior | Recovery |
|----------|---------|-------------|----------|
| `localStorage` unavailable at load | `isStorageAvailable()` probe fails at startup | Display persistent warning banner; app functions in-memory for session | Tasks lost on refresh; user informed upfront |
| `localStorage` unavailable on write | `setItem` throws | Display non-blocking auto-dismissing banner (5 sec) | In-memory state intact; user warned; data not persisted |
| JSON parse error on load | `getItem` returns corrupt/non-JSON string | Treat as empty; set array to `[]`; log to console (silent to user) | User starts fresh; new tasks persist correctly |
| Parsed data is not an array | `JSON.parse` returns non-array | Treat as empty; set array to `[]`; log warning (silent to user) | User starts fresh |
| `localStorage` quota exceeded | `setItem` throws `QuotaExceededError` | Display non-blocking banner: "Storage full — task not saved"; input field is NOT cleared — task name is retained for retry | User deletes tasks to free space, then resubmits without retyping |

---

## Data Model

### Task Object

Each task is represented as a plain JavaScript object. The full application state is an ordered array of these objects.

```json
{
  "id": "string",
  "name": "string",
  "completed": false,
  "createdAt": "string"
}
```

**Field Definitions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the task. Generated at creation time using `crypto.randomUUID()` or a timestamp-based fallback (`Date.now().toString(36) + Math.random().toString(36).slice(2)`). Immutable after creation. |
| `name` | string | Yes | The user-supplied task name. Whitespace-trimmed before storage. Max 500 characters. |
| `completed` | boolean | Yes | Completion status. `false` = active/incomplete. `true` = completed. Defaults to `false` on creation. |
| `createdAt` | string | Yes | ISO 8601 timestamp recorded at creation time via `new Date().toISOString()`. Used for ordering. Immutable after creation. |

**Example task array (as stored in `localStorage`):**

```json
[
  {
    "id": "k7x2m9p",
    "name": "Buy groceries",
    "completed": false,
    "createdAt": "2026-05-03T10:15:00.000Z"
  },
  {
    "id": "a3q8w1r",
    "name": "Read chapter 4",
    "completed": true,
    "createdAt": "2026-05-03T09:00:00.000Z"
  }
]
```

---

## LocalStorage API Specification

> **Note:** TodoApp is a fully client-side application with no backend. There are no HTTP API endpoints. The "API" is the set of JavaScript functions that manage application state and interact with `localStorage`.

### Storage Key

| Key | Value Type | Description |
|-----|-----------|-------------|
| `"todoapp_tasks"` | JSON string (array of task objects) | Single storage key for all task data |

### Read Operation

```
localStorage.getItem("todoapp_tasks")
```

- **Returns:** JSON string or `null`
- **Called:** Once at application initialisation
- **On null:** Initialise in-memory array as `[]`
- **On parse failure:** Initialise in-memory array as `[]`, log error

### Write Operation

```
localStorage.setItem("todoapp_tasks", JSON.stringify(taskArray))
```

- **Called after:** Every task creation, completion toggle, and deletion
- **Input:** Full in-memory task array serialised to JSON
- **On failure:** Display user-facing warning banner; do not crash the app

---

## Client-Side Function Signatures

These are the core JavaScript functions that implement the feature specifications. They define the expected interface for each operation.

### `initApp()`
Initialises the application. Called once on `DOMContentLoaded`.

- Detects `localStorage` availability
- Loads tasks from storage
- Renders the initial task list
- Binds the form submit event listener

---

### `loadTasks() → Task[]`
Reads and deserialises the task array from `localStorage`.

- **Returns:** Array of task objects (empty array on failure or no data)
- **Side effects:** May display persistent warning banner if storage unavailable

---

### `saveTasks(tasks: Task[]) → void`
Serialises and writes the task array to `localStorage`.

- **Parameter:** `tasks` — the current full in-memory task array
- **Side effects:** May display non-blocking warning banner on write failure

---

### `addTask(name: string) → Task | null`
Creates a new task object and prepends it to the task array.

- **Parameter:** `name` — raw user input string (trimmed internally)
- **Returns:** The new task object on success; `null` if validation fails
- **Side effects:** Calls `saveTasks`; calls `renderTaskList`

---

### `toggleTask(taskId: string) → void`
Flips the `completed` boolean on the task matching `taskId`.

- **Parameter:** `taskId` — the `id` of the target task
- **Side effects:** Calls `saveTasks`; updates the specific task item in the DOM

---

### `deleteTask(taskId: string) → void`
Removes the task matching `taskId` from the task array.

- **Parameter:** `taskId` — the `id` of the target task
- **Side effects:** Calls `saveTasks`; calls `renderTaskList` or removes the DOM element directly

---

### `renderTaskList(tasks: Task[]) → void`
Renders the full task array to the task list DOM element.

- **Parameter:** `tasks` — the current in-memory task array
- **Side effects:** Clears and re-populates the `#task-list` DOM element; shows empty state if array is empty

---

### `isStorageAvailable() → boolean`
Tests whether `localStorage` is readable and writable.

- **Returns:** `true` if available; `false` if blocked or unavailable
- **Implementation:** Attempts `setItem` / `removeItem` with a test key; catches exceptions

---

## Error Handling

### Global Error Strategy

- All user-facing errors are communicated via one of two UI patterns:
  - **Inline validation messages:** Displayed adjacent to the input field for input validation failures (e.g., empty task name)
  - **Non-blocking banners:** Displayed at the top of the page for system-level failures (e.g., storage unavailable); auto-dismiss after 5 seconds unless the failure is persistent (in which case the banner remains until the condition is resolved)
- Errors are never surfaced as JavaScript `alert()` dialogs
- All caught exceptions are logged to `console.error` or `console.warn` for debugging

### Error Reference Table

| Error Code | Feature | Trigger | User Message | Severity |
|------------|---------|---------|--------------|----------|
| `ERR_EMPTY_TASK` | F0 | Submit with empty/whitespace input | "Task name cannot be empty" | Inline validation |
| `ERR_TASK_TOO_LONG` | F0 | Input exceeds 500 characters | "Task name must be 500 characters or fewer" | Inline validation |
| `ERR_STORAGE_READ` | F4 | `isStorageAvailable()` probe fails at startup | "Storage is unavailable. Tasks will not be saved between sessions." | Persistent banner |
| `ERR_STORAGE_WRITE` | F4 | `localStorage.setItem` throws | "Changes could not be saved — storage unavailable" | Auto-dismiss banner (5s) |
| `ERR_STORAGE_QUOTA` | F4 | `setItem` throws `QuotaExceededError` | "Storage full — task not saved"; input field retains failed task name for retry | Auto-dismiss banner (5s) |
| `ERR_STORAGE_PARSE` | F4 | `JSON.parse` throws on load | Silent (log to console); app starts with empty list | Console only |
| `ERR_TASK_NOT_FOUND` | F2, F3 | Toggle or delete fires for unknown ID | Silent (log to console); no UI change | Console only |
| `ERR_RENDER_FAILED` | F1 | Unhandled exception in render function | "Unable to display tasks. Please refresh the page." | Static fallback message |

---

## Non-Functional Specifications

### Performance
- Total page load time must be under 1 second on a standard broadband connection with an empty cache
- No network requests are made after the initial HTML/CSS/JS file load
- Task list re-render must complete within 16ms (one frame at 60fps) for lists up to 500 tasks

### Responsiveness
- Layout must be functional and usable at viewport widths from 320px to 2560px
- Touch targets (checkbox, delete button) must be at least 44×44px on mobile viewports
- No horizontal scrollbar should appear at any supported viewport width

### Accessibility
- All interactive elements must be keyboard-accessible (Tab to navigate, Enter/Space to activate)
- The task input field must receive focus automatically on page load
- Checkbox elements must use native `<input type="checkbox">` or equivalent ARIA role
- Delete buttons must have an accessible label (e.g., `aria-label="Delete task: [task name]"`)
- Empty state and validation messages must be announced by screen readers via `aria-live` regions
- Color alone must not be the sole differentiator between active and completed tasks (strikethrough text required in addition to color change)
- "Muted color" for completed task text is not specified as an exact hex value — the implementer may choose any color that satisfies the WCAG AA minimum contrast ratio of 3:1 against the task row background color

### Browser Support
- Chrome (current), Firefox (current), Safari (current), Edge (current)
- No Internet Explorer support required
- `localStorage` and `crypto.randomUUID()` must be tested across all supported browsers; timestamp-based ID fallback required for environments where `crypto.randomUUID()` is unavailable

### Offline Support
- App must be fully functional with no network connection after the initial page load
- No external fonts, CDN-hosted libraries, or remote assets

### Storage Constraints
- App must function without degradation for task lists up to 500 tasks
- Each task object is approximately 150–200 bytes serialised; 500 tasks ≈ ~100KB, well within the 5MB `localStorage` limit

### Code Simplicity
- No build tools, bundlers, or transpilers required
- Single HTML file or a flat directory of HTML + CSS + JS files only
- No external JavaScript dependencies or frameworks for v1

---

*FRD generated: 2026-05-03*  
*Source: PRD-TodoApp.md v1.0*  
*Next: TechArch-TodoApp.md, UserStories-TodoApp.md*
