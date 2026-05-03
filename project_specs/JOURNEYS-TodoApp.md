# JOURNEYS: Simple To-Do List App (TodoApp)

| Field | Value |
|---|---|
| **Product Name** | TodoApp — Simple To-Do List App |
| **Version** | 1.0 |
| **Date** | 2026-05-03 |
| **Status** | Draft |
| **Related Personas** | PERSONAS-TodoApp.md (PER-01, PER-02) |
| **Related JTBD** | JTBD-TodoApp.md |
| **Related PRD** | PRD-TodoApp.md |

---

## Journey Index

| JRN-ID | Persona | Scenario | Key JTBD(s) | Stages |
|---|---|---|---|---|
| JRN-01.1 | PER-01: Marcus Webb | First-time capture: Adding tasks during a client call | JTBD-01.1, JTBD-01.4 | 5 |
| JRN-01.2 | PER-01: Marcus Webb | Morning triage: Scanning and acting on the day's task list | JTBD-01.2, JTBD-01.3 | 6 |
| JRN-02.1 | PER-02: Priya Nair | On-the-go capture: Adding tasks while switching contexts on mobile | JTBD-02.1, JTBD-02.4 | 5 |
| JRN-02.2 | PER-02: Priya Nair | Mid-day review: Checking off tasks and updating a rescheduled one | JTBD-02.2, JTBD-02.3 | 6 |

---

## PER-01: Marcus Webb — Journeys

---

### JRN-01.1: First-Time Capture During a Client Call

**Persona:** PER-01 (Marcus Webb)

**Scenario:** Marcus is mid-call with a client who casually mentions a follow-up he needs to action. He has three browser tabs open, a document half-written, and no time to open Notion or hunt for a sticky note. He's heard about this simple to-do app and decides to try it now — the moment of need. He opens a new tab, lands on TodoApp for the first time, and needs to capture the task in seconds without any ceremony so he can return his attention to the call.

**Related Jobs:** JTBD-01.1, JTBD-01.4

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Point | Opportunity |
|---|---|---|---|---|---|---|
| Discover | Opens new browser tab, types app URL or clicks a bookmark | Browser / App load | "I just need to write this down — please don't make me sign up" | Anxious, time-pressured | Fear of a registration wall or loading delay killing the moment | Sub-1-second load; no login gate; task input immediately in view |
| Orient | Lands on app; scans the page for where to type | App home (F1, F0) | "OK — there's the text box. Good." | Cautiously relieved | Even one extra click to reach the input field is too many | Input field is autofocused and visually prominent on load |
| Capture | Types the task name and presses Enter | Task input field (F0) | "Done. Back to the call." | Relieved, confident | Accidental empty submit could add a blank task | Silent rejection of empty submissions; input clears immediately after submit |
| Confirm | Glances at list to see the task appeared | Task list (F1) | "It's there. Good." | Satisfied | If the task doesn't appear instantly, he loses trust | Real-time list update with no page reload |
| Close & Return | Closes the tab to reduce clutter; opens it again later | Browser / F4 (localStorage) | "Will it still be there when I come back?" | Uncertain | Many lightweight tools lose data on tab close | Clear implicit message: data is saved; task persists on reopen |

### Key Moments

- **Decision Point:** Discover stage — if the app shows a sign-up screen or takes more than 2 seconds to load, Marcus closes the tab and falls back to a sticky note. This is the most critical drop-off risk in the entire product.
- **Risk of Abandonment:** Orient stage — if the input field is not immediately visible and focused, Marcus won't hunt for it while on a call.
- **Delight Opportunity:** Confirm stage — the task appearing instantly with a clean visual style creates a "this is exactly what I needed" moment that earns his return.

### Success Outcome

Marcus adds his first task within 10 seconds of opening the app for the first time, using only the keyboard, with no sign-up or configuration required. *(JTBD-01.1 success measure)*

### Feature Touchpoints

| Stage | Features |
|---|---|
| Discover | F4 (Local Persistence — fast load, no auth) |
| Orient | F0 (Task Creation input), F1 (Task List View) |
| Capture | F0 (Task Creation — Enter key submit) |
| Confirm | F1 (Task List View — real-time update) |
| Close & Return | F4 (Local Persistence — localStorage restore) |

