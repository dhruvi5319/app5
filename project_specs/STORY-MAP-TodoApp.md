# STORY MAP: Simple To-Do List App (TodoApp)

| Field | Value |
|---|---|
| **Product Name** | TodoApp — Simple To-Do List App |
| **Version** | 1.0 |
| **Date** | 2026-05-03 |
| **Status** | Draft |
| **Related Personas** | PERSONAS-TodoApp.md (PER-01, PER-02) |
| **Related JTBD** | JTBD-TodoApp.md |
| **Related Journeys** | JOURNEYS-TodoApp.md |
| **Related User Stories** | UserStories-TodoApp.md (23 stories, 5 epics) |
| **Related PRD** | PRD-TodoApp.md |
| **Total Stories Mapped** | 23 of 23 (100%) |
| **Releases Defined** | 1 (R1 = MVP — all stories P0) |

---

## 1. Overview

This Story Map organises all 23 UserStories into a two-dimensional grid:

- **X-axis (columns):** The six canonical journey stages that span all four user journeys (JRN-01.1, JRN-01.2, JRN-02.1, JRN-02.2). Stages are ordered by the sequence a first-time user experiences them.
- **Y-axis (rows):** Epics (activities) and individual stories nested within each epic.
- **NaC column:** Natural Acceptance Criteria — testable criteria derived from the intersection of a JTBD outcome and a journey stage. Each NaC is traceable to a specific JTBD-ID.
- **Release column:** All 23 stories are P0 and ship in R1 (MVP). There is no R2 in v1 scope.

**NaC Concept:** A NaC is NOT an invented test case. It is produced by taking a JTBD functional outcome (the *what matters*), contextualising it against the journey stage (the *when/where*), and expressing it as a single testable statement (the *how we know it works*).

---

## 2. Journey Stage Definitions

| Stage ID | Stage Name | Journey(s) | Description |
|---|---|---|---|
| STG-1 | Arrive & Load | JRN-01.1 (Discover), JRN-01.2 (Return), JRN-02.1 (Open App), JRN-02.2 (Open & Orient) | User opens the app; data restores; storage state is checked |
| STG-2 | Orient & Scan | JRN-01.1 (Orient), JRN-01.2 (Scan, Re-prioritize), JRN-02.2 (Open & Orient, Review Active) | User visually assesses the task list to understand current state |
| STG-3 | Capture | JRN-01.1 (Capture), JRN-01.2 (Capture New), JRN-02.1 (Locate Input, Add Tasks), JRN-02.2 (Add Quick Task) | User adds one or more new tasks |
| STG-4 | Confirm | JRN-01.1 (Confirm), JRN-02.1 (Confirm) | User verifies newly added tasks appeared correctly |
| STG-5 | Complete & Toggle | JRN-01.2 (Mark Done), JRN-02.2 (Mark Complete, Toggle Back) | User marks tasks complete or reverses completion |
| STG-6 | Delete & Persist | JRN-01.2 (Delete Stale), JRN-02.2 (Delete Cancelled), all (Close & Return / Resume Later) | User deletes tasks; all state changes persist to storage |

---

## 3. Story Map Matrix

The table below places every story at the intersection of journey stage and epic. Stages where a story has no direct role are marked `—`.

> **Reading guide:** Each row is one story. The ✓ column indicates the *primary* journey stage for that story. NaC is derived from the JTBD outcome most relevant to that stage. Release = R1 for all stories.

### Epic 0: Task Creation (F0)

