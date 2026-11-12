# Launchpad — Research Alignment Review

- **Status:** Formal review
- **Prepared:** 12 November 2026
- **Prototype reviewed:** Launchpad v0.1.0 (React 19 + Vite 8 + TypeScript)
- **Review basis:** `FPA33501_Process.pdf`, `BenjaminMcCusker_FPA33502_24ZTF40_Process.pdf`, `fpa-prototype-old.pdf`, `Low-fidelity-sketch-fpa-prototype.png`
- **Companion document:** [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md)
- **Related documents:** [`IMPLEMENTATION-PLAN.md`](IMPLEMENTATION-PLAN.md), [`PROGRESS.md`](PROGRESS.md), [`TEST-KIT.md`](TEST-KIT.md)

---

## 1. Purpose

This document answers one question: **how faithfully does the built prototype represent the research and thinking recorded in `design-docs/`?**

It is not a general code review and not a usability report. It is a traceability review. It records:

- what the research argues;
- what the prototype actually implements;
- where the two align, partially align, conflict or diverge;
- what should be done about each gap.

The intended audience is the project author, a supervisor or marker, and any designer or developer continuing the work.

---

## 2. Sources and method

### 2.1 Sources

| Source | What it contributes | Authority in this review |
|---|---|---|
| `FPA33501_Process.pdf` | Problem definition, secondary research, hirer interview, personas, concept selection, solution overview, peer evaluation, refined prototype | Primary concept and research authority |
| `BenjaminMcCusker_FPA33502_24ZTF40_Process.pdf` | Competitor analysis, visual analysis, brand identity, annotated low-fidelity sketch, personas, value proposition canvas, app-development choice | Latest refinement authority; overrides earlier visual and scope decisions where they conflict |
| `fpa-prototype-old.pdf` | Original brand voice, page themes, mentor personalities and mission copy | Baseline copy and brand reference |
| `Low-fidelity-sketch-fpa-prototype.png` | Logged-in information architecture: dashboard, mentor matching, mentor profile, homepage | Baseline IA reference |
| Built prototype (`src/`, `docs/`) | The artefact under review | Subject of the review |

### 2.2 Method

1. Close reading of the text-bearing pages of both new PDFs.
2. Rendering and review of the image-only pages: FPA33502 brand identity, mood board, low-fidelity sketch, personas and value proposition canvas; FPA33501 personas, wireframes and refined prototype figures.
3. Inspection of the React source: routes, screens, data, state, selectors, design tokens and copy.
4. Comparison of each research claim or requirement against an implementation artefact.
5. Status assignment using the vocabulary in Appendix A.
6. Identification of conflicts that require an explicit decision rather than silent resolution.

### 2.3 Source hierarchy and conflict rule

The four sources are not a single consistent brief. They are a sequence of thinking. This review uses the following rule:

1. **Latest explicit refinement wins.** FPA33502 is the most recent document and therefore governs the brand, the refined personas and the value proposition.
2. **Earlier commitments remain unless explicitly superseded.** FPA33501's problem statement, research questions, interview findings and solution pillars remain valid unless FPA33502 changes them.
3. **The original two files remain the baseline for voice and IA.** The old PDF and the low-fidelity sketch are not discarded; they are the starting point that later work refines.
4. **Unresolved conflicts are recorded, not hidden.** Where the sources genuinely disagree — for example, Framer versus coding, or questionnaire versus no questionnaire — the review records the conflict and the fidelity plan records a decision.

---

## 3. What the research argues

### 3.1 Problem and audience

FPA33501 frames the problem as:

> "Graduates who want to move into the freelance market may have the skills to apply but lack a clear practical business knowledge to secure their first opportunity."

The target audience is **final-year students or recent creative degree graduates in South Africa** moving into freelance work. The research emphasises that the design sector is oversaturated, that clients want experience graduates do not yet have, and that freelancing requires business skills beyond craft.

### 3.2 Research questions

1. How can graduates be better prepared for the transition into the freelance market?
2. What does higher education do to prepare graduates for employment, but not for freelancing?
3. Why would graduates not want to enter the freelance market and settle for regular employment instead?
4. What business skills are required for a graduate to be able to sustain their freelance work?
5. What skills do graduates think they lack when entering the freelance market?

### 3.3 Key findings

