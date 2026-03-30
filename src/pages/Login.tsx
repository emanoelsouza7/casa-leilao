import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";
import logoImg from "@/assets/logo.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({ title: "Erro ao entrar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login realizado com sucesso!" });
      navigate("/");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Digite seu email", description: "Informe seu email para recuperar a senha.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email enviado", description: "Verifique sua caixa de entrada para redefinir a senha." });
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left - Login Form */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <h1 className="text-3xl font-heading font-bold text-foreground text-center mb-8">Login</h1>

          <p className="text-center text-muted-foreground text-sm mb-6">Ou use seu email de login:</p>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="pl-11 h-12 border-0 border-b border-border rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-coral"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-coral hover:underline"
              >
                Esqueceu a senha ?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-teal-dark hover:bg-teal-dark/90 text-primary-foreground font-semibold rounded-full text-base"
            >
              {loading ? "ENTRANDO..." : "LOGIN"}
            </Button>
          </form>
        </div>

        {/* Right - Signup CTA */}
        <div className="bg-teal-dark p-10 md:p-14 flex flex-col items-center justify-center text-center">
          <img src={logoImg} alt="Leilão Imóvel" className="h-20 mb-8 brightness-0 invert" />
          <h2 className="text-2xl font-heading font-bold text-primary-foreground mb-4">
            Não Possui Cadastro ?
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-2">
            Clique no botão abaixo e crie sua conta agora mesmo
          </p>
          <p className="text-primary-foreground/80 text-sm mb-8">
            E tenha acesso a ferramentas exclusivas
          </p>
          <Link
            to="/cadastro"
            className="border-2 border-primary-foreground text-primary-foreground px-10 py-3 rounded-full font-semibold hover:bg-primary-foreground hover:text-teal-dark transition-colors"
          >
            CADASTRO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
