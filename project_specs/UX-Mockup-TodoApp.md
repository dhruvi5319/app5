# UX Mockup: Simple To-Do List App (TodoApp)

**Project:** TodoApp — Simple To-Do List App
**Generated:** 2026-05-03
**Based on:** UserStories-TodoApp.md, PRD-TodoApp.md, FRD-TodoApp.md, JOURNEYS-TodoApp.md
**Version:** 1.0

---

## Overview

TodoApp is a single-screen, zero-friction personal task manager. The UX philosophy mirrors the product vision: **the app must stay completely out of your way**. Every design decision prioritises speed of capture, immediate feedback, and trust in persistence.

### Design Principles

1. **One screen, always.** No navigation, no modals, no page transitions. Everything happens in-place.
2. **Input first.** The task input field is always above the fold, autofocused on load, and never requires scrolling to reach. This is a hard layout constraint derived from every user journey.
3. **Instant feedback.** Every action — add, complete, delete — is reflected in the UI immediately with no loading states required (client-side only).
4. **Silent persistence.** Data saving is invisible under normal conditions. Warnings appear only when something is wrong, not as noise on every successful save.
5. **Visual clarity over decoration.** The only visual distinction that matters is active vs. completed. Everything else is stripped away.

### Persona Design Notes

- **Marcus Webb** (keyboard-first, time-pressured): Needs autofocus, Enter-to-submit, and a list he can scan in seconds. Zero clicks to reach input.
- **Priya Nair** (mouse/touch, mobile user): Needs a prominent Add button, touch-friendly targets (≥44×44px), and a layout that works on 375px without scrolling to find the input.

---

## User Flows

---

### Flow 1: First-Time Task Capture (JRN-01.1)

**Trigger:** User opens the app for the first time (empty localStorage)
**User Stories:** US-0.1, US-0.2, US-1.3, US-4.1

```
[App Loads]
    │
    ▼
[Input Field: autofocused, empty]
[Task List Area: Empty State — "No tasks yet. Add one above!"]
    │
    ├── User types task name + presses Enter / clicks "Add"
    │       │
    │       ├── Input is empty or whitespace only
    │       │       │
    │       │       └──▶ [Inline Error: "Task name cannot be empty"]
    │       │              Input retains focus → user edits → error clears
    │       │
    │       ├── Input exceeds 500 characters
    │       │       │
    │       │       └──▶ [Inline Error: "Task name must be 500 characters or fewer"]
    │       │              Input retains focus and content → user edits
    │       │
    │       └── Input is valid (non-empty, ≤500 chars after trim)
    │               │
    │               ▼
    │           [Task prepended to list — top position]
    │           [Input cleared, focus returned to input]
    │           [Empty state disappears]
    │           [localStorage written silently]
    │               │
    │               └──▶ [Exit: User closes tab / returns later → Flow 4]
    │
    └── User does nothing → [Empty state persists]
```

**Steps:**
1. Page loads → input field is visible, autofocused, placeholder text invites entry
2. Empty state message "No tasks yet. Add one above!" is displayed in the list area
3. User types a task name
4. User submits via Enter or "Add" button
5. System trims whitespace, validates input
6. On success: task appears at top of list; input clears; focus returns to input; localStorage updated silently
7. On failure: inline error shown below input; input retains focus and content

---

### Flow 2: Morning Triage — Returning User Session (JRN-01.2)

**Trigger:** User reopens the app with existing tasks in localStorage
**User Stories:** US-1.1, US-1.2, US-1.4, US-1.5, US-2.1, US-2.2, US-3.1, US-4.1, US-4.3