- The South African freelance market is growing. The research cites 47% of employees having a side job or remote work, and freelance platform income growing from $108 million in 2024 to a projected $306.2 million by 2030.
- Youth unemployment is over 46%, making freelance work an attractive but risky alternative.
- Technical skill is not enough. Communication, self-marketing and negotiation matter.
- Graduates tend to overrate their communication and leadership skills relative to employers (NACE).
- The experience paradox: clients want experienced freelancers, but graduates need clients to gain experience.
- The hirer interview stressed portfolio quality, tech savviness, emotional intelligence, basic work skills, client setup, adaptation, communication, honesty, bravery and confidence.
- Universities could help through freelance programmes, startup relationships and internships.

### 3.4 Personas

**FPA33501 personas**

| Persona | Role in the research | Core need |
|---|---|---|
| Sarah | Graduate avoiding freelancing | Confidence and knowledge of the freelance process |
| Jason | Graduate freelancing but struggling | Consistent clients and professional communication |
| Michelle | Hiring side | Validates the skill gaps; wants portfolio, tech savviness, emotional intelligence and communication |

**FPA33502 personas**

| Persona | Role in the research | Core need |
|---|---|---|
| Mia Jacobs | Recent graphic design graduate, no real client experience | Beginner-friendly onboarding, learning roadmap, affordable mentorship, portfolio templates and project briefs, constructive feedback, no public embarrassment |
| Daniel Mokoena | Junior designer with some projects | Organised portfolio and case studies, structured assessment with clear scoring, written annotations and mentor feedback, revision history, chances to submit improved work and compare progress |
| Ayesha Patel | Aspiring independent freelancer with two years' experience | Advanced mentorship tailored to existing skills, practical pricing, proposal, contract and client-relationship resources, professional portfolio reviews, chances to showcase assessed work, networking and collaboration |

### 3.5 Concept selection

FPA33501 evaluates three concepts:

1. A mentorship platform connecting graduates only with experienced and verified full-time freelancers.
2. A freelance skills academy.
3. A **graduate freelance hub**: an ecosystem combining mentoring, learning and networking.

Concept 3 is chosen because it addresses confidence, freelance knowledge, networking and client acquisition. The solution overview describes:

- teaching pricing and how to approach and speak with clients;
- one-to-one mentor guidance, including portfolio reviews;
- access to entry-level freelance projects and internship opportunities through practice briefs.

### 3.6 Peer evaluation

FPA33501's evaluation with two peers found:

- the purpose and identity were clear;
- mentorship was the most valued feature;
- the learning page needed more descriptive courses and more courses overall;
- the mentor page needed more depth, including experience and field;
- one peer explicitly asked for **a place where freelance job opportunities can be shown and interacted with**.

The evaluation summary states that the changes needed are **more learning content and freelance opportunities**.

### 3.7 Competitor and visual analysis

FPA33502's competitor takeaways:

| Competitor | Takeaway |
|---|---|
| Fiverr | Polished homepage with enough information; simple colour scheme lets the work stand out |
| Upwork | Detailed profiles, skill tags, onboarding, clear navigation and search; match graduates to mentors who share skill tags |
| ADPList | Mentor profile cards, filtering by skill tags, a Help section, a professional community; simple white background with sparing colour |

Brand identity:

- Logo: **LaunchPad** with a purple P.
- Colours: `#FFFFFF`, `#C8B5F5` lavender, `#5367E8` blue, `#F6A8BD` pink.
- Headings: **Manrope**; body: **Inter**.
- Mood and inspiration: refined search, in-depth profile cards, homepage imagery, simple surfaces, restrained colour.

### 3.8 Value proposition canvas

FPA33502's VPC defines the product's distinctive value.

**Products and services**

1. Digital portfolio creation and project publishing.
2. Portfolio submissions for expert and peer assessment.
3. Progress tracking and feedback history.
4. One-to-one mentoring with experienced freelancers.
5. Structured learning resources and practical project briefs.
6. A community for sharing work and discovering opportunities.

**Gain creators**

- Portfolio showcases help users present their strongest work.
- Progress indicators make skill development visible.
- Mentor endorsements and transparent assessments establish credibility.
- Community challenges encourage participation and experimentation.
- Career resources translate skills into freelance opportunities.

**Pain relievers**

- Assessment rubrics replace vague opinions with clear criteria.
- Mentor feedback identifies specific areas for improvement.
- Revision history lets users track how their work develops.
- A supportive review environment makes critique less intimidating.
- Guided project briefs help users understand what to create.