---

### JRN-01.2: Morning Triage — Scanning and Acting on the Day's List

**Persona:** PER-01 (Marcus Webb)

**Scenario:** Marcus opens his laptop at 8:45 AM. He has tasks captured from yesterday — a mix of client follow-ups, invoice actions, and a draft review. He needs to quickly scan what's outstanding, decide the order he'll tackle things today, mark off anything he completed last night that he forgot to check, and delete two tasks that are no longer relevant. This is a repeat-use session: the app must restore his list exactly as he left it and give him a clean, low-noise view to work from.

**Related Jobs:** JTBD-01.2, JTBD-01.3, JTBD-01.4

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Point | Opportunity |
|---|---|---|---|---|---|---|
| Return | Opens browser, navigates to TodoApp | Browser / F4 (localStorage) | "Let's see where I left off — please be there" | Apprehensive | If the list is empty, the trust is broken permanently | Instant list restoration; all tasks and completion states intact on load |
| Scan | Reads through the full task list top to bottom | Task list (F1) | "OK — invoice is still pending, that draft review is done already, and I need to call Sarah" | Focused, analytical | Too many tasks with no visual distinction makes scanning slow | Visually distinct completed vs. active tasks (strikethrough, muted color) |
| Mark Done | Clicks the completion toggle on a task finished yesterday | Task item (F2) | "Should have checked that off last night — quick fix now" | Slightly guilty, then satisfied | If clicking the toggle is fiddly (small target), he'll skip it | Generously-sized click target; immediate visual feedback on toggle |
| Re-prioritize | Scans remaining active tasks and mentally orders them | Task list (F1) | "Invoice first, then the call, then the draft" | Calm, in control | No way to reorder — forces a mental workaround | (v2) Drag-to-reorder; for now, clean list display reduces friction |
| Delete Stale | Clicks delete on two tasks no longer relevant | Task item delete control (F3) | "Those are dead — just remove them" | Decisive | Accidental delete with no undo could remove a task he needed | Clear, distinct delete control; one-click remove (no confirmation modal per v1 spec) |
| Capture New | Types a new task that came up during the morning scan | Task input field (F0) | "Actually, I also need to do this — let me add it now" | Efficient | If adding a task requires scrolling away from the list, breaks flow | Input field always visible above or near the list without scrolling |

### Key Moments

- **Decision Point:** Return stage — if even one task is missing after overnight, Marcus loses all trust in the persistence model and reverts to his text file. This is pass/fail.
- **Risk of Abandonment:** Scan stage — if the list is visually cluttered or completed and active tasks look identical, he can't quickly assess his workload and abandons the scan.
- **Delight Opportunity:** Mark Done + Delete sequence — rapidly checking off and clearing tasks creates a satisfying "cleaning up" rhythm that reinforces daily habit formation.

### Success Outcome

Marcus can identify his top-priority pending task within 15 seconds of opening the app, and complete a mark-done + delete sequence in under 5 seconds combined, without consulting documentation. *(JTBD-01.2 and JTBD-01.3 success measures)*

### Feature Touchpoints

| Stage | Features |
|---|---|
| Return | F4 (Local Persistence — localStorage restore on page load) |
| Scan | F1 (Task List View — visual distinction, scrollable list) |
| Mark Done | F2 (Task Completion — toggle with visual feedback) |
| Re-prioritize | F1 (Task List View — clean display) |
| Delete Stale | F3 (Task Deletion — one-click permanent remove) |
| Capture New | F0 (Task Creation — always-visible input) |

---

## PER-02: Priya Nair — Journeys

---

### JRN-02.1: On-the-Go Capture on Mobile While Switching Contexts

**Persona:** PER-02 (Priya Nair)

**Scenario:** Priya is between lectures, walking across campus. She remembers she needs to return a library book before Friday, submit a form for her supervisor, and buy oat milk on the way home. She has about 20 seconds before her next class starts. She opens TodoApp on her phone (375px viewport) to quickly drop all three items in before she forgets. She needs the input field to be reachable without zooming or scrolling, the keyboard to not obscure the task list, and the tasks to be there when she reopens the app on her laptop that evening.

