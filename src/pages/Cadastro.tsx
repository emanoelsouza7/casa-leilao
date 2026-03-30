import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Phone } from "lucide-react";
import logoImg from "@/assets/logo.webp";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { nome, telefone },
      },
    });

    if (error) {
      toast({ title: "Erro ao cadastrar", description: error.message, variant: "destructive" });
    } else {
      // Save lead
      await supabase.from("leads").insert({ nome, email, telefone });
      toast({ title: "Cadastro realizado!", description: "Verifique seu email para confirmar a conta." });
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left - CTA */}
        <div className="bg-teal-dark p-10 md:p-14 flex flex-col items-center justify-center text-center order-2 md:order-1">
          <img src={logoImg} alt="Leilão Imóvel" className="h-20 mb-8 brightness-0 invert" />
          <h2 className="text-2xl font-heading font-bold text-primary-foreground mb-4">
            Já Possui Cadastro ?
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-8">
            Clique no botão abaixo e faça login
          </p>
          <Link
            to="/login"
            className="border-2 border-primary-foreground text-primary-foreground px-10 py-3 rounded-full font-semibold hover:bg-primary-foreground hover:text-teal-dark transition-colors"
          >
            LOGIN
          </Link>
        </div>

        {/* Right - Signup Form */}
        <div className="p-10 md:p-14 flex flex-col justify-center order-1 md:order-2">
          <h1 className="text-3xl font-heading font-bold text-foreground text-center mb-8">Cadastro</h1>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
                className="pl-11 h-12 border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-coral"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="pl-11 h-12 border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-coral"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Telefone"
                className="pl-11 h-12 border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-coral"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="pl-11 h-12 border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-coral"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-teal-dark hover:bg-teal-dark/90 text-primary-foreground font-semibold rounded-full text-base"
            >
              {loading ? "CADASTRANDO..." : "CADASTRAR"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
