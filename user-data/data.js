export const socialLinks = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/amit-gertner", // תוכל לעדכן כאן ללינק המדויק שלך
    icon: "fab fa-linkedin",
    color: "#0077B5"
  },
  {
    platform: "GitHub",
    url: "https://github.com/amit22882036-ship-it",
    icon: "fab fa-github",
    color: "#333"
  }
];

export const bio = [
  "I’m Amit Gertner, a <strong>Data Science and Engineering student at the Technion</strong>. I built AI Agent Control Center so a developer can give one coding agent a task, watch it delegate work, and review the changes in one place. The part I wanted to get right was bringing parallel changes back together. I tested that with a Codex lead agent and two helpers. Each helper worked in its own Git workspace, and the lead accepted both results after the integration checks passed.",
  "My first engineering team built robots. As drafting lead, I had to make drawings clear enough for a teammate to build from. Later, guiding visitors at the Technion taught me to ask what someone wants to understand before I start explaining. I bring both habits to software and data work. In Check-in To Reality, I connected hotel listings, guest reviews and nearby places, then put the results on a map so travelers could judge a hotel’s claims for themselves."
];

export const skills = [
  {
    category: "Programming Languages",
    items: ["Python", "C", "Java", "SQL", "R", "HTML"],
  },
  {
    category: "Data & Machine Learning",
    items: [
      "Machine Learning",
      "Pandas",
      "Spark",
      "PySpark",
      "Matplotlib",
      "NLP & sentiment analysis",
    ],
  },
  {
    category: "Web Development & APIs",
    items: [
      "FastAPI",
      "Flask",
      "LangChain",
    ],
  },
  {
    category: "Databases & Cloud",
    items: [
      "PostgreSQL",
      "Pinecone",
      "Supabase",
      "Databricks",
    ],
  },
];



export const education = [
  {
    title: "B.Sc. in Data Science and Engineering",
    duration: "2022 - present",
    subtitle: "Technion Israel Institute of Technology",
    overview: "My degree combines computer science, statistics and machine learning. Algorithms, data structures and database systems taught me how to organize and process data. Statistics and optimization gave me ways to compare models and judge how well they work on new examples. I brought those subjects together in my hotel analysis, using distributed processing to join location data with reviews and evaluating models against guest scores.",
    details: [
      "Data Analysis and Visualization · 98/100",
      "Optimization Methods in Machine Learning · 98/100",
      "Foundations and Applications of Artificial Intelligence · 96/100",
      "Worked as a guide at the Technion Visitors Center, leading tours for prospective students, donors and visiting delegations from Israel and abroad."
    ],
    tags: [],
    icon: "graduation-cap",
  },
  {
    title: "Pre-Academic Preparatory Program (Mechina)",
    duration: "2021 - 2022",
    subtitle: "Technion Israel Institute of Technology",
    details: [
      "Studied mathematics, physics and scientific writing."
    ],
    tags: [],
    icon: "book-open",
  },
  {
    title: "High School Diploma",
    duration: "2014 - 2017",
    subtitle: "Efrayim Katsir High School, Holon",
    details: [
      "Led the drafting team in FIRST Robotics. Our team won two national championships and represented Israel at the World Championship."
    ],
    tags: [],
    icon: "school",
  },
];

export const experience = [
  {
    title: "Israel Defense Forces (IDF) – Artillery Corps",
    duration: "2017 - 2020",
    subtitle: "Combat Soldier, Battalion Commander's Forward Command Team",
    details: [
      "Selected to serve in the Battalion Commander's Forward Command Team, working directly with senior officers in highly dynamic and high-pressure environments.",
      "Operated communication and command-and-control systems, requiring quick decision-making, multitasking, and extreme reliability.",
      "Honorable discharge with a certificate of excellence/recommendation from the Battalion Commander."
    ],
    tags: ["Leadership", "Decision Making", "Multitasking", "Command & Control"],
    icon: "star",
  },
];

