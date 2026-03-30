import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const RecentProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("properties")
        .select("id, image, title, address, discount, price1, date1, price2, date2, tags")
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) setProperties(data);
    };
    fetch();
  }, []);

  return (
    <section id="imoveis" className="py-16 bg-warm-bg">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Leilões Adicionados Recentemente
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Confira as últimas oportunidades de imóveis em leilão
            </p>
          </div>
          <Link to="/encontre-seu-imovel">
            <Button variant="outline" className="hidden md:flex items-center gap-2 border-coral text-coral hover:bg-coral hover:text-accent-foreground">
              Ver mais imóveis <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              id={prop.id}
              image={prop.image}
              title={prop.title}
              address={prop.address}
              price={prop.price}
              oldPrice={prop.old_price}
              discount={prop.discount}
              price1={prop.price1}
              date1={prop.date1}
              price2={prop.price2}
              date2={prop.date2}
              tags={prop.tags}
            />
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link to="/encontre-seu-imovel">
            <Button className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold">
              Ver mais imóveis <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;
