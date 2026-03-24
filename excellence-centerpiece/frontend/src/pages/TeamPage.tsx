import { User, Cpu } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Dr. Rajesh Kumar", role: "Director, Center for AI and Advanced Computing", department: "Computer Science & Engineering" },
  { name: "Dr. Priya Sharma", role: "Associate Professor", department: "Artificial Intelligence & ML" },
  { name: "Dr. Amit Verma", role: "Senior Research Fellow", department: "Data Science & Analytics" },
  { name: "Dr. Neha Gupta", role: "Assistant Professor", department: "Internet of Things" },
  { name: "Dr. Sanjay Mehta", role: "Research Coordinator", department: "Cybersecurity" },
  { name: "Dr. Anita Rao", role: "Faculty Researcher", department: "Robotics & Automation" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
};

const TeamPage = () => (
  <PageLayout title="Team Members" subtitle="Distinguished faculty and researchers leading our academic mission">
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {teamMembers.map((member, index) => (
        <motion.div 
          key={member.name}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center overflow-hidden"
        >
          {/* Techy background accent */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-primary/20 flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:border-primary/50 transition-colors duration-300">
              <User className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors duration-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-navy mb-2">{member.name}</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>{member.role}</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{member.department}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </PageLayout>
);

export default TeamPage;
