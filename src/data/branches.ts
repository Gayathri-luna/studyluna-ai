export interface Branch {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  phases: { title: string; items: string[] }[];
  coreSkills: string[];
  projectIdeas: string[];
  careers: string[];
}

export const branches: Branch[] = [
  {
    slug: "ece",
    name: "Electronics & Communication",
    short: "ECE",
    tagline: "Chips, signals, embedded systems and wireless communication.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "Basic electronics: resistors, capacitors, diodes, transistors",
          "Digital logic and number systems",
          "C programming and problem solving",
          "Circuit simulation in LTspice or Multisim",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Signals & systems, analog and digital communication",
          "Microcontrollers (8051, AVR, ARM Cortex-M)",
          "Verilog / VHDL basics with FPGA boards",
          "MATLAB for signal processing",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: VLSI, Embedded, RF, DSP, or IoT",
          "Build 2 domain projects end to end",
          "Learn industry tools (Cadence, Vivado, Keil, ADS)",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "Aptitude + core interview preparation",
          "GATE or PSU exam prep if targeting government roles",
          "Portfolio, resume and LinkedIn polish",
        ],
      },
    ],
    coreSkills: ["Verilog", "Embedded C", "MATLAB", "PCB Design", "DSP", "RF"],
    projectIdeas: [
      "IoT weather monitoring station",
      "FPGA-based traffic light controller",
      "Smart energy meter",
    ],
    careers: ["VLSI Design Engineer", "Embedded Engineer", "RF Engineer", "ISRO / DRDO Scientist"],
  },
  {
    slug: "cse",
    name: "Computer Science Engineering",
    short: "CSE",
    tagline: "Software, algorithms, systems and AI.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: [
          "One language deeply: Python, C++ or Java",
          "Data structures and algorithms",
          "Git & GitHub, Linux command line",
          "Basic web: HTML, CSS, JavaScript",
        ],
      },
      {
        title: "Phase 2 — Core subjects",
        items: [
          "Operating systems, DBMS, computer networks",
          "SQL and database design",
          "OOP and system design fundamentals",
          "Build 3 full projects with a real backend",
        ],
      },
      {
        title: "Phase 3 — Specialise",
        items: [
          "Pick one: full-stack, AI/ML, cloud & DevOps, or cybersecurity",
          "Contribute to open source",
          "Learn Docker and one cloud provider",
        ],
      },
      {
        title: "Phase 4 — Job ready",
        items: [
          "300+ DSA problems and mock interviews",
          "System design basics for entry level",
          "Portfolio site + strong GitHub README's",
        ],
      },
    ],
    coreSkills: ["DSA", "Python", "SQL", "Git", "Linux", "Cloud"],
    projectIdeas: ["Full-stack task manager", "AI chat assistant", "URL shortener with analytics"],
    careers: ["Software Engineer", "Data Engineer", "ML Engineer", "DevOps Engineer"],
  },
  {
    slug: "it",
    name: "Information Technology",
    short: "IT",
    tagline: "Applications, data, networks and cloud infrastructure.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Programming in Python or Java", "Web fundamentals", "Databases and SQL", "Networking basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Software engineering & testing", "Cloud fundamentals (AWS/Azure)", "APIs and integration", "Cybersecurity basics"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: cloud, data analytics, QA automation, or security", "Earn one entry-level certification", "Two deployed projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Aptitude + coding rounds", "Resume with measurable impact", "Internship or freelance experience"],
      },
    ],
    coreSkills: ["Python", "SQL", "Cloud", "Networking", "Automation"],
    projectIdeas: ["Cloud-deployed inventory app", "Log analytics dashboard", "CI/CD pipeline demo"],
    careers: ["Cloud Engineer", "Data Analyst", "QA Automation Engineer", "IT Support Specialist"],
  },
  {
    slug: "eee",
    name: "Electrical & Electronics",
    short: "EEE",
    tagline: "Power systems, machines, drives and renewable energy.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Circuit theory and network analysis", "Electrical machines basics", "Measurement instruments", "MATLAB basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Power systems and protection", "Power electronics and drives", "Control systems", "PLC & SCADA"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: power systems, renewables, EV, or automation", "Simulation in MATLAB/Simulink or ETAP", "Two hardware projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Site and safety knowledge", "Interview prep on core subjects"],
      },
    ],
    coreSkills: ["MATLAB", "PLC", "Power Electronics", "ETAP", "Control Systems"],
    projectIdeas: ["Solar MPPT charge controller", "Automatic power factor correction", "EV battery management"],
    careers: ["Power Systems Engineer", "EV Engineer", "Automation Engineer", "PSU Executive"],
  },
  {
    slug: "mechanical",
    name: "Mechanical Engineering",
    short: "Mechanical",
    tagline: "Design, manufacturing, thermal systems and robotics.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering drawing and GD&T", "Thermodynamics and mechanics", "Materials science", "AutoCAD basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Machine design", "Fluid mechanics and heat transfer", "Manufacturing processes", "SolidWorks / CATIA"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: design, CFD/FEA, manufacturing, or robotics", "ANSYS simulation projects", "Build a physical prototype"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Portfolio of CAD models and analysis reports", "Core interview preparation"],
      },
    ],
    coreSkills: ["SolidWorks", "ANSYS", "AutoCAD", "GD&T", "CFD"],
    projectIdeas: ["Go-kart chassis design", "Heat exchanger analysis", "Pick-and-place robotic arm"],
    careers: ["Design Engineer", "CAE Analyst", "Production Engineer", "Automotive Engineer"],
  },
  {
    slug: "civil",
    name: "Civil Engineering",
    short: "Civil",
    tagline: "Structures, construction, transport and water systems.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering mechanics", "Building materials", "Surveying", "AutoCAD drafting"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Structural analysis and RCC design", "Geotechnical engineering", "Transportation engineering", "STAAD.Pro / ETABS"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: structures, construction management, transport, or environment", "Learn BIM (Revit)", "Site internship"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / SSC JE preparation", "Estimation and costing practice", "Portfolio of drawings and reports"],
      },
    ],
    coreSkills: ["AutoCAD", "STAAD.Pro", "Revit", "Estimation", "Surveying"],
    projectIdeas: ["Multi-storey building design", "Smart traffic study", "Rainwater harvesting plan"],
    careers: ["Structural Engineer", "Site Engineer", "Transport Planner", "SSC JE / Railways"],
  },
  {
    slug: "chemical",
    name: "Chemical Engineering",
    short: "Chemical",
    tagline: "Process design, reactions, safety and plant operations.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Mass and energy balances", "Chemistry fundamentals", "Fluid flow", "Excel for process calculations"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Heat and mass transfer", "Reaction engineering", "Process control", "Aspen Plus / DWSIM"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: petrochemicals, pharma, energy, or environment", "Process safety (HAZOP)", "Simulation projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE / PSU preparation", "Plant internship", "Technical interview practice"],
      },
    ],
    coreSkills: ["Aspen Plus", "Process Control", "HAZOP", "Thermodynamics"],
    projectIdeas: ["Distillation column simulation", "Biodiesel production study", "Effluent treatment design"],
    careers: ["Process Engineer", "Production Engineer", "Safety Engineer", "PSU Executive"],
  },
  {
    slug: "biotechnology",
    name: "Biotechnology",
    short: "Biotech",
    tagline: "Bioprocesses, genetics, bioinformatics and healthcare tech.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Cell and molecular biology", "Biochemistry", "Lab techniques and safety", "Basic statistics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Genetic engineering", "Bioprocess engineering", "Immunology and microbiology", "Bioinformatics with Python/R"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: pharma, bioinformatics, agri-biotech, or medical devices", "Lab or research internship", "Publish or present a study"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["GATE BT / CSIR preparation", "Research portfolio", "Industry interview practice"],
      },
    ],
    coreSkills: ["PCR", "Bioinformatics", "Python", "Bioprocess", "Lab Techniques"],
    projectIdeas: ["Gene sequence analysis pipeline", "Bioplastic from waste", "Enzyme activity optimisation"],
    careers: ["Research Associate", "Bioprocess Engineer", "Bioinformatician", "QC Analyst"],
  },
  {
    slug: "aerospace",
    name: "Aerospace Engineering",
    short: "Aerospace",
    tagline: "Aerodynamics, propulsion, structures and space systems.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Engineering mechanics and materials", "Basic aerodynamics", "Thermodynamics", "MATLAB basics"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Flight mechanics", "Propulsion systems", "Aerospace structures", "CFD with ANSYS Fluent"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: aerodynamics, propulsion, avionics, or space systems", "Build a UAV or rocket model", "CubeSat or drone team"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["ISRO / DRDO exam preparation", "GATE AE preparation", "Technical portfolio of simulations"],
      },
    ],
    coreSkills: ["CFD", "CATIA", "MATLAB", "Propulsion", "Avionics"],
    projectIdeas: ["Fixed-wing UAV design", "Airfoil CFD analysis", "Model rocket telemetry"],
    careers: ["Aerospace Design Engineer", "CFD Analyst", "ISRO Scientist", "Avionics Engineer"],
  },
  {
    slug: "ai-ml",
    name: "Artificial Intelligence & Machine Learning",
    short: "AI & ML",
    tagline: "Machine learning, deep learning and applied AI systems.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Python and NumPy/Pandas", "Statistics and probability", "Linear algebra and calculus basics", "SQL"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Machine learning algorithms", "Deep learning with PyTorch", "Model evaluation and tuning", "MLOps basics"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: NLP/LLMs, computer vision, or reinforcement learning", "Kaggle competitions", "Deploy 2 models as apps"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["ML case-study interview practice", "Portfolio with notebooks and demos", "DSA basics for coding rounds"],
      },
    ],
    coreSkills: ["Python", "Machine Learning", "PyTorch", "MLOps", "Statistics"],
    projectIdeas: ["LLM-powered study assistant", "Image classification web app", "Recommendation engine"],
    careers: ["ML Engineer", "AI Engineer", "Research Associate", "Computer Vision Engineer"],
  },
  {
    slug: "data-science",
    name: "Data Science",
    short: "Data Science",
    tagline: "Analytics, data engineering and decision science.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Python and Pandas", "Descriptive statistics", "Advanced SQL", "Excel and spreadsheets"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Data cleaning and EDA", "Visualisation with Power BI/Tableau", "Hypothesis testing and A/B tests", "Predictive modelling"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: analytics, data engineering, or business intelligence", "Build ETL pipelines", "Two dashboard case studies"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Guesstimate and case-study rounds", "SQL interview drills", "Portfolio with dashboards and notebooks"],
      },
    ],
    coreSkills: ["SQL", "Python", "Power BI", "Statistics", "ETL"],
    projectIdeas: ["Sales forecasting dashboard", "Customer churn analysis", "End-to-end ETL pipeline"],
    careers: ["Data Analyst", "Data Scientist", "Data Engineer", "BI Developer"],
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    short: "Cyber Security",
    tagline: "Security operations, ethical hacking and secure systems.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Networking and TCP/IP", "Linux command line", "Python scripting", "Security fundamentals (CIA triad)"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Web application security (OWASP Top 10)", "Cryptography basics", "System hardening and SIEM", "Hands-on labs: TryHackMe / HackTheBox"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick one: pentesting, SOC/blue team, cloud security, or forensics", "Earn CEH / Security+ level certification", "Bug bounty or CTF participation"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Write-ups of solved CTFs and labs", "Incident response scenario practice", "Interview prep on protocols and attacks"],
      },
    ],
    coreSkills: ["Networking", "Linux", "Python", "OWASP", "SIEM"],
    projectIdeas: ["Vulnerability scanner", "Home SOC with ELK stack", "Secure file transfer tool"],
    careers: ["Security Analyst", "Penetration Tester", "SOC Analyst", "Cloud Security Engineer"],
  },
  {
    slug: "other",
    name: "Other / Not listed",
    short: "Other",
    tagline: "General engineering guidance personalised by Luna AI.",
    phases: [
      {
        title: "Phase 1 — Foundations",
        items: ["Core maths and problem solving", "One programming language", "Your branch's fundamental subjects", "Documentation and technical writing"],
      },
      {
        title: "Phase 2 — Core subjects",
        items: ["Branch core theory with applications", "One industry-standard software tool", "Two guided projects"],
      },
      {
        title: "Phase 3 — Specialise",
        items: ["Pick a niche inside your branch", "Internship or research work", "Portfolio of two deep projects"],
      },
      {
        title: "Phase 4 — Job ready",
        items: ["Aptitude and interview practice", "Resume and LinkedIn polish", "Competitive exam prep if relevant"],
      },
    ],
    coreSkills: ["Problem Solving", "Programming", "Technical Writing", "Domain Tools"],
    projectIdeas: ["Domain simulation project", "Automation tool for your branch", "Capstone research study"],
    careers: ["Graduate Engineer Trainee", "Domain Specialist", "Research Assistant"],
  },
];

const ALIASES: Record<string, string> = { "ai-ds": "ai-ml", biotech: "biotechnology" };

export const branchBySlug = (slug: string | null | undefined) =>
  slug ? branches.find((b) => b.slug === (ALIASES[slug] ?? slug)) : undefined;

export const branchLabel = (slug: string | null | undefined) =>
  branchBySlug(slug)?.name ?? "Engineering";