| SM-ID | Story | STG-1 Arrive & Load | STG-2 Orient & Scan | STG-3 Capture | STG-4 Confirm | STG-5 Complete & Toggle | STG-6 Delete & Persist | NaC (JTBD source) | Release |
|---|---|---|---|---|---|---|---|---|---|
| SM-0.1 | US-0.1: Add Task by Pressing Enter | — | — | **✓** | — | — | — | Given input is focused on load, when user types a task name and presses Enter, then the task appears in the list immediately with no page reload (JTBD-01.1) | R1 |
| SM-0.2 | US-0.2: Add Task by Clicking Add Button | — | — | **✓** | — | — | — | Given a 375px mobile viewport, when user types a task and taps the Add button, then the task is submitted in under 5 seconds with no extra fields required (JTBD-02.1) | R1 |
| SM-0.3 | US-0.3: Reject Empty Task Submission | — | — | **✓** | — | — | — | Given the input is empty or whitespace-only, when user presses Enter or clicks Add, then no task is created and an inline validation message appears without disrupting list state (JTBD-01.1) | R1 |
| SM-0.4 | US-0.4: Reject Task Name Too Long | — | — | **✓** | — | — | — | Given a task name exceeds 500 characters, when user submits, then an inline error message appears, the task is not saved, and the input retains its content for editing (JTBD-02.1) | R1 |
| SM-0.5 | US-0.5: Input Trimmed Before Submission | — | — | **✓** | — | — | — | Given a task name with leading/trailing whitespace, when user submits, then the stored and displayed task name has no surrounding whitespace (JTBD-01.1) | R1 |

### Epic 1: Task List View (F1)

| SM-ID | Story | STG-1 Arrive & Load | STG-2 Orient & Scan | STG-3 Capture | STG-4 Confirm | STG-5 Complete & Toggle | STG-6 Delete & Persist | NaC (JTBD source) | Release |
|---|---|---|---|---|---|---|---|---|---|
| SM-1.1 | US-1.1: View All Tasks in Scrollable List | — | **✓** | — | — | — | — | Given tasks exist with mixed completion states, when the user opens the app, then all tasks are visible in one scrollable list before any interaction (JTBD-01.2) | R1 |
| SM-1.2 | US-1.2: Completed Tasks Visually Distinguished | — | **✓** | — | — | — | — | Given a list with both complete and active tasks, then completed tasks display with strikethrough and muted color simultaneously, making state distinction immediately apparent without explanation (JTBD-02.2) | R1 |
| SM-1.3 | US-1.3: Empty State When No Tasks Exist | **✓** | — | — | — | — | — | Given no tasks have been created or all tasks have been deleted, when the app loads or the last task is removed, then the message "No tasks yet. Add one above!" is displayed and announced to screen readers (JTBD-01.1) | R1 |
| SM-1.4 | US-1.4: Task List Updates in Real Time | — | — | — | **✓** | **✓** | **✓** | Given any task action (add, complete, delete), when the action completes, then the list reflects the change immediately with no perceptible delay and no page reload (JTBD-01.2) | R1 |
| SM-1.5 | US-1.5: Each Task Row Shows Controls | — | **✓** | — | — | — | — | Given the task list is displayed, then every task row shows a completion toggle and a delete button without hovering, and both are keyboard-accessible via Tab and Enter/Space (JTBD-01.2) | R1 |

### Epic 2: Task Completion (F2)

| SM-ID | Story | STG-1 Arrive & Load | STG-2 Orient & Scan | STG-3 Capture | STG-4 Confirm | STG-5 Complete & Toggle | STG-6 Delete & Persist | NaC (JTBD source) | Release |
|---|---|---|---|---|---|---|---|---|---|
| SM-2.1 | US-2.1: Mark a Task as Complete | — | — | — | — | **✓** | — | Given an active task exists, when the user clicks the completion checkbox, then the task displays with strikethrough and muted color in 1 interaction with no page reload (JTBD-01.3) | R1 |
| SM-2.2 | US-2.2: Unmark Completed Task (Toggle Back) | — | — | — | — | **✓** | — | Given a completed task exists, when the user clicks the checkbox again, then strikethrough and muted color are removed in 1 click, and the task returns to active state (JTBD-02.3) | R1 |
| SM-2.3 | US-2.3: Completion State Persists Across Refreshes | — | — | — | — | — | **✓** | Given a task was marked complete before a page refresh, when the page reloads, then the task shows as complete — and vice versa for incomplete — with zero state loss (JTBD-02.3) | R1 |

### Epic 3: Task Deletion (F3)

