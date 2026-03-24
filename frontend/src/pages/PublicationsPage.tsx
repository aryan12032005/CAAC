import { FileText, ExternalLink } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const publications = {
  "2026": [
    { title: "Quantum Machine Learning: A Comprehensive Survey", authors: "Kumar R., Verma A.", journal: "ACM Computing Surveys" },
    { title: "Federated Learning for Privacy-Preserving Education Analytics", authors: "Sharma P., Gupta N.", journal: "Elsevier Computers & Education" },
  ],
  "2025": [
    { title: "Advances in Deep Learning for Healthcare Diagnostics", authors: "Kumar R., Sharma P., et al.", journal: "IEEE Transactions on AI" },
    { title: "Blockchain-Enabled Secure IoT Framework", authors: "Verma A., Mehta S.", journal: "Journal of Network Security" },
    { title: "Sustainable Computing: Green Algorithms for Smart Cities", authors: "Gupta N., Rao A.", journal: "Springer Nature" },
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const PublicationsPage = () => (
  <PageLayout title="Publications" subtitle="Peer-reviewed research contributions from our center shaping global technological discourse.">
    {Object.entries(publications).map(([year, pubs], index) => (
      <motion.div 
        key={year} 
        id={`pub-${year}`} 
        className="mb-14 last:mb-0 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <span className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-xl font-bold text-white shadow-lg">
              '{year.slice(2)}
            </span>
          </div>
          <h3 className="font-heading text-3xl font-extrabold text-navy">{year} <span className="text-slate-400 font-light text-2xl">Publications</span></h3>
          <div className="flex-grow h-px bg-gradient-to-r from-slate-200 to-transparent ml-4" />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {pubs.map((pub) => (
            <motion.div 
              key={pub.title} 
              variants={itemVariants}
              whileHover={{ scale: 1.01, translateX: 5 }}
              className="group p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex gap-5 items-start relative overflow-hidden"
            >
              <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary to-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary/5 transition-colors duration-300 flex-shrink-0 mt-1">
                <FileText className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="flex-grow">
                <h4 className="font-heading font-semibold text-lg text-navy group-hover:text-primary transition-colors pr-8">{pub.title}</h4>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                   <span className="text-slate-700 font-medium">{pub.authors}</span>
                </p>
                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-md bg-slate-50 border border-slate-100 group-hover:border-primary/10 transition-colors">
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">{pub.journal}</span>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-5 h-5 text-slate-300 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    ))}
  </PageLayout>
);

export default PublicationsPage;
