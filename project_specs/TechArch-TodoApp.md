# TechArch: Simple To-Do List App (TodoApp)

**Version:** 1.0  
**Date:** 2026-05-03  
**Status:** Draft  
**Based On:** PRD-TodoApp.md v1.0, FRD-TodoApp.md v1.0

---

## Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Component Architecture](#2-component-architecture)
3. [Data Model](#3-data-model)
4. [API Design](#4-api-design)
5. [Security Architecture](#5-security-architecture)
6. [Technology Stack](#6-technology-stack)
7. [Integration Points](#7-integration-points)

---

## 1. Architectural Overview

### Architecture Pattern

TodoApp follows a **Single-Page Application (SPA) with Client-Side State Management** pattern. There is no backend, no server, and no network communication beyond the initial static file load. All business logic, state management, and persistence occur entirely within the browser using vanilla JavaScript and the `localStorage` API.

This architecture was chosen deliberately:
- The product scope is a single-user, local-only task manager
- No multi-user or sync requirements exist in v1
- Zero-dependency simplicity is an explicit product constraint
- `localStorage` is sufficient for the ~100KB data footprint of up to 500 tasks

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                        │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      HTML Document                        │  │
│  │                                                           │  │
│  │  ┌─────────────────────┐   ┌─────────────────────────┐   │  │
│  │  │     UI Layer        │   │   Application Logic      │   │  │
│  │  │  (index.html +      │◄──│   (app.js)               │   │  │
│  │  │   styles.css)       │   │                           │   │  │
│  │  │                     │   │  ┌───────────────────┐   │   │  │
│  │  │  ┌───────────────┐  │   │  │  State Manager    │   │   │  │
│  │  │  │  Task Input   │  │   │  │  (in-memory array)│   │   │  │
│  │  │  │  Form         │  │   │  └────────┬──────────┘   │   │  │
│  │  │  └───────────────┘  │   │           │               │   │  │
│  │  │  ┌───────────────┐  │   │  ┌────────▼──────────┐   │   │  │
│  │  │  │  Task List    │  │   │  │  Storage Manager  │   │   │  │
│  │  │  │  (#task-list) │  │   │  │  (localStorage)   │   │   │  │
│  │  │  └───────────────┘  │   │  └───────────────────┘   │   │  │
│  │  │  ┌───────────────┐  │   │                           │   │  │
│  │  │  │  Banner /     │  │   └───────────────────────────┘   │  │
│  │  │  │  Notifications│  │                                   │  │
│  │  │  └───────────────┘  │                                   │  │
│  │  └─────────────────────┘                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Browser localStorage                    │  │
│  │                                                           │  │
│  │   Key: "todoapp_tasks"  →  Value: JSON string (Task[])    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

         ▲
         │  Static file delivery only (HTML + CSS + JS)
         │
┌────────┴────────┐
│  Static Hosting │
│  (CDN / file    │
│   server /      │
│   local disk)   │
└─────────────────┘
```

### Deployment Topology

TodoApp is deployed as a set of static files requiring no server-side execution:

| Asset | File | Delivery |
|-------|------|----------|
| HTML shell | `index.html` | Served as static file |
| Styles | `styles.css` | Served as static file |
| Application logic | `app.js` | Served as static file |

**Hosting options (all valid):**
- GitHub Pages
- Netlify / Vercel (static site mode)
- Any CDN or web server capable of serving static files
- Opened directly from the local filesystem (`file://` protocol)

No build step, bundler, or server process is required. The app is operational immediately upon opening `index.html` in any supported browser.

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| No backend | Single-user scope; `localStorage` is sufficient; eliminates infrastructure complexity |
| Vanilla JS (no framework) | Zero dependencies, no build tooling, instant load, explicit product requirement |
| Full array re-serialise on every write | Simplest correct approach; 500 tasks ≈ 100KB, well within `localStorage` 5MB limit |
| Full DOM re-render on state change | Simpler than targeted patching; negligible performance cost at this scale |
| Single storage key (`todoapp_tasks`) | One source of truth; atomic read/write; no key management complexity |
| `crypto.randomUUID()` with timestamp fallback | Modern browsers support `crypto.randomUUID()`; fallback ensures compatibility |

---

## 2. Component Architecture

### File Structure

```
todoapp/
├── index.html      ← HTML shell, DOM structure, semantic markup
├── styles.css      ← All visual styling, responsive layout, state classes
└── app.js          ← All application logic, state management, localStorage I/O
```

### Component Responsibilities

#### `index.html` — HTML Shell

The single HTML document that bootstraps the application. Responsibilities:

- Declares the document structure and semantic landmarks (`<header>`, `<main>`, `<footer>`)
- Contains the task input form (`<form id="task-form">`)
- Contains the task list container (`<ul id="task-list">`)
- Contains the notification banner container (`<div id="banner" role="alert" aria-live="polite">`)
- Contains the inline validation message region (`<span id="validation-msg" aria-live="polite">`)
- Links `styles.css` and `app.js`
- Sets `<meta charset>`, `<meta name="viewport">` for responsive behaviour

```
index.html DOM Structure
─────────────────────────
<body>
  <div id="app">
    <header>
      <h1>TodoApp</h1>
    </header>
    <div id="banner" role="alert" aria-live="polite"></div>
    <main>
      <form id="task-form">
        <input id="task-input" type="text" ... />
        <button type="submit">Add</button>
        <span id="validation-msg" aria-live="polite"></span>
      </form>
      <ul id="task-list" aria-label="Task list"></ul>
      <p id="empty-state" hidden>No tasks yet. Add one above!</p>
    </main>
  </div>
</body>
```

#### `styles.css` — Visual Layer

Handles all visual presentation. Responsibilities:

- Base typography and layout (flexbox column, centred content)
- Task item layout (flex row: checkbox + name + delete button)
- Completion state class (`.task-item--completed`): strikethrough, muted text colour
- Responsive breakpoints for 320px–2560px viewports
- Touch target sizing (min 44×44px for interactive controls)
- Banner styles (persistent and auto-dismiss variants)
- Inline validation message styles
- Empty state message styles

**Key CSS classes:**

| Class | Purpose |
|-------|---------|
| `.task-item` | Base task list item row |
| `.task-item--completed` | Strikethrough + muted colour for completed tasks |
| `.banner--persistent` | Full-width persistent warning (storage unavailable at load) |
| `.banner--dismissible` | Auto-dismiss banner (write failures) |
| `.validation-msg--visible` | Shows inline input validation error |

#### `app.js` — Application Logic

The single JavaScript module containing all state management, DOM manipulation, and storage I/O. Has no external dependencies. Responsibilities:

- Application initialisation on `DOMContentLoaded`
- `localStorage` availability detection
- Task array state management (in-memory source of truth)
- All CRUD operations (add, toggle, delete)
- Task list DOM rendering
- Banner and validation message display
- Event listener binding

**Internal module layout (logical sections):**

```
app.js
──────────────────────────────────────────
1. Constants          (STORAGE_KEY, MAX_NAME_LENGTH)
2. State              (let tasks = [])
3. Storage functions  (isStorageAvailable, loadTasks, saveTasks)
4. Task functions     (addTask, toggleTask, deleteTask)
5. Render functions   (renderTaskList, renderTaskItem, showBanner,
                       showValidationMsg, clearValidationMsg)
6. Event handlers     (handleFormSubmit, handleTaskClick)
7. Init               (initApp — called on DOMContentLoaded)
```

---

## 3. Data Model

### Entity: Task

There is a single data entity in TodoApp: **Task**. Because there is no relational database, the schema is defined as the in-memory JavaScript object shape and the `localStorage` serialisation format.

#### ER Diagram

```
┌──────────────────────────────────┐
│             TASK                 │
├──────────────────────────────────┤
│  id         : string  (PK)       │
│  name       : string             │
│  completed  : boolean            │
│  createdAt  : string (ISO 8601)  │
└──────────────────────────────────┘

Storage: Browser localStorage
Key: "todoapp_tasks"
Value: JSON array of TASK objects
```

Because this application has no relational database, no foreign key relationships exist. The single entity is self-contained.

#### localStorage Schema (DDL Equivalent)

The following represents the canonical data contract for the `todoapp_tasks` storage entry:

**Storage Contract:**

| Storage Key | `"todoapp_tasks"` |
|-------------|-------------------|
| Value Type | JSON string |
| Parsed Type | `Task[]` (array) |
| Fallback | `[]` (empty array) on null, parse error, or non-array |

**Task Object Schema:**

| Field | JS Type | Constraints | Description |
|-------|---------|-------------|-------------|
| `id` | `string` | Required. Immutable after creation. Globally unique within the array. | Task identifier. Generated via `crypto.randomUUID()` or timestamp-based fallback. |
| `name` | `string` | Required. Non-empty after trim. Max 500 characters. | User-supplied task description. Stored trimmed. |
| `completed` | `boolean` | Required. Default: `false`. | Task completion status. `false` = active, `true` = done. |
| `createdAt` | `string` | Required. ISO 8601 format. Immutable after creation. | Creation timestamp. Set via `new Date().toISOString()`. |

#### JSON Schema (Formal Definition)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "TodoApp Task Array",
  "type": "array",
  "items": {
    "type": "object",
    "title": "Task",
    "required": ["id", "name", "completed", "createdAt"],
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Unique task identifier. Generated at creation. Immutable."
      },
      "name": {
        "type": "string",
        "minLength": 1,
        "maxLength": 500,
        "description": "Task description. Trimmed. Non-empty."
      },
      "completed": {
        "type": "boolean",
        "description": "Completion status. false = active, true = completed."
      },
      "createdAt": {
        "type": "string",
        "format": "date-time",
        "description": "ISO 8601 creation timestamp. Immutable."
      }
    }
  }
}
```

#### Example Stored Value

```json
[
  {
    "id": "01j2x9k4b3f0e5m7n6p8q2r1s0",
    "name": "Buy groceries",
    "completed": false,
    "createdAt": "2026-05-03T10:15:00.000Z"
  },
  {
    "id": "01j2x8a3c2e9d4l6n5o7p1q0r9",
    "name": "Read chapter 4",
    "completed": true,
    "createdAt": "2026-05-03T09:00:00.000Z"
  }
]
```

#### Data Lifecycle

```
Task Created
    │
    ▼
{ id, name, completed: false, createdAt }
    │
    ├─── Prepended to tasks[] (index 0)
    │
    ├─── Rendered at top of #task-list
    │
    └─── Serialised → localStorage["todoapp_tasks"]

Task Toggled (completed: false → true, or true → false)
    │
    ▼
tasks[i].completed = !tasks[i].completed
    │
    ├─── DOM element updated (class toggle)
    │
    └─── Serialised → localStorage["todoapp_tasks"]

Task Deleted
    │
    ▼
tasks = tasks.filter(t => t.id !== taskId)
    │
    ├─── DOM element removed
    │
    └─── Serialised → localStorage["todoapp_tasks"]
```

---

## 4. API Design

> **Note:** TodoApp has no HTTP API. It is a fully client-side application. The "API" is the set of JavaScript functions that constitute the application's internal interface. These function signatures are the contract between the UI layer and the logic/storage layer.

### TypeScript Interfaces

```typescript
// ─────────────────────────────────────────────
// Core Domain Types
// ─────────────────────────────────────────────

/**
 * A single task object. The canonical unit of data in TodoApp.
 * Stored as elements of the Task[] array in localStorage.
 */
interface Task {
  /** Unique task identifier. Generated at creation. Immutable. */
  id: string;
  /** User-supplied task description. Trimmed. Max 500 chars. */
  name: string;
  /** false = active/incomplete, true = completed */
  completed: boolean;
  /** ISO 8601 timestamp of task creation. Immutable. */
  createdAt: string;
}

/**
 * The full application state stored in localStorage.
 * Ordered array — index 0 is the most recently created task.
 */
type TaskArray = Task[];

// ─────────────────────────────────────────────
// Storage Types
// ─────────────────────────────────────────────

/** The fixed localStorage key used for all task I/O. */
const STORAGE_KEY = "todoapp_tasks" as const;

/** Maximum allowed task name length in characters. */
const MAX_TASK_NAME_LENGTH = 500 as const;

// ─────────────────────────────────────────────
// Error Types
// ─────────────────────────────────────────────

/**
 * Error codes used internally and for test assertions.
 * These correspond to user-facing messages in the error reference table.
 */
type TaskErrorCode =
  | "ERR_EMPTY_TASK"       // Submitted blank or whitespace-only input
  | "ERR_TASK_TOO_LONG"    // Input exceeds MAX_TASK_NAME_LENGTH
  | "ERR_STORAGE_READ"     // localStorage.getItem threw
  | "ERR_STORAGE_WRITE"    // localStorage.setItem threw
  | "ERR_STORAGE_QUOTA"    // setItem threw QuotaExceededError
  | "ERR_STORAGE_PARSE"    // JSON.parse threw on load
  | "ERR_TASK_NOT_FOUND"   // Toggle/delete fired for unknown ID
  | "ERR_RENDER_FAILED";   // Unhandled exception in renderTaskList

/** Validation result returned from input validation. */
interface ValidationResult {
  valid: boolean;
  errorCode?: TaskErrorCode;
  errorMessage?: string;
}

// ─────────────────────────────────────────────
// Banner / Notification Types
// ─────────────────────────────────────────────

type BannerVariant = "persistent" | "dismissible";

interface BannerOptions {
  /** Message text to display in the banner. */
  message: string;
  /** "persistent" = stays until condition resolves; "dismissible" = auto-dismisses after 5s. */
  variant: BannerVariant;
  /** Auto-dismiss delay in milliseconds. Only used when variant is "dismissible". Default: 5000. */
  dismissAfterMs?: number;
}
```

### Function Interface Specification

```typescript
// ─────────────────────────────────────────────
// Initialisation
// ─────────────────────────────────────────────

/**
 * Initialises the application.
 * Called once on DOMContentLoaded.
 * - Detects localStorage availability
 * - Loads tasks from storage
 * - Renders the initial task list
 * - Binds form submit and task list event listeners
 */
function initApp(): void;

// ─────────────────────────────────────────────
// Storage Functions
// ─────────────────────────────────────────────

/**
 * Tests whether localStorage is readable and writable.
 * Uses a probe key to attempt setItem/removeItem.
 * Returns false and shows a persistent banner if unavailable.
 */
function isStorageAvailable(): boolean;

/**
 * Reads and deserialises the task array from localStorage.
 * Returns [] on: null result, JSON parse error, or non-array value.
 * Side effect: displays persistent banner if storage is unavailable.
 */
function loadTasks(): Task[];

/**
 * Serialises and writes the full task array to localStorage.
 * Side effect: displays a dismissible banner on write failure.
 * @param tasks - The current complete in-memory task array.
 */
function saveTasks(tasks: Task[]): void;

// ─────────────────────────────────────────────
// Task CRUD Functions
// ─────────────────────────────────────────────

/**
 * Validates the input, creates a new Task, and prepends it to the array.
 * @param name - Raw user input string. Trimmed internally before use.
 * @returns The created Task object on success; null if validation fails.
 * Side effects: calls saveTasks(), calls renderTaskList().
 */
function addTask(name: string): Task | null;

/**
 * Flips the completed boolean on the task matching taskId.
 * No-op (with console warning) if taskId is not found.
 * @param taskId - The id of the target task.
 * Side effects: calls saveTasks(), updates the task item DOM element.
 */
function toggleTask(taskId: string): void;

/**
 * Removes the task matching taskId from the in-memory array and DOM.
 * No-op (with console warning) if taskId is not found.
 * @param taskId - The id of the target task.
 * Side effects: calls saveTasks(), removes/updates DOM.
 */
function deleteTask(taskId: string): void;

// ─────────────────────────────────────────────
// Render Functions
// ─────────────────────────────────────────────

/**
 * Renders the full task array to the #task-list DOM element.
 * Clears and re-populates #task-list on every call.
 * Shows #empty-state element when the array is empty.
 * @param tasks - The current in-memory task array.
 */
function renderTaskList(tasks: Task[]): void;

/**
 * Creates and returns a DOM element for a single task item.
 * @param task - The task object to render.
 * @returns An HTMLLIElement representing the task item row.
 */
function renderTaskItem(task: Task): HTMLLIElement;

/**
 * Displays a notification banner in #banner.
 * @param options - Banner configuration (message, variant, dismissAfterMs).
 */
function showBanner(options: BannerOptions): void;

/**
 * Dismisses and clears the active banner in #banner.
 */
function clearBanner(): void;

/**
 * Displays an inline validation message below the task input.
 * @param message - The error message text to display.
 */
function showValidationMsg(message: string): void;

/**
 * Clears the inline validation message.
 */
function clearValidationMsg(): void;

// ─────────────────────────────────────────────
// Utility / Helper Functions
// ─────────────────────────────────────────────

/**
 * Generates a unique string ID for a new task.
 * Uses crypto.randomUUID() when available.
 * Falls back to timestamp + random string for older environments.
 * @returns A unique string identifier.
 */
function generateId(): string;

/**
 * Validates a raw task name string.
 * Trims whitespace before validation.
 * @param rawName - The raw input string from the user.
 * @returns A ValidationResult indicating success or the specific error.
 */
function validateTaskName(rawName: string): ValidationResult;

// ─────────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────────

/**
 * Handles form submit events from #task-form.
 * Reads #task-input value, calls addTask(), manages validation display.
 * @param event - The native submit Event.
 */
function handleFormSubmit(event: Event): void;

/**
 * Handles click events on #task-list via event delegation.
 * Dispatches to toggleTask() or deleteTask() based on the clicked element.
 * @param event - The native click Event.
 */
function handleTaskListClick(event: Event): void;
```

### State Flow Diagram

```
User Action → Event Handler → Business Logic → State Mutation → Persist → Re-render
─────────────────────────────────────────────────────────────────────────────────────

[Type + Submit]
      │
      ▼
handleFormSubmit(event)
      │
      ├─ validateTaskName(rawName)
      │       ├─ INVALID → showValidationMsg(message) → STOP
      │       └─ VALID ──────────────────────────────────────┐
      │                                                       ▼
      │                                               addTask(name)
      │                                                       │
      │                                               tasks.unshift(newTask)
      │                                                       │
      │                                               saveTasks(tasks)
      │                                                       │
      │                                               renderTaskList(tasks)
      │
[Click Checkbox]
      │
      ▼
handleTaskListClick(event)
      │
      ├─ target is checkbox → toggleTask(taskId)
      │                               │
      │                       task.completed = !task.completed
      │                               │
      │                       saveTasks(tasks)
      │                               │
      │                       Update task item DOM class
      │
      └─ target is delete btn → deleteTask(taskId)
                                       │
                               tasks = tasks.filter(...)
                                       │
                               saveTasks(tasks)
                                       │
                               renderTaskList(tasks)
```

---

## 5. Security Architecture

### Authentication

**None.** TodoApp is explicitly a single-user, local-only application. There is no user identity, no session, and no authentication mechanism. This is a deliberate product decision documented in the PRD.

All data is owned by the browser's origin. No credentials are ever created, stored, or transmitted.

### Authorization

**Not applicable.** There is one implicit "user" — whoever has access to the browser. No role-based or permission-based access control exists or is needed.

### Data Protection

| Concern | Approach |
|---------|----------|
| Data at rest | Task data lives in browser `localStorage`. It is not encrypted. This is appropriate for non-sensitive personal task names. |
| Data in transit | No data is ever transmitted. There are no HTTP requests after initial static file load. |
| Data isolation | `localStorage` is origin-scoped by the browser. Data is inaccessible to other origins. |
| Sensitive data | Task names are user-supplied personal notes. No authentication tokens, passwords, or PII are stored. |
| XSS prevention | Task names must be rendered via `textContent` (not `innerHTML`) to prevent stored XSS injection via task name content. |

### XSS Mitigation (Critical)

Because task names are user-supplied strings rendered into the DOM, injection prevention is essential:

```javascript
// CORRECT — safe text rendering
taskNameElement.textContent = task.name;

// INCORRECT — vulnerable to XSS
taskNameElement.innerHTML = task.name; // NEVER use for user content
```

All user-supplied strings (`task.name`) must be set exclusively via `textContent` or `innerText`, never `innerHTML`.

### Content Security Policy (Recommended)

A `<meta>` CSP header is recommended to limit attack surface:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self';">
```

This blocks inline scripts, external resources, and eval, providing defence-in-depth even for a fully local app.

### Privacy

- No analytics, no telemetry, no third-party scripts
- No data ever leaves the user's browser
- Clearing browser data (`localStorage`) is the complete "delete my data" mechanism
- The app should clearly communicate (via documentation and/or UI) that data is local-only

---

## 6. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Markup | HTML5 | Living Standard | Document structure, semantic elements, form controls |
| Styling | CSS3 | Living Standard | Layout (Flexbox), responsive design, state classes |
| Logic | JavaScript (ES2020+) | ES2020 | Application logic, DOM manipulation, state management |
| Persistence | Browser `localStorage` | Web Storage API | Client-side task data persistence |
| ID Generation | `crypto.randomUUID()` | Web Crypto API | UUID v4 generation for task IDs |
| Build Tools | None | — | No bundler, transpiler, or build step required |
| Dependencies | None | — | Zero external libraries or frameworks |
| Hosting | Static file server | Any | GitHub Pages, Netlify, Vercel, local filesystem |

### Browser APIs Used

| API | Usage | Fallback |
|-----|-------|---------|
| `localStorage` | Task persistence | Graceful degradation with warning banner |
| `crypto.randomUUID()` | Task ID generation | Timestamp + `Math.random()` composite string |
| `DOMContentLoaded` event | App initialisation | — |
| `JSON.stringify` / `JSON.parse` | Data serialisation | — |
| `Element.textContent` | Safe DOM text insertion | — |
| `aria-live` regions | Accessible notifications | — |

### ES2020+ Features Used

| Feature | Usage |
|---------|-------|
| Optional chaining (`?.`) | Safe property access on potentially undefined objects |
| Nullish coalescing (`??`) | Fallback values without falsy short-circuit issues |
| `Array.prototype.filter` | Task deletion (non-destructive array update) |
| Template literals | DOM string construction |
| `const` / `let` | Block-scoped variable declarations |
| Arrow functions | Concise callbacks for event handlers and array methods |

All features are natively supported in current versions of Chrome, Firefox, Safari, and Edge without transpilation.

---

## 7. Integration Points

### External Integrations

**None.** TodoApp has zero external integrations in v1. No third-party APIs, services, CDNs, analytics platforms, or authentication providers are used or required.

This is a deliberate architectural constraint:
- No network dependencies after initial file load
- Fully functional offline after first visit
- Zero third-party attack surface
- No privacy or GDPR implications from external data sharing

### Browser API Integrations

These are the only "integration points" — all native browser capabilities:

| Integration | API | Usage | Failure Mode |
|-------------|-----|-------|--------------|
| Local Storage | `window.localStorage` | Primary task persistence | Graceful degradation; in-memory only session; persistent warning banner |
| Web Crypto | `crypto.randomUUID()` | UUID generation for task IDs | Fallback to `Date.now().toString(36) + Math.random().toString(36).slice(2)` |
| DOM | `document.getElementById`, `document.createElement`, etc. | All UI rendering | App is non-functional if DOM unavailable (fatal, cannot recover) |

### Future Integration Considerations (v2+)

The following integration points are out of scope for v1 but are noted here for forward-compatibility planning:

| Integration | Trigger | Notes |
|-------------|---------|-------|
| Backend sync API | Multi-device or multi-user requirement | Would require REST/WebSocket API, authentication, and a database |
| Push notifications | Due date reminders feature | Requires Service Worker and Push API |
| Cloud storage | Task backup / sync | Would replace `localStorage` with remote storage calls |
| Analytics | Usage tracking | Explicit product decision to exclude from v1 |

---

## Appendix: Error Reference

| Error Code | Feature | Trigger | User Message | Display Pattern |
|------------|---------|---------|--------------|-----------------|
| `ERR_EMPTY_TASK` | F0 | Submit blank/whitespace input | "Task name cannot be empty" | Inline, below input |
| `ERR_TASK_TOO_LONG` | F0 | Input > 500 characters | "Task name must be 500 characters or fewer" | Inline, below input |
| `ERR_STORAGE_READ` | F4 | `getItem` throws | "Storage is unavailable. Tasks will not be saved between sessions." | Persistent banner |
| `ERR_STORAGE_WRITE` | F4 | `setItem` throws | "Changes could not be saved — storage unavailable" | Auto-dismiss banner (5s) |
| `ERR_STORAGE_QUOTA` | F4 | `setItem` throws `QuotaExceededError` | "Storage full — task not saved" | Auto-dismiss banner (5s) |
| `ERR_STORAGE_PARSE` | F4 | `JSON.parse` throws on load | Silent — log to console; empty list shown | Console only |
| `ERR_TASK_NOT_FOUND` | F2, F3 | Toggle/delete for unknown ID | Silent — log to console | Console only |
| `ERR_RENDER_FAILED` | F1 | Unhandled exception in `renderTaskList` | "Unable to display tasks. Please refresh the page." | Static fallback message |

---

*TechArch generated: 2026-05-03*  
*Source: PRD-TodoApp.md v1.0, FRD-TodoApp.md v1.0*  
*Next: UserStories-TodoApp.md*