```
[App Loads]
    │
    ▼
[localStorage read → tasks restored]
    │
    ├── Storage unavailable → [Persistent Warning Banner] → [Empty list, in-memory only]
    │
    └── Storage available → [Task list rendered, newest-first]
            │
            ▼
    [User scans list: active tasks (normal) vs. completed (strikethrough + muted)]
            │
            ├── Click completion checkbox on active task
            │       │
            │       └──▶ [Task immediately shows strikethrough + muted color]
            │              [localStorage updated silently]
            │
            ├── Click completion checkbox on completed task
            │       │
            │       └──▶ [Strikethrough + muted color removed immediately]
            │              [localStorage updated silently]
            │
            ├── Click delete button on task
            │       │
            │       └──▶ [Task removed from list immediately]
            │              [localStorage updated silently]
            │              [If last task deleted → Empty state appears]
            │
            └── Type new task in input + submit
                    │
                    └──▶ [New task prepended at top of list]
```

**Steps:**
1. Page loads → localStorage read → all tasks restored with correct completion states
2. User scans list top-to-bottom; active and completed tasks are visually distinct
3. User toggles completion on tasks (bidirectional — checked ↔ unchecked)
4. User deletes stale tasks via delete button (one-click, no confirmation)
5. User optionally adds new tasks via the always-visible input at top

---

### Flow 3: Mobile Rapid Capture (JRN-02.1)

**Trigger:** User opens app on mobile (375px viewport) with limited time
**User Stories:** US-0.1, US-0.2, US-1.1, US-1.4, US-4.1

```
[App Loads on Mobile]
    │
    ▼
[Input field visible WITHOUT scrolling — above fold]
[Soft keyboard opens on page load due to autofocus — this is intentional; consistent with rapid-capture use case]
    │
    ▼
[User types task → presses Enter or taps "Add" button]
    │
    ▼
[Task appears in list below input]
[New task confirmation visible above keyboard or scrollable into view]
    │
    ▼
[User repeats for each task — rapid successive adds]
    │
    ▼
[User confirms all tasks are in list, puts phone away]
    │
    └──▶ [Exit: App backgrounded; tasks persist in localStorage]
```

**Steps:**
1. App loads instantly on mobile; input field is visible without scrolling
2. Touch targets for Add button, checkboxes, and delete buttons are ≥44×44px
3. Task names wrap gracefully on narrow screens — no horizontal overflow
4. After each successful add, new task appears and input is cleared for next entry
5. User can verify all added tasks are visible in the list

---

### Flow 4: Storage Error Handling (JRN across US-4.4, US-4.5, US-4.6)

**Trigger:** localStorage is unavailable at load, or a write fails mid-session
**User Stories:** US-4.4, US-4.5, US-4.6, US-4.7

```
[App Loads]
    │
    ├── localStorage unavailable (private mode, blocked)
    │       │
    │       └──▶ [Persistent Warning Banner — top of page]
    │              "Storage is unavailable. Tasks will not be saved between sessions."
    │              [App functions in-memory; tasks usable for session only]
    │
    └── localStorage available → tasks loaded normally
            │
            ▼
    [User performs action: add / complete / delete]
            │
            ├── setItem succeeds → silent; no UI feedback
            │
            ├── setItem fails (general error)
            │       │
            │       └──▶ [Auto-dismiss Banner: "Changes could not be saved — storage unavailable"]
            │              [Dismisses after 5 seconds]
            │              [In-memory state and UI remain intact]
            │
            └── setItem fails (QuotaExceededError)
                    │
                    └──▶ [Auto-dismiss Banner: "Storage full — task not saved"]
                           [Dismisses after 5 seconds]
                           [User can delete tasks to free space]
```

---

## Screen Designs

---

### Screen: Main App View (Default State)

**Purpose:** The single screen of the entire application. Handles task creation, display, completion, and deletion.
**User Stories:** US-0.1, US-0.2, US-1.1, US-1.2, US-1.3, US-1.4, US-1.5, US-2.1, US-2.2, US-3.1, US-4.4

