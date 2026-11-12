import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  FolderOpen,
  MessagesSquare,
  Sparkles,
  Users,
} from 'lucide-react'
import { modules } from '../../data/modules'
import { mentors } from '../../data/mentors'
import { stats, values } from '../../data/site'
import { testimonials } from '../../data/testimonials'
import { asset } from '../../lib/assets'
import { useDemo } from '../../state/demo-state'
import { getModuleProgressPercent } from '../../state/selectors'
import { Container } from '../../components/layout/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ModuleCard } from '../../components/shared/ModuleCard'
import { MentorCard } from '../../components/shared/MentorCard'
import { Avatar } from '../../components/ui/Avatar'
import { useToast } from '../../components/ui/Toast'

export function HomePage() {
  const { state, saveMentor, unsaveMentor } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()

  const featuredModules = modules.filter((module) => module.featured).slice(0, 3)
  const featuredMentors = mentors.filter((mentor) => mentor.featured).slice(0, 4)

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
      toast(`${name} saved. Find them under Saved in your dashboard.`)
    }
  }

  return (
    <>
      <section className="hero">
        <Container className="hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">Learn. Network. Build. Earn.</span>
            <h1>Start your freelance career with confidence</h1>
            <p className="hero__lede">
              Self-paced modules, honest mentorship and structured portfolio
              feedback for design and creative graduates. Learn how to find
              clients, price your work and run projects — without guessing.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" to="/login">
                Get Started
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn--secondary btn--lg" to="/learn">
                Browse modules
              </Link>
            </div>
            <div className="hero__note">
              <span className="hero__note-item">
                <BadgeCheck size={16} aria-hidden="true" />
                Free to start
              </span>
              <span className="hero__note-item">
                <BadgeCheck size={16} aria-hidden="true" />
                6 practical modules
              </span>
              <span className="hero__note-item">
                <BadgeCheck size={16} aria-hidden="true" />
                Mentors who have been there
              </span>
              <span className="hero__note-item">
                <BadgeCheck size={16} aria-hidden="true" />
                Portfolio feedback and practice briefs
              </span>
            </div>
          </div>

          <div className="hero__media">
            <img
              src={asset('/images/hero-home.webp')}
              alt="A team of young creatives collaborating around a table"
            />
            <div className="hero__floating">
              <p className="hero__floating-label">Up next</p>
              <p className="hero__floating-title">
                Pricing Your Creative Work
              </p>
              <div className="hero__floating-row">
                <BookOpen size={15} aria-hidden="true" />
                4 lessons · 45 min
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Start here"
            title="Everything you need to become freelance-ready"
            description="Practical, plain-language modules built around the questions graduates actually ask."
            action={
              <Link className="btn btn--secondary" to="/learn">
                All modules
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
          <div className="feature-grid">
            {featuredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                href={`/learn/${module.slug}`}
                progressPercent={
                  state.auth.isAuthenticated
                    ? getModuleProgressPercent(state, module)
                    : undefined
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--canvas">
        <Container>
          <div className="stat-band">
            {stats.map((stat) => (
              <div className="stat-band__item" key={stat.label}>
                <p className="stat-band__value">{stat.value}</p>
                <p className="stat-band__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Mentorship"
            title="Learn from professionals who have been there"
            description="Book a free intro session with a working designer, art director or product lead. Ask the questions you cannot ask in a lecture."
            action={
              <Link className="btn btn--secondary" to="/mentorship">
                How mentorship works
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
          <div className="feature-grid feature-grid--two">
            {featuredMentors.map((mentor) => (
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
          <SectionHeading
            eyebrow="The hub"
            title="More than a course: practice, feedback and people"
            description="The learning gets you started. The practice briefs, portfolio reviews and community help you keep going."
          />
          <div className="feature-grid">
            <article className="value-card">
              <div className="value-card__icon" aria-hidden="true">
                <Briefcase size={20} />
              </div>
              <h3>Practice briefs</h3>
              <p>
                Small, realistic briefs that give you something to make — and
                something to show.
              </p>
              <Link className="inline-link" to="/app/opportunities">
                Browse opportunities
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
            <article className="value-card">
              <div className="value-card__icon" aria-hidden="true">
                <FolderOpen size={20} />
              </div>
              <h3>Portfolio feedback</h3>
              <p>
                Submit a project, get a rubric and specific annotations, then
                revise it with a clear next step.
              </p>
              <Link className="inline-link" to="/app/portfolio">
                See how feedback works
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
            <article className="value-card">
              <div className="value-card__icon" aria-hidden="true">
                <MessagesSquare size={20} />
              </div>
              <h3>Community</h3>
              <p>
                See what other graduates are making, borrow an idea and endorse
                the work that helped you.
              </p>
              <Link className="inline-link" to="/app/community">
                Visit the community
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Why LaunchPad"
            title="Built for the first step, not the finished studio"
            description="LaunchPad is designed for graduates entering freelance work. The content is specific, practical and free of jargon."
          />
          <div className="feature-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <div className="value-card__icon" aria-hidden="true">
                  <Sparkles size={20} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Graduate stories"
            title="What early users are saying"
            description="Fictional testimonials from graduates who helped shape this prototype."
          />
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial" key={testimonial.id}>
                <p className="testimonial__quote">“{testimonial.quote}”</p>
                <div className="testimonial__person">
                  <Avatar src={testimonial.avatar} alt="" size="sm" />
                  <div>
                    <p className="testimonial__name">{testimonial.name}</p>
                    <p className="testimonial__role">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--canvas">
        <Container>
          <div className="cta-band">
            <div>
              <h2>Your first client is closer than you think</h2>
              <p>
                Create a demo account and work through the three core tasks:
                learn, match and book.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link className="btn btn--primary btn--lg" to="/login">
                Get Started
                <Users size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn--ghost-light btn--lg" to="/mentorship">
                Meet the mentors
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
