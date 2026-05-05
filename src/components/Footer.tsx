 import { Facebook, Twitter, Linkedin, Instagram, BookOpen } from "lucide-react";
import logoImg from "@/assets/logo_leilao_imovel.png";

 interface FooterProps {
   onOpenCatalog?: () => void;
 }
 
 const Footer = ({ onOpenCatalog }: FooterProps) => {
  return (
    <footer className="bg-white border-t border-border">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <img src={logoImg} alt="Leilão Imóvel" className="h-12 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              O maior portal de imóveis de leilão do Brasil. O melhor time de especialistas e as ferramentas mais poderosas do mercado à sua disposição para te ajudar a fazer ótimos negócios.
            </p>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-heading font-bold text-coral text-sm mb-3">Institucional</h4>
            <ul className="space-y-2">
              {[
                { label: "Quem Somos", href: "/quem-somos" },
                { label: "Contato", href: "#" },
                { label: "Blog", href: "/blog" },
                { label: "Política de privacidade", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-muted-foreground text-sm hover:text-coral transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
                <li>
                  <button 
                    onClick={onOpenCatalog}
                    className="text-muted-foreground text-sm hover:text-coral transition-colors flex items-center gap-1 text-left"
                  >
                    Baixar Catálogo de Casas
                  </button>
                </li>
            </ul>
          </div>

          {/* Imóveis */}
          <div>
            <h4 className="font-heading font-bold text-coral text-sm mb-3">Imóveis</h4>
            <ul className="space-y-2">
              {[
                "Encontre seu imóvel",
                "Imóveis Caixa",
                "Simulador de financiamento",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-coral transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tipos de Imóvel */}
          <div>
            <h4 className="font-heading font-bold text-coral text-sm mb-3">Tipos de Imóvel</h4>
            <ul className="space-y-2">
              {["Casa", "Apartamento", "Terreno", "Area Rural", "Comercial"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-coral transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tipos de Leilões */}
          <div>
            <h4 className="font-heading font-bold text-coral text-sm mb-3">Tipos de Leilões</h4>
            <ul className="space-y-2">
              {[
                "Leilão Judicial",
                "Leilão Extrajudicial",
                "Venda Direta",
                "Venda Direta Caixa",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-coral transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary Footer */}
      <div className="border-t border-border">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Principais Capitais */}
            <div>
              <h4 className="font-heading font-bold text-coral text-sm mb-3">Principais Capitais</h4>
              <ul className="space-y-1">
                {[
                  "São Paulo - SP",
                  "Rio de Janeiro - RJ",
                  "Belo Horizonte - MG",
                  "Florianópolis - SC",
                  "Curitiba - PR",
                  "Brasília - DF",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-coral transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Estados */}
            <div>
              <h4 className="font-heading font-bold text-coral text-sm mb-3">Estados</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG",
                  "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR",
                  "RS", "SC", "SE", "SP", "TO",
                ].map((uf) => (
                  <a key={uf} href="#" className="text-muted-foreground text-sm hover:text-coral transition-colors">
                    {uf}
                  </a>
                ))}
              </div>
            </div>

            {/* Principais Bancos */}
            <div>
              <h4 className="font-heading font-bold text-coral text-sm mb-3">Principais Bancos</h4>
              <ul className="space-y-1">
                {[
                  "Leilão de Imóveis Caixa",
                  "Leilão de Imóveis Banco do Brasil",
                  "Leilão de Imóveis Banco BTG Pactual",
                  "Leilão de Imóveis Banco BRB",
                  "Leilão de Imóveis Bradesco",
                  "Leilão de Imóveis Santander",
                  "Leilão de Imóveis Itaú Unibanco",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-coral transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-xs">
            <p>CNPJ 35.523.642/0001-50</p>
            <p>CRECI/SP nº 36073-J <a href="#" className="text-coral hover:underline">Ver outros estados</a></p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-coral transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-coral transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-coral transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-coral transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
