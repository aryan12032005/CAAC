import { FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const publications = {
  "2026": {
    "Communicated": [
      { title: "Quantum Machine Learning: A Comprehensive Survey", authors: "Kumar R., Verma A.", journal: "ACM Computing Surveys" },
    ],
    "Published": [
      { title: "Federated Learning for Privacy-Preserving Education Analytics", authors: "Sharma P., Gupta N.", journal: "Elsevier Computers & Education" },
    ]
  },
  "2025": {
    "Published": [
      { title: "Advances in Deep Learning for Healthcare Diagnostics", authors: "Kumar R., Sharma P., et al.", journal: "IEEE Transactions on AI" },
      { title: "Blockchain-Enabled Secure IoT Framework", authors: "Verma A., Mehta S.", journal: "Journal of Network Security" },
      { title: "Sustainable Computing: Green Algorithms for Smart Cities", authors: "Gupta N., Rao A.", journal: "Springer Nature" },
    ]
  }
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

      <Tabs defaultValue="2025" className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="grid w-full max-w-[280px] grid-cols-2">
            <TabsTrigger value="2025">2025</TabsTrigger>
            <TabsTrigger value="2026">2026</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(publications).map(([year, sections]) => (
          <TabsContent key={year} value={year} className="mt-0 space-y-6">
            <div className="space-y-8">
              {Object.entries(sections).map(([status, items]) => items.length > 0 && (
                <div key={status}>
                  <h4 className="text-lg font-bold text-slate-700 mb-4 inline-block border-b border-primary/20">{status}</h4>
                  <div className="space-y-4">
                    {items.map((pub) => (
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </section>
);

export default PublicationSection;
