import { Link } from "react-router-dom";
import { ArrowRight, Brain, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import aiNeuralNetwork from "@/assets/ai-neural-network.jpg";

const FloatingParticle = ({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) => (
  <div
    className="absolute rounded-full bg-gold/20 animate-float"
    style={{
      width: size,
      height: size,
      left,
      top,
      animationDelay: `${delay}s`,
    }}
  />
);

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={aiNeuralNetwork} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95" />
      </div>

      {/* Floating particles */}
      <FloatingParticle delay={0} size={6} left="10%" top="20%" />
      <FloatingParticle delay={1.5} size={4} left="80%" top="30%" />
      <FloatingParticle delay={3} size={8} left="60%" top="15%" />
      <FloatingParticle delay={2} size={5} left="25%" top="70%" />
      <FloatingParticle delay={4} size={7} left="75%" top="65%" />
      <FloatingParticle delay={1} size={3} left="45%" top="80%" />
      <FloatingParticle delay={2.5} size={6} left="90%" top="50%" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm mb-8">
          <Zap className="w-4 h-4 text-gold" />
          <span className="text-xs font-semibold tracking-widest text-gold uppercase">Center for AI and Advanced Computing</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-heading text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-primary-foreground mb-2">
          <span className="bg-gradient-to-r from-primary-foreground via-gold-light to-primary-foreground bg-clip-text text-transparent">
            CAAC
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <Brain className="w-6 h-6 text-gold animate-pulse-glow" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        <motion.p variants={itemVariants} className="font-body text-lg sm:text-xl md:text-2xl font-light text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed mb-12">
          Pioneering the Fusion of AI with Every Discipline — Driving Excellence in
          Innovation, Advanced Research & Transformative Learning at{" "}
          <span className="text-gold font-medium">Manav Rachna University</span>
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/about" className="btn-primary text-lg px-10 py-4 group">
            Explore the Center
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
          >
            Our Research
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50+", label: "Research Publications", icon: Cpu },
            { value: "12+", label: "Patents Filed", icon: Brain },
            { value: "20+", label: "Industry Partners", icon: Zap },
            { value: "6+", label: "Active Projects", icon: ArrowRight },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm transition-colors hover:bg-primary-foreground/10"
            >
              <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
              <div className="text-3xl font-heading font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-xs text-primary-foreground/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-gold animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