**Related Jobs:** JTBD-02.1, JTBD-02.4

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Point | Opportunity |
|---|---|---|---|---|---|---|
| Open App | Taps browser bookmark on phone; app loads | Browser / F4 (localStorage load) | "Quick — I need to write these down before I forget" | Rushed, slightly stressed | Slow load or app not mobile-friendly forces her back to WhatsApp | App loads in <1s; layout immediately usable on 375px viewport |
| Locate Input | Finds the task input field without scrolling | Task input (F0 — mobile layout) | "Please don't make me scroll to find the text box" | Impatient | Input buried below a long task list requires scroll on mobile | Input field pinned or placed above the list; visible on load without scrolling |
| Add Tasks | Types each task, presses Enter (or taps submit button), repeats | Task input (F0), soft keyboard | "Library book. Enter. Supervisor form. Enter. Oat milk. Enter. Done." | Focused, efficient | Mobile keyboard obscures task list — can't confirm tasks were added | Task confirmation visible above keyboard; or scrollable into view after submit |
| Confirm | Glances at list to verify all three tasks appeared | Task list (F1 — mobile layout) | "Good — all three are there. I can put my phone away." | Relieved | Horizontal scroll or truncated text hides task names on small screens | Full task name visible within the mobile viewport; no horizontal overflow |
| Resume Later | Opens app on laptop that evening | Browser / F4 (localStorage restore) | "Let me check what I captured earlier today" | Expecting continuity | If tasks saved on mobile are missing on laptop: same browser, so localStorage persists; cross-device loss is out of scope but should be documented | Clear data-local-only messaging if she uses a different browser/device |

### Key Moments

- **Decision Point:** Open App stage — if the layout is broken or requires pinch-zoom, she closes it immediately and sends herself a WhatsApp message instead. Mobile responsiveness is a hard requirement.
- **Risk of Abandonment:** Locate Input stage — if the input field requires scrolling past existing tasks on a small screen, she won't find it in the 20 seconds she has available.
- **Delight Opportunity:** Add Tasks (rapid repeat) — being able to hammer three tasks in quick succession with just typing and Enter on mobile creates a "this works like I think" moment.

### Success Outcome

Priya adds a task in under 5 seconds from app open on a 375px mobile viewport without reading any instructions, and finds her full task list intact when she reopens the app later. *(JTBD-02.1 and JTBD-02.4 success measures)*

### Feature Touchpoints

| Stage | Features |
|---|---|
| Open App | F4 (Local Persistence — restore on load), NFR: Performance (<1s load) |
| Locate Input | F0 (Task Creation — mobile layout positioning), NFR: Responsiveness |
| Add Tasks | F0 (Task Creation — soft keyboard support, Enter/submit) |
| Confirm | F1 (Task List View — mobile layout, no horizontal scroll) |
| Resume Later | F4 (Local Persistence — same-browser session restore) |

---

### JRN-02.2: Mid-Day Review — Checking Off Tasks and Recovering a Rescheduled One

**Persona:** PER-02 (Priya Nair)

**Scenario:** It's early afternoon. Priya opens TodoApp on her laptop to review her list. She has a mix of completed items (the library book return — done) and active items. She needs to check off what she finished, review what's left for the day, and realize that the "supervisor form" she marked complete earlier actually needs to be resubmitted — so she needs to toggle it back to incomplete. She also has a task that's permanently cancelled and wants to delete it cleanly so her list reflects reality.

**Related Jobs:** JTBD-02.2, JTBD-02.3, JTBD-02.1

### Journey Stages

