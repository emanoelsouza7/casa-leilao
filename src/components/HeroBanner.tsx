 import { useState, useEffect } from "react";
 import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
 
 interface HeroBannerProps {
   onOpenCatalog: () => void;
 }

const slides = [
  {
    image: "https://image.leilaoimovel.com.br/img/banner_home_image_1.webp",
    title: "Encontre o imóvel de leilão ideal para você",
    description: "Pesquise os imóveis de mais de 800 leiloeiros e bancos, atualizados diariamente.",
    cta: "Encontre seu imóvel",
    ctaHref: "#imoveis",
  },
  {
    image: "https://image.leilaoimovel.com.br/img/banner_home_image_2.webp",
    title: "Nunca mais perca uma oportunidade!",
    description: "Com o App do arrematante você é avisado sempre que um novo imóvel no seu perfil surgir.",
    cta: "Saiba mais",
    ctaHref: "#",
  },
  {
    image: "https://image.leilaoimovel.com.br/img/banner_home_image_5.webp",
    title: "Corretores credenciados em todo o Brasil",
    description: "Conte com os melhores especialistas para te ajudar a fazer arrematações de sucesso.",
    cta: "Encontre seu imóvel",
    ctaHref: "#imoveis",
  },
];

 const HeroBanner = ({ onOpenCatalog }: HeroBannerProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/80 to-teal/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-lg animate-fade-in-up">
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-primary-foreground/90 text-base md:text-lg mb-6">
                  {slide.description}
                </p>
                 <div className="flex flex-wrap gap-4">
                   <a
                     href="https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-accent-foreground font-bold px-10 py-4 rounded-lg transition-all text-base md:text-lg shadow-xl hover:scale-105"
                   >
                     <BookOpen className="w-6 h-6" />
                     Baixar Catálogo Completo Grátis
                   </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-lg transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-lg transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-coral" : "bg-card/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