**Customer jobs**

- Feel prepared to approach clients and pursue paid opportunities.
- See measurable improvement.
- Attract clients and establish a freelance career.
- Receive specific, actionable feedback.
- Build a polished, credible portfolio.
- Gain recognition for skills and progress.
- Improve quality and presentation.
- Understand industry standards and client expectations.
- Build a professional portfolio.
- Develop confidence.

**Pains**

- Vague or unhelpful feedback.
- Lack of access to experienced industry professionals.
- Not knowing which portfolio projects need improvement.
- Struggling to distinguish themselves from other graduates.
- Uncertainty about whether work is ready for clients.

### 3.9 App-development choice

FPA33502 compares Wix, Framer and coding. It selects **Framer** for a polished prototype or MVP, while noting that coding offers full control and no subscription. The implemented prototype uses React and Vite. This is a documented deviation to resolve in the fidelity plan, not a reason to rewrite the build.

### 3.10 Original files

- **`fpa-prototype-old.pdf`** establishes the original brand voice and page themes. Key lines retained in the build: "Start your freelance career with confidence", "Learn. Network. Build. Earn.", "Everything you need to become freelance-ready", "Learn from professionals who have been there!", and the mission around skills, confidence and professional connections.
- **`Low-fidelity-sketch-fpa-prototype.png`** establishes the logged-in IA: dashboard with greeting, milestone tracker, quick recommendation and tailored help/courses; mentor matching with search and filters; mentor profile with save/connect, skill tags and detailed bio; homepage with top bar, global search, hero, social proof and hamburger menu.

---

## 4. Alignment assessment

### 4.1 Overall verdict

The prototype is a **strong realisation of the learning-and-mentorship concept in FPA33501 and the original IA**, but **not yet a faithful realisation of the FPA33502 refinement**. It behaves like a polished learn-and-book platform. The research describes a graduate freelance hub whose distinctive value is the **portfolio feedback loop, practical briefs and opportunities, and community**.

Indicative summary:

- **Against FPA33501 and the original files:** roughly **80%** aligned. The learning, mentorship, profile, matching and booking pillars are present; the opportunities pillar is missing.
- **Against FPA33502:** roughly **40%** aligned. The learning and mentoring layers survive; the portfolio-assessment, opportunities and community layers do not; the brand is one generation behind.
- **Against the whole source set:** the core journey is credible and testable, but the hub thesis is under-represented.

These percentages are a judgement, not a measured score. The status counts below are the auditable version.

Research-question coverage is uneven. **RQ1** (preparation for freelance work) and **RQ4** (business skills) are strongly served by the modules and mentorship. **RQ2** (the higher-education gap) and **RQ3** (why graduates avoid freelancing) are present in the About copy but not in product mechanics. **RQ5** (the skills graduates think they lack) is collected in the profile but not used for matching. The experience paradox — graduates need client work to gain experience, but clients want experience — is the strongest argument for the missing opportunities pillar.

### 4.2 Coverage counts

| Lens | Strong | Partial | Missing | Conflict |
|---|---:|---:|---:|---:|
| FPA33501 solution pillars (3) | 2 | 0 | 1 | 0 |
| FPA33502 VPC product boxes (6) | 1 | 2 | 3 | 0 |
| FPA33502 personas (3) | 0 | 2 | 1 | 0 |
| Original low-fidelity IA areas (3) | 2 | 1 | 0 | 0 |
| Brand identity (FPA33502) | 0 | 0 | 0 | 1 |

### 4.3 Scorecard

| Research dimension | What the build does | Status |
|---|---|---|
| Problem and audience: South African creative graduates entering freelance work | Naledi Khumalo, South African English, ZAR examples, design-specific content | **Strong** |
| Business-skills learning: pricing, clients, briefs, contracts | 6 modules, 20 lessons; pricing and client communication are particularly strong | **Strong** |
| Mentor credibility and detailed profiles | 6 mentors with role, company, years, expertise, bio, reviews and availability | **Strong** |
| Discovery and filtering by skill or expertise | Global search, expertise/session-type/availability filters, sort | **Strong** |
| Booking and sessions | Slot generation, confirmation, dashboard and Sessions, cancel | **Strong** (beyond the research, but consistent with the ADPList direction) |
| Tailored help and "Your plan" | Four goal-driven resource links in the dashboard rail | **Partial** — closer to a widget than the sketch's tailored help section |
| Brand identity from FPA33502 | Navy, teal and amber; Archivo headings; "Launchpad" | **Conflict** with the new brand specification |
| Onboarding and learning roadmap | Mock sign-in, profile completeness, no guided path or milestone tracker | **Missing** |
| Portfolio creation and publishing | External portfolio link only | **Missing** |
| Portfolio submission, assessment and feedback history | No submissions, rubrics, annotations, revision history or post-session feedback | **Missing** |
| Opportunities, practice briefs and internships | No route, data or entry point | **Missing** |
| Community and networking | No peer sharing, challenges or collaboration | **Missing** |
| Research traceability in repository docs | This review supplies the matrix and the plan now links all four sources; the two new PDFs are still untracked | **Partial** |

