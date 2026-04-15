import "dotenv/config";
import mongoose from "mongoose";
import TeamMember from "./models/TeamMember.js";
import SectionItem from "./models/SectionItem.js";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/caac_admin_db";

const teamSeed = [
  { name: "Dr. Rajesh Kumar", designation: "Director", category: "Faculty", email: "rajesh.kumar@mru.edu.in" },
  { name: "Dr. Priya Sharma", designation: "Co-Director", category: "Faculty", email: "priya.sharma@mru.edu.in" },
  { name: "Dr. Amit Verma", designation: "Senior Research Fellow", category: "Research Scholar", email: "amit.verma@mru.edu.in" },
  { name: "Dr. Neha Gupta", designation: "Assistant Professor", category: "Faculty", email: "neha.gupta@mru.edu.in" },
  { name: "Ms. Kavya Jain", designation: "Project Coordinator", category: "Staff", email: "kavya.jain@mru.edu.in" },
  { name: "Mr. Rohan Malhotra", designation: "Lab Engineer", category: "Staff", email: "rohan.malhotra@mru.edu.in" },
];

const sectionSeed = [
  { section: "books", title: "Foundations of Artificial Intelligence", subtitle: "Springer", description: "A practical guide to modern AI foundations.", startDate: "2025" },
  { section: "books", title: "Cybersecurity in the Modern Enterprise", subtitle: "CRC Press", description: "Enterprise-focused cybersecurity strategies and patterns.", startDate: "2026" },

  { section: "events", title: "International Research Symposium", subtitle: "Conference", description: "Annual symposium with global speakers and paper presentations.", startDate: "2026-03-25" },
  { section: "events", title: "Innovation and Patent Workshop", subtitle: "Workshop", description: "Hands-on workshop on IPR and patent filing process.", startDate: "2026-04-10" },

  { section: "projects", title: "AI-Driven Precision Agriculture", subtitle: "DST-SERB", description: "Applied AI to optimize precision agriculture outcomes.", startDate: "2026" },
  { section: "projects", title: "Smart Healthcare Monitoring System", subtitle: "ICMR", description: "AI and IoT based health monitoring for proactive care.", startDate: "2025" },

  { section: "publications", title: "Advances in Deep Learning for Healthcare Diagnostics", subtitle: "IEEE Transactions on AI", description: "Peer-reviewed paper on healthcare diagnostics.", startDate: "2025" },
  { section: "publications", title: "Federated Learning for Privacy-Preserving Education Analytics", subtitle: "Elsevier Computers and Education", description: "Federated learning pipeline for protected analytics.", startDate: "2026" },

  { section: "collaborations", title: "Microsoft Research India", subtitle: "Industry Partnership", description: "Joint work on cloud AI and applied research programs.", link: "https://www.microsoft.com/en-us/research/" },
  { section: "collaborations", title: "IIT Delhi", subtitle: "Academic Collaboration", description: "Collaborative grants and publication pipeline with IIT Delhi.", link: "https://home.iitd.ac.in/" },

  { section: "fdp-workshops", title: "Advanced AI and Machine Learning FDP", subtitle: "Faculty Development Program", description: "Hands-on FDP covering LLMs, MLOps, and evaluation.", startDate: "2025-08-15", endDate: "2025-08-20" },
  { section: "fdp-workshops", title: "Research Methodology Workshop", subtitle: "Workshop", description: "Academic writing, review response, and publication strategy.", startDate: "2025-09-05", endDate: "2025-09-06" },

  { section: "research-grants", title: "AI-Powered Diagnostics for Early Disease Detection", subtitle: "Department of Science and Technology", description: "National grant supporting early disease prediction models.", startDate: "2025" },
  { section: "research-grants", title: "Cybersecurity Infrastructure for IoT Devices", subtitle: "MeitY", description: "Funding for secure-by-design IoT security stack.", startDate: "2026" },
];

const seed = async () => {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);

    let teamInserted = 0;
    for (const member of teamSeed) {
      const result = await TeamMember.updateOne(
        { name: member.name, designation: member.designation },
        { $setOnInsert: member },
        { upsert: true }
      );
      if (result.upsertedCount > 0) {
        teamInserted += 1;
      }
    }

    let sectionInserted = 0;
    for (const item of sectionSeed) {
      const result = await SectionItem.updateOne(
        { section: item.section, title: item.title },
        { $setOnInsert: item },
        { upsert: true }
      );
      if (result.upsertedCount > 0) {
        sectionInserted += 1;
      }
    }

    console.log(`Dummy team records inserted: ${teamInserted}`);
    console.log(`Dummy section records inserted: ${sectionInserted}`);
    console.log("Dummy data seeding completed.");
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
