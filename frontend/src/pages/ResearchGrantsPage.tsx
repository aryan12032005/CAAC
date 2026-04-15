import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Award, FileCheck } from "lucide-react";
import { useSectionItems } from "@/hooks/useSectionItems";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ResearchGrantsPage = () => {
  const { items, loading } = useSectionItems("research-grants");

  const buildGrants = () => {
    const granted: any[] = [];
    const sanctioned: any[] = [];
    
    items.forEach((item, idx) => {
      const isSanctioned = Object.values(item).some(v => String(v).toLowerCase().includes('sanctioned'));
      const grant = {
        id: item._id || idx.toString(),
        title: item.title,
        principalInvestigator: "CAAC Investigator",
        fundingAgency: item.subtitle || "Agency",
        amount: item.link || "TBD",
        year: item.startDate || "TBA",
        duration: item.endDate || "TBD",
        status: isSanctioned ? "Sanctioned" : "Granted"
      };
      
      if (isSanctioned) {
        sanctioned.push(grant);
      } else {
        granted.push(grant);
      }
    });
    
    return { granted, sanctioned };
  };

  const researchGrantsData = buildGrants();

  return (
    <PageLayout 
      title="Research Grants" 
      subtitle="Explore our ongoing and upcoming research grants awarded by leading national and international agencies."
    >
      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12"><p className="text-slate-500">Loading grants...</p></div>
        ) : (
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
                {researchGrantsData.granted.length === 0 ? (
                  <p className="text-slate-500">No granted funds found.</p>
                ) : researchGrantsData.granted.map((grant) => (
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
                {researchGrantsData.sanctioned.length === 0 ? (
                  <p className="text-slate-500">No sanctioned funds found.</p>
                ) : researchGrantsData.sanctioned.map((grant) => (
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
        )}
      </div>
    </PageLayout>
  );
};

export default ResearchGrantsPage;