# LaunchPad

**Start your freelance career with confidence.**

LaunchPad is a static React prototype of a graduate freelance hub for design and creative graduates moving into freelance work. It covers the full journey: a marketing site, a mock sign-in, a logged-in dashboard, six playable learning modules, mentor matching, booking, sessions, an editable profile, practice briefs, portfolio feedback and a peer community.

This is a working prototype for moderated usability testing — not production software. There is no backend, no real authentication, no payments, no video, no messaging and no runtime network dependency.

---

## Demo

- **Hosted prototype:** <https://sixstringbny.github.io/fpa-prototype/>
- **Local URL:** `http://localhost:5173/`
- **Mock sign-in:** `/#/login` — use **Continue as test user**
- **Style guide:** `/#/styleguide` (internal, not linked in navigation)

The three core usability tasks:

1. **Learn** — find *Pricing Your Creative Work* from the dashboard and start the first lesson.
2. **Match** — find a mentor who offers portfolio feedback and open their profile.
3. **Book** — book a 30-minute session with that mentor and find it in Sessions.

Optional tasks after the core journey:

4. **Portfolio** — submit a project for review and find the feedback.
5. **Opportunity** — find a practice brief or opportunity you could apply for.

The full moderator kit lives in [`docs/TEST-KIT.md`](docs/TEST-KIT.md).

---

## Visual tour

![LaunchPad end-to-end showcase](docs/showcase/launchpad-showcase.gif)

A screenshot walkthrough of the full journey — discover, sign in, learn, match, book, keep track and use the hub — lives in [`docs/showcase/`](docs/showcase/README.md). It includes desktop and mobile stills plus a captioned showcase GIF.

---

## Commands

```bash
# install
npm install

# local development
npm run dev

# type check
npm run typecheck

# production build
npm run build

# preview the production build
npm run preview

# regenerate the visual tour (screenshots + showcase GIF)
npm run showcase
```

The build is a static site in `dist/`.

---

## Reset the demo

Use **Reset demo** in the sidebar (or the mobile navigation) between participants. It clears saved mentors, bookings, lesson progress, portfolio projects, saved opportunities and profile edits, then restores the seed data. You stay signed in.

From the browser console:

```js
localStorage.removeItem('launchpad.demo.v2'); location.reload();
```

State is versioned under the single key `launchpad.demo.v2`.

---

## What is included

- **Marketing:** Home, Learn catalogue, public module detail, Mentorship, public mentor profile, About/Mission, mock sign-in, 404.
- **App:** Dashboard, Learn, module detail, lesson player, mentor matching with filters, mentor profile, booking, sessions, saved mentors, My Profile.
- **Hub:** Opportunities with practice briefs, internships and entry-level projects; a portfolio with project submission, rubric feedback, annotations and revision history; a five-step path; and a peer community with endorsements.
- **Learning:** six modules, all playable; modules 1 and 2 carry the fullest lesson content.
- **State:** React Context + reducer persisted to `localStorage`, with seeded data generated relative to first load.
- **Accessibility:** skip link, semantic landmarks, labelled forms, visible focus, native dialogs, status regions, reduced-motion support, responsive down to 375 px.
- **Assets:** all fonts, photographs, avatars and icons are bundled locally.

### Core flows

| Flow | Route |
|---|---|
| Marketing home | `/#/` |
| Sign in | `/#/login` |
| Dashboard | `/#/app/dashboard` |
| Learning | `/#/app/learn` |
| Mentor matching | `/#/app/mentors` |
| Booking | `/#/app/mentors/:mentorSlug/book` |
| Opportunities | `/#/app/opportunities` |
| Portfolio | `/#/app/portfolio` |
| Your path | `/#/app/roadmap` |
| Community | `/#/app/community` |
| Sessions | `/#/app/sessions` |
| Saved mentors | `/#/app/saved` |
| My Profile | `/#/app/profile` |

`HashRouter` is used so GitHub Pages needs no SPA fallback.

---

## Tech stack

- React 19.3 + React Router 7 (HashRouter)
- Vite 8 + TypeScript 7 (strict)
- Plain CSS with custom properties (no UI framework)
- React Context + reducer, persisted to `localStorage`
- Lucide React icons
- Fontsource variable fonts: Manrope + Inter

`npm run typecheck` and `npm run build` are the quality gates. There are no automated tests in scope.

---

## Deployment

The workflow at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`.

The Vite `base` is driven by `VITE_BASE`, which the workflow sets to `/fpa-prototype/`. For a different repository name, update that value in the workflow.

To enable Pages the first time:

```bash
gh api -X POST repos/<owner>/<repo>/pages -f build_type=workflow
```

---

## Content and licensing

All mentors, reviews, companies, testimonials and learner details are fictional. No real logos, people or client names are used.

Photography is from Unsplash under the Unsplash License. Avatars are generated DiceBear `avataaars` SVGs. Fonts are licensed under the SIL Open Font License and icons under the ISC License. See [`CREDITS.md`](CREDITS.md) for the full list.

The implementation plan and phase status live in [`docs/IMPLEMENTATION-PLAN.md`](docs/IMPLEMENTATION-PLAN.md) and [`docs/PROGRESS.md`](docs/PROGRESS.md).

The research trail is recorded in [`docs/RESEARCH-ALIGNMENT.md`](docs/RESEARCH-ALIGNMENT.md), with the next iteration in [`docs/FIDELITY-PLAN.md`](docs/FIDELITY-PLAN.md). The primary sources are the two process PDFs in `design-docs/` — FPA33501 (concept development) and FPA33502 (evaluation and refinement) — together with the original prototype PDF and low-fidelity sketch.
