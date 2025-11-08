import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./app/providers/I18nProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./features/services/ServicesPage";
import ServiceDetailPage from "./features/services/ServiceDetailPage";
import DestinationsPage from "./features/destinations/DestinationsPage";
import DestinationDetailPage from "./features/destinations/DestinationDetailPage";
import AboutPage from "./features/about/AboutPage";
import BlogPage from "./features/blog/BlogPage";
import GalleryPage from "./features/gallery/GalleryPage";
import TestimonialsPage from "./features/testimonials/TestimonialsPage";
import ResumeGeneratorPage from "./features/resume/ResumeGeneratorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/resume" element={<ResumeGeneratorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