### 4.4 Persona coverage

- **Mia:** learning modules partly serve her. Onboarding and roadmap, portfolio templates and project briefs are missing. Feedback exists only as a mentor conversation.
- **Daniel:** portfolio and case-study learning exists, but assessment, scoring, annotations, revision history and progress comparison are missing. This is the largest persona gap.
- **Ayesha:** pricing, client and contract learning is strong. Advanced skill-tailored matching is partial. Portfolio reviews exist, but showcase, networking and collaboration are missing.

### 4.5 Test coverage

The test kit covers Learn, Match and Book. None of the three tasks exercises the portfolio-assessment, opportunities or community value proposition. The distinctive research claims are therefore untested.

---

## 5. Traceability matrix

Status vocabulary is defined in Appendix A.

### 5.1 FPA33501 — research, concept and evaluation

| ID | Source | Research finding or requirement | Implementation evidence | Status | Note |
|---|---|---|---|---|---|
| R01 | Identify | Target final-year or recent South African creative graduates | Naledi Khumalo; South African English; ZAR examples; design-specific modules | Strong | Audience is clear and consistently represented |
| R02 | Research Q1, Q4 | Business skills: pricing, clients, negotiation, self-marketing | 6 modules, 20 lessons; modules 1–3 cover clients, pricing and communication | Strong | Deepest part of the build |
| R03 | Research Q3 | Financial risk and the reasons graduates avoid freelancing | About copy references the first late invoice; no financial-safety feature | Partial | The fear is named, not designed for |
| R04 | Interview | Portfolio is very important | Portfolio module; Lucas and Priya offer Portfolio Review; profile has a portfolio link | Strong | Review conversation is represented; artefact is not |
| R05 | Interview | Communication, honesty, confidence and emotional intelligence | Client Communication module; mentor bios; no explicit confidence or emotional-intelligence feature | Partial | Soft skills are present in copy, not in product mechanics |
| R06 | Interview | Tech savviness | Amina Yusuf as a frontend mentor; portfolio site lesson | Partial | Represented, but not a central pathway |
| R07 | Concept 3 | Graduate freelance hub: mentoring, learning and networking | Learning and mentoring are present; networking and community are absent | Partial | The hub thesis is under-represented |
| R08 | Solution overview | Teaching pricing and how to approach and speak with clients | Modules 1–3 and 6 | Strong | Practical and specific |
| R09 | Solution overview | One-to-one mentor guidance, including portfolio reviews | 6 mentors; booking and sessions; two portfolio-review specialists | Strong | Core journey is complete |
| R10 | Solution overview | Entry-level projects and internship opportunities through practice briefs | No route, data or entry point | **Missing** | Highest-severity gap against FPA33501 |
| R11 | Evaluate | More descriptive courses and more courses overall | 6 modules, 20 lessons, substantial lesson content | Strong | Directly addresses the first peer critique |
| R12 | Evaluate | Deeper mentor page, including experience and field | Role, company, years of experience, expertise, bio, reviews and availability | Strong | Directly addresses the second peer critique |
| R13 | Evaluate | A place where freelance opportunities can be shown and interacted with | Nothing comparable | **Missing** | The one peer request not implemented |

### 5.2 FPA33502 — refinement, brand, personas and value proposition

