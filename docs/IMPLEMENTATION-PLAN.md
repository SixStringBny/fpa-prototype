# Launchpad Prototype — Implementation Plan

- **Repo:** `SixStringBny/fpa-prototype`
- **Product name:** LaunchPad (FPA33502 casing); the shipped v0.1.0 build uses "Launchpad" until the fidelity plan's Phase 2 brand pass
- **Status:** v0.1.0 shipped; the next iteration is the fidelity pass in [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md)
- **Target effort:** 3–5 working days
- **Primary purpose:** Moderated usability testing with design/creative graduates
- **Secondary purpose:** Portfolio/demo piece
- **Source material:** `design-docs/FPA33501_Process.pdf`, `design-docs/BenjaminMcCusker_FPA33502_24ZTF40_Process.pdf`, `design-docs/fpa-prototype-old.pdf`, `design-docs/Low-fidelity-sketch-fpa-prototype.png`
- **Research alignment:** [`RESEARCH-ALIGNMENT.md`](RESEARCH-ALIGNMENT.md) records how the prototype maps to the research; [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md) is the next iteration for closing the gaps.

---

## 1. Summary

Build one cohesive, static React prototype of **Launchpad**, a platform that helps design/creative graduates move into freelance work through self-paced learning and mentorship.

The prototype covers the full journey:

1. A marketing site for logged-out visitors (Home, Learn, Mentorship, About).
2. A mock sign-in with a one-click test-user shortcut.
3. A logged-in app with Dashboard, Learn, Mentor Matching, Mentor Profile, Booking, Sessions, Saved Mentors and My Profile.
4. A lightweight lesson player with progress that persists locally.

The build is a **working prototype**, not production software. There is no backend, no real authentication, no payments, no video, no messaging and no runtime network dependency.

### Why this shape

- The old PDF gives us the brand, mission, page themes and two mentor personalities.
- The low-fidelity sketch gives us the logged-in information architecture: sidebar, dashboard header, mentor matching with filters, mentor profile with save/connect, and a tailored help/resources area.
- The agreed ADPList-style account area gives the prototype a realistic logged-in home and makes the test tasks end somewhere meaningful.

---

## 2. Goals and success criteria

### Product goal

A participant can complete the three core tasks without facilitator intervention, using believable content in a polished, responsive interface.

### Success criteria

- [ ] A visitor can move from the marketing site into the app through a mock sign-in.
- [ ] **Task 1:** A participant can find the pricing module and start its first lesson.
- [ ] **Task 2:** A participant can find a mentor who offers portfolio feedback and open their profile.
- [ ] **Task 3:** A participant can book a 30-minute session and see confirmation plus the session in Sessions/Dashboard.
- [ ] Saved mentors, bookings, lesson progress and profile edits persist across reloads.
- [ ] A single "Reset demo" action clears all demo data.
- [ ] The core screens work at 375 px, 768 px, 1024 px and 1440 px.
- [ ] The prototype is WCAG 2.2 AA-minded: keyboard operable, visible focus, labelled forms, sufficient contrast, reduced-motion support and no colour-only status cues.
- [ ] The static build is deployed to GitHub Pages from a public repo.
- [ ] No runtime network calls are required for content, fonts, images or avatars.

### Non-goals

- Real accounts, authentication, email, payments or video sessions.
- A real LMS (video lessons, quizzes, certificates, downloads).
- A real booking calendar or calendar integration.
- Messaging/chat, notifications or email.
- Admin, mentor application or moderation flows.
- Analytics or usability-test instrumentation.
- Automated test suites.
- Dark mode or internationalisation.
- The alternative visual variant (planned as a later phase after user feedback).

---

## 3. Agreed decisions

> **Fidelity-pass note:** Decisions 6, 7, 18, 20 and 22 are revisited in [`FIDELITY-PLAN.md`](FIDELITY-PLAN.md). The next iteration adds a lightweight roadmap and a brand alignment pass; the alternative visual variant remains deferred.

| # | Decision | Choice |
|---|---|---|
| 1 | Prototype count | One complete prototype now; visual variant later after feedback |
| 2 | Product shape | One cohesive product: marketing site → mock auth → logged-in app |
| 3 | Primary purpose | Moderated usability testing |
| 4 | Test tasks | Learn → Match → Book; mock auth is not a test task |
| 5 | Device | Desktop-first responsive; test on laptop, support phone/tablet |
| 6 | Visual direction | Refine the old PDF's navy/teal brand; consistent illustrated avatars |
| 7 | App scope | Dashboard + Learn + Mentor Matching + Mentor Profile + Booking + Sessions + Saved + My Profile |
| 8 | Dashboard model | ADPList-style dashboard plus a separate editable My Profile page |
| 9 | Mentor connection | ADPList-style booking (pick slot → confirm); save/bookmark as a separate action |
| 10 | Learning depth | Lightweight lesson player with lesson list, progress and next/complete |
| 11 | Content volume | 6 mentors, 6 modules; all modules playable, 2 with fuller lesson sets |
| 12 | Assets | Source and bundle new royalty-free photography and illustrated avatars locally |
| 13 | Stack | React 19 + Vite 8 + TypeScript 7 + React Router 7; no backend |
| 14 | Hosting | Local dev + GitHub Pages |
| 15 | Instrumentation | None; manual observation plus a "Reset demo" control |
| 16 | Tracking | Markdown plan + GitHub Issues and milestones |
| 17 | Time horizon | Moderate, 3–5 working days |
| 18 | Variant | Deferred to a post-feedback phase |
| 19 | Accessibility | WCAG 2.2 AA-minded |
| 20 | Auth | Mock sign-in only, with "Continue as test user"; no onboarding questionnaire |
| 21 | Audience | Design/creative graduates entering freelance work |
| 22 | Locale | South African English; ZAR where pricing appears; "Launchpad" |
| 23 | Logged-in nav | Home, Learn, Mentors, Sessions, Saved, Profile |
| 24 | Test materials | Lightweight moderator kit in `docs/TEST-KIT.md` |
| 25 | Repo visibility | Make the repo public and use GitHub Pages |

