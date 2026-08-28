export const profile = {
  name: "Md Faizan Ali",
  role: "Full-Stack Engineer",
  location: "Bengaluru, India",
  email: "faizanaliwhb@gmail.com",
  phone: "+91 7070524454",
  // Engagement types, not a boolean — drives the hero eyebrow and the Status field.
  availability: ["Freelance", "Contract", "Full-time"],
  // The display line. Short enough to set at display-lg, and it claims both ends
  // of the stack rather than the interface alone.
  statement: "I build the interface and the API behind it.",
  // The supporting paragraph. What he does, not what he is "passionate about".
  positioning:
    "A year on a production SaaS app — component systems and real API states on one side, schema, auth, and the endpoints behind them on the other. The edge cases nobody specs are the actual job.",
  links: {
    github: "https://github.com/thisisfaizanali",
    linkedin: "https://linkedin.com/in/md-faizan-ali",
    leetcode: "https://leetcode.com/u/thisisfaizanali",
    resume: "/Md-Faizan-Ali.pdf",
  },
} as const;

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  live: string;
  repo: string;
  /** [0] is the card + case-study hero image, [1] a supporting shot. */
  images: string[];
  stack: string[];
  summary: string;
  problem: string;
  build: { heading: string; body: string }[];
  decisions: { call: string; why: string }[];
};

export const projects: Project[] = [
  {
    slug: "resumind",
    index: "01",
    title: "Resumind",
    tagline: "ATS scoring and job-specific feedback, with no backend at all.",
    year: "2025",
    role: "Design & build",
    live: "https://ai-resume-analyzer-gilt-kappa.vercel.app/",
    repo: "https://github.com/thisisfaizanali/ai-resume-analyzer",
    images: ["/work/resumind-upload.png", "/work/resumind.png"],
    stack: ["React Router v7", "TypeScript", "Puter.js", "Zustand", "Tailwind CSS", "Vite"],
    summary:
      "An AI resume analyzer that scores a CV against a specific job description and returns structured, actionable feedback — running auth, file storage, and model inference entirely client-side.",
    problem:
      "Generic resume checkers grade you against nothing in particular. You get a number and no idea what to change. I wanted the opposite: paste the job you actually want, get feedback tied to that posting. The catch was cost — an AI tool with per-user file storage and inference normally means a server, a database, and a bill that grows with every visitor.",
    build: [
      {
        heading: "No backend, on purpose",
        body: "Puter.js handles auth, file storage, and model inference from the browser, billed to the end user rather than to me. That removed the entire server tier: no API routes to secure, no keys to leak, no database to run. The whole app deploys as static output.",
      },
      {
        heading: "A scoring pipeline, not a single prompt",
        body: "Feedback comes from structured prompts that return typed JSON — ATS compatibility, tone, content, structure, and skills, each with its own score and specific fixes. Parsing into a schema instead of rendering raw model prose is what makes the results renderable and comparable across runs.",
      },
      {
        heading: "A dashboard that survives real use",
        body: "Uploads accumulate fast, so the tracker got search, sort, archive and restore, inline editing, and one-click export of feedback to a text file. Global state runs through Zustand — a small store beat prop-drilling across the upload, results, and dashboard routes.",
      },
    ],
    decisions: [
      {
        call: "Client-side inference over a Node API layer",
        why: "Kept hosting free and stateless. The tradeoff is a hard dependency on an external SDK and no server-side rate limiting — acceptable for a tool where each user brings their own quota.",
      },
      {
        call: "Typed JSON responses over free-form model output",
        why: "Made the UI deterministic. A malformed response fails one card instead of blanking the page.",
      },
      {
        call: "React Router v7 over Next.js",
        why: "The app is genuinely client-heavy — there is no SSR to gain when every operation happens in the browser. Less machinery for the same result.",
      },
    ],
  },
  {
    slug: "pocket-ledger",
    index: "02",
    title: "Pocket Ledger",
    tagline: "An installable expense tracker built around speed of entry.",
    year: "2025",
    role: "Design & build",
    live: "https://pocket-ledger-peach.vercel.app/",
    repo: "https://github.com/thisisfaizanali/pocket-ledger",
    images: ["/work/pocket-ledger.png", "/work/pocket-ledger-expenses.png"],
    stack: ["Next.js", "TypeScript", "Prisma", "Auth.js", "Recharts", "shadcn/ui"],
    summary:
      "A budgeting PWA with per-category monthly limits, 18-currency support, and a command palette — installable, themed, and fast enough to log an expense before you put your phone away.",
    problem:
      "Expense trackers die from friction. If logging a coffee takes six taps and two dropdowns, you stop logging coffees, and a ledger with gaps is worse than no ledger at all. Everything here was built against one constraint: entry has to be quicker than the excuse not to do it.",
    build: [
      {
        heading: "Keyboard-first, then touch-first",
        body: "A Cmd+K command palette jumps to any route or starts a new entry without touching the mouse. On mobile that same surface becomes a sheet. The PWA installs to the home screen so it opens like an app instead of a tab.",
      },
      {
        heading: "Budgets you can read at a glance",
        body: "Per-category monthly limits render as live progress bars with explicit under and over states. Colour is doing secondary work — the label and the number carry the meaning, so it still reads correctly in greyscale or with a colour-vision deficiency.",
      },
      {
        heading: "Multi-currency that respects local convention",
        body: "18 currencies, each formatted the way its own region actually writes money — lakh grouping for INR and PKR, comma-decimals for EUR, RUB, and BRL — rather than bolting a different symbol onto one Western format. Sixteen preset categories cover entry without turning it into a taxonomy exercise.",
      },
      {
        heading: "Analytics, and an exit door",
        body: "Recharts covers monthly trends and category breakdowns; one-click CSV export means the data is never hostage to the app. Auth.js handles Google and GitHub sign-in, with Prisma over Postgres underneath.",
      },
    ],
    decisions: [
      {
        call: "Per-locale formatting over one Western default",
        why: "An Indian user reading ₹37,276.07 grouped in thousands knows immediately the app was not built for them. Regional grouping is a small amount of work that decides whether the numbers feel native.",
      },
      {
        call: "CSV export from day one",
        why: "A ledger people cannot get their data out of is a ledger they will not commit to. The exit door is what makes the app worth entering.",
      },
      {
        call: "PWA over a React Native build",
        why: "One codebase, instant updates, no store review. Gives up native widgets and background sync — neither of which this app needs.",
      },
    ],
  },
];

