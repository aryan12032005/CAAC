import { BookOpen, Bookmark } from "lucide-react";
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

const BooksSection = () => {
  const years = ["2025", "2026"];

  return (
    <section id="books" className="section-padding section-cream">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="heading-section">Books</h2>
          <div className="gold-accent-line" />
          <p className="heading-sub max-w-2xl mx-auto">
            Authored and edited volumes by our faculty
          </p>
        </div>

        <Tabs defaultValue="2025" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-[280px] grid-cols-2">
              <TabsTrigger value="2025">2025</TabsTrigger>
              <TabsTrigger value="2026">2026</TabsTrigger>
            </TabsList>
          </div>

          {years.map((year) => (
            <TabsContent key={year} value={year} className="mt-0">
              <div className="space-y-12">
                {Object.entries((booksData as Record<string, any>)[year] || {}).map(([status, items]) => (items as any[]).length > 0 && (
                  <div key={status} className="space-y-6">
                    <h3 className="font-heading text-2xl font-semibold text-navy border-b border-slate-200 pb-2">{status} Books</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(items as any[]).map((book) => (
                        <div key={book.title} className="card-institutional p-6">
                          <div className={`w-full h-32 bg-gradient-to-br from-navy to-maroon rounded-md flex items-center justify-center mb-5`}>
                            <BookOpen className="w-12 h-12 text-primary-foreground/80" />
                          </div>
                          <h3 className="font-heading text-base font-semibold text-navy leading-snug">{book.title}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{book.authors}</p>
                          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                            <span>{book.publisher}</span>
                            <span>{year}</span>
                          </div>
                          <p className="text-xs text-muted-foreground/70 mt-1">ISBN: {book.isbn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default BooksSection;
