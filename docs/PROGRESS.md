# Progress

Live status for the Launchpad prototype. See [`IMPLEMENTATION-PLAN.md`](IMPLEMENTATION-PLAN.md) for scope and acceptance criteria.

Last updated: 9 November 2026

| Phase | Issue | Branch | Status | Demo checkpoint | Notes |
|---|---|---|---|---|---|
| 0 | #1 | `main` | Done | `npm run dev` | Vite/React/TS scaffold, local fonts, images and avatars |
| 1 | #2 | — | Done | `/#/styleguide` | Tokens, UI primitives, marketing + app shells, mobile nav |
| 2 | #3 | — | Done | Reset works | Types, 6 modules, 6 mentors, seeded persisted state |
| 3 | #4 | — | Done | Marketing → login | Home, Learn, Mentorship, About, public module/mentor, login, 404 |
| 4 | #5 | — | Done | Task 1 | Catalogue, module detail, lesson player, progress |
| 5 | #6 | — | Done | Task 2 | Search, filters, sort, save, shared mentor profile |
| 6 | #7 | — | Done | Task 3 | Slot generation, booking, confirmation, sessions, cancel |
| 7 | #8 | — | Done | Dashboard reflects state | Dashboard, Saved, My Profile, tailored resources |
| 8 | #9 | — | In progress | Hosted URL | Docs and workflow added; repo visibility, Pages and tag pending |
| 9 | #10 | — | Backlog | Post-feedback | Optional visual variant |

## Verification

- [x] `npm run typecheck`
- [x] `npm run build`
- [x] All routes render in local development
- [x] State persists across reloads
- [x] Reset demo restores seed data
- [x] Tasks 1–3 complete locally
- [ ] Responsive QA at 375 / 768 / 1024 / 1440 on every route
- [ ] Keyboard-only walkthrough
- [ ] Hosted GitHub Pages smoke test
- [ ] Tag `v0.1.0`

## Decisions recorded

- **One prototype now.** The visual variant is deferred to Phase 9, after feedback.
- **HashRouter.** Avoids the need for a GitHub Pages SPA fallback.
- **Versioned single storage key.** `launchpad.demo.v1`; a version mismatch reseeds.
- **Seed dates are relative.** The seeded Amina Yusuf booking is generated two days after first load, so an older demo still looks believable.
- **Profile completeness.** Weighted to 100; the seed profile intentionally scores 65% so the completion prompt has something to do.
- **Photography attribution.** Two of the four Unsplash photographs do not have a confidently identified photographer; the source URLs are recorded in `CREDITS.md` and the Unsplash License does not require attribution.
