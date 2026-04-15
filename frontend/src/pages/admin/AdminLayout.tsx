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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/20 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg">CAAC Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-muted-foreground hover:text-foreground",
                      isActive && "text-primary hover:text-primary font-medium"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20 pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className={cn("h-4 w-4 relative z-10 text-muted-foreground", isActive && "text-primary")} />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t bg-muted/10 shrink-0">
            <Button variant="outline" className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout Session
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 md:hidden sticky top-0 z-30">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-[280px]">
              <nav className="grid gap-2 text-lg font-medium">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-6">
                  <div className="bg-primary/10 p-1.5 rounded-md">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                  </div>
                  <span>CAAC Admin</span>
                </Link>
                {navItems.map((item) => {
                   const isActive = location.pathname.startsWith(item.href);
                   return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-xl px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors",
                      isActive && "bg-primary/10 text-primary font-medium border border-primary/20"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    {item.name}
                  </Link>
                )})}
              </nav>
              <div className="mt-auto pt-6 border-t">
                <Button variant="outline" className="w-full gap-2 hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout Session
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 px-4">
             <span className="font-semibold text-lg">Admin Portal</span>
          </div>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-8 lg:p-8 bg-muted/10 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
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
