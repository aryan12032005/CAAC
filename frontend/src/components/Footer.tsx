import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Team Member", to: "/team" },
  { label: "Publications", to: "/publications" },
  { label: "Projects", to: "/projects" },
  { label: "Collaborations", to: "/collaborations" },
  { label: "Super Admin Login", to: "/admin" },
];

const Footer = () => (
  <footer className="bg-navy text-primary-foreground">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-heading text-xl font-semibold mb-4">Manav Rachna University</h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Center for AI and Advanced Computing — Advancing research, innovation, and academic collaboration for a better tomorrow.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to} className="block text-sm text-primary-foreground/70 hover:text-gold transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Sector 43, Aravalli Hills, Faridabad, Haryana 121004</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+91-129-4198000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>coe@mru.edu.in</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Manav Rachna University — Center for AI and Advanced Computing. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
