export interface Skill {
  slug: string;
  name: string;
  type: "technical" | "soft";
  summary: string;
  why: string;
  steps: string[];
  resources: { label: string; href: string }[];
}

const r = (label: string, href: string) => ({ label, href });

function tech(
  slug: string,
  name: string,
  summary: string,
  why: string,
  steps: string[],
  resources: { label: string; href: string }[],
): Skill {
  return { slug, name, type: "technical", summary, why, steps, resources };
}

function soft(
  slug: string,
  name: string,
  summary: string,
  why: string,
  steps: string[],
  resources: { label: string; href: string }[],
): Skill {
  return { slug, name, type: "soft", summary, why, steps, resources };
}

export const skills: Skill[] = [
  tech(
    "programming",
    "Programming",
    "The core habit of turning ideas into working code.",
    "Every engineering branch now expects you to automate, simulate or prototype with code.",
    [
      "Pick one language and stick with it for 3 months.",
      "Solve 5 small problems a week — input, logic, output.",
      "Learn functions, arrays, files and error handling.",
      "Build one tool you personally use.",
    ],
    [
      r("freeCodeCamp", "https://www.freecodecamp.org/"),
      r("Exercism", "https://exercism.org/"),
      r("Codedex — interactive, game-like coding lessons", "https://www.codedex.io/"),
    ],
  ),
  tech(
    "c",
    "C",
    "The language closest to the hardware.",
    "Embedded firmware, drivers and microcontroller work all start with C.",
    [
      "Master pointers, arrays, structs and memory layout.",
      "Write programs that manipulate bits and registers.",
      "Read datasheets and map registers to C code.",
      "Blink an LED on a real microcontroller.",
    ],
    [r("Codedex — interactive C track", "https://www.codedex.io/c"), r("Learn-C.org", "https://www.learn-c.org/"), r("GeeksforGeeks C", "https://www.geeksforgeeks.org/c-programming-language/")],
  ),
  tech(
    "cpp",
    "C++",
    "Performance plus object-oriented design.",
    "Used in competitive programming, robotics, EDA tools and game engines.",
    [
      "Learn classes, inheritance and templates.",
      "Practise STL containers and algorithms.",
      "Solve 150 DSA problems in C++.",
      "Build one console project with clean OOP structure.",
    ],
    [r("learncpp.com", "https://www.learncpp.com/"), r("cppreference", "https://en.cppreference.com/")],
  ),
  tech(
    "python",
    "Python",
    "The fastest way to automate, analyse and prototype.",
    "It powers AI, data work, scripting and quick hardware tooling.",
    [
      "Learn syntax, lists, dicts and functions.",
      "Use NumPy and Pandas on a real dataset.",
      "Automate one boring task in your life.",
      "Build a small app with Flask or Streamlit.",
    ],
    [r("Codedex — beginner-friendly Python course", "https://www.codedex.io/python"), r("Python docs tutorial", "https://docs.python.org/3/tutorial/"), r("Automate the Boring Stuff", "https://automatetheboringstuff.com/")],
  ),
  tech(
    "java",
    "Java",
    "Enterprise-grade, strongly typed and everywhere in service companies.",
    "Most mass campus recruiters still test Java fundamentals.",
    [
      "Learn OOP: classes, interfaces, collections.",
      "Understand exceptions and multithreading basics.",
      "Build a CRUD app with Spring Boot.",
      "Practise DSA in Java for interviews.",
    ],
    [r("Java Tutorials (Oracle)", "https://docs.oracle.com/javase/tutorial/"), r("Spring Guides", "https://spring.io/guides")],
  ),
  tech(
    "embedded-systems",
    "Embedded Systems",
    "Software that runs directly on microcontrollers.",
    "Cars, medical devices, satellites and appliances all run embedded code.",
    [
      "Start with Arduino, then move to STM32 or ESP32.",
      "Learn GPIO, timers, interrupts, ADC, UART, I2C, SPI.",
      "Read a datasheet cover to cover once.",
      "Build a sensor-to-display-to-cloud project.",
    ],
    [r("STM32 docs", "https://www.st.com/en/development-tools/stm32cubeide.html"), r("Arduino docs", "https://docs.arduino.cc/")],
  ),
  tech(
    "iot",
    "IoT",
    "Connecting devices to the internet and to each other.",
    "IoT combines embedded, networking and cloud into one hireable skill.",
    [
      "Understand Wi-Fi, BLE, MQTT and HTTP.",
      "Push sensor data to a cloud dashboard.",
      "Add authentication and OTA updates.",
      "Think about power budget and reliability.",
    ],
    [r("MQTT essentials", "https://www.hivemq.com/mqtt-essentials/"), r("ESP32 docs", "https://docs.espressif.com/")],
  ),
  tech(
    "ai",
    "Artificial Intelligence",
    "Making systems that reason, generate and decide.",
    "AI literacy is now a baseline expectation in every branch.",
    [
      "Understand what models can and cannot do.",
      "Learn prompt design and API usage.",
      "Build one app using an LLM API.",
      "Study evaluation and safety basics.",
    ],
    [r("Elements of AI", "https://www.elementsofai.com/"), r("Google AI Essentials", "https://ai.google/education/")],
  ),
  tech(
    "machine-learning",
    "Machine Learning",
    "Learning patterns from data to make predictions.",
    "Core to data science, robotics, signal processing and analytics roles.",
    [
      "Learn regression, classification and clustering.",
      "Practise feature engineering and validation.",
      "Do 3 Kaggle datasets end to end.",
      "Deploy one model behind a simple UI.",
    ],
    [r("scikit-learn guide", "https://scikit-learn.org/stable/user_guide.html"), r("Kaggle Learn", "https://www.kaggle.com/learn")],
  ),
  tech(
    "matlab",
    "MATLAB",
    "The standard tool for signals, control and simulation.",
    "Heavily used in ECE, EEE, Mechanical and Aerospace coursework and industry.",
    [
      "Learn matrices, plotting and scripts.",
      "Use Simulink to model a control system.",
      "Do signal filtering and FFT exercises.",
      "Recreate one textbook experiment in simulation.",
    ],
    [r("MATLAB Onramp", "https://matlabacademy.mathworks.com/"), r("MATLAB docs", "https://www.mathworks.com/help/matlab/")],
  ),
  tech(
    "fpga",
    "FPGA",
    "Reconfigurable hardware you program with HDL.",
    "FPGA experience is a strong differentiator for VLSI and defence roles.",
    [
      "Learn Verilog combinational and sequential design.",
      "Write testbenches and simulate before synthesis.",
      "Implement designs on a real board (Basys3, DE10).",
      "Study timing constraints and resource usage.",
    ],
    [r("Vivado docs", "https://docs.amd.com/"), r("HDLBits practice", "https://hdlbits.01xz.net/")],
  ),
  tech(
    "vlsi",
    "VLSI",
    "Designing integrated circuits from RTL to layout.",
    "India's semiconductor push is creating thousands of VLSI openings.",
    [
      "Master digital design and CMOS fundamentals.",
      "Learn Verilog/SystemVerilog and verification basics.",
      "Understand synthesis, STA and physical design flow.",
      "Do one full RTL-to-GDSII flow on an open toolchain.",
    ],
    [r("OpenLane / Efabless", "https://efabless.com/"), r("VLSI System Design", "https://www.vlsisystemdesign.com/")],
  ),
  tech(
    "pcb",
    "PCB Design",
    "Turning a circuit into a manufacturable board.",
    "Hardware teams hire people who can actually ship a board.",
    [
      "Learn schematic capture and netlists.",
      "Practise footprint selection and layout rules.",
      "Understand ground planes and signal integrity.",
      "Order and assemble one 2-layer board.",
    ],
    [r("KiCad docs", "https://docs.kicad.org/"), r("Altium Academy", "https://resources.altium.com/altium-academy")],
  ),
  tech(
    "git",
    "Git & GitHub",
    "Version control and collaboration.",
    "Recruiters look at GitHub before they look at your resume.",
    [
      "Learn commit, branch, merge and rebase.",
      "Write clear commit messages and README files.",
      "Open a pull request on an open-source repo.",
      "Keep every project you build in a repo.",
    ],
    [r("Git book", "https://git-scm.com/book/en/v2"), r("GitHub Skills", "https://skills.github.com/")],
  ),
  tech(
    "linux",
    "Linux",
    "The operating system engineering runs on.",
    "Servers, embedded targets and build tools are all Linux-first.",
    [
      "Learn the shell: files, permissions, pipes.",
      "Write bash scripts for repetitive tasks.",
      "Understand processes, services and logs.",
      "Daily-drive Linux for a month.",
    ],
    [r("Linux Journey", "https://linuxjourney.com/"), r("The Missing Semester", "https://missing.csail.mit.edu/")],
  ),

  soft(
    "communication",
    "Communication",
    "Explaining technical work clearly to any audience.",
    "Great engineers who cannot explain their work get overlooked for promotions.",
    [
      "Explain one concept a week in 5 simple sentences.",
      "Practise writing short, structured updates.",
      "Record yourself and review the clarity.",
      "Ask for feedback after every presentation.",
    ],
    [r("Harvard writing resources", "https://writingcenter.fas.harvard.edu/"), r("Toastmasters", "https://www.toastmasters.org/")],
  ),
  soft(
    "resume",
    "Resume Building",
    "A one-page proof of what you can do.",
    "Your resume decides whether anyone ever sees your skills.",
    [
      "One page, reverse chronological, no photo.",
      "Every bullet: action + tool + measurable result.",
      "List 3–5 projects with links.",
      "Tailor keywords to each job description.",
    ],
    [r("Overleaf resume templates", "https://www.overleaf.com/gallery/tagged/cv"), r("Google resume tips", "https://grow.google/certificates/interview-warmup/")],
  ),
  soft(
    "linkedin",
    "LinkedIn",
    "Your public professional profile and network.",
    "Most internships and referrals start with a LinkedIn conversation.",
    [
      "Clear headline: role you want + core skills.",
      "About section in first person, 4 lines.",
      "Post one project breakdown a month.",
      "Connect with 5 relevant people weekly with a note.",
    ],
    [r("LinkedIn profile guide", "https://www.linkedin.com/help/linkedin")],
  ),
  soft(
    "interview",
    "Interview Preparation",
    "Turning knowledge into confident answers.",
    "Interviews test structure and calm as much as knowledge.",
    [
      "Prepare 10 core-subject answers out loud.",
      "Use STAR format for behavioural questions.",
      "Do 5 mock interviews with a friend.",
      "Always prepare 2 questions to ask them.",
    ],
    [r("Interview Warmup", "https://grow.google/certificates/interview-warmup/"), r("Pramp mocks", "https://www.pramp.com/")],
  ),
  soft(
    "english",
    "English Speaking",
    "Fluency for interviews and workplace conversation.",
    "Technical roles in India and abroad are conducted in English.",
    [
      "Speak 10 minutes daily, out loud, on any topic.",
      "Shadow a podcast for pronunciation.",
      "Keep a vocabulary notebook of 5 words a day.",
      "Join a speaking group or find a partner.",
    ],
    [r("BBC Learning English", "https://www.bbc.co.uk/learningenglish"), r("Rachel's English", "https://rachelsenglish.com/")],
  ),
  soft(
    "leadership",
    "Leadership",
    "Getting a group to a good outcome together.",
    "Team leads are chosen from people who already act like one.",
    [
      "Take ownership of one club or project module.",
      "Learn to delegate and follow up kindly.",
      "Run short, decision-focused meetings.",
      "Give credit publicly, correct privately.",
    ],
    [r("MIT leadership resources", "https://ocw.mit.edu/")],
  ),
  soft(
    "time-management",
    "Time Management",
    "Protecting deep work in a busy semester.",
    "Consistency beats intensity when you are learning engineering.",
    [
      "Plan the week on Sunday, not daily.",
      "Use 90-minute focus blocks.",
      "Track where your hours actually go for one week.",
      "Say no to one thing every week.",
    ],
    [r("Deep Work summary", "https://calnewport.com/")],
  ),
  soft(
    "public-speaking",
    "Public Speaking",
    "Presenting ideas to a room without freezing.",
    "Project reviews, seminars and interviews all need this.",
    [
      "Open with the problem, not your name slide.",
      "One idea per slide, big fonts.",
      "Rehearse standing, out loud, 3 times.",
      "Pause instead of saying filler words.",
    ],
    [r("TED speaking guide", "https://www.ted.com/participate/organize-a-local-tedx-event/tedx-organizer-guide/speakers-program")],
  ),
];

export const technicalSkillList = skills.filter((s) => s.type === "technical");
export const softSkillList = skills.filter((s) => s.type === "soft");
export const skillBySlug = (slug: string) => skills.find((s) => s.slug === slug);
