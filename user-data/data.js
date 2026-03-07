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
  "Hello, I'm Amit Gertner!",
  "A <strong>Data Science and Engineering student</strong> at the Technion, bridging the gap between complex data analysis and robust software development.",
  "I specialize in building end-to-end, data-driven applications. My toolset includes Python, Spark, and SQL for data processes, alongside modern web frameworks (like FastAPI and Flask) for building scalable systems.",
  "I am passionate about solving complex problems and am currently seeking opportunities to leverage my analytical and engineering skills to build impactful, real-world solutions."
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
      "NLP (BERT)",
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
    title: "B.Sc. in Data Science and Information",
    duration: "2022 - present",
    subtitle: "Technion Israel Institute of Technology",
    details: [
      "Studied courses: Software Engineering, Data Structures & Algorithms, Computer Architecture & Operating Systems, Distributed Data Management, Database Management, Computability and Complexity, and Machine Learning.",
      "Enrolled in advanced courses including Fundamentals of Artificial Intelligence and The Human Factor in Data Collection."
    ],
    tags: ["Data Science", "Machine Learning", "Software Engineering", "Algorithms"],
    icon: "graduation-cap",
  },
  {
    title: "Pre-Academic Preparatory Program (Mechina)",
    duration: "2021 - 2022",
    subtitle: "Technion Israel Institute of Technology",
    details: [
      "Completed a highly rigorous academic program focusing on advanced Mathematics, Physics, English, and Scientific Writing."
    ],
    tags: ["Mathematics", "Physics", "English", "Scientific Writing"],
    icon: "book-open",
  },
  {
    title: "High School Diploma",
    duration: "2014 - 2017",
    subtitle: "Efrayim Katsir High School, Holon",
    details: [
      "Graduated with honors, majoring in Computer Science, English, and Mathematics.",
      "FIRST Robotics (FRC & FLL): Drafting Team Lead. Two-time National Champion and Israeli representative at the World Championship in the US."
    ],
    tags: ["Computer Science", "FIRST Robotics Competition", "Team Lead"],
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
    title: "Autonomous Agricultural Advisory Agent",
    shortDescription: "Full-stack AI advisory agent for agriculture.",
    description: "Agri-Advisor is an autonomous AI agricultural agent designed to empower Israeli farmers with data-driven insights through a natural conversational interface. Built on a sophisticated ReAct architecture, the agent utilizes OpenAI Tools to independently plan and execute complex tasks, such as retrieving real-time meteorological data and searching a high-fidelity knowledge base. The system features a robust Retrieval-Augmented Generation (RAG) pipeline that processes over 6,300 text chunks from professional manuals, optimized with MultiQuery retrieval and self-correction mechanisms to ensure highly accurate, hallucination-free responses. Developed with Python, FastAPI, and LangChain, the application ensures complete operational transparency by streaming the agent’s reasoning steps and tool execution directly to the user interface.",
    repoName: "agri-advisor",
    tags: ["Python", "FastAPI", "LangChain", "Pinecone", "Supabase", "ReAct", "RAG"],
    github: "https://github.com/amit22882036-ship-it/ArgiAgent.git", 
    demo: "https://argiagent.onrender.com"
  },
  {
    title: "Hotel Reality Gap Analysis",
    shortDescription: "Big-data pipeline and ML model for analyzing hotel reviews.",
    description: "Check-in To Reality is a comprehensive big data and machine learning platform that quantifies the discrepancy between hotel marketing promises and actual guest experiences. By integrating over 250,000 records from Booking.com, OpenStreetMap, and Google Maps, the project employs an innovative Geohashing strategy to perform complex spatial joins at scale within a PySpark and Databricks environment. The analytical core features a hybrid NLP pipeline combining BERT-based sentiment analysis with rule-based complaint detection to extract nuanced signals from thousands of guest reviews. These insights power a Gradient Boosted Trees model—achieving a high predictive accuracy of R^2 = 0.873 to identify 'Hidden Gems' and overrated properties, all served through a full-stack Flask application with a PostgreSQL backend and interactive map visualizations.",
    repoName: "hotel-reality-gap",
    tags: ["Python", "PySpark", "NLP (BERT)", "Flask", "PostgreSQL", "Databricks"],
    github: "https://github.com/amit22882036-ship-it/checkin-to-reality.git", 
    demo: "https://checkin-to-reality.onrender.com"
  }
];