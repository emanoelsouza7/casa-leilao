import { useState } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, Bookmark, Share2, LayoutGrid, List, X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchPropertyCard from "@/components/SearchPropertyCard";
import { Button } from "@/components/ui/button";

const activeFilters = [
  { label: "Ordenação: Ordem Padrão", removable: true },
  { label: "Cidade: Ananindeua", removable: true },
  { label: "Cidade: Belém", removable: true },
  { label: "Cidade: Benevides", removable: true },
  { label: "Cidade: Breu Branco", removable: true },
  { label: "Cidade: Castanhal", removable: true },
  { label: "Cidade: Marituba", removable: true },
  { label: "Cidade: Parauapebas", removable: true },
  { label: "Cidade: Tucuruí", removable: true },
  { label: "Tipo: Casa", removable: true },
];

const properties = [
  {
    image: "https://image.leilaoimovel.com.br/images/62/casa-caixa-em-araruama-rj-2762062-imovel-2762062-412d47f2431fd1f3a6d805053efe246e15f3601d-m.webp",
    title: "Casa em Leilão em Benevides / PA - 2729153",
    address: "Avenida Terceira Avenida Princ SN Loteamento Jard. Neopolis",
    price: "R$ 228.760,00",
    tags: ["Extrajudicial", "Pestana Leilões"],
    closingDate: "31/03/2026 10:00",
    date1: "31/03/2026 10:00",
    price1: "R$ 228.760,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/61/apartamento-caixa-em-belford-roxo-rj-2762061-imovel-2762061-3b24ea5e2fe77528ee9ea611c6de3a1828c43e17-m.webp",
    title: "Casas em Ananindeua / PA - 2622186",
    address: "RUA SANTOS DUMONT, 21, QD H RESIDENCIAL ANTONIO QUEIROZ - QUARENTA HORAS (COQUEIRO), ANANINDEUA/PA",
    price: "R$ 231.200,00",
    oldPrice: "R$ 800.000,00",
    discount: "71%",
    tags: ["Venda Direta"],
    closingDate: "06/11/2026 10:51",
    date1: "06/11/2026 10:51",
    price1: "R$ 231.200,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/60/apartamento-caixa-em-belford-roxo-rj-2762060-imovel-2762060-1570f4ed085892f53399029e1b78dbd2ac256378-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2763593",
    address: "RUA E, N. 22, PASSAGEM COIMBRA, Vale Verde, COQUEIRO, ANANINDEUA - PA",
    price: "R$ 132.803,54",
    discount: "21%",
    tags: ["Extrajudicial"],
    closingDate: "05/05/2026 10:00",
    date1: "05/05/2026 10:00",
    price1: "R$ 132.803,54",
    date2: "11/05/2026 10:00",
    price2: "R$ 104.527,30",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/59/apartamento-caixa-em-belford-roxo-rj-2762059-imovel-2762059-cef41b9d4be2ab1e03bd52b0ef8fb557c66225e0-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2748098",
    address: "Rua Raniere Marinho, 19C, Icuí-Guajará, Ananindeua, PA",
    price: "R$ 150.000,00",
    tags: ["Extrajudicial"],
    closingDate: "29/04/2026 10:09",
    date1: "29/04/2026 10:09",
    price1: "R$ 150.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/58/apartamento-caixa-em-belford-roxo-rj-2762058-imovel-2762058-f28a8f497cd2f3a397ecf163c347277df84fcd3e-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2742880",
    address: "Alameda dos Girassois 77 (Lote 77 da Quadra C-02)",
    price: "R$ 136.000,00",
    tags: ["Extrajudicial", "Pestana Leilões"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 136.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/57/apartamento-caixa-em-belford-roxo-rj-2762057-imovel-2762057-d1db7b2a5d32baf0278098bcd9b383b5585ee923-m.webp",
    title: "Casa em Leilão em Castanhal / PA - 2336854",
    address: "Rua Comandante Assis",
    price: "À Consultar",
    tags: ["Judicial", "Galvani Leilões"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/56/apartamento-caixa-em-belford-roxo-rj-2762056-imovel-2762056-6f572804da9e05a0161c93484268a258f81ae369-m.webp",
    title: "Casa Residencial Banco do Brasil em Castanhal / PA - 2654232",
    address: "Travessa Algodoal esquina da Avenida Atalaia nº 14, Residencial Costa do Atlântico, Casa 2, Est...",
    price: "R$ 26.205,08",
    tags: ["Venda Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/55/apartamento-caixa-em-belford-roxo-rj-2762055-imovel-2762055-45aa74986d00991b7401c492924b3b82380505b4-m.webp",
    title: "Casa Residencial Banco do Brasil em Castanhal / PA - 2654231",
    address: "Rua Farol, lote 8, nº 217, Costa do Atlântico, Castanhal/PA",
    price: "R$ 36.753,66",
    tags: ["Venda Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/54/apartamento-caixa-em-belford-roxo-rj-2762054-imovel-2762054-8d585ff77656d2f3f97eb847c1a4aee3f642c4f3-m.webp",
    title: "Casa em Leilão em Marituba / PA - 2751234",
    address: "Rua São Paulo, 45, Centro, Marituba, PA",
    price: "R$ 189.500,00",
    discount: "15%",
    tags: ["Extrajudicial"],
    closingDate: "15/05/2026 10:00",
    date1: "15/05/2026 10:00",
    price1: "R$ 189.500,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/53/casa-caixa-em-belford-roxo-rj-2762053-imovel-2762053-153710f4fef7593611ea1fea678c9a77fa7537ce-m.webp",
    title: "Casa em Leilão em Parauapebas / PA - 2698745",
    address: "Rua das Mangueiras, 120, Cidade Nova, Parauapebas, PA",
    price: "R$ 275.000,00",
    discount: "28%",
    tags: ["Caixa", "FGTS"],
    closingDate: "20/05/2026 10:00",
    date1: "20/05/2026 10:00",
    price1: "R$ 275.000,00",
    date2: "26/05/2026 10:00",
    price2: "R$ 198.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/62/casa-caixa-em-araruama-rj-2762062-imovel-2762062-412d47f2431fd1f3a6d805053efe246e15f3601d-m.webp",
    title: "Casa em Leilão em Tucuruí / PA - 2687321",
    address: "Av. Lauro Sodré, 890, Centro, Tucuruí, PA",
    price: "R$ 145.000,00",
    tags: ["Judicial"],
    closingDate: "10/04/2026 14:00",
    date1: "10/04/2026 14:00",
    price1: "R$ 145.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/61/apartamento-caixa-em-belford-roxo-rj-2762061-imovel-2762061-3b24ea5e2fe77528ee9ea611c6de3a1828c43e17-m.webp",
    title: "Casa em Leilão em Belém / PA - 2745632",
    address: "Travessa Padre Eutíquio, 1500, Batista Campos, Belém, PA",
    price: "R$ 520.000,00",
    discount: "35%",
    tags: ["Extrajudicial", "Mega Leilões"],
    closingDate: "22/04/2026 10:00",
    date1: "22/04/2026 10:00",
    price1: "R$ 520.000,00",
    date2: "28/04/2026 10:00",
    price2: "R$ 338.000,00",
  },
];

const ITEMS_PER_PAGE = 8;

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(activeFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const removeFilter = (label: string) => {
    setFilters(filters.filter((f) => f.label !== label));
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb + Title */}
        <div className="bg-card border-b border-border">
          <div className="container py-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>→</span>
              <span className="text-foreground font-medium">Busca</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center">
              Encontre seu Imóvel
            </h1>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-card border-b border-border">
          <div className="container py-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <SlidersHorizontal className="w-4 h-4" /> Filtrar Busca
              </Button>
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ArrowUpDown className="w-4 h-4" /> Ordenar
              </Button>
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Bookmark className="w-4 h-4" /> Salvar busca
              </Button>
              <Button variant="outline" className="gap-2 border-coral text-coral hover:bg-coral hover:text-accent-foreground">
                <Share2 className="w-4 h-4" /> Compartilhar
              </Button>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <div className="container py-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <span
                key={filter.label}
                className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                {filter.label}
                {filter.removable && (
                  <button onClick={() => removeFilter(filter.label)} className="hover:bg-primary-foreground/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mt-4">
            <span className="font-semibold text-foreground">{properties.length} Imóveis</span> Encontrados
          </p>
        </div>

        {/* Property Grid */}
        <div className="container pb-12">
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "grid grid-cols-1 gap-4"
          }>
            {paginatedProperties.map((prop, i) => (
              <SearchPropertyCard key={i} {...prop} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg border font-heading font-bold text-sm flex items-center justify-center transition-colors ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
