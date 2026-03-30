import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/close-up-real-estate-business-woman-working-with-p-2022-10-04-00-26-59-utc-scaled.webp",
    title: "Venda Direta Caixa – Opção Para Adquirir Imóveis baratos",
    excerpt: "Venda Direta Online Caixa – Como Funciona. A Caixa Econômica Federal retoma todos os anos...",
    href: "#",
  },
  {
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/laptop-mallet-table-scaled.webp",
    title: "Leilão de Imóveis e a Digitalização do Setor",
    excerpt: "Leilão de Imóveis é um segmento bastante tradicional, com alta regulação estatal...",
    href: "#",
  },
  {
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/young-couple-moving-into-new-home-scaled.webp",
    title: "Quanto tempo demora a desocupação de um imóvel Caixa?",
    excerpt: "Resposta curta: Entre 3 e 9 meses após a compra para imóveis em Venda Direta...",
    href: "#",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 bg-warm-bg">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Nossos Artigos
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Compartilhamos tendências, estratégias e histórias da equipe.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Outros Posts <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.href}
              className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-border"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-coral text-xs font-bold uppercase tracking-wider">Blog</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-coral text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                  Ler Artigo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