#### Layout — Desktop (>768px)

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [⚠ Storage Warning Banner — full width, top]        │  ← Only shown when storage unavailable (US-4.4)
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│              My Tasks                                │  ← App title / heading (h1)
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────────────────────┐  ┌──────────┐  │
│  │  What needs to be done?         │  │   Add    │  │  ← Task input + Add button (US-0.1, US-0.2)
│  └─────────────────────────────────┘  └──────────┘  │
│  [inline validation message area]                    │  ← US-0.3, US-0.4 (hidden by default)
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Task List (scrollable)                          │ │  ← US-1.1
│  │                                                  │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │ [☐]  Buy groceries                   [✕]  │  │ │  ← Active task row (US-1.5)
│  │  └────────────────────────────────────────────┘  │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │ [☑]  ~~Read chapter 4~~              [✕]  │  │ │  ← Completed task row (US-1.2)
│  │  └────────────────────────────────────────────┘  │ │
│  │  ┌────────────────────────────────────────────┐  │ │
│  │  │ [☐]  Call Sarah about invoice        [✕]  │  │ │
│  │  └────────────────────────────────────────────┘  │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### Layout — Empty State

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│              My Tasks                                │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────────────────────┐  ┌──────────┐  │
│  │  What needs to be done?         │  │   Add    │  │
│  └─────────────────────────────────┘  └──────────┘  │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                  │ │
│  │        No tasks yet. Add one above!              │ │  ← Empty state (US-1.3, US-3.3)
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### Information Hierarchy

| Priority | Content | Placement | Rationale |
|----------|---------|-----------|-----------|
| Primary | Task input field | Top of content area, above the list | Every journey requires immediate access to input (JRN-01.1, JRN-02.1) |
| Primary | Task list | Below input, fills remaining viewport | Core content surface |
| Secondary | Task names | Left-aligned in each row, full width | Scan efficiency (JRN-01.2, JRN-02.2) |
| Secondary | Completion checkbox | Left side of each task row | Natural left-to-right reading flow; acts first |
| Secondary | Delete button | Right side of each task row | Destructive action positioned away from checkbox to avoid misclicks |
| Tertiary | App title/heading | Above input | Orientation only; not primary interaction target |
| Contextual | Inline validation message | Below input field | Appears only on rejected submission; disappears on typing |
| Contextual | Storage warning banners | Top of page, above title | System status; non-intrusive positioning |

---

### Screen: Task Row — Active State

**Purpose:** Individual task item in its default incomplete state.
**User Stories:** US-1.1, US-1.5, US-2.1, US-3.1

```
┌──────────────────────────────────────────────────────────┐
│  [☐]   Buy groceries                              [✕]    │
│   ↑    ↑                                           ↑     │
│ chkbox task name (normal weight, normal color)   delete  │
└──────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Background: default (white or very light neutral)
- Task name: normal font weight, full contrast text color
- Checkbox: unchecked state, native `<input type="checkbox">` or styled equivalent
- Delete button (`✕` or trash icon): muted color, becomes higher contrast on hover/focus
- Min row height: 48px (ensures 44px touch target with padding)

---

### Screen: Task Row — Completed State

**Purpose:** Individual task item after completion toggle.
**User Stories:** US-1.2, US-2.1, US-2.2

```
┌──────────────────────────────────────────────────────────┐
│  [☑]   ~~Read chapter 4~~                         [✕]    │
│   ↑    ↑                                           ↑     │
│checked  strikethrough + muted color              delete  │
└──────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Task name: `text-decoration: line-through` + muted/reduced-contrast text color (e.g., `#888` on white bg)
- Both strikethrough AND color change applied simultaneously — color is not the sole differentiator (US-1.2, accessibility)
- Checkbox: checked state
- Delete button: same as active state
- Background: optional very subtle tint (e.g., `#f9f9f9`) — if used, must not be sole differentiator

---

### Screen: Input Validation Error State

**Purpose:** Communicate invalid submission without disrupting flow.
**User Stories:** US-0.3, US-0.4

