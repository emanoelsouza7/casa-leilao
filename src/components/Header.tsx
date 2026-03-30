import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Encontre seu imóvel", href: "#imoveis" },
  { label: "Imóveis Caixa", href: "#caixa" },
  { label: "Financiamento", href: "#simulador" },
  { label: "Leiloeiros Parceiros", href: "#parceiros" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Leilão Imóvel" className="h-10 md:h-12" />
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
