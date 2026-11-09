import { Link } from 'react-router-dom'
import { Bookmark, Users } from 'lucide-react'
import { useDemo } from '../../state/demo-state'
import { getSavedMentors } from '../../state/selectors'
import { PageHeader } from '../../components/layout/PageHeader'
import { MentorCard } from '../../components/shared/MentorCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'

export function SavedPage() {
  const { state, unsaveMentor, saveMentor } = useDemo()
  const { toast } = useToast()
  const savedMentors = getSavedMentors(state)

  const toggleSave = (mentorId: string, name: string) => {
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
      <PageHeader
        eyebrow="Shortlist"
        title="Saved mentors"
        description="The people you want to come back to. Open a profile to read reviews and book a session."
        actions={
          <Link className="btn btn--secondary" to="/app/mentors">
            <Users size={17} aria-hidden="true" />
            Find more mentors
          </Link>
        }
      />

      {savedMentors.length > 0 ? (
        <div className="mentor-grid">
          {savedMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              href={`/app/mentors/${mentor.slug}`}
              saved
              onToggleSave={() => toggleSave(mentor.id, mentor.name)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark size={24} aria-hidden="true" />}
          title="No saved mentors yet"
          description="When you find someone useful, tap the bookmark on their card. They will appear here and on your dashboard."
          action={
            <Link className="btn btn--primary" to="/app/mentors">
              Browse mentors
            </Link>
          }
        />
      )}
    </>
  )
}
