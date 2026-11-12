# Progress

Live status for the Launchpad prototype. See [`IMPLEMENTATION-PLAN.md`](IMPLEMENTATION-PLAN.md) for scope and acceptance criteria.

Last updated: 12 November 2026

| Phase | Issue | Branch | Status | Demo checkpoint | Notes |
|---|---|---|---|---|---|
| 0 | #1 | `main` | Done | `npm run dev` | Vite/React/TS scaffold, local fonts, images and avatars |
| 1 | #2 | `main` | Done | `/#/styleguide` | Tokens, UI primitives, marketing + app shells, mobile nav |
| 2 | #3 | `main` | Done | Reset works | Types, 6 modules, 6 mentors, seeded persisted state |
| 3 | #8 | `main` | Done | Marketing → login | Home, Learn, Mentorship, About, public module/mentor, login, 404 |
| 4 | #9 | `main` | Done | Task 1 | Catalogue, module detail, lesson player, progress |
| 5 | #4 | `main` | Done | Task 2 | Search, filters, sort, save, shared mentor profile |
| 6 | #5 | `main` | Done | Task 3 | Slot generation, booking, confirmation, sessions, cancel |
| 7 | #10 | `main` | Done | Dashboard reflects state | Dashboard, Saved, My Profile, tailored resources |
| 8 | #6 | `main` | Done | Hosted URL | Responsive/a11y QA, docs, public repo, Pages, hosted smoke test |
| 9 | #7 | — | Backlog | Post-feedback | Optional visual variant |

Issue numbers are not sequential because three issues were retried after a shell quoting problem. Each issue links back to its phase in the implementation plan.

## Release

- **Hosted prototype:** <https://sixstringbny.github.io/fpa-prototype/>
- **Repository:** <https://github.com/SixStringBny/fpa-prototype>
- **Tag:** `v0.1.0`

## Verification

- [x] `npm run typecheck`
- [x] `npm run build`
- [x] All routes render in local development
- [x] State persists across reloads
- [x] Reset demo restores seed data
- [x] Tasks 1–3 complete locally
- [x] Responsive QA at 375 / 768 / 1024 / 1440 on every public and app route
- [x] Keyboard focus walkthrough of the sign-in and app shell
- [x] Reduced-motion media query verified
- [x] Production preview has no external network requests
- [x] GitHub Pages base path (`/fpa-prototype/`) verified for images, avatars, fonts and JS
- [x] Tasks 1–3 pass on the hosted build
- [x] Hosted build has no console errors or broken images
- [x] Tag `v0.1.0`

## Fidelity pass — next iteration

The research alignment review is in [`RESEARCH-ALIGNMENT.md`](RESEARCH-ALIGNMENT.md) and the phased plan is in [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md). The review uses all four source documents: FPA33501, FPA33502, the original prototype PDF and the low-fidelity sketch.

The short version:

- The build is a strong realisation of the FPA33501 learning and mentorship concept, and an approximate 80% fit against the original prototype and sketch.
- It is not yet a faithful realisation of the FPA33502 refinement. The portfolio feedback loop, opportunities and community layers are missing, and the visual identity predates the FPA33502 brand.
- The next iteration keeps the working core and adds, in order: truth fixes, brand alignment, opportunities, portfolio feedback and a roadmap. Community is optional and post-test.

Decisions for the fidelity pass:

- **Source hierarchy.** FPA33502 is the latest refinement; FPA33501 is the concept and research authority; the old PDF and sketch remain the baseline for voice and IA.
- **Brand.** Adopt the FPA33502 identity — white, lavender, blue and pink; Manrope headings; "LaunchPad" — or record a deliberate deviation.
- **App development.** Keep React and Vite; record the Framer choice as a documented process deviation.
- **Onboarding.** Add a lightweight roadmap, not an onboarding questionnaire.
- **Opportunities and portfolio feedback.** Add lightweight, seeded slices; no backend, payments or real applications.
- **Community.** Deferred to Phase 7, or recorded as an explicit non-goal.
- **Storage.** Bump to `launchpad.demo.v2` if new persisted arrays are added.

## Decisions recorded

- **One prototype now.** The visual variant is deferred to Phase 9, after feedback.
- **HashRouter.** Avoids the need for a GitHub Pages SPA fallback.
- **Versioned single storage key.** `launchpad.demo.v1`; a version mismatch reseeds.
- **Immediate persistence.** State is written synchronously on each action so an immediate reload cannot lose the last booking or lesson.
- **Seed dates are relative.** The seeded Amina Yusuf booking is generated two days after first load, so an older demo still looks believable.
- **Profile completeness.** Weighted to 100; the seed profile intentionally scores 65% so the completion prompt has something to do.
- **Base-aware public assets.** `src/lib/assets.ts` resolves `public/` paths against `VITE_BASE`, keeping local and GitHub Pages builds working from the same source.
- **Photography attribution.** Two of the four Unsplash photographs do not have a confidently identified photographer; the source URLs are recorded in `CREDITS.md` and the Unsplash License does not require attribution.
