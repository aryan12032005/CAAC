import { FlaskConical, ShieldCheck, FolderOpen } from "lucide-react";

const researchProjects = [
  { title: "AI-Driven Precision Agriculture", funding: "DST-SERB", status: "Ongoing" },
  { title: "Smart Healthcare Monitoring System", funding: "ICMR", status: "Ongoing" },
];

const patents = [
  { title: "Intelligent Traffic Management System Using Edge Computing", filing: "IN202611001234", year: "2025" },
  { title: "Wearable Biosensor for Real-Time Health Analytics", filing: "IN202611005678", year: "2025" },
];

const projects = [
  { title: "Campus IoT Infrastructure Development", client: "Internal", year: "2024–2026" },
  { title: "NLP-Based Student Feedback Analysis Tool", client: "MRU Academic Council", year: "2025" },
];

const ProjectsSection = () => (
  <section id="projects" className="section-padding section-alt">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">Projects</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Research initiatives, patents, and institutional projects
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div id="research-project">
          <div className="flex items-center gap-2 mb-5">
            <FlaskConical className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-xl font-semibold text-navy">Research Projects</h3>
          </div>
          <div className="space-y-4">
            {researchProjects.map((p) => (
              <div key={p.title} className="card-institutional p-5">
                <h4 className="font-body font-semibold text-navy text-sm">{p.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">Funding: {p.funding}</p>
                <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div id="patent">
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-xl font-semibold text-navy">Patents</h3>
          </div>
          <div className="space-y-4">
            {patents.map((p) => (
              <div key={p.title} className="card-institutional p-5">
                <h4 className="font-body font-semibold text-navy text-sm">{p.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">Filing: {p.filing}</p>
                <p className="text-xs text-muted-foreground">Year: {p.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="projects-list">
          <div className="flex items-center gap-2 mb-5">
            <FolderOpen className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-xl font-semibold text-navy">Projects</h3>
          </div>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.title} className="card-institutional p-5">
                <h4 className="font-body font-semibold text-navy text-sm">{p.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">Client: {p.client}</p>
                <p className="text-xs text-muted-foreground">Period: {p.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
