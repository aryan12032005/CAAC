import { Handshake } from "lucide-react";

const collaborations = [
  { org: "Indian Institute of Technology, Delhi", type: "Research Partnership", area: "AI & Machine Learning" },
  { org: "National Informatics Centre (NIC)", type: "Government Collaboration", area: "e-Governance Solutions" },
  { org: "Microsoft Research India", type: "Industry Partnership", area: "Cloud Computing & AI" },
  { org: "University of Melbourne", type: "International MoU", area: "Data Science & Analytics" },
  { org: "DRDO Labs", type: "Defense Research", area: "Cybersecurity & IoT" },
  { org: "Tata Consultancy Services", type: "Industry Collaboration", area: "Digital Transformation" },
];

const CollaborationsSection = () => (
  <section id="collaborations" className="section-padding">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">Collaborations</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Strategic partnerships with leading institutions and industry
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborations.map((collab) => (
          <div key={collab.org} className="card-institutional p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Handshake className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-navy text-sm">{collab.org}</h3>
              <p className="text-xs font-medium text-primary mt-1">{collab.type}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{collab.area}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CollaborationsSection;
