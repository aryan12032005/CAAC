import { Calendar } from "lucide-react";

const events = [
  { date: "Mar 25, 2026", title: "International Research Symposium", desc: "Annual research conference featuring global speakers and paper presentations." },
  { date: "Apr 10, 2026", title: "Innovation & Patent Workshop", desc: "Hands-on workshop on intellectual property rights and patent filing processes." },
  { date: "May 5, 2026", title: "Industry-Academia Conclave", desc: "Collaborative summit connecting leading industry professionals with academic researchers." },
  { date: "Jun 15, 2026", title: "Summer Research Bootcamp", desc: "Intensive research training program for postgraduate students and early-career researchers." },
];

const EventsSection = () => (
  <section id="events" className="section-padding section-alt">
    <div className="container-narrow">
      <div className="text-center mb-16">
        <h2 className="heading-section">Event Calendar</h2>
        <div className="gold-accent-line" />
        <p className="heading-sub max-w-2xl mx-auto">
          Upcoming conferences, workshops, and academic events
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.title} className="card-institutional p-6 flex flex-col sm:flex-row gap-5 items-start">
            <div className="flex-shrink-0 flex items-center gap-3 sm:w-48">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">{event.date}</span>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-navy">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
