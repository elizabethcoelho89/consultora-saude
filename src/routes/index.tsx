import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import heroImg from "@/assets/hero-consultoria.jpg";
import portraitImg from "@/assets/elizabeth-portrait.jpg";
import planoIndividual from "@/assets/plano-individual.jpg";
import planoFamiliar from "@/assets/plano-familiar.jpg";
import planoPme from "@/assets/plano-pme.jpg";
import planoEmpresarial from "@/assets/plano-empresarial.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/5521999584385?text=" +
  encodeURIComponent("Olá, Elizabeth! Quero comparar planos de saúde.");
const WHATSAPP_DISPLAY = "(21) 99958-4385";
const EMAIL = "elizabethcoelho89@gmail.com";

/* ---------------------------------------------------------------
 * DADOS EDITÁVEIS — Elizabeth pode substituir logos, textos e valores
 * das operadoras abaixo por informações reais quando quiser.
 * ------------------------------------------------------------- */
const OPERADORAS = [
  { nome: "Amil", desc: "Uma das maiores operadoras do país, com rede nacional ampla e opções para todos os perfis.", precoBase: "289" },
  { nome: "Unimed", desc: "Maior cooperativa médica do Brasil, presente em praticamente todo território nacional.", precoBase: "312" },
  { nome: "Bradesco Saúde", desc: "Plano com abrangência nacional em rede referenciada e forte reputação no mercado.", precoBase: "398" },
  { nome: "SulAmérica", desc: "Mais de 125 anos de mercado, com foco em atendimento premium e reembolso ágil.", precoBase: "445" },
  { nome: "NotreDame Intermédica", desc: "Rede própria de hospitais e clínicas, ótimo custo-benefício em SP e RJ.", precoBase: "259" },
  { nome: "Porto Seguro Saúde", desc: "Atendimento diferenciado com rede referenciada de alto padrão.", precoBase: "376" },
  { nome: "Assim Saúde", desc: "Tradicional no Rio de Janeiro, ótima relação de custo x rede credenciada.", precoBase: "229" },
  { nome: "Hapvida", desc: "Uma das operadoras que mais cresce no Brasil, com rede própria integrada.", precoBase: "215" },
];

const TIPOS_PLANO = [
  { titulo: "Plano Individual", texto: "Ideal para quem contrata para si mesmo, com liberdade de escolha de rede e cobertura.", img: planoIndividual, key: "Individual" },
  { titulo: "Plano Familiar", texto: "Cobertura para você e seus dependentes, com preços por faixa etária.", img: planoFamiliar, key: "Familiar" },
  { titulo: "Plano PME", texto: "Para empresas de 2 a 99 vidas, com condições diferenciadas e menos carência.", img: planoPme, key: "PME" },
  { titulo: "Plano Empresarial", texto: "Soluções sob medida para empresas acima de 100 vidas, com negociação personalizada.", img: planoEmpresarial, key: "Empresarial" },
];

const BENEFICIOS = [
  { icon: "⚖️", titulo: "Comparação isenta", texto: "Analiso diversas operadoras lado a lado — você escolhe com base em fatos, não em pressão de venda." },
  { icon: "💬", titulo: "Atendimento humanizado", texto: "Cada cliente é único. Ouço sua história antes de recomendar qualquer plano." },
  { icon: "🛟", titulo: "Suporte pós-contratação", texto: "Boletos, sinistros, dúvidas de rede — continuo ao seu lado depois da assinatura." },
  { icon: "🎁", titulo: "Sem custo adicional", texto: "A consultoria é remunerada pela operadora. Você não paga nada a mais por isso." },
  { icon: "⚡", titulo: "Agilidade na cotação", texto: "Retorno em poucas horas com comparativo pronto para decisão." },
  { icon: "🏅", titulo: "Experiência de mercado", texto: "Anos atendendo famílias e empresas no segmento de saúde suplementar." },
];

const DEPOIMENTOS = [
  { nome: "Marina S.", texto: "Elizabeth me ajudou a encontrar um plano que cabe no meu orçamento sem abrir mão da rede que eu queria. Atendimento incrível!", inicial: "M" },
  { nome: "Rafael T.", texto: "Contratei o plano PME para minha empresa e o processo foi muito mais simples do que imaginei. Recomendo demais.", inicial: "R" },
  { nome: "Juliana P.", texto: "O que mais me chamou atenção foi o cuidado. Ela comparou várias opções e explicou cada detalhe. Consultoria de verdade.", inicial: "J" },
  { nome: "Carlos M.", texto: "Depois da contratação continua respondendo minhas dúvidas. Isso não tem preço.", inicial: "C" },
];

