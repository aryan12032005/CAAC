import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import mruLogo from "@/assets/mru-logo.png";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Team Member", href: "/team" },
  { label: "Event Calendar", href: "/events" },
  {
    label: "Publication",
    href: "/publications",
    children: [
      { label: "2025", href: "/publications#pub-2025" },
      { label: "2026", href: "/publications#pub-2026" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Research Project", href: "/projects#research-project" },
      { label: "Patent", href: "/projects#patent" },
      { label: "Projects", href: "/projects#projects-list" },
    ],
  },
  { label: "Books", href: "/books" },
  { label: "Collaborations", href: "/collaborations" },
];

const NavLink = ({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const hasHash = href.includes("#");
  const path = hasHash ? href.split("#")[0] : href;
  const hash = hasHash ? `#${href.split("#")[1]}` : "";

  const handleClick = () => {
    onClick?.();
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <Link to={path} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

const DesktopDropdown = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "#");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!item.children) {
    return (
      <NavLink
        href={item.href}
        className={`relative px-4 py-3 text-base font-medium transition-all duration-300 rounded-md overflow-hidden group ${
          isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-slate-100/50"
        }`}
      >
        <span className="relative z-10">{item.label}</span>
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary" />
        )}
      </NavLink>
    );
  }

  return (
    <div ref={ref} className="relative group">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className={`flex items-center gap-1.5 px-4 py-3 text-base font-medium transition-all duration-300 rounded-md ${
          isActive ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-slate-100/50"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary" />
        )}
      </button>
      {open && (
        <div 
          onMouseLeave={() => setOpen(false)} 
          className="absolute top-full left-0 mt-2 min-w-[200px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="p-2 flex flex-col gap-1">
            {item.children.map((child) => (
              <NavLink
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-base font-medium text-slate-600 rounded-md hover:bg-primary/5 hover:text-primary transition-all duration-200"
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNav = ({ items, onClose }: { items: NavItem[]; onClose: () => void }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <img src={mruLogo} alt="MRU Logo" className="h-14 w-auto" />
        <button onClick={onClose} className="p-2 text-foreground">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="px-4 py-4 overflow-y-auto max-h-[calc(100vh-72px)]">
        {items.map((item) => (
          <div key={item.label} className="border-b border-border/50">
            {item.children ? (
              <>
                <button
                  onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full py-3 text-base font-medium text-foreground"
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedItem === item.label ? "rotate-180" : ""}`} />
                </button>
                {expandedItem === item.label && (
                  <div className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <NavLink key={child.href} href={child.href} onClick={onClose} className="block py-2 text-sm text-muted-foreground hover:text-primary">
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink href={item.href} onClick={onClose} className="block py-3 text-base font-medium text-foreground hover:text-primary">
                {item.label}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg border-border/50" : "bg-white/95 backdrop-blur-sm shadow-sm border-transparent"}`}>
        <div className="w-full flex items-center justify-between pl-0 pr-4 sm:pr-6 lg:pr-12 h-24 md:h-28">
          <Link to="/" className="flex items-center gap-3 pl-2 sm:pl-3 flex-shrink-0">
            <img src={mruLogo} alt="Manav Rachna University" className="h-16 w-auto md:h-20" />
            <div className="hidden sm:block leading-tight">
              <div className="text-base md:text-lg font-bold tracking-wide text-primary uppercase">Manav Rachna University</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Center for AI and Advanced Computing</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
          </nav>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>
      {mobileOpen && <MobileNav items={navItems} onClose={() => setMobileOpen(false)} />}
    </>
  );
};

export default Navbar;
