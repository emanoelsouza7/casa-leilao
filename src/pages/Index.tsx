import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import SimulatorSection from "@/components/SimulatorSection";
import RecentProperties from "@/components/RecentProperties";
import StatsSection from "@/components/StatsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <RecentProperties />
        <SimulatorSection />
        <StatsSection />
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