| Stage | Action | Touchpoint | Thinking | Feeling | Pain Point | Opportunity |
|---|---|---|---|---|---|---|
| Open & Orient | Opens app on laptop; scans the task list | App home / F1 (Task List View) | "Let me see where things stand" | Composed, ready to review | If completed and active tasks look identical, she can't assess the state at a glance | Clear visual distinction: strikethrough + muted color for completed; bold/normal for active |
| Mark Complete | Clicks the checkbox on "library book return" | Task item (F2) | "Done — feel good about that one" | Satisfied, sense of progress | Checkbox too small or unclear = missed clicks and frustration | Generous touch target; immediate and satisfying visual toggle |
| Review Active | Scans remaining incomplete tasks for next action | Task list (F1) | "Oat milk, supervisor form, and that assignment — what's actually urgent?" | Thoughtful | No prioritization markers forces full mental load; list must be clean to compensate | Minimal, uncluttered list design does the heavy lifting without explicit priority controls |
| Toggle Back | Clicks the completed "supervisor form" checkbox to mark it incomplete again | Task item (F2) | "Wait — I have to resubmit that. Let me uncheck it." | Slightly annoyed at the situation (not the app), then relieved | If toggle is one-directional (complete only), she'd have to delete and retype | Bidirectional toggle: one click to complete, one click to restore — confirmed visually |
| Delete Cancelled | Clicks delete on a task that is permanently irrelevant | Task item delete control (F3) | "That's never happening — out." | Decisive, tidy | Accidental delete (mis-tapping) removes a task permanently with no undo | Distinct, clearly labelled delete icon; positioned to avoid accidental tap |
| Add Quick Task | Types a new task that surfaced during review | Task input (F0) | "While I'm here — I also need to email the library about the renewal" | Efficient, in-flow | If adding a task disrupts the current scroll position or clears visible list, breaks flow | Seamless add that inserts task without jarring layout shift |

### Key Moments

- **Decision Point:** Toggle Back stage — if Priya can't un-complete a task, she must delete and retype it. This is the interaction most likely to diverge from her mental model of how a checkbox should work. If it fails, she loses confidence in the tool's flexibility.
- **Risk of Abandonment:** Open & Orient stage — if the list shows all tasks in the same visual style (no completion distinction), the entire review is unworkable and she switches to a paper list.
- **Delight Opportunity:** Mark Complete + immediate visual change — the strikethrough feedback is a small but meaningful dopamine hit; it's the tactile equivalent of crossing something off a paper list.

### Success Outcome

Priya can toggle a task from complete back to incomplete and confirm the change survived a page reload in under 3 interactions total; her full list remains clean, accurate, and visually navigable throughout the session. *(JTBD-02.2 and JTBD-02.3 success measures)*

### Feature Touchpoints

| Stage | Features |
|---|---|
| Open & Orient | F1 (Task List View — visual state distinction) |
| Mark Complete | F2 (Task Completion — checkbox toggle) |
| Review Active | F1 (Task List View — clean, uncluttered display) |
| Toggle Back | F2 (Task Completion — bidirectional toggle), F4 (Persistence — survives reload) |
| Delete Cancelled | F3 (Task Deletion — permanent one-click remove) |
| Add Quick Task | F0 (Task Creation — always-accessible input field) |

---

## Cross-Journey Patterns

### Common Pain Points Across All Journeys

- **Trust in Persistence (Critical — all 4 journeys):** Every journey contains a stage where the user wonders "will my data still be here?" This is the most pervasive anxiety in the product. F4 (localStorage) must be rock-solid and silent — no manual save, no warning modals under normal conditions. The data simply being there is the product's most important moment.

- **Input Field Visibility and Accessibility (JRN-01.1, JRN-01.2, JRN-02.1, JRN-02.2):** Every journey includes a task capture moment. In all four, the input field being immediately visible and reachable without scrolling or navigation is a prerequisite for the interaction to succeed. This pattern points to a hard layout constraint: the input must be above-the-fold on all viewports.

- **Completion State Visual Distinction (JRN-01.2, JRN-02.2):** Both personas, in their return-visit journeys, depend on being able to distinguish completed from active tasks at a glance. A list that renders all items identically blocks the core triage use case for both personas. Strikethrough + muted color is the minimum viable treatment.

- **One-Click Action Principle (JRN-01.2, JRN-02.1, JRN-02.2):** Mark complete, mark incomplete, delete — all must complete in a single interaction. Any confirmation step or multi-tap requirement creates friction at precisely the moments of highest task volume.

