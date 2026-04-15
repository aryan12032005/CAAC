import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Briefcase,
  Layers,
  FileText,
  GraduationCap,
  Landmark,
  ChevronRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { adminInfo } = useAuth();
  
  const sections = [
    { title: "Team Members", desc: "Manage staff, faculty, and scholars", icon: Users, path: "/admin/team", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Books", desc: "Add or edit books Authored/Edited", icon: BookOpen, path: "/admin/books", color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Events", desc: "Manage conferences and upcoming events", icon: Calendar, path: "/admin/events", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Projects", desc: "Consultancy & Sponsored research", icon: Briefcase, path: "/admin/projects", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Publications", desc: "Add new research papers and journals", icon: FileText, path: "/admin/publications", color: "text-teal-500", bg: "bg-teal-500/10" },
    { title: "Collaborations", desc: "Manage Memorandums & partnerships", icon: Layers, path: "/admin/collaborations", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "FDP Workshops", desc: "Manage faculty development workshop entries", icon: GraduationCap, path: "/admin/fdp-workshops", color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Research Grants", desc: "Manage sponsored grants and funding records", icon: Landmark, path: "/admin/research-grants", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex flex-col gap-10 pb-10 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-10 relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[150%] rounded-full bg-gradient-to-l from-primary/10 to-blue-400/5 blur-[80px] pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 pb-2 relative z-10">
          {getGreeting()},{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            {adminInfo?.username}
          </span>
          <span className="inline-block ml-2 animate-[wave_2s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="text-slate-500 mt-2 text-lg md:text-xl font-medium max-w-2xl relative z-10">
          Welcome to your command center. Select a section below to manage your organization's content efficiently.
        </p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {sections.map((section) => (
          <motion.div key={section.path} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2, type: "spring", stiffness: 300 }}>
            <Link to={section.path} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
              <Card className="bg-white/70 backdrop-blur-md hover:bg-white transition-all duration-300 h-full cursor-pointer relative overflow-hidden group border-slate-200/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl">
                <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${section.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40 pointer-events-none" />
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                  <div className={`p-3 rounded-xl ${section.bg} shadow-inner`}>
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300 shadow-sm">
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="pt-2 relative z-10 pb-6">
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </CardTitle>
                  <p className="pt-2 text-sm text-slate-500 font-medium leading-relaxed">{section.desc}</p>
                </CardContent>
                
                {/* Thin colored line at the bottom that expands on hover */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-full transition-all duration-700 ${section.color} opacity-50`} />
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;