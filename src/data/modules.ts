import type { Module } from '../types'

export const modules: Module[] = [
  {
    id: 'm1',
    slug: 'finding-your-first-client',
    title: 'Finding Your First Client',
    summary:
      'A practical, low-pressure plan for turning your network, portfolio and small conversations into paid work.',
    description:
      'Your first client is rarely a stranger. This module shows you where early work actually comes from, how to talk about what you do, and how to run a first conversation that ends with a clear next step.',
    topic: 'Getting started',
    level: 'Beginner',
    durationMins: 40,
    accent: 'purple',
    featured: true,
    lessons: [
      {
        id: 'm1-l1',
        slug: 'where-your-first-client-comes-from',
        title: 'Where your first client actually comes from',
        durationMins: 6,
        summary:
          'Most first clients arrive through warm, ordinary connections — not cold DMs or job boards.',
        blocks: [
          {
            type: 'paragraph',
            text: 'When you imagine finding your first client, you might picture a polished stranger on a job board choosing you from hundreds of applications. In reality, early freelance work usually arrives through people who already know your work: a lecturer, a former classmate, a family friend with a small business, or someone who saw a project you posted last month.',
          },
          {
            type: 'paragraph',
            text: 'That is good news. You do not need a huge audience to start. You need a small number of people who understand what you do and trust you enough to make an introduction.',
          },
          { type: 'heading', text: 'The three circles of early work' },
          {
            type: 'list',
            items: [
              'Circle one — people who know you: classmates, lecturers, family, former employers, people from church, gym or community projects.',
              'Circle two — people who know people who know you: a friend’s employer, an alumnus from your course, a local studio owner.',
              'Circle three — people who have seen your work online: someone who saved a post, shared your portfolio or found you through a search.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Most graduates spend all their energy on circle three because it feels more professional. But circle one converts fastest, because trust already exists. Start there, and let your online presence support the conversation rather than carry it alone.',
          },
          {
            type: 'callout',
            tone: 'example',
            title: 'A realistic first project',
            text: 'A neighbour runs a small catering business. She needs a menu refresh and social templates before the December rush. She has seen your student branding project on Instagram. That is a warm lead, not a favour — she has a real problem and you have a real skill.',
          },
          {
            type: 'paragraph',
            text: 'Write down ten people in circle one and circle two. Not to message all of them today. Just to make the invisible network visible again.',
          },
          {
            type: 'checklist',
            items: [
              'I can name at least ten people who know my work.',
              'I know which of them work with small businesses or creative teams.',
              'I have one recent project I can show in under a minute.',
            ],
          },
        ],
        takeaways: [
          'Warm connections convert faster than cold outreach.',
          'You do not need an audience to find a first client.',
          'Make your existing network visible before you try to expand it.',
        ],
      },
      {
        id: 'm1-l2',
        slug: 'turning-your-network-into-opportunities',
        title: 'Turning your network into opportunities',
        durationMins: 7,
        summary:
          'How to talk about your work without feeling pushy, and how to ask for introductions well.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Networking has a bad reputation because it is often taught as collecting contacts. A better frame is this: you are helping people understand what problems you can solve, so they can think of you when those problems appear.',
          },
          { type: 'heading', text: 'Lead with the problem, not the tool' },
          {
            type: 'paragraph',
            text: '“I’m a graphic designer” is true but hard to act on. “I help small food businesses look consistent on Instagram and in-store” gives people something specific to remember and repeat.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'The one-sentence test',
            text: 'Can someone repeat what you do to a friend after hearing it once? If not, simplify it. Use a problem, a type of client and a result.',
          },
          { type: 'heading', text: 'Ask for a conversation, not a job' },
          {
            type: 'paragraph',
            text: 'Asking for work puts pressure on the relationship. Asking for fifteen minutes to understand how someone found their first clients is easier to say yes to, and it often leads to work anyway.',
          },
          {
            type: 'quote',
            text: 'Would you be open to a short chat about how you got started? I’m trying to learn how small studios find their first clients, and I’d value your perspective.',
            attribution: 'A simple, low-pressure message',
          },
          { type: 'heading', text: 'Make the introduction easy' },
          {
            type: 'paragraph',
            text: 'If someone offers to introduce you, send them a short paragraph they can forward. Include what you do, who you help, one relevant project and the best way to reach you. Do the work of making the introduction easy.',
          },
          {
            type: 'checklist',
            items: [
              'Write a one-sentence description of who you help and how.',
              'Prepare a forwardable introduction of no more than four sentences.',
              'Ask for a conversation before you ask for work.',
            ],
          },
        ],
        takeaways: [
          'Be known for a problem you solve, not just a job title.',
          'Ask for perspective and conversation before asking for work.',
          'Make introductions easy by writing the forwardable message yourself.',
        ],
      },
      {
        id: 'm1-l3',
        slug: 'building-a-simple-outreach-system',
        title: 'Building a simple outreach system',
        durationMins: 8,
        summary:
          'A light weekly rhythm that keeps you visible without spending your whole week sending cold messages.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Outreach fails when it is a burst of activity followed by silence. A small, repeatable rhythm works better than a heroic week of sending fifty messages.',
          },
          { type: 'heading', text: 'The weekly minimum' },
          {
            type: 'list',
            items: [
              'Five warm follow-ups: reply to a conversation, share something useful, or check in with someone you met.',
              'Two new conversations: a studio, a small business or an alumnus you have not spoken to.',
              'One piece of visible work: a project detail, a process note or a finished piece with context.',
            ],
          },
          {
            type: 'paragraph',
            text: 'That is eight small actions a week. Keep them in one simple list. A spreadsheet is fine. The point is to make the work visible and repeatable, not to build an elaborate CRM.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Track the follow-up, not just the first message',
            text: 'Most replies come from the second or third touch. Build follow-up into the system from the start, and always give the other person an easy way to say “not now”.',
          },
          { type: 'heading', text: 'A simple message structure' },
          {
            type: 'list',
            items: [
              'Why them: mention something specific about their work or business.',
              'Why you: one sentence on the problem you solve.',
              'The ask: a small, clear next step.',
              'The proof: one link to relevant work.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Keep it short. The goal of the first message is not to close a project. It is to earn a reply.',
          },
          {
            type: 'checklist',
            items: [
              'I have one place where I track conversations and follow-ups.',
              'I have a weekly minimum I can actually keep.',
              'Every message has one clear, small ask.',
            ],
          },
        ],
        takeaways: [
          'Small, repeatable outreach beats occasional bursts.',
          'Plan the follow-up before you send the first message.',
          'Write messages that are easy to reply to.',
        ],
      },
      {
        id: 'm1-l4',
        slug: 'your-first-discovery-call',
        title: 'Your first discovery call',
        durationMins: 7,
        summary:
          'What to ask, what to listen for, and how to end a first call with a clear next step.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A discovery call is not a pitch. It is a structured conversation to find out whether you and the client are a good fit, and to understand the problem well enough to scope it.',
          },
          { type: 'heading', text: 'The five questions' },
          {
            type: 'list',
            items: [
              'What are you trying to achieve, and why now?',
              'What have you tried already?',
              'Who else is involved in approving the work?',
              'What does success look like in three months?',
              'What budget range have you set aside for this?',
            ],
          },
          {
            type: 'paragraph',
            text: 'The budget question can feel uncomfortable, but it saves everyone time. Ask it neutrally, and offer a range if the client is unsure.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Listen for the real problem',
            text: 'A client may ask for “a new logo” when the real problem is that their packaging looks inconsistent across stores. Repeat back what you heard before you propose a solution.',
          },
          { type: 'heading', text: 'Close with a next step' },
          {
            type: 'paragraph',
            text: 'Before the call ends, agree on what happens next and when. “I’ll send a short proposal by Thursday” is enough. Put it in writing afterwards so there is a shared record.',
          },
          {
            type: 'checklist',
            items: [
              'I asked about the problem, the decision-makers and the budget.',
              'I repeated the problem back in my own words.',
              'We agreed on a next step and a date before the call ended.',
            ],
          },
        ],
        takeaways: [
          'Discovery is about understanding, not pitching.',
          'Ask about budget early and neutrally.',
          'Always end with a clear, dated next step.',
        ],
      },
    ],
  },
  {
    id: 'm2',
    slug: 'pricing-your-creative-work',
    title: 'Pricing Your Creative Work',
    summary:
      'A calm, practical approach to pricing projects, quoting confidently and handling the awkward money conversation.',
    description:
      'Pricing is one of the fastest routes to feeling like a professional. This module gives you three pricing models, a way to calculate your day rate, and language for holding your price when a client pushes back.',
    topic: 'Business skills',
    level: 'Beginner',
    durationMins: 45,
    accent: 'teal',
    featured: true,
    lessons: [
      {
        id: 'm2-l1',
        slug: 'why-pricing-feels-hard',
        title: 'Why pricing feels hard — and how to fix it',
        durationMins: 8,
        summary:
          'The hidden reasons creative people undercharge, and the three numbers you need before you quote.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Most freelancers do not undercharge because they are bad at maths. They undercharge because pricing feels personal. A quote can feel like a judgement of your worth, and it is easy to drop the number to avoid an awkward silence.',
          },
          {
            type: 'paragraph',
            text: 'The fix is not to become more confident overnight. It is to replace a feeling with a process. When you have a floor, a target and a clear scope, the number stops being a guess.',
          },
          { type: 'heading', text: 'The three numbers' },
          {
            type: 'list',
            items: [
              'Your floor: the minimum you need to cover costs and live. This is not a pricing strategy, but it is a boundary.',
              'Your target day rate: what you want to earn for a day of focused work, including the unpaid parts of running a business.',
              'Your project price: the target day rate multiplied by the time the project will realistically take — then adjusted for value and risk.',
            ],
          },
          {
            type: 'callout',
            tone: 'example',
            title: 'A simple worked example',
            text: 'You want to earn R18 000 per month after business costs. You can bill 12 days a month. Your floor day rate is R1 500. If you want a buffer for slow months, unpaid admin and growth, your target day rate might be R2 400.',
          },
          { type: 'heading', text: 'Charge for the work, not the hours you enjoy' },
          {
            type: 'paragraph',
            text: 'Clients are not paying for the hour you spend choosing a typeface. They are paying for the outcome: a clearer menu, a consistent brand, a portfolio that wins interviews. Price the outcome and the responsibility that comes with it.',
          },
          {
            type: 'paragraph',
            text: 'Finally, write your numbers down. A price you have already decided is much easier to say out loud than a number you invent in the meeting.',
          },
          {
            type: 'checklist',
            items: [
              'I know my monthly living and business costs.',
              'I have calculated a floor day rate and a target day rate.',
              'I have written my numbers down before quoting anyone.',
            ],
          },
        ],
        takeaways: [
          'Undercharging is usually a process problem, not a confidence problem.',
          'Know your floor, your target day rate and your project price.',
          'Price the outcome, not the hours.',
        ],
      },
      {
        id: 'm2-l2',
        slug: 'three-pricing-models',
        title: 'Three pricing models that work for freelancers',
        durationMins: 10,
        summary:
          'Hourly, fixed project and value-based pricing — when each one helps and when it hurts.',
        blocks: [
          {
            type: 'paragraph',
            text: 'There is no single correct way to price creative work. The right model depends on how clear the scope is, how much discovery is needed, and how much risk you are carrying.',
          },
          { type: 'heading', text: '1. Hourly pricing' },
          {
            type: 'paragraph',
            text: 'Hourly pricing is simple and fair when the work is open-ended: consulting, extra revisions, or ongoing support. The downside is that it punishes you for getting faster and makes clients nervous about every email.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Use hourly for uncertainty, not for whole projects',
            text: 'If the scope is still changing, bill discovery or additional work hourly. Quote the defined project as a fixed price.',
          },
          { type: 'heading', text: '2. Fixed project pricing' },
          {
            type: 'paragraph',
            text: 'Fixed pricing is the default for most design projects. The client knows the cost, you know the scope, and both sides can plan. It only works when the brief, deliverables, revision rounds and timeline are written down.',
          },
          {
            type: 'paragraph',
            text: 'Build in a buffer for the parts nobody enjoys: file preparation, meetings, feedback consolidation and handover. A fixed price without a scope is just a guess with consequences.',
          },
          { type: 'heading', text: '3. Value-based pricing' },
          {
            type: 'paragraph',
            text: 'Value-based pricing ties your fee to the outcome for the client. A brand refresh that helps a business open two new stores is worth more than the hours it took. This model requires a clear conversation about the value at stake, and it works best when you have proof and experience.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Do not discount to win a first project',
            text: 'A low price sets an expectation that is hard to raise later. If you need experience, offer a smaller scope at your normal rate rather than the same scope at half price.',
          },
          {
            type: 'checklist',
            items: [
              'I can explain the pricing model I use to a client.',
              'My fixed-price quote has a written scope.',
              'I know which parts of the work are hourly extras.',
            ],
          },
        ],
        takeaways: [
          'Hourly works for open-ended work; fixed price works for clear scopes.',
          'Value-based pricing needs proof and a value conversation.',
          'A smaller scope is a better discount than a lower rate.',
        ],
      },
      {
        id: 'm2-l3',
        slug: 'working-out-your-day-rate',
        title: 'Working out your day rate',
        durationMins: 9,
        summary:
          'A bottom-up calculation that includes the time you spend on admin, sales and learning.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A day rate is not your salary divided by twenty-two. Freelancers spend a large part of the week on work that is not billable: proposals, invoices, marketing, learning and admin. The day rate has to cover all of it.',
          },
          { type: 'heading', text: 'Start from the year you want' },
          {
            type: 'list',
            items: [
              'Decide the annual income you want to take home.',
              'Add business costs: software, equipment, internet, studio, insurance, accounting.',
              'Add tax and a buffer for slow months.',
              'Divide by the number of billable days you can realistically work in a year.',
            ],
          },
          {
            type: 'callout',
            tone: 'example',
            title: 'A South African example',
            text: 'Target take-home: R240 000. Business costs: R36 000. Tax and buffer: R60 000. Total needed: R336 000. At 18 billable days a month for 11 months, that is 198 days — a floor day rate of about R1 700. Add a growth margin and your target might be R2 300.',
          },
          { type: 'heading', text: 'Convert the day rate into a project price' },
          {
            type: 'paragraph',
            text: 'Estimate the project in half-days, not in optimistic “I can do this quickly” units. Include kick-off, research, concepts, revisions, production and handover. Multiply by your day rate, then check the number against the value of the outcome.',
          },
          {
            type: 'paragraph',
            text: 'If the result feels high, first check whether the scope is too large. It is usually better to remove a deliverable than to lower your rate.',
          },
          {
            type: 'checklist',
            items: [
              'My day rate covers business costs and unpaid admin time.',
              'I estimate projects in half-days with a buffer.',
              'I reduce scope before I reduce rate.',
            ],
          },
        ],
        takeaways: [
          'Billable days are far fewer than working days.',
          'Build tax, costs and slow months into the day rate.',
          'When a quote feels high, cut scope before cutting rate.',
        ],
      },
      {
        id: 'm2-l4',
        slug: 'quoting-and-holding-your-price',
        title: 'Quoting, negotiating and holding your price',
        durationMins: 10,
        summary:
          'How to present a quote, respond to “that’s too expensive”, and negotiate without giving away the work.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A quote is a communication exercise. The same number can feel reasonable or outrageous depending on how much context the client has. Present the price next to the problem, the outcome and what is included.',
          },
          { type: 'heading', text: 'Structure a quote in three parts' },
          {
            type: 'list',
            items: [
              'What we are solving: a short restatement of the client’s problem.',
              'What is included: deliverables, rounds, timeline and responsibilities.',
              'What it costs: one clear price, with optional extras listed separately.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Offer options, not discounts',
            text: 'If the client’s budget is lower, offer a smaller scope: one concept instead of three, one format instead of four. Keep the rate consistent.',
          },
          { type: 'heading', text: 'When the client says it is too expensive' },
          {
            type: 'paragraph',
            text: 'Do not apologise or immediately drop the price. Ask a question: “Which part feels out of line with your budget?” The answer tells you whether to reduce scope, split the project into phases, or walk away.',
          },
          {
            type: 'quote',
            text: 'I understand. The price reflects the full scope we discussed. If the budget is fixed, I can suggest a smaller first phase that delivers the most important part.',
            attribution: 'Holding the price while staying helpful',
          },
          { type: 'heading', text: 'Put the agreement in writing' },
          {
            type: 'paragraph',
            text: 'A quote is not an agreement until both sides confirm the scope, price, timeline and payment terms in writing. A short email confirming the details is better than nothing. A simple contract is better still.',
          },
          {
            type: 'checklist',
            items: [
              'Every quote restates the problem and the scope.',
              'I offer reduced scope instead of a discount.',
              'I confirm price, timeline and payment terms in writing.',
            ],
          },
        ],
        takeaways: [
          'Context makes a price feel fair.',
          'Negotiate scope, not your rate.',
          'Never start work without written confirmation.',
        ],
      },
    ],
  },
  {
    id: 'm3',
    slug: 'client-communication-and-briefs',
    title: 'Client Communication & Briefs',
    summary:
      'Turn a vague request into a clear brief, run a kick-off that prevents surprises and handle feedback calmly.',
    description:
      'Most project problems start before the design work begins. This module gives you the questions, documents and habits that keep a project on track.',
    topic: 'Client work',
    level: 'Beginner',
    durationMins: 30,
    accent: 'amber',
    featured: true,
    lessons: [
      {
        id: 'm3-l1',
        slug: 'the-brief-is-the-project',
        title: 'The brief is the project',
        durationMins: 8,
        summary:
          'A good brief defines the problem, the audience, the constraints and what success looks like.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A brief is not a form you fill in to keep a client happy. It is the shared definition of the problem. If the brief is vague, every review becomes a debate about what the project was supposed to be.',
          },
          { type: 'heading', text: 'The six questions every brief answers' },
          {
            type: 'list',
            items: [
              'What is the problem, in the client’s words?',
              'Who is the audience, and what do they need?',
              'What are the deliverables and formats?',
              'What are the constraints: budget, time, brand, technology?',
              'Who approves the work, and how many rounds are included?',
              'What does success look like?',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Beware the solution-shaped brief',
            text: '“We need a new logo” is a solution, not a problem. Ask what the logo needs to achieve. The answer might be recognition in a crowded market, credibility with suppliers, or consistency across packaging.',
          },
          {
            type: 'paragraph',
            text: 'Write the brief back to the client in your own words and ask them to confirm it. This one habit prevents a surprising number of revision cycles.',
          },
          {
            type: 'checklist',
            items: [
              'The brief states the problem, not just the deliverable.',
              'The audience and success measures are written down.',
              'The client has confirmed the brief in writing.',
            ],
          },
        ],
        takeaways: [
          'A brief is the shared definition of the problem.',
          'Ask what the deliverable needs to achieve.',
          'Confirm the brief back in writing before starting.',
        ],
      },
      {
        id: 'm3-l2',
        slug: 'running-a-kick-off',
        title: 'Running a kick-off that prevents surprises',
        durationMins: 9,
        summary:
          'A 30-minute kick-off agenda that aligns expectations, roles and communication.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A kick-off is not a formality. It is the moment to agree on how the project will run, who decides what, and how often you will communicate. Thirty focused minutes can save weeks of confusion.',
          },
          { type: 'heading', text: 'A 30-minute agenda' },
          {
            type: 'list',
            items: [
              'Five minutes: confirm the problem and success measures.',
              'Five minutes: walk through deliverables and the timeline.',
              'Five minutes: agree on approval roles and response times.',
              'Five minutes: choose the communication channel and meeting rhythm.',
              'Five minutes: confirm the next milestone and who does what.',
              'Five minutes: questions.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Name the approver',
            text: '“The team will review it” is a recipe for contradictory feedback. Ask who has final approval, and whether anyone else needs to be consulted before that person signs off.',
          },
          {
            type: 'paragraph',
            text: 'Send a short recap after the meeting. It does not need to be formal. A bullet list of decisions and next steps is enough, and it creates a record you can refer back to.',
          },
          {
            type: 'checklist',
            items: [
              'We agreed who has final approval.',
              'We agreed how feedback will be consolidated.',
              'We agreed the next milestone and date.',
              'I sent a written recap after the meeting.',
            ],
          },
        ],
        takeaways: [
          'Kick-offs align expectations before work begins.',
          'Name one final approver and one feedback channel.',
          'Send a written recap of decisions and next steps.',
        ],
      },
      {
        id: 'm3-l3',
        slug: 'feedback-and-scope-creep',
        title: 'Feedback, revisions and scope creep',
        durationMins: 9,
        summary:
          'How to receive feedback without losing the plot, and how to handle requests that fall outside the scope.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Feedback is not a verdict on your talent. It is information about how the work meets the brief. Your job is to separate useful signal from personal preference, and to keep the project moving.',
          },
          { type: 'heading', text: 'Consolidate before you respond' },
          {
            type: 'paragraph',
            text: 'Ask for feedback in one place, from one person, by a set date. When comments arrive in three WhatsApp threads and a phone call, you will spend more time reconciling them than acting on them.',
          },
          {
            type: 'callout',
            tone: 'example',
            title: 'Turn vague feedback into a decision',
            text: '“It feels flat” could mean the colour lacks contrast, the hierarchy is unclear, or the concept does not match the brand. Ask: “Which part feels flat — the colour, the layout or the idea?”',
          },
          { type: 'heading', text: 'Name scope creep early' },
          {
            type: 'paragraph',
            text: 'Scope creep is rarely malicious. A client asks for “one small extra” and another, and soon the project has doubled. The kindest response is a clear one: remind them what is included, and offer the extra as a separate piece of work with a price and timeline.',
          },
          {
            type: 'quote',
            text: 'That sounds useful. It sits outside the three concepts and two revision rounds in our scope, so I can add it as a separate phase. I’ll send a quick estimate so you can decide.',
            attribution: 'A calm scope-creep response',
          },
          {
            type: 'checklist',
            items: [
              'Feedback comes through one channel and one coordinator.',
              'I ask clarifying questions before redesigning.',
              'I name out-of-scope requests and price them separately.',
            ],
          },
        ],
        takeaways: [
          'Consolidate feedback before acting on it.',
          'Clarify vague comments with specific questions.',
          'Treat extra requests as new work, not free revisions.',
        ],
      },
    ],
  },
  {
    id: 'm4',
    slug: 'running-projects-and-getting-paid',
    title: 'Running Projects & Getting Paid',
    summary:
      'A simple project rhythm, milestone invoicing and a professional way to chase late payment.',
    description:
      'Good creative work still needs a plan. This module covers project tracking, deposits, milestone payments and the conversation nobody enjoys: chasing an overdue invoice.',
    topic: 'Client work',
    level: 'Intermediate',
    durationMins: 36,
    accent: 'blue',
    featured: false,
    lessons: [
      {
        id: 'm4-l1',
        slug: 'a-simple-project-plan',
        title: 'A simple project plan you will actually use',
        durationMins: 10,
        summary:
          'Break a project into milestones, define what “done” means and keep the client informed.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A project plan does not need to be a Gantt chart. For most freelance projects, a one-page milestone plan is enough: what happens, when, what you need from the client and what “done” looks like.',
          },
          { type: 'heading', text: 'Milestones, not tasks' },
          {
            type: 'list',
            items: [
              'Discovery complete: brief confirmed, research shared.',
              'Concept approved: one direction selected.',
              'Design complete: final artwork approved.',
              'Handover complete: files delivered and invoice issued.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Every milestone needs a client action',
            text: 'A milestone is not just something you deliver. It is a point where the client reviews, approves or provides something. Write that action into the plan so the timeline is shared.',
          },
          { type: 'heading', text: 'Keep a single source of truth' },
          {
            type: 'paragraph',
            text: 'Use one document or board for the plan, and one channel for decisions. If a decision happens on a call, write it down afterwards. The goal is that anyone can see the current state of the project without asking you.',
          },
          {
            type: 'paragraph',
            text: 'When a milestone slips, communicate early. A short message on the day you notice is far better than an apology after the deadline.',
          },
          {
            type: 'checklist',
            items: [
              'The project has four or five clear milestones.',
              'Each milestone names the client action required.',
              'There is one place where the plan and decisions live.',
            ],
          },
        ],
        takeaways: [
          'A one-page milestone plan is enough for most projects.',
          'Every milestone needs a client action.',
          'Communicate slips early, not after the deadline.',
        ],
      },
      {
        id: 'm4-l2',
        slug: 'milestones-approvals-and-deposits',
        title: 'Milestones, approvals and deposit invoices',
        durationMins: 11,
        summary:
          'How deposits, staged payments and written approvals protect both you and the client.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Getting paid is part of the project, not an afterthought. The payment structure should match the risk: the more time you invest before the first invoice, the more protection you need.',
          },
          { type: 'heading', text: 'A common structure' },
          {
            type: 'list',
            items: [
              '50% deposit to reserve the dates and begin discovery.',
              '25% on approval of the concept.',
              '25% on final handover, before final files are released.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Do not release final files before final payment',
            text: 'It is normal and professional to hold print-ready or source files until the final invoice is settled. Say this in the quote so there are no surprises.',
          },
          { type: 'heading', text: 'Written approval at every stage' },
          {
            type: 'paragraph',
            text: 'An approval email is a milestone. It confirms that the client is happy with the direction and that the next stage can begin. Keep approvals short: “Approved for next stage” with the date and the version is enough.',
          },
          {
            type: 'paragraph',
            text: 'If a client changes direction after approval, treat it as new work. This is not being difficult; it is how the project stays predictable for both sides.',
          },
          {
            type: 'checklist',
            items: [
              'The quote states the deposit and payment stages.',
              'Final files are released after final payment.',
              'Each stage has a written approval.',
            ],
          },
        ],
        takeaways: [
          'Match the payment structure to the risk.',
          'Hold final files until final payment is settled.',
          'Written approval marks the end of each stage.',
        ],
      },
      {
        id: 'm4-l3',
        slug: 'chasing-payment',
        title: 'Chasing payment without burning the bridge',
        durationMins: 9,
        summary:
          'A polite, firm escalation sequence for overdue invoices — and how to avoid the problem next time.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Late payment is common, and it is rarely personal. The best approach is calm, documented and predictable. Decide your sequence before you need it, so you are not writing the first message while angry.',
          },
          { type: 'heading', text: 'A four-step sequence' },
          {
            type: 'list',
            items: [
              'Day 1 after due date: a friendly reminder with the invoice attached and the due date restated.',
              'Day 7: a firmer follow-up asking for a payment date.',
              'Day 14: a phone call, plus a note that work will pause until payment is received.',
              'Day 30: a formal letter of demand or referral to your dispute process, depending on the amount.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Make it easy to pay',
            text: 'Include the amount, reference, banking details and a direct link or attachment in every message. Most delays are administrative, not malicious.',
          },
          {
            type: 'paragraph',
            text: 'Prevention is better than chasing. State payment terms in the quote, invoice immediately on handover, and add a late-payment fee if that is appropriate for your work. A clear process protects the relationship because it removes emotion from the conversation.',
          },
          {
            type: 'quote',
            text: 'I’m following up on invoice 014, which was due on 3 March. Could you confirm a payment date? I’ve attached the invoice again for convenience.',
            attribution: 'A firm but friendly first reminder',
          },
          {
            type: 'checklist',
            items: [
              'Payment terms are stated in the quote and invoice.',
              'I have a written reminder sequence.',
              'Every message includes the amount, reference and payment details.',
            ],
          },
        ],
        takeaways: [
          'Decide your escalation sequence before you need it.',
          'Keep reminders factual, calm and documented.',
          'Most late payments are administrative, not personal.',
        ],
      },
    ],
  },
  {
    id: 'm5',
    slug: 'building-a-portfolio-that-sells',
    title: 'Building a Portfolio That Sells',
    summary:
      'Curate fewer, stronger projects and write case studies that answer the questions clients actually ask.',
    description:
      'A portfolio is not an archive. It is an argument that you can solve a particular kind of problem. This module helps you choose the right work and present it clearly.',
    topic: 'Portfolio',
    level: 'Beginner',
    durationMins: 28,
    accent: 'rose',
    featured: true,
    lessons: [
      {
        id: 'm5-l1',
        slug: 'curate-dont-collect',
        title: 'Curate, don’t collect',
        durationMins: 8,
        summary:
          'Why five strong projects beat twenty average ones, and how to choose what to show.',
        blocks: [
          {
            type: 'paragraph',
            text: 'The temptation is to show everything you have ever made. The effect is usually the opposite of what you want: the viewer cannot tell what you are good at, so they remember nothing.',
          },
          {
            type: 'paragraph',
            text: 'A strong portfolio is a curated argument. Every project should support the story you want a client to believe about you.',
          },
          { type: 'heading', text: 'Choose projects with three qualities' },
          {
            type: 'list',
            items: [
              'Relevant: it looks like the work you want more of.',
              'Resolved: it shows a clear problem, process and outcome.',
              'Yours: you can explain your role honestly.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Student work is fine',
            text: 'You do not need paid client work to have a portfolio. A well-documented student project with a real brief, a clear process and a thoughtful outcome is more convincing than a vague “logo for a friend” piece.',
          },
          { type: 'heading', text: 'Cut the weakest piece' },
          {
            type: 'paragraph',
            text: 'If you have six projects, remove the weakest one. Then look again. The remaining work will feel more coherent, and the viewer will spend more time on the pieces that matter.',
          },
          {
            type: 'checklist',
            items: [
              'Every project is relevant to the work I want next.',
              'I can explain my role in each project.',
              'I have removed the weakest piece.',
            ],
          },
        ],
        takeaways: [
          'A portfolio is a curated argument, not an archive.',
          'Relevance, resolution and honesty matter more than volume.',
          'Student work can be strong if it is documented well.',
        ],
      },
      {
        id: 'm5-l2',
        slug: 'case-studies-that-answer-questions',
        title: 'Writing case studies that answer client questions',
        durationMins: 9,
        summary:
          'A simple structure: problem, constraints, process, decision, outcome.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A case study is not a gallery with captions. It is a short story that shows how you think. Clients are not only asking “is this pretty?” They are asking “can this person handle my problem?”',
          },
          { type: 'heading', text: 'A five-part structure' },
          {
            type: 'list',
            items: [
              'Problem: what was broken, missing or at stake?',
              'Constraints: time, budget, brand, technology or audience.',
              'Process: how you explored and narrowed the options.',
              'Decision: what you chose and why, including what you rejected.',
              'Outcome: what changed, with evidence if you have it.',
            ],
          },
          {
            type: 'callout',
            tone: 'example',
            title: 'Show the rejected option',
            text: 'One sentence about a direction you rejected — and why — often communicates more judgement than three polished final images. It shows the client you can make decisions, not just make things.',
          },
          {
            type: 'paragraph',
            text: 'Write the problem in the client’s language first, then explain your solution. Avoid starting with the tool you used. Nobody hires a Figma user; they hire someone who can clarify a messy brief.',
          },
          {
            type: 'paragraph',
            text: 'Keep each case study to a few minutes of reading. A clear structure is more impressive than a long one.',
          },
          {
            type: 'checklist',
            items: [
              'Each case study starts with the problem, not the solution.',
              'I show at least one key decision and why I made it.',
              'The outcome is specific, not “the client loved it”.',
            ],
          },
        ],
        takeaways: [
          'Case studies show how you think, not just what you made.',
          'Document constraints and rejected options.',
          'Write the problem in the client’s language.',
        ],
      },
      {
        id: 'm5-l3',
        slug: 'making-your-portfolio-easy-to-find',
        title: 'Making your portfolio easy to find and share',
        durationMins: 8,
        summary:
          'A simple online home, a one-page PDF and a link you can send in any conversation.',
        blocks: [
          {
            type: 'paragraph',
            text: 'You do not need a custom website to start. You need one reliable link that opens quickly on a phone, shows your best work and makes it easy to contact you.',
          },
          { type: 'heading', text: 'Three formats, one story' },
          {
            type: 'list',
            items: [
              'A hosted portfolio link for general sharing and social profiles.',
              'A one-page PDF for applications and email attachments.',
              'A short screen-share walkthrough for calls and interviews.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Test it on a phone',
            text: 'Many clients will first see your work on a phone between meetings. Check load time, text size and whether the first screen makes sense without scrolling.',
          },
          {
            type: 'paragraph',
            text: 'Include a clear contact route and say what kind of work you want. “Available for branding and packaging projects” is more useful than a generic contact form.',
          },
          {
            type: 'paragraph',
            text: 'Finally, keep the portfolio current. One new project every few months is enough. A small, living portfolio beats a perfect one that never ships.',
          },
          {
            type: 'checklist',
            items: [
              'I have one link I can share confidently.',
              'The portfolio works on a phone.',
              'It is clear what work I want and how to contact me.',
            ],
          },
        ],
        takeaways: [
          'One reliable link is enough to start.',
          'Design for the phone first.',
          'Say what work you want, not just what you have done.',
        ],
      },
    ],
  },
  {
    id: 'm6',
    slug: 'contracts-invoices-and-admin',
    title: 'Contracts, Invoices & Admin Basics',
    summary:
      'The minimum paperwork that protects your work, your time and your income.',
    description:
      'Admin is not the fun part of freelancing, but it is the part that lets you keep doing the fun part. This module covers simple contracts, invoices and records.',
    topic: 'Admin',
    level: 'Intermediate',
    durationMins: 34,
    accent: 'green',
    featured: false,
    lessons: [
      {
        id: 'm6-l1',
        slug: 'what-a-contract-must-cover',
        title: 'What a simple freelance contract must cover',
        durationMins: 10,
        summary:
          'Scope, payment, ownership, revisions, cancellation and confidentiality — in plain language.',
        blocks: [
          {
            type: 'paragraph',
            text: 'A contract does not need to be long or full of legal jargon. It needs to record what both sides agreed to, so that a disagreement does not become a guess. A one-page agreement is far better than a verbal understanding.',
          },
          { type: 'heading', text: 'The seven essentials' },
          {
            type: 'list',
            items: [
              'Parties: who is contracting with whom, with legal names and contact details.',
              'Scope: the deliverables, formats and number of revision rounds.',
              'Timeline: key dates and what the client must provide by when.',
              'Payment: amount, deposit, stages, due dates and late-payment terms.',
              'Ownership: when copyright or usage rights transfer to the client.',
              'Cancellation: what happens if either side stops the project.',
              'Confidentiality: what each side may share about the work.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Ownership is not automatic',
            text: 'In South Africa, copyright generally stays with the creator unless it is assigned in writing. Decide what the client is paying for: a licence to use the work, or full ownership. Put it in the contract.',
          },
          {
            type: 'paragraph',
            text: 'Use a template as a starting point, but read it and adapt it to the project. If the project is large or unusual, ask a legal professional to review it.',
          },
          {
            type: 'checklist',
            items: [
              'The contract names the deliverables and revision rounds.',
              'Payment stages and due dates are written down.',
              'Ownership and usage rights are explicit.',
            ],
          },
        ],
        takeaways: [
          'A short written agreement beats a verbal understanding.',
          'Scope, payment, ownership and cancellation are essential.',
          'Copyright must be assigned in writing if that is the deal.',
        ],
      },
      {
        id: 'm6-l2',
        slug: 'invoices-that-get-paid',
        title: 'Invoices that get paid on time',
        durationMins: 8,
        summary:
          'The details that make an invoice easy to approve and easy to pay.',
        blocks: [
          {
            type: 'paragraph',
            text: 'An invoice is a small piece of design work. Its job is to remove every reason for delay. If the client has to ask a question before paying, the invoice has failed.',
          },
          { type: 'heading', text: 'What to include' },
          {
            type: 'list',
            items: [
              'Your business name, address and contact details.',
              'A unique invoice number and issue date.',
              'The client’s legal name and billing details.',
              'A clear description of the work, linked to the quote or milestone.',
              'The amount, VAT treatment if applicable, and payment terms.',
              'Banking details and a payment reference.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Invoice on the milestone, not at the end of the month',
            text: 'Send the invoice as soon as the milestone is approved. Waiting for a monthly admin day adds unnecessary time to your cash flow.',
          },
          {
            type: 'paragraph',
            text: 'Use consistent numbering and keep a copy of every invoice. If you are registered for VAT, make sure the invoice meets the requirements of the VAT Act. If you are not sure, ask an accountant.',
          },
          {
            type: 'checklist',
            items: [
              'Every invoice has a unique number and clear description.',
              'Payment terms and reference are visible.',
              'Invoices are sent on the milestone date, not later.',
            ],
          },
        ],
        takeaways: [
          'An invoice should remove every reason for delay.',
          'Invoice at each milestone, not at the end of the month.',
          'Keep consistent records of every invoice.',
        ],
      },
      {
        id: 'm6-l3',
        slug: 'tax-records-and-staying-organised',
        title: 'Tax, records and staying organised',
        durationMins: 9,
        summary:
          'A simple monthly admin routine and the records you should keep as a freelancer.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Freelance admin becomes manageable when it is small and regular. One hour a month is usually enough to keep your records clear and your tax time calm.',
          },
          { type: 'heading', text: 'The monthly routine' },
          {
            type: 'list',
            items: [
              'File every invoice and receipt in one folder, named by date.',
              'Update your income and expense record.',
              'Check outstanding invoices and send reminders.',
              'Put aside a percentage of income for tax.',
              'Review your pipeline: what is confirmed, what is possible, what is quiet.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Tax is not a once-a-year surprise',
            text: 'As an independent contractor, you may need to register for provisional tax and submit returns. Rules depend on your income and circumstances. Speak to a registered tax practitioner rather than guessing.',
          },
          {
            type: 'paragraph',
            text: 'Keep records for at least five years unless a professional advises otherwise. That includes invoices, receipts, bank statements, contracts and any correspondence about payment.',
          },
          {
            type: 'paragraph',
            text: 'A simple folder structure and a monthly calendar reminder will do more for your business than an elaborate accounting system you never open.',
          },
          {
            type: 'checklist',
            items: [
              'I have one folder for invoices and receipts.',
              'I set aside money for tax when I get paid.',
              'I have a monthly admin reminder in my calendar.',
            ],
          },
        ],
        takeaways: [
          'Small, monthly admin prevents year-end panic.',
          'Keep invoices, receipts and contracts for at least five years.',
          'Get professional advice for tax registration and returns.',
        ],
      },
    ],
  },
]

export function getModuleBySlug(slug: string | undefined): Module | undefined {
  return modules.find((module) => module.slug === slug)
}

export function getLessonBySlug(module: Module, slug: string | undefined) {
  return module.lessons.find((lesson) => lesson.slug === slug)
}

export const moduleTopics = Array.from(
  new Set(modules.map((module) => module.topic)),
).sort()

export const moduleLevels = ['Beginner', 'Intermediate', 'Advanced'] as const
