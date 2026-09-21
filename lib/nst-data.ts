export interface Course {
  id: string;
  title: string;
  category: string;
  level: "Foundational" | "Intermediate" | "Advanced";
  duration: string;
  instructor: string;
  description: string;
  modules?: string[];
  enrolled?: number;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  image?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  type: "Collaboration" | "Participation" | "Project" | "Fellowship" | "Direct Placement";
  category: string;
  location: string;
  date: string;
  description?: string;
  compensation?: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  domain: string;
  clearance?: string;
  initials: string;
}

export const COURSES: Course[] = [
  {
    id: "foundations-nat-sec",
    title: "Foundations of National Security",
    category: "National Security",
    level: "Foundational",
    duration: "6 weeks",
    instructor: "TheNST Learning Desk",
    description: "An introductory pathway covering institutions, doctrine, intelligence frameworks and contemporary threat environments.",
    modules: ["Core Doctrine & Legal Architectures", "State Actors & Asymmetric Vectors", "Strategic Decision-Making Under Crisis", "Institutional Coordination"],
    enrolled: 1420
  },
  {
    id: "cyber-ops-strategic",
    title: "Cyber Operations for Strategic Decision-Makers",
    category: "Cybersecurity",
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "TheNST Learning Desk",
    description: "Offensive and defensive digital capabilities, strategic deterrence, critical infrastructure resilience and command authority.",
    modules: ["Threat Landscapes & State APTs", "Deterrence & Escalation Dynamics", "Critical Infrastructure Protocols", "Post-Incident Response Governance"],
    enrolled: 890
  },
  {
    id: "ai-autonomy-stability",
    title: "AI, Autonomy and Strategic Stability",
    category: "Emerging Technology",
    level: "Advanced",
    duration: "10 weeks",
    instructor: "TheNST Learning Desk",
    description: "Autonomous weapons doctrine, algorithmic decision support in command hierarchies and international non-proliferation treaties.",
    modules: ["Autonomous Decision-Making Models", "Machine Perception in Contested Spaces", "Verification & Treaties", "Ethical Command Chains"],
    enrolled: 640
  },
  {
    id: "modern-defence-systems",
    title: "Modern Defence Systems: A Technical Primer",
    category: "Defence Technology",
    level: "Intermediate",
    duration: "7 weeks",
    instructor: "TheNST Learning Desk",
    description: "Air defence networks, electronic warfare spectra, radar architecture, counter-UAS and multi-domain integration.",
    modules: ["EW Spectrum Mastery", "Integrated Air & Missile Defence", "Counter-UAS Sensor Fusion", "Interoperability Standards"],
    enrolled: 1120
  },
  {
    id: "strategic-affairs-contested",
    title: "Strategic Affairs in a Contested Order",
    category: "Strategic Affairs",
    level: "Intermediate",
    duration: "6 weeks",
    instructor: "TheNST Learning Desk",
    description: "Great-power competition, maritime chokepoints, supply chain vulnerabilities and economic statecraft.",
    modules: ["Indo-Pacific Maritime Corridors", "Resource Security & Sanctions", "Hybrid Warfare Interventions", "Alliance Geopolitics"],
    enrolled: 970
  },
  {
    id: "digital-infra-resilience",
    title: "Digital Infrastructure and National Resilience",
    category: "AI & Technology",
    level: "Foundational",
    duration: "5 weeks",
    instructor: "TheNST Learning Desk",
    description: "Subsea cabling, satellite constellations, sovereign cloud infrastructure and sovereign AI compute security.",
    modules: ["Space & Satellite Ground Segments", "Undersea Fiber Protection", "Sovereign Compute & AI Clusters", "Continuity of Government Systems"],
    enrolled: 780
  },
];