---

## 4. Scope and screen inventory

### Marketing (logged out)

| Route | Screen | Purpose |
|---|---|---|
| `/` | Home | Hero, value proposition, featured modules, featured mentors, social proof, CTA |
| `/learn` | Learn catalogue | Browse/search modules, topic and level filters |
| `/learn/:moduleSlug` | Module detail (public) | Module overview, lesson list, preview; start requires sign-in |
| `/mentorship` | Mentorship | Explain mentorship, featured mentors, CTA to matching |
| `/mentors/:mentorSlug` | Mentor profile (public) | Public profile; booking requires sign-in |
| `/about` | About / Mission | Mission, values, who it is for |
| `/login` | Mock sign-in | Sign in / create account UI + "Continue as test user" |

### App (logged in)

| Route | Screen | Purpose |
|---|---|---|
| `/app/dashboard` | Dashboard | Greeting, stats, continue learning, upcoming session, saved mentors, recommendations, tailored resources |
| `/app/learn` | Learn catalogue | Same catalogue inside the app shell |
| `/app/learn/:moduleSlug` | Module detail | Progress-aware module overview |
| `/app/learn/:moduleSlug/:lessonSlug` | Lesson player | Lesson content, prev/next, mark complete |
| `/app/mentors` | Mentor matching | Search, filters, sort, result cards, save |
| `/app/mentors/:mentorSlug` | Mentor profile | Full profile, reviews, availability, save, book |
| `/app/mentors/:mentorSlug/book` | Booking | Pick a slot, choose session type, confirm |
| `/app/sessions` | Sessions | Upcoming and past bookings; cancel |
| `/app/saved` | Saved mentors | Bookmarked mentors; remove/open/book |
| `/app/profile` | My Profile | View/edit learner profile, goals, skills, links, availability |
| `/styleguide` | Internal styleguide | Component and token review; not linked in navigation |
| `*` | Not found | Friendly 404 with links home |

### Shared states

- Loading/skeleton states for image-backed cards.
- Empty states for sessions, saved mentors and filters with no results.
- Success toasts for save, unsave, booking confirmed, profile saved, reset.
- Confirmation dialog for cancelling a session and resetting the demo.
- Auth guard with `next` return path.

---

## 5. User flows and usability tasks

### Task 1 — Learn

> "You want to learn how to price your freelance work. Starting from the dashboard, find the relevant module and begin the first lesson."

Success: participant reaches the lesson player for **Pricing Your Creative Work**, lesson 1, and can mark it complete.

### Task 2 — Match

> "You need portfolio feedback from an experienced designer. Use the mentor area to find a mentor who offers portfolio feedback, and open their profile."

Success: participant finds a mentor with **Portfolio Review** expertise (Lucas Meyer or Priya Naidoo) and opens the profile.

### Task 3 — Book

> "Book a 30-minute session with that mentor for a time that suits you."

Success: participant selects a slot, confirms, sees a success state, and can find the booking in **Sessions** and on the **Dashboard**.

### Optional follow-up

> "Where would you go to find the mentor you just saved?"

Success: participant locates **Saved** in the sidebar or the saved section on the dashboard.

### Evidence to capture

- Task success (yes / assisted / no).
- Path taken (screens and filters).
- Time to complete.
- Points of hesitation, misclicks and quotes.
- Severity: low / medium / high.

---

## 6. Information architecture

### Marketing navigation

`Launchpad` logo · Learn · Mentorship · About · Log in / Sign up · **Get Started**

- "Get Started" and "Log in / Sign up" both lead to `/login`.
- Authenticated visitors see an avatar menu instead of "Log in / Sign up".

### App navigation

Sidebar:

- Home (`/app/dashboard`)
- Learn (`/app/learn`)
- Mentors (`/app/mentors`)
- Sessions (`/app/sessions`)
- Saved (`/app/saved`)
- Profile (`/app/profile`)
- Footer: Reset demo · Log out

Top bar:

- Page title / breadcrumb.
- Global search (mentors + modules) or page-level search.
- Static notification button (non-functional, clearly styled as a prototype control).
- Avatar menu (Profile, Log out).

Mobile:

- Top bar with menu button.
- Slide-in navigation dialog with the same items.
- Filters become a full-height dialog/drawer.

---

## 7. Visual system

### Direction

Refine the old PDF into a coherent system. Keep the navy/teal identity, bold display type, rounded cards and generous photography, but replace the mixed photo/3D-illustration treatment with one consistent avatar style.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--navy-900` | `#0E1830` | Deep backgrounds, footer |
| `--navy-800` | `#16243D` | Header, primary text on light |
| `--navy-700` | `#1F3354` | Hover/secondary surfaces |
| `--teal-500` | `#3EC6B0` | Primary accent, CTAs |
| `--teal-600` | `#2FB39E` | Hover |
| `--teal-100` | `#DDF6F1` | Soft badges |
| `--purple-500` | `#6C4EE3` | Secondary accent, module variety |
| `--amber-500` | `#F2B84B` | Highlight/accent |
| `--ink-900` | `#101828` | Headings |
| `--ink-700` | `#475467` | Body |
| `--ink-500` | `#667085` | Muted |
| `--line` | `#E4E7EC` | Borders |
| `--surface` | `#FFFFFF` | Cards |
| `--canvas` | `#F5F6F8` | Page background |
| `--success` | `#12B76A` | Success |
| `--warning` | `#F79009` | Warning |
| `--danger` | `#F04438` | Error/destructive |

Buttons on teal use navy text for contrast. White text is reserved for navy/purple surfaces.

### Typography

- Display/headings: **Archivo Variable** (bundled via `@fontsource-variable/archivo`), weights 600–800.
- Body/UI: **Inter Variable** (bundled via `@fontsource-variable/inter`), weights 400–600.
- Type scale: 12 / 14 / 16 / 18 / 24 / 32 / 40 / 56 px, with fluid `clamp()` for hero headings.
- Headings use tight leading and slightly negative tracking; body uses 1.6 line height.