```
┌──────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  ┌───────────┐  │
│  │  [cursor here]                     │  │    Add    │  │
│  └────────────────────────────────────┘  └───────────┘  │
│  ⚠ Task name cannot be empty                            │  ← Inline error (US-0.3)
│                                                          │
│  — OR —                                                  │
│                                                          │
│  ⚠ Task name must be 500 characters or fewer            │  ← Inline error (US-0.4)
└──────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Error text: small font, error/warning color (e.g., red `#c0392b`), appears directly below input
- Input field: optional error border highlight (e.g., red border)
- Error message clears immediately when user begins typing (US-0.3 AC)
- Input retains focus and content (for too-long error) after rejection

---

### Screen: Storage Warning Banners

**Purpose:** Communicate persistence failures without blocking the app.
**User Stories:** US-4.4, US-4.5, US-4.6

#### Persistent Banner (storage unavailable at load — US-4.4)

```
┌──────────────────────────────────────────────────────────┐
│  ⚠  Storage is unavailable. Tasks will not be saved     │
│     between sessions.                                    │
└──────────────────────────────────────────────────────────┘
[App title]
[Input field]
[Task list]
```

**Visual spec:**
- Full-width banner at very top of page, above the app title
- Amber/warning background (e.g., `#fff3cd` with `#856404` text)
- Does NOT auto-dismiss — persists until storage condition resolves
- Does not block or overlap the task input or list
- Icon: ⚠ or equivalent warning symbol for non-color context

#### Auto-Dismiss Banner (write failure — US-4.5)

```
┌──────────────────────────────────────────────────────────┐
│  ⚠  Changes could not be saved — storage unavailable    │
└──────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Same visual treatment as persistent banner
- Auto-dismisses after 5 seconds (no manual close required, but close [✕] is a nice-to-have)
- Does not block the input field or task list (US-4.5 AC)

#### Auto-Dismiss Banner (quota exceeded — US-4.6)

```
┌──────────────────────────────────────────────────────────┐
│  ⚠  Storage full — task not saved                       │
└──────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Same visual treatment, different message — distinct from general write failure (US-4.6 AC)
- Auto-dismisses after 5 seconds

---

## Interaction Patterns

---

### Pattern 1: Task Submission (Enter Key)

**When to use:** User has focus in the input field and presses Enter
**User Stories:** US-0.1, US-0.3, US-0.4, US-0.5
**Referenced in:** JRN-01.1 (Capture stage), JRN-01.2 (Capture New stage)

**Behavior:**
1. Keydown event on Enter captured while `#task-input` is focused
2. Input value trimmed of leading/trailing whitespace
3. Validation:
   - If empty after trim → show inline error "Task name cannot be empty"; return focus to input; do NOT add task
   - If >500 chars after trim → show inline error "Task name must be 500 characters or fewer"; return focus to input; do NOT add task
4. If valid → create task; prepend to list; clear input; return focus to input; save to localStorage
5. Inline error (if present) clears on next `input` event (keydown/keyup)

---

### Pattern 2: Task Submission (Add Button Click)

**When to use:** User clicks the "Add" button with mouse or touch
**User Stories:** US-0.2, US-0.3, US-0.4, US-0.5
**Referenced in:** JRN-02.1 (Add Tasks stage)

**Behavior:**
- Identical validation and submission logic as Enter key (Pattern 1)
- Button must be keyboard-focusable and activatable via Enter/Space
- After successful add, focus returns to the input field (not the button)
- Button label "Add" must be visible text (not icon-only) — accessible label requirement

---

### Pattern 3: Completion Toggle

**When to use:** User clicks/taps the checkbox on any task row
**User Stories:** US-2.1, US-2.2, US-2.3
**Referenced in:** JRN-01.2 (Mark Done), JRN-02.2 (Mark Complete, Toggle Back)

**Behavior:**
1. Click/tap on checkbox element for a task row
2. System finds task by `data-task-id` attribute
3. Flips `completed` boolean in in-memory array
4. Updates DOM for that task row:
   - `completed = true`: adds strikethrough class + muted color class; sets checkbox to checked
   - `completed = false`: removes strikethrough class + muted color class; sets checkbox to unchecked
