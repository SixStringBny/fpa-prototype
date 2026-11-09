export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Lerato Mahlangu',
    role: 'Illustrator, Johannesburg',
    quote:
      'The pricing module changed how I talk about money. I stopped guessing and started quoting with a number I could explain.',
    avatar: '/avatars/mentor-thandiwe.svg',
  },
  {
    id: 't2',
    name: 'Sanele Botha',
    role: 'Brand designer, Cape Town',
    quote:
      'My portfolio review was the first honest feedback I had received. I cut half my projects and started getting replies.',
    avatar: '/avatars/mentor-lucas.svg',
  },
  {
    id: 't3',
    name: 'Ayanda Mthembu',
    role: 'UX designer, Durban',
    quote:
      'I booked a session on a Tuesday and had a clearer case study by Thursday. Having someone in my corner made the difference.',
    avatar: '/avatars/mentor-priya.svg',
  },
]
