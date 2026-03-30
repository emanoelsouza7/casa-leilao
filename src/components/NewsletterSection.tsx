import { useState } from "react";
import { Mail, User, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      toast({ title: "Preencha nome e email", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim() || null,
      mensagem: mensagem.trim() || null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: error.message, variant: "destructive" });
    } else {
      setSuccess(true);
      setNome("");
      setEmail("");
      setTelefone("");
      setMensagem("");
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section id="contato" className="py-16 bg-primary">
      <div className="container text-center max-w-2xl">
        <Mail className="w-12 h-12 text-coral mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-3">
          Cadastre-se e receba oportunidades
        </h2>
        <p className="text-primary-foreground/70 mb-8 text-sm">
          Preencha seus dados e entraremos em contato com as melhores ofertas de imóveis.
        </p>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle className="w-16 h-16 text-green-400" />
            <p className="text-primary-foreground font-semibold text-lg">Cadastro realizado com sucesso!</p>
            <p className="text-primary-foreground/70 text-sm">Entraremos em contato em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
              <Input
                placeholder="Seu nome *"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
              <Input
                type="email"
                placeholder="Seu e-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                required
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
              <Input
                type="tel"
                placeholder="Seu telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
            </div>
            <Textarea
              placeholder="Mensagem (opcional)"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 min-h-[80px]"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold"
            >
              {loading ? "Enviando..." : "Cadastrar"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
