 import { useState } from "react";
 import Header from "@/components/Header";
 import HeroBanner from "@/components/HeroBanner";
import SimulatorSection from "@/components/SimulatorSection";
import RecentProperties from "@/components/RecentProperties";
import StatsSection from "@/components/StatsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
 import Footer from "@/components/Footer";
 import CatalogSection from "@/components/CatalogSection";
 import CatalogModal from "@/components/CatalogModal";
 import { Button } from "@/components/ui/button";
 import { BookOpen } from "lucide-react";

const Index = () => {
   const [isCatalogOpen, setIsCatalogOpen] = useState(false);
 
  return (
    <div className="min-h-screen flex flex-col">
       <Header onOpenCatalog={() => setIsCatalogOpen(true)} />
      <main className="flex-1">
         <HeroBanner onOpenCatalog={() => setIsCatalogOpen(true)} />
        <RecentProperties />
         <CatalogSection onOpenModal={() => setIsCatalogOpen(true)} />
        <SimulatorSection />
        <StatsSection />
        <BlogSection />
        <NewsletterSection />
      </main>
       <Footer onOpenCatalog={() => setIsCatalogOpen(true)} />
 
       {/* Floating Action Button */}
        <a
          href="https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-coral hover:bg-coral-dark text-accent-foreground font-bold rounded-full shadow-2xl flex items-center gap-2 px-6 py-4 animate-bounce hover:animate-none no-underline"
        >
          <span className="flex items-center gap-2">📘 Baixar catálogo grátis</span>
        </a>
 
       <CatalogModal isOpen={isCatalogOpen} onOpenChange={setIsCatalogOpen} />
    </div>
  );
};

export default Index;