5. Saves updated array to localStorage
6. No page reload; update is immediate (< one frame)

**One-click principle:** Complete in a single interaction. No confirmation. Bidirectional.

---

### Pattern 4: Task Deletion

**When to use:** User clicks/taps the delete button on any task row
**User Stories:** US-3.1, US-3.2, US-3.3
**Referenced in:** JRN-01.2 (Delete Stale), JRN-02.2 (Delete Cancelled)

**Behavior:**
1. Click/tap on delete button for a task row
2. System finds task by `data-task-id` attribute
3. Removes task from in-memory array
4. Removes task item element from DOM immediately
5. Checks if array is now empty → if yes, render empty state message
6. Saves updated array to localStorage
7. No confirmation dialog (v1 simplicity constraint, US-3.1 AC)
8. No undo mechanism (US-3.2)

**Accessibility:** Delete button has `aria-label="Delete task: [task name]"` to identify which task is being deleted.

---

### Pattern 5: Real-Time List Update

**When to use:** Any state change (add, complete, delete) occurs
**User Stories:** US-1.4
**Referenced in:** All four journeys

**Behavior:**
- All mutations update the DOM synchronously in the same event handler call
- No artificial delays, animations, or loading states between action and list update
- List always renders in newest-first order (index 0 = top)
- No page reload required for any operation

---

### Pattern 6: Page Load Restoration

**When to use:** User opens or refreshes the app
**User Stories:** US-4.1, US-4.2, US-4.3, US-4.7
**Referenced in:** JRN-01.1 (Close & Return), JRN-01.2 (Return), JRN-02.1 (Resume Later)

**Behavior:**
1. `DOMContentLoaded` fires → `initApp()` called
2. `isStorageAvailable()` check:
   - If false → show persistent warning banner; initialise with empty array
3. `loadTasks()` reads `localStorage.getItem("todoapp_tasks")`
   - `null` → empty array; show empty state
   - Parse fails → empty array; log to console; show empty state (no user-facing error per US-4.7)
   - Not an array → empty array; log warning
   - Valid array → use as in-memory state
4. `renderTaskList()` called with loaded array
5. Task input field receives focus

---

### Pattern 7: Inline Validation Feedback

**When to use:** User submits an invalid task
**User Stories:** US-0.3, US-0.4

**Behavior:**
- Error message appears below the input field immediately on failed submit
- Error text is associated with the input via `aria-describedby` (screen reader announced)
- Error clears on the next `input` event (as soon as user begins typing)
- Input field retains focus throughout (never loses focus after a rejected submission)
- The error container is always present in the DOM but empty/hidden by default (avoids layout shift)

---

## States Reference

### Task List: All States

| State | Trigger | Display |
|-------|---------|---------|
| Empty (first load) | No prior localStorage data | "No tasks yet. Add one above!" centered in list area |
| Empty (after deletion) | Last task deleted | Same empty state message; input remains functional |
| Populated | 1+ tasks in array | Vertical list of task rows, newest at top |
| Scrollable | Tasks exceed viewport height | List scrolls; input field stays fixed above (does not scroll away) |

### Task Row: All States

| State | Appearance | Trigger |
|-------|------------|---------|
| Active (default) | Normal text, unchecked checkbox | Task created or toggled back to incomplete |
| Completed | Strikethrough + muted text color, checked checkbox | Completion toggle clicked |
| Delete hover/focus | Delete button becomes more prominent | Mouse hover or keyboard focus on delete button |

### Input Field: All States

| State | Appearance | Trigger |
|-------|------------|---------|
| Default (autofocused) | Empty, cursor visible, placeholder text showing | Page load |
| Typing | Input value visible, placeholder hidden | User types |
| Validation error | Error message visible below input; optional error border | Empty/whitespace or too-long submission |
| Post-submit | Cleared, cursor visible | Successful task add |

