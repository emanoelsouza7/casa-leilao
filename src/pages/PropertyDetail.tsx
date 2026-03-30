import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, Home, Car, Maximize, ChevronLeft, ChevronRight, Heart, Share2, FileText, CheckCircle, XCircle, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPropertyById, allProperties } from "@/data/properties";
import SearchPropertyCard from "@/components/SearchPropertyCard";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || "");
  const [currentImage, setCurrentImage] = useState(0);

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
  const similarProperties = allProperties.filter((p) => p.id !== property.id && p.cidade === property.cidade).slice(0, 4);

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
            <Button size="sm" className="bg-accent-foreground/20 hover:bg-accent-foreground/30 text-accent-foreground border-0">
              Tenho interesse
            </Button>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images + Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative rounded-xl overflow-hidden bg-card border border-border">
                <div className="relative h-[300px] md:h-[450px]">
                  <img
                    src={allImages[currentImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                      </button>
                      <button
                        onClick={() => setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </button>
                    </>
                  )}
                  {/* Tags overlay */}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {property.tags.map((tag) => (
                      <span key={tag} className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {property.discount && (
                    <div className="absolute top-3 right-3 bg-coral text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-lg">
                      {property.discount} OFF
                    </div>
                  )}
                </div>
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="p-3 flex gap-2 overflow-x-auto">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${i === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title + Address */}
              <div>
                <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">
                  {property.title}
                </h1>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                </div>
              </div>

              {/* Property Details Card */}
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
                  {property.quartos !== undefined && (
                    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg">
                      <Home className="w-5 h-5 text-primary" />
                      <span className="text-xs text-muted-foreground">Quartos</span>
                      <span className="text-sm font-heading font-bold text-foreground">{property.quartos}</span>
                    </div>
                  )}
                  {property.vagas !== undefined && (
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
                  {property.tipo && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Tipo</span>
                      <span className="text-sm font-medium text-foreground">{property.tipo}</span>
                    </div>
                  )}
                  {property.banco && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Banco</span>
                      <span className="text-sm font-medium text-foreground">{property.banco}</span>
                    </div>
                  )}
                  {property.cidade && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Cidade</span>
                      <span className="text-sm font-medium text-foreground">{property.cidade}/{property.estado}</span>
                    </div>
                  )}
                  {property.bairro && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Bairro</span>
                      <span className="text-sm font-medium text-foreground">{property.bairro}</span>
                    </div>
                  )}
                  {property.comarca && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Comarca</span>
                      <span className="text-sm font-medium text-foreground">{property.comarca}</span>
                    </div>
                  )}
                  {property.matricula && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Matrícula</span>
                      <span className="text-sm font-medium text-foreground">{property.matricula}</span>
                    </div>
                  )}
                  {property.codigoOrigem && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Código Origem</span>
                      <span className="text-sm font-medium text-foreground">{property.codigoOrigem}</span>
                    </div>
                  )}
                  {property.dataInclusao && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Data de Inclusão</span>
                      <span className="text-sm font-medium text-foreground">{property.dataInclusao}</span>
                    </div>
                  )}
                  {property.valorAvaliacao && (
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Valor de Avaliação</span>
                      <span className="text-sm font-medium text-foreground">{property.valorAvaliacao}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Financing info */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading font-bold text-lg text-foreground mb-4">Informações de Pagamento</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {property.aceitaFinanciamento ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <span className="text-sm text-foreground">
                      Imóvel {property.aceitaFinanciamento ? "ACEITA" : "NÃO ACEITA"} Financiamento
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {property.aceitaFGTS ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <span className="text-sm text-foreground">
                      Imóvel {property.aceitaFGTS ? "ACEITA" : "NÃO ACEITA"} FGTS
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {property.aceitaParcelamento ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                    <span className="text-sm text-foreground">
                      Imóvel {property.aceitaParcelamento ? "ACEITA" : "NÃO ACEITA"} Parcelamento
                    </span>
                  </div>
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

            {/* Right column - Price + CTA (sticky) */}
            <div className="hidden md:block">
              <div className="sticky top-4 space-y-4">
                {/* Price card */}
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
                    <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full mb-4">
                      {property.discount} de desconto
                    </span>
                  )}

                  {/* Auction dates */}
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

                  {property.closingDate && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Encerra em: <span className="font-medium text-foreground">{property.closingDate}</span>
                    </p>
                  )}

                  <Button className="w-full bg-coral hover:bg-coral/90 text-accent-foreground font-bold text-base py-6 mt-4">
                    Tenho interesse
                  </Button>

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" className="flex-1 gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Heart className="w-4 h-4" /> Favoritar
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Share2 className="w-4 h-4" /> Compartilhar
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-heading font-bold text-sm text-foreground mb-3">Benefícios</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Assessoria Gratuita</p>
                        <p className="text-[10px] text-muted-foreground">Time de especialistas ao seu lado</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Financiamento</p>
                        <p className="text-[10px] text-muted-foreground">Possibilidade de financiar com 5% de entrada</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Segurança</p>
                        <p className="text-[10px] text-muted-foreground">Compre direto do banco</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar properties */}
          {similarProperties.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-heading font-bold text-foreground mb-6">Imóveis Similares</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {similarProperties.map((prop) => (
                  <Link key={prop.id} to={`/imovel/${prop.id}`}>
                    <SearchPropertyCard {...prop} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