### Shape and motion

- Radii: 12 px controls, 20 px cards, 32 px hero panels, full for pills.
- Shadows: soft, low-opacity navy shadows.
- Motion: 150–220 ms ease-out; all transitions disabled under `prefers-reduced-motion`.

### Imagery

- 4 bundled hero photographs (Home, Learn, Mentorship, About).
- 6 mentor avatars + 1 test-user avatar, illustrated in one style, committed as SVG.
- Module cards use accent colour + icon, not stock thumbnails, to keep the catalogue coherent.
- All images have alt text; decorative images are marked `alt=""`.

### Icons

Lucide React, 20/24 px, 1.75–2 px stroke, currentColor.

---

## 8. Technical architecture

### Stack

| Concern | Choice |
|---|---|
| Runtime | Node.js 22.13 (verified) |
| Framework | React 19.3 |
| Build | Vite 8 |
| Language | TypeScript 7, strict |
| Routing | React Router 7 with `HashRouter` (GitHub Pages-safe) |
| Styling | Plain CSS with custom properties; CSS Modules where component-scoped styles help |
| Icons | `lucide-react` |
| Fonts | `@fontsource-variable/archivo`, `@fontsource-variable/inter` |
| State | React Context + reducer, persisted to `localStorage` |
| Tests | None in scope; `tsc --noEmit` and production build are the gates |

### Folder structure

```text
.
├─ .github/
│  └─ workflows/deploy.yml
├─ docs/
│  ├─ IMPLEMENTATION-PLAN.md
│  ├─ PROGRESS.md
│  └─ TEST-KIT.md
├─ public/
│  ├─ avatars/
│  │  ├─ mentor-amina.svg
│  │  ├─ mentor-daniel.svg
│  │  ├─ mentor-thandiwe.svg
│  │  ├─ mentor-lucas.svg
│  │  ├─ mentor-priya.svg
│  │  ├─ mentor-sipho.svg
│  │  └─ user-naledi.svg
│  ├─ images/
│  │  ├─ hero-home.webp
│  │  ├─ hero-learn.webp
│  │  ├─ hero-mentorship.webp
│  │  ├─ hero-about.webp
│  │  └─ og-image.png
│  └─ favicon.svg
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ router.tsx
│  ├─ styles/
│  │  ├─ tokens.css
│  │  └─ global.css
│  ├─ types/
│  │  └─ index.ts
│  ├─ data/
│  │  ├─ modules.ts
│  │  ├─ mentors.ts
│  │  ├─ user.ts
│  │  ├─ testimonials.ts
│  │  └─ site.ts
│  ├─ state/
│  │  ├─ demo-state.tsx
│  │  ├─ storage.ts
│  │  ├─ selectors.ts
│  │  └─ seed.ts
│  ├─ lib/
│  │  ├─ dates.ts
│  │  ├─ slots.ts
│  │  ├─ format.ts
│  │  └─ cn.ts
│  ├─ components/
│  │  ├─ ui/
│  │  │  ├─ Button.tsx
│  │  │  ├─ IconButton.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ Badge.tsx
│  │  │  ├─ Tag.tsx
│  │  │  ├─ Avatar.tsx
│  │  │  ├─ ProgressBar.tsx
│  │  │  ├─ Field.tsx
│  │  │  ├─ Select.tsx
│  │  │  ├─ Checkbox.tsx
│  │  │  ├─ Dialog.tsx
│  │  │  ├─ Toast.tsx
│  │  │  ├─ EmptyState.tsx
│  │  │  └─ SectionHeading.tsx
│  │  ├─ layout/
│  │  │  ├─ Container.tsx
│  │  │  ├─ PageHeader.tsx
│  │  │  ├─ MarketingHeader.tsx
│  │  │  ├─ MarketingFooter.tsx
│  │  │  ├─ MarketingLayout.tsx
│  │  │  ├─ AppLayout.tsx
│  │  │  ├─ AppSidebar.tsx
│  │  │  ├─ AppTopbar.tsx
│  │  │  └─ MobileNav.tsx
│  │  └─ shared/
│  │     ├─ ModuleCard.tsx
│  │     ├─ MentorCard.tsx
│  │     ├─ StatCard.tsx
│  │     ├─ ReviewCard.tsx
│  │     ├─ BookingCard.tsx
│  │     ├─ SaveButton.tsx
│  │     ├─ SearchInput.tsx
│  │     └─ FilterPanel.tsx
│  ├─ features/
│  │  ├─ marketing/
│  │  │  ├─ HomePage.tsx
│  │  │  ├─ MentorshipPage.tsx
│  │  │  └─ AboutPage.tsx
│  │  ├─ learn/
│  │  │  ├─ LearnPage.tsx
│  │  │  ├─ ModulePage.tsx
│  │  │  ├─ LessonPage.tsx
│  │  │  └─ ContentBlocks.tsx
│  │  ├─ mentors/
│  │  │  ├─ MentorListPage.tsx
│  │  │  ├─ MentorProfilePage.tsx
│  │  │  └─ MentorFilters.tsx
│  │  ├─ booking/
│  │  │  ├─ BookingPage.tsx
│  │  │  └─ SessionList.tsx
│  │  ├─ dashboard/
│  │  │  ├─ DashboardPage.tsx
│  │  │  ├─ SavedPage.tsx
│  │  │  ├─ SessionsPage.tsx
│  │  │  ├─ ProfilePage.tsx
│  │  │  └─ dashboard-cards.tsx
│  │  ├─ auth/
│  │  │  ├─ LoginPage.tsx
│  │  │  └─ RequireAuth.tsx
│  │  └─ styleguide/
│  │     └─ StyleguidePage.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ README.md
└─ CREDITS.md
```

### Routes and layouts