export const experience = [
  {
    company: "SOPSage",
    role: "Frontend Developer",
    mode: "Remote",
    from: "May 2025",
    to: "July 2026",
    points: [
      "Shipped responsive UI across 40+ routes of a production SaaS application using Next.js App Router, React, and TypeScript.",
      "Built the shared component library — data tables, multi-step forms, modals, approval flows — on shadcn/ui and Tailwind, standardising patterns and cutting the time to ship each new feature.",
      "Integrated REST APIs with deliberate loading, error, and empty states, plus JWT auth with token refresh, removing a recurring class of edge-case UI bugs.",
      "Implemented client state with Zustand and React Context, and role-based, feature-flagged navigation for permission-aware views.",
    ],
  },
  {
    company: "Oasis Infobyte",
    role: "Web Development Intern",
    mode: "Remote",
    from: "Nov 2024",
    to: "Dec 2024",
    points: [
      "Built and deployed several responsive web applications, applying semantic HTML, responsive CSS, and component-based JavaScript for consistent cross-device UI.",
    ],
  },
] as const;

export const achievements = [
  { figure: "700+", label: "DSA problems solved", note: "LeetCode and GeeksforGeeks" },
  { figure: "Rank 2", label: "Institute leaderboard", note: "GeeksforGeeks, among all CS peers" },
  { figure: "587", label: "of 10,000+ entrants", note: "GfG Weekly Contest 167" },
] as const;

export const stack = [
  { group: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "C / C++", "SQL"] },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Zustand",
      "React Context",
      "HTML5",
      "CSS3",
    ],
  },
  { group: "Backend & data", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Prisma"] },
  { group: "Tooling", items: ["Git", "GitHub", "Vercel", "Netlify", "Postman", "VS Code"] },
] as const;

export const education = {
  school: "JSS Academy of Technical Education",
  degree: "B.E. Computer Science and Engineering",
  place: "Bengaluru, Karnataka",
  from: "Dec 2020",
  to: "June 2024",
  points: [
    "Built the core CS foundation the engineering work still runs on — data structures and algorithms, DBMS, operating systems, and computer networks.",
    "Where the algorithmic habit started, and kept going well past the syllabus: 700+ problems solved and Institute Rank 2 on the GeeksforGeeks leaderboard.",
    "Taught myself the modern web stack — React, Next.js, and TypeScript — alongside the degree, and turned it into internship and full-time engineering work.",
  ],
} as const;