### Storage Banners: All States

| State | Banner | Behavior |
|-------|--------|----------|
| Storage OK | None | Silent; no UI |
| Storage unavailable at load | Persistent amber banner (US-4.4) | Stays until condition resolves |
| Write failure | Auto-dismiss amber banner (US-4.5) | Disappears after 5 seconds |
| Quota exceeded | Auto-dismiss amber banner (US-4.6) | Disappears after 5 seconds |

---

## Responsive Considerations

### Desktop (>768px)

- Input field and Add button on same row (flex row, input grows to fill space)
- Task list has comfortable padding and readable line height
- Delete button visible at all times on the right side of each row (no hover reveal needed — always visible per US-1.5 AC)
- Max content width: ~640px centered, to prevent overly wide task rows on large monitors
- Autofocus on input field (no mobile keyboard concern)

```
[Input field ──────────────────────────────] [Add]
────────────────────────────────────────────────
[☐] Task name text                        [✕]
[☑] ~~Completed task text~~               [✕]
[☐] Another active task                   [✕]
```

### Tablet (480px – 768px)

- Same single-column layout as desktop
- Input + Add button remain on same row (input slightly narrower)
- Touch targets already ≥44×44px from mobile spec — tablet inherits this
- Font size may increase slightly for improved tap accuracy

### Mobile (<480px, target: 375px)

- Input field and Add button stack or remain on same row (Add button minimum 44px wide)
- Input field takes full width minus Add button
- Task rows: full width, task name wraps to multiple lines if needed (no horizontal overflow/scroll)
- Delete button: right-aligned, minimum 44×44px tap target
- Checkbox: minimum 44×44px tap target (padding-based expansion if needed)
- Input field is visible without scrolling on page load — this is a hard layout constraint (JRN-02.1)
- Soft keyboard: after task add, input clears and is scrolled into view if keyboard pushed it off screen
- No pinch-zoom required at any point

```
[Input field ──────────────────] [Add]
──────────────────────────────────────
[☐]  Task name text           [✕]
[☑]  ~~Completed task~~       [✕]
```

### Critical Mobile Constraint (from JRN-02.1)

> The task input field must be visible and reachable without scrolling on a 375px viewport, even when the task list contains many items. This means the input must be positioned above the task list (not after it), and the task list must scroll independently — not the whole page.

**Implementation implication:** The task list area should be a scrollable container (`overflow-y: auto`) with a constrained height, while the input area remains fixed above it. This ensures the input is never pushed off-screen by a long list.

---

## Accessibility Notes

### Focus Management

- **Input autofocus on load** (US-0.1 AC): `autofocus` attribute on the task input. Applies on all viewports including mobile. On mobile, this intentionally triggers the soft keyboard to open on page load — consistent with the rapid-capture use case (JRN-02.1). Avoid patterns that steal focus away after it is established.
- **Focus return after submit**: After a successful task add, focus returns to the input field (not the newly created task) — enables rapid successive entry (JRN-02.1 rapid capture).
- **Focus retention on error**: After a rejected submission, focus stays in the input field — user never has to re-click to fix their input.

### Keyboard Navigation

- **Tab order**: App title → Input field → Add button → Task list items (each row: checkbox → delete button)
- **Enter/Space on Add button**: Both activate submission (standard button behavior)
- **Enter/Space on checkbox**: Toggles completion state (native checkbox handles this)
- **Enter/Space on delete button**: Triggers deletion
- All interactive elements reachable via Tab; no keyboard traps

### ARIA / Screen Reader Support

| Element | ARIA Requirement | Rationale |
|---------|-----------------|-----------|
| Task input | `aria-label="New task"` or visible `<label>` | Identifies the input |
| Add button | Visible text label "Add" | No icon-only buttons |
| Checkbox per task | Native `<input type="checkbox">` with `<label>` | Semantic form element |
| Delete button | `aria-label="Delete task: [task name]"` | Dynamic label identifies which task (US-1.5 AC, FRD) |
| Empty state message | `aria-live="polite"` region | Announced when list becomes empty (US-1.3 AC) |
| Validation error | `aria-live="polite"` or `aria-describedby` on input | Announced on invalid submission |
| Storage warning banner | `role="alert"` or `aria-live="assertive"` | Immediate announcement of storage failure |

