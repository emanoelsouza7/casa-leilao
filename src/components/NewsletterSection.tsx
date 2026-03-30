import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section id="contato" className="py-16 bg-primary">
      <div className="container text-center max-w-2xl">
        <Mail className="w-12 h-12 text-coral mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-3">
          Assine nossa newsletter
        </h2>
        <p className="text-primary-foreground/70 mb-8 text-sm">
          Receba as melhores oportunidades de leilão direto no seu e-mail.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button
            type="submit"
            className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold shrink-0"
          >
            Inscrever-se
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
