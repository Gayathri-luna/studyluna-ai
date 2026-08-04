export interface GovJob {
  slug: string;
  org: string;
  full: string;
  category: string;
  summary: string;
  eligibility: string[];
  skills: string[];
  salary: string;
  examPattern: string[];
  roadmap: string[];
  resources: { label: string; href: string }[];
}

export const govJobs: GovJob[] = [
  {
    slug: "isro",
    org: "ISRO",
    full: "Indian Space Research Organisation",
    category: "Space & Research",
    summary: "Scientist/Engineer 'SC' roles in satellite, avionics and communication systems.",
    eligibility: [
      "BE/BTech in ECE, EEE, CSE, Mechanical or Aerospace",
      "Minimum 65% aggregate or CGPA 6.84/10",
      "Age limit generally 28 years (relaxations apply)",
    ],
    skills: ["Digital electronics", "Signals & systems", "Embedded C", "Control systems", "Communication systems"],
    salary: "Level 10 — approx ₹56,100 basic, ₹95K–₹1.1L gross per month",
    examPattern: [
      "Written test: 80 objective questions from core branch subjects",
      "Negative marking for wrong answers",
      "Shortlisted candidates called for interview",
      "Final merit is largely interview-weighted",
    ],
    roadmap: [
      "Build rock-solid core subject fundamentals (same base as GATE).",
      "Solve 10 years of ISRO previous papers.",
      "Revise digital, analog, signals, EMFT and communication weekly.",
      "Prepare a strong project explanation for the interview.",
      "Practise numerical speed — the paper is time-tight.",
    ],
    resources: [
      { label: "ISRO careers", href: "https://www.isro.gov.in/Careers.html" },
      { label: "NPTEL core courses", href: "https://nptel.ac.in/" },
    ],
  },
  {
    slug: "drdo",
    org: "DRDO",
    full: "Defence Research and Development Organisation",
    category: "Defence & Research",
    summary: "Scientist 'B' roles via DRDO RAC / GATE score in defence electronics and systems.",
    eligibility: [
      "BE/BTech with minimum 60% in a relevant branch",
      "Valid GATE score for most Scientist 'B' entries",
      "Age limit generally 28 years (relaxations apply)",
    ],
    skills: ["Radar & RF", "Embedded systems", "Signal processing", "Materials", "Control engineering"],
    salary: "Level 10 — approx ₹56,100 basic, ₹95K–₹1.15L gross per month",
    examPattern: [
      "GATE score based shortlisting (or DRDO written exam for some posts)",
      "Descriptive/technical screening for certain labs",
      "Personal interview with a subject panel",
    ],
    roadmap: [
      "Target a strong GATE score in your branch first.",
      "Pick a defence-relevant specialisation (radar, avionics, sonar).",
      "Do one substantial project in that specialisation.",
      "Read DRDO lab profiles and align your interview story.",
      "Practise technical interviews on your final-year project.",
    ],
    resources: [
      { label: "DRDO RAC", href: "https://rac.gov.in/" },
      { label: "GATE official", href: "https://gate.iitm.ac.in/" },
    ],
  },
  {
    slug: "bel",
    org: "BEL",
    full: "Bharat Electronics Limited",
    category: "PSU",
    summary: "Probationary Engineer roles in defence electronics manufacturing and R&D.",
    eligibility: [
      "BE/BTech in ECE, EEE, CSE or Mechanical",
      "Minimum 60% aggregate",
      "GATE score usually required for PE recruitment",
    ],
    skills: ["Electronics design", "Testing & validation", "Embedded systems", "Quality processes"],
    salary: "₹40,000 basic — approx ₹9–11 LPA CTC for Probationary Engineers",
    examPattern: ["GATE score shortlisting", "Interview covering core subjects and projects"],
    roadmap: [
      "Prepare GATE in your branch as the primary gate.",
      "Strengthen analog, digital and measurement fundamentals.",
      "Learn testing, calibration and documentation practices.",
      "Prepare project and internship narratives for interview.",
    ],
    resources: [{ label: "BEL careers", href: "https://bel-india.in/careers/" }],
  },
  {
    slug: "hal",
    org: "HAL",
    full: "Hindustan Aeronautics Limited",
    category: "PSU",
    summary: "Design and Management Trainee roles in aircraft systems and avionics.",
    eligibility: [
      "BE/BTech in Aerospace, Mechanical, ECE, EEE or CSE",
      "Minimum 60% aggregate",
      "GATE score for most trainee posts",
    ],
    skills: ["Avionics", "Manufacturing processes", "CAD/CAE", "Quality & safety standards"],
    salary: "₹40,000 basic — approx ₹9–12 LPA CTC for trainees",
    examPattern: ["GATE score shortlisting", "Technical + HR interview"],
    roadmap: [
      "Target GATE in your branch.",
      "Learn aerospace-relevant tools (CATIA, ANSYS or avionics stacks).",
      "Do a project connected to aircraft systems.",
      "Study aviation safety and quality basics.",
    ],
    resources: [{ label: "HAL careers", href: "https://hal-india.co.in/Career" }],
  },
  {
    slug: "ecil",
    org: "ECIL",
    full: "Electronics Corporation of India Limited",
    category: "PSU",
    summary: "Graduate Engineer Trainee roles in nuclear, defence and e-governance electronics.",
    eligibility: [
      "BE/BTech in ECE, EEE, CSE or Mechanical",
      "Minimum 60% aggregate",
      "GATE score or ECIL written test depending on the notification",
    ],
    skills: ["Instrumentation", "Control systems", "Embedded design", "System integration"],
    salary: "₹40,000 basic — approx ₹8–10 LPA CTC",
    examPattern: ["GATE / written screening", "Personal interview"],
    roadmap: [
      "Build core electronics and instrumentation fundamentals.",
      "Learn industrial control and data acquisition.",
      "Prepare GATE-level numerical practice.",
      "Track ECIL notifications — they open in batches.",
    ],
    resources: [{ label: "ECIL careers", href: "https://www.ecil.co.in/careers.html" }],
  },
  {
    slug: "bhel",
    org: "BHEL",
    full: "Bharat Heavy Electricals Limited",
    category: "PSU",
    summary: "Engineer Trainee roles in power plant equipment and heavy electrical systems.",
    eligibility: [
      "BE/BTech in Mechanical, Electrical, ECE or Civil",
      "Minimum 60% aggregate",
      "Valid GATE score",
    ],
    skills: ["Power systems", "Thermal engineering", "Manufacturing", "Project execution"],
    salary: "₹40,000 basic — approx ₹9–11 LPA CTC",
    examPattern: ["GATE score shortlisting", "Interview and document verification"],
    roadmap: [
      "Prioritise GATE preparation in your branch.",
      "Study power plant and heavy machinery basics.",
      "Do a plant visit or internship if possible.",
      "Prepare for site-based work questions.",
    ],
    resources: [{ label: "BHEL careers", href: "https://careers.bhel.in/" }],
  },
  {
    slug: "railways",
    org: "Railways",
    full: "RRB — Junior Engineer & Special Class Apprentice",
    category: "Government",
    summary: "Junior Engineer roles across signalling, telecom, electrical and mechanical departments.",
    eligibility: [
      "Diploma or BE/BTech in a relevant branch",
      "Age generally 18–33 years with relaxations",
      "No minimum percentage for most JE posts",
    ],
    skills: ["Signalling & telecom", "Electrical maintenance", "General awareness", "Reasoning & aptitude"],
    salary: "Level 6 — approx ₹35,400 basic, ₹55K–₹65K gross per month",
    examPattern: [
      "CBT 1: maths, reasoning, general awareness, general science",
      "CBT 2: technical subject + general subjects",
      "Document verification and medical exam",
    ],
    roadmap: [
      "Start with aptitude and reasoning daily practice.",
      "Cover the technical syllabus for your JE branch.",
      "Solve previous year CBT papers under timer.",
      "Revise general science and current affairs weekly.",
    ],
    resources: [{ label: "RRB official", href: "https://www.rrbcdg.gov.in/" }],
  },
  {
    slug: "bsnl",
    org: "BSNL",
    full: "Bharat Sanchar Nigam Limited",
    category: "PSU",
    summary: "Junior Telecom Officer roles in network operations and telecom infrastructure.",
    eligibility: [
      "BE/BTech in ECE, EEE, CSE or IT",
      "Age limit generally 30 years",
      "GATE score for JTO recruitment cycles",
    ],
    skills: ["Telecom networks", "Optical fibre", "Switching & transmission", "Mobile communication"],
    salary: "Approx ₹40,000 basic, ₹8–10 LPA CTC",
    examPattern: ["GATE score shortlisting", "Document verification and medical"],
    roadmap: [
      "Master communication systems and networks.",
      "Learn 4G/5G architecture and optical transmission.",
      "Prepare GATE ECE/CSE thoroughly.",
      "Follow TRAI and telecom policy updates.",
    ],
    resources: [{ label: "BSNL careers", href: "https://www.bsnl.co.in/" }],
  },
  {
    slug: "gate",
    org: "GATE",
    full: "Graduate Aptitude Test in Engineering",
    category: "Exam",
    summary: "The single exam that unlocks PSUs, MTech admissions and many research roles.",
    eligibility: [
      "Final year students or graduates of BE/BTech/BSc(Research)",
      "No age limit",
      "One paper per attempt (two allowed in some combinations)",
    ],
    skills: ["Core branch subjects", "Engineering mathematics", "General aptitude", "Speed and accuracy"],
    salary: "Score unlocks PSU roles paying ₹8–14 LPA and MTech stipends of ₹12,400/month",
    examPattern: [
      "3-hour computer-based test, 100 marks",
      "General aptitude 15 marks, mathematics ~13 marks, core subject ~72 marks",
      "MCQ, MSQ and numerical answer type questions",
      "Negative marking on MCQs only",
    ],
    roadmap: [
      "Month 1–3: engineering mathematics + two core subjects.",
      "Month 4–6: remaining core subjects with daily problem practice.",
      "Month 7–8: previous year papers, subject-wise.",
      "Month 9: full-length mocks every 3 days plus revision notes.",
      "Final weeks: formula revision and weak-topic repair only.",
    ],
    resources: [
      { label: "GATE official", href: "https://gate.iitm.ac.in/" },
      { label: "NPTEL", href: "https://nptel.ac.in/" },
    ],
  },
  {
    slug: "ssc-je",
    org: "SSC JE",
    full: "Staff Selection Commission — Junior Engineer",
    category: "Government",
    summary: "Junior Engineer posts in central government departments (Civil, Electrical, Mechanical).",
    eligibility: [
      "Diploma or degree in Civil, Electrical or Mechanical engineering",
      "Age limit 30 or 32 years depending on the post",
      "Indian citizenship",
    ],
    skills: ["Core branch subjects", "General intelligence", "General awareness", "Estimation & drawing"],
    salary: "Level 6 — approx ₹35,400 basic, ₹60K–₹70K gross in metros",
    examPattern: [
      "Paper 1: objective — reasoning, general awareness, technical",
      "Paper 2: descriptive technical paper",
      "Document verification and medical",
    ],
    roadmap: [
      "Cover the technical syllabus subject by subject.",
      "Practise reasoning and general awareness daily.",
      "Write descriptive answers by hand for Paper 2.",
      "Solve 5 years of previous papers.",
    ],
    resources: [{ label: "SSC official", href: "https://ssc.gov.in/" }],
  },
];

export const govJobBySlug = (slug: string) => govJobs.find((j) => j.slug === slug);
