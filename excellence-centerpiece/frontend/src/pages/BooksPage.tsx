import { BookOpen, Bookmark } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const books = [
  { title: "Foundations of Artificial Intelligence", authors: "Dr. Rajesh Kumar, Dr. Priya Sharma", publisher: "Springer", year: "2025", isbn: "978-3-030-XXXXX-X", color: "from-blue-600 to-indigo-900" },
  { title: "Internet of Things: Architecture and Applications", authors: "Dr. Neha Gupta", publisher: "Wiley", year: "2024", isbn: "978-1-119-XXXXX-X", color: "from-blue-600 to-indigo-900" },
  { title: "Cybersecurity in the Modern Enterprise", authors: "Dr. Sanjay Mehta, Dr. Amit Verma", publisher: "CRC Press", year: "2025", isbn: "978-0-367-XXXXX-X", color: "from-blue-600 to-indigo-900" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const BooksPage = () => (
  <PageLayout title="Books & Archives" subtitle="Discover globally recognized authored and edited volumes by our esteemed faculty.">
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {books.map((book) => (
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
          
          <p className="text-sm font-medium text-slate-500 mt-3">{book.authors}</p>
          
          <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Publisher</span>
              <span className="text-sm text-slate-700 font-medium">{book.publisher}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Year</span>
              <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{book.year}</span>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-[11px] font-mono text-slate-400 bg-slate-50 p-1.5 rounded w-max">ISBN: {book.isbn}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </PageLayout>
);

export default BooksPage;
