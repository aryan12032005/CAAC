import { useEffect, useState } from "react";
import { BookOpen, Bookmark } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSectionItems } from "@/hooks/useSectionItems";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const BooksPage = () => {
  const { items, loading } = useSectionItems("books");
  const years = ["2025", "2026"];

  const buildBooksData = () => {
    const data: Record<string, Record<string, any[]>> = {};

    items.forEach((item) => {
      let year = "Unknown Year";
      if (item.year) {
        year = item.year;
      } else if (item.startDate) {
        const parsedYear = new Date(item.startDate).getFullYear();
        if (!isNaN(parsedYear)) year = parsedYear.toString();
      }

      let status = "published";
      if (item.status) {
        status = item.status.toLowerCase();
      } else if (item.description?.toLowerCase().includes("accept")) {
        status = "accepted";
      }

      const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

      if (!data[year]) {
        data[year] = { Published: [], Accepted: [] };
      }
      if (!data[year][displayStatus]) {
        data[year][displayStatus] = [];
      }

      data[year][displayStatus].push({
        title: item.title,
        authors: item.description || "CAAC Faculty",
        publisher: item.subtitle || "Publisher",
        isbn: item.link || "N/A",
        color: "from-blue-600 to-indigo-900"
      });
    });

    if (Object.keys(data).length === 0) {
      data["2025"] = { Published: [], Accepted: [] };
    }

    return data;
  };

  const booksData = buildBooksData();
  const availableYears = Object.keys(booksData).sort((a, b) => parseInt(b) - parseInt(a));
  const defaultYear = availableYears.length > 0 ? availableYears[0] : "2025";

  return (
    <PageLayout title="Books & Archives" subtitle="Discover globally recognized authored and edited volumes by our esteemed faculty.">
      {loading ? (
        <div className="text-center py-12"><p className="text-slate-500">Loading books...</p></div>
      ) : (
        <Tabs defaultValue={defaultYear} className="w-full mt-8">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-fit flex bg-slate-100 p-1.5 rounded-xl overflow-x-auto justify-start">
              {availableYears.map(year => (
                <TabsTrigger key={year} value={year} className="px-6 rounded-lg text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-2.5">
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {availableYears.map((year) => (
            <TabsContent key={year} value={year} className="mt-0">
              <div className="space-y-16">
                {Object.entries(booksData[year]).map(([status, groupItems]) => groupItems.length > 0 && (
                  <div key={status} className="space-y-8">
                    <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3">
                      <h3 className="font-heading text-3xl font-bold text-navy">{status} Books</h3>
                      <div className="flex-grow"></div>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {groupItems.length} items
                      </span>
                    </div>

                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {groupItems.map((book, idx) => (
                        <motion.div 
                          key={idx} 
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
                          
                          <p className="font-medium text-slate-600 mt-3 text-sm line-clamp-2">{book.authors}</p>
                          
                          <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">{book.publisher}</span>
                            <span className="text-xs font-semibold text-primary">{year}</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </PageLayout>
  );
};

export default BooksPage;
