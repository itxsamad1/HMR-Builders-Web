import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/investor/Dashboard";
import Offerings from "./pages/public/Offerings";
import HowItWorks from "./pages/public/HowItWorks";
import About from "./pages/public/About";
import Learn from "./pages/public/Learn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<'en' | 'ur'>(() => {
    const saved = localStorage.getItem('hmr-language');
    return (saved as 'en' | 'ur') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('hmr-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header language={language} onLanguageChange={setLanguage} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index language={language} />} />
                <Route path="/auth/login" element={<Login language={language} />} />
                <Route path="/auth/register" element={<Register language={language} />} />
                <Route path="/dashboard" element={<Dashboard language={language} />} />
                <Route path="/offerings" element={<Offerings language={language} />} />
                <Route path="/how-it-works" element={<HowItWorks language={language} />} />
                <Route path="/about" element={<About language={language} />} />
                <Route path="/learn" element={<Learn language={language} />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer language={language} />
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
