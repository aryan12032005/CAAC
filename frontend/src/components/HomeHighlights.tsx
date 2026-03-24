import { Link } from "react-router-dom";
import { ArrowRight, Brain, Microscope, Shield, Globe, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import aiResearchLab from "@/assets/ai-research-lab.jpg";
import aiInnovation from "@/assets/ai-innovation.jpg";

const HomeHighlights = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const researchAreas = [
    { icon: Brain, title: "Artificial Intelligence & ML", desc: "Deep learning, NLP, computer vision, and generative AI research driving next-generation solutions.", link: "/projects" },
    { icon: Microscope, title: "AI in Healthcare", desc: "Affordable cancer diagnostics, mental stress recognition using wearable AI-based frameworks.", link: "/projects" },
    { icon: Shield, title: "Cybersecurity & IoT", desc: "Edge computing, blockchain-enabled secure frameworks, and intelligent threat detection.", link: "/projects" },
    { icon: Globe, title: "Smart Urban Planning", desc: "AI-driven GIS for accessibility, decision-making, and sociological policy frameworks.", link: "/projects" },
  ];

  const quickLinks = [
    { icon: Users, label: "Meet Our Team", desc: "Distinguished faculty and researchers", to: "/team" },
    { icon: BookOpen, label: "Publications", desc: "Peer-reviewed research papers", to: "/publications" },
    { icon: Brain, label: "Research Projects", desc: "Ongoing funded research", to: "/projects" },
    { icon: Globe, label: "Collaborations", desc: "Global academic partnerships", to: "/collaborations" },
  ];

  return (
    <div>
      {/* About Preview */}
      <section className="section-padding section-cream overflow-hidden">
        <div className="container-narrow">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                About CAAC
              </div>
              <h2 className="heading-section mb-6">
                World-Class AI Research & Innovation Hub
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                The Center for AI and Advanced Computing at Manav Rachna University
                houses cutting-edge computing facilities and brings together domain experts,
                young scientists, and motivated students to drive transformative AI innovations
                at a global scale.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Our center integrates AI education both vertically and horizontally — from
                foundational Machine Learning to Generative AI, Large Language Models, and
                Explainable AI, bridging research with industry applications across all disciplines.
              </p>
              <Link to="/about" className="btn-primary group mt-6 inline-flex">
                Learn More
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img src={aiResearchLab} alt="AI Research Lab" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-maroon-light flex items-center justify-center shadow-lg">
                <div className="text-center text-primary-foreground">
                  <div className="text-2xl font-heading font-bold">10+</div>
                  <div className="text-xs">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container-narrow relative z-10"
        >
          <div className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground mb-4">
                Pioneering Research Areas
              </h2>
              <div className="gold-accent-line" />
              <p className="text-lg font-light text-primary-foreground/70 max-w-2xl mx-auto">
                Driving real-world impact through cutting-edge AI research across multiple domains
              </p>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {researchAreas.map((area, i) => (
              <motion.div 
                key={area.title} 
                variants={fadeInUp}
              >
                <Link
                  to={area.link}
                  className="block group p-6 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300"
                >
                  <area.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl font-semibold text-primary-foreground mb-2">{area.title}</h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">{area.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Advantage - Image + Content */}
      <section className="section-padding overflow-hidden">
        <div className="container-narrow">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <img src={aiInnovation} alt="AI Innovation" className="rounded-xl shadow-2xl w-full" />
            </motion.div>
            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
                The CAAC Advantage
              </div>
              <h2 className="heading-section mb-6">AI for All — Across Every Discipline</h2>
              <div className="space-y-4">
                {[
                  { title: "Comprehensive AI Curriculum", desc: "From ML basics to advanced Gen AI, LLMs, and Transformer models." },
                  { title: "Hi-Tech Infrastructure", desc: "State-of-the-art AI labs with high-performance GPU computing resources." },
                  { title: "Industry Partnerships", desc: "Active collaborations with leading tech companies and research institutions." },
                  { title: "World-Class Faculty", desc: "Faculty from premier institutes, recognized among top researchers globally." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-body font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="section-padding section-alt">
        <div className="container-narrow">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="heading-section mb-4">Explore CAAC</h2>
              <div className="gold-accent-line" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((item, i) => (
                <motion.div key={item.label} variants={fadeInUp}>
                  <Link
                    to={item.to}
                    className="block card-institutional p-6 text-center group hover:border-primary/20"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-navy mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <ArrowRight className="w-4 h-4 text-primary mx-auto mt-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeHighlights;
