import { FileText } from "lucide-react";

const publications = {
  "2025": [
    { title: "Advances in Deep Learning for Healthcare Diagnostics", authors: "Kumar R., Sharma P., et al.", journal: "IEEE Transactions on AI" },
    { title: "Blockchain-Enabled Secure IoT Framework", authors: "Verma A., Mehta S.", journal: "Journal of Network Security" },
    { title: "Sustainable Computing: Green Algorithms for Smart Cities", authors: "Gupta N., Rao A.", journal: "Springer Nature" },
  ],
  "2026": [
    { title: "Quantum Machine Learning: A Comprehensive Survey", authors: "Kumar R., Verma A.", journal: "ACM Computing Surveys" },
    { title: "Federated Learning for Privacy-Preserving Education Analytics", authors: "Sharma P., Gupta N.", journal: "Elsevier Computers & Education" },
  ],
};

const PublicationSection = () => (
  <section id="publication" className="section-padding">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">Publications</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Peer-reviewed research contributions from our center
        </p>
      </div>

      {Object.entries(publications).map(([year, pubs]) => (
        <div key={year} id={`pub-${year}`} className="mb-12 last:mb-0">
          <h3 className="font-heading text-2xl font-semibold text-navy mb-6 flex items-center gap-2">
            <span className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              {year.slice(2)}
            </span>
            {year}
          </h3>
          <div className="space-y-4">
            {pubs.map((pub) => (
              <div key={pub.title} className="card-institutional p-5 flex gap-4 items-start">
                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-body font-semibold text-navy">{pub.title}</h4>
                  <p className="text-sm text-muted-foreground">{pub.authors}</p>
                  <p className="text-xs text-primary font-medium mt-1">{pub.journal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PublicationSection;
