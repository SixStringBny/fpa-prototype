# LaunchPad — Phased Fidelity Plan

- **Status:** Implemented; verification is tracked in [`PROGRESS.md`](PROGRESS.md)
- **Prepared:** 12 November 2026
- **Basis:** [`RESEARCH-ALIGNMENT.md`](RESEARCH-ALIGNMENT.md)
- **Target:** 5–7 working days for the core fidelity pass; Phase 7 is optional and post-test
- **Current prototype:** LaunchPad v0.2.0
- **Related documents:** [`IMPLEMENTATION-PLAN.md`](IMPLEMENTATION-PLAN.md), [`PROGRESS.md`](PROGRESS.md), [`TEST-KIT.md`](TEST-KIT.md)

> The task checklists below are retained as the plan of record. Implementation and verification status live in [`PROGRESS.md`](PROGRESS.md).

---

## 1. Purpose

This plan closes the gap between the research record and the built prototype without discarding the working core.

It is organised so that each phase:

- is traceable to a finding in [`RESEARCH-ALIGNMENT.md`](RESEARCH-ALIGNMENT.md);
- has a visible demo checkpoint;
- preserves the three existing usability tasks: Learn, Match and Book;
- can be paused or deferred without leaving the prototype in a broken state.

The plan does not replace the original implementation plan. It is the next iteration: the fidelity pass that makes the artefact match the research.

---

## 2. Principles

1. **Research traceability.** Every new feature or content change links to a research finding or a recorded decision.
2. **Fidelity before feature volume.** A small, coherent representation of the hub thesis is better than a large, disconnected feature set.
3. **Protect the testable core.** Tasks 1–3 must continue to work at every phase. New features are tested after the core.
4. **Static prototype, no backend.** All new data is seeded, local and resettable. No real accounts, payments, uploads or messaging.
5. **Accessibility by default.** Every new screen is keyboard operable, labelled, responsive and contrast-checked.
6. **Record deviations.** If a research requirement is deferred or contradicted, it goes in the decision log, not silently missing.
7. **Keep the content honest.** All opportunities, mentors, learners and feedback are fictional and clearly labelled.

---

## 3. Source hierarchy and decision log

### 3.1 Source hierarchy

The plan uses all four source documents, with this order of authority:

1. **FPA33502** — latest refinement: brand, personas, value proposition, app-development comparison.
2. **FPA33501** — concept and research: problem, audience, interview, solution pillars, peer evaluation.
3. **`fpa-prototype-old.pdf`** — original brand voice and mission.
4. **`Low-fidelity-sketch-fpa-prototype.png`** — original logged-in IA.

Where a later document supersedes an earlier one, the later document wins. Where the conflict is genuine — for example, Framer versus coding, or questionnaire versus no questionnaire — the decision below is recorded rather than hidden.

### 3.2 Decisions for this pass

| ID | Decision | Rationale | Supersedes |
|---|---|---|---|
| D1 | Use all four sources, with FPA33502 as the latest refinement | Preserves the full research trail and resolves conflicts in favour of the newest thinking | — |
| D2 | Adopt the FPA33502 brand: white, lavender `#C8B5F5`, blue `#5367E8`, pink `#F6A8BD`, Manrope headings, Inter body, "LaunchPad" | The newest brand identity is the clearest visual statement of the refined concept | FPA33501's navy/teal refined prototype |
| D3 | Keep React and Vite; do not rebuild in Framer | The build already exceeds the prototype goal and has full control and static hosting; the Framer choice is recorded as a process deviation | FPA33502 app-development choice |
| D4 | Add a lightweight roadmap, not an onboarding questionnaire | Serves Mia and the sketch's milestone tracker without adding a form that tests poorly | Implementation-plan decision 20 |
| D5 | Add a lightweight opportunities slice, not a full marketplace | Restores the missing solution pillar and answers the peer request without pretending to be a real job board | — |
| D6 | Add a mock portfolio feedback loop, not a real review workflow | Makes the VPC tangible and testable with seeded data and no backend | — |
| D7 | Defer community and networking to Phase 7 | Protects the core pass; the "Network" promise is recorded as a deferred commitment, not removed | — |
| D8 | Bump demo state to `launchpad.demo.v2` if new persisted arrays are added | Prevents corrupt or partial state; a version mismatch reseeds | `launchpad.demo.v1` |
| D9 | Keep the three core test tasks; add optional tasks 4 and 5 | Preserves comparability with the first round and tests the new value proposition | — |
| D10 | Keep all new content fictional and South African English, with ZAR where pricing appears | Consistent with the existing prototype and the research audience | — |

