 import { Button } from "@/components/ui/button";
 import { BookOpen, CheckCircle, MapPin, RefreshCw, Zap } from "lucide-react";

interface CatalogSectionProps {
  onOpenModal: () => void;
}

const CatalogSection = ({ onOpenModal }: CatalogSectionProps) => {
   const benefits = [
     {
       icon: <CheckCircle className="w-6 h-6 text-coral" />,
       title: "Imóveis com grandes descontos",
       text: "Encontre casas com valores abaixo do preço de mercado.",
     },
     {
       icon: <RefreshCw className="w-6 h-6 text-coral" />,
       title: "Oportunidades atualizadas",
       text: "Receba uma seleção de imóveis disponíveis em leilão.",
     },
     {
       icon: <MapPin className="w-6 h-6 text-coral" />,
       title: "Casas em várias regiões",
       text: "Consulte opções em diferentes cidades e estados.",
     },
     {
       icon: <Zap className="w-6 h-6 text-coral" />,
       title: "Acesso rápido e gratuito",
       text: "Preencha seus dados e baixe o catálogo em poucos segundos.",
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
             Baixe grátis o catálogo com as melhores casas em leilão
           </h2>
           <p className="text-xl text-primary font-medium mb-4">
             Veja imóveis selecionados com valores abaixo do mercado, oportunidades atualizadas e opções em várias cidades do Brasil.
           </p>
           <p className="text-lg text-muted-foreground leading-relaxed">
             Nosso catálogo reúne casas em leilão com descontos atrativos, informações organizadas e oportunidades para quem deseja comprar imóvel com economia e segurança.
           </p>
         </div>
 
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {benefits.map((benefit, index) => (
             <div key={index} className="bg-warm-bg p-6 rounded-xl border border-border flex flex-col items-center text-center transition-transform hover:-translate-y-1">
               <div className="mb-4">{benefit.icon}</div>
               <h4 className="font-heading font-bold text-primary text-lg mb-2">{benefit.title}</h4>
               <p className="text-sm text-muted-foreground">{benefit.text}</p>
             </div>
           ))}
         </div>

         <div className="flex flex-col items-center justify-center gap-4">
           <Button 
             onClick={onOpenModal}
             className="bg-coral hover:bg-coral-dark text-accent-foreground font-bold h-14 px-10 text-lg rounded-lg shadow-lg transition-all"
           >
             Quero baixar o catálogo grátis
           </Button>
           <p className="text-sm text-muted-foreground italic">
             Catálogo gratuito por tempo limitado.
           </p>
         </div>
      </div>
    </section>
  );
};

export default CatalogSection;
