# PERSONAS: Simple To-Do List App (TodoApp)

| Field | Value |
|---|---|
| **Product Name** | TodoApp — Simple To-Do List App |
| **Version** | 1.0 |
| **Date** | 2026-05-03 |
| **Status** | Draft |
| **Related PRD** | PRD-TodoApp.md |
| **Authors** | Generated from PRD Section 2.2 Target Users |

---

## Persona Summary

| Persona ID | Name | Role | Primary Goal |
|---|---|---|---|
| PER-01 | Marcus Webb | Busy Individual / Knowledge Worker | Capture tasks instantly during the workday without friction or setup |
| PER-02 | Priya Nair | Casual Personal Organizer | Maintain a simple running to-do list that persists between sessions |

---

## PER-01: Marcus Webb

**Role & Context:**
Marcus is a 34-year-old freelance consultant who juggles multiple client projects at once. He works from a desktop browser for most of his day — bouncing between email, documents, and video calls. He needs to capture quick action items (reply to client, submit invoice, review draft) without breaking his flow. He has tried Todoist, Notion, and Trello, but found them too heavy for simple day-to-day captures: too many clicks to add a task, too much visual noise, and mandatory sign-up before he can do anything. He often defaults back to sticky notes or a plain text file because they're instant. He is not a power user of productivity software — he wants a scratchpad that remembers what he wrote.

**Goals:**
- Add a task the moment it comes to mind with a single keystroke — no sign-up, no configuration, no loading screen (F0, F4)
- See all outstanding tasks at a glance in a clean, uncluttered list (F1)
- Mark tasks done as he completes them and feel a visible sense of progress (F2)
- Remove completed or cancelled tasks cleanly so the list doesn't grow stale (F3)
- Trust that his task list will still be there when he opens a new tab tomorrow morning (F4)

**Pain Points:**
- Every productivity app requires account creation before he can do anything — he abandons the tool at the sign-up wall
- Cluttered UIs with tags, priorities, due dates, and boards overwhelm what is a simple "write it down, check it off" need
- Tasks disappear on page refresh in minimal tools that have no persistence
- Mobile-optimized designs that feel cramped and awkward on his desktop browser
- Spends more time configuring the tool than actually using it

**Technical Expertise:** Intermediate — comfortable with browser-based web apps, uses keyboard shortcuts instinctively, avoids anything requiring installation or configuration

**Top Tasks:**
1. Add a new task by typing and pressing Enter (multiple times per day — critical)
2. Scan the full task list to decide what to work on next (several times per day — high)
3. Mark a task complete when finished (several times per day — high)
4. Delete stale or cancelled tasks to keep the list clean (daily — medium)
5. Re-open the app after closing it and confirm his tasks are still there (daily — medium)

**Success Criteria:**
- First task added within 10 seconds of opening the app for the first time
- All core actions (add, complete, delete) complete in 2 interactions or fewer
- Task list state is fully restored after closing and reopening the browser
- Zero tasks lost during a normal browser close/reopen cycle

---

## PER-02: Priya Nair

**Role & Context:**
Priya is a 27-year-old graduate student who manages a mix of academic deadlines, personal errands, and side-project tasks. She switches between her laptop and phone throughout the day and uses her browser as her primary workspace. She is not looking for a project management tool — she wants the digital equivalent of a paper notepad that keeps a running list she can check off. She has tried apps like Any.do and TickTick but found even lightweight versions too feature-heavy for her use case: due-date fields she never fills in, recurring task prompts she dismisses, and onboarding flows that slow her down. She opens a to-do tool the way she would open a sticky note: quickly, purposefully, and without ceremony.

**Goals:**
- Maintain a persistent, scrollable list of tasks that survives browser restarts without any account (F1, F4)
- Quickly add tasks as they surface during her day — errands, assignments, ideas — without interrupting her current activity (F0)
- Toggle tasks complete and back as her status changes (F2)
- Clear finished tasks from her list so it stays focused and uncluttered (F3)
- Use the app comfortably on both her laptop screen and a smaller mobile viewport (NFR: Responsiveness)

**Pain Points:**
- Apps with mandatory due dates and category fields slow down simple captures
- Tools that lose her task list every time she closes the tab — she has been burned by this repeatedly
- Feature-heavy interfaces where the "add task" input is buried under navigation menus
- Mobile-first layouts that make desktop use awkward and cramped
- Over-engineered tools for what is ultimately a simple personal list

**Technical Expertise:** Basic-to-intermediate — comfortable with web apps and mobile apps; avoids developer tools, command-line tools, or apps that require installation

**Top Tasks:**
1. Add a new task quickly without navigating away from her current browser tab (multiple times per day — critical)
2. Review her full task list and decide what to tackle next (daily — high)
3. Mark an errand or assignment complete as she finishes it (daily — high)
4. Delete tasks she no longer needs (a few times per week — medium)
5. Open the app on a different device or after a browser restart and find her list intact (daily — medium)

**Success Criteria:**
- Task list loads instantly with all previously saved tasks on every page open
- Can add a task in under 5 seconds without reading instructions
- Completed tasks are clearly visually distinct from active tasks
- App layout is usable and uncluttered on a 375px mobile viewport

---

## Persona Relationships

| Interaction | PER-01: Marcus | PER-02: Priya |
|---|---|---|
| **Shared context** | Both use the app solo, in-browser, without any multi-user features | Same |
| **Primary device** | Desktop browser (dual monitor) | Laptop + mobile; cross-screen usage |
| **Task volume** | Higher volume; active task captures throughout the workday | Moderate volume; mix of personal and academic tasks |
| **Overlap** | Both require zero-friction task capture and reliable local persistence | Same core need |
| **Key difference** | Values keyboard-speed and desktop UX above all | Values cross-viewport usability and visual simplicity |

Neither persona interacts with the other within the app — TodoApp is a single-user personal tool. Relationship context is included to highlight divergent UX priorities that may inform design trade-offs.

---

## Feature–Persona Matrix

| Feature ID | Feature Name | PER-01: Marcus | PER-02: Priya |
|---|---|---|---|
| F0 | Task Creation | **Primary** | **Primary** |
| F1 | Task List View | **Primary** | **Primary** |
| F2 | Task Completion | **Primary** | **Primary** |
| F3 | Task Deletion | **Primary** | **Primary** |
| F4 | Local Persistence | **Primary** | **Primary** |

**Matrix Key:**
- **Primary** — This persona directly relies on this feature; it directly addresses their goals or pain points
- **Secondary** — This persona benefits from this feature but it is not their core driver
- **None** — Feature has no meaningful impact on this persona

> **Note:** All five features are P0 MVP requirements and map directly to both personas' core needs. Both PER-01 and PER-02 are the same user archetype split along usage context (professional workday vs. student/personal) and device preference (desktop-first vs. cross-viewport). No feature is incidental to either persona — this reflects the intentional narrowness of the TodoApp v1 scope.

---

*Document generated: 2026-05-03*
*Source: PRD-TodoApp.md v1.0*
*Next: UserStories-TodoApp.md, JTBD-TodoApp.md*