| ID | Source | Research finding or requirement | Implementation evidence | Status | Note |
|---|---|---|---|---|---|
| R14 | Competitor: Fiverr | Polished homepage with clear information and restrained colour | Homepage hero, featured modules and mentors, stats, testimonials | Strong | The information architecture is strong; colour is addressed in R20 |
| R15 | Competitor: Upwork | Detailed profiles and skill tags | Mentor cards and profiles with expertise tags, reviews and availability | Strong | Well executed |
| R16 | Competitor: Upwork | Easy onboarding | Mock sign-in only; no onboarding sequence | **Missing** | Conflicts with implementation-plan decision 20 |
| R17 | Competitor: Upwork | Match graduates with mentors who share skill tags | Filters use mentor expertise; recommendations use goals, not the learner's skills | Partial | Add `profile.skills` to scoring |
| R18 | Competitor: ADPList | Search and filter mentors by skill | Global search and expertise filters | Strong | Clear and usable |
| R19 | Competitor: ADPList | A help or resource section | "Your plan" card with four goal-driven links | Partial | Useful, but thin |
| R20 | Brand identity | White, lavender `#C8B5F5`, blue `#5367E8`, pink `#F6A8BD`; Manrope headings; Inter body; "LaunchPad" | Navy, teal and amber; Archivo headings; Inter body; "Launchpad" | **Conflict** | Phase 2 of the fidelity plan |
| R21 | Persona: Mia | Beginner-friendly onboarding and a learning roadmap | None | **Missing** | Phase 5 |
| R22 | Persona: Mia | Affordable mentorship | Free and paid sessions; not every mentor offers a free intro | Partial | Fix the "every mentor" claim; consider free intros for all |
| R23 | Persona: Mia | Portfolio templates and practical project briefs | Module teaches principles; no templates or brief library | Partial | Phase 3 and Phase 4 |
| R24 | Persona: Mia | Constructive feedback without public embarrassment | Mentor reviews are supportive; no submission or review flow | Partial | Phase 4 |
| R25 | Persona: Daniel | Organised portfolio and case studies | Module 5 teaches curation and case studies; no portfolio tool | Partial | Phase 4 |
| R26 | Persona: Daniel | Structured assessment with clear scoring and written annotations | None | **Missing** | Phase 4 |
| R27 | Persona: Daniel | Revision history and comparison of progress | None | **Missing** | Phase 4 |
| R28 | Persona: Ayesha | Advanced mentorship tailored to existing skills | Goal-based recommendations; learner skills are not used | Partial | Phase 1 and Phase 5 |
| R29 | Persona: Ayesha | Pricing, proposals, contracts and client relationships | Modules 1–4 and 6; proposal writing is light | Partial | Add a proposal-writing element |
| R30 | Persona: Ayesha | Portfolio reviews and opportunities to showcase assessed work | Reviews are present; showcase is absent | Partial | Phase 4 and Phase 7 |
| R31 | Persona: Ayesha | Networking and collaboration | None | **Missing** | Phase 7 or explicit deferral |
| R32 | VPC: products | Digital portfolio creation and project publishing | External portfolio link only | **Missing** | Phase 4 |
| R33 | VPC: products | Portfolio submissions for expert and peer assessment | None | **Missing** | Phase 4 |
| R34 | VPC: products | Progress tracking and feedback history | Lesson progress only; no feedback history | Partial | Phase 4 |
| R35 | VPC: products | One-to-one mentoring with experienced freelancers | Mentor discovery, profiles, booking and sessions | Strong | Core strength |
| R36 | VPC: products | Structured learning resources and practical project briefs | Learning resources are strong; briefs are illustrative, not a library | Partial | Phase 3 |
| R37 | VPC: products | A community for sharing work and discovering opportunities | None | **Missing** | Phase 3 and Phase 7 |
| R38 | App development | Framer selected for the polished prototype | React and Vite | **Conflict** | Keep the build; record the deviation |

### 5.3 Original files — voice, mission and IA

| ID | Source | Research finding or requirement | Implementation evidence | Status | Note |
|---|---|---|---|---|---|
| R39 | Old PDF | Brand voice and key copy | Tagline, "Learn. Network. Build. Earn.", "freelance-ready" and "professionals who have been there" retained | Strong | Voice is recognisably the same product |
| R40 | Old PDF | Mission around skills, confidence and professional connections | About page mission is rewritten around the first year of freelance work | Partial | Community and practical opportunities are dropped from the mission |
| R41 | Low-fi sketch | Dashboard greeting, milestone tracker, quick recommendation, tailored help | Greeting, stats, recommendations and tailored links are present; no milestone tracker | Partial | Phase 5 adds the roadmap |
| R42 | Low-fi sketch | Mentor search, filters, mentor profile with save/connect, tags and detailed bio | Present and expanded into a booking flow | Strong | A clear improvement on the sketch |
| R43 | Low-fi sketch | Homepage top bar, global search, hero, social proof and mobile menu | Present | Strong | Well executed |