export const ARTICLES: Article[] = [
  {
    id: "contested-order-maritime",
    title: "The Contested Order: Indo-Pacific Maritime Security and Subsea Surveillance",
    category: "Strategic Affairs",
    date: "March 2026",
    author: "TheNST Research Desk",
    readTime: "12 min read",
    summary: "An in-depth intelligence review of maritime surveillance networks, chokepoint control, and unmanned undersea deterrence.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "counter-uas-doctrine",
    title: "Counter-UAS Doctrine: Tactical Sensor Fusion in Urban and Border Theatres",
    category: "Defence Technology",
    date: "February 2026",
    author: "Tactical Research Group",
    readTime: "9 min read",
    summary: "Evaluating RF jamming, directed energy, and kinetic interceptors against coordinated autonomous drone swarms.",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400"
  },
  {
    id: "ai-command-decision",
    title: "Algorithmic Decision Support: Cognitive Load and Authority in High-Velocity Encounters",
    category: "AI & Technology",
    date: "January 2026",
    author: "Emerging Tech Policy Unit",
    readTime: "15 min read",
    summary: "Examining machine confidence thresholds, human-in-the-loop validation, and legal liability in real-time air defence.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sovereign-cloud-supply-chains",
    title: "Sovereign Hardware Assurance: Supply Chain Interdiction in Critical Defence Microelectronics",
    category: "Cybersecurity",
    date: "January 2026",
    author: "National Resilience Group",
    readTime: "11 min read",
    summary: "Frameworks for silicon root-of-trust verification and cryptographic lifecycle protection for national hardware assets.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-research-strategic",
    title: "Research Contributor — Strategic Affairs Desk",
    organisation: "TheNST Research Desk",
    type: "Collaboration",
    category: "Research",
    location: "Remote",
    date: "Open for Q2",
    description: "Seeking domain experts to author intelligence monographs on maritime security and Indo-Pacific supply chains.",
    compensation: "Institutional Honorarium"
  },
  {
    id: "opp-course-reviewer",
    title: "Technical Course Reviewer — Cybersecurity Operations",
    organisation: "TheNST Learn",
    type: "Participation",
    category: "Education",
    location: "Remote",
    date: "Rolling Admissions",
    description: "Peer-reviewing interactive curriculum and operational case studies for mid-career intelligence and security officers.",
    compensation: "Academic Retainer"
  },
  {
    id: "opp-uav-capability",
    title: "UAV & Counter-UAS Field Capability Project",
    organisation: "Institutional Partner Consortium",
    type: "Project",
    category: "Projects",
    location: "Hybrid / Test Ranges",
    date: "Active Phase II",
    description: "Integration trials for long-range ISR drones, telemetry encryption, and tactical mesh relay nodes.",
    compensation: "Direct Contract"
  },
  {
    id: "opp-fellowship-cyber",
    title: "Senior Security Fellow — Critical Infrastructure",
    organisation: "TheNST Strategy Hub",
    type: "Fellowship",
    category: "Fellowship",
    location: "New Delhi / Hybrid",
    date: "Applications Open",
    description: "Year-long residential and field fellowship researching power grid and financial telecommunications defence.",
    compensation: "Stipend + Grant Support"
  }
];

export const NETWORK_PEOPLE: Person[] = [
  {
    id: "p-1",
    name: "Dr. Vikramaditya Sen",
    role: "Senior Strategic Advisor",
    affiliation: "TheNST Research Desk",
    domain: "Strategic Affairs",
    clearance: "Level 4 Verified",
    initials: "VS"
  },
  {
    id: "p-2",
    name: "Col. Raghavendra Nair (Retd.)",
    role: "Director of Field Operations",
    affiliation: "Tactical Defense Advisory",
    domain: "Defence Technology",
    clearance: "Level 5 Verified",
    initials: "RN"
  },
  {
    id: "p-3",
    name: "Dr. Ananya Ray",
    role: "Lead Researcher — AI Governance",
    affiliation: "Emerging Tech Policy Unit",
    domain: "AI & Technology",
    clearance: "Level 3 Verified",
    initials: "AR"
  },
  {
    id: "p-4",
    name: "Karanbir S. Grewal",
    role: "Chief UAS Operations Lead",
    affiliation: "Aerial Capability Group",
    domain: "Counter-UAS",
    clearance: "Level 4 Verified",
    initials: "KG"
  },
  {
    id: "p-5",
    name: "Priyanka Deshmukh",
    role: "Principal Cyber Threat Analyst",
    affiliation: "Critical Infra Defense Hub",
    domain: "Cybersecurity",
    clearance: "Level 5 Verified",
    initials: "PD"
  },
  {
    id: "p-6",
    name: "Maj. Gen. Alok Mathur (Retd.)",
    role: "Chair of Academic Council",
    affiliation: "TheNST Academic Board",
    domain: "National Security",
    clearance: "Council Board",
    initials: "AM"
  }
];

