import { Calculator, TrendingUp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Home,
    title: "Veja o valor das parcelas do seu próximo imóvel.",
  },
  {
    icon: TrendingUp,
    title: "Descubra o valor máximo do imóvel que você pode financiar.",
  },
  {
    icon: Calculator,
    title: "Analise diferentes cenários de financiamento.",
  },
];

const SimulatorSection = () => {
  return (
    <section id="simulador" className="py-16 bg-primary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <img
              src="https://www.leilaoimovel.com.br/img/li/porquinho.webp"
              alt="Simulador"
              className="w-48 md:w-64 mx-auto md:mx-0 mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Simulador de Financiamento Imobiliário
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-base leading-relaxed">
              Conheça nosso simulador onde você pode encontrar o valor das parcelas do seu próximo imóvel,
              o valor máximo do imóvel que você pode financiar e analisar diferentes cenários de financiamento.
            </p>
            <Button className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold px-8 py-3 text-base">
              Conhecer simulador
            </Button>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid gap-4">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 hover:bg-primary-foreground/15 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center shrink-0 group-hover:bg-coral/30 transition-colors">
                  <feat.icon className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold text-sm">{feat.title}</p>
                  <span className="text-coral text-xs font-medium">Ir ao simulador →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
