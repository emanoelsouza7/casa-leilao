import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const properties = [
  {
    image: "https://image.leilaoimovel.com.br/images/62/casa-caixa-em-araruama-rj-2762062-imovel-2762062-412d47f2431fd1f3a6d805053efe246e15f3601d-m.webp",
    title: "Casa em Leilão em Araruama / RJ",
    address: "Estrada de São Vicente, Monteiro - Araruama, RJ",
    discount: "36% OFF",
    price1: "R$ 134.000,00",
    date1: "05/05/2026",
    price2: "R$ 85.684,93",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/61/apartamento-caixa-em-belford-roxo-rj-2762061-imovel-2762061-3b24ea5e2fe77528ee9ea611c6de3a1828c43e17-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Das Graças - Belford Roxo, RJ",
    discount: "32% OFF",
    price1: "R$ 152.443,94",
    date1: "05/05/2026",
    price2: "R$ 104.119,66",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/60/apartamento-caixa-em-belford-roxo-rj-2762060-imovel-2762060-1570f4ed085892f53399029e1b78dbd2ac256378-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Das Graças - Belford Roxo, RJ",
    discount: "6% OFF",
    price1: "R$ 157.788,50",
    date1: "05/05/2026",
    price2: "R$ 148.647,67",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/59/apartamento-caixa-em-belford-roxo-rj-2762059-imovel-2762059-cef41b9d4be2ab1e03bd52b0ef8fb557c66225e0-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Das Graças - Belford Roxo, RJ",
    discount: "34% OFF",
    price1: "R$ 174.000,00",
    date1: "05/05/2026",
    price2: "R$ 115.346,16",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/58/apartamento-caixa-em-belford-roxo-rj-2762058-imovel-2762058-f28a8f497cd2f3a397ecf163c347277df84fcd3e-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Das Graças - Belford Roxo, RJ",
    discount: "17% OFF",
    price1: "R$ 186.236,90",
    date1: "05/05/2026",
    price2: "R$ 154.760,97",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/57/apartamento-caixa-em-belford-roxo-rj-2762057-imovel-2762057-d1db7b2a5d32baf0278098bcd9b383b5585ee923-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Santa Amélia - Belford Roxo, RJ",
    discount: "12% OFF",
    price1: "R$ 140.264,40",
    date1: "05/05/2026",
    price2: "R$ 123.009,29",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/56/apartamento-caixa-em-belford-roxo-rj-2762056-imovel-2762056-6f572804da9e05a0161c93484268a258f81ae369-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Santa Amélia - Belford Roxo, RJ",
    discount: "30% OFF",
    price1: "R$ 175.000,00",
    date1: "05/05/2026",
    price2: "R$ 123.214,94",
    date2: "11/05/2026",
    tags: ["Caixa", "Leilão SFI"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/55/apartamento-caixa-em-belford-roxo-rj-2762055-imovel-2762055-45aa74986d00991b7401c492924b3b82380505b4-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Belo Horizonte, Santa Amélia - Belford Roxo, RJ",
    discount: "6% OFF",
    price1: "R$ 175.869,50",
    date1: "05/05/2026",
    price2: "R$ 165.911,12",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/54/apartamento-caixa-em-belford-roxo-rj-2762054-imovel-2762054-8d585ff77656d2f3f97eb847c1a4aee3f642c4f3-m.webp",
    title: "Apartamento em Leilão em Belford Roxo / RJ",
    address: "Rua Sargento Geraldo, São Vicente - Belford Roxo, RJ",
    discount: "29% OFF",
    price1: "R$ 152.220,90",
    date1: "05/05/2026",
    price2: "R$ 108.766,97",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/53/casa-caixa-em-belford-roxo-rj-2762053-imovel-2762053-153710f4fef7593611ea1fea678c9a77fa7537ce-m.webp",
    title: "Casa em Leilão em Belford Roxo / RJ",
    address: "Rua Tenente Zilton, São Vicente - Belford Roxo, RJ",
    discount: "10% OFF",
    price1: "R$ 289.556,30",
    date1: "05/05/2026",
    price2: "R$ 259.567,31",
    date2: "11/05/2026",
    tags: ["Caixa", "FGTS"],
  },
];

const RecentProperties = () => {
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
          <Button variant="outline" className="hidden md:flex items-center gap-2 border-coral text-coral hover:bg-coral hover:text-accent-foreground">
            Ver mais imóveis <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((prop, i) => (
            <PropertyCard key={i} {...prop} />
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Button className="bg-coral hover:bg-coral-dark text-accent-foreground font-semibold">
            Ver mais imóveis <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;
