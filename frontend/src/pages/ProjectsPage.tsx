import { FlaskConical, ShieldCheck, FolderOpen, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const researchProjects = {
  "2026": {
    "Accepted": [],
    "Published": [],
    "Granted": [
      { title: "AI-Driven Precision Agriculture", funding: "DST-SERB", status: "Ongoing" }
    ]
  },
  "2025": {
    "Published": [
      { title: "Smart Healthcare Monitoring System", funding: "ICMR", status: "Ongoing" }
    ],
    "Granted": []
  }
};

const patents = {
  "2026": {
    "Accepted": [],
    "Published": [],
    "Granted": [
      { title: "Intelligent Traffic Management System Using Edge Computing", filing: "IN202611001234", year: "2026" }
    ]
  },
  "2025": {
    "Published": [],
    "Granted": [
      { title: "Wearable Biosensor for Real-Time Health Analytics", filing: "IN202511005678", year: "2025" }
    ]
  }
};

const projects = {
  "2026": {
    "Accepted": [],
    "Published": [
      { title: "Campus IoT Infrastructure Development", client: "Internal", year: "2024–2026" }
    ],
    "Granted": []
  },
  "2025": {
    "Published": [],
    "Granted": [
      { title: "NLP-Based Student Feedback Analysis Tool", client: "MRU Academic Council", year: "2025" }
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProjectsPage = () => {
  const years = ["2025", "2026"];

  return (
    <PageLayout title="Projects & Innovation" subtitle="Discover our research initiatives, patents, and institutional projects driving the future of tech.">
      <Tabs defaultValue="research" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="flex flex-wrap justify-center w-full max-w-2xl bg-slate-100 p-1.5 rounded-2xl mb-4 h-auto">
            <TabsTrigger value="research" className="rounded-xl text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 px-6 flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Research Projects
            </TabsTrigger>
            <TabsTrigger value="patents" className="rounded-xl text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-secondary data-[state=active]:shadow-sm transition-all py-3 px-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Patents
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-xl text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all py-3 px-6 flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Projects
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Research Projects Content */}
        <TabsContent value="research" className="mt-0 focus-visible:outline-none max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {years.map((year) => (
              <div key={year} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="font-heading text-2xl font-extrabold text-navy">{year}</h3>
                  <div className="flex-grow h-px bg-slate-200" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries((researchProjects as Record<string, any>)[year] || {}).map(([status, items]) => (
                    <div key={status} className="bg-white/50 p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h5 className="text-lg font-bold text-slate-700 border-b border-primary/20 pb-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary/60 inline-block" />
                        {status}
                      </h5>
                      <div className="space-y-4">
                        {(items as any[]).length === 0 ? (
                          <p className="text-sm text-slate-400 italic">No projects currently.</p>
                        ) : (items as any[]).map((p) => (
                          <motion.div key={p.title} whileHover={{ scale: 1.01 }} className="group p-5 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                            <h4 className="font-heading font-semibold text-navy text-base leading-tight mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                              Funding: <span className="font-medium text-slate-700">{p.funding}</span>
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <Zap className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded text-emerald-600 bg-emerald-50 uppercase tracking-wider">{p.status}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Patents Content */}
        <TabsContent value="patents" className="mt-0 focus-visible:outline-none max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {years.map((year) => (
              <div key={year} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="font-heading text-2xl font-extrabold text-navy">{year}</h3>
                  <div className="flex-grow h-px bg-slate-200" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries((patents as Record<string, any>)[year] || {}).map(([status, items]) => (
                    <div key={status} className="bg-white/50 p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h5 className="text-lg font-bold text-slate-700 border-b border-secondary/20 pb-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary/60 inline-block" />
                        {status}
                      </h5>
                      <div className="space-y-4">
                        {(items as any[]).length === 0 ? (
                          <p className="text-sm text-slate-400 italic">No patents currently.</p>
                        ) : (items as any[]).map((p) => (
                          <motion.div key={p.title} whileHover={{ scale: 1.01 }} className="group p-5 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-secondary/30 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                            <h4 className="font-heading font-semibold text-navy text-base leading-tight mb-3 group-hover:text-secondary transition-colors">{p.title}</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-slate-500 flex justify-between">
                                <span>Filing:</span> <span className="font-mono font-medium text-slate-700">{p.filing}</span>
                              </p>
                              <p className="text-sm text-slate-500 flex justify-between">
                                <span>Year:</span> <span className="font-medium text-slate-700">{p.year}</span>
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Projects List Content */}
        <TabsContent value="projects" className="mt-0 focus-visible:outline-none max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {years.map((year) => (
              <div key={year} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="font-heading text-2xl font-extrabold text-navy">{year}</h3>
                  <div className="flex-grow h-px bg-slate-200" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries((projects as Record<string, any>)[year] || {}).map(([status, items]) => (
                    <div key={status} className="bg-white/50 p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h5 className="text-lg font-bold text-slate-700 border-b border-blue-500/20 pb-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500/60 inline-block" />
                        {status}
                      </h5>
                      <div className="space-y-4">
                        {(items as any[]).length === 0 ? (
                          <p className="text-sm text-slate-400 italic">No projects currently.</p>
                        ) : (items as any[]).map((p) => (
                          <motion.div key={p.title} whileHover={{ scale: 1.01 }} className="group p-5 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
                            <h4 className="font-heading font-semibold text-navy text-base leading-tight mb-3 group-hover:text-blue-600 transition-colors">{p.title}</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-slate-500 flex justify-between">
                                <span>Client:</span> <span className="font-medium text-slate-700 text-right">{p.client}</span>
                              </p>
                              <p className="text-sm text-slate-500 flex justify-between">
                                <span>Period:</span> <span className="font-medium text-slate-700">{p.year}</span>
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </TabsContent>

      </Tabs>
    </PageLayout>
  );
};

export default ProjectsPage;
