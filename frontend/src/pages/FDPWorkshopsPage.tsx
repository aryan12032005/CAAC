import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { CalendarDays, Users, MapPin } from "lucide-react";

const fdpData = [
  {
    id: 1,
    title: "Advanced AI & Machine Learning FDP",
    date: "August 15-20, 2025",
    location: "Main Campus Auditorium",
    organizer: "Dept of Computer Science",
    description: "A 5-day comprehensive faculty development program focusing on deeply understanding large language models and neural networks.",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Research Methodology Workshop",
    date: "September 5-6, 2025",
    location: "Virtual (Zoom)",
    organizer: "Research & Development Cell",
    description: "An interactive two-day workshop designed to enhance academic writing and proper research methodology for peer-reviewed journals.",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices FDP",
    date: "July 1-5, 2025",
    location: "Lab 3, IT Block",
    organizer: "Dept of IT",
    description: "Intensive training for faculty members on modern cybersecurity threats, ethical hacking fundamentals, and enterprise security architecture.",
    status: "Completed",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const FDPWorkshopsPage = () => {
  return (
    <PageLayout 
      title="FDP & Workshops" 
      subtitle="Faculty Development Programs and practical workshops designed to foster academic and research excellence."
    >
      <div className="mt-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {fdpData.map((item) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.status}
                </span>
                <span className="flex items-center text-xs text-muted-foreground gap-1">
                  <CalendarDays className="w-3 h-3" /> {item.date}
                </span>
              </div>
              
              <h3 className="font-heading text-xl font-bold text-navy mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-slate-600 text-sm mb-6 flex-grow">
                {item.description}
              </p>
              
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-500 gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500 gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{item.organizer}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default FDPWorkshopsPage;