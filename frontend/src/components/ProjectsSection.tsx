import { FlaskConical, ShieldCheck, FolderOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const researchProjects = {
  "2026": {
    "Accepted": [],
    "Published": [],
    "Granted": [
      { title: "AI-Driven Precision Agriculture", funding: "DST-SERB", status: "Ongoing" }
    ]
  },
  "2025": {
    "Published": [
      { title: "Smart Healthcare Monitoring System", funding: "ICMR", status: "Ongoing" }
    ],
    "Granted": []
  }
};

const patents = {
  "2026": {
    "Accepted": [],
    "Published": [],
    "Granted": [
      { title: "Intelligent Traffic Management System Using Edge Computing", filing: "IN202611001234", year: "2026" }
    ]
  },
  "2025": {
    "Published": [],
    "Granted": [
      { title: "Wearable Biosensor for Real-Time Health Analytics", filing: "IN202511005678", year: "2025" }
    ]
  }
};

const projects = {
  "2026": {
    "Accepted": [],
    "Published": [
      { title: "Campus IoT Infrastructure Development", client: "Internal", year: "2024–2026" }
    ],
    "Granted": []
  },
  "2025": {
    "Published": [],
    "Granted": [
      { title: "NLP-Based Student Feedback Analysis Tool", client: "MRU Academic Council", year: "2025" }
    ]
  }
};

const ProjectsSection = () => {
  const categories = [
    { id: "research", label: "Research Projects", icon: FlaskConical },
    { id: "patents", label: "Patents", icon: ShieldCheck },
    { id: "projects", label: "Projects", icon: FolderOpen }
  ];
  const years = ["2025", "2026"];

  return (
    <section id="projects" className="section-padding section-alt">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="heading-section">Projects</h2>
          <div className="gold-accent-line" />
          <p className="heading-sub max-w-2xl mx-auto">
            Research initiatives, patents, and institutional projects
          </p>
        </div>

        <Tabs defaultValue="research" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="flex flex-wrap justify-center w-full max-w-2xl h-auto p-1.5 bg-slate-100 rounded-xl">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="rounded-lg text-sm sm:text-base font-semibold py-2 px-4 flex items-center gap-2 transition-all">
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="research" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {years.map((year) => (
                <div key={year} className="space-y-6">
                  <h3 className="font-heading text-xl font-bold border-b border-slate-200 pb-2">{year}</h3>
                  <div className="space-y-6">
                    {Object.entries((researchProjects as Record<string, any>)[year] || {}).map(([status, items]) => (items as any[]).length > 0 && (
                      <div key={status} className="space-y-2">
                        <h5 className="text-sm font-semibold text-slate-600 inline-block">{status}</h5>
                        <div className="space-y-3">
                          {(items as any[]).map((p) => (
                            <div key={p.title} className="card-institutional p-4">
                              <h4 className="font-body font-semibold text-navy text-sm">{p.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">Funding: {p.funding}</p>
                              <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {p.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patents" className="mt-0">
             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {years.map((year) => (
                <div key={year} className="space-y-6">
                  <h3 className="font-heading text-xl font-bold border-b border-slate-200 pb-2">{year}</h3>
                  <div className="space-y-6">
                    {Object.entries((patents as Record<string, any>)[year] || {}).map(([status, items]) => (items as any[]).length > 0 && (
                      <div key={status} className="space-y-2">
                        <h5 className="text-sm font-semibold text-slate-600 inline-block">{status}</h5>
                        <div className="space-y-3">
                          {(items as any[]).map((p) => (
                            <div key={p.title} className="card-institutional p-4">
                              <h4 className="font-body font-semibold text-navy text-sm">{p.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">Filing: {p.filing}</p>
                              <p className="text-xs text-muted-foreground">Year: {p.year}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {years.map((year) => (
                <div key={year} className="space-y-6">
                  <h3 className="font-heading text-xl font-bold border-b border-slate-200 pb-2">{year}</h3>
                  <div className="space-y-6">
                    {Object.entries((projects as Record<string, any>)[year] || {}).map(([status, items]) => (items as any[]).length > 0 && (
                      <div key={status} className="space-y-2">
                        <h5 className="text-sm font-semibold text-slate-600 inline-block">{status}</h5>
                        <div className="space-y-3">
                          {(items as any[]).map((p) => (
                            <div key={p.title} className="card-institutional p-4">
                              <h4 className="font-body font-semibold text-navy text-sm">{p.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">Client: {p.client}</p>
                              <p className="text-xs text-muted-foreground">Period: {p.year}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
};

export default ProjectsSection;