| SM-ID | Story | STG-1 Arrive & Load | STG-2 Orient & Scan | STG-3 Capture | STG-4 Confirm | STG-5 Complete & Toggle | STG-6 Delete & Persist | NaC (JTBD source) | Release |
|---|---|---|---|---|---|---|---|---|---|
| SM-3.1 | US-3.1: Delete a Task from the List | — | — | — | — | — | **✓** | Given a stale or cancelled task exists, when the user clicks the delete button, then the task is permanently removed from the list and localStorage in 1 interaction with no confirmation dialog (JTBD-01.3) | R1 |
| SM-3.2 | US-3.2: Deletion Is Permanent with No Undo | — | — | — | — | — | **✓** | Given a task has been deleted, when the user refreshes the page, then the task does not reappear — and no undo option is offered (JTBD-01.3) | R1 |
| SM-3.3 | US-3.3: Empty State After Last Task Deleted | — | — | — | — | — | **✓** | Given exactly one task remains, when the user deletes it, then the empty state message appears immediately and the input field remains functional (JTBD-01.3) | R1 |

### Epic 4: Local Persistence (F4)

| SM-ID | Story | STG-1 Arrive & Load | STG-2 Orient & Scan | STG-3 Capture | STG-4 Confirm | STG-5 Complete & Toggle | STG-6 Delete & Persist | NaC (JTBD source) | Release |
|---|---|---|---|---|---|---|---|---|---|
| SM-4.1 | US-4.1: Tasks Loaded from Storage on Page Open | **✓** | — | — | — | — | — | Given the user previously saved tasks, when the app loads (including after browser restart), then all tasks and completion states are rendered before any user interaction (JTBD-01.4) | R1 |
| SM-4.2 | US-4.2: Tasks Saved Automatically on Every Change | — | — | — | — | — | **✓** | Given the user performs any create, complete, or delete action, then the full task array is written to localStorage immediately with no manual save step required (JTBD-01.4) | R1 |
| SM-4.3 | US-4.3: Tasks Survive Page Refresh and Browser Restart | **✓** | — | — | — | — | — | Given the user closes the browser and reopens the app, then all task names, completion states, and list order are identical to the pre-close state — zero tasks lost (JTBD-01.4) | R1 |
| SM-4.4 | US-4.4: Warning Banner When Storage Unavailable at Load | **✓** | — | — | — | — | — | Given localStorage is blocked (e.g., private browsing), when the app loads, then a persistent banner warns "Storage is unavailable. Tasks will not be saved between sessions." and the app remains functional in-session (JTBD-02.4) | R1 |
| SM-4.5 | US-4.5: Non-Blocking Warning on Storage Write Failure | — | — | — | — | — | **✓** | Given a storage write fails during a task action, then a non-blocking banner displays "Changes could not be saved — storage unavailable", auto-dismisses in 5 seconds, and does not crash the app or obscure the list (JTBD-01.4) | R1 |
| SM-4.6 | US-4.6: Warning When Storage Quota Exceeded | — | — | — | — | — | **✓** | Given a QuotaExceededError occurs on task save, then a distinct banner "Storage full — task not saved" appears, auto-dismisses in 5 seconds, and the user can delete tasks to free space and retry (JTBD-02.4) | R1 |
| SM-4.7 | US-4.7: Graceful Recovery from Corrupt Storage Data | **✓** | — | — | — | — | — | Given localStorage contains invalid JSON or non-array data, when the app loads, then it initialises with an empty task array, logs the parse error to console, and the user can immediately add new tasks (JTBD-01.4) | R1 |

---

## 4. NaC Derivation Table

Full traceability chain: JTBD outcome → journey stage → NaC → story.

