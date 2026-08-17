export type EngineeringBranch = {
  name: string;
  short: string;
  careers: string[];
  skills: string[];
};

export const engineeringBranches: EngineeringBranch[] = [
  { name: "Computer Science & Engineering", short: "CSE", careers: ["Software Engineer", "Cloud Engineer", "Full-Stack Developer"], skills: ["DSA", "Programming", "Databases", "Cloud"] },
  { name: "Electronics & Communication Engineering", short: "ECE", careers: ["Embedded Engineer", "VLSI Engineer", "RF Engineer"], skills: ["Digital Electronics", "Embedded C", "Communication", "VLSI"] },
  { name: "Electrical & Electronics Engineering", short: "EEE", careers: ["Power Engineer", "Control Engineer", "Electrical Design Engineer"], skills: ["Power Systems", "Machines", "Control", "MATLAB"] },
  { name: "Mechanical Engineering", short: "ME", careers: ["Design Engineer", "Manufacturing Engineer", "Automation Engineer"], skills: ["CAD", "Manufacturing", "Thermodynamics", "Automation"] },
  { name: "Civil Engineering", short: "CE", careers: ["Structural Engineer", "Site Engineer", "Transportation Engineer"], skills: ["Structures", "AutoCAD", "Surveying", "Construction"] },
  { name: "Chemical Engineering", short: "CHE", careers: ["Process Engineer", "Plant Engineer", "Safety Engineer"], skills: ["Process Design", "Thermodynamics", "Reaction Engineering", "Safety"] },
  { name: "Aerospace Engineering", short: "AE", careers: ["Aerospace Engineer", "Avionics Engineer", "Flight Systems Engineer"], skills: ["Aerodynamics", "Flight Mechanics", "CAD", "Control"] },
  { name: "Biomedical Engineering", short: "BME", careers: ["Biomedical Engineer", "Clinical Engineer", "Medical Device Engineer"], skills: ["Biomaterials", "Medical Devices", "Signals", "Instrumentation"] },
  { name: "Biotechnology", short: "BT", careers: ["Bioprocess Engineer", "Research Associate", "Bioinformatics Analyst"], skills: ["Biology", "Bioprocessing", "Bioinformatics", "Data Analysis"] },
  { name: "Information Technology", short: "IT", careers: ["Software Engineer", "IT Engineer", "Cloud Engineer"], skills: ["Programming", "Networking", "Databases", "Cloud"] },
  { name: "Artificial Intelligence & Machine Learning", short: "AI/ML", careers: ["ML Engineer", "AI Engineer", "Data Scientist"], skills: ["Python", "Machine Learning", "Deep Learning", "MLOps"] },
  { name: "Artificial Intelligence", short: "AI", careers: ["AI Engineer", "Applied AI Developer", "AI Product Engineer"], skills: ["Python", "LLMs", "Deep Learning", "AI APIs"] },
  { name: "Cyber Security", short: "Cyber", careers: ["Security Analyst", "Security Engineer", "SOC Analyst"], skills: ["Networking", "Linux", "Security Fundamentals", "Incident Response"] },
  { name: "Robotics Engineering", short: "Robotics", careers: ["Robotics Engineer", "Automation Engineer", "ROS Developer"], skills: ["ROS 2", "Control", "Sensors", "Computer Vision"] },
  { name: "Environmental Engineering", short: "Env", careers: ["Environmental Engineer", "Sustainability Engineer", "Water Engineer"], skills: ["Water Treatment", "Waste Management", "Sustainability", "Environmental Science"] },
  { name: "Data Science", short: "DS", careers: ["Data Scientist", "Data Analyst", "Analytics Engineer"], skills: ["Python", "Statistics", "SQL", "Data Visualization"] },
  { name: "Internet of Things", short: "IoT", careers: ["IoT Engineer", "Edge AI Engineer", "IoT Solutions Engineer"], skills: ["Embedded", "MQTT", "Cloud", "Edge AI"] },
  { name: "VLSI & Semiconductor Engineering", short: "VLSI", careers: ["RTL Engineer", "Verification Engineer", "Physical Design Engineer"], skills: ["Verilog", "SystemVerilog", "Digital Design", "Semiconductor"] },
  { name: "Embedded Systems Engineering", short: "Embedded", careers: ["Firmware Engineer", "Embedded Software Engineer", "Embedded Systems Engineer"], skills: ["Embedded C", "MCUs", "RTOS", "Protocols"] },
  { name: "Instrumentation & Control Engineering", short: "ICE", careers: ["Instrumentation Engineer", "Control Engineer", "Automation Engineer"], skills: ["Sensors", "PLC", "SCADA", "Control Systems"] },
];