const FAQ = [
  { q: "A consultoria tem algum custo para mim?", a: "Não. A consultoria é 100% gratuita para você. Sou remunerada diretamente pela operadora escolhida, sem qualquer taxa adicional para o cliente." },
  { q: "Qual a diferença entre plano individual, familiar e empresarial?", a: "O individual é contratado por uma única pessoa. O familiar cobre você e dependentes. O empresarial (PME ou grande porte) é contratado via CNPJ, geralmente com preços mais competitivos e menos carência." },
  { q: "Existe carência nos planos?", a: "Sim, cada operadora define períodos de carência para diferentes tipos de atendimento. Em planos empresariais é comum haver isenção parcial ou total de carência dependendo do porte." },
  { q: "Posso trocar de plano sem perder carência?", a: "Sim, em muitos casos é possível fazer portabilidade de carências entre operadoras, desde que atendidos os requisitos da ANS. Analiso caso a caso." },
  { q: "Como funciona a cotação personalizada?", a: "Você preenche o formulário ou me chama no WhatsApp. Eu levanto suas necessidades, comparo as principais operadoras e envio um comparativo claro em poucas horas." },
  { q: "Quais documentos preciso para contratar?", a: "Para plano individual/familiar: RG, CPF e comprovante de residência. Para plano empresarial: contrato social, CNPJ e dados dos beneficiários. Envio a lista completa após a cotação." },
];

/* ---------------------------------------------------------------- */