| NaC-ID | JTBD-ID | JTBD Outcome | Journey Stage | Natural Acceptance Criterion | Story |
|---|---|---|---|---|---|
| NaC-01 | JTBD-01.1 | Task captured in ≤ 10s via keyboard; no sign-up gate | STG-3: Capture (JRN-01.1) | Given input is focused on load, when user types and presses Enter, task appears in list immediately with no reload | US-0.1 |
| NaC-02 | JTBD-02.1 | Task added in ≤ 5s on 375px mobile | STG-3: Capture (JRN-02.1) | Given a 375px viewport, when user types and taps Add, task is submitted in under 5s with no extra required fields | US-0.2 |
| NaC-03 | JTBD-01.1 | Task captured without accidental empty submissions | STG-3: Capture (JRN-01.1) | Given empty or whitespace-only input, when submitted, no task is created and inline validation appears without disrupting the list | US-0.3 |
| NaC-04 | JTBD-02.1 | Task name capture is reliable and error-informative | STG-3: Capture (JRN-02.1) | Given a name > 500 chars, when submitted, an inline error shows; task is not saved; input retains content for editing | US-0.4 |
| NaC-05 | JTBD-01.1 | Captured task name is clean (no invisible padding) | STG-3: Capture (JRN-01.1) | Given a name with leading/trailing spaces, when submitted, stored and displayed name has no surrounding whitespace | US-0.5 |
| NaC-06 | JTBD-01.2 | All tasks visible in single view; states visually distinct | STG-2: Orient & Scan (JRN-01.2) | Given tasks exist, when app opens, all tasks are in one scrollable list rendered before user interaction | US-1.1 |
| NaC-07 | JTBD-02.2 | List shows task name + status; no metadata noise | STG-2: Orient & Scan (JRN-02.2) | Given mixed-state tasks, completed tasks show strikethrough + muted color simultaneously; state is apparent without explanation | US-1.2 |
| NaC-08 | JTBD-01.1 | Empty state is friendly and prompts first action | STG-1: Arrive & Load (JRN-01.1 first visit) | Given no tasks exist or all are deleted, the message "No tasks yet. Add one above!" is displayed and announced to screen readers | US-1.3 |
| NaC-09 | JTBD-01.2 | List updates instantly on any task action | STG-4/5/6: Confirm / Complete / Delete | Given any task action completes, the list reflects the change immediately with no perceptible delay and no page reload | US-1.4 |
| NaC-10 | JTBD-01.2 | All controls accessible without hover or extra navigation | STG-2: Orient & Scan (JRN-01.2) | Given the task list is displayed, every row shows a completion toggle and delete button — both keyboard-accessible via Tab and Enter/Space | US-1.5 |
| NaC-11 | JTBD-01.3 | Complete in ≤ 1 interaction with immediate visual feedback | STG-5: Complete & Toggle (JRN-01.2) | Given an active task, when checkbox is clicked, task shows strikethrough + muted color in 1 interaction with no reload | US-2.1 |
| NaC-12 | JTBD-02.3 | Toggle completion reversible in 1 interaction | STG-5: Complete & Toggle (JRN-02.2) | Given a completed task, when checkbox is clicked again, strikethrough and muted color are removed in 1 click, task returns to active state | US-2.2 |
| NaC-13 | JTBD-02.3 | Toggled completion state survives page reload | STG-6: Delete & Persist (JRN-02.2) | Given a task marked complete/incomplete before refresh, after reload the task shows the same completion state with zero state loss | US-2.3 |
| NaC-14 | JTBD-01.3 | Delete in ≤ 1 interaction; no confirmation dialog | STG-6: Delete & Persist (JRN-01.2) | Given a stale task, when delete is clicked, it is permanently removed from list and localStorage in 1 interaction, no modal shown | US-3.1 |
| NaC-15 | JTBD-01.3 | Deleted tasks cannot be recovered | STG-6: Delete & Persist (JRN-01.2) | Given a task was deleted, after page refresh the task does not reappear — and no undo option is offered | US-3.2 |
| NaC-16 | JTBD-01.3 | Empty state shown immediately after final deletion | STG-6: Delete & Persist (JRN-01.2) | Given exactly one task remains, when deleted, empty state message appears immediately and input field stays functional | US-3.3 |
| NaC-17 | JTBD-01.4 | 100% task state restoration after browser close/reopen | STG-1: Arrive & Load (JRN-01.2, JRN-02.1) | Given previously saved tasks, when app loads (including after browser restart), all tasks and states render before any interaction | US-4.1 |
| NaC-18 | JTBD-01.4 | All saves are automatic; no manual save required | STG-6: Delete & Persist (all journeys) | Given any create/complete/delete action, the full task array is written to localStorage immediately with no explicit save step | US-4.2 |
| NaC-19 | JTBD-01.4 | Task names, states, and order survive browser restart | STG-1: Arrive & Load (JRN-01.2) | Given browser is closed and reopened, all task names, completion states, and list order are identical to pre-close state — zero tasks lost | US-4.3 |
| NaC-20 | JTBD-02.4 | App gracefully degrades if storage blocked | STG-1: Arrive & Load (JRN-02.1) | Given localStorage is blocked, when app loads, a persistent banner warns storage is unavailable and the app remains fully functional in-session | US-4.4 |
| NaC-21 | JTBD-01.4 | Storage write failures are communicated non-disruptively | STG-6: Delete & Persist (all journeys) | Given a write failure occurs, a non-blocking banner appears, auto-dismisses in 5s, and does not crash the app or obscure list/input | US-4.5 |
| NaC-22 | JTBD-02.4 | Quota exceeded is clearly distinguished from other errors | STG-6: Delete & Persist (all journeys) | Given a QuotaExceededError on save, a distinct "Storage full" banner appears, auto-dismisses in 5s, and user can delete tasks to retry | US-4.6 |
| NaC-23 | JTBD-01.4 | App recovers cleanly from corrupt storage rather than breaking | STG-1: Arrive & Load (JRN-01.2) | Given localStorage holds invalid JSON, app initialises with empty array, logs to console, and user can immediately add new tasks | US-4.7 |