- `MarketingLayout` wraps public routes with the marketing header/footer.
- `AppLayout` wraps `/app/*` with sidebar/topbar and requires auth.
- Shared feature components (`LearnPage`, `ModulePage`, `MentorProfilePage`, `MentorCard`) are reused across marketing and app wrappers, so there is one implementation per screen, not two.
- Public module/mentor pages link into app routes; `RequireAuth` redirects to `/login?next=<path>`.
- `HashRouter` is used so GitHub Pages needs no SPA fallback.

### Data model

```ts
type LessonBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'example'; title: string; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'checklist'; items: string[] };

type Lesson = {
  id: string;
  slug: string;
  title: string;
  durationMins: number;
  summary: string;
  blocks: LessonBlock[];
  takeaways: string[];
};

type Module = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  topic: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMins: number;
  accent: 'teal' | 'purple' | 'amber' | 'blue' | 'rose' | 'green';
  featured: boolean;
  lessons: Lesson[];
};

type AvailabilityRule = {
  weekdays: number[]; // 0 = Sunday
  times: string[];    // "09:00"
};

type Review = {
  id: string;
  author: string;
  role: string;
  rating: number;
  quote: string;
  date: string;
};

type Mentor = {
  id: string;
  slug: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  shortBio: string;
  bio: string;
  expertise: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  sessionCount: number;
  sessionTypes: ('free' | 'paid')[];
  priceZar?: number;
  availability: AvailabilityRule[];
  reviews: Review[];
  featured: boolean;
};

type LearnerProfile = {
  name: string;
  headline: string;
  discipline: string;
  location: string;
  bio: string;
  avatar: string;
  goals: string[];
  skills: string[];
  links: { portfolio: string; linkedin: string; instagram: string };
  availability: 'Weekdays' | 'Evenings' | 'Weekends' | 'Flexible';
};

type Booking = {
  id: string;
  mentorId: string;
  startsAt: string; // ISO
  durationMins: number;
  type: 'free' | 'paid';
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
};

type ModuleProgress = {
  moduleId: string;
  completedLessonIds: string[];
  lastLessonId?: string;
  updatedAt: string;
};

type DemoState = {
  version: 1;
  auth: { isAuthenticated: boolean; userId: 'test-user' };
  profile: LearnerProfile;
  savedMentorIds: string[];
  bookings: Booking[];
  progress: Record<string, ModuleProgress>;
  seededAt: string;
};
```

### State and persistence

- One versioned key: `launchpad.demo.v1`.
- `loadState()` validates shape, falls back to `seedState()` on missing/corrupt/version mismatch.
- `DemoStateProvider` exposes state + actions:
  - `login()`, `logout()`
  - `saveMentor(id)`, `unsaveMentor(id)`
  - `bookSession(input)`, `cancelBooking(id)`
  - `completeLesson(moduleId, lessonId)`
  - `updateProfile(patch)`
  - `resetDemo()`
- Persist on every state change with a small debounce.
- Selectors in `state/selectors.ts`:
  - `getModuleProgress`, `getModuleProgressPercent`, `getNextLesson`
  - `getUpcomingBooking`, `getCompletedBookings`
  - `getProfileCompleteness`
  - `getRecommendedMentors`, `getRecommendedModules`, `getTailoredResources`
- Seeded data relative to first load:
  - Test user Naledi Khumalo, 65% profile completeness.
  - 1 in-progress module: Finding Your First Client, 2 of 4 lessons complete.
  - 1 saved mentor: Lucas Meyer.
  - 1 upcoming session: Amina Yusuf, 2 days from first load, 30 min, free.
- Stale dates: an upcoming booking whose `startsAt` is in the past renders as "Completed" in Sessions and is excluded from Dashboard upcoming.
- `Reset demo` removes `launchpad.demo.v1`, then reloads to `/app/dashboard` (or `/login` if logged out).

### Auth and route guards

- `/login` shows a realistic sign-in form and a prominent **Continue as test user** button.
- Any submitted credentials are accepted; no validation beyond required fields.
- `login()` sets `auth.isAuthenticated = true`.
- `RequireAuth` redirects unauthenticated users to `/login?next=<encoded path>`; after login, return to `next`.
- Marketing "Book" / "Start module" actions route through the guard.
- Logout sets `isAuthenticated = false` and returns to the marketing home; demo data is preserved.
- A visible "Prototype only" note on the login screen explains that no real account is created.

### Accessibility

- Skip link to `#main`.
- Semantic landmarks: `header`, `nav` with labels, `main`, `footer`.
- One `h1` per page; heading levels in order.
- Visible `:focus-visible` ring (2 px teal + 2 px offset).
- Native `<dialog>` for modals/drawers with `showModal()`, labelled by a heading.
- Forms: explicit `<label>`, `aria-describedby` for help/error, no placeholder-only labels.
- Status messages via `role="status"` / `aria-live="polite"`.
- Contrast: verify all text/background pairs; do not rely on colour alone for state.
- `prefers-reduced-motion`: disable transforms/transitions.
- Touch targets at least 44 × 44 px on mobile.
- Images: meaningful alt text, or empty alt for decoration.

### Responsive breakpoints

| Breakpoint | Behaviour |
|---|---|
| `< 640 px` | Single column; hamburger nav; filters in a dialog; stacked dashboard cards |
| `640–1023 px` | Two-column card grids; sidebar hidden behind menu |
| `1024–1279 px` | Persistent sidebar; two-column dashboard; filters in left rail |
| `≥ 1280 px` | Full layout; three-column grids; sticky booking card on profiles |

### Assets and licensing

- Hero photography: source 4 royalty-free images (Unsplash or Pexels), download and commit as optimised WebP.
- Avatars: generate 7 illustrated SVGs with DiceBear `avataaars` via a one-off script, then commit the SVGs so there is no runtime dependency.
- Fonts: bundled through Fontsource.
- Icons: Lucide React (MIT).
- `CREDITS.md` records every photographer, avatar style and font licence.
- All mentor/testimonials/company names are fictional. No real logos, real people or client names.

---

## 9. Content plan