---

## 6. Findings

### 6.1 Aligned strengths

- The learning content is specific, practical and written for the audience. The pricing module's day-rate maths and ZAR examples, the client-communication scripts and the contract essentials directly answer the business-knowledge gap identified in FPA33501.
- Mentor profiles answer the peer feedback directly: role, company, years of experience, field, expertise tags, detailed bio, reviews and availability.
- Filtering by expertise, session type and availability reflects the ADPList and Upwork takeaways well.
- The marketing copy retains the strongest lines from the original PDF.
- The booking flow is cohesive and testable. Accessibility and responsive work are stronger than the research required.
- All content is honestly fictional and labelled as prototype material.

### 6.2 High-severity gaps and conflicts

1. **Opportunities and practice briefs are missing.** This is the one pillar missing from FPA33501's solution overview and the one explicit peer request not implemented. The evaluation summary's "more learning content and freelance opportunities" is half delivered. It is also the direct answer to the experience paradox: graduates need client work to gain experience, and practice briefs are the bridge.
2. **The portfolio assessment and feedback loop is missing.** FPA33502's VPC makes portfolio submission, rubric-based assessment, annotations, revision history and progress the centre of the value proposition. The prototype cannot exercise that job.
3. **The FPA33502 brand identity is not reflected.** The build is faithful to FPA33501's refined prototype but one visual generation behind the newest brand work.
4. **Onboarding and roadmap are absent.** Mia's persona calls for a beginner-friendly onboarding process and a learning roadmap. The implementation plan explicitly excludes an onboarding questionnaire, which is a direct conflict with the newer research.
5. **"Network" is promised but not delivered.** The tagline says "Learn. Network. Build. Earn.", but there is no networking or community feature.
6. **Research traceability was weak.** The implementation plan originally cited only the old PDF and the sketch. This review and the fidelity plan add the full source set and a traceability matrix; keep them current and commit the two new PDFs.

### 6.3 Medium-severity gaps

- Recommendations use goals, not the learner's skills. Upwork's skill-tag matching is only half implemented.
- The portfolio is a URL field, not a working artefact.
- The tailored help area is four links, not the sketch's broader help and courses section.
- There is no post-session feedback, rating or notes loop.
- Community, peer sharing and collaboration are absent.
- The About mission drops "community engagement" and "practical opportunities" from the original mission.

### 6.4 Low-severity and documentation issues

- `MentorshipPage.tsx` says free intro sessions are available with every mentor, but Sipho Dlamini is paid-only.
- FPA33502 selects Framer; the build uses React. The deviation is defensible but should be recorded.
- The two new PDFs were untracked in git at the time of review.
- The implementation plan's source-material list was out of date; it now links all four sources. The two new PDFs were still untracked at the time of review.
- "Launchpad" and "LaunchPad" are used inconsistently across the research and the build.
- Proposal writing is mentioned in the research and mentor bios but is not a distinct learning outcome.

### 6.5 Conflicts to resolve

| Conflict | Earlier position | Later position | Current build | Recommended resolution |
|---|---|---|---|---|
| Brand identity | FPA33501 refined prototype: navy, teal and purple | FPA33502: white, lavender, blue and pink; Manrope; LaunchPad | Navy, teal and amber; Archivo; Launchpad | Adopt FPA33502 in Phase 2, or record a deliberate deviation |
| App development | Coding gives full control | Framer selected for polish | React and Vite | Keep React; record why it was chosen |
| Onboarding | No onboarding questionnaire in the implementation plan | Mia and Upwork call for onboarding and a roadmap | Mock sign-in only | Add a lightweight roadmap, not a questionnaire |
| Opportunities | FPA33501 solution pillar and peer request | FPA33502 opportunities and community | Absent | Add a lightweight opportunities slice |
| Portfolio assessment | FPA33501 portfolio reviews | FPA33502 VPC makes assessment and revision central | Absent | Add a mock feedback loop |
| Community | FPA33501 Concept 3 networking | FPA33502 community and opportunities | Absent | Build in Phase 7 or record as an explicit non-goal |
| Free intro sessions | Affordability is a research theme | Mentorship page promises a free intro with every mentor | Sipho is paid-only | Add free intros to all mentors or correct the copy |
| Name casing | Old PDF uses both forms | FPA33502 uses "LaunchPad" | "Launchpad" | Standardise on the FPA33502 form, or record the choice |