---

## 5. Release Planning

### R1: MVP — "Core Task Management + Reliable Persistence"

**Theme:** Deliver a complete, end-to-end task management workflow for both personas across all journey stages. All 23 stories ship in a single release because every story is P0 and every feature is required for the minimum viable journey to be completable.

**Personas served:** PER-01 (Marcus Webb), PER-02 (Priya Nair)

**JTBD addressed:** JTBD-01.1, JTBD-01.2, JTBD-01.3, JTBD-01.4, JTBD-02.1, JTBD-02.2, JTBD-02.3, JTBD-02.4

**Journey completeness:**
- JRN-01.1 (First-time capture): STG-1 → STG-2 → STG-3 → STG-4 → STG-6 fully covered ✓
- JRN-01.2 (Morning triage): STG-1 → STG-2 → STG-5 → STG-6 → STG-3 fully covered ✓
- JRN-02.1 (Mobile capture): STG-1 → STG-3 → STG-4 → STG-6 fully covered ✓
- JRN-02.2 (Mid-day review): STG-1 → STG-2 → STG-5 → STG-6 → STG-3 fully covered ✓

**Delivery order (within R1 — suggested implementation sequence):**

| Order | Stories | Rationale |
|---|---|---|
| 1st | US-4.1, US-4.2, US-4.3, US-4.7 | Storage foundation must exist before UI reads/writes to it |
| 2nd | US-1.3, US-1.1, US-1.5 | Empty state + list rendering before adding tasks to display |
| 3rd | US-0.1, US-0.2, US-0.3, US-0.4, US-0.5 | Task creation (requires list to display results) |
| 4th | US-1.2, US-1.4, US-2.1, US-2.2, US-2.3 | Completion state rendering and toggle (requires tasks to exist) |
| 5th | US-3.1, US-3.2, US-3.3 | Deletion (requires tasks to exist) |
| 6th | US-4.4, US-4.5, US-4.6 | Storage error handling (requires all storage operations to be in place) |

**Stories in R1:**

| Epic | Story IDs | Count |
|---|---|---|
| Epic 0: Task Creation | US-0.1, US-0.2, US-0.3, US-0.4, US-0.5 | 5 |
| Epic 1: Task List View | US-1.1, US-1.2, US-1.3, US-1.4, US-1.5 | 5 |
| Epic 2: Task Completion | US-2.1, US-2.2, US-2.3 | 3 |
| Epic 3: Task Deletion | US-3.1, US-3.2, US-3.3 | 3 |
| Epic 4: Local Persistence | US-4.1, US-4.2, US-4.3, US-4.4, US-4.5, US-4.6, US-4.7 | 7 |
| **Total** | | **23** |

---

## 6. Coverage Analysis

### 6.1 Persona Coverage

| Persona | R1 Stories (Primary) | Journeys Fully Covered | JTBD Addressed |
|---|---|---|---|
| PER-01: Marcus Webb | US-0.1, US-0.3, US-0.5, US-1.1, US-1.3, US-1.5, US-2.1, US-2.3, US-3.1, US-3.3, US-4.1, US-4.3, US-4.5, US-4.7 (14 stories primary) | JRN-01.1, JRN-01.2 | JTBD-01.1, 01.2, 01.3, 01.4 |
| PER-02: Priya Nair | US-0.2, US-0.4, US-1.2, US-1.4, US-2.2, US-3.2, US-4.2, US-4.4, US-4.6 (9 stories primary) | JRN-02.1, JRN-02.2 | JTBD-02.1, 02.2, 02.3, 02.4 |