export const ROLE_COPY: Record<string, { title: string; subtitle: string; heroTitle: string; heroDesc: string; steps: { num: string; title: string; desc: string }[]; benefits: string[] }> = {
  "security-professional": {
    title: "Security Professional",
    subtitle: "Analyst & Field Specialist",
    heroTitle: "Build your verified security career path.",
    heroDesc: "Connect with accredited institutions, verify your professional credentials, and access exclusive research and deployment opportunities.",
    steps: [
      { num: "01", title: "Identity Verification", desc: "Submit cryptographic KYC & security clearances." },
      { num: "02", title: "Capability Mapping", desc: "Benchmark competencies against national standards." },
      { num: "03", title: "Advanced Learning", desc: "Complete specialized doctrine and operational coursework." },
      { num: "04", title: "Direct Opportunity", desc: "Access high-security postings and institutional briefs." },
      { num: "05", title: "Peer Network", desc: "Collaborate with verified practitioners and strategists." }
    ],
    benefits: ["Verified Digital Badge", "Access to Closed Research Desks", "Direct Enterprise Postings", "Continuing Professional Education"]
  },
  "drone-pilot": {
    title: "Drone Pilot & UAS Operator",
    subtitle: "Aerial Capability Specialist",
    heroTitle: "Deploy cutting-edge aerial capabilities.",
    heroDesc: "Bring flight certifications, counter-UAS proficiency, and telemetry systems into national security operations.",
    steps: [
      { num: "01", title: "Flight Credentials", desc: "Validate DGCA/equivalent commercial and tactical flight logs." },
      { num: "02", title: "Equipment Registry", desc: "Register airframe specs, sensors, and secure payloads." },
      { num: "03", title: "Tactical Protocols", desc: "Certify in encrypted BVLOS, EW evasion, and swarm ops." },
      { num: "04", title: "Mission Deployment", desc: "Bid on perimeter security and critical asset inspection tasks." },
      { num: "05", title: "Fleet Management", desc: "Collaborate on multi-operator response frameworks." }
    ],
    benefits: ["Airframe & Pilot Registry", "BVLOS & Tactical Simulation", "Rapid Deployment Roster", "Sensor Fusion Access"]
  },
  "educator": {
    title: "Educator & Course Creator",
    subtitle: "Knowledge Domain Lead",
    heroTitle: "Shape the next generation of security leadership.",
    heroDesc: "Turn institutional doctrine, academic research, and field experience into certified structured curricula.",
    steps: [
      { num: "01", title: "Faculty Accreditation", desc: "Submit academic and operational track records." },
      { num: "02", title: "Course Proposal", desc: "Define syllabus, learning outcomes, and assessment rubrics." },
      { num: "03", title: "Pedagogy Review", desc: "Collaborate with TheNST editorial council on peer review." },
      { num: "04", title: "Cohort Launch", desc: "Deliver live masterclasses and structured modular courses." },
      { num: "05", title: "Research Translation", desc: "Publish accompanying monographs and policy briefs." }
    ],
    benefits: ["Institutional Faculty Honorarium", "Global Practitioner Audience", "Digital Certification Engine", "Editorial Publishing Desk"]
  },
  "organisation": {
    title: "Organisation & Enterprise",
    subtitle: "Institutional Partner",
    heroTitle: "Procure verified capability with sovereign assurance.",
    heroDesc: "Deploy vetted security personnel, commission strategic research, and train your workforce through TheNST enterprise suite.",
    steps: [
      { num: "01", title: "Corporate Verification", desc: "Verify organizational identity and compliance mandates." },
      { num: "02", title: "Capability Requirement", desc: "Specify operational needs across personnel, tech, and intelligence." },
      { num: "03", title: "Smart Matching", desc: "Identify top verified talent and research specialists instantly." },
      { num: "04", title: "Direct Contracting", desc: "Secure agreements through standardized institutional frameworks." },
      { num: "05", title: "Command Hub", desc: "Monitor workforce readiness and training analytics in real time." }
    ],
    benefits: ["Pre-vetted Security Staffing", "Custom Intelligence Briefings", "SLA & Compliance Guarantees", "Enterprise Learning Portal"]
  },
  "researcher": {
    title: "Researcher & Analyst",
    subtitle: "Intelligence Contributor",
    heroTitle: "Publish high-impact strategic intelligence.",
    heroDesc: "Contribute to peer-reviewed defense monographs, access proprietary open-source intelligence, and brief policy leaders.",
    steps: [
      { num: "01", title: "Analyst Registration", desc: "Submit research profile and methodological background." },
      { num: "02", title: "Topic Working Groups", desc: "Join domain-focused desks in maritime, cyber, or AI." },
      { num: "03", title: "Monograph Submission", desc: "Draft analytical papers with editorial support." },
      { num: "04", title: "Policy Distribution", desc: "Disseminate findings to vetted institutional stakeholders." },
      { num: "05", title: "Conference Briefings", desc: "Present insights at annual conclaves and closed roundtables." }
    ],
    benefits: ["Research Grants & Honoraria", "Verified Citations & DOI", "Access to Primary Threat Feeds", "Roundtable Privileges"]
  },
  "learner": {
    title: "Learner & Student",
    subtitle: "Aspiring Security Professional",
    heroTitle: "Begin your journey into national security.",
    heroDesc: "Access foundational courses, understand institutional doctrines, and find mentorship from seasoned defense leaders.",
    steps: [
      { num: "01", title: "Profile Creation", desc: "Set up your student profile and learning objectives." },
      { num: "02", title: "Foundational Courses", desc: "Enrol in entry-level pathways on cyber, security, and geopolitics." },
      { num: "03", title: "Interactive Labs", desc: "Engage with case studies, scenarios, and tactical simulations." },
      { num: "04", title: "Credential Verification", desc: "Earn accredited certifications recognized across the domain." },
      { num: "05", title: "Career Pathways", desc: "Connect with entry-level openings and fellowship programs." }
    ],
    benefits: ["Structured Curriculum", "Peer Study Groups", "Mentorship Access", "Accredited Certificates"]
  }
};
