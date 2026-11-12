import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MarketingLayout } from './components/layout/MarketingLayout'
import { AppLayout } from './components/layout/AppLayout'
import { RequireAuth } from './features/auth/RequireAuth'
import { LoginPage } from './features/auth/LoginPage'
import { HomePage } from './features/marketing/HomePage'
import { MentorshipPage } from './features/marketing/MentorshipPage'
import { AboutPage } from './features/marketing/AboutPage'
import { NotFoundPage } from './features/marketing/NotFoundPage'
import { LearnPage } from './features/learn/LearnPage'
import { ModulePage } from './features/learn/ModulePage'
import { LessonPage } from './features/learn/LessonPage'
import { MentorListPage } from './features/mentors/MentorListPage'
import { MentorProfilePage } from './features/mentors/MentorProfilePage'
import { BookingPage } from './features/booking/BookingPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { SessionsPage } from './features/dashboard/SessionsPage'
import { SavedPage } from './features/dashboard/SavedPage'
import { ProfilePage } from './features/dashboard/ProfilePage'
import { RoadmapPage } from './features/dashboard/RoadmapPage'
import { OpportunitiesPage } from './features/opportunities/OpportunitiesPage'
import { OpportunityPage } from './features/opportunities/OpportunityPage'
import { PortfolioPage } from './features/portfolio/PortfolioPage'
import { PortfolioProjectPage } from './features/portfolio/PortfolioProjectPage'
import { CommunityPage } from './features/community/CommunityPage'
import { StyleguidePage } from './features/styleguide/StyleguidePage'

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:moduleSlug" element={<ModulePage />} />
          <Route path="mentorship" element={<MentorshipPage />} />
          <Route path="mentors/:mentorSlug" element={<MentorProfilePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="styleguide" element={<StyleguidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />

        <Route path="app" element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="learn" element={<LearnPage inApp />} />
            <Route path="learn/:moduleSlug" element={<ModulePage inApp />} />
            <Route
              path="learn/:moduleSlug/:lessonSlug"
              element={<LessonPage />}
            />
            <Route path="mentors" element={<MentorListPage />} />
            <Route
              path="mentors/:mentorSlug"
              element={<MentorProfilePage inApp />}
            />
            <Route
              path="mentors/:mentorSlug/book"
              element={<BookingPage />}
            />
            <Route path="opportunities" element={<OpportunitiesPage />} />
            <Route path="opportunities/:slug" element={<OpportunityPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="portfolio/:projectId" element={<PortfolioProjectPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="saved" element={<SavedPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
