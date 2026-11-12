# LaunchPad — Moderator Test Kit

A lightweight kit for moderated usability testing with design and creative graduates. Expect 20–30 minutes per participant.

> **Next iteration:** [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md) proposes optional Tasks 4–5 and additional debrief prompts for the portfolio and opportunities features. The three tasks below remain the core test.

---

## Before the session

- [ ] Run `npm run dev` (or open the hosted URL) on a laptop.
- [ ] Open `/#/login` and check the prototype loads.
- [ ] Click **Continue as test user** once to confirm the app works, then reset the demo.
- [ ] Test the reset: sidebar → **Reset demo** → confirm.
- [ ] Have this kit and a note sheet open.
- [ ] Check that the participant can reach the screen without seeing your notes.

### Reset between participants

1. Open the sidebar (or mobile menu).
2. Choose **Reset demo** → **Reset demo**.
3. Confirm you are back on the dashboard with the seeded data:
   - Naledi Khumalo signed in
   - One saved mentor (Lucas Meyer)
   - One upcoming session with Amina Yusuf in two days
   - Finding Your First Client at 2 of 4 lessons
   - Profile completeness at 65%
   - One draft portfolio project and one reviewed project with feedback
   - One saved practice brief

Alternative from the browser console:

```js
localStorage.removeItem('launchpad.demo.v2'); location.reload();
```

---

## Introduction (read aloud)

> “Thanks for helping. This is an early prototype of LaunchPad, a platform for design graduates moving into freelance work. There are no wrong answers, and nothing you do can break it. I’ll give you three tasks; please think aloud as you go. I’m testing the design, not you.”

Ask permission to record notes. Make clear that no real account, payment or booking is created.

---

## Tasks

### Task 1 — Learn

> “You want to learn how to price your freelance work. Starting from the dashboard, find the relevant module and begin the first lesson.”

**Success:** participant reaches the lesson player for **Pricing Your Creative Work**, lesson 1, and can mark it complete.

Watch for:

- Whether they use the dashboard card, the sidebar or search.
- Whether they open the correct module among six.
- Confusion between “Learn” and “Modules”.
- Whether the lesson list makes the first lesson obvious.

### Task 2 — Match

> “You need portfolio feedback from an experienced designer. Use the mentor area to find a mentor who offers portfolio feedback, and open their profile.”

**Success:** participant finds a mentor with **Portfolio Review** expertise (Lucas Meyer or Priya Naidoo) and opens the profile.

Watch for:

- Whether they find the expertise filter.
- Whether search terms are understood.
- Whether they confuse “Mentorship” (marketing) with “Mentors” (app).
- Whether the save action is noticed.

### Task 3 — Book

> “Book a 30-minute session with that mentor for a time that suits you.”

**Success:** participant selects a slot, confirms, sees the success state, and can find the booking in **Sessions** and on the **Dashboard**.

Watch for:

- Whether the free/paid distinction is clear.
- Whether they try to confirm before choosing a time.
- Whether slot selection is obvious.
- Whether they trust the confirmation state.
- Whether they can find Sessions afterwards.

### Optional follow-up

> “Where would you go to find the mentor you just saved?”

**Success:** participant locates **Saved** in the sidebar or the saved section on the dashboard.

### Optional Task 4 — Portfolio feedback

> “Submit a portfolio project for review and find the feedback.”

**Success:** participant opens **Portfolio**, submits the draft project, and can explain one rubric score or annotation from the feedback.

Watch for:

- Whether the difference between draft, in review and feedback ready is clear.
- Whether the rubric and annotations feel specific rather than generic.
- Whether they notice the revision history.

### Optional Task 5 — Opportunity

> “Find a practice brief or opportunity you could apply for.”

**Success:** participant finds **Opportunities**, opens a brief and can describe what they would need to produce.

Watch for:

- Whether practice briefs and paid work are clearly distinguished.
- Whether the deadline and skills are easy to find.
- Whether the apply action feels believable without a real client.

---

## Note sheet

| Participant | Task | Start / end | Success (Y / assisted / N) | Path taken | Hesitation / quotes | Severity (low / med / high) |
|---|---|---|---|---|---|---|
| | 1 | | | | | |
| | 2 | | | | | |
| | 3 | | | | | |
| | Follow-up | | | | | |
| | 4 (optional) | | | | | |
| | 5 (optional) | | | | | |

Capture:

- Task success: yes / assisted / no.
- Path taken: screens and filters.
- Time to complete.
- Points of hesitation, misclicks and verbatim quotes.
- Severity: low / medium / high.

---

## Reminders

- Do not lead with screen names. Use the task wording.
- Ask participants to think aloud.
- Record observations, not interpretations.
- If a participant is stuck, note it and wait before assisting.
- Stop a task after a reasonable attempt; do not let frustration dominate the session.
- Ask a short debrief: “What was the most confusing moment?” and “What did you expect to happen?”

---

## Debrief prompts

1. What was the most confusing moment?
2. Was there anything you expected to be able to do that you could not?
3. Did the mentor profiles give you enough information to book?
4. How did you feel about the pricing examples?
5. Would you use this for your first client? Why or why not?
6. If you wanted a portfolio review, where would you go?
7. Would you expect to find real projects or internships here?
8. What would you want to happen after a mentor reviewed your portfolio?
9. Did anything promise something the product did not deliver?

---

## After the session

- [ ] Reset the demo.
- [ ] Transcribe or tidy notes while they are fresh.
- [ ] Tag findings by task and severity.
- [ ] Add anything that affected trust or clarity.
- [ ] Record any content that felt unrealistic or patronising.

---

## Known prototype limits (do not test as features)

- Sign-in accepts any credentials and creates no account.
- Video calls, payments, messaging, notifications and calendar integration are out of scope.
- “Join session” shows an informational message.
- The notification button is intentionally a prototype-only control.
- Portfolio feedback is immediate and fictional; no files are uploaded.
- Opportunity applications and community endorsements are stored locally and contact no real client.
- The Styleguide is internal and not linked from navigation.