### Modules (6)

| # | Module | Level | Lessons | Accent |
|---|---|---|---|---|
| 1 | Finding Your First Client | Beginner | 4 | Purple |
| 2 | Pricing Your Creative Work | Beginner | 4 | Teal |
| 3 | Client Communication & Briefs | Beginner | 3 | Amber |
| 4 | Running Projects & Getting Paid | Intermediate | 3 | Blue |
| 5 | Building a Portfolio That Sells | Beginner | 3 | Rose |
| 6 | Contracts, Invoices & Admin Basics | Intermediate | 3 | Green |

All six are playable. Modules 1 and 2 carry the fullest lesson content because they anchor the test tasks and the "Continue learning" card.

Lesson shape: 3–5 minute read, one callout, one checklist or quote, 3 takeaways. Content is practical and written for design/creative graduates, in South African English, with ZAR examples in the pricing module.

### Mentors (6)

| Mentor | Role / context | Expertise | Experience | Sessions | Type |
|---|---|---|---|---|---|
| Amina Yusuf | Senior Software Engineer, independent | Frontend, JavaScript, React, Career Guidance | 6 yrs | 4.9 (24) | Free |
| Daniel Okafor | Product Manager, studio | Product Management, Strategy, Stakeholder Communication | 5 yrs | 4.8 (18) | Free |
| Thandiwe Mokoena | Freelance Brand Designer | Branding, Pricing, Client Communication | 8 yrs | 5.0 (41) | Free intro + paid |
| Lucas Meyer | Art Director | Portfolio Review, Art Direction, Creative Direction | 10 yrs | 4.7 (33) | Free |
| Priya Naidoo | UX Lead | UX/UI, Portfolio Review, Career Guidance | 7 yrs | 4.9 (52) | Free |
| Sipho Dlamini | Motion & 3D Designer | Motion, 3D, Showreels | 4 yrs | 4.6 (12) | Paid |

Each mentor has a short bio, a longer bio, 2–3 reviews and availability rules (weekdays/times) used to generate bookable slots.

### Test user

- **Naledi Khumalo** — final-year design graduate, Johannesburg.
- Headline: "Design graduate moving into freelance work".
- Goals: find first client, price confidently, build portfolio, understand contracts.
- Skills: Branding, Illustration, Figma, Social Media Design.
- Availability: Weekdays.
- Seeded progress, saved mentor and booking as described in §8.

### Marketing copy

- Retain the old PDF's strongest lines: "Start your freelance career with confidence", "Learn. Network. Build. Earn.", "Everything you need to become freelance-ready", "Learn from professionals who have been there!".
- Rewrite the mission for consistency and South African English.
- Use fictional graduate testimonials and honest prototype-scale stats (e.g. "Built for design graduates", "6 modules", "6 mentors").
- Avoid real company names/logos and unverifiable claims.

---

## 10. Delivery phases

Each phase is a shippable slice with its own demo checkpoint. Phases map 1:1 to GitHub issues and are grouped into seven milestones.

### Phase 0 — Foundation and asset pipeline

**Milestone:** M0 Foundation
**Estimate:** 0.5 day

**Objective:** A working Vite/React/TypeScript skeleton with routed layouts, bundled fonts and all local assets.

**Tasks**

