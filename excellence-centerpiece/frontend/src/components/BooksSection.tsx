import { BookOpen } from "lucide-react";

const books = [
  { title: "Foundations of Artificial Intelligence", authors: "Dr. Rajesh Kumar, Dr. Priya Sharma", publisher: "Springer", year: "2025", isbn: "978-3-030-XXXXX-X" },
  { title: "Internet of Things: Architecture and Applications", authors: "Dr. Neha Gupta", publisher: "Wiley", year: "2024", isbn: "978-1-119-XXXXX-X" },
  { title: "Cybersecurity in the Modern Enterprise", authors: "Dr. Sanjay Mehta, Dr. Amit Verma", publisher: "CRC Press", year: "2025", isbn: "978-0-367-XXXXX-X" },
];

const BooksSection = () => (
  <section id="books" className="section-padding section-cream">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">Books</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Authored and edited volumes by our faculty
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.title} className="card-institutional p-6">
            <div className="w-full h-32 bg-gradient-to-br from-navy to-maroon rounded-md flex items-center justify-center mb-5">
              <BookOpen className="w-12 h-12 text-primary-foreground/80" />
            </div>
            <h3 className="font-heading text-base font-semibold text-navy leading-snug">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{book.authors}</p>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>{book.publisher}</span>
              <span>{book.year}</span>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-1">ISBN: {book.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BooksSection;
