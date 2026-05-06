 import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
 import { Menu, X, User, LogOut, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { User as SupaUser } from "@supabase/supabase-js";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Encontre seu imóvel", href: "#imoveis" },
  { label: "Financiamento", href: "#simulador" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contato" },
];

 export interface HeaderRef {
   openCatalog: () => void;
 }
 
 const Header = forwardRef<HeaderRef, { onOpenCatalog?: () => void }>((props, ref) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

   useImperativeHandle(ref, () => ({
     openCatalog: () => {
       if (props.onOpenCatalog) props.onOpenCatalog();
     }
   }));
 
   const userName = user?.user_metadata?.nome || user?.email?.split("@")[0] || "Usuário";

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center">
          <img src={logo} alt="Leilão Imóvel" className="h-10 md:h-12" />
        </a>

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

         {/* Auth Area & Catalog Button */}
          <div className="hidden lg:flex items-center">
            <a 
              href="https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-coral hover:bg-coral-dark text-accent-foreground font-bold h-11 rounded-lg flex items-center gap-2 shadow-md px-6 text-base transition-all hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              Baixar Catálogo Agora
            </a>
          </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
               <a key={link.label} href={link.href} className="text-sm font-medium text-foreground hover:text-primary py-2" onClick={() => setMobileOpen(false)} >
                 {link.label}
               </a>
             ))}
              <a 
                href="https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-coral flex items-center gap-2 py-2"
              >
                <BookOpen className="w-4 h-4" /> Baixar Catálogo
              </a>
             
             <div className="pt-4 border-t border-border">
               <a 
                 href="https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass"
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => setMobileOpen(false)}
                 className="flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-accent-foreground font-bold py-3 rounded-lg shadow-sm"
               >
                 <BookOpen className="w-5 h-5" /> Baixar Catálogo Agora
               </a>
             </div>
          </nav>
        </div>
      )}
    </header>
   );
 });
 
 Header.displayName = "Header";
 export default Header;