> Note: All five features (F0–F4) are classified as Primary for both personas in PERSONAS-TodoApp.md. The primary attribution above reflects the "As a [persona]" voice in each user story, not exclusivity. Both personas benefit from all 23 stories.

### 6.2 JTBD Coverage

| JTBD-ID | Outcome | Stories Covering It | NaC Derived |
|---|---|---|---|
| JTBD-01.1 | Zero-friction task capture | US-0.1, US-0.3, US-0.5, US-1.3 | NaC-01, NaC-03, NaC-05, NaC-08 |
| JTBD-01.2 | Rapid daily prioritization | US-1.1, US-1.4, US-1.5 | NaC-06, NaC-09, NaC-10 |
| JTBD-01.3 | Satisfying completion and list hygiene | US-2.1, US-3.1, US-3.2, US-3.3 | NaC-11, NaC-14, NaC-15, NaC-16 |
| JTBD-01.4 | Reliable cross-session continuity | US-4.1, US-4.2, US-4.3, US-4.5, US-4.7 | NaC-17, NaC-18, NaC-19, NaC-21, NaC-23 |
| JTBD-02.1 | Frictionless capture between activities | US-0.2, US-0.4 | NaC-02, NaC-04 |
| JTBD-02.2 | Focused list that reflects real priorities | US-1.2 | NaC-07 |
| JTBD-02.3 | Fluid progress tracking with reversibility | US-2.2, US-2.3 | NaC-12, NaC-13 |
| JTBD-02.4 | Consistent experience across screens and sessions | US-4.4, US-4.6 | NaC-20, NaC-22 |

### 6.3 Journey Stage Coverage

| Stage | Stories Mapped | Coverage |
|---|---|---|
| STG-1: Arrive & Load | US-1.3, US-4.1, US-4.3, US-4.4, US-4.7 | ✓ Full |
| STG-2: Orient & Scan | US-1.1, US-1.2, US-1.5 | ✓ Full |
| STG-3: Capture | US-0.1, US-0.2, US-0.3, US-0.4, US-0.5 | ✓ Full |
| STG-4: Confirm | US-1.4 | ✓ Full (real-time update covers confirm) |
| STG-5: Complete & Toggle | US-2.1, US-2.2 | ✓ Full |
| STG-6: Delete & Persist | US-2.3, US-3.1, US-3.2, US-3.3, US-4.2, US-4.5, US-4.6 | ✓ Full |

### 6.4 Gap Analysis

**Journey stages without coverage:** None — all 6 stages have at least one mapped story.

**JTBD outcomes without derived NaC:** None — all 8 JTBD outcomes have at least one NaC.

**Orphan stories (not mapped to any journey stage):** None — all 23 stories are mapped.

**JTBD outcomes with thin coverage (1 NaC only):**
- JTBD-02.2 (Focused list): Only US-1.2 maps directly. US-1.1 and US-1.5 partially serve this outcome but are primarily attributed to JTBD-01.2. Acceptable for v1; no gap action required.

**Out-of-scope items generating future gaps:**
- Task editing (deferred to v2): JTBD-01.3 has no "edit task name" story — this is an acknowledged v1 constraint, not a gap.
- Drag-to-reorder (deferred to v2): JRN-01.2 Re-prioritize stage notes this as v2; no story exists for it — expected omission.
- Cross-device sync: JTBD-02.4 covers same-browser persistence only; cross-device sync is out of scope per PRD.

---

## 7. NaC-to-Acceptance Criteria Alignment

Verification that each NaC aligns with the corresponding UserStory's acceptance criteria.

