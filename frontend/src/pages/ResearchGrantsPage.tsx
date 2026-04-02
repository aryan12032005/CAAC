import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Award, FileCheck } from "lucide-react";

// Mock data based on Granted and Sanctioned Grants
const researchGrantsData = {
  granted: [
    {
      id: "G1",
      title: "AI-Powered Diagnostics for Early Disease Detection",
      principalInvestigator: "Dr. Rajesh Kumar",
      fundingAgency: "Department of Science and Technology (DST)",
      amount: "₹ 45,00,000",
      year: "2025",
      duration: "3 Years",
      status: "Granted"
    },
    {
      id: "G2",
      title: "Renewable Energy Storage Solutions for Urban Smart Grids",
      principalInvestigator: "Dr. Neha Gupta",
      fundingAgency: "Ministry of New and Renewable Energy",
      amount: "₹ 28,50,000",
      year: "2024",
      duration: "2 Years",
      status: "Granted"
    }
  ],
  sanctioned: [
    {
      id: "S1",
      title: "Cybersecurity Infrastructure for IoT Devices in Smart Cities",
      principalInvestigator: "Dr. Amit Verma",
      fundingAgency: "Ministry of Electronics and Information Technology (MeitY)",
      amount: "₹ 55,00,000",
      year: "2025",
      duration: "3 Years",
      status: "Sanctioned"
    },
    {
      id: "S2",
      title: "Next-Generation Blockchain Architectures for Healthcare",
      principalInvestigator: "Dr. Sanjay Mehta",
      fundingAgency: "Defense Research and Development Organisation (DRDO)",
      amount: "₹ 62,00,000",
      year: "2026",
      duration: "4 Years",
      status: "Sanctioned"
    }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ResearchGrantsPage = () => {
  return (
    <PageLayout 
      title="Research Grants" 
      subtitle="Explore our ongoing and upcoming research grants awarded by leading national and international agencies."
    >
      <div className="mt-8">
        <Tabs defaultValue="granted" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 p-1 bg-slate-100/80 rounded-xl shadow-sm">
              <TabsTrigger value="granted" className="flex items-center gap-2 rounded-lg py-2.5">
                <Award className="w-4 h-4" />
                Granted
              </TabsTrigger>
              <TabsTrigger value="sanctioned" className="flex items-center gap-2 rounded-lg py-2.5">
                <FileCheck className="w-4 h-4" />
                Sanctioned
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="granted" className="mt-0">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid lg:grid-cols-2 gap-8"
            >
              {researchGrantsData.granted.map((grant) => (
                <motion.div 
                  key={grant.id} 
                  variants={itemVariants}
                  className="bg-white border hover:border-primary/30 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-green-200">
                      {grant.status}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {grant.year}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-navy mb-4 pr-6 leading-snug">
                    {grant.title}
                  </h3>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-3">
                      <Bookmark className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Principal Investigator</p>
                        <p className="text-sm text-slate-700 font-medium">{grant.principalInvestigator}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Funding Agency</p>
                        <p className="text-sm text-slate-700 font-medium">{grant.fundingAgency}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Amount</p>
                        <p className="text-lg font-bold text-primary">{grant.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase font-semibold">Duration</p>
                        <p className="text-sm font-semibold text-slate-600">{grant.duration}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="sanctioned" className="mt-0">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid lg:grid-cols-2 gap-8"
            >
              {researchGrantsData.sanctioned.map((grant) => (
                <motion.div 
                  key={grant.id} 
                  variants={itemVariants}
                  className="bg-white border hover:border-secondary/30 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -z-10" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-200">
                      {grant.status}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {grant.year}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-navy mb-4 pr-6 leading-snug">
                    {grant.title}
                  </h3>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-3">
                      <Bookmark className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Principal Investigator</p>
                        <p className="text-sm text-slate-700 font-medium">{grant.principalInvestigator}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Funding Agency</p>
                        <p className="text-sm text-slate-700 font-medium">{grant.fundingAgency}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">Amount</p>
                        <p className="text-lg font-bold text-secondary">{grant.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase font-semibold">Duration</p>
                        <p className="text-sm font-semibold text-slate-600">{grant.duration}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ResearchGrantsPage;