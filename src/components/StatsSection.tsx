import { Building2, Users, MapPin, Home } from "lucide-react";

const stats = [
  { icon: Home, value: "+2.200", label: "Imóveis vendidos" },
  { icon: Users, value: "+885", label: "Leiloeiros e Bancos" },
  { icon: MapPin, value: "+2.522", label: "Cidades com imóveis" },
  { icon: Building2, value: "+48.196", label: "Imóveis a venda" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container">
        {/* About */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16" id="sobre">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              O maior portal de imóveis de leilão do Brasil
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Temos milhares de imóveis em leilão em todo o Brasil. Encontre a melhor oportunidade
              para a sua necessidade e conte com nosso time de especialistas para te auxiliar em todo
              o processo de compra.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Economize tempo", "Simplifique sua rotina", "Crédito aprovado em 24h"].map((item) => (
                <span
                  key={item}
                  className="bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-2 rounded-full"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://www.leilaoimovel.com.br/img/li/residential-modern-apartment-building.webp"
              alt="Edifício moderno"
              className="rounded-2xl shadow-xl w-full h-[300px] object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-coral text-accent-foreground px-5 py-3 rounded-xl shadow-lg">
              <span className="font-heading font-bold text-lg">24h</span>
              <br />
              <span className="text-xs">Crédito aprovado</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-2xl p-8 md:p-12">
          <h3 className="text-center font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-10">
            Nós realizamos sonhos!
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-coral mx-auto mb-3" />
                <div className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
