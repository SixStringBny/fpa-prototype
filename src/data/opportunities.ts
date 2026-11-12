import type { Opportunity, OpportunityType } from '../types'
import { addDays } from '../lib/dates'

function deadlineInDays(days: number): string {
  const date = addDays(new Date(), days)
  date.setHours(17, 0, 0, 0)
  return date.toISOString()
}

export const opportunities: Opportunity[] = [
  {
    id: 'opp-cafe-menu',
    slug: 'cafe-menu-refresh',
    title: 'Refresh a neighbourhood café menu',
    type: 'practice-brief',
    client: "Kofi's Kitchen",
    discipline: 'Graphic Design',
    level: 'Beginner',
    paid: false,
    deadline: deadlineInDays(14),
    summary:
      'A small café needs a warmer, clearer menu that works in-store and on a phone.',
    description:
      'Kofi’s Kitchen is a fictional neighbourhood café in Melville. The owner has a loyal lunch crowd but the current menu is a photocopied sheet with inconsistent prices and no clear sections. Your brief is to redesign it so a first-time customer can decide quickly and the café’s personality comes through. This is a practice brief: no client payment, but you can submit the outcome for mentor feedback.',
    deliverables: [
      'A one-page menu for in-store use',
      'A mobile-friendly version that is easy to read',
      'A short note explaining the layout and type choices',
    ],
    skills: ['Branding', 'Layout', 'Print', 'Typography'],
    featured: true,
  },
  {
    id: 'opp-studio-internship',
    slug: 'studio-design-internship',
    title: 'Junior design internship at a small studio',
    type: 'internship',
    client: 'Fieldnote Studio',
    discipline: 'Graphic Design',
    level: 'Beginner',
    paid: true,
    priceZar: 3500,
    deadline: deadlineInDays(21),
    summary:
      'A three-month, part-time internship for a graduate who wants real client work with guidance.',
    description:
      'Fieldnote Studio is a fictional four-person brand and product studio. They are looking for a junior designer to support two client projects, prepare files for handover and sit in on feedback sessions. The internship is part-time and paid a monthly stipend. You do not need a perfect portfolio; you need to show how you think and how you take feedback.',
    deliverables: [
      'A short portfolio or two case studies',
      'A one-page note on how you approach feedback',
      'Availability for a part-time three-month placement',
    ],
    skills: ['Branding', 'Layout', 'Figma', 'Client Communication'],
    featured: true,
  },
  {
    id: 'opp-wellness-launch',
    slug: 'wellness-launch-kit',
    title: 'Social launch kit for a wellness brand',
    type: 'project',
    client: 'Lerato Wellness',
    discipline: 'Social Media Design',
    level: 'Intermediate',
    paid: true,
    priceZar: 4500,
    deadline: deadlineInDays(28),
    summary:
      'A paid entry-level project: six social templates and a simple launch grid for a new wellness brand.',
    description:
      'Lerato Wellness is a fictional small business launching a range of herbal teas. They need a small, consistent set of social templates for the first month: launch announcement, product cards, a quote tile and a simple story template. The brand direction and copy are provided. You will need to work within a limited palette and hand over editable files.',
    deliverables: [
      'Six editable social templates',
      'A simple launch grid for the first month',
      'A short handover note for the owner',
    ],
    skills: ['Social Media Design', 'Branding', 'Figma', 'Layout'],
    featured: true,
  },
  {
    id: 'opp-case-study',
    slug: 'package-a-case-study',
    title: 'Package a student project as a case study',
    type: 'practice-brief',
    client: 'LaunchPad community',
    discipline: 'Portfolio',
    level: 'Beginner',
    paid: false,
    deadline: deadlineInDays(10),
    summary:
      'Turn one student project into a short, honest case study that answers the questions clients actually ask.',
    description:
      'Pick a project you already have. Write a one-page case study that states the problem, the constraints, the decisions you made, one rejected direction and the outcome. The goal is not to make the work look bigger than it is. The goal is to show how you think. Submit it for a structured portfolio review when you are ready.',
    deliverables: [
      'A one-page case study',
      'One rejected direction and why you moved away from it',
      'A short outcome or reflection',
    ],
    skills: ['Portfolio', 'Writing', 'Storytelling', 'Case Studies'],
    featured: false,
  },
]

export function getOpportunityBySlug(
  slug: string | undefined,
): Opportunity | undefined {
  return opportunities.find((opportunity) => opportunity.slug === slug)
}

export const opportunityTypes: Array<{
  value: OpportunityType
  label: string
}> = [
  { value: 'practice-brief', label: 'Practice brief' },
  { value: 'internship', label: 'Internship' },
  { value: 'project', label: 'Paid project' },
]

export const opportunityDisciplines = Array.from(
  new Set(opportunities.map((opportunity) => opportunity.discipline)),
).sort()

export function opportunityTypeLabel(type: OpportunityType): string {
  return opportunityTypes.find((item) => item.value === type)?.label ?? type
}
