# Launchpad — visual tour

![Launchpad end-to-end showcase](launchpad-showcase.gif)

A screenshot walkthrough of the prototype in the order a first-time user meets it: discover, sign in, learn, match, book and keep track. Captured from the local build on 9 November 2026. All mentors, reviews, bookings and learner details are fictional.

The GIF above is the short version. The sections below break the same journey into stills and explain the user intent behind each screen.

---

## 1. Discover

The public site has to answer three questions before anyone signs up: what is this, is it for me, and what happens next?

![Marketing home](screens/01-home.png)

The home page leads with the promise — *learn, network, build, earn* — and sends the primary action straight to the mock sign-in.

![Learn catalogue](screens/02-learn-catalogue.png)

Six practical modules, searchable by title or topic and filterable by level. No account is needed to browse.

![Pricing module detail](screens/03-module-detail.png)

The module detail page explains the outcome, the four lessons and the time commitment before asking the user to sign in.

![Mentorship](screens/04-mentorship.png)

Mentorship is introduced as a real conversation with a working creative, not a lecture. The page links to the mentor area once the user is ready.

---

## 2. Sign in

![Mock sign-in](screens/05-sign-in.png)

The sign-in is deliberately honest about being a prototype. **Continue as test user** restores Naledi Khumalo's prepared demo state, which is what the rest of this tour uses.

---

## 3. Learn — Task 1

The first core task is to find *Pricing Your Creative Work* and begin the first lesson.

![Dashboard](screens/06-dashboard.png)

The dashboard answers “what now?” in one screen: continue learning, the next session, saved mentors and profile completeness. The seeded state has *Finding Your First Client* at 2 of 4 lessons.

![Learn catalogue in the app](screens/07-app-learn.png)

The logged-in Learn catalogue carries progress forward, so the in-progress module is visible before the user starts searching.

![Pricing module with no progress](screens/08-pricing-module.png)

The module page marks lesson 1 as **Up next** and keeps the module details and progress in view.

![First lesson](screens/09-lesson.png)

The lesson player combines reading time, module context, the lesson content and a clear next action.

![Lesson marked complete](screens/10-lesson-complete.png)

Marking the first lesson complete moves the user straight to lesson 2 and confirms what happened.

![Module progress after completion](screens/11-module-progress.png)

Returning to the module now shows lesson 1 complete, lesson 2 up next and the CTA changed to **Continue module**.

---

## 4. Match — Task 2

The second task is to find a mentor who offers portfolio feedback and open their profile.

![Mentor matching](screens/12-mentors.png)

Mentor matching supports search, expertise, session type, availability and sorting. The saved state is visible on the cards.

![Filtered by Portfolio Review](screens/13-mentors-filtered.png)

The **Portfolio Review** filter narrows six mentors to two and names the active filter in the result count.

![Lucas Meyer profile](screens/14-mentor-profile.png)

Lucas Meyer's profile gives the user enough to decide: rating, background, expertise, availability, reviews, a save action and a clear **Book a session** CTA.

---

## 5. Book — Task 3

The third task is to book a 30-minute session and then find it in Sessions.

![Booking with a slot selected](screens/15-booking-slot.png)

Booking is split into three steps. The summary stays visible while the user picks a session type and a time, and updates with the selected slot.

![Booking confirmation](screens/16-booking-confirmed.png)

The confirmation repeats the mentor, date, time, session type, duration and location, so the user can trust that the booking is real within the prototype.

![Sessions](screens/17-sessions.png)

Sessions lists the new Lucas booking alongside the seeded Amina Yusuf session. Each upcoming session has a cancel action and a prototype-only join control.

---

## 6. Keep track

![Dashboard after the flow](screens/18-dashboard-updated.png)

The dashboard now reflects the whole journey: three lessons completed, two modules in progress, two upcoming sessions and one saved mentor.

![Saved mentors](screens/19-saved-mentors.png)

Saved mentors is the shortlist the user builds while browsing; Lucas is already there from the seed data.

![My Profile](screens/20-profile.png)

My Profile shows 65% completeness and names the exact fields still missing, which gives the dashboard's completion prompt something concrete to do.

---

## 7. Mobile

The same core journey holds at 390 px.

![Mobile dashboard](screens/21-mobile-dashboard.png)

The dashboard stacks the hero, completeness card and stats without losing the primary action.

![Mobile mentor filters](screens/22-mobile-mentors.png)

On small screens the filter rail becomes a dialog, keeping the mentor results readable.

![Mobile lesson](screens/23-mobile-lesson.png)

The lesson player keeps the reading measure and progress context usable at phone width.

---

## The three usability tasks

This tour follows the same tasks used in the moderator kit:

1. **Learn** — find *Pricing Your Creative Work* from the dashboard and start the first lesson.
2. **Match** — find a mentor who offers portfolio feedback and open their profile.
3. **Book** — book a 30-minute session and find it in Sessions.

See [`docs/TEST-KIT.md`](../TEST-KIT.md) for the full moderator script, success criteria and note sheet.

---

## Regenerate the tour

From the repository root:

```bash
npm run showcase
```

The script starts Vite, seeds a clean demo state, walks the flow with real clicks, and writes:

- `screens/*.png` — desktop and mobile stills
- `launchpad-showcase.gif` — the captioned showcase loop

It uses `playwright-core`, `gifenc` and `pngjs`. The GIF is assembled in JavaScript because the bundled Playwright ffmpeg build does not include a GIF encoder. If Playwright's cached browser is unavailable, set `CHROME_PATH` or run `npx playwright install chromium`.
