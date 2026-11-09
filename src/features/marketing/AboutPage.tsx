import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, HeartHandshake, Target } from 'lucide-react'
import { stats, values } from '../../data/site'
import { asset } from '../../lib/assets'
import { Container } from '../../components/layout/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <Container className="page-hero__inner">
          <div>
            <span className="eyebrow">About Launchpad</span>
            <h1>Helping creative graduates make the leap</h1>
            <p>
              Launchpad exists to close the gap between what design school
              teaches and what a first freelance client expects. Learn at your
              pace, then talk to someone who has done it before.
            </p>
            <div className="page-hero__actions">
              <Link className="btn btn--primary btn--lg" to="/learn">
                Explore the modules
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn--ghost-light btn--lg" to="/mentorship">
                Meet the mentors
              </Link>
            </div>
          </div>
          <div className="page-hero__media">
            <img
              src={asset('/images/hero-about.webp')}
              alt="A group of young professionals talking in a bright studio"
            />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="container--narrow">
          <span className="eyebrow">Our mission</span>
          <h2 style={{ marginTop: 'var(--space-3)', fontSize: 'clamp(1.9rem, 3vw + 1rem, 2.8rem)' }}>
            Make the first year of freelance work less lonely and less
            expensive to learn
          </h2>
          <div className="prose" style={{ marginTop: 'var(--space-5)' }}>
            <p>
              Most creative graduates leave university with strong craft skills
              and very little preparation for the business of freelancing. The
              first client, the first quote and the first late invoice are
              usually learned the hard way.
            </p>
            <p>
              Launchpad brings those lessons into one place: short, practical
              modules written in plain language, plus mentorship from people
              who are already doing the work. No business jargon, no get-rich
              promises, no pretend certainty.
            </p>
            <p>
              This site is a working prototype built for moderated usability
              testing. The mentors, testimonials and learner profile are
              fictional, and no real accounts, payments or sessions are created.
            </p>
          </div>
        </Container>
      </section>

      <section className="section section--canvas">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Four principles that shape the product"
          />
          <div className="feature-grid">
            {values.map((value, index) => {
              const icons = [Target, HeartHandshake, GraduationCap, Target]
              const Icon = icons[index] ?? Target
              return (
                <article className="value-card" key={value.title}>
                  <div className="value-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Who it is for"
            title="Designed for the transition, not the established studio"
          />
          <div className="feature-grid feature-grid--two">
            <article className="value-card">
              <h3>Design and creative graduates</h3>
              <p>
                You have craft skills and a portfolio, but the business side is
                still a mystery. Start with the modules and book a mentor when
                you need a second opinion.
              </p>
            </article>
            <article className="value-card">
              <h3>Early freelancers</h3>
              <p>
                You have one or two clients and want to be more deliberate about
                pricing, scope and contracts. The modules are short enough to
                use between projects.
              </p>
            </article>
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
          <div className="cta-band">
            <div>
              <h2>Start with one useful lesson</h2>
              <p>
                You do not need a business plan. Pick the module that matches
                the question in front of you.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link className="btn btn--primary btn--lg" to="/learn">
                Browse modules
              </Link>
              <Link className="btn btn--ghost-light btn--lg" to="/login">
                Create a demo account
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
