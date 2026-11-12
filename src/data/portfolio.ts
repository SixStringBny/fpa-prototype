import type { PortfolioFeedback, PortfolioProject } from '../types'

export const seedPortfolioProjects: PortfolioProject[] = [
  {
    id: 'project-cafe-menu',
    title: 'Café menu refresh',
    summary:
      'A warmer, clearer menu for a neighbourhood café. The first draft is ready for a review.',
    role: 'Designer and illustrator',
    skills: ['Branding', 'Layout', 'Illustration'],
    accent: 'teal',
    status: 'draft',
  },
  {
    id: 'project-student-brand',
    title: 'Student brand identity',
    summary:
      'A brand identity for a fictional community radio station, documented as a short case study.',
    role: 'Brand designer',
    skills: ['Branding', 'Typography', 'Art direction'],
    accent: 'purple',
    status: 'reviewed',
    submittedAt: '2026-10-28',
    feedback: {
      mentorId: 'mentor-lucas',
      summary:
        'A strong identity with a clear point of view. The case study needs a sharper problem statement and more evidence of the decisions behind the mark. Lead with the outcome, then show the thinking.',
      rubric: [
        {
          criterion: 'Clarity of the problem',
          score: 3,
          comment:
            'The context is there, but the first paragraph describes the station rather than the problem you were solving.',
        },
        {
          criterion: 'Relevance to the work you want',
          score: 4,
          comment:
            'This is a credible brand project. It supports the kind of studio work you say you want.',
        },
        {
          criterion: 'Craft and presentation',
          score: 4,
          comment:
            'The typography and colour choices are confident. Give the logo more breathing room on the opening screen.',
        },
        {
          criterion: 'Story and reflection',
          score: 3,
          comment:
            'Show one rejected direction and explain why you moved away from it. That is where your judgement becomes visible.',
        },
      ],
      annotations: [
        {
          area: 'Opening image',
          note: 'Lead with the finished identity, not the software or the mood board.',
        },
        {
          area: 'Process section',
          note: 'Add the two directions you rejected and one sentence on why.',
        },
        {
          area: 'Outcome',
          note: 'A concrete result or a client quote would make this much stronger.',
        },
      ],
      revisionHistory: [
        {
          version: 1,
          date: '2026-10-28',
          note: 'Initial submission with final mark and three applications.',
        },
        {
          version: 2,
          date: '2026-11-04',
          note: 'Rewrote the problem statement and added the rejected direction.',
        },
      ],
    },
  },
]

/**
 * In the real product, a mentor would review the project over a few days.
 * In the prototype, submitting a project returns a structured example
 * immediately so the feedback loop can be tested end to end.
 */
export function createPrototypeFeedback(projectTitle: string): PortfolioFeedback {
  const date = new Date().toISOString().slice(0, 10)
  return {
    mentorId: 'mentor-lucas',
    summary: `A useful first pass at “${projectTitle}”. The work is clear, but the story needs a sharper problem statement and one concrete piece of evidence. Start with the outcome, then show the decisions that got you there.`,
    rubric: [
      {
        criterion: 'Clarity of the problem',
        score: 3,
        comment:
          'Say what was broken or at stake in one sentence before you describe the visuals.',
      },
      {
        criterion: 'Relevance to the work you want',
        score: 4,
        comment:
          'The project fits the kind of work you want more of. Make that link explicit.',
      },
      {
        criterion: 'Craft and presentation',
        score: 4,
        comment:
          'The layout is calm and readable. Give the main image more space and reduce the caption length.',
      },
      {
        criterion: 'Story and reflection',
        score: 3,
        comment:
          'Add one rejected direction and why you rejected it. That shows judgement, not just output.',
      },
    ],
    annotations: [
      {
        area: 'Opening image',
        note: 'Lead with the strongest finished piece. Remove the process shot from the first screen.',
      },
      {
        area: 'Problem statement',
        note: 'Rewrite this in the client’s language, not the design language.',
      },
      {
        area: 'Outcome',
        note: 'Add a specific result, a quote or a measurable change.',
      },
    ],
    revisionHistory: [
      {
        version: 1,
        date,
        note: 'Initial submission for review.',
      },
    ],
  }
}
