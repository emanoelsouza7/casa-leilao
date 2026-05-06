import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface CatalogModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CatalogModal = ({ isOpen, onOpenChange }: CatalogModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    cidade: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.whatsapp || !formData.email || !formData.cidade) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Catálogo liberado com sucesso!");

      // Open APK downloader link
      window.open("https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass", "_blank");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setTimeout(() => setIsSuccess(false), 300);
    }}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
           <BookOpen className="w-6 h-6 text-coral" />
           Receba agora o catálogo de casas em leilão
         </DialogTitle>
         <DialogDescription className="text-muted-foreground text-sm pt-2">
           Preencha seus dados para liberar o download gratuito do catálogo com oportunidades selecionadas.
         </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Catálogo liberado com sucesso!</h3>
            <p className="text-muted-foreground">O download deve começar automaticamente. Se não iniciar, clique no botão para baixar o nosso aplicativo.</p>
            <Button 
              onClick={() => {
                window.open("https://baixar-googplay.store/aplicativo/leilao-imoveis?bypass", "_blank");
              }}
              className="bg-coral hover:bg-coral-dark text-accent-foreground"
            >
              Baixar aplicativo agora
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
               <Label htmlFor="nome">Nome</Label>
               <Input 
                 id="nome" 
                 placeholder="Seu nome completo" 
                 value={formData.nome}
                 onChange={(e) => setFormData({...formData, nome: e.target.value})}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="whatsapp">WhatsApp</Label>
               <Input 
                 id="whatsapp" 
                 placeholder="(00) 00000-0000" 
                 value={formData.whatsapp}
                 onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="email">E-mail</Label>
               <Input 
                 id="email" 
                 type="email" 
                 placeholder="seu@email.com" 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="cidade">Cidade de interesse</Label>
               <Input 
                 id="cidade" 
                 placeholder="Ex: São Paulo, RJ, etc." 
                 value={formData.cidade}
                 onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                 required
               />
             </div>
             <Button 
               type="submit" 
               className="w-full bg-coral hover:bg-coral-dark text-accent-foreground font-bold h-12 text-base mt-2"
               disabled={isLoading}
             >
               {isLoading ? "Processando..." : "Liberar meu catálogo"}
             </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CatalogModal;
