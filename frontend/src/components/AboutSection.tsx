import { Target, Eye, Lightbulb } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="section-padding section-cream">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">About Us</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Committed to fostering academic excellence and groundbreaking research
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10">
        <div id="objective" className="card-institutional p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-navy">Objective</h3>
          </div>
          <ul className="text-muted-foreground leading-[1.8] space-y-4 text-justify" style={{ fontFamily: "Arial, sans-serif", fontSize: "0.95rem" }}>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-fit mt-1">•</span>
              <span className="block">To bridge the gap between Academics & Research.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-fit mt-1">•</span>
              <span className="block">To encourage and motivate students and Faculty members in the field of Research.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-fit mt-1">•</span>
              <span className="block">To make the best utilization of AI Techniques for real world applications.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-fit mt-1">•</span>
              <span className="block">To get the sponsored projects in the field of AI.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold min-w-fit mt-1">•</span>
              <span className="block">To emphasize on the cross sector collaboration with industrial partners.</span>
            </li>
          </ul>
        </div>

        <div id="mission" className="card-institutional p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-navy">Mission</h3>
          </div>
          <ul className="text-muted-foreground leading-[1.8] space-y-4 text-justify" style={{ fontFamily: "Arial, sans-serif", fontSize: "0.95rem" }}>
            <li className="flex gap-3">
              <span className="text-amber-600 font-bold min-w-fit mt-1">•</span>
              <span className="block">To develop a Collaborative Ecosystem by including experts of various domains from academia and industry.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600 font-bold min-w-fit mt-1">•</span>
              <span className="block">To Focus on Multidisciplinary Research & Innovation in Artificial Intelligence and Advanced Computing, by developing transformative solutions for real-world challenges.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600 font-bold min-w-fit mt-1">•</span>
              <span className="block">To bring the power of AI and advanced computing for Interdisciplinary research and societal benefit by developing responsible, scalable, and impactful solutions.</span>
            </li>
          </ul>
        </div>

        <div id="vision" className="card-institutional p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-navy">Vision</h3>
          </div>
          <p className="text-muted-foreground leading-[1.8] text-justify block w-full" style={{ fontFamily: "Arial, sans-serif", fontSize: "0.95rem" }}>
            To build a <span className="font-semibold">collaborative ecosystem</span> where research and innovation in Artificial Intelligence and Advanced Computing inspire breakthrough technologies to solve the <span className="font-semibold">real-world applications</span>, aligning with SDG's for <span className="font-semibold">societal benefit, industrial growth,</span> and <span className="font-semibold">academic excellence.</span>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
