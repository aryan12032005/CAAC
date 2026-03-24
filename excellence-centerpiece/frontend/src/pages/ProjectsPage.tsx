import { FlaskConical, ShieldCheck, FolderOpen, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const researchProjects = [
  { title: "AI-Driven Precision Agriculture", funding: "DST-SERB", status: "Ongoing" },
  { title: "Smart Healthcare Monitoring System", funding: "ICMR", status: "Ongoing" },
];

const patents = [
  { title: "Intelligent Traffic Management System Using Edge Computing", filing: "IN202611001234", year: "2025" },
  { title: "Wearable Biosensor for Real-Time Health Analytics", filing: "IN202611005678", year: "2025" },
];

const projects = [
  { title: "Campus IoT Infrastructure Development", client: "Internal", year: "2024–2026" },
  { title: "NLP-Based Student Feedback Analysis Tool", client: "MRU Academic Council", year: "2025" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProjectsPage = () => (
  <PageLayout title="Projects & Innovation" subtitle="Discover our research initiatives, patents, and institutional projects driving the future of tech.">
    <div className="grid lg:grid-cols-3 gap-10">
      
      <motion.div id="research-project" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <FlaskConical className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-heading text-xl font-bold text-navy">Research Projects</h3>
        </div>
        <div className="space-y-4">
          {researchProjects.map((p) => (
            <motion.div key={p.title} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <h4 className="font-heading font-semibold text-navy text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Funding: <span className="font-medium text-slate-700">{p.funding}</span>
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 uppercase tracking-widest">{p.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div id="patent" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="p-2.5 bg-secondary/10 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-heading text-xl font-bold text-navy">Patents</h3>
        </div>
        <div className="space-y-4">
          {patents.map((p) => (
            <motion.div key={p.title} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <h4 className="font-heading font-semibold text-navy text-lg leading-tight mb-2 group-hover:text-secondary transition-colors">{p.title}</h4>
              <div className="space-y-1.5">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Filing: <span className="font-mono text-xs font-medium text-slate-700">{p.filing}</span>
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Year: <span className="font-medium text-slate-700">{p.year}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div id="projects-list" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="p-2.5 bg-blue-500/10 rounded-xl">
            <FolderOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-heading text-xl font-bold text-navy">Projects</h3>
        </div>
        <div className="space-y-4">
          {projects.map((p) => (
            <motion.div key={p.title} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group p-6 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <h4 className="font-heading font-semibold text-navy text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h4>
              <div className="space-y-1.5">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Client: <span className="font-medium text-slate-700">{p.client}</span>
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Period: <span className="font-medium text-slate-700">{p.year}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  </PageLayout>
);

export default ProjectsPage;
