import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Home, Car, Maximize, ChevronLeft, ChevronRight, Heart, Share2, FileText, CheckCircle, XCircle, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import SearchPropertyCard from "@/components/SearchPropertyCard";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      const { data } = await supabase.from("properties").select("*").eq("id", id).single();
      if (data) {
        const p = {
          ...data,
          oldPrice: data.old_price,
          closingDate: data.closing_date,
          areaTotal: data.area_total,
          areaUtil: data.area_util,
          areaTerreno: data.area_terreno,
          codigoOrigem: data.codigo_origem,
          dataInclusao: data.data_inclusao,
          valorAvaliacao: data.valor_avaliacao,
          aceitaFinanciamento: data.aceita_financiamento,
          aceitaFGTS: data.aceita_fgts,
          aceitaParcelamento: data.aceita_parcelamento,
        };
        setProperty(p);

        // Fetch similar
        const { data: similar } = await supabase
          .from("properties")
          .select("*")
          .eq("cidade", data.cidade || "")
          .neq("id", data.id)
          .limit(4);
        if (similar) {
          setSimilarProperties(similar.map((s) => ({
            ...s,
            oldPrice: s.old_price,
            closingDate: s.closing_date,
          })));
        }
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Imóvel não encontrado</h1>
            <Link to="/encontre-seu-imovel">
              <Button className="bg-primary text-primary-foreground">Voltar à busca</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allImages = property.images.length > 0 ? property.images : [property.image];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>→</span>
              <Link to="/encontre-seu-imovel" className="hover:text-primary transition-colors">Busca</Link>
              <span>→</span>
              <span className="text-foreground font-medium line-clamp-1">{property.title}</span>
            </div>
          </div>
        </div>

        {/* Mobile top price bar */}
        <div className="md:hidden bg-coral text-accent-foreground">
          <div className="container py-3 flex items-center justify-between">
            <span className="font-heading font-bold text-xl">{property.price}</span>
            <Button size="sm" className="bg-accent-foreground/20 hover:bg-accent-foreground/30 text-accent-foreground border-0" onClick={() => window.open(`https://wa.me/5594991352277?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property.title}`)}`, '_blank')}>
              Tenho interesse
            </Button>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative rounded-xl overflow-hidden bg-card border border-border">
                <div className="relative h-[300px] md:h-[450px]">
                  <img src={allImages[currentImage]} alt={property.title} className="w-full h-full object-cover" />
                  {allImages.length > 1 && (
                    <>
                      <button onClick={() => setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                      </button>
                      <button onClick={() => setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </button>
                    </>
                  )}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {property.tags.map((tag: string) => (
                      <span key={tag} className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  {property.discount && (
                    <div className="absolute top-3 right-3 bg-coral text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-lg">{property.discount} OFF</div>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="p-3 flex gap-2 overflow-x-auto">
                    {allImages.map((img: string, i: number) => (
                      <button key={i} onClick={() => setCurrentImage(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${i === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title + Address */}
              <div>
                <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">{property.title}</h1>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading font-bold text-lg text-foreground mb-4">Detalhes do Imóvel</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {property.areaTotal && (
                    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Maximize className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Área Total</span>
                      <span className="text-sm font-heading font-bold text-foreground">{property.areaTotal}</span>
                    </div>
                  )}
                  {property.areaUtil && (
                    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Maximize className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Área Útil</span>
                      <span className="text-sm font-heading font-bold text-foreground">{property.areaUtil}</span>
                    </div>
                  )}
                  {property.areaTerreno && (
                    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Maximize className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Área Terreno</span>
                      <span className="text-sm font-heading font-bold text-foreground">{property.areaTerreno}</span>
                    </div>
                  )}
                  {property.quartos !== undefined && property.quartos !== null && (
                    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Home className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Quartos</span>
                      <span className="text-sm font-heading font-bold text-foreground">{property.quartos}</span>
                    </div>
                  )}
                  {property.vagas !== undefined && property.vagas !== null && (
                    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Car className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Vagas</span>
                      <span className="text-sm font-heading font-bold text-foreground">{property.vagas}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {property.descricao && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="font-heading font-bold text-lg text-foreground mb-3">Descrição</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{property.descricao}</p>
                </div>
              )}

              {/* More Info */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading font-bold text-lg text-foreground mb-4">Mais sobre o Imóvel</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Tipo", value: property.tipo },
                    { label: "Banco", value: property.banco },
                    { label: "Cidade", value: property.cidade ? `${property.cidade}/${property.estado}` : null },
                    { label: "Bairro", value: property.bairro },
                    { label: "Comarca", value: property.comarca },
                    { label: "Matrícula", value: property.matricula },
                    { label: "Código Origem", value: property.codigoOrigem },
                    { label: "Data de Inclusão", value: property.dataInclusao },
                    { label: "Valor de Avaliação", value: property.valorAvaliacao },
                  ].filter(item => item.value).map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading font-bold text-lg text-foreground mb-4">Informações de Pagamento</h2>
                <div className="space-y-3">
                  {[
                    { label: "Financiamento", value: property.aceitaFinanciamento },
                    { label: "FGTS", value: property.aceitaFGTS },
                    { label: "Parcelamento", value: property.aceitaParcelamento },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      {item.value ? <CheckCircle className="w-5 h-5 text-primary" /> : <XCircle className="w-5 h-5 text-destructive" />}
                      <span className="text-sm text-foreground">Imóvel {item.value ? "ACEITA" : "NÃO ACEITA"} {item.label}</span>
                    </div>
                  ))}
                  {property.condominio && (
                    <div className="mt-3 p-3 bg-secondary rounded-lg">
                      <span className="text-xs font-medium text-foreground">Condomínio:</span>
                      <p className="text-xs text-muted-foreground mt-1">{property.condominio}</p>
                    </div>
                  )}
                  {property.tributos && (
                    <div className="p-3 bg-secondary rounded-lg">
                      <span className="text-xs font-medium text-foreground">Tributos:</span>
                      <p className="text-xs text-muted-foreground mt-1">{property.tributos}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column - Price + CTA */}
            <div className="hidden md:block">
              <div className="sticky top-4 space-y-4">
                <div className="bg-card rounded-xl border border-border p-6">
                  {property.oldPrice && (
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground">Valor avaliado</span>
                      <p className="text-lg font-heading text-muted-foreground line-through">{property.oldPrice}</p>
                    </div>
                  )}
                  <div className="mb-1">
                    <span className="text-xs text-muted-foreground">Valor do Imóvel</span>
                    <p className="text-2xl font-heading font-bold text-coral">{property.price}</p>
                  </div>
                  {property.discount && (
                    <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full mb-4">{property.discount} de desconto</span>
                  )}

                  {(property.date1 || property.date2) && (
                    <div className="space-y-3 border-t border-border pt-4 mt-4">
                      {property.date1 && property.price1 && (
                        <div className="bg-secondary rounded-lg p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-medium text-foreground">1ª Praça</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{property.date1}</p>
                          <p className="text-sm font-heading font-bold text-foreground mt-1">{property.price1}</p>
                        </div>
                      )}
                      {property.date2 && property.price2 && (
                        <div className="bg-secondary rounded-lg p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3.5 h-3.5 text-coral" />
                            <span className="text-xs font-medium text-foreground">2ª Praça</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{property.date2}</p>
                          <p className="text-sm font-heading font-bold text-coral mt-1">{property.price2}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 mt-6">
                    <Button className="w-full bg-coral hover:bg-coral-dark text-accent-foreground font-bold py-5" onClick={() => window.open(`https://wa.me/5594991352277?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property.title}`)}`, '_blank')}>Tenho interesse</Button>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-5 gap-2" onClick={() => window.open(`https://wa.me/5594991352277?text=${encodeURIComponent(`Olá! Gostaria de enviar uma proposta para o imóvel: ${property.title}`)}`, '_blank')}>
                      <FileText className="w-4 h-4" /> Enviar Proposta
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1 gap-1 text-muted-foreground">
                      <Heart className="w-4 h-4" /> Salvar
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 gap-1 text-muted-foreground">
                      <Share2 className="w-4 h-4" /> Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="container pb-12">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Imóveis Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarProperties.map((p) => (
                <SearchPropertyCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
