import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Encontre seu imóvel", href: "#imoveis" },
  { label: "Imóveis Caixa", href: "#caixa" },
  { label: "Financiamento", href: "#simulador" },
  { label: "Leiloeiros Parceiros", href: "#parceiros" },
  { label: "Quem Somos", href: "#sobre" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">LI</span>
            </div>
            <div className="leading-tight">
              <span className="font-heading font-bold text-primary text-lg leading-none">LEILÃO</span>
              <br />
              <span className="font-heading font-semibold text-coral text-xs tracking-wider leading-none">IMÓVEL</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-foreground">
            Login
          </Button>
          <Button size="sm" className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold">
            Cadastre-se
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm">Login</Button>
              <Button size="sm" className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold">
                Cadastre-se
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
