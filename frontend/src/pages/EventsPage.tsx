import { Calendar, ChevronRight, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const events = [
  { date: "Mar 25, 2026", time: "09:00 AM", title: "International Research Symposium", desc: "Annual research conference featuring global speakers and paper presentations.", type: "Conference" },
  { date: "Apr 10, 2026", time: "10:00 AM", title: "Innovation & Patent Workshop", desc: "Hands-on workshop on intellectual property rights and patent filing processes.", type: "Workshop" },
  { date: "May 5, 2026", time: "11:30 AM", title: "Industry-Academia Conclave", desc: "Collaborative summit connecting leading industry professionals with academic researchers.", type: "Summit" },
  { date: "Jun 15, 2026", time: "08:30 AM", title: "Summer Research Bootcamp", desc: "Intensive research training program for postgraduate students and early-career researchers.", type: "Training" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const EventsPage = () => (
  <PageLayout title="Event Calendar" subtitle="Join our upcoming conferences, workshops, and high-impact academic events building the future.">
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent"
    >
      {events.map((event, i) => (
        <motion.div 
          key={event.title} 
          variants={itemVariants}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          {/* Timeline Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shadow-primary/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
            <Calendar className="w-4 h-4" />
          </div>

          {/* Event Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group-hover:border-primary/20 cursor-pointer">
            <div className="flex flex-col gap-2 mb-3">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full w-max group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {event.type}
              </span>
              <div className="flex items-center gap-3 text-primary text-sm font-semibold">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {event.time}</span>
              </div>
            </div>
            
            <h3 className="font-heading text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
              {event.title}
              <ChevronRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">{event.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </PageLayout>
);

export default EventsPage;