| SM-ID | NaC-ID | NaC Statement (abbreviated) | AC Alignment | Notes |
|---|---|---|---|---|
| SM-0.1 | NaC-01 | Task appears immediately on Enter; no reload | ✓ Aligned | US-0.1 AC: "appears at top immediately; no page reload" |
| SM-0.2 | NaC-02 | Task submitted via Add button in ≤ 5s on mobile | ✓ Aligned | US-0.2 AC: "appears at top immediately after button click" |
| SM-0.3 | NaC-03 | Empty/whitespace input → no task + inline message | ✓ Aligned | US-0.3 AC: "does not create a task; validation message appears" |
| SM-0.4 | NaC-04 | Name > 500 chars → error; content preserved | ✓ Aligned | US-0.4 AC: "rejected; message shown; input retains content" |
| SM-0.5 | NaC-05 | Leading/trailing whitespace stripped | ✓ Aligned | US-0.5 AC: "stored and displayed as trimmed string" |
| SM-1.1 | NaC-06 | All tasks in one scrollable list before interaction | ✓ Aligned | US-1.1 AC: "renders on every page load with all previously saved tasks" |
| SM-1.2 | NaC-07 | Completed = strikethrough + muted color simultaneously | ✓ Aligned | US-1.2 AC: "both applied simultaneously; not sole differentiator" |
| SM-1.3 | NaC-08 | Empty state message shown; screen-reader announced | ✓ Aligned | US-1.3 AC: "announced via aria-live region" |
| SM-1.4 | NaC-09 | List updates immediately on any action | ✓ Aligned | US-1.4 AC: "no perceptible delay between user action and list update" |
| SM-1.5 | NaC-10 | Controls visible without hover; keyboard-accessible | ✓ Aligned | US-1.5 AC: "visible without hovering; keyboard-accessible via Tab and Enter/Space" |
| SM-2.1 | NaC-11 | Complete in 1 interaction; immediate visual change | ✓ Aligned | US-2.1 AC: "no page reload required; saved to localStorage immediately" |
| SM-2.2 | NaC-12 | Toggle back in 1 click; styling removed | ✓ Aligned | US-2.2 AC: "strikethrough and muted color removed immediately" |
| SM-2.3 | NaC-13 | Completion state survives page reload | ✓ Aligned | US-2.3 AC: "no task loses completed value across browser close/reopen" |
| SM-3.1 | NaC-14 | Delete in 1 action; no dialog; removed from localStorage | ✓ Aligned | US-3.1 AC: "no confirmation dialog; removed from localStorage immediately" |
| SM-3.2 | NaC-15 | Deleted task absent after refresh; no undo | ✓ Aligned | US-3.2 AC: "does not reappear after refresh; no undo mechanism" |
| SM-3.3 | NaC-16 | Empty state shown immediately after final deletion | ✓ Aligned | US-3.3 AC: "empty state appears immediately; input remains functional" |
| SM-4.1 | NaC-17 | All tasks rendered before user interaction on load | ✓ Aligned | US-4.1 AC: "all saved tasks rendered before user interacts" |
| SM-4.2 | NaC-18 | Every action auto-saves; no Save button | ✓ Aligned | US-4.2 AC: "no explicit Save button; all saves automatic" |
| SM-4.3 | NaC-19 | Names, states, order intact after browser restart | ✓ Aligned | US-4.3 AC: "zero tasks lost during normal browser close/reopen cycle" |
| SM-4.4 | NaC-20 | Persistent banner on storage unavailable; app remains functional | ✓ Aligned | US-4.4 AC: "banner remains until condition resolved; tasks still manageable in-session" |
| SM-4.5 | NaC-21 | Non-blocking write-fail banner; auto-dismisses 5s; no crash | ✓ Aligned | US-4.5 AC: "auto-dismisses after 5s; does not block input or list" |
| SM-4.6 | NaC-22 | Distinct quota-exceeded banner; auto-dismisses 5s | ✓ Aligned | US-4.6 AC: "distinct message; user can delete tasks to free space and retry" |
| SM-4.7 | NaC-23 | Corrupt data → empty init; user can add immediately | ✓ Aligned | US-4.7 AC: "initialises with empty array; parse error logged to console only" |

**Alignment result: 23 of 23 NaC fully aligned with UserStory acceptance criteria. No conflicts detected.**

---

*Document generated: 2026-05-03*
*Source: PERSONAS-TodoApp.md v1.0, JTBD-TodoApp.md v1.0, JOURNEYS-TodoApp.md v1.0, UserStories-TodoApp.md v1.0, PRD-TodoApp.md v1.0*
*Stories mapped: 23 of 23 | Orphans: 0 | Journey gaps: 0 | JTBD gaps: 0*
