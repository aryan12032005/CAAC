import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  LogOut, 
  Menu,
  Briefcase,
  Layers,
  FileText,
  GraduationCap,
  Landmark,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
  const { adminInfo, logout } = useAuth();
  const location = useLocation();

  if (!adminInfo) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Team Members", href: "/admin/team", icon: Users },
    { name: "Books", href: "/admin/books", icon: BookOpen },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Publications", href: "/admin/publications", icon: FileText },
    { name: "Collaborations", href: "/admin/collaborations", icon: Layers },
    { name: "FDP Workshops", href: "/admin/fdp-workshops", icon: GraduationCap },
    { name: "Research Grants", href: "/admin/research-grants", icon: Landmark },
  ];

  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] bg-slate-50/50 selection:bg-primary/20">
      {/* Decorative gradient blobs in the background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="hidden md:block z-10 border-r bg-white/60 backdrop-blur-xl shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] relative">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-16 items-center px-6 lg:h-[72px] shrink-0 border-b border-slate-100 bg-white/40">
            <Link to="/" className="flex items-center gap-3 font-bold group">
              <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">CAAC Admin</span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2 px-4 space-y-1">
            <div className="mb-4 px-2 tracking-wider text-xs font-semibold text-slate-400 uppercase">
              Management
            </div>
            <nav className="grid items-start gap-1.5 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all text-slate-500 hover:text-slate-800 group",
                      isActive && "text-primary hover:text-primary font-semibold"
                    )}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] border border-slate-100 pointer-events-none"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    ) : (
                      <div className="absolute inset-0 rounded-xl bg-slate-100/0 hover:bg-slate-100/80 transition-colors pointer-events-none" />
                    )}
                    <item.icon className={cn("h-4 w-4 relative z-10 text-slate-400 group-hover:text-primary transition-colors", isActive && "text-primary")} />
                    <span className="relative z-10">{item.name}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavDot"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary z-10" 
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          
          <div className="mt-auto p-4 pt-0 shrink-0">
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-4 border border-slate-200 mb-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 text-primary font-bold text-lg">
                  {adminInfo.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate text-slate-800">{adminInfo.username}</p>
                  <p className="text-xs text-slate-500 truncate">Super Admin</p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all rounded-xl h-11 bg-white shadow-sm" 
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col min-h-screen z-10">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/70 backdrop-blur-xl px-4 lg:h-[72px] lg:px-8 md:hidden sticky top-0 z-30 shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-white/50 border-slate-200">
                <Menu className="h-5 w-5 text-slate-700" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-[280px] bg-white border-r-slate-200">
              <nav className="grid gap-2 text-lg font-medium">
                <Link to="/" className="flex items-center gap-3 font-bold mb-6">
                  <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-sm">
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">CAAC Admin</span>
                </Link>
                {navItems.map((item) => {
                   const isActive = location.pathname.startsWith(item.href);
                   return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
                      isActive 
                        ? "bg-slate-100/80 text-primary font-semibold shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] border border-slate-100" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
                    {item.name}
                  </Link>
                )})}
              </nav>
              <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-4">
                <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 text-primary font-bold text-lg">
                      {adminInfo.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold truncate text-slate-800">{adminInfo.username}</p>
                      <p className="text-xs text-slate-500 truncate">Super Admin</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl h-12" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">Admin Portal</span>
            </Link>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-8 lg:p-8 bg-transparent overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full relative z-10"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