### 3.3 Status vocabulary

Use the same vocabulary as the research review: **Strong**, **Partial**, **Missing**, **Conflict**, **Deferred**.

---

## 4. Phase overview

| Phase | Name | Research link | Estimate | Demo checkpoint | Depends on |
|---|---|---|---:|---|---|
| 0 | Research record and decision lock | All sources | 0.5 day | Docs review | — |
| 1 | Truth, copy and matching fixes | R05, R17, R22, R29 | 0.5 day | Recommendations respond to skills | Phase 0 |
| 2 | Brand alignment | R20, R14 | 0.5–1 day | Home and dashboard match the new brand | Phase 1 |
| 3 | Opportunities and practice briefs | R10, R13, R23, R36, R37 | 1 day | Opportunity found, saved and applied for | Phase 1 |
| 4 | Portfolio feedback loop | R24–R27, R32–R34 | 1.5–2 days | Project submitted and feedback read | Phase 1 |
| 5 | Roadmap and onboarding | R21, R28, R41 | 0.5–1 day | Dashboard shows a live path | Phases 3–4 |
| 6 | Test kit, QA and release | R13, R16, R24 | 0.5–1 day | Hosted build passes all tasks | Phases 2–5 |
| 7 | Community and networking (optional) | R07, R31, R37 | 1–2 days | Peer showcase or explicit deferral | Phase 6 |

**Critical path:** 0 → 1 → 2 → 3 → 4 → 5 → 6. Phase 2 can run in parallel with Phases 3–5 if two people are working. Phase 7 is post-test.

---

## 5. Phase detail

### Phase 0 — Research record and decision lock

**Estimate:** 0.5 day  
**Research link:** all sources  
**Objective:** Make the research basis explicit, versioned and impossible to overlook.

#### Tasks

- [ ] Commit `FPA33501_Process.pdf` and `BenjaminMcCusker_FPA33502_24ZTF40_Process.pdf` under `design-docs/`.
- [ ] Add `desktop.ini` to `.gitignore` or remove it from the working tree.
- [ ] Update the source-material and research-alignment links in `docs/IMPLEMENTATION-PLAN.md` to name all four sources and the two new review documents.
- [ ] Add a **Fidelity pass** note to `docs/PROGRESS.md` linking this plan.
- [ ] Record decisions D1–D10 in `docs/PROGRESS.md`, either in the "Fidelity pass" section or the existing decisions log.
- [ ] Add the two new documents to `README.md`.
- [ ] Freeze the status vocabulary and the source hierarchy in this plan.

#### Files

`design-docs/*.pdf`, `docs/IMPLEMENTATION-PLAN.md`, `docs/PROGRESS.md`, `README.md`, `.gitignore`

#### Acceptance

- [ ] All four source documents are tracked in git.
- [ ] The implementation plan names all four sources.
- [ ] Every deviation in the research review has a recorded decision.
- [ ] `README.md` links to the research review and this plan.

#### Demo checkpoint

A docs-only review: the research trail is complete and the next phases are unambiguous.

---

### Phase 1 — Truth, copy and matching fixes

**Estimate:** 0.5 day  
**Research link:** R05 (communication and confidence), R17 (skill-tag matching), R22 (affordable mentorship), R29 (proposals)  
**Objective:** Remove contradictions and make the existing personalisation match the research before adding new screens.

#### Tasks

- [ ] **Free intro claim.** Either add a free intro option to every mentor — including Sipho Dlamini — or change the copy on `MentorshipPage.tsx` and `HomePage.tsx` to say "most mentors". Recommended: add a free intro to all, because affordability is a research theme.
- [ ] **Skill-aware matching.** Add `profile.skills` to the keyword set used by `getRecommendedMentors` and `getRecommendedModules`. Weight skills at least as highly as goals. Rename `goalKeywords` to `profileKeywords` for clarity.
- [ ] **Proposal content.** Add a short proposal-writing block to `Pricing Your Creative Work` or `Client Communication & Briefs`: problem, scope, deliverables, timeline, price, next step.
- [ ] **"Network" promise.** Keep the original tagline, but record in `PROGRESS.md` that networking is represented by mentorship until Phase 7. Do not silently drop the promise.
- [ ] **Copy sweep.** Check for other claims the prototype does not support; fix or record them.

