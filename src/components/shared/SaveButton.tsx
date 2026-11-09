import { Bookmark, BookmarkCheck } from 'lucide-react'

type SaveButtonProps = {
  saved: boolean
  onToggle: () => void
  mentorName: string
  size?: 'sm' | 'md'
}

export function SaveButton({
  saved,
  onToggle,
  mentorName,
  size = 'md',
}: SaveButtonProps) {
  return (
    <button
      type="button"
      className={`save-button${saved ? ' save-button--saved' : ''}`}
      aria-pressed={saved}
      aria-label={
        saved ? `Remove ${mentorName} from saved mentors` : `Save ${mentorName}`
      }
      onClick={onToggle}
      style={size === 'sm' ? { width: 34, height: 34 } : undefined}
    >
      {saved ? (
        <BookmarkCheck size={18} aria-hidden="true" />
      ) : (
        <Bookmark size={18} aria-hidden="true" />
      )}
    </button>
  )
}