- [ ] Scaffold Vite React + TypeScript in the repo (manual scaffold is fine; preserve `design-docs/`).
- [ ] Install runtime deps: `react`, `react-dom`, `react-router-dom`, `lucide-react`, `@fontsource-variable/archivo`, `@fontsource-variable/inter`.
- [ ] Install dev deps: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`.
- [ ] Add scripts: `dev`, `build`, `preview`, `typecheck`.
- [ ] Configure strict `tsconfig.json` and `vite.config.ts` with `base` from `VITE_BASE` (default `/`).
- [ ] Add `index.html` metadata, favicon, OG image reference.
- [ ] Source and optimise 4 hero images into `public/images/` (WebP).
- [ ] Generate and commit 7 avatar SVGs into `public/avatars/`.
- [ ] Add global CSS reset and empty token/global files.
- [ ] Add `README.md` skeleton, `.gitignore`, `CREDITS.md`.
- [ ] Make the initial commit on `main`.

**Files**

`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/*`, `public/*`, `README.md`, `CREDITS.md`

**Acceptance**

- [ ] `npm run dev` starts and renders a placeholder.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` emits `dist/`.
- [ ] All fonts, images and avatars are local; no runtime asset URLs.
- [ ] `CREDITS.md` records image/avatar/font sources.

**GitHub:** Issue 1 · Milestone M0

---

### Phase 1 — Design system and app shell

**Milestone:** M0 Foundation
**Estimate:** 0.5–1 day

**Objective:** A reusable visual system plus marketing and app layouts, including a static dashboard skeleton.

**Tasks**

- [ ] Define `tokens.css` (colour, type, spacing, radii, shadows, motion) and `global.css`.
- [ ] Build UI primitives: Button, IconButton, Card, Badge, Tag, Avatar, ProgressBar, Field, Select, Checkbox, Dialog, Toast, EmptyState, SectionHeading.
- [ ] Build shared components: ModuleCard, MentorCard, StatCard, ReviewCard, BookingCard, SaveButton, SearchInput, FilterPanel.
- [ ] Build `Container`, `PageHeader`, `MarketingHeader`, `MarketingFooter`, `MarketingLayout`.
- [ ] Build `AppLayout`, `AppSidebar`, `AppTopbar`, `MobileNav`.
- [ ] Header reflects auth state (Log in vs avatar menu).
- [ ] Add `/styleguide` with every primitive and state, including focus and disabled states.
- [ ] Add a static dashboard skeleton using the real layout.

**Files**

`src/styles/*`, `src/components/ui/*`, `src/components/shared/*`, `src/components/layout/*`, `src/features/styleguide/*`

**Acceptance**

- [ ] Styleguide renders all components at desktop and mobile widths.
- [ ] Keyboard focus is visible on every interactive element.
- [ ] Marketing and app shells are responsive at 375/768/1024/1440.
- [ ] Mobile navigation opens, traps focus, closes on Escape.
- [ ] No hard-coded colours outside tokens (except data-driven accents).

**GitHub:** Issue 2 · Milestone M0

---

### Phase 2 — Data model, content and demo state

**Milestone:** M1 Content & state
**Estimate:** 0.5 day

**Objective:** Real seed content and a persisted demo state that every later phase consumes.

**Tasks**

- [ ] Add types in `src/types/index.ts`.
- [ ] Write 6 modules and all lessons in `src/data/modules.ts`.
- [ ] Write 6 mentors with bios, expertise, reviews and availability in `src/data/mentors.ts`.
- [ ] Write test user, testimonials and site copy in `src/data/user.ts`, `src/data/testimonials.ts`, `src/data/site.ts`.
- [ ] Implement `storage.ts` with versioned load/save/validate.
- [ ] Implement `seed.ts` with relative dates for the seeded booking.
- [ ] Implement `demo-state.tsx` with reducer, actions and persistence.
- [ ] Implement selectors: progress, completeness, upcoming session, recommendations, tailored resources.
- [ ] Implement reset logic and expose it through the app shell.
- [ ] Add a small data-preview section to `/styleguide` (module cards, mentor cards, progress states).

**Files**

`src/types/*`, `src/data/*`, `src/state/*`, `src/lib/*`

**Acceptance**

- [ ] Seed data renders on cards without layout breakage.
- [ ] State persists across reloads.
- [ ] Corrupt/invalid storage falls back to seed without crashing.
- [ ] Reset clears saved mentors, bookings, progress and profile edits.
- [ ] Selectors return sensible values for empty and completed states.

**GitHub:** Issue 3 · Milestone M1

---

### Phase 3 — Marketing site

**Milestone:** M2 Marketing
**Estimate:** 0.5–1 day

**Objective:** A polished logged-out journey that hands off cleanly to auth and the app.

**Tasks**

- [ ] Home: hero, value proposition, featured modules, featured mentors, social proof, CTA band, footer.
- [ ] Learn catalogue: search, topic chips, level filter, result count, module grid, empty state.
- [ ] Public module detail: hero, outcomes, lesson list, progress-aware CTA, related modules.
- [ ] Mentorship: hero, benefits, featured mentor grid, CTA to `/app/mentors`.
- [ ] Public mentor profile: shared profile component, booking CTA gated by auth.
- [ ] About/Mission: mission, values, audience, CTA.
- [ ] Login: mock form, "Continue as test user", prototype note, reset link.
- [ ] Wire all CTAs, auth redirects and the `next` return path.
- [ ] Add 404 route.

**Files**

`src/features/marketing/*`, `src/features/learn/*`, `src/features/mentors/*`, `src/features/auth/*`, `src/router.tsx`

**Acceptance**

- [ ] Every marketing nav/footer link resolves.
- [ ] "Get Started" / "Log in" reaches the mock auth screen.
- [ ] Public module and mentor pages render real data.
- [ ] Gated actions redirect to login and return to the intended destination.
- [ ] Marketing pages are responsive and keyboard navigable.

**GitHub:** Issue 4 · Milestone M2

---

### Phase 4 — Learning flow

**Milestone:** M3 Learning
**Estimate:** 0.5–1 day

**Objective:** Complete Task 1: find a module, start it, complete a lesson, see progress.

**Tasks**

- [ ] App learn catalogue and module detail wrappers.
- [ ] Module detail: lesson list, durations, completed indicators, Start/Continue label.
- [ ] Lesson player: content block renderer, progress header, prev/next, mark complete.
- [ ] Completion updates state and unlocks the next lesson.
- [ ] Module completion state and progress bars.
- [ ] "Continue learning" selector returns the most recently touched module.
- [ ] Empty/locked states for lessons when appropriate.
- [ ] Add lesson content for all 6 modules (modules 1 and 2 fullest).

**Files**

`src/features/learn/*`, `src/state/selectors.ts`, `src/data/modules.ts`

**Acceptance**

- [ ] Task 1 completes without assistance.
- [ ] Completing a lesson persists across reload.
- [ ] Module detail shows accurate progress.
- [ ] Last lesson/next lesson navigation is correct.
- [ ] Lesson player is readable and responsive.

**GitHub:** Issue 5 · Milestone M3

---

### Phase 5 — Mentor discovery and profiles

**Milestone:** M4 Mentorship
**Estimate:** 0.5 day

**Objective:** Complete Task 2: filter/search mentors, open a profile and save a mentor.

**Tasks**

- [ ] App mentor matching page: search, filters (expertise, availability, session type, experience), sort, result count.
- [ ] Mentor cards: avatar, name, role, rating, sessions, expertise tags, availability, save, view profile.
- [ ] Filter panel as sidebar on desktop and dialog on mobile.
- [ ] Empty state with "Clear filters".
- [ ] Shared mentor profile: bio, expertise, experience, reviews, availability preview, save, book CTA.
- [ ] Save/unsave with toast and persistence.
- [ ] Public profile wrapper and app profile wrapper share one component.
- [ ] Recommendation logic for the dashboard: match profile goals to mentor expertise.

**Files**

`src/features/mentors/*`, `src/components/shared/MentorCard.tsx`, `src/components/shared/SaveButton.tsx`, `src/state/selectors.ts`

**Acceptance**

- [ ] Task 2 completes without assistance.
- [ ] Filters narrow results correctly and can be cleared.
- [ ] Save state is reflected on cards, profile, Saved page and dashboard.
- [ ] Profile is readable and responsive; reviews and availability render.
- [ ] Mobile filters are usable and focus-managed.

**GitHub:** Issue 6 · Milestone M4

---

### Phase 6 — Booking and sessions

**Milestone:** M4 Mentorship
**Estimate:** 0.5 day

**Objective:** Complete Task 3: pick a slot, confirm, and find the session.

**Tasks**

- [ ] Slot generation from mentor availability rules (`getAvailableSlots`).
- [ ] Booking page: mentor summary, session type, date/time picker, confirm.
- [ ] Confirmation state with date/time, mentor and session type.
- [ ] Create booking in state; prevent duplicate slot bookings.
- [ ] Sessions page: upcoming and past, cancel with confirmation dialog.
- [ ] Dashboard/dashboard selector for next upcoming session.
- [ ] Auth guard and return path for booking.
- [ ] Empty states for no sessions.

**Files**

`src/features/booking/*`, `src/features/dashboard/SessionsPage.tsx`, `src/lib/slots.ts`, `src/state/demo-state.tsx`

**Acceptance**

- [ ] Task 3 completes without assistance.
- [ ] Booking appears in Sessions and on Dashboard.
- [ ] Cancelling removes it from upcoming and shows a confirmation.
- [ ] Booking persists across reload; reset clears it.
- [ ] Slot list never offers a time in the past.

**GitHub:** Issue 7 · Milestone M4

---

### Phase 7 — Dashboard and My Profile

**Milestone:** M5 Account
**Estimate:** 0.5–1 day

**Objective:** A believable ADPList-style logged-in home and an editable profile.

**Tasks**

- [ ] Dashboard greeting, date, profile-completeness card and quick actions.
- [ ] Impact stats: lessons completed, modules in progress, sessions booked, mentors saved.
- [ ] Continue learning card from progress selector.
- [ ] Upcoming session card with Join (mock) and Details.
- [ ] Saved mentors row (up to 3) with link to Saved.
- [ ] Recommended mentors row from goals/expertise.
- [ ] Tailored resources / "Your plan" right rail (sketch's tailored help area).
- [ ] Empty states for each card.
- [ ] My Profile: view/edit name, headline, discipline, location, bio, goals, skills, links, availability.
- [ ] Avatar picker from preset avatars; save/cancel with toast.
- [ ] Profile completeness recalculation.
- [ ] Saved page list with remove/open/book.
- [ ] Mobile dashboard stacking and responsive sidebar.

**Files**

`src/features/dashboard/*`, `src/components/shared/StatCard.tsx`, `src/state/selectors.ts`

**Acceptance**

- [ ] Dashboard reflects real state after learning, saving and booking.
- [ ] Every dashboard card has a useful empty state.
- [ ] Profile edits persist and update completeness.
- [ ] Saved and Sessions pages are reachable and consistent.
- [ ] Dashboard is usable at 375 px and 1440 px.

**GitHub:** Issue 8 · Milestone M5

---

### Phase 8 — Polish, QA and release

**Milestone:** M6 Release
**Estimate:** 0.5–1 day

**Objective:** A reliable, accessible, hosted prototype ready for participants.

**Tasks**

- [ ] Responsive QA at 375/768/1024/1440 for every route.
- [ ] Accessibility pass: keyboard-only walkthrough, focus order, labels, contrast, reduced motion, alt text, dialog behaviour.
- [ ] Content/copy pass: South African English, consistent "Launchpad", ZAR, no placeholder text.
- [ ] Image optimisation and lazy loading below the fold.
- [ ] 404, loading and error boundaries.
- [ ] Remove dead links and non-functional controls that look functional.
- [ ] Add `docs/IMPLEMENTATION-PLAN.md`, `docs/PROGRESS.md`, `docs/TEST-KIT.md`.
- [ ] Write final `README.md`: what it is, commands, demo route, reset, test tasks, deployment.
- [ ] Make the GitHub repo public.
- [ ] Add `.github/workflows/deploy.yml` for GitHub Pages.
- [ ] Enable Pages (workflow build) and verify the deployed URL.
- [ ] Smoke-test Tasks 1–3 on the hosted build.
- [ ] Tag `v0.1.0`.

**Files**

`.github/workflows/deploy.yml`, `docs/*`, `README.md`, `vite.config.ts`

**Acceptance**

- [ ] Hosted URL loads over HTTPS with no runtime network errors.
- [ ] All three tasks pass on the hosted build.
- [ ] Keyboard-only walkthrough completes every task.
- [ ] No console errors or broken images.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] `docs/TEST-KIT.md` is ready to print/use.

**GitHub:** Issue 9 · Milestone M6

---

### Phase 9 — Optional visual variant (post-feedback)

**Milestone:** Backlog
**Estimate:** after first round of feedback

**Objective:** Use real feedback to explore a second visual direction without disturbing the agreed prototype.

**Tasks**

- [ ] Summarise feedback and decide what the variant should test.
- [ ] Create a theme layer (alternate tokens + typography/radius treatment).
- [ ] Apply the theme to Home, Dashboard, Mentor Matching and Mentor Profile first.
- [ ] Add a hidden variant switch or a `?variant=` flag for comparison.
- [ ] Keep all flows and content identical so differences are visual only.
- [ ] Review with the same tasks and capture preference.

**Acceptance**

- [ ] Variant does not regress any core flow.
- [ ] Original remains available.
- [ ] Decision recorded in `docs/PROGRESS.md`.

**GitHub:** Issue 10 · Backlog

---

## 11. GitHub tracking setup

After leaving Plan mode:

1. Make the repo public.
2. Push the initial commit and the plan docs.
3. Create seven milestones:
   - `M0 — Foundation`
   - `M1 — Content & state`
   - `M2 — Marketing`
   - `M3 — Learning`
   - `M4 — Mentorship`
   - `M5 — Account`
   - `M6 — Release`
4. Create labels: `phase`, `foundation`, `design-system`, `content`, `marketing`, `learning`, `mentorship`, `account`, `a11y`, `release`, `optional`.
5. Create one issue per phase (10 issues), each containing:
   - Link to the plan section.
   - Task checklist copied from this document.
   - Acceptance criteria.
   - Dependencies and milestone.
6. Use `docs/PROGRESS.md` as the live status table:

| Phase | Issue | Branch | Status | Demo checkpoint | Notes |
|---|---|---|---|---|---|
| 0 | #1 | `phase/0-foundation` | Not started | `npm run dev` | |
| 1 | #2 | `phase/1-design-system` | Not started | `/styleguide` | |
| 2 | #3 | `phase/2-data-state` | Not started | Reset works | |
| 3 | #4 | `phase/3-marketing` | Not started | Marketing → login | |
| 4 | #5 | `phase/4-learning` | Not started | Task 1 | |
| 5 | #6 | `phase/5-mentors` | Not started | Task 2 | |
| 6 | #7 | `phase/6-booking` | Not started | Task 3 | |
| 7 | #8 | `phase/7-dashboard` | Not started | Dashboard reflects state | |
| 8 | #9 | `phase/8-release` | Not started | Hosted URL | |
| 9 | #10 | `phase/9-variant` | Backlog | Post-feedback | |

**Branch/PR convention:** one branch per phase (`phase/<n>-<slug>`), one PR into `main`, issue linked in the PR body. If you prefer direct commits to `main`, keep the issue checklist updated instead.

**Project board:** the current `gh` token lacks the `project` scope, so milestones + labels are the default. If you want a GitHub Project board, re-authenticate `gh` with `project` scope and we can add the issues to a board as a follow-up.

---

## 12. Risks and assumptions

| Risk / assumption | Mitigation |
|---|---|
| Making the repo public exposes all history | Decide now; the repo is empty, so there is nothing sensitive to expose. |
| GitHub Pages base path breaks assets | Use `base` from `VITE_BASE=/fpa-prototype/` in the workflow and `HashRouter`. |
| Stock-photo licensing/attribution | Use Unsplash/Pexels licence-compatible assets; record in `CREDITS.md`. |
| Avatar style licensing | Use DiceBear `avataaars` (MIT); record attribution. |
| Fictional content mistaken for real people/companies | Keep all mentor, review and company details fictional; add a README note. |
| Participants wander into unfinished content | All 6 modules playable; every screen has a real empty/complete state. |
| Stale seeded dates in a demo opened later | Generate the seeded booking relative to first load; treat past bookings as completed. |
| Scope creep from the dashboard | Dashboard cards only; no settings, messaging, notifications backend or calendar integration. |
| localStorage schema changes | Single versioned key; version mismatch reseeds. |
| Variant work competing with the core prototype | Variant is explicitly a post-feedback phase and not part of the 3–5 day target. |
| No automated tests | Compensate with strict typing, a per-phase manual demo checkpoint and the release smoke test. |

### Assumptions

- Node.js 22.13+ and npm are available (verified).
- `gh` is authenticated as `SixStringBny` with `repo` and `workflow` scopes (verified).
- The repo is currently private and empty; making it public is approved.
- The prototype is presented in modern Chromium/Firefox/Safari; no legacy browser support.
- Test sessions are moderated, on a laptop, with manual note-taking.
- Participants are design/creative graduates; content can be specific to that audience.

---

## 13. Definition of done

The prototype is done when:

- [ ] The hosted GitHub Pages URL loads and all core screens work.
- [ ] A participant can complete Tasks 1, 2 and 3 without help.
- [ ] Saved mentors, bookings, progress and profile edits persist and reset correctly.
- [ ] Marketing → login → app handoff is coherent.
- [ ] The app shell and all cards have responsive and empty states.
- [ ] Keyboard-only and reduced-motion checks pass.
- [ ] No runtime network requests are needed for assets.
- [ ] `README.md`, `docs/IMPLEMENTATION-PLAN.md`, `docs/PROGRESS.md` and `docs/TEST-KIT.md` are current.
- [ ] `CREDITS.md` is complete.
- [ ] Phase 8 issue is closed and `v0.1.0` is tagged.

---

## Appendix A — Test kit summary

Full version lives in `docs/TEST-KIT.md` after Phase 8.

**Intro (read aloud):** "Thanks for helping. This is an early prototype of Launchpad, a platform for design graduates moving into freelance work. There are no wrong answers, and nothing you do can break it. I'll give you three tasks; please think aloud as you go. I'm testing the design, not you."

**Tasks**

1. **Learn:** "You want to learn how to price your freelance work. Starting from the dashboard, find the relevant module and begin the first lesson."
2. **Match:** "You need portfolio feedback from an experienced designer. Use the mentor area to find a mentor who offers portfolio feedback, and open their profile."
3. **Book:** "Book a 30-minute session with that mentor for a time that suits you."

**Optional follow-up:** "Where would you go to find the mentor you just saved?"

**Note sheet columns:** Participant · Task · Start/end · Success (Y / assisted / N) · Path taken · Hesitation/quotes · Severity (low/medium/high).

**Between participants:** open the sidebar → **Reset demo** → confirm, or clear the `launchpad.demo.v1` key.

**Reminders:** do not lead with screen names; ask participants to think aloud; record observations, not interpretations; stop the task after a reasonable attempt.

---

## Appendix B — Commands

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

# reset demo data from the browser console (alternative to the UI control)
localStorage.removeItem('launchpad.demo.v1'); location.reload();
```

GitHub:

```bash
gh repo edit SixStringBny/fpa-prototype --visibility public --accept-visibility-change-consequences
gh api -X POST repos/SixStringBny/fpa-prototype/pages -f build_type=workflow
```

---

## Appendix C — Phase dependency graph

```text
Phase 0 Foundation
   └─ Phase 1 Design system & shell
        └─ Phase 2 Data & demo state
             ├─ Phase 3 Marketing
             ├─ Phase 4 Learning
             ├─ Phase 5 Mentors
             │    └─ Phase 6 Booking & sessions
             └─ Phase 7 Dashboard & profile
                  └─ Phase 8 Polish & release
                       └─ Phase 9 Optional variant (post-feedback)
```

Phases 3–5 can run in parallel once Phase 2 is complete. Phase 6 depends on Phase 5. Phase 7 depends on Phases 4–6. Phase 8 depends on everything.
