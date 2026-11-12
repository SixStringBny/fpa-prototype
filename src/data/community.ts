import type { CommunityPost } from '../types'

export const communityPosts: CommunityPost[] = [
  {
    id: 'post-cafe-menu',
    author: 'Lerato M.',
    role: 'Design graduate',
    avatar: '/avatars/mentor-thandiwe.svg',
    projectTitle: 'Café menu refresh',
    summary:
      'I took the café brief from the opportunities board and rebuilt the menu around three sections instead of eleven. The feedback helped me cut the price list in half.',
    tags: ['Branding', 'Layout', 'Print'],
    endorsements: 12,
    accent: 'teal',
  },
  {
    id: 'post-market-posters',
    author: 'Sipho K.',
    role: 'Illustrator',
    avatar: '/avatars/mentor-sipho.svg',
    projectTitle: 'Sunday market poster series',
    summary:
      'A three-poster series for a fictional market. I wanted the type to feel hand-painted without losing the details. The revision history shows how much the layout changed after review.',
    tags: ['Illustration', 'Print', 'Typography'],
    endorsements: 8,
    accent: 'amber',
  },
  {
    id: 'post-wellness-kit',
    author: 'Aisha N.',
    role: 'Junior designer',
    avatar: '/avatars/mentor-priya.svg',
    projectTitle: 'Wellness brand launch kit',
    summary:
      'My first paid brief. I used the pricing module to quote a smaller scope, then built six social templates and a simple launch grid. The mentor feedback was specific and kind.',
    tags: ['Branding', 'Social Media', 'Figma'],
    endorsements: 15,
    accent: 'purple',
  },
]
