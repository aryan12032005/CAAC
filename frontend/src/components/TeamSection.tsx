import { User } from "lucide-react";

const leaders = [
  { name: "Dr. Rajesh Kumar", role: "Leader", department: "Computer Science & Engineering" },
  { name: "Dr. Priya Sharma", role: "Co-Lead", department: "Artificial Intelligence & ML" },
];

const teamMembers = [
  { name: "Dr. Amit Verma", role: "Senior Research Fellow", department: "Data Science & Analytics" },
  { name: "Dr. Neha Gupta", role: "Assistant Professor", department: "Internet of Things" },
  { name: "Dr. Sanjay Mehta", role: "Research Coordinator", department: "Cybersecurity" },
  { name: "Dr. Anita Rao", role: "Faculty Researcher", department: "Robotics & Automation" },
];

const TeamSection = () => (
  <section id="team" className="section-padding">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">Team Members</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Distinguished faculty and researchers leading our academic mission
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leaders.map((member) => (
            <div key={member.name} className="card-institutional p-6 text-center h-full">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-navy">{member.name}</h3>
              <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{member.department}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="card-institutional p-6 text-center h-full">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-navy">{member.name}</h3>
              <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{member.department}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TeamSection;
