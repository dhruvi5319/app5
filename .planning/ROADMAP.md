# Roadmap: Simple To-Do List App

## Overview

A two-phase delivery: first, a working app shell where users can add and view tasks; then, the full CRUD loop with persistence so tasks survive page refreshes. Both phases deliver a coherent, usable capability. Phase 2 completes the shippable v1 MVP.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: App Shell & Task Creation** - Working HTML app where users can add tasks and see them listed
- [ ] **Phase 2: Full CRUD & Persistence** - Complete task management with completion toggling, deletion, and localStorage persistence

## Phase Details

### Phase 1: App Shell & Task Creation
**Status**: In Progress
**Goal**: Users can open the app, type a task, and see it appear in a list
**Depends on**: Nothing (first phase)
**Requirements**: F0 (Task Creation), F1 (Task List View)
**Success Criteria** (what must be TRUE):
  1. User can open `index.html` in a browser with no setup and see the task input field
  2. User can type a task name and submit it (Enter or button click) and see it appear at the top of the list
  3. Submitting a blank or whitespace-only input shows a validation message and no task is created
  4. When no tasks exist, an empty state message is displayed
  5. Completed tasks are visually distinct from active tasks (strikethrough + muted color)
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — HTML shell + CSS visual layer (index.html + styles.css)
- [ ] 01-02-PLAN.md — TDD: validateTaskName() input validation logic
- [ ] 01-03-PLAN.md — Complete app.js application logic (all TechArch function signatures)

### Phase 2: Full CRUD & Persistence
**Goal**: Users can complete, delete, and persist tasks so the app is fully functional across sessions
**Depends on**: Phase 1
**Requirements**: F2 (Task Completion), F3 (Task Deletion), F4 (Local Persistence)
**Success Criteria** (what must be TRUE):
  1. User can check a task to mark it complete and uncheck it to mark it incomplete — visual style updates immediately
  2. User can click a delete button on any task to permanently remove it from the list
  3. After a page refresh, all tasks (including their completion state) are still present exactly as left
  4. If localStorage is unavailable, the app still works for the session and shows a clear warning banner
  5. User can add their first task within 10 seconds of opening the app for the first time
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md — TDD: localStorage storage functions (isStorageAvailable, loadTasks, saveTasks, initApp update)
- [ ] 02-02-PLAN.md — CRUD unit tests for addTask, toggleTask, deleteTask (F2/F3 verification)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. App Shell & Task Creation | 0/3 | Not started | - |
| 2. Full CRUD & Persistence | 0/? | Not started | - |