export const footer = [
  {
    label: "Links",
    data: [
      {
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/amit-gertner",
      },
      {
        text: "GitHub",
        link: "https://github.com/amit22882036-ship-it",
      },
    ],
  },
  {
    label: "copyright-text",
    data: ["Made with ♥ by Amit Gertner"],
  }
];

export const featuredProjects = [
  {
    title: "AI Agent Control Center",
    category: "Windows desktop app · Multi-agent orchestration",
    shortDescription: "Delegate coding tasks and review parallel Git changes in one Windows app.",
    description: "I verified the delegation workflow end to end with a real Codex lead and two helpers. The lead accepted both helpers’ results after integration. Claude Code completed an authenticated run, and Gemini CLI was exercised with a simulated provider. Automated backend, UI and browser tests cover the system using temporary databases, real Git repositories and simulated CLIs.",
    detailTemplate: "agent-control-story",
    videoAction: "Watch 45-second demo",
    tags: ["Electron", "React", "Python", "FastAPI", "SQLite", "Git worktrees", "Server-Sent Events"],
    github: "https://github.com/amit22882036-ship-it/ai-agent-control-center",
    demo: null,
    thumbnail: { url: "./images/projects/ai-agent-control-center/app-mark.svg", alt: "AI Agent Control Center logo, a lead agent connected to two helpers" },
    imageNote: "Screenshots from the desktop interface using demo tasks.",
    images: [
      { url: "./images/projects/ai-agent-control-center/delegation-map.webp", alt: "Work Map for a CSV import pipeline. One helper needs an answer, another is writing a report, and the CLI changes have been integrated." },
      { url: "./images/projects/ai-agent-control-center/agent-reply.webp", alt: "Work List with an agent’s question open and a reply being typed beside the task." },
      { url: "./images/projects/ai-agent-control-center/task-detail.webp", alt: "Dark-mode task view showing the CSV pipeline request, progress, results and responsible agent." }
    ]
  },
  {
    title: "Check-in To Reality",
    category: "Data engineering · NLP & model evaluation",
    shortDescription: "Where do hotel listings and guest reviews disagree?",
    detailTemplate: "hotel-story",
    description: "The map and comparison views use scores calculated in Databricks and served by Flask and PostgreSQL. The core repository contains the notebooks for data preparation, spatial joins and model evaluation.",
    thumbnail: { url: "./images/projects/hotel-reality-gap/thumbnail.png", alt: "Check-in To Reality project logo" },
    images: [
      { url: "./images/projects/hotel-reality-gap/screenshot2.png", alt: "Hotel map with location markers and filters for exploring nearby properties." },
      { url: "./images/projects/hotel-reality-gap/screenshot4.png", alt: "Comparison view with two hotel profiles and side-by-side feature charts." },
      { url: "./images/projects/hotel-reality-gap/screenshot3.png", alt: "Search results with review signals and filters for individual hotels." }
    ],
    tags: ["Python", "PySpark", "Databricks", "NLP", "Flask", "PostgreSQL"],
    github: "https://github.com/amit22882036-ship-it/checkin-to-reality",
    coreRepo: "https://github.com/amit22882036-ship-it/checkin-to-reality-core",
    demo: "https://checkin-to-reality.onrender.com"
  },
  {
    title: "Agri-Advisor",
    category: "Applied AI · Hebrew-language advisory tools",
    shortDescription: "Ask about a crop in Hebrew and follow up using local weather history.",
    detailTemplate: "agri-story",
    description: "The FastAPI backend streams the answer to the chat and stores the conversation in Supabase. A follow-up question can refer back to the crop or location discussed earlier.",
    thumbnail: { url: "./images/projects/agri-advisor/thumbnail.png", alt: "Agri-Advisor plant and circuit logo" },
    images: [
      { url: "./images/projects/agri-advisor/screenshot1.png", alt: "Hebrew chat showing a user's questions, agricultural guidance and the conversation sidebar." }
    ],
    tags: ["Python", "FastAPI", "LangChain", "Pinecone", "Supabase", "RAG"],
    github: "https://github.com/amit22882036-ship-it/ArgiAgent",
    demo: "https://argiagent.onrender.com"
  }
];
