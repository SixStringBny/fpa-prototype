import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Compass, MessageSquare } from 'lucide-react'
import { mentors } from '../../data/mentors'
import { asset } from '../../lib/assets'
import { useDemo } from '../../state/demo-state'
import { Container } from '../../components/layout/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { MentorCard } from '../../components/shared/MentorCard'
import { useToast } from '../../components/ui/Toast'

const benefits = [
  {
    icon: MessageSquare,
    title: 'Honest, specific feedback',
    text: 'Bring a portfolio, a quote or a client problem. Leave with a short list of things to do next, not vague encouragement.',
  },
  {
    icon: CalendarCheck,
    title: 'Book around your week',
    text: 'Pick a 30-minute slot that suits you. Free intro sessions are available with every mentor; some also offer paid deep dives.',
  },
  {
    icon: Compass,
    title: 'Guidance for the real world',
    text: 'Mentors are working creatives and operators. They know what clients expect and what the first year actually feels like.',
  },
]

const steps = [
  {
    title: 'Browse and filter',
    text: 'Search by expertise, availability or session type. Save the mentors you want to come back to.',
  },
  {
    title: 'Open a profile',
    text: 'Read their bio, reviews and availability. Check that their experience matches what you need.',
  },
  {
    title: 'Book a session',
    text: 'Choose a time, confirm, and your session appears on your dashboard and in Sessions.',
  },
]

export function MentorshipPage() {
  const { state, saveMentor, unsaveMentor } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()

  const featured = mentors.filter((mentor) => mentor.featured).slice(0, 4)

  const toggleSave = (mentorId: string, name: string) => {
    if (!state.auth.isAuthenticated) {
      navigate('/login?next=%2Fapp%2Fmentors')
      return
    }
    if (state.savedMentorIds.includes(mentorId)) {
      unsaveMentor(mentorId)
      toast(`${name} removed from saved mentors.`)
    } else {
      saveMentor(mentorId)
      toast(`${name} saved.`)
    }
  }

  return (
    <>
      <section className="page-hero">
        <Container className="page-hero__inner">
          <div>
            <span className="eyebrow">Mentorship</span>
            <h1>Learn from professionals who have been there</h1>
            <p>
              A short conversation with the right person can save you months of
              guessing. Meet working designers, art directors and product leads
              who understand the first step into freelance work.
            </p>
            <div className="page-hero__actions">
              <Link className="btn btn--primary btn--lg" to="/app/mentors">
                Find a mentor
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn--ghost-light btn--lg" to="/login">
                Create a demo account
              </Link>
            </div>
          </div>
          <div className="page-hero__media">
            <img
              src={asset('/images/hero-mentorship.webp')}
              alt="A mentor and a graduate talking together over a laptop"
            />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="What to expect"
            title="Useful, human support — not a lecture"
            description="Mentorship on Launchpad is practical. You bring a real question; the mentor helps you make a decision."
          />
          <div className="feature-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <article className="value-card" key={benefit.title}>
                  <div className="value-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section section--canvas">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to your first session"
          />
          <div className="feature-grid">
            {steps.map((step, index) => (
              <article className="value-card" key={step.title}>
                <div className="value-card__icon" aria-hidden="true">
                  {index + 1}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Meet the mentors"
            title="A small, carefully chosen group"
            description="Every profile is fictional, but the advice is modelled on real freelance experience."
            action={
              <Link className="btn btn--secondary" to="/app/mentors">
                Browse all mentors
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
          <div className="feature-grid feature-grid--two">
            {featured.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                href={`/mentors/${mentor.slug}`}
                saved={state.savedMentorIds.includes(mentor.id)}
                onToggleSave={() => toggleSave(mentor.id, mentor.name)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--canvas">
        <Container>
          <div className="cta-band">
            <div>
              <h2>Bring your hardest question</h2>
              <p>
                Pricing, portfolio, clients, contracts — a 30-minute
                conversation can make the next step obvious.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link className="btn btn--primary btn--lg" to="/app/mentors">
                Find a mentor
              </Link>
              <Link className="btn btn--ghost-light btn--lg" to="/learn">
                Start with a module
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
