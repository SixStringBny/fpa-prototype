import { Link } from 'react-router-dom'
import { footerLinks } from '../../data/site'
import { Logo } from '../shared/Logo'
import { Container } from './Container'

export function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <Container>
        <div className="marketing-footer__top">
          <div className="marketing-footer__brand">
            <Logo light />
            <p>
              Self-paced learning, mentorship, portfolio feedback and practical
              briefs for design and creative graduates moving into freelance
              work.
            </p>
          </div>

          <div>
            <h2 className="marketing-footer__heading">Learn</h2>
            <ul className="marketing-footer__list">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link className="marketing-footer__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="marketing-footer__heading">Mentorship</h2>
            <ul className="marketing-footer__list">
              {footerLinks.mentorship.map((link) => (
                <li key={link.label}>
                  <Link className="marketing-footer__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="marketing-footer__heading">LaunchPad</h2>
            <ul className="marketing-footer__list">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link className="marketing-footer__link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="marketing-footer__bottom">
          <p>© {new Date().getFullYear()} LaunchPad. A fictional prototype.</p>
          <span className="marketing-footer__prototype">
            Prototype only · no real accounts or payments
          </span>
        </div>
      </Container>
    </footer>
  )
}
