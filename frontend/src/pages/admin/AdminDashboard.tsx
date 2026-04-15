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

  return (
    <div className="flex flex-col gap-8 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent pb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome back, <span className="font-semibold text-foreground">{adminInfo?.username}</span>. Select a section below to manage content.
        </p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {sections.map((section) => (
          <motion.div key={section.path} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Link to={section.path} className="block h-full">
              <Card className="hover:shadow-lg transition-all duration-300 h-full cursor-pointer relative overflow-hidden group border-muted/60 hover:border-primary/50">
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${section.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className={`p-2 rounded-lg ${section.bg}`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>
                  <p className="pt-2 text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;