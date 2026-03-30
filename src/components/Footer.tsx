const Footer = () => {
  return (
    <footer className="bg-teal-dark py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1 mb-4">
              <div className="w-7 h-7 rounded bg-coral flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-xs">LI</span>
              </div>
              <div className="leading-tight">
                <span className="font-heading font-bold text-primary-foreground text-sm">LEILÃO</span>
                <br />
                <span className="font-heading font-semibold text-coral text-[10px] tracking-wider">IMÓVEL</span>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-xs leading-relaxed">
              O maior portal de imóveis de leilão do Brasil.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-sm mb-3">Navegação</h4>
            <ul className="space-y-2">
              {["Encontre seu imóvel", "Imóveis Caixa", "Financiamento", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/60 text-xs hover:text-coral transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-sm mb-3">Institucional</h4>
            <ul className="space-y-2">
              {["Quem Somos", "Leiloeiros Parceiros", "Contato", "Termos de Uso"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/60 text-xs hover:text-coral transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-sm mb-3">Redes Sociais</h4>
            <ul className="space-y-2">
              {["Instagram", "Facebook", "YouTube", "LinkedIn"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/60 text-xs hover:text-coral transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-xs">
            © 2026 Leilão Imóvel. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