### Color and Visual Design

- **Completed task differentiation**: Strikethrough text (`text-decoration: line-through`) AND muted color — both applied simultaneously. Color alone is never the sole differentiator (US-1.2 AC, FRD non-functional spec).
- **Error messages**: Should not rely on color alone — use an icon (⚠) plus text.
- **Minimum contrast ratio**: 4.5:1 for normal text (WCAG AA). Muted completed-task text must still meet a minimum of 3:1 against its background.
- **Focus indicators**: All focusable elements must have a visible focus ring — do not remove `outline` without providing an equivalent visible indicator.

### Touch Accessibility (Mobile)

- All interactive controls (checkbox, delete button, Add button): minimum 44×44px touch target (FRD NFR spec)
- Sufficient spacing between adjacent controls on each task row to prevent mis-taps between checkbox and delete button

---

## Element & Component Inventory

| Component | HTML Element | Notes |
|-----------|-------------|-------|
| App title | `<h1>` | "My Tasks" or "TodoApp" |
| Storage warning banner | `<div role="alert">` or `<aside>` | Persistent or auto-dismiss |
| Local-data footnote | `<footer>` or `<p>` below task list | Static, always-visible note: "Tasks are saved locally in this browser only." Sets expectations for cross-device/cross-browser behavior without alarming users. Not dismissible. |
| Task input field | `<input type="text">` | `autofocus`, `placeholder`, `maxlength="500"` (soft limit; validation still runs) |
| Add button | `<button type="submit">` | Inside a `<form>` to capture Enter key naturally |
| Validation message area | `<p aria-live="polite">` | Below input; empty by default |
| Task list container | `<ul>` or `<ol>` | `id="task-list"`; scrollable |
| Empty state message | `<li>` or `<p>` inside list container | `aria-live="polite"` |
| Task row | `<li>` | `data-task-id="[id]"` |
| Completion checkbox | `<input type="checkbox">` with `<label>` | Checked state reflects `completed` |
| Task name text | `<span>` or `<label>` text | Styled via class for completed state |
| Delete button | `<button type="button">` | `aria-label="Delete task: [name]"` |

---

## Design Anti-Patterns to Avoid

These patterns were explicitly excluded based on user journey analysis:

| Anti-Pattern | Why Avoided | Source |
|-------------|-------------|--------|
| Delete confirmation modal | Adds an interaction step; breaks one-click principle; v1 simplicity constraint | US-3.1 AC, JRN-01.2 |
| "Saved" toast on every action | Creates noise; trust is built through silent reliability, not messaging | JOURNEYS Cross-Journey Patterns |
| Sign-up / login gate | Kills the first-time capture moment; Marcus abandons immediately | JRN-01.1 Decision Point |
| Hover-reveal delete button | Both controls must be always visible without hovering | US-1.5 AC |
| Single-direction completion toggle | Priya needs to un-complete the supervisor form task | US-2.2, JRN-02.2 |
| Input below the task list | Breaks mobile capture — Priya can't find it in 20 seconds | JRN-02.1 |
| `alert()` for errors | Blocks the UI; poor accessibility; FRD global error strategy | FRD Error Handling |

---

*UX Mockup generated: 2026-05-03*
*Source: UserStories-TodoApp.md v1.0, PRD-TodoApp.md v1.0, FRD-TodoApp.md v1.0, JOURNEYS-TodoApp.md v1.0*
*Covers: 23 user stories across 5 epics (US-0.1–US-4.7), 4 user journeys (JRN-01.1, JRN-01.2, JRN-02.1, JRN-02.2)*
