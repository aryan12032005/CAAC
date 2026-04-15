import TeamMember from "./models/TeamMember.js";
import SectionItem from "./models/SectionItem.js";

const defaultTeamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    designation: "Leader",
    category: "Faculty",
    email: "rajesh.kumar@mru.edu.in",
  },
  {
    name: "Dr. Priya Sharma",
    designation: "Co-Lead",
    category: "Faculty",
    email: "priya.sharma@mru.edu.in",
  },
  {
    name: "Dr. Amit Verma",
    designation: "Senior Research Fellow",
    category: "Research Scholar",
    email: "amit.verma@mru.edu.in",
  },
  {
    name: "Dr. Neha Gupta",
    designation: "Assistant Professor",
    category: "Faculty",
    email: "neha.gupta@mru.edu.in",
  },
];

const defaultSectionItems = [
  {
    section: "books",
    title: "Foundations of Artificial Intelligence",
    subtitle: "Springer",
    description: "Authored by CAAC faculty with practical AI foundations.",
    startDate: "2025",
  },
  {
    section: "events",
    title: "International Research Symposium",
    subtitle: "Conference",
    description: "Annual symposium with global speakers and paper presentations.",
    startDate: "2026-03-25",
  },
  {
    section: "projects",
    title: "AI-Driven Precision Agriculture",
    subtitle: "DST-SERB",
    description: "Applied AI project focused on precision farming outcomes.",
    startDate: "2026",
  },
  {
    section: "publications",
    title: "Advances in Deep Learning for Healthcare Diagnostics",
    subtitle: "IEEE Transactions on AI",
    description: "Peer-reviewed publication by CAAC research team.",
    startDate: "2025",
  },
  {
    section: "collaborations",
    title: "Microsoft Research India",
    subtitle: "Industry Partnership",
    description: "Collaboration in cloud computing and applied AI initiatives.",
  },
  {
    section: "fdp-workshops",
    title: "Advanced AI & Machine Learning FDP",
    subtitle: "Faculty Development Program",
    description: "Hands-on training for faculty on LLMs and neural networks.",
    startDate: "2025-08-15",
    endDate: "2025-08-20",
  },
  {
    section: "research-grants",
    title: "AI-Powered Diagnostics for Early Disease Detection",
    subtitle: "Department of Science and Technology (DST)",
    description: "Granted research project on AI diagnostics and early intervention.",
    startDate: "2025",
  },
];

export const seedDefaultsIfEmpty = async () => {
  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany(defaultTeamMembers);
    console.log("Seeded default team members");
  }

  const sections = [
    "books",
    "events",
    "projects",
    "publications",
    "collaborations",
    "fdp-workshops",
    "research-grants",
  ];

  for (const section of sections) {
    const count = await SectionItem.countDocuments({ section });
    if (count === 0) {
      const itemsForSection = defaultSectionItems.filter((item) => item.section === section);
      if (itemsForSection.length > 0) {
        await SectionItem.insertMany(itemsForSection);
        console.log(`Seeded default section items for ${section}`);
      }
    }
  }
};
