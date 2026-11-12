import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Upload } from 'lucide-react'
import { useDemo } from '../../state/demo-state'
import { getCommunityPosts } from '../../state/selectors'
import { PageHeader } from '../../components/layout/PageHeader'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { Tag } from '../../components/ui/Tag'
import { useToast } from '../../components/ui/Toast'
import { ProjectThumb } from '../portfolio/ProjectThumb'

export function CommunityPage() {
  const { state, endorseCommunityPost } = useDemo()
  const { toast } = useToast()
  const posts = getCommunityPosts(state)

  const endorse = (postId: string, title: string) => {
    endorseCommunityPost(postId)
    toast(`You endorsed “${title}”.`)
  }

  return (
    <>
      <PageHeader
        eyebrow="People doing the work"
        title="Community"
        description="See what other graduates are making, borrow an idea and endorse the work that helped you. This is a prototype, so all posts and people are fictional."
        actions={
          <Link className="btn btn--secondary" to="/app/portfolio">
            <Upload size={17} aria-hidden="true" />
            Share your work
          </Link>
        }
      />

      <section className="challenge-band">
        <div>
          <span className="eyebrow">This month's challenge</span>
          <h2>Refresh a neighbourhood café menu</h2>
          <p>
            Use the practice brief to make something small, specific and
            useful. Submit it for feedback, then share the outcome here.
          </p>
        </div>
        <Link
          className="btn btn--primary"
          to="/app/opportunities/cafe-menu-refresh"
        >
          Open the brief
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>

      <div className="community-grid">
        {posts.map((post) => (
          <article className="community-card" key={post.id}>
            <div className="community-card__author">
              <Avatar src={post.avatar} alt="" size="sm" />
              <div>
                <p className="community-card__name">{post.author}</p>
                <p className="community-card__role">{post.role}</p>
              </div>
            </div>

            <ProjectThumb
              title={post.projectTitle}
              accent={post.accent}
              size="sm"
            />

            <h2 className="community-card__title">{post.projectTitle}</h2>
            <p className="community-card__summary">{post.summary}</p>

            <div className="tag-list">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="community-card__actions">
              <span className="community-card__count">
                <Heart size={15} aria-hidden="true" />
                {post.endorsementCount} endorsements
              </span>
              <Button
                variant={post.endorsed ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => endorse(post.id, post.projectTitle)}
                disabled={post.endorsed}
              >
                {post.endorsed ? 'Endorsed' : 'Endorse'}
              </Button>
            </div>
          </article>
        ))}
      </div>

      <p className="text-sm text-muted" style={{ marginTop: 'var(--space-6)' }}>
        Endorsements are stored in this browser only. No real people or client
        work are shown.
      </p>
    </>
  )
}
