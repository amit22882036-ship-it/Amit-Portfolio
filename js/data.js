/*
 * All portfolio content lives here. Edit this file to update the site;
 * the page (and later the PDF version) is generated from it.
 */
window.PORTFOLIO = {
  person: {
    name: "Amit Gertner",
    firstName: "Amit",
    email: "amit22882036@gmail.com",
    linkedin: "https://www.linkedin.com/in/amit-gertner",
    github: "https://github.com/amit22882036-ship-it",
  },

  // The 20-second version for recruiters.
  quickFacts: [
    { icon: "fa-solid fa-magnifying-glass", label: "Looking for", value: "A student role in software, data or machine learning" },
    { icon: "fa-solid fa-graduation-cap", label: "Studying", value: "B.Sc. Data Science & Engineering, Technion · 2022–2027" },
    { icon: "fa-solid fa-code", label: "Core stack", value: "Python · SQL · FastAPI · PySpark · LangChain · React" },
    { icon: "fa-solid fa-language", label: "Languages", value: "Hebrew (native) · English (fluent)" },
  ],

  about: [
    "I’m Amit Gertner, a <strong>Data Science and Engineering student at the Technion</strong>. I built AI Agent Control Center so a developer can give one coding agent a task, watch it delegate work, and review the changes in one place. The part I wanted to get right was bringing parallel changes back together.",
    "My first engineering team built robots. As drafting lead, I had to make drawings clear enough for a teammate to build from. Later, guiding visitors at the Technion taught me to ask what someone wants to understand before I start explaining. I bring both habits to software and data work.",
  ],

  skills: [
    { group: "Languages", items: ["Python", "SQL", "Java", "C", "R"] },
    { group: "Backend & APIs", items: ["FastAPI", "Flask", "REST APIs", "Server-Sent Events"] },
    { group: "Data & ML", items: ["PySpark", "Databricks", "Pandas", "NLP", "Model evaluation"] },
    { group: "AI engineering", items: ["AI agents", "RAG", "LangChain", "Pinecone"] },
    { group: "Databases", items: ["PostgreSQL", "SQLite", "Supabase"] },
    { group: "Tools", items: ["Git & worktrees", "GitHub", "Linux", "React", "Claude Code", "Codex"] },
  ],

  grades: [
    ["The Human Factor in Data Collection", 100],
    ["Data Analysis and Visualization", 98],
    ["Optimization Methods in Machine Learning", 98],
    ["Statistics 2", 97],
    ["Foundations and Applications of Artificial Intelligence", 96],
  ],

  coursework: [
    "Data Structures and Algorithms",
    "Computer Architecture and Operating Systems",
    "Software Engineering",
    "Database Management",
    "Distributed Data Management",
    "Distributed Information Systems",
    "Computability and Complexity",
    "Artificial Intelligence",
  ],

  hobbies: [
    { icon: "fa-solid fa-basketball", title: "Basketball", text: "On the court whenever I can find a game." },
    { icon: "fa-solid fa-dragon", title: "Anime", text: "A good arc is a good arc." },
    { icon: "fa-solid fa-film", title: "Movies & series", text: "Always one episode behind on something." },
    { icon: "fa-solid fa-flask", title: "Building & exploring", text: "Taking things apart to see how they work." },
    { icon: "fa-solid fa-cookie-bite", title: "Sweets", text: "Debugging runs on sugar." },
  ],

  journey: [
    {
      years: "2014 – 2017",
      place: "Holon",
      title: "High school & FIRST Robotics",
      icon: "fa-solid fa-robot",
      sky: "dawn",
      text: "Efrayim Katsir High School, majoring in Computer Science, Mathematics and English. I led the drafting team in FIRST Robotics: we won two national championships and represented Israel at the World Championship in the US. Graduated with honors.",
    },
    {
      years: "2017 – 2020",
      place: "Israel Defense Forces",
      title: "Combat soldier, Artillery Corps",
      icon: "fa-solid fa-shield-halved",
      sky: "day",
      text: "Selected for the Battalion Commander’s Forward Command Team, working directly with senior officers in dynamic, high-pressure situations. Honorable discharge with a certificate of excellence from the Battalion Commander.",
    },
    {
      years: "2021 – 2022",
      place: "Technion, Haifa",
      title: "Pre-academic program (Mechina)",
      icon: "fa-solid fa-book-open",
      sky: "day",
      text: "A rigorous preparatory year of advanced mathematics, physics, English and scientific writing.",
    },
    {
      years: "2022 – 2027",
      place: "Technion, Haifa",
      title: "B.Sc. Data Science & Engineering",
      icon: "fa-solid fa-graduation-cap",
      sky: "dusk",
      text: "Computer science, statistics and machine learning. Alongside the degree I guided prospective students, donors and international delegations at the Technion Visitors Center, and built three projects in AI agents, data engineering and applied AI.",
    },
    {
      years: "Today",
      place: "Your team?",
      title: "Looking for my next challenge",
      icon: "fa-solid fa-rocket",
      sky: "night",
      text: "I’m looking for a student role in software development, data or machine learning, where I can take ownership and grow alongside an experienced team.",
      cta: true,
    },
  ],

  projects: [
    {
      id: "agent",
      title: "AI Agent Control Center",
      category: "Windows desktop app · Multi-agent orchestration",
      status: "In active development",
      pitch: "Give one coding agent a task, watch it delegate to helpers in isolated Git worktrees, and review every change before it lands.",
      cover: "assets/img/projects/ai-agent-control-center/film-cover.webp",
      coverAlt: "AI Agent Control Center walkthrough cover",
      video: {
        src: "assets/img/projects/ai-agent-control-center/AI-Agent-Control-Center-16x9.mp4",
        poster: "assets/img/projects/ai-agent-control-center/film-cover.webp",
        captions: "assets/img/projects/ai-agent-control-center/promo.en.vtt",
        label: "Watch the 45-second demo",
      },
      tags: ["React", "Python", "FastAPI", "SQLite", "Git worktrees", "Server-Sent Events"],
      links: [
        { label: "View code", url: "https://github.com/amit22882036-ship-it/ai-agent-control-center", icon: "fa-brands fa-github" },
      ],
      story: [
        { p: "I built AI Agent Control Center to run a team of coding agents on one repository. In one window, I can see who needs an answer, what each helper owns, and which changes are ready to review." },
        { h: "How agents work together" },
        { p: "A lead can delegate parts of a task to helpers. The backend checks capacity, delegation depth and overlapping work before starting them. Each helper works in its own Git worktree. The lead can accept a result after integration checks pass, and you can inspect the changed files before applying the finished task to your project." },
        { h: "Where people step in" },
        { p: "Connect Claude Code, Codex or Gemini CLI through your own account. The Work Map shows who delegated what, and the live Work List brings questions to the top. Reply in place, redirect an agent, or pause and resume a task." },
        { h: "What survives a restart" },
        { p: "SQLite keeps task history and records integration progress for recovery. Windows Job Objects tie each process tree to the app so a stop or crash also terminates its workers. Each task has an explicit access level, and helpers need separate permission for Full Access." },
      ],
      gallery: [
        { src: "assets/img/projects/ai-agent-control-center/delegation-map.webp", alt: "Work Map for a CSV import pipeline: one helper needs an answer, another is writing a report, and the CLI changes have been integrated." },
        { src: "assets/img/projects/ai-agent-control-center/agent-reply.webp", alt: "Work List with an agent’s question open and a reply being typed beside the task." },
        { src: "assets/img/projects/ai-agent-control-center/task-detail.webp", alt: "Dark-mode task view showing the request, progress, results and responsible agent." },
      ],
      galleryNote: "Screenshots from the desktop interface using demo tasks.",
    },
    {
      id: "hotel",
      title: "Check-in To Reality",
      category: "Data engineering · NLP & model evaluation",
      pitch: "Where do hotel listings and guest reviews disagree? A PySpark pipeline joins listings, reviews and nearby places, and a Flask app puts the gaps on a map.",
      cover: "assets/img/projects/hotel-reality-gap/screenshot2.png",
      coverAlt: "Hotel map with location markers and filters",
      tags: ["Python", "PySpark", "Databricks", "NLP", "Flask", "PostgreSQL"],
      links: [
        { label: "Live demo", url: "https://checkin-to-reality.onrender.com", icon: "fa-solid fa-arrow-up-right-from-square" },
        { label: "Web app code", url: "https://github.com/amit22882036-ship-it/checkin-to-reality", icon: "fa-brands fa-github" },
        { label: "Core notebooks", url: "https://github.com/amit22882036-ship-it/checkin-to-reality-core", icon: "fa-solid fa-book" },
      ],
      story: [
        { p: "A listing can promise a quiet, well-connected hotel. Do guests describe the same place? Check-in To Reality brings listing claims, guest reviews and nearby places together so travelers can explore the gaps on a map." },
        { h: "What counts as nearby?" },
        { p: "The PySpark pipeline groups hotels and places of interest by city and geohash. It searches neighboring cells, then checks the actual distance before counting a place as nearby. This keeps a hotel near a cell boundary connected to amenities across the street." },
        { h: "How the model was evaluated" },
        { p: "The notebooks extract complaints, praise and sentiment from review text and compare Random Forest and gradient-boosted regressors on a held-out split using RMSE, MAE and R². Guest review scores provide the prediction target." },
        { h: "Explore the results" },
        { p: "The map and comparison views use scores calculated in Databricks and served by Flask and PostgreSQL." },
      ],
      gallery: [
        { src: "assets/img/projects/hotel-reality-gap/screenshot2.png", alt: "Hotel map with location markers and filters for exploring nearby properties." },
        { src: "assets/img/projects/hotel-reality-gap/screenshot4.png", alt: "Comparison view with two hotel profiles and side-by-side feature charts." },
        { src: "assets/img/projects/hotel-reality-gap/screenshot3.png", alt: "Search results with review signals and filters for individual hotels." },
      ],
    },
    {
      id: "agri",
      title: "Agri-Advisor",
      category: "Applied AI · Hebrew-language assistant",
      pitch: "Ask about a crop in Hebrew and follow up in the same conversation. The assistant combines agricultural manuals with local weather history.",
      cover: "assets/img/projects/agri-advisor/screenshot1.png",
      coverAlt: "Hebrew chat with agricultural guidance",
      tags: ["Python", "FastAPI", "LangChain", "Pinecone", "Supabase", "RAG"],
      links: [
        { label: "Live demo", url: "https://argiagent.onrender.com", icon: "fa-solid fa-arrow-up-right-from-square" },
        { label: "View code", url: "https://github.com/amit22882036-ship-it/ArgiAgent", icon: "fa-brands fa-github" },
      ],
      story: [
        { p: "A grower can ask a question in Hebrew, add a location, and follow up in the same conversation. The assistant combines guidance from agricultural manuals with historical weather observations for the area." },
        { h: "Finding relevant guidance" },
        { p: "The backend splits agricultural PDFs into passages and indexes them in Pinecone. A LangChain retrieval tool searches with several phrasings of a question to find relevant passages even when a grower uses different wording from the manual." },
        { h: "Putting the weather in context" },
        { p: "A separate tool resolves city names and summarizes stored observations by day. It caches those summaries so a follow-up about the same area can reuse them." },
        { h: "A conversation in Hebrew" },
        { p: "The FastAPI backend streams the answer to the chat and stores the conversation in Supabase. A follow-up question can refer back to the crop or location discussed earlier." },
      ],
      gallery: [
        { src: "assets/img/projects/agri-advisor/screenshot1.png", alt: "Hebrew chat showing a user's questions, agricultural guidance and the conversation sidebar." },
        { src: "assets/img/projects/agri-advisor/screenshot2.png", alt: "Agri-Advisor conversation view." },
      ],
    },
  ],

  // Timeline chapters, newest first. Card types: quote, stat, grades, role, tags, hobbies, badge, note.
  timeline: [
    {
      chapter: "Now",
      years: "2026",
      cards: [
        { type: "quote", text: "I enjoy connecting analytical thinking with hands-on development: understanding how things work, exploring different approaches, and turning ideas into working applications.", by: "Amit" },
        { type: "note", icon: "fa-solid fa-rocket", title: "Open to opportunities", text: "Looking for a student role in software development, data or machine learning, where I can contribute, take ownership and grow alongside an experienced team.", cta: true },
        { type: "hobbies", title: "Off the clock" },
      ],
    },
    {
      chapter: "Technion",
      years: "2022 – 2027",
      cards: [
        { type: "role", icon: "fa-solid fa-graduation-cap", kicker: "B.Sc. · Technion – Israel Institute of Technology", title: "Data Science & Engineering", text: "Computer science, statistics and machine learning, with a focus on algorithms, data management and software systems. I apply it through hands-on projects in distributed data processing, NLP and AI-powered applications." },
        { type: "grades", title: "Academic highlights" },
        { type: "role", icon: "fa-solid fa-person-chalkboard", kicker: "Technion Visitors Center", title: "Campus guide", text: "Guided prospective students, donors and visiting delegations from Israel and abroad, including ambassadors. It taught me to ask what someone wants to understand before I start explaining." },
        { type: "projects", title: "Three projects, built end to end" },
        { type: "tags", title: "Relevant coursework", source: "coursework" },
      ],
    },
    {
      chapter: "Mechina",
      years: "2021 – 2022",
      cards: [
        { type: "role", icon: "fa-solid fa-book-open", kicker: "Technion pre-academic program", title: "The warm-up year", text: "A rigorous program of advanced mathematics, physics, English and scientific writing that prepared me for the degree." },
      ],
    },
    {
      chapter: "IDF",
      years: "2017 – 2020",
      cards: [
        { type: "role", icon: "fa-solid fa-shield-halved", kicker: "Artillery Corps", title: "Battalion Commander’s Forward Command Team", text: "Selected to serve on the commander’s forward team as a combat soldier, working directly with senior officers in dynamic, high-pressure situations." },
        { type: "badge", icon: "fa-solid fa-award", title: "Certificate of excellence", text: "Honorable discharge with a certificate of excellence and recommendation from the Battalion Commander." },
      ],
    },
    {
      chapter: "High school",
      years: "2014 – 2017",
      cards: [
        { type: "stat", value: "2×", label: "National champions in FIRST Robotics, then Israel’s representative at the World Championship in the US", tone: "blue", kicker: "FIRST Robotics" },
        { type: "role", icon: "fa-solid fa-robot", kicker: "FIRST Robotics (FRC & FLL)", title: "Drafting team lead", text: "My first engineering team built robots. As drafting lead, I had to make drawings clear enough for a teammate to build from." },
        { type: "badge", icon: "fa-solid fa-star", title: "Graduated with honors", text: "Efrayim Katsir High School, Holon. Majors in Computer Science, Mathematics and English." },
      ],
    },
  ],
};
