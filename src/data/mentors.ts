import type { Mentor } from '../types'

export const mentors: Mentor[] = [
  {
    id: 'mentor-amina',
    slug: 'amina-yusuf',
    name: 'Amina Yusuf',
    role: 'Senior Software Engineer',
    company: 'Independent',
    location: 'Cape Town',
    avatar: '/avatars/mentor-amina.svg',
    shortBio:
      'Frontend engineer who helps creatives get comfortable with code, tools and technical handover.',
    bio: 'Amina has spent six years building web products for small teams and independent studios. She specialises in frontend development and helps designers understand enough code to collaborate confidently with engineers. Her sessions are practical: bring a real problem, leave with a next step.',
    expertise: ['Frontend', 'JavaScript', 'React', 'Career Guidance'],
    experienceYears: 6,
    rating: 4.9,
    reviewCount: 24,
    sessionCount: 86,
    sessionTypes: ['free'],
    availability: [
      { weekdays: [1, 3, 5], times: ['09:00', '11:00', '14:00', '16:00'] },
      { weekdays: [2, 4], times: ['10:00', '15:00'] },
    ],
    reviews: [
      {
        id: 'amina-r1',
        author: 'Lerato M.',
        role: 'Design graduate',
        rating: 5,
        quote:
          'Amina explained how my designs would be built without making me feel behind. I finally understand what to hand over to a developer.',
        date: '2026-08-14',
      },
      {
        id: 'amina-r2',
        author: 'Kyle v. W.',
        role: 'Junior designer',
        rating: 5,
        quote:
          'Very calm and practical. She helped me break a scary technical problem into three small steps.',
        date: '2026-07-02',
      },
      {
        id: 'amina-r3',
        author: 'Naledi K.',
        role: 'Design graduate',
        rating: 4,
        quote:
          'Useful session on portfolio sites. I left with a clear list of what to fix first.',
        date: '2026-05-19',
      },
    ],
    featured: true,
  },
  {
    id: 'mentor-daniel',
    slug: 'daniel-okafor',
    name: 'Daniel Okafor',
    role: 'Product Manager',
    company: 'Fieldnote Studio',
    location: 'Johannesburg',
    avatar: '/avatars/mentor-daniel.svg',
    shortBio:
      'Product manager who helps creatives frame their work around problems, outcomes and stakeholders.',
    bio: 'Daniel works with design and engineering teams to turn messy ideas into products people use. He is especially good at helping freelancers explain the value of their work to non-creative stakeholders, write clearer proposals and make decisions with incomplete information.',
    expertise: [
      'Product Management',
      'Strategy',
      'Stakeholder Communication',
    ],
    experienceYears: 5,
    rating: 4.8,
    reviewCount: 18,
    sessionCount: 61,
    sessionTypes: ['free'],
    availability: [
      { weekdays: [1, 2, 4], times: ['08:30', '10:30', '13:00'] },
      { weekdays: [5], times: ['09:00', '11:00'] },
    ],
    reviews: [
      {
        id: 'daniel-r1',
        author: 'Thabo S.',
        role: 'Freelance illustrator',
        rating: 5,
        quote:
          'Daniel helped me rewrite my proposal around the client’s problem instead of my process. I won the project.',
        date: '2026-09-03',
      },
      {
        id: 'daniel-r2',
        author: 'Mia R.',
        role: 'UX graduate',
        rating: 4,
        quote:
          'Good structured thinking. We mapped the stakeholders in my first client project and I could see where I was avoiding a hard conversation.',
        date: '2026-06-21',
      },
    ],
    featured: true,
  },
  {
    id: 'mentor-thandiwe',
    slug: 'thandiwe-mokoena',
    name: 'Thandiwe Mokoena',
    role: 'Freelance Brand Designer',
    company: 'Mokoena Studio',
    location: 'Durban',
    avatar: '/avatars/mentor-thandiwe.svg',
    shortBio:
      'Brand designer and freelancer for eight years. Practical advice on pricing, clients and building a studio.',
    bio: 'Thandiwe runs a small brand studio serving food, hospitality and culture clients. She has been freelancing for eight years and has made most of the mistakes already: underpricing, unclear scope, late payers. Her sessions are honest and specific, with a strong focus on the business side of creative work.',
    expertise: ['Branding', 'Pricing', 'Client Communication'],
    experienceYears: 8,
    rating: 5,
    reviewCount: 41,
    sessionCount: 128,
    sessionTypes: ['free', 'paid'],
    priceZar: 450,
    availability: [
      { weekdays: [2, 3, 4], times: ['10:00', '12:00', '14:30'] },
      { weekdays: [1], times: ['09:00', '15:00'] },
    ],
    reviews: [
      {
        id: 'thandiwe-r1',
        author: 'Zanele D.',
        role: 'Brand designer',
        rating: 5,
        quote:
          'The most useful pricing conversation I have had. Thandiwe helped me work out a day rate and practise saying it out loud.',
        date: '2026-09-12',
      },
      {
        id: 'thandiwe-r2',
        author: 'Ryan P.',
        role: 'Design graduate',
        rating: 5,
        quote:
          'She looked at my quote and showed me exactly where I was leaving money on the table. Direct, kind and worth every rand.',
        date: '2026-08-01',
      },
      {
        id: 'thandiwe-r3',
        author: 'Aisha N.',
        role: 'Freelance designer',
        rating: 5,
        quote:
          'I came with a difficult client situation and left with a script for the conversation. It worked.',
        date: '2026-05-27',
      },
    ],
    featured: true,
  },
  {
    id: 'mentor-lucas',
    slug: 'lucas-meyer',
    name: 'Lucas Meyer',
    role: 'Art Director',
    company: 'Northline',
    location: 'Cape Town',
    avatar: '/avatars/mentor-lucas.svg',
    shortBio:
      'Art director offering honest portfolio reviews and creative direction for graduates entering the industry.',
    bio: 'Lucas has spent ten years in art direction across advertising and independent publishing. He reviews portfolios with a focus on clarity: can a stranger understand what you do, how you think and why it matters? He is direct but supportive, and always leaves you with a short priority list rather than a vague impression.',
    expertise: ['Portfolio Review', 'Art Direction', 'Creative Direction'],
    experienceYears: 10,
    rating: 4.7,
    reviewCount: 33,
    sessionCount: 94,
    sessionTypes: ['free'],
    availability: [
      { weekdays: [1, 4], times: ['11:00', '13:30', '16:00'] },
      { weekdays: [3], times: ['09:30', '14:00'] },
    ],
    reviews: [
      {
        id: 'lucas-r1',
        author: 'Naledi K.',
        role: 'Design graduate',
        rating: 5,
        quote:
          'Lucas gave me three specific changes that made my portfolio feel twice as strong. No vague “make it pop” advice.',
        date: '2026-08-22',
      },
      {
        id: 'lucas-r2',
        author: 'Jordan F.',
        role: 'Illustrator',
        rating: 4,
        quote:
          'Honest and helpful. I did not agree with everything, but the questions he asked were the right ones.',
        date: '2026-07-11',
      },
      {
        id: 'lucas-r3',
        author: 'Sanele B.',
        role: 'Design graduate',
        rating: 5,
        quote:
          'The review helped me cut my portfolio from twelve projects to five. It finally feels like it has a point of view.',
        date: '2026-04-30',
      },
    ],
    featured: true,
  },
  {
    id: 'mentor-priya',
    slug: 'priya-naidoo',
    name: 'Priya Naidoo',
    role: 'UX Lead',
    company: 'Ubuntu Health',
    location: 'Johannesburg',
    avatar: '/avatars/mentor-priya.svg',
    shortBio:
      'UX lead and portfolio reviewer helping designers tell clearer stories about their process and decisions.',
    bio: 'Priya leads a UX team building health services used across South Africa. She has reviewed hundreds of junior portfolios and knows what hiring managers look for: evidence of thinking, not just polished screens. She can help with case studies, interview preparation and portfolio structure.',
    expertise: ['UX/UI', 'Portfolio Review', 'Career Guidance'],
    experienceYears: 7,
    rating: 4.9,
    reviewCount: 52,
    sessionCount: 143,
    sessionTypes: ['free'],
    availability: [
      { weekdays: [2, 4, 5], times: ['09:00', '12:00', '15:30'] },
      { weekdays: [1], times: ['10:00', '16:30'] },
    ],
    reviews: [
      {
        id: 'priya-r1',
        author: 'Ayanda M.',
        role: 'UX graduate',
        rating: 5,
        quote:
          'Priya helped me turn a messy student project into a case study I am proud to send. She asks exactly the right questions.',
        date: '2026-09-05',
      },
      {
        id: 'priya-r2',
        author: 'Chris L.',
        role: 'Product designer',
        rating: 5,
        quote:
          'Clear, generous and very well prepared. She had read my portfolio before the call and came with notes.',
        date: '2026-07-19',
      },
      {
        id: 'priya-r3',
        author: 'Fatima H.',
        role: 'Design graduate',
        rating: 5,
        quote:
          'I used her structure for three case studies and got two interviews the following week.',
        date: '2026-06-08',
      },
    ],
    featured: true,
  },
  {
    id: 'mentor-sipho',
    slug: 'sipho-dlamini',
    name: 'Sipho Dlamini',
    role: 'Motion & 3D Designer',
    company: 'Frame/Space',
    location: 'Pretoria',
    avatar: '/avatars/mentor-sipho.svg',
    shortBio:
      'Motion and 3D designer helping graduates build showreels that stand out without a big budget.',
    bio: 'Sipho creates motion and 3D work for music, sport and culture clients. He is practical about equipment, render times and the realities of a first showreel. Sessions focus on selecting work, building a narrative and presenting unfinished projects with confidence.',
    expertise: ['Motion', '3D', 'Showreels'],
    experienceYears: 4,
    rating: 4.6,
    reviewCount: 12,
    sessionCount: 38,
    sessionTypes: ['paid'],
    priceZar: 350,
    availability: [
      { weekdays: [3, 5], times: ['13:00', '15:00', '17:00'] },
      { weekdays: [6], times: ['10:00', '12:00'] },
    ],
    reviews: [
      {
        id: 'sipho-r1',
        author: 'Tumelo G.',
        role: 'Motion graduate',
        rating: 5,
        quote:
          'Sipho helped me cut my showreel from two minutes to forty seconds. It is so much stronger now.',
        date: '2026-08-29',
      },
      {
        id: 'sipho-r2',
        author: 'Emma W.',
        role: '3D student',
        rating: 4,
        quote:
          'Practical advice about rendering on a laptop and what to show when a project is not finished yet.',
        date: '2026-06-15',
      },
    ],
    featured: false,
  },
]

export function getMentorBySlug(slug: string | undefined): Mentor | undefined {
  return mentors.find((mentor) => mentor.slug === slug)
}

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((mentor) => mentor.id === id)
}

export const mentorExpertise = Array.from(
  new Set(mentors.flatMap((mentor) => mentor.expertise)),
).sort()

export const mentorLocations = Array.from(
  new Set(mentors.map((mentor) => mentor.location)),
).sort()
