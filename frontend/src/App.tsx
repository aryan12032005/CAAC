import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import EventsPage from "./pages/EventsPage";
import PublicationsPage from "./pages/PublicationsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BooksPage from "./pages/BooksPage";
import CollaborationsPage from "./pages/CollaborationsPage";
import FDPWorkshopsPage from "./pages/FDPWorkshopsPage";
import ResearchGrantsPage from "./pages/ResearchGrantsPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSetup from "./pages/admin/AdminSetup";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeamManagerPage from "./pages/admin/TeamManagerPage";
import SectionManagerPage from "./pages/admin/SectionManagerPage";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/fdp-workshops" element={<FDPWorkshopsPage />} />
            <Route path="/research-grants" element={<ResearchGrantsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="team" element={<TeamManagerPage />} />
              <Route
                path="books"
                element={<SectionManagerPage section="books" label="Books" />}
              />
              <Route
                path="events"
                element={<SectionManagerPage section="events" label="Events" />}
              />
              <Route
                path="projects"
                element={<SectionManagerPage section="projects" label="Projects" />}
              />
              <Route
                path="publications"
                element={<SectionManagerPage section="publications" label="Publications" />}
              />
              <Route
                path="collaborations"
                element={<SectionManagerPage section="collaborations" label="Collaborations" />}
              />
              <Route
                path="fdp-workshops"
                element={<SectionManagerPage section="fdp-workshops" label="FDP Workshops" />}
              />
              <Route
                path="research-grants"
                element={<SectionManagerPage section="research-grants" label="Research Grants" />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
