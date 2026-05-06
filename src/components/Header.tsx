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
          <div className="hidden lg:flex items-center gap-2">
            <a 
              href="https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-coral hover:bg-coral-dark text-accent-foreground font-semibold h-9 rounded-lg flex items-center gap-1 shadow-sm px-4 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Baixar Catálogo
            </a>
 
           <div className="h-6 w-[1px] bg-border mx-1" />
 
          {isReady && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center">
                    <User className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-xs text-muted-foreground">{user.email}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isReady ? (
            <>
              <Button variant="ghost" size="sm" className="text-foreground" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold" onClick={() => navigate("/cadastro")}>
                Cadastre-se
              </Button>
            </>
          ) : null}
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
             
            <div className="flex gap-3 pt-3 border-t border-border">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center">
                      <User className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-sm font-medium truncate">{userName}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { setMobileOpen(false); handleLogout(); }}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => { setMobileOpen(false); navigate("/login"); }}>Login</Button>
                  <Button size="sm" className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold" onClick={() => { setMobileOpen(false); navigate("/cadastro"); }}>
                    Cadastre-se
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
   );
 });
 
 Header.displayName = "Header";
 export default Header;
