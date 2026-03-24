import { Target, Eye, Lightbulb } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const AboutPage = () => (
  <PageLayout title="About Us" subtitle="Committed to fostering academic excellence and groundbreaking research">
    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10">
      <motion.div 
        id="objective" 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="card-institutional p-8 relative overflow-hidden group bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 rounded-3xl"
      >
        <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-bl-full w-32 h-32 -z-10 transition-transform duration-500 group-hover:scale-150" />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-heading text-3xl font-bold text-navy tracking-tight">Objective</h3>
        </div>
        <ul className="font-body text-slate-600 leading-relaxed z-10 relative space-y-3">
          <li className="flex gap-2">
            <span className="text-primary font-bold min-w-fit">•</span>
            <span>To bridge the gap between Academics & Research.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold min-w-fit">•</span>
            <span>To encourage and motivate students and Faculty members in the field of Research.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold min-w-fit">•</span>
            <span>To make the best utilization of AI Techniques for real world applications.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold min-w-fit">•</span>
            <span>To get the sponsored projects in the field of AI.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold min-w-fit">•</span>
            <span>To emphasize on the cross sector collaboration with industrial partners.</span>
          </li>
        </ul>
      </motion.div>

      <motion.div 
        id="mission" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="card-institutional p-8 relative overflow-hidden group bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 rounded-3xl"
      >
        <div className="absolute top-0 right-0 p-12 bg-amber-500/5 rounded-bl-full w-32 h-32 -z-10 transition-transform duration-500 group-hover:scale-150" />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center shadow-inner">
            <Lightbulb className="w-7 h-7 text-amber-600" />
          </div>
          <h3 className="font-heading text-3xl font-bold text-navy tracking-tight">Mission</h3>
        </div>
        <ul className="font-body text-slate-600 leading-relaxed z-10 relative space-y-3">
          <li className="flex gap-2">
            <span className="text-amber-600 font-bold min-w-fit">•</span>
            <span>To develop a Collaborative Ecosystem by including experts of various domains from academia and industry.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-600 font-bold min-w-fit">•</span>
            <span>To Focus on Multidisciplinary Research & Innovation in Artificial Intelligence and Advanced Computing, by developing transformative solutions for real-world challenges.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-600 font-bold min-w-fit">•</span>
            <span>To bring the power of AI and advanced computing for Interdisciplinary research and societal benefit by developing responsible, scalable, and impactful solutions.</span>
          </li>
        </ul>
      </motion.div>

      <motion.div 
        id="vision" 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="card-institutional p-8 relative overflow-hidden group bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 rounded-3xl"
      >
        <div className="absolute top-0 right-0 p-12 bg-secondary/5 rounded-bl-full w-32 h-32 -z-10 transition-transform duration-500 group-hover:scale-150" />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center shadow-inner">
            <Eye className="w-7 h-7 text-secondary" />
          </div>
          <h3 className="font-heading text-3xl font-bold text-navy tracking-tight">Vision</h3>
        </div>
        <p className="font-body text-slate-600 leading-relaxed text-lg z-10 relative">
          To build a <span className="font-semibold">collaborative ecosystem</span> where research and innovation in Artificial Intelligence and Advanced Computing inspire breakthrough technologies to solve the <span className="font-semibold">real-world applications</span>, aligning with SDG's for <span className="font-semibold">societal benefit, industrial growth,</span> and <span className="font-semibold">academic excellence.</span>
        </p>
      </motion.div>
    </div>
  </PageLayout>
);

export default AboutPage;
