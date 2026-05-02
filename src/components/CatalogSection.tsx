import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, MapPin, RefreshCw } from "lucide-react";

interface CatalogSectionProps {
  onOpenModal: () => void;
}

const CatalogSection = ({ onOpenModal }: CatalogSectionProps) => {
  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-coral" />,
      title: "Casas com grandes descontos",
    },
    {
      icon: <MapPin className="w-6 h-6 text-coral" />,
      title: "Oportunidades em várias regiões",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-coral" />,
      title: "Atualização frequente de imóveis",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="container">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-coral" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            Baixe nosso catálogo de casas em leilão
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Receba uma seleção atualizada de imóveis em leilão com oportunidades em várias cidades do Brasil. 
            Consulte valores, descontos e opções disponíveis antes de tomar sua decisão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-warm-bg p-6 rounded-xl border border-border flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="mb-4">{benefit.icon}</div>
              <h4 className="font-heading font-bold text-primary text-lg">{benefit.title}</h4>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onOpenModal}
            className="bg-coral hover:bg-coral-dark text-accent-foreground font-bold h-14 px-10 text-lg rounded-lg shadow-lg transition-all"
          >
            Baixar catálogo agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
