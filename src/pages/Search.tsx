import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, LayoutGrid, List, X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchPropertyCard from "@/components/SearchPropertyCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const ITEMS_PER_PAGE = 12;

const Search = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [selectedCidade, setSelectedCidade] = useState<string>("");
  const [selectedBairro, setSelectedBairro] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("recentes");

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

  // Extract unique cities and bairros from data
  const cidades = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.cidade) {
        // Clean city names that start with "Leilão em"
        const clean = p.cidade.replace(/^Leilão em\s*/i, "").trim();
        set.add(clean);
      }
    });
    return Array.from(set).sort();
  }, [properties]);

  const bairros = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.bairro) set.add(p.bairro);
    });
    return Array.from(set).sort();
  }, [properties]);

  // Filtered & sorted
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (selectedCidade) {
      result = result.filter((p) => {
        const clean = (p.cidade || "").replace(/^Leilão em\s*/i, "").trim();
        return clean === selectedCidade;
      });
    }

    if (selectedBairro) {
      result = result.filter((p) => p.bairro === selectedBairro);
    }

    // Sort
    if (sortOrder === "menor_preco") {
      result.sort((a, b) => {
        const pa = parseFloat((a.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        const pb = parseFloat((b.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        return pa - pb;
      });
    } else if (sortOrder === "maior_preco") {
      result.sort((a, b) => {
        const pa = parseFloat((a.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        const pb = parseFloat((b.price || "0").replace(/[^\d,]/g, "").replace(",", "."));
        return pb - pa;
      });
    } else if (sortOrder === "maior_desconto") {
      result.sort((a, b) => {
        const da = parseInt((a.discount || "0").replace(/[^\d]/g, "")) || 0;
        const db = parseInt((b.discount || "0").replace(/[^\d]/g, "")) || 0;
        return db - da;
      });
    }

    return result;
  }, [properties, selectedCidade, selectedBairro, sortOrder]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilters = [
    ...(selectedCidade ? [{ label: `Cidade: ${selectedCidade}`, key: "cidade" }] : []),
    ...(selectedBairro ? [{ label: `Bairro: ${selectedBairro}`, key: "bairro" }] : []),
  ];

  const clearFilter = (key: string) => {
    if (key === "cidade") setSelectedCidade("");
    if (key === "bairro") setSelectedBairro("");
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCidade("");
    setSelectedBairro("");
    setSortOrder("recentes");
    setCurrentPage(1);
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
              {/* Filter Button - opens Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <SlidersHorizontal className="w-4 h-4" /> Filtrar Busca
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] sm:w-[380px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-heading font-bold text-foreground">Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Cidade */}
                    <div>
                      <label className="text-sm font-bold text-foreground mb-2 block">Localidade</label>
                      <Select value={selectedCidade} onValueChange={(v) => { setSelectedCidade(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a cidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {cidades.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border-t border-dashed border-border" />

                    {/* Bairro */}
                    <div>
                      <Select value={selectedBairro} onValueChange={(v) => { setSelectedBairro(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o bairro" />
                        </SelectTrigger>
                        <SelectContent>
                          {bairros.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border-t border-dashed border-border" />

                    <div className="flex gap-3 pt-4">
                      <SheetClose asChild>
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                          Aplicar Filtros
                        </Button>
                      </SheetClose>
                      <Button variant="outline" onClick={clearAllFilters} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        Limpar
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortOrder} onValueChange={(v) => { setSortOrder(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-auto gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground [&>svg]:text-primary">
                  <ArrowUpDown className="w-4 h-4" />
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recentes">Mais Recentes</SelectItem>
                  <SelectItem value="menor_preco">Menor Preço</SelectItem>
                  <SelectItem value="maior_preco">Maior Preço</SelectItem>
                  <SelectItem value="maior_desconto">Maior Desconto</SelectItem>
                </SelectContent>
              </Select>

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
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activeFilters.map((filter) => (
                <span key={filter.key} className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  {filter.label}
                  <button onClick={() => clearFilter(filter.key)} className="hover:bg-primary-foreground/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProperties.length} Imóveis</span> Encontrados
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
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 7) {
                      page = i + 1;
                    } else if (currentPage <= 4) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      page = totalPages - 6 + i;
                    } else {
                      page = currentPage - 3 + i;
                    }
                    return (
                      <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg border font-heading font-bold text-sm flex items-center justify-center transition-colors ${page === currentPage ? "bg-primary text-primary-foreground border-primary" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
                        {page}
                      </button>
                    );
                  })}
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
