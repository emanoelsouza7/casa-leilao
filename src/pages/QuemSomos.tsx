import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuemSomos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section with image */}
        <section className="relative min-h-[70vh] flex items-center">
          {/* Background image - right side */}
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
            <img
              src="https://www.leilaoimovel.com.br/img/li/residential-modern-apartment-building.webp"
              alt="Edifício moderno"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:from-background md:via-background/40 md:to-transparent" />
          </div>

          <div className="container relative z-10 py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="text-muted-foreground text-lg mb-2">Quem somos</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">
                Portal Leilão Imóvel
              </h1>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A compra de <strong className="text-foreground">imóveis em leilão é uma excelente opção</strong>,
                  tanto para quem quer <strong className="text-foreground">investir</strong> quanto para quem quer{" "}
                  <strong className="text-foreground">comprar para uso</strong>.
                </p>
                <p>
                  Afinal, quem não quer comprar um <strong className="text-foreground">bem real</strong> com{" "}
                  <strong className="text-foreground">até 95% de desconto?</strong>
                </p>
                <p>
                  <strong className="text-foreground">Apesar de trazer excelentes oportunidades</strong> tanto para
                  quem quer comprar um imóvel para uso como para quem quer investir,{" "}
                  <strong className="text-foreground">os descontos oferecidos não vem "de graça"</strong>. Boas
                  arrematações <strong className="text-foreground">exigem tempo</strong> para garimpar as melhores
                  oportunidades e <strong className="text-foreground">conhecimento especializado</strong> para fugir
                  das armadilhas e concretizar o negócio no menor tempo possível.
                </p>
                <p>
                  <strong className="text-foreground">
                    O Leilão Imóvel surgiu para te ajudar a fazer as melhores arrematações!
                  </strong>{" "}
                  Para isso, oferecemos:
                </p>

                <ul className="space-y-3 pl-2">
                  <li className="flex gap-2">
                    <span className="text-coral font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Os melhores especialistas do mercado</strong>, que estarão
                      ao seu lado em toda a sua jornada, reduzindo riscos e agilizando o processo de desembaraço do
                      seu imóvel.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-coral font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Aprovação do seu crédito em menos de 24 horas</strong>,
                      com opção de entrada de 5% e utilização do FGTS.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-coral font-bold">•</span>
                    <span>
                      <strong className="text-foreground">As mais poderosas ferramentas</strong> para te apoiar a
                      encontrar e analisar o imóvel ideal para a sua necessidade.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-coral font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Acesso gratuito e ilimitado</strong> ao mais completo
                      banco de dados de leilões do Brasil, atualizado diariamente e organizado para simplificar o
                      seu trabalho.
                    </span>
                  </li>
                </ul>

                <p className="pt-4">
                  Está esperando o quê? <strong className="text-foreground">Comece já!</strong>
                </p>

                <div className="space-y-2">
                  <p className="flex gap-2 items-start">
                    <span className="text-coral font-bold">•</span>
                    <span>
                      <strong className="text-foreground">Encontre seu</strong>{" "}
                      <Link to="/encontre-seu-imovel" className="text-primary font-bold hover:underline">
                        imóvel
                      </Link>
                    </span>
                  </p>
                  <p className="flex gap-2 items-start">
                    <span className="text-coral font-bold">•</span>
                    <span>
                      Conte com nossa equipe de especialistas para te ajudar em todas as etapas de aquisição de um
                      imóvel em leilão e de compra direta caixa.
                    </span>
                  </p>
                </div>

                <p className="pt-4 text-lg">
                  <strong className="text-primary font-heading">
                    Leilão Imóvel: O melhor lance da sua vida!
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuemSomos;
