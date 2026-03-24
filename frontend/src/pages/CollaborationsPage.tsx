import { Handshake, Globe2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const collaborations = [
  { org: "Indian Institute of Technology, Delhi", type: "Research Partnership", area: "AI & Machine Learning" },
  { org: "National Informatics Centre (NIC)", type: "Government Collaboration", area: "e-Governance Solutions" },
  { org: "Microsoft Research India", type: "Industry Partnership", area: "Cloud Computing & AI" },
  { org: "University of Melbourne", type: "International MoU", area: "Data Science & Analytics" },
  { org: "DRDO Labs", type: "Defense Research", area: "Cybersecurity & IoT" },
  { org: "Tata Consultancy Services", type: "Industry Collaboration", area: "Digital Transformation" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring" } }
};

const CollaborationsPage = () => (
  <PageLayout title="Global Collaborations" subtitle="Strategic alliances and partnerships with leading institutions and industry globally.">
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {collaborations.map((collab) => (
        <motion.div 
          key={collab.org} 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group relative card-institutional p-8 flex flex-col items-center text-center bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {/* Background Map Grid Effect */}
          <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, slate-900 1px, transparent 0)",
            backgroundSize: "20px 20px"
          }} />
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-5 shrink-0 relative group-hover:scale-110 transition-transform duration-500">
            <Handshake className="w-8 h-8 text-secondary" />
            <Globe2 className="w-4 h-4 text-emerald-500 absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="relative z-10 w-full">
            <h3 className="font-heading font-bold text-navy text-lg leading-tight mb-3 group-hover:text-secondary transition-colors">{collab.org}</h3>
            
            <div className="w-12 h-0.5 bg-slate-200 mx-auto mb-4 group-hover:bg-secondary/50 group-hover:w-24 transition-all duration-300" />
            
            <p className="text-xs font-bold text-white bg-secondary/90 inline-block px-3 py-1 rounded-full mb-2 tracking-wider uppercase">{collab.type}</p>
            <p className="text-sm font-medium text-slate-500">{collab.area}</p>
          </div>
          
          {/* Edge glowing line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}
    </motion.div>
  </PageLayout>
);

export default CollaborationsPage;
