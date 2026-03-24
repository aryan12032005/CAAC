import { motion } from "framer-motion";
import aiHealthcare from "@/assets/ai-healthcare.jpg";
import aiSmartCity from "@/assets/ai-smart-city.jpg";
import aiCybersecurity from "@/assets/ai-cybersecurity.jpg";

const impacts = [
  {
    img: aiHealthcare,
    title: "AI in Cancer Diagnostics",
    desc: "Affordable & accessible AI-based multi-grade breast cancer prediction system.",
  },
  {
    img: aiSmartCity,
    title: "AI-Driven Smart Urban Planning",
    desc: "Advancing accessibility, decision-making, and sociological policy frameworks through GIS.",
  },
  {
    img: aiCybersecurity,
    title: "AI for Cybersecurity",
    desc: "Intelligent threat detection and blockchain-enabled secure IoT frameworks.",
  },
];

const HomeResearchImpact = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="section-padding section-cream overflow-hidden"
    >
      <div className="container-narrow">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="heading-section mb-4">Creating Real-World Impact</h2>
          <div className="gold-accent-line" />
          <p className="heading-sub max-w-2xl mx-auto">
            Groundbreaking AI innovations conceived at the Center for AI and Advanced Computing (CAAC), driving transformative impact at a global scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="group rounded-xl overflow-hidden bg-background shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HomeResearchImpact;