### Shared Opportunities

- **Autofocus on Input Field:** Every journey benefits from the task input being autofocused when the app loads. This removes an interaction step for all users and is a zero-cost implementation win.
- **Subtle Persistence Signal:** Rather than a "your data is saved" toast on every action (noisy), a quiet visual treatment (e.g., consistent state restoration) builds trust through behavior, not messaging.
- **Empty State as First-Time UX:** JRN-01.1 and the first time any persona opens the app converge on the same moment — an empty list with a clear, inviting prompt to add the first task. This is the onboarding experience for a zero-setup product.

### Convergence Points

| Stage Type | JRN-01.1 | JRN-01.2 | JRN-02.1 | JRN-02.2 |
|---|---|---|---|---|
| Task capture | ✓ | ✓ (end of journey) | ✓ (core) | ✓ (end of journey) |
| List scan | ✓ (confirm) | ✓ (core) | ✓ (confirm) | ✓ (core) |
| Persistence restore | ✓ (close & return) | ✓ (return) | ✓ (resume later) | — |
| Completion toggle | — | ✓ (mark done) | — | ✓ (mark complete + toggle back) |
| Delete | — | ✓ (delete stale) | — | ✓ (delete cancelled) |

---

## Journey-to-JTBD Traceability

| Journey | Stage | JTBD-ID | Expected Outcome |
|---|---|---|---|
| JRN-01.1 | Discover | JTBD-01.1 | No sign-up gate; app ready in <1s |
| JRN-01.1 | Orient | JTBD-01.1 | Input field visible and focused on load |
| JRN-01.1 | Capture | JTBD-01.1 | Task submitted via Enter; confirmed in list immediately |
| JRN-01.1 | Confirm | JTBD-01.1 | Task appears in list in real time without reload |
| JRN-01.1 | Close & Return | JTBD-01.4 | 100% task state restoration after browser close/reopen |
| JRN-01.2 | Return | JTBD-01.4 | All tasks and completion states identical to pre-close state |
| JRN-01.2 | Scan | JTBD-01.2 | All tasks visible; completed vs. active visually distinct |
| JRN-01.2 | Mark Done | JTBD-01.3 | Completion toggle completes in 1 interaction with visual feedback |
| JRN-01.2 | Re-prioritize | JTBD-01.2 | Clean list display; no visual noise from metadata fields |
| JRN-01.2 | Delete Stale | JTBD-01.3 | Task permanently removed in 1 interaction; no confirmation modal |
| JRN-01.2 | Capture New | JTBD-01.1 | New task added via keyboard without scrolling away from list |
| JRN-02.1 | Open App | JTBD-02.1 | App loads in <1s; layout usable on 375px viewport |
| JRN-02.1 | Locate Input | JTBD-02.1 | Input field visible on 375px without scrolling |
| JRN-02.1 | Add Tasks | JTBD-02.1 | Task added in <5s via mobile keyboard; no extra fields required |
| JRN-02.1 | Confirm | JTBD-02.4 | Task names fully visible on mobile; no horizontal overflow |
| JRN-02.1 | Resume Later | JTBD-02.4 | Full task list restored on same-browser reopen |
| JRN-02.2 | Open & Orient | JTBD-02.2 | List shows task name + completion status only; no metadata |
| JRN-02.2 | Mark Complete | JTBD-02.3 | Single click marks complete with immediate visual change |
| JRN-02.2 | Review Active | JTBD-02.2 | Active tasks scannable without visual noise or filter toggle |
| JRN-02.2 | Toggle Back | JTBD-02.3 | Completion toggles back to incomplete in 1 click; persists on reload |
| JRN-02.2 | Delete Cancelled | JTBD-02.2 | Task removed permanently in 1 interaction; list stays current |
| JRN-02.2 | Add Quick Task | JTBD-02.1 | New task added mid-review without disrupting list view |

---

*Document generated: 2026-05-03*
*Source: PERSONAS-TodoApp.md v1.0, JTBD-TodoApp.md v1.0, PRD-TodoApp.md v1.0*
*Next: STORY-MAP-TodoApp.md, UserStories-TodoApp.md*
