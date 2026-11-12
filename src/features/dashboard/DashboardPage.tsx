import { Link } from 'react-router-dom'
import { BookOpen, CalendarDays, CheckCircle2, Users } from 'lucide-react'
import { getMentorById } from '../../data/mentors'
import { useDemo } from '../../state/demo-state'
import {
  getCommunityPosts,
  getCompletedLessonTotal,
  getContinueLearning,
  getModulesInProgress,
  getModuleCompletedCount,
  getModuleProgressPercent,
  getNextUpcomingBooking,
  getPortfolioFocus,
  getProfileCompleteness,
  getRecommendedMentors,
  getRecommendedOpportunities,
  getRoadmapMilestones,
  getSavedMentors,
  getTailoredResources,
  getUpcomingBookings,
} from '../../state/selectors'
import { DashboardHero } from './dashboard-cards'
import { ImpactStats } from './dashboard-cards'
import { ContinueLearningCard } from './dashboard-cards'
import { UpcomingSessionCard } from './dashboard-cards'
import { SavedMentorsCard } from './dashboard-cards'
import { RecommendedMentorsCard } from './dashboard-cards'
import { TailoredResourcesCard } from './dashboard-cards'
import { QuickLinksCard } from './dashboard-cards'
import { RoadmapCard } from './dashboard-cards'
import { OpportunitiesCard } from './dashboard-cards'
import { PortfolioFeedbackCard } from './dashboard-cards'
import { CommunityCard } from './dashboard-cards'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'

export function DashboardPage() {
  const { state } = useDemo()
  const { toast } = useToast()

  const completeness = getProfileCompleteness(state.profile)
  const continueLearning = getContinueLearning(state)
  const nextBooking = getNextUpcomingBooking(state)
  const nextMentor = nextBooking
    ? getMentorById(nextBooking.mentorId)
    : undefined
  const savedMentors = getSavedMentors(state)
  const recommended = getRecommendedMentors(state)
  const resources = getTailoredResources(state)
  const lessonsCompleted = getCompletedLessonTotal(state)
  const modulesInProgress = getModulesInProgress(state)
  const upcomingSessions = getUpcomingBookings(state)
  const roadmap = getRoadmapMilestones(state)
  const recommendedOpportunities = getRecommendedOpportunities(state, 2)
  const portfolioFocus = getPortfolioFocus(state)
  const communityPosts = getCommunityPosts(state)

  const continueHref = continueLearning
    ? continueLearning.nextLesson
      ? `/app/learn/${continueLearning.module.slug}/${continueLearning.nextLesson.slug}`
      : `/app/learn/${continueLearning.module.slug}`
    : undefined

  return (
    <div className="dashboard">
      <DashboardHero
        profile={state.profile}
        completeness={completeness.percent}
        missing={completeness.missing}
        continueHref={continueHref}
        continueLabel={
          continueLearning?.nextLesson ? 'Continue learning' : 'Review module'
        }
      />

      <ImpactStats
        lessons={lessonsCompleted}
        modules={modulesInProgress.length}
        sessions={upcomingSessions.length}
        saved={savedMentors.length}
      />

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <RoadmapCard milestones={roadmap} />

          {continueLearning ? (
            <ContinueLearningCard
              module={continueLearning.module}
              lessonTitle={continueLearning.nextLesson?.title}
              href={continueHref ?? '/app/learn'}
              percent={getModuleProgressPercent(state, continueLearning.module)}
              completed={getModuleCompletedCount(state, continueLearning.module)}
            />
          ) : (
            <section className="dashboard-card">
              <div className="dashboard-card__header">
                <h2 className="dashboard-card__title">Continue learning</h2>
                <Link className="dashboard-card__link" to="/app/learn">
                  All modules
                </Link>
              </div>
              <EmptyState
                icon={<BookOpen size={22} aria-hidden="true" />}
                title="Nothing in progress"
                description="Start with Pricing Your Creative Work or Finding Your First Client."
                action={
                  <Link className="btn btn--primary" to="/app/learn">
                    Browse modules
                  </Link>
                }
              />
            </section>
          )}

          {nextBooking && nextMentor ? (
            <UpcomingSessionCard
              booking={nextBooking}
              mentor={nextMentor}
              onJoin={() =>
                toast(
                  'Video calls are not part of this prototype. Imagine a friendly mentor here.',
                  'info',
                )
              }
            />
          ) : (
            <section className="dashboard-card">
              <div className="dashboard-card__header">
                <h2 className="dashboard-card__title">Next session</h2>
                <Link className="dashboard-card__link" to="/app/sessions">
                  All sessions
                </Link>
              </div>
              <EmptyState
                icon={<CalendarDays size={22} aria-hidden="true" />}
                title="No session booked"
                description="Find a mentor who offers portfolio feedback or pricing advice."
                action={
                  <Link className="btn btn--primary" to="/app/mentors">
                    Find a mentor
                  </Link>
                }
              />
            </section>
          )}

          <PortfolioFeedbackCard project={portfolioFocus} />

          <OpportunitiesCard
            opportunities={recommendedOpportunities}
            savedIds={state.savedOpportunityIds}
          />

          {savedMentors.length > 0 ? (
            <SavedMentorsCard mentors={savedMentors.slice(0, 3)} />
          ) : (
            <section className="dashboard-card">
              <div className="dashboard-card__header">
                <h2 className="dashboard-card__title">Saved mentors</h2>
                <Link className="dashboard-card__link" to="/app/saved">
                  View all
                </Link>
              </div>
              <EmptyState
                icon={<Users size={22} aria-hidden="true" />}
                title="No saved mentors yet"
                description="Tap the bookmark on a mentor card to keep them here for later."
                action={
                  <Link className="btn btn--secondary" to="/app/mentors">
                    Browse mentors
                  </Link>
                }
              />
            </section>
          )}

          <RecommendedMentorsCard
            mentors={recommended}
            savedIds={state.savedMentorIds}
          />
        </div>

        <div className="dashboard-rail">
          <TailoredResourcesCard resources={resources} />
          <QuickLinksCard profileComplete={completeness.percent >= 100} />
          <CommunityCard
            latestTitle={
              communityPosts[0]?.projectTitle ?? 'See what other graduates are making'
            }
            endorsementCount={communityPosts[0]?.endorsementCount ?? 0}
          />
          <section className="rail-card">
            <h2>Demo tip</h2>
            <p className="text-sm text-muted">
              <CheckCircle2
                size={14}
                aria-hidden="true"
                style={{ display: 'inline', marginRight: 4 }}
              />
              Use Reset demo in the sidebar between test participants. It
              restores the seed data and keeps you signed in.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
