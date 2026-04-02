import { BookOpen, Bookmark } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const booksData = {
  "2025": {
    "Published": [
      { title: "Foundations of Artificial Intelligence", authors: "Dr. Rajesh Kumar, Dr. Priya Sharma", publisher: "Springer", isbn: "978-3-030-XXXXX-X", color: "from-blue-600 to-indigo-900" },
      { title: "Cybersecurity in the Modern Enterprise", authors: "Dr. Sanjay Mehta, Dr. Amit Verma", publisher: "CRC Press", isbn: "978-0-367-XXXXX-X", color: "from-blue-600 to-indigo-900" },
    ]
  },
  "2026": {
    "Accepted": [
       { title: "Advanced Machine Learning Concepts", authors: "Dr. Neha Gupta", publisher: "Wiley", isbn: "978-1-119-XXXXX-X", color: "from-blue-600 to-indigo-900" },
    ],
    "Published": [
       { title: "Next-Gen Cloud Computing", authors: "Dr. Amit Verma", publisher: "Springer", isbn: "978-3-030-YYYYY-Y", color: "from-blue-600 to-indigo-900" }
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const BooksPage = () => {
  const years = ["2025", "2026"];

  return (
    <PageLayout title="Books & Archives" subtitle="Discover globally recognized authored and edited volumes by our esteemed faculty.">
      
      <Tabs defaultValue="2025" className="w-full mt-8">
        <div className="flex justify-center mb-12">
          <TabsList className="grid w-full max-w-[280px] grid-cols-2">
            <TabsTrigger value="2025">2025</TabsTrigger>
            <TabsTrigger value="2026">2026</TabsTrigger>
          </TabsList>
        </div>

        {years.map((year) => (
          <TabsContent key={year} value={year} className="mt-0">
            <div className="space-y-16">
              {Object.entries((booksData as Record<string, any>)[year] || {}).map(([status, items]) => (items as any[]).length > 0 && (
                <div key={status} className="space-y-8">
                  <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3">
                    <h3 className="font-heading text-3xl font-bold text-navy">{status} Books</h3>
                    <div className="flex-grow"></div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {(items as any[]).length} items
                    </span>
                  </div>

                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {(items as any[]).map((book) => (
                      <motion.div 
                        key={book.title} 
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="group relative bg-white border border-slate-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Top colored accent line */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className={`w-full h-40 bg-gradient-to-br ${book.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner relative overflow-hidden`}>
                          {/* Book glowing effect */}
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <BookOpen className="w-16 h-16 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                          
                          {/* Decorative binding line */}
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20" />
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <h3 className="font-heading text-lg font-bold text-navy leading-tight flex-grow group-hover:text-primary transition-colors">{book.title}</h3>
                          <Bookmark className="w-5 h-5 text-slate-300 shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-secondary transition-all" />
                        </div>
                        
                        <p className="font-medium text-slate-600 mt-3 text-sm">{book.authors}</p>
                        
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">{book.publisher}</span>
                          <span className="text-xs font-semibold text-primary">{year}</span>
                        </div>
                        
                        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                          <span className="font-semibold text-slate-500">ISBN:</span> {book.isbn}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </PageLayout>
  );
};

export default BooksPage;
