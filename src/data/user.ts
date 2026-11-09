import type { LearnerProfile } from '../types'

export const testUserProfile: LearnerProfile = {
  name: 'Naledi Khumalo',
  headline: 'Design graduate moving into freelance work',
  discipline: 'Graphic Design',
  location: 'Johannesburg',
  bio: 'Final-year design graduate with a focus on branding and illustration. I am building a freelance practice alongside my studies and looking for my first few clients.',
  avatar: '/avatars/user-naledi.svg',
  goals: [
    'Find my first client',
    'Price my work confidently',
    'Build a stronger portfolio',
    'Understand contracts and invoices',
  ],
  skills: ['Branding', 'Illustration', 'Figma', 'Social Media Design'],
  links: {
    portfolio: 'https://naledi.example.com',
    linkedin: 'https://www.linkedin.com/in/naledi-khumalo',
    instagram: 'https://www.instagram.com/naledi.makes',
  },
  availability: 'Weekdays',
}

export const avatarOptions = [
  { src: '/avatars/user-naledi.svg', label: 'Naledi' },
  { src: '/avatars/mentor-amina.svg', label: 'Amina' },
  { src: '/avatars/mentor-thandiwe.svg', label: 'Thandiwe' },
  { src: '/avatars/mentor-lucas.svg', label: 'Lucas' },
  { src: '/avatars/mentor-priya.svg', label: 'Priya' },
  { src: '/avatars/mentor-daniel.svg', label: 'Daniel' },
  { src: '/avatars/mentor-sipho.svg', label: 'Sipho' },
]