---

## 7. Recommendations

1. **Adopt the full source set.** Use all four sources, with FPA33502 as the latest refinement. This is the basis for the fidelity plan.
2. **Maintain the traceability matrix.** Keep this document current as features are added. It is the evidence that the build is research-led.
3. **Fix truth and matching first.** Correct contradictory copy, add free intros or change the claim, and include learner skills in matching.
4. **Align the brand layer.** Adopt the FPA33502 palette, Manrope and "LaunchPad", or record a deliberate deviation.
5. **Add a lightweight roadmap.** Serve Mia and the sketch's milestone tracker without introducing a questionnaire.
6. **Restore the opportunities pillar.** Add practice briefs and entry-level opportunities with save/apply interactions.
7. **Make the portfolio feedback loop tangible.** Add projects, submission, rubric, annotations and revision history, even as mock data.
8. **Address community explicitly.** Build a peer showcase or record community as a post-test non-goal.
9. **Update the test kit.** Keep the three core tasks, add debrief probes and optional tasks for the new features.
10. **Complete the documentation.** Commit the new PDFs, update source lists, and record every deviation in the decision log.

The phased execution of these recommendations is in [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md).

---

## 8. Limitations and assumptions

- The prototype was built before the two new PDFs were added to the repository. Some drift is a sequencing consequence, not a failure of craft.
- No participant data exists yet. This review assesses fidelity to the research, not usability.
- Several pages in the new PDFs are image-only. Brand colours, persona details and VPC notes were read from rendered pages. If original source files exist, verify the hex values and persona wording against them.
- All mentor, learner and testimonial content is fictional. This is appropriate for the prototype but limits claims about real-world outcomes.
- There are no automated tests. The review relies on source inspection and documented manual checks.
- The review does not assess visual craft beyond brand alignment, nor the quality of the academic argument itself.
- **Document hygiene:** the AI Declaration page in FPA33502 is blank in the supplied copy, and FPA33501's final reflection heading is unresolved in the table of contents. These do not affect the prototype but should be checked before submission.

---

## 9. Conclusion

The prototype is a credible, well-crafted learning and mentorship product. It is faithful to the original brand voice, the low-fidelity IA and the core of FPA33501. It is not yet the graduate freelance hub described by the research: the opportunities pillar, the portfolio feedback loop and the community layer are missing, and the visual identity predates the latest brand work.

The gap is closeable without discarding the working core. The fidelity plan prioritises traceability, truth fixes, brand alignment, a roadmap, opportunities and a portfolio feedback loop, while keeping the three usability tasks intact.

---

## Appendix A — Status vocabulary

| Status | Meaning |
|---|---|
| **Strong** | The research requirement is clearly and substantially implemented |
| **Partial** | The requirement is represented, but a meaningful part is missing or weaker than the research describes |
| **Missing** | No meaningful implementation exists |
| **Conflict** | The implementation contradicts the research or a documented decision |
| **Deferred** | The requirement is deliberately out of scope for this iteration, with a recorded rationale |

## Appendix B — Source section index

**FPA33501:** Introduction; Identify; Research; Interview; Personas; Construct; How might we; Ideation and Concept Development; Solution Overview; Wireframes; Evaluate; Prototype; Evaluation Method; Participants; Questions asked; Responses; Summary; Phase Reflection; Refine; Refined Prototype; Proposed Project Timeline; Technical Requirements.

**FPA33502:** AI Declaration; Phase 1 — Competitor Analysis (Fiverr, Upwork, ADPList); Visual Analysis; Mood board; Inspo Board; Brand Identity; Phase 2 — Low Fidelity Sketch (Annotated); Phase 3 — Personas; Value Proposition Canvas; App development; References.

## Appendix C — Review checklist

- [x] All four source documents reviewed
- [x] Image-only pages rendered and reviewed
- [x] Prototype routes and screens inspected
- [x] Data, state and selectors inspected
- [x] Design tokens and brand implementation inspected
- [x] Test kit reviewed
- [x] Conflicts recorded with a recommended resolution
- [x] Findings linked to a phased plan
