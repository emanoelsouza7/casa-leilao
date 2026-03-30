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
  // Page 1
  {
    image: "https://image.leilaoimovel.com.br/images/69/casa-caixa-em-breu-branco-pa-2567369-imovel-2567369-33d4664abde8f7b7671330a0f1674ebd16c59f65-m.webp",
    title: "Casa Caixa em Breu Branco / PA - 2567369",
    address: "RUA BAHIA, N. 220-A, CENTRO - CEP: 68488-000, BREU BRANCO - PARÁ",
    price: "R$ 97.581,50",
    oldPrice: "R$ 158.000,00",
    discount: "38%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "30/03/2026 18:00",
    date1: "30/03/2026 18:00",
    price1: "R$ 97.581,50",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/46/casa-caixa-em-tucurui-pa-2533046-imovel-2533046-d43c45920df50dee8f47875fcd91c06294b69ac1-m.webp",
    title: "Casa Caixa em Tucuruí / PA - 2533046",
    address: "RUA BAHIA, N. SN QUADRA 52 LOTE 16, GETAT - CEP: 68000-000, TUCURUÍ - PARÁ",
    price: "R$ 123.300,35",
    oldPrice: "R$ 204.000,00",
    discount: "40%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "31/03/2026 18:00",
    date1: "31/03/2026 18:00",
    price1: "R$ 123.300,35",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/89/casa-caixa-em-tucurui-pa-2512289-imovel-2512289-63a095b0f24e0863dc705acc05cbd97f78d08ff4-m.webp",
    title: "Casa Caixa em Tucuruí / PA - 2512289",
    address: "ESTRADA DO AEROPORTO, N. SN KM. 04 LT 04 QD 37, CIDADE UNIVERSITARIA - CEP: 68462-000, TUCURUÍ - PARÁ",
    price: "R$ 100.148,49",
    oldPrice: "R$ 169.000,00",
    discount: "41%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "31/03/2026 18:00",
    date1: "31/03/2026 18:00",
    price1: "R$ 100.148,49",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/82/sobrado-caixa-em-belem-pa-2370982-imovel-2370982-2ca021832c3b4389b80d5011312bd98d976696f9-m.webp",
    title: "Sobrado Caixa em Belém / PA - 2370982",
    address: "ESTRADA DO UNA, N. 02 QD 04, UNA - CEP: 66000-000, BELÉM - PARÁ",
    price: "R$ 307.583,81",
    oldPrice: "R$ 495.000,00",
    discount: "38%",
    tags: ["Venda Online"],
    closingDate: "01/04/2026 18:00",
    date1: "01/04/2026 18:00",
    price1: "R$ 307.583,81",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/07/casa-caixa-em-breu-branco-pa-2367807-imovel-2367807-9fd9f67c81c2e25a1a42f743d4d5b69209f5ba73-m.webp",
    title: "Casa Caixa em Breu Branco / PA - 2367807",
    address: "RUA PARAUAPEBAS, N. 24, NOVO HORIZONTE - CEP: 68488-000, BREU BRANCO - PARÁ",
    price: "R$ 63.386,22",
    oldPrice: "R$ 109.000,00",
    discount: "42%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "30/03/2026 18:00",
    date1: "30/03/2026 18:00",
    price1: "R$ 63.386,22",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/60/casa-caixa-em-breu-branco-pa-2336960-imovel-2336960-88cabe8ce4dab0f3cc7b06d5273df0b769cba73f-m.webp",
    title: "Casa Caixa em Breu Branco / PA - 2336960",
    address: "AVENIDA ALFREDO KOLLING, N. 135 QD 79, NOVO HORIZONTE - CEP: 68488-000, BREU BRANCO - PARÁ",
    price: "R$ 98.940,22",
    oldPrice: "R$ 178.000,00",
    discount: "44%",
    tags: ["Financiamento", "FGTS", "Venda Online"],
    closingDate: "31/03/2026 18:00",
    date1: "31/03/2026 18:00",
    price1: "R$ 98.940,22",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/91/casa-caixa-em-tucurui-pa-2326291-imovel-2326291-eeaa46be4102308f2c283c5f92ac3660c96691a5-m.webp",
    title: "Casa Caixa em Tucuruí / PA - 2326291",
    address: "RUA H, N. 53 UN 02, SANTA MONICA - CEP: 68455-151, TUCURUÍ - PARÁ",
    price: "R$ 81.772,82",
    oldPrice: "R$ 141.000,00",
    discount: "42%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "30/03/2026 18:00",
    date1: "30/03/2026 18:00",
    price1: "R$ 81.772,82",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/47/casa-caixa-em-breu-branco-pa-2303747-imovel-2303747-a66c4e1832b758b97f4eb39ec6811802b168e44a-m.webp",
    title: "Casa Caixa em Breu Branco / PA - 2303747",
    address: "AVENIDA PARAUAPEBAS, N. 114C, NOVO HORIZONTE - CEP: 68488-000, BREU BRANCO - PARÁ",
    price: "R$ 78.978,96",
    oldPrice: "R$ 142.000,00",
    discount: "44%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "30/03/2026 18:00",
    date1: "30/03/2026 18:00",
    price1: "R$ 78.978,96",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/44/casa-caixa-em-breu-branco-pa-2303744-imovel-2303744-07c5d38df550d392b53634bbcb1ea4b4ada9f38d-m.webp",
    title: "Casa Caixa em Breu Branco / PA - 2303744",
    address: "TRAVESSA TUPI, N. 10, CONTINENTAL - CEP: 68488-000, BREU BRANCO - PARÁ",
    price: "R$ 112.415,00",
    oldPrice: "R$ 188.000,00",
    discount: "40%",
    tags: ["FGTS", "Venda Online"],
    closingDate: "30/03/2026 18:00",
    date1: "30/03/2026 18:00",
    price1: "R$ 112.415,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/73/casa-caixa-em-belem-pa-2108173-imovel-2108173-5d57689d8397bc67fbe442107d17166451570c64-m.webp",
    title: "Casa Caixa em Belém / PA - 2108173",
    address: "RUA FIDELIS, N. 120, SÃO JOÃO DO OUTEIRO (OUTEIRO) - CEP: 66840-660, BELÉM - PARÁ",
    price: "R$ 523.054,62",
    oldPrice: "R$ 979.000,00",
    discount: "47%",
    tags: ["Financiamento", "FGTS", "Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/56/casa-caixa-em-belem-pa-2624856-imovel-2624856-aa05e08c086e0e413cec403931c360d1fc0bfbb0-m.webp",
    title: "Casa Caixa em Belém / PA - 2624856",
    address: "RUA DOS CARIPUNAS, N. 1844, BATISTA CAMPOS - CEP: 66033-442, BELÉM - PARÁ",
    price: "R$ 426.363,27",
    oldPrice: "R$ 669.000,00",
    discount: "36%",
    tags: ["Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/55/casa-caixa-em-belem-pa-2594055-imovel-2594055-877f38a81a92071909cafebbab9e694e9ccfde8a-m.webp",
    title: "Casa Caixa em Belém / PA - 2594055",
    address: "ALAMEDA TREZE, N. 38 LT 01 QD 53, COQUEIRO - CEP: 66823-076, BELÉM - PARÁ",
    price: "R$ 429.549,84",
    oldPrice: "R$ 674.000,00",
    discount: "36%",
    tags: ["Financiamento", "FGTS", "Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/27/casa-caixa-em-belem-pa-2311827-imovel-2311827-68b90cd439043d31e0a4d82e81f7ffea4589accd-m.webp",
    title: "Casa Caixa em Belém / PA - 2311827",
    address: "AVENIDA ALCINDO CACELA, N. 712, UMARIZAL - CEP: 66060-902, BELÉM - PARÁ",
    price: "R$ 674.820,24",
    oldPrice: "R$ 1.086.000,00",
    discount: "38%",
    tags: ["Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/38/casa-caixa-em-tucurui-pa-2303738-imovel-2303738-afda73ec815ce5c05450411df3dc8ce5d64b1c9d-m.webp",
    title: "Casa Caixa em Tucuruí / PA - 2303738",
    address: "RUA JOSE NERYS TORRES, N. 31, SANTA ISABEL - CEP: 68456-120, TUCURUÍ - PARÁ",
    price: "R$ 209.867,59",
    oldPrice: "R$ 356.000,00",
    discount: "41%",
    tags: ["Financiamento", "FGTS", "Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/13/casa-caixa-em-tucurui-pa-2095513-imovel-2095513-c6db7c2d32f29b6ce3b325b03e812befa38a3b64-m.webp",
    title: "Casa Caixa em Tucuruí / PA - 2095513",
    address: "RUA JACINTO RAMOS, N. 501, COLINAS - CEP: 68458-855, TUCURUÍ - PARÁ",
    price: "R$ 147.398,67",
    oldPrice: "R$ 284.000,00",
    discount: "48%",
    tags: ["Financiamento", "FGTS", "Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/18/casa-caixa-em-benevides-pa-2536918-imovel-2536918-f2c0cda299f9a4e31cdbf421980003c46b4a5663-m.webp",
    title: "Casa Caixa em Benevides / PA - 2536918",
    address: "RUA OURO PRETO (RUA PROJETADA), N. SN LT 04 QD 02, BENFICA - CEP: 68795-000, BENEVIDES - PARÁ",
    price: "R$ 60.564,10",
    oldPrice: "R$ 105.987,63",
    discount: "43%",
    tags: ["Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/44/casa-caixa-em-tucurui-pa-2412744-imovel-2412744-1688ef2a26fa91026a84dd4ba991a26a893b4bbe-m.webp",
    title: "Casa Caixa em Tucuruí / PA - 2412744",
    address: "AVENIDA RIO DE JANEIRO, N. 115, BELA VISTA - CEP: 68455-010, TUCURUÍ - PARÁ",
    price: "R$ 124.625,81",
    oldPrice: "R$ 198.000,00",
    discount: "37%",
    tags: ["Compra Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/07/casa-caixa-em-belem-pa-2761907-imovel-2761907-a1755fb90a4cba2abd86a6334a1a3da39976b120-m.webp",
    title: "Casa em Leilão em Belém / PA - 2761907",
    address: "PASSAGEM HEROIS DE MONTESSE, N. 777 LT 543 QD 45, MARAMBAIA - CEP: 66620-580, BELÉM - PARÁ",
    price: "R$ 288.000,00",
    discount: "20%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "05/05/2026 10:00",
    date1: "05/05/2026 10:00",
    price1: "R$ 288.000,00",
    date2: "11/05/2026 10:00",
    price2: "R$ 229.089,03",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/47/casa-caixa-em-ananindeua-pa-2746247-imovel-2746247-d29941fe7e2bd5475f10a588a544594f0c0140f7-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2746247",
    address: "VIA INTERNA I, N. S/N LT 12, ÁREA A, ICUÍ-GUAJARÁ - CEP: 67125-000, ANANINDEUA - PARÁ",
    price: "R$ 230.000,00",
    discount: "4%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "27/04/2026 10:00",
    date1: "27/04/2026 10:00",
    price1: "R$ 230.000,00",
    date2: "30/04/2026 10:00",
    price2: "R$ 219.932,55",
  },
  // Page 2
  {
    image: "https://image.leilaoimovel.com.br/images/53/casa-caixa-em-ananindeua-pa-2720953-imovel-2720953-17f1adab62b618d036c71a2101307610301b7038-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2720953",
    address: "RODOVIA BR-316, N. 1 QD E KM 07, CENTRO - CEP: 67030-000, ANANINDEUA - PARÁ",
    price: "R$ 249.000,00",
    discount: "40%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 249.000,00",
    date2: "13/04/2026 10:00",
    price2: "R$ 149.400,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/52/casa-caixa-em-ananindeua-pa-2720952-imovel-2720952-a82361681c54622976e96e32fc044b96b7cbd050-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2720952",
    address: "RUA ITABIRA, N. SN QD 4 LT16, CENTRO - CEP: 67133-490, ANANINDEUA - PARÁ",
    price: "R$ 322.000,00",
    discount: "40%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 322.000,00",
    date2: "13/04/2026 10:00",
    price2: "R$ 193.200,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/11/casa-caixa-em-ananindeua-pa-2710911-imovel-2710911-1d492b92e07e53ed2c92b8c5d42ae1299da07b21-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2710911",
    address: "CJ. CIDADE NOVA 7. TV-WE 82, N. 612, COQUEIRO - CEP: 67000-000, ANANINDEUA - PARÁ",
    price: "R$ 387.318,20",
    discount: "22%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "31/03/2026 10:00",
    date1: "31/03/2026 10:00",
    price1: "R$ 387.318,20",
    date2: "06/04/2026 10:00",
    price2: "R$ 301.100,85",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/21/casa-caixa-em-belem-pa-2643821-imovel-2643821-d6e540cada493a6a7c0ac40b4e742e2632f1c6ca-m.webp",
    title: "Casa em Leilão em Belém / PA - 2643821",
    address: "RODOVIA AUGUSTO MONTENEGRO, N. 6955 LOTE 15, QD 09, NOVA MARAMBAIA - CEP: 66635-110, BELÉM - PARÁ",
    price: "R$ 782.621,96",
    oldPrice: "R$ 1.228.000,00",
    discount: "36%",
    tags: ["Caixa", "Financiamento", "FGTS", "Licitação Aberta"],
    closingDate: "06/04/2026 10:00",
    date1: "06/04/2026 10:00",
    price1: "R$ 782.621,96",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/56/casa-em-marituba-pa-2540656-imovel-2540656-380bf830e0a91ecae42ba959822c86d72c020629-m.webp",
    title: "Casa em Marituba / PA - 2540656",
    address: "Rua Tupinambas, n°61, Lote E, São João, Marituba, PA, 67203-025",
    price: "R$ 1.809.913,00",
    oldPrice: "R$ 1.860.000,00",
    discount: "3%",
    tags: ["Venda Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/22/casa-em-ananindeua-pa-2762522-imovel-2762522-19204157a96d49a91fa5581cd9660f861b11dc8d-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2762522",
    address: "ALAMEDA DIAMANTE (LOTE 24), S/N, COQUEIRO, ANANINDEUA - PARÁ",
    price: "R$ 727.003,78",
    discount: "60%",
    tags: ["Extrajudicial"],
    closingDate: "09/04/2026 10:00",
    date1: "09/04/2026 10:00",
    price1: "R$ 727.003,78",
    date2: "10/04/2026 10:00",
    price2: "R$ 287.400,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/01/casa-caixa-em-ananindeua-pa-2761901-imovel-2761901-c86f912ca4fef3db7f1dd8c6856b3291ea43f16c-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2761901",
    address: "RUA E, N. 22 PASSAGEM COIMBRA, COQUEIRO - CEP: 67000-000, ANANINDEUA - PARÁ",
    price: "R$ 132.803,54",
    discount: "21%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "05/05/2026 10:00",
    date1: "05/05/2026 10:00",
    price1: "R$ 132.803,54",
    date2: "11/05/2026 10:00",
    price2: "R$ 104.527,30",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/41/casa-caixa-em-parauapebas-pa-2746241-imovel-2746241-0b4cbebedf341211f3634c34fe75364438770d52-m.webp",
    title: "Casa em Leilão em Parauapebas / PA - 2746241",
    address: "RUA MARACATIARA, N. 214 QD 09 LT 07-A, NOVO VIVER - CEP: 68514-300, PARAUAPEBAS - PARÁ",
    price: "R$ 200.000,00",
    tags: ["Caixa", "Leilão SFI"],
    closingDate: "27/04/2026 10:00",
    date1: "27/04/2026 10:00",
    price1: "R$ 200.000,00",
    date2: "30/04/2026 10:00",
    price2: "R$ 227.422,25",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/48/casa-caixa-em-belem-pa-2720948-imovel-2720948-e98fd38febd7dd1e61908bfc6a85486b7a78b004-m.webp",
    title: "Casa em Leilão em Belém / PA - 2720948",
    address: "TRAVESSA WE-8, N. 415 QD 10 LT 11, COQUEIRO - CEP: 66670-220, BELÉM - PARÁ",
    price: "R$ 196.443,02",
    discount: "18%",
    tags: ["Caixa", "Leilão SFI"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 196.443,02",
    date2: "13/04/2026 10:00",
    price2: "R$ 160.434,96",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/44/casa-caixa-em-castanhal-pa-2720944-imovel-2720944-bb2853587495611cfb5f2d79d21434c100b0c9d5-m.webp",
    title: "Casa em Leilão em Castanhal / PA - 2720944",
    address: "RUA ARACELI SAMPAIO, N. 311, SÃO JOSÉ - CEP: 68744-215, CASTANHAL - PARÁ",
    price: "R$ 159.000,00",
    discount: "10%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 159.000,00",
    date2: "13/04/2026 10:00",
    price2: "R$ 143.762,15",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/87/casa-caixa-em-tucurui-pa-2702587-imovel-2702587-3f8ee2abbb23a5663a3c91f8ebf36ba23dd3abce-m.webp",
    title: "Casa em Leilão em Tucuruí / PA - 2702587",
    address: "AVENIDA SANTARÉM, N. SN LT 72, QD 05, RES CENTRAL PARK 2 F - CEP: 68464-000, TUCURUÍ - PARÁ",
    price: "R$ 183.000,00",
    discount: "29%",
    tags: ["Caixa", "FGTS", "Leilão SFI"],
    closingDate: "30/03/2026 10:00",
    date1: "30/03/2026 10:00",
    price1: "R$ 183.000,00",
    date2: "02/04/2026 10:00",
    price2: "R$ 129.855,03",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/56/casa-caixa-em-ananindeua-pa-2695756-imovel-2695756-77601b36de0a5ffb908e8338f6bc3a9956365d23-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2695756",
    address: "RODOVIA BR 316 KM 07, N. 46 QD A, CENTRO - CEP: 67030-032, ANANINDEUA - PARÁ",
    price: "R$ 159.312,23",
    oldPrice: "R$ 204.000,00",
    discount: "26%",
    tags: ["Caixa", "Leilão SFI"],
    closingDate: "30/03/2026 10:00",
    date1: "30/03/2026 10:00",
    price1: "R$ 159.312,23",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/86/casa-caixa-em-ananindeua-pa-2647086-imovel-2647086-842088f7083f88a139cb4dfe542c075c0ef882e2-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2647086",
    address: "RUA DOIS DE JUNHO, N. S/N CS09 BL10, ÁGUAS BRANCAS - CEP: 67033-215, ANANINDEUA - PARÁ",
    price: "R$ 76.743,93",
    oldPrice: "R$ 127.000,00",
    discount: "40%",
    tags: ["Caixa", "FGTS", "Licitação Aberta"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 76.743,93",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/76/casa-caixa-em-ananindeua-pa-2647076-imovel-2647076-193fe5016bea47bf4b311e34d5d624adeb19f0b3-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2647076",
    address: "RUA DOUTOR DARIO, N. SN CS05 BL03, CURUCAMBA - CEP: 67146-148, ANANINDEUA - PARÁ",
    price: "R$ 126.514,08",
    oldPrice: "R$ 201.000,00",
    discount: "37%",
    tags: ["Caixa", "FGTS", "Licitação Aberta"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 126.514,08",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/90/casa-em-parauapebas-pa-2730290-imovel-2730290-e9e15705e1e093c3b4818e3af2051a9b876d58ba-m.webp",
    title: "Casa em Leilão em Parauapebas / PA - 2730290",
    address: "Rua B6, S/N, Cidade Jardim, Parauapebas, PA",
    price: "R$ 273.600,00",
    oldPrice: "R$ 360.000,00",
    discount: "24%",
    tags: ["Desocupado", "Extrajudicial"],
    closingDate: "31/03/2026 11:33",
    date1: "31/03/2026 11:33",
    price1: "R$ 273.600,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/84/casa-em-ananindeua-pa-2764584-imovel-2764584-210d0537d1f1d03fa4fe409911bc4e1023b178e2-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2764584",
    address: "Rua Santos Dumont - Lt 21, Qd H, Quarenta Horas (Coqueiro), Ananindeua/PA",
    price: "R$ 215.000,00",
    tags: ["Extrajudicial"],
    closingDate: "05/05/2026 18:00",
    date1: "05/05/2026 18:00",
    price1: "R$ 215.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/76/casa-residencial-em-belem-pa-2759976-imovel-2759976-5fc7529303afd752569c0944c4badc107244c11d-m.webp",
    title: "Casa Residencial em Leilão em Belém / PA - 2759976",
    address: "AVENIDA 25 DE SETEMBRO 1701, Terra Firme, Belém - PA",
    price: "R$ 869.446,20",
    discount: "61%",
    tags: ["Extrajudicial"],
    closingDate: "31/03/2026 10:00",
    date1: "31/03/2026 10:00",
    price1: "R$ 869.446,20",
    date2: "06/04/2026 10:00",
    price2: "R$ 335.165,86",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/property/leilaoimovel-imovel-sem-foto.webp",
    title: "Casa Residencial em Leilão em Belém / PA - 2749637",
    address: "AVENIDA 25 DE SETEMBRO 1701, Terra Firme, Belém - PA",
    price: "R$ 869.446,20",
    discount: "61%",
    tags: ["Extrajudicial"],
    closingDate: "31/03/2026 10:00",
    date1: "31/03/2026 10:00",
    price1: "R$ 869.446,20",
    date2: "06/04/2026 10:00",
    price2: "R$ 335.165,86",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/property/leilaoimovel-imovel-sem-foto.webp",
    title: "Casa em Leilão em Belém / PA - 2763591",
    address: "PASSAGEM HEROIS DE MONTESSE, N. 777, LT 543 QD 45, MARAMBAIA, BELÉM - PA",
    price: "R$ 288.000,00",
    discount: "20%",
    tags: ["Extrajudicial"],
    closingDate: "05/05/2026 10:00",
    date1: "05/05/2026 10:00",
    price1: "R$ 288.000,00",
    date2: "11/05/2026 10:00",
    price2: "R$ 229.089,03",
  },
  // Page 3
  {
    image: "https://image.leilaoimovel.com.br/images/53/casa-em-benevides-pa-2729153-imovel-2729153-3209089bc6e869fc268f2c5220a9feffdbfbf43a-m.webp",
    title: "Casa em Leilão em Benevides / PA - 2729153",
    address: "Avenida Terceira Avenida Princ SN Loteamento Jard. Neopolis",
    price: "R$ 228.760,00",
    tags: ["Extrajudicial", "Pestana Leilões"],
    closingDate: "31/03/2026 10:00",
    date1: "31/03/2026 10:00",
    price1: "R$ 228.760,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/86/casas-em-none-none-2622186-imovel-2622186-cf75f0c0720af8c94db98e0c10ceac8879d91632-m.webp",
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
    image: "https://image.leilaoimovel.com.br/images/property/leilaoimovel-imovel-sem-foto.webp",
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
    image: "https://image.leilaoimovel.com.br/images/98/casa-em-ananindeua-pa-2748098-imovel-2748098-8ea50f6df5582da933167b56e765bf0fabc24442-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2748098",
    address: "Rua Raniere Marinho, 19C, Icuí-Guajará, Ananindeua, PA",
    price: "R$ 150.000,00",
    tags: ["Extrajudicial"],
    closingDate: "29/04/2026 10:09",
    date1: "29/04/2026 10:09",
    price1: "R$ 150.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/80/casa-em-ananindeua-pa-2742880-imovel-2742880-2d459f3c1b33b5f105496d34d2d485bf862e3e84-m.webp",
    title: "Casa em Leilão em Ananindeua / PA - 2742880",
    address: "Alameda dos Girassois 77 (Lote 77 da Quadra C-02)",
    price: "R$ 136.000,00",
    tags: ["Extrajudicial", "Pestana Leilões"],
    closingDate: "07/04/2026 10:00",
    date1: "07/04/2026 10:00",
    price1: "R$ 136.000,00",
  },
  {
    image: "https://image.leilaoimovel.com.br/images/property/leilaoimovel-imovel-sem-foto.webp",
    title: "Casa em Leilão em Castanhal / PA - 2336854",
    address: "Rua Comandante Assis, Castanhal - PA",
    price: "À Consultar",
    tags: ["Judicial", "Galvani Leilões"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/32/casa-residencial-em-castanhal-pa-2654232-imovel-2654232-9eeffd4fd43c8efacd4f93fdfa6abd1199556bd3-m.webp",
    title: "Casa Residencial Banco do Brasil em Castanhal / PA - 2654232",
    address: "Travessa Algodoal esquina da Avenida Atalaia nº 14, Residencial Costa do Atlântico, Casa 2, Estrela, Castanhal/PA",
    price: "R$ 26.205,08",
    tags: ["Venda Direta"],
  },
  {
    image: "https://image.leilaoimovel.com.br/images/31/casa-residencial-em-castanhal-pa-2654231-imovel-2654231-96667ed83553bc100bbdf63be2a20eb619824f92-m.webp",
    title: "Casa Residencial Banco do Brasil em Castanhal / PA - 2654231",
    address: "Rua Farol, lote 8, nº 217, Costa do Atlântico, Castanhal/PA",
    price: "R$ 36.753,66",
    tags: ["Venda Direta"],
  },
];

const ITEMS_PER_PAGE = 12;

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
