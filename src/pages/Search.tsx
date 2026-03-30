import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, Bookmark, Share2, LayoutGrid, List, X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchPropertyCard from "@/components/SearchPropertyCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const activeFilters = [
  { label: "Ordenação: Ordem Padrão", removable: true },
  { label: "Tipo: Casa", removable: true },
];

const ITEMS_PER_PAGE = 12;

const Search = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(activeFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) {
        setProperties(data.map((p) => ({
          id: p.id,
          image: p.image,
          images: p.images,
          title: p.title,
          address: p.address,
          price: p.price,
          oldPrice: p.old_price,
          discount: p.discount,
          tags: p.tags,
          closingDate: p.closing_date,
          date1: p.date1,
          price1: p.price1,
          date2: p.date2,
          price2: p.price2,
          areaTotal: p.area_total,
          areaUtil: p.area_util,
          areaTerreno: p.area_terreno,
          quartos: p.quartos,
          vagas: p.vagas,
          descricao: p.descricao,
          banco: p.banco,
          tipo: p.tipo,
          estado: p.estado,
          cidade: p.cidade,
          bairro: p.bairro,
        })));
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

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
                <button onClick={() => setViewMode("grid")} className={`p-2.5 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2.5 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <span key={filter.label} className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                {filter.label}
                {filter.removable && (
                  <button onClick={() => removeFilter(filter.label)} className="hover:bg-primary-foreground/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <span className="font-semibold text-foreground">{properties.length} Imóveis</span> Encontrados
          </p>
        </div>

        <div className="container pb-12">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Carregando imóveis...</div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "grid grid-cols-1 gap-4"}>
                {paginatedProperties.map((prop) => (
                  <SearchPropertyCard key={prop.id} {...prop} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-10 h-10 rounded-lg border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg border font-heading font-bold text-sm flex items-center justify-center transition-colors ${page === currentPage ? "bg-primary text-primary-foreground border-primary" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                      {page}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-10 h-10 rounded-lg border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