function Index() {
  const [tipoPlano, setTipoPlano] = useState("");
  const [operadora, setOperadora] = useState("");
  const [enviado, setEnviado] = useState(false);

  const scrollToForm = (tipo?: string, op?: string) => {
    if (tipo) setTipoPlano(tipo);
    if (op) setOperadora(op);
    document.getElementById("cotacao")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const dados = Object.fromEntries(fd.entries());
    // TODO: integrar envio real por e-mail para elizabethcoelho89@gmail.com
    // (ex.: via servidor de e-mail, webhook ou serviço externo)
    console.log("Cotação recebida:", dados);
    const corpo = Object.entries(dados)
      .map(([k, v]) => `${k}: ${v}`)
      .join("%0D%0A");
    window.location.href = `mailto:${EMAIL}?subject=Nova cotação de plano de saúde&body=${corpo}`;
    setEnviado(true);
  };

  const maskPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Header onCta={() => scrollToForm()} />

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--surface)] via-background to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Corretora autorizada — atendimento em todo o RJ
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-primary md:text-5xl lg:text-6xl">
              Planos de Saúde —{" "}
              <span className="text-accent">Compare e Contrate</span> com quem entende do assunto
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Encontre o plano ideal para você, sua família ou sua empresa — com atendimento
              personalizado e <strong className="text-foreground">cotação 100% gratuita</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToForm()}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Solicitar Cotação Grátis
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5"
              >
                <WhatsappIcon className="h-4 w-4" /> WhatsApp Agora
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 text-center">
              {[
                ["+10", "anos de mercado"],
                ["+800", "famílias atendidas"],
                ["8+", "operadoras parceiras"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-semibold text-primary md:text-3xl">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative fade-up">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl shadow-primary/10">
              <img
                src={heroImg}
                alt="Elizabeth Coelho atendendo uma família em consultoria de plano de saúde"
                width={1600}
                height={1100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-48 overflow-hidden rounded-2xl border-4 border-background shadow-xl md:block">
              <img src={planoFamiliar} alt="Família feliz" width={900} height={700} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 -top-4 hidden w-40 overflow-hidden rounded-2xl border-4 border-background shadow-xl md:block">
              <img src={planoIndividual} alt="Atendimento humanizado" width={900} height={700} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative">
            <img
              src={portraitImg}
              alt="Retrato profissional de Elizabeth Coelho"
              width={900}
              height={1100}
              loading="lazy"
              className="mx-auto w-full max-w-md rounded-3xl border border-border object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lg">
              Consultora Autorizada
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Quem sou eu</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
              Olá, eu sou a Elizabeth Coelho
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Há mais de uma década ajudo pessoas, famílias e empresas a encontrarem o plano de
              saúde certo — nem sempre o mais caro, nem sempre o mais barato, mas o que faz sentido
              para a sua vida.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              <strong className="text-foreground">
                Escolher um convênio médico exige análise e conhecimento do mercado.
              </strong>{" "}
              Por isso estou aqui: com experiência nas principais operadoras do Brasil, comparo,
              oriento e acompanho você do início ao pós-venda — sem custo adicional.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              {[
                "Análise comparativa entre 8+ operadoras",
                "Atendimento presencial e digital",
                "Suporte contínuo depois da contratação",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TIPOS DE PLANOS */}
      <section id="tipos" className="bg-[color:var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Modalidades</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
              Tipos de planos que atendo
            </h2>
            <p className="mt-4 text-muted-foreground">
              Escolha a modalidade que combina com o seu momento — a cotação já sai personalizada.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIPOS_PLANO.map((t) => (
              <article
                key={t.key}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={t.img} alt={t.titulo} width={900} height={700} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-primary">{t.titulo}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.texto}</p>
                  <button
                    onClick={() => scrollToForm(t.key)}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    Cotação Grátis →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPERADORAS CARROSSEL */}
      <section id="planos" className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Operadoras parceiras</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
              Planos de saúde que você conhece
            </h2>
            <p className="mt-4 text-muted-foreground">
              Comparo as principais operadoras do país. Clique em uma delas para receber uma
              cotação personalizada.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Deslize para o lado →
          </p>
        </div>
        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 lg:mx-0 lg:px-0">
          {OPERADORAS.map((op) => (
            <article
              key={op.nome}
              className="flex w-[280px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent hover:shadow-lg sm:w-[320px]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/5 text-lg font-bold text-primary">
                {op.nome.charAt(0)}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">{op.nome}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{op.desc}</p>
              <div className="mt-5 rounded-xl bg-accent/10 p-3">
                <p className="text-xs text-muted-foreground">A partir de</p>
                <p className="text-xl font-bold text-primary">
                  R$ {op.precoBase},<span className="text-base">00</span>
                  <span className="text-xs font-normal text-muted-foreground">/mês*</span>
                </p>
              </div>
              <button
                onClick={() => scrollToForm(undefined, op.nome)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Quero este plano
              </button>
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          *Valor sujeito à faixa etária e região — faça sua cotação personalizada e sem compromisso.
        </p>
      </section>

      {/* CTA INTERMEDIÁRIO */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(60% 60% at 80% 30%, oklch(0.72 0.14 175) 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Descubra qual o plano ideal para você, sua família ou empresa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Uma consultora especializada analisando seu caso, comparando as melhores opções e
            devolvendo uma resposta clara em poucas horas.
          </p>
          <button
            onClick={() => scrollToForm()}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-xl transition hover:-translate-y-0.5"
          >
            COTAÇÃO GRÁTIS
          </button>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Como funciona</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
            Em 4 passos simples
          </h2>
          <p className="mt-4 text-muted-foreground">
            Consultoria gratuita e sem compromisso — você não paga nada a mais por isso.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            "Você preenche o formulário ou chama no WhatsApp",
            "Eu entendo sua necessidade (idade, dependentes, orçamento)",
            "Você recebe uma comparação personalizada das melhores opções",
            "Você escolhe com segurança e eu acompanho toda a contratação",
          ].map((p, i) => (
            <li key={p} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {i + 1}
              </div>
              <p className="mt-4 text-sm text-foreground">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-[color:var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Por que escolher</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
              Diferenciais que fazem a diferença
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFICIOS.map((b) => (
              <div key={b.titulo} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-2xl">
                  {b.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">{b.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Depoimentos</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
            Quem já foi atendido conta
          </h2>
          <p className="mt-3 text-xs text-muted-foreground">
            {/* Substituir por depoimentos reais de clientes */}
            Depoimentos ilustrativos — a substituir por casos reais.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.nome} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex text-accent" aria-label="5 estrelas">
                {"★★★★★"}
              </div>
              <blockquote className="mt-3 flex-1 text-sm text-foreground">"{d.texto}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {d.inicial}
                </div>
                <span className="text-sm font-semibold text-primary">{d.nome}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CONTATO + FORMULÁRIO */}
      <section id="cotacao" className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Fale comigo</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Cotação de Plano de Saúde — 100% Gratuita
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Preencha os dados ao lado e receba uma comparação personalizada de valores em poucas
              horas. Prefere falar agora? Chame no WhatsApp — resposta em minutos.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur transition hover:bg-white/10">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">
                  <WhatsappIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-primary-foreground/60">WhatsApp</span>
                  <span className="font-semibold">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur transition hover:bg-white/10">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">✉</span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-primary-foreground/60">E-mail</span>
                  <span className="font-semibold">{EMAIL}</span>
                </span>
              </a>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">📍</span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-primary-foreground/60">Atendimento</span>
                  <span className="font-semibold">Rio de Janeiro e região</span>
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-background p-6 text-foreground shadow-2xl md:p-8"
          >
            {enviado ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-3xl text-accent-foreground">✓</div>
                  <h3 className="mt-4 text-2xl font-semibold text-primary">Recebemos seus dados!</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Elizabeth entrará em contato em breve com sua comparação personalizada.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-primary">Preencha para receber sua cotação</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Resposta em poucas horas. Seus dados ficam protegidos.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Nome completo" name="nome" required />
                  <Field label="E-mail" name="email" type="email" required />
                  <Field label="WhatsApp / telefone" name="telefone" required onChange={maskPhone} placeholder="(21) 99999-9999" />
                  <SelectField
                    label="Tipo de plano"
                    name="tipo"
                    value={tipoPlano}
                    onChange={(v) => setTipoPlano(v)}
                    options={["Individual", "Familiar", "PME", "Empresarial"]}
                    required
                  />
                  <Field label="Quantidade de vidas" name="vidas" type="number" min={1} defaultValue={1} required />
                  <Field label="Faixa etária dos beneficiários" name="idade" placeholder="Ex: 30-40, 0-18" required />
                  <Field label="Cidade / Estado" name="cidade" placeholder="Rio de Janeiro / RJ" required />
                  <Field
                    label="Plano de interesse (opcional)"
                    name="operadora"
                    value={operadora}
                    onChange={(e) => setOperadora(e.target.value)}
                    placeholder="Amil, Unimed…"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    name="mensagem"
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
                <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[color:var(--accent)]" />
                  <span>
                    Autorizo o contato e o uso dos meus dados para fins de cotação, conforme a{" "}
                    <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
                  </span>
                </label>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Quero minha cotação gratuita
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
            Perguntas frequentes
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-5 transition hover:border-accent open:border-accent"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-primary">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}

/* --------------------------- SUBCOMPONENTES --------------------------- */

function TopBar() {
  return (
    <div className="hidden bg-primary py-2 text-primary-foreground md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs lg:px-8">
        <div className="flex items-center gap-5">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
            <WhatsappIcon className="h-3.5 w-3.5" /> {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-accent">
            ✉ {EMAIL}
          </a>
        </div>
        <div className="flex items-center gap-3 text-primary-foreground/80">
          <a href="#" aria-label="Instagram" className="hover:text-accent">Instagram</a>
          <span className="opacity-30">|</span>
          <a href="#" aria-label="LinkedIn" className="hover:text-accent">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

function Header({ onCta }: { onCta: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Início", "#inicio"],
    ["Quem Somos", "#quem-somos"],
    ["Tipos de Planos", "#tipos"],
    ["Planos de Saúde", "#planos"],
    ["FAQ", "#faq"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            EC
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-primary sm:text-base">Elizabeth Coelho</span>
            <span className="block truncate text-[11px] uppercase tracking-widest text-muted-foreground">
              Consultoria em Planos de Saúde
            </span>
          </span>
        </a>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="text-sm font-medium text-foreground/80 transition hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <button
            onClick={onCta}
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-md transition hover:-translate-y-0.5 sm:inline-flex"
          >
            COTAÇÃO GRÁTIS
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-foreground/80">
                {l}
              </a>
            ))}
            <button
              onClick={() => { onCta(); setOpen(false); }}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground"
            >
              COTAÇÃO GRÁTIS
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--surface)] py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">EC</span>
            <span>
              <span className="block text-sm font-semibold text-primary">Elizabeth Coelho</span>
              <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
                Consultoria em Planos de Saúde
              </span>
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Este site é um serviço independente de consultoria e intermediação em planos de saúde.
            Não somos uma operadora de saúde.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Contato</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><WhatsappIcon className="h-4 w-4" /> +55 21 99958-4385</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></li>
            <li>Rio de Janeiro / RJ</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Redes</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Instagram</a></li>
            <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-4 pt-6 text-center text-xs text-muted-foreground lg:px-8">
        © Elizabeth Coelho — Consultoria em Planos de Saúde {new Date().getFullYear()}
      </div>
    </footer>
  );
}

function FloatingWhatsapp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
    >
      <span className="pulse-ring absolute inset-0 rounded-full" />
      <WhatsappIcon className="relative h-7 w-7" />
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  value,
  onChange,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="text-accent"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        min={min}
        className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="text-accent"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      >
        <option value="">Selecione…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function WhatsappIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.87 11.87 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.4-8.44ZM12.05 21.5h-.01a9.63 9.63 0 0 1-4.9-1.34l-.35-.21-3.76.98 1-3.66-.23-.37a9.62 9.62 0 0 1-1.47-5.02c0-5.32 4.33-9.65 9.66-9.65 2.58 0 5 1 6.83 2.83a9.6 9.6 0 0 1 2.83 6.83c0 5.32-4.33 9.66-9.61 9.66Zm5.29-7.22c-.29-.15-1.71-.85-1.98-.95-.27-.1-.46-.15-.66.15s-.76.95-.93 1.15c-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.14-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.03-.51-.08-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.02c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.71-.7 1.95-1.37.24-.68.24-1.25.17-1.37-.07-.12-.27-.2-.56-.35Z"/>
    </svg>
  );
}
