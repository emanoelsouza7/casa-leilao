import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const articles = [
  {
    id: 1,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2024/11/processo-trabalhista-passo-a-passo.webp",
    title: "Ressarcimento da Comissão do Leiloeiro: Entenda a Efetividade no Processo Judicial",
    excerpt: "Lucia Mugayar (*) O que se entende e se defende contemporaneamente é a ideia de que o ressarcimento da comissão do leiloeiro é possível...",
    category: "Leilão de Imóveis",
    href: "https://blog.leilaoimovel.com.br/ressarcimento-comissao-leiloeiro-efetividade-processo/",
  },
  {
    id: 2,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/04/front-view-woman-working-as-economist-283x188.jpg",
    title: "Como suportar as pressões da vida?",
    excerpt: "Uma cliente, investidora em leilões, me confidenciou que passa por problemas na obra de um imóvel arrematado...",
    category: "Artigos",
    href: "https://blog.leilaoimovel.com.br/como-suportar-as-pressoes-da-vida/",
  },
  {
    id: 3,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/young-couple-moving-into-new-home-scaled.webp",
    title: "Entenda o que é 1ª Praça e 2ª Praça em um Leilão de Imóveis",
    excerpt: "Introdução — Você já se perguntou o que significa 1ª praça e 2ª praça em um leilão de imóveis?",
    category: "Leilão de Imóveis",
    href: "https://blog.leilaoimovel.com.br/entenda-o-que-e-1a-praca-e-2a-praca-em-um-leilao-de-imoveis/",
  },
  {
    id: 4,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/close-up-real-estate-business-woman-working-with-p-2022-10-04-00-26-59-utc-scaled.webp",
    title: "Vamos Arrematar o Brasil com Lucro!",
    excerpt: "Falácia, realidade possível, ou há um significado por trás dessa frase? Descubra como lucrar com leilões de imóveis.",
    category: "Artigos",
    href: "https://blog.leilaoimovel.com.br/vamos-arrematar-o-brasil-com-lucro/",
  },
  {
    id: 5,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2024/06/alavancagem-imobiliara-no-leilao-283x226.png",
    title: "Alavancagem Imobiliária",
    excerpt: "Compartilhando um caso prático e de sucesso. Em Novembro de 2023 participamos do Leilão Extrajudicial de um imóvel...",
    category: "Leilão de Imóveis",
    href: "https://blog.leilaoimovel.com.br/alavancagem-imobiliaria-um-caso-de-sucesso-leilao-santander-com-financiamento/",
  },
  {
    id: 6,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2024/02/Como-funciona-o-leilao-judicial-de-imoveis-3-283x210.jpg",
    title: "Você sabe o que é um leilão de imóvel?",
    excerpt: "O Leilão de Imóveis é uma modalidade de venda de propriedades que podem ter origem judicial ou extrajudicial...",
    category: "Leilão de Imóveis",
    href: "https://blog.leilaoimovel.com.br/voce-sabe-o-que-e-um-leilao-de-imovel/",
  },
  {
    id: 7,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/laptop-mallet-table-scaled.webp",
    title: "Leilão de Imóveis e a Digitalização do Setor",
    excerpt: "Leilão de Imóveis é um segmento bastante tradicional, com alta regulação estatal e que vem passando por transformação digital.",
    category: "Leilão de Imóveis",
    href: "https://blog.leilaoimovel.com.br/leilao-de-imoveis-e-a-digitalizacao-do-setor/",
  },
  {
    id: 8,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/close-up-real-estate-business-woman-working-with-p-2022-10-04-00-26-59-utc-scaled.webp",
    title: "Venda Direta Caixa – Opção Para Adquirir Imóveis Baratos",
    excerpt: "Venda Direta Online Caixa – Como Funciona. A Caixa Econômica Federal retoma todos os anos milhares de imóveis...",
    category: "Imóveis Caixa",
    href: "https://blog.leilaoimovel.com.br/venda-direta-caixa/",
  },
  {
    id: 9,
    image: "https://blog.leilaoimovel.com.br/wp-content/uploads/2023/02/young-couple-moving-into-new-home-scaled.webp",
    title: "Quanto tempo demora a desocupação de um imóvel Caixa?",
    excerpt: "Resposta curta: Entre 3 e 9 meses após a compra para imóveis em Venda Direta da Caixa...",
    category: "Desocupação",
    href: "https://blog.leilaoimovel.com.br/quanto-tempo-demora-desocupacao-imovel-caixa/",
  },
];

const categories = [
  { name: "Artigos", count: 2 },
  { name: "Desocupação", count: 3 },
  { name: "Imóveis Caixa", count: 5 },
  { name: "Leilão de Imóveis", count: 12 },
  { name: "Leilão Judicial", count: 4 },
  { name: "Leilão Extrajudicial", count: 3 },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !searchTerm ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const heroArticle = articles[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== 1 || searchTerm || selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      {!searchTerm && !selectedCategory && (
        <section className="relative bg-muted overflow-hidden">
          <div className="container grid md:grid-cols-2 gap-0 min-h-[400px]">
            {/* Left content */}
            <div className="flex flex-col justify-center py-12 md:py-16 pr-8">
              <nav className="text-sm text-muted-foreground mb-4">
                <a href="/" className="hover:text-primary">Home</a>
                <span className="mx-2">&gt;</span>
                <span className="text-foreground font-medium">Blog</span>
              </nav>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                Leilão de Imóveis
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight mb-4">
                {heroArticle.title}
              </h1>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {heroArticle.excerpt}
              </p>
              <a href={heroArticle.href} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Ler matéria completa
                </Button>
              </a>
            </div>
            {/* Right image */}
            <div className="hidden md:block relative">
              <img
                src={heroArticle.image}
                alt={heroArticle.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-warm-bg">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Articles Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {gridArticles.map((article) => (
                <a
                  key={article.id}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-border flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-coral text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="font-heading font-semibold text-foreground mt-2 mb-2 line-clamp-2 text-lg">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-coral text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      Ler Artigo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Search */}
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  Busque em nosso blog
                </h3>
                <div className="relative">
                  <Input
                    placeholder="Pesquisar artigo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-heading font-bold text-primary mb-4">
                  Categorias
                </h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === cat.name ? null : cat.name
                          )
                        }
                        className={`flex items-center gap-2 text-sm w-full text-left transition-colors ${
                          selectedCategory === cat.name
                            ? "text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <ArrowRight className="w-3 h-3" />
                        {cat.name} ({cat.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                <h3 className="font-heading font-bold text-lg mb-2">
                  Receba novidades
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Cadastre-se e receba artigos sobre leilões de imóveis direto no seu e-mail.
                </p>
                <Input
                  placeholder="Seu e-mail"
                  className="bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 mb-3"
                />
                <Button className="w-full bg-coral hover:bg-coral-dark text-accent-foreground font-semibold">
                  Cadastrar
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