#### Files

`src/data/mentors.ts`, `src/state/selectors.ts`, `src/data/modules.ts`, `src/features/marketing/MentorshipPage.tsx`, `src/features/marketing/HomePage.tsx`, `docs/PROGRESS.md`

#### Acceptance

- [ ] No screen promises a feature the prototype does not have.
- [ ] Changing a skill in My Profile changes the recommended mentors or modules.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] The three core tasks still pass.

#### Demo checkpoint

Change a skill in the profile, return to the dashboard, and see the recommendations respond.

---

### Phase 2 — Brand alignment

**Estimate:** 0.5–1 day  
**Research link:** R20 (FPA33502 brand identity), R14 (Fiverr's simple colour and polished homepage)  
**Objective:** Bring the visual layer in line with the latest brand identity without rebuilding the layout.

#### Tasks

- [ ] Add Manrope through Fontsource: `@fontsource-variable/manrope`.
- [ ] Update `--font-display` to Manrope; keep Inter for body.
- [ ] Add brand tokens: `--brand-white`, `--brand-lavender`, `--brand-blue`, `--brand-pink`.
- [ ] Map semantic tokens to the brand: blue as the primary action, lavender and pink as soft surfaces, dark ink for text. Do not place white text on lavender or pink without a contrast check.
- [ ] Update `Logo.tsx` to "LaunchPad" with a purple P; update the `aria-label`, page titles, `site.name`, README, TEST-KIT and PROGRESS.
- [ ] Move the app shell to a light-dominant surface. Keep navy only for text or occasional contrast bands. Use lavender/blue for active states and accents.
- [ ] Restyle the hero, dashboard hero, cards, badges, chips and progress bars to the new palette.
- [ ] Run a contrast pass on every text/background pair. Check focus rings on light surfaces.
- [ ] Regenerate the showcase screenshots and GIF.

#### Files

`src/styles/tokens.css`, `src/styles/global.css`, `src/styles/app.css`, `src/styles/pages.css`, `src/components/shared/Logo.tsx`, `src/data/site.ts`, `index.html`, `README.md`, `docs/TEST-KIT.md`, `docs/PROGRESS.md`, `docs/showcase/*`

#### Acceptance

- [ ] Brand colours, fonts and logo casing match FPA33502.
- [ ] All text/background pairs meet WCAG AA contrast.
- [ ] Focus is visible on every interactive element on light surfaces.
- [ ] No hard-coded colours outside tokens.
- [ ] The three core tasks still pass at 375, 768, 1024 and 1440 px.
- [ ] Showcase screenshots are current.

#### Demo checkpoint

Home, dashboard and styleguide side by side with the FPA33502 brand page.

#### Note

If the navy/teal look is preferred, record it as a deliberate deviation: "FPA33502 brand treated as a future variant; current navy/teal retained." Do not leave the conflict undocumented.

---

### Phase 3 — Opportunities and practice briefs

**Estimate:** 1 day  
**Research link:** R10 (entry-level projects and internships), R13 (peer request for opportunities), R23 (practical project briefs), R36 (guided briefs), R37 (community and opportunities)  
**Objective:** Restore the third solution pillar and answer the one peer-evaluation request that was not implemented.

#### Data

Add to `src/types/index.ts`:

```ts
type Opportunity = {
  id: string
  slug: string
  title: string
  type: 'practice-brief' | 'internship' | 'project'
  client: string
  discipline: string
  level: 'Beginner' | 'Intermediate'
  paid: boolean
  priceZar?: number
  deadline: string
  summary: string
  description: string
  skills: string[]
  featured: boolean
}
```

#### Tasks

- [ ] Add 4 seeded opportunities: two practice briefs, one internship and one paid entry-level project. Use fictional clients and South African context.
- [ ] Add `/app/opportunities` with search, type filter, discipline filter and paid/unpaid filter.
- [ ] Add `/app/opportunities/:slug` with the brief, skills, deadline, client and a "Save" and "Apply" action.
- [ ] Persist saved opportunity IDs in demo state.
- [ ] Make "Apply" a mock confirmation with a toast; no real application is sent.
- [ ] Add an **Opportunities for you** dashboard card with two recommendations based on skills and goals.
- [ ] Add **Opportunities** to the app sidebar and mobile navigation.
- [ ] Add a public `/opportunities` page or a homepage teaser if time allows. The app route is the priority.
- [ ] Add empty states and a clear "fictional prototype content" note.

#### Files

`src/types/index.ts`, `src/data/opportunities.ts`, `src/state/demo-state.tsx`, `src/state/seed.ts`, `src/state/storage.ts`, `src/features/opportunities/*`, `src/features/dashboard/DashboardPage.tsx`, `src/data/site.ts`, `src/router.tsx`

#### Acceptance

- [ ] A participant can reach Opportunities from the dashboard and the sidebar.
- [ ] Filters narrow results and can be cleared.
- [ ] A brief can be saved and applied for; both actions give feedback.
- [ ] Saved opportunities persist across reloads and reset with the demo.
- [ ] The page is responsive and keyboard operable.
- [ ] All content is fictional and labelled.

#### Demo checkpoint

Find a practice brief, save it, apply for it, and see it on the dashboard.

---

### Phase 4 — Portfolio feedback loop

**Estimate:** 1.5–2 days  
**Research link:** R24–R27 (Mia and Daniel's feedback, assessment and revision needs), R30 (showcase), R32–R34 (VPC portfolio, assessment and feedback history)  
**Objective:** Make the value proposition canvas tangible: a learner can submit work, receive structured feedback, and see how it develops.

#### Data

Add to `src/types/index.ts`:

```ts
type PortfolioProject = {
  id: string
  title: string
  summary: string
  image: string
  role: string
  skills: string[]
  status: 'draft' | 'submitted' | 'reviewed'
  submittedAt?: string
  feedback?: {
    mentorId: string
    rubric: { criterion: string; score: number; comment: string }[]
    annotations: { area: string; note: string }[]
    revisionHistory: { version: number; date: string; note: string }[]
  }
}
```

#### Tasks

- [ ] Seed two projects for Naledi: one draft and one reviewed.
- [ ] Add `/app/portfolio` with project cards, status and a "View feedback" action.
- [ ] Add a mock "Add project" form: title, summary, role, skills and an image choice.
- [ ] Add "Submit for review" with a confirmation and a status change.
- [ ] Add a feedback view: rubric criteria (clarity, relevance, craft, storytelling), scores, mentor annotations and revision history.
- [ ] Use Lucas Meyer or Priya Naidoo as the reviewer.
- [ ] Add a progress indicator: projects reviewed and criteria improved.
- [ ] Add a **Portfolio feedback** dashboard card with the next action.
- [ ] Link the portfolio from My Profile; keep the external portfolio link as an optional field.
- [ ] Add empty and submitted states.
- [ ] Add an optional Task 4 to the test kit: "Submit a project for review and find the feedback."

#### Files

`src/types/index.ts`, `src/data/portfolio.ts`, `src/state/demo-state.tsx`, `src/state/seed.ts`, `src/state/selectors.ts`, `src/features/portfolio/*`, `src/features/dashboard/DashboardPage.tsx`, `src/features/dashboard/ProfilePage.tsx`, `src/router.tsx`

#### Acceptance

- [ ] A participant can open the portfolio, submit a project and read structured feedback.
- [ ] The rubric, annotations and revision history are understandable without explanation.
- [ ] The state persists across reloads and resets with the demo.
- [ ] The page is responsive and keyboard operable.
- [ ] The feedback reads as supportive and specific, not vague or punitive.

#### Demo checkpoint

Submit the draft project, open the feedback, and explain what changed between revisions.

---

### Phase 5 — Roadmap and onboarding

**Estimate:** 0.5–1 day  
**Research link:** R21 (Mia's onboarding and roadmap), R28 (Ayesha's tailored path), R41 (the sketch's milestone tracker)  
**Objective:** Give a new learner a clear next step without adding an onboarding questionnaire.

#### Tasks

- [ ] Add a **Your path** dashboard card with five milestones:
  1. Complete your profile.
  2. Start a module.
  3. Book a mentor.
  4. Submit a portfolio project.
  5. Apply to an opportunity.
- [ ] Derive completion from existing state where possible: profile completeness, lesson progress, bookings, portfolio projects, saved/applied opportunities.
- [ ] Show the current step and one recommended next action.
- [ ] Add a lightweight goal prompt for new users: choose a goal from the existing profile goals, or add one inline. Do not build a multi-step questionnaire.
- [ ] Add an optional `/app/roadmap` page if the card needs more space. The dashboard card is the minimum.
- [ ] Make the roadmap responsive and keyboard operable.
- [ ] Add a "why this step" line that links to the relevant module, mentor or opportunity.

#### Files

`src/features/dashboard/DashboardPage.tsx`, `src/features/dashboard/dashboard-cards.tsx`, `src/state/selectors.ts`, `src/types/index.ts`, `src/router.tsx`

#### Acceptance

- [ ] A new user sees a clear first step.
- [ ] Completing a milestone updates the card without a reload.
- [ ] The path reflects real state, not a hard-coded sequence.
- [ ] No onboarding questionnaire is introduced.
- [ ] The card is usable at 375 px.

#### Demo checkpoint

Reset the demo, sign in, and follow the path from profile to module to mentor to portfolio to opportunity.

---

### Phase 6 — Test kit, QA and release

**Estimate:** 0.5–1 day  
**Research link:** R13 (opportunities), R16 (onboarding), R24 (feedback), R37 (community)  
**Objective:** Validate the fidelity pass without regressing the core experience.

#### Tasks

- [ ] Keep Tasks 1–3 exactly as they are.
- [ ] Add optional Task 4: "Submit a portfolio project for review and find the feedback."
- [ ] Add optional Task 5: "Find a practice brief or opportunity you could apply for."
- [ ] Add debrief questions:
  - "If you wanted a portfolio review, where would you go?"
  - "Would you expect to find real projects or internships here?"
  - "What would you want to happen after a mentor reviewed your portfolio?"
  - "Did anything promise something the product did not deliver?"
- [ ] Recruit at least one participant who resembles Daniel (has a portfolio, wants assessment) and one who resembles Mia (avoiding freelancing, wants guidance).
- [ ] Run responsive QA at 375, 768, 1024 and 1440 px.
- [ ] Run keyboard, focus, contrast and reduced-motion checks.
- [ ] Update `README.md`, `PROGRESS.md`, `TEST-KIT.md` and the showcase.
- [ ] Run `npm run typecheck` and `npm run build`.
- [ ] Smoke-test the hosted build.
- [ ] Tag `v0.2.0`.

#### Files

`docs/TEST-KIT.md`, `README.md`, `docs/PROGRESS.md`, `docs/showcase/*`, `package.json`

#### Acceptance

- [ ] Tasks 1–3 pass on the hosted build.
- [ ] Optional Tasks 4–5 pass if the features are included.
- [ ] No console errors or broken images.
- [ ] No external runtime network requests.
- [ ] All docs are current.
- [ ] `v0.2.0` is tagged.

#### Demo checkpoint

The hosted URL, with the new tasks documented and the showcase regenerated.

---

### Phase 7 — Community and networking (optional, post-test)

**Estimate:** 1–2 days  
**Research link:** R07 (Concept 3 networking), R31 (Ayesha's networking and collaboration), R37 (community and opportunities)  
**Objective:** Earn the "Network" promise in the original tagline, or record it as a deliberate post-test deferral.

#### Tasks

- [ ] Add a peer showcase: learners share one project, with a short context note and a supportive comment or endorsement.
- [ ] Or add a community challenge: a seeded brief, a submission gallery and a simple "participated" state.
- [ ] Add a **Community** nav item or a section on Home.
- [ ] Keep all interaction mock: no real messaging, no moderation queue, no notifications backend.
- [ ] If deferred, add community to the implementation plan's non-goals with a rationale and link to this phase.

#### Files

`src/features/community/*`, `src/router.tsx`, `src/data/site.ts`, `src/features/marketing/HomePage.tsx`, `docs/IMPLEMENTATION-PLAN.md`

#### Acceptance

- [ ] Community is visible, testable and clearly fictional.
- [ ] It does not regress the core tasks.
- [ ] Or: the deferral is recorded and the "Network" promise is explained.

#### Demo checkpoint

A peer showcase or challenge that a participant can understand in under a minute.

---

## 6. Cross-cutting work

### 6.1 Data model additions

```ts
type Opportunity = {
  id: string
  slug: string
  title: string
  type: 'practice-brief' | 'internship' | 'project'
  client: string
  discipline: string
  level: 'Beginner' | 'Intermediate'
  paid: boolean
  priceZar?: number
  deadline: string
  summary: string
  description: string
  skills: string[]
  featured: boolean
}

type PortfolioProject = {
  id: string
  title: string
  summary: string
  image: string
  role: string
  skills: string[]
  status: 'draft' | 'submitted' | 'reviewed'
  submittedAt?: string
  feedback?: {
    mentorId: string
    rubric: { criterion: string; score: number; comment: string }[]
    annotations: { area: string; note: string }[]
    revisionHistory: { version: number; date: string; note: string }[]
  }
}
```

Demo state additions:

```ts
type DemoState = {
  // existing fields
  savedOpportunityIds: string[]
  appliedOpportunityIds: string[]
  portfolioProjects: PortfolioProject[]
}
```

### 6.2 State and persistence

- Bump the storage key to `launchpad.demo.v2` if any new array is persisted.
- Update `loadState()` validation, `seedState()` and `resetDemo()`.
- Ensure a version mismatch reseeds cleanly.
- Ensure reset clears saved opportunities, applications and portfolio changes.
- Update README and TEST-KIT references to the storage key.

### 6.3 Accessibility

- Check every brand colour pair; white on lavender or pink is likely to fail.
- Use dark ink on light accents; reserve white for blue or navy surfaces.
- Keep visible focus rings on light surfaces.
- New pages: one `h1`, ordered headings, labelled forms, status regions.
- Dialogs: native `<dialog>`, labelled, focus-managed.
- Reduced motion: no new exceptions.

### 6.4 Content

- All clients, opportunities, learners and feedback are fictional.
- South African English; ZAR where pricing appears.
- No real logos, people or company names.
- Add prototype disclaimers to new pages.
- Keep the tone practical, specific and non-patronising.

### 6.5 Documentation

Update at the end of each phase:

- `README.md` — routes, features, commands, reset key.
- `docs/PROGRESS.md` — phase status and decisions.
- `docs/TEST-KIT.md` — tasks and debrief.
- `docs/showcase/` — screenshots and GIF.
- `CREDITS.md` — only if new assets are added.

### 6.6 Instrumentation

None. Keep manual observation and the reset control. Do not add analytics.

---

## 7. Test plan

### 7.1 Core tasks (unchanged)

1. **Learn:** find *Pricing Your Creative Work* and start the first lesson.
2. **Match:** find a mentor who offers portfolio feedback and open their profile.
3. **Book:** book a 30-minute session and find it in Sessions.

### 7.2 Optional tasks (after Phases 3–4)

4. **Portfolio:** "Submit a portfolio project for review and find the feedback."
5. **Opportunity:** "Find a practice brief or opportunity you could apply for."

Run the core tasks first. Only run optional tasks if the participant has time and the features are present.

### 7.3 Debrief prompts

- What was the most confusing moment?
- Was there anything you expected to be able to do that you could not?
- Did the mentor profiles give you enough information to book?
- How did you feel about the pricing examples?
- If you wanted a portfolio review, where would you go?
- Would you expect to find real projects or internships here?
- What would you want to happen after a mentor reviewed your portfolio?
- Did anything promise something the product did not deliver?

### 7.4 Measures

- Task success: yes / assisted / no.
- Time to complete.
- Path taken.
- Points of hesitation, misclicks and verbatim quotes.
- Severity: low / medium / high.
- Whether participants expect opportunities and portfolio feedback, even if they did not use them.

### 7.5 Participant mix

Recruit for the personas, not just availability:

- at least one **Mia**-like participant: recent graduate, avoiding freelancing, wants guidance;
- at least one **Daniel**-like participant: has a portfolio, wants assessment and revision;
- at least one **Ayesha**-like participant: early freelancer, wants pricing, contracts and networking.

---

## 8. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Brand change breaks contrast or readability | Medium | Token-first change; contrast table; test every pair; keep navy for text |
| New features distract from the core tasks | Medium | Core tasks first; optional tasks after; do not change existing task wording |
| Scope creep in opportunities | High | Practice briefs and mock apply only; no real marketplace, payments or applications |
| Portfolio feedback becomes a real review workflow | Medium | Seeded feedback and mock submission only; no uploads, no backend |
| State migration loses demo data | Medium | Version bump and reseed; document the reset key |
| Community phase expands indefinitely | High | Phase 7 is optional and post-test; defer with a recorded rationale |
| Content feels unrealistic or patronising | Medium | Use the existing content tone; review with a graduate; keep examples specific and modest |
| The "Network" promise remains unearned | Medium | Build Phase 7 or record the deferral explicitly |
| The Framer deviation is seen as non-compliance | Low | Record the decision and the reasons in PROGRESS and the research review |
| The prototype becomes too large to test in 20–30 minutes | Medium | Keep the three core tasks; optional tasks only; reset between participants |

---

## 9. Definition of done

The fidelity pass is done when:

- [ ] All four source documents are tracked and cited.
- [ ] The research traceability matrix is current, with no unexplained gaps.
- [ ] The brand matches FPA33502, or the deviation is recorded.
- [ ] Learner skills influence mentor and module recommendations.
- [ ] Opportunities are discoverable, saveable and applicable (mock).
- [ ] Portfolio projects can be submitted, reviewed and revised (mock).
- [ ] The dashboard shows a live path from profile to opportunity.
- [ ] Tasks 1–3 pass on the hosted build.
- [ ] Optional Tasks 4–5 pass if the features are included.
- [ ] Accessibility, contrast, keyboard and reduced-motion checks pass.
- [ ] No external runtime network requests.
- [ ] `README.md`, `PROGRESS.md`, `TEST-KIT.md` and the showcase are current.
- [ ] `v0.2.0` is tagged.
- [ ] Community is either built or explicitly deferred with a rationale.

---

## Appendix A — Dependency graph

```text
Phase 0 Research record
   └─ Phase 1 Truth, copy and matching
        ├─ Phase 2 Brand alignment ──────────────┐
        ├─ Phase 3 Opportunities ────────────────┤
        ├─ Phase 4 Portfolio feedback ───────────┤
        │                                        │
        └─ Phase 5 Roadmap (needs 3 and 4)       │
             └─ Phase 6 Test, QA and release ◄───┘
                  └─ Phase 7 Community (optional)
```

Phase 2 can run in parallel with Phases 3–4. Phase 5 needs the state from Phases 3–4 to show all five milestones.

## Appendix B — Suggested branch and PR sequence

| Branch | Phase | PR focus |
|---|---|---|
| `phase/fidelity-0-research-record` | 0 | Docs, source links, decisions |
| `phase/fidelity-1-truth-matching` | 1 | Copy, free intros, skill matching, proposal content |
| `phase/fidelity-2-brand` | 2 | Tokens, Manrope, LaunchPad, light shell, screenshots |
| `phase/fidelity-3-opportunities` | 3 | Types, data, routes, dashboard card, nav |
| `phase/fidelity-4-portfolio` | 4 | Portfolio, submission, rubric, feedback, revision history |
| `phase/fidelity-5-roadmap` | 5 | Your path card, milestones, next step |
| `phase/fidelity-6-release` | 6 | Test kit, QA, docs, v0.2.0 |
| `phase/fidelity-7-community` | 7 | Optional peer showcase or deferral note |

One branch per phase, one PR into `main`, with the research ID in the PR body.

## Appendix C — Research ID map

| Phase | Research IDs |
|---|---|
| 0 | All |
| 1 | R05, R17, R22, R29 |
| 2 | R14, R20 |
| 3 | R10, R13, R23, R36, R37 |
| 4 | R24, R25, R26, R27, R30, R32, R33, R34 |
| 5 | R21, R28, R41 |
| 6 | R13, R16, R24, R37 |
| 7 | R07, R31, R37 |

## Appendix D — File map

| Area | Likely files |
|---|---|
| Types and data | `src/types/index.ts`, `src/data/opportunities.ts`, `src/data/portfolio.ts`, `src/data/mentors.ts`, `src/data/modules.ts` |
| State | `src/state/demo-state.tsx`, `src/state/seed.ts`, `src/state/storage.ts`, `src/state/selectors.ts` |
| Routes | `src/router.tsx`, `src/data/site.ts` |
| Opportunities | `src/features/opportunities/*` |
| Portfolio | `src/features/portfolio/*` |
| Dashboard | `src/features/dashboard/DashboardPage.tsx`, `dashboard-cards.tsx` |
| Brand | `src/styles/tokens.css`, `global.css`, `app.css`, `pages.css`, `src/components/shared/Logo.tsx` |
| Docs | `README.md`, `docs/PROGRESS.md`, `docs/TEST-KIT.md`, `docs/IMPLEMENTATION-PLAN.md`, `docs/showcase/*` |
