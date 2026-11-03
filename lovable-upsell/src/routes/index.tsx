import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import {
  Check, Compass, Ear, Footprints, Layers, MessageSquareQuote, PlayCircle, BookOpen, Repeat, Map, Wrench,
} from "lucide-react";
import { upsell, isHttps, type MediaItem, type VideoConfig } from "@/config/upsell";
import "../upsell.css";

const PREVIEW = upsell.previewMode;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elevare English | Complemento em vídeo ao Mapa do Inglês" },
      { name: "description", content: "183 aulas em vídeo, 14 módulos e 352 materiais de apoio por R$37,90 ao ano." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Elevare English | Complemento em vídeo ao Mapa do Inglês" },
      { property: "og:description", content: "183 aulas em vídeo, 14 módulos e 352 materiais de apoio por R$37,90 ao ano." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Upsell,
});

const SUMMARY = "183 aulas em vídeo • 14 módulos • 352 materiais de apoio";
const PRICE_LINE = "R$37,90 ao ano • 12 meses de acesso";

function Placeholder({ title, children }: { title: string; children?: ReactNode }) {
  if (!PREVIEW) return null;
  return (
    <div className="up-ph" role="note">
      <strong>Prévia — {title}</strong>
      {children && <span>{children}</span>}
    </div>
  );
}

function Video({ cfg, label }: { cfg: VideoConfig; label: string }) {
  if (!cfg.src) {
    if (!PREVIEW) return null;
    return (
      <div className={`up-video up-ph ${cfg.orientation}`} role="note">
        <PlayCircle size={44} aria-hidden="true" />
        <strong>Prévia — {label}</strong>
        <span>Configure o vídeo em src/config/upsell.ts ({cfg.orientation === "vertical" ? "9:16" : "16:9"}).</span>
      </div>
    );
  }
  return (
    <div className={`up-video ${cfg.orientation}`}>
      {cfg.kind === "embed" ? (
        <iframe src={cfg.src} title={label} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <video src={cfg.src} poster={cfg.poster ?? undefined} controls preload="none" playsInline aria-label={label} />
      )}
    </div>
  );
}

function Gallery({ items, label }: { items: MediaItem[]; label: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<MediaItem | null>(null);
  if (items.length === 0) return <Placeholder title={label}>Adicione imagens reais em src/config/upsell.ts.</Placeholder>;
  return (
    <>
      <div className="up-gallery">
        {items.map((it) => (
          <button key={it.src} type="button" className="up-thumb" aria-label={`Ampliar: ${it.alt}`}
            onClick={() => { setCurrent(it); ref.current?.showModal(); }}>
            <img src={it.src} alt={it.alt} loading="lazy" />
          </button>
        ))}
      </div>
      <dialog ref={ref} className="up-lightbox" aria-label="Imagem ampliada" onClick={(e) => e.target === ref.current && ref.current?.close()}>
        {current && <img src={current.src} alt={current.alt} />}
        <button type="button" onClick={() => ref.current?.close()}>Fechar</button>
      </dialog>
    </>
  );
}

function ScrollCta({ children }: { children: ReactNode }) {
  return <a className="up-btn" href="#investimento">{children}</a>;
}

function Decline() {
  const [msg, setMsg] = useState("");
  const text = "Não, obrigado. Quero continuar sem adicionar o curso.";
  if (isHttps(upsell.declineUrl)) return <a className="up-decline" href={upsell.declineUrl}>{text}</a>;
  return (
    <>
      <button type="button" className="up-decline" onClick={() => setMsg("Prévia: o destino da recusa ainda não foi configurado.")}>{text}</button>
      {msg && PREVIEW && <p className="up-status" role="status">{msg}</p>}
    </>
  );
}

function BuyButton() {
  const [authorized, setAuthorized] = useState(false);
  const [msg, setMsg] = useState("");
  const label = "SIM, QUERO ADICIONAR O ELEVARE ENGLISH";
  const { mode, url } = upsell.checkout;
  if (mode && isHttps(url)) {
    if (mode === "one-click") {
      return (
        <>
          <label className="up-auth">
            <input type="checkbox" checked={authorized} onChange={(e) => setAuthorized(e.target.checked)} />
            <span>Autorizo a cobrança adicional de R$37,90 referente ao plano anual do Elevare English.</span>
          </label>
          <a className="up-btn" href={authorized ? url : undefined} aria-disabled={!authorized}
            onClick={(e) => { if (!authorized) { e.preventDefault(); setMsg("Marque a autorização acima para continuar."); } }}>{label}</a>
          {msg && <p className="up-status" role="status">{msg}</p>}
        </>
      );
    }
    return <a className="up-btn" href={url}>{label}</a>;
  }
  return (
    <>
      <button type="button" className="up-btn" onClick={() => setMsg("Prévia: o checkout ainda não foi configurado. Nenhuma cobrança foi feita.")}>{label}</button>
      {msg && <p className="up-status" role="status">{msg}</p>}
    </>
  );
}

const ETAPAS = [
  { icon: Footprints, title: "Primeiros passos", hl: "Conheça as bases para acompanhar os estudos.", body: "Comece pela apresentação do curso e pelos fundamentos: alfabeto, números, pronomes, verbo to be, formação de perguntas e frases negativas." },
  { icon: Layers, title: "Construção de frases e tempos verbais", hl: "Entenda estruturas para falar sobre presente, passado e futuro.", body: "Acompanhe conteúdos sobre tempos verbais, condicionais, verbos modais, preposições, comparações e voz passiva.", add: "Diversos assuntos possuem vídeos em inglês e português, além de revisões nos blocos correspondentes." },
  { icon: Ear, title: "Pronúncia e sons do inglês", hl: "Observe os sons que nem sempre ficam claros na escrita.", body: "Explore conteúdos sobre TH, schwa, sons do T, reduções na fala e diferenças de pronúncia entre palavras e estruturas." },
  { icon: MessageSquareQuote, title: "Expressões e phrasal verbs", hl: "Amplie seu repertório para reconhecer expressões em diferentes contextos.", body: "Conheça a estrutura dos phrasal verbs e acompanhe conteúdos sobre expressões como look for, give up e take off, entre outras." },
  { icon: Repeat, title: "Escuta, repetição e revisão", hl: "Reserve espaço para praticar e retomar o conteúdo.", body: "O curso inclui vídeos de shadowing, revisões e conteúdos chamados Story Time em diferentes módulos.", add: "Shadowing é a prática de ouvir e repetir a fala, buscando acompanhar seus sons e ritmo.", badge: "Prática distribuída ao longo do curso" },
  { icon: Compass, title: "Independência nos estudos", hl: "Conheça caminhos para continuar aprendendo.", body: "O módulo extra reúne orientações sobre estudos com podcasts, audiobooks, TV e filmes, além de conteúdos sobre escrita formal, fala, compreensão de leitura e entrevista em inglês." },
];

const FLOW = [
  ["Assista à aula", "Observe a explicação e os exemplos apresentados."],
  ["Consulte o material de apoio", "Use o material relacionado para acompanhar seus estudos."],
  ["Utilize as práticas disponíveis", "Nos módulos correspondentes, aproveite shadowing, revisões e Story Time."],
  ["Retome os assuntos com seus mapas", "Consulte os mapas quando quiser revisar os pontos principais."],
];

const INCLUDED = [
  "183 aulas em vídeo",
  "14 módulos, incluindo o módulo extra",
  "352 materiais de apoio",
  "Conteúdos de fundamentos, gramática, pronúncia e phrasal verbs",
  "Shadowing, revisões e Story Time em diferentes módulos",
  "12 meses de acesso",
];

const FAQ: [string, string][] = [
  ["O Elevare English já está incluído nos mapas?", "Não. O Elevare English é um curso em vídeo oferecido separadamente como complemento opcional."],
  ["O que recebo ao adicionar o curso?", "Você recebe 12 meses de acesso a 183 aulas em vídeo, distribuídas em 14 módulos, e 352 materiais de apoio."],
  ["O curso tem aulas em português?", "Sim. Diversos conteúdos possuem vídeos em português e inglês. Essa divisão não se aplica igualmente a todas as aulas."],
  ["As seis etapas são seis módulos?", "Não. As etapas resumem as principais frentes de estudo para facilitar a apresentação. O curso possui 14 módulos, com algumas práticas distribuídas ao longo deles."],
  ["O que é shadowing?", "É uma prática de ouvir e repetir a fala, procurando acompanhar seus sons e ritmo. O curso inclui vídeos dedicados a essa prática em diferentes módulos."],
  ["O preço é mensal?", "Não. R$37,90 é o valor do plano anual, correspondente a 12 meses de acesso."],
  ["Preciso adicionar o curso para receber meus mapas?", "Não. Sua compra dos mapas não depende desta oferta."],
  ["Posso adquirir sem comprar o combo?", "Sim. Você pode adicionar o curso mesmo tendo comprado somente o Mapa do Inglês."],
];

function List({ items }: { items: string[] }) {
  return (
    <ul className="up-list">
      {items.map((i) => <li key={i}><Check size={18} aria-hidden="true" /><span>{i}</span></li>)}
    </ul>
  );
}

function Upsell() {
  const optionalFaq: [string, string | null][] = [
    ["Como recebo o acesso?", upsell.deliveryInfo],
    ["Como funciona a renovação?", upsell.renewalTerms],
    ["Como falar com o suporte?", upsell.supportInfo],
    ["Existe garantia?", upsell.guarantee],
  ];
  const faq = [...FAQ, ...optionalFaq.filter((f): f is [string, string] => !!f[1])];
  const footerLinks = ([["Suporte", upsell.links.support], ["Termos de uso", upsell.links.terms], ["Privacidade", upsell.links.privacy]] as const)
    .filter(([, u]) => isHttps(u)) as [string, string][];

  return (
    <div className="up">
      <div className="up-banner">Uma oportunidade para complementar sua compra do Mapa do Inglês</div>
      <p className="up-brand">ELEVARE ENGLISH</p>

      <main>
        <section className="up-sec up-hero" aria-labelledby="h1">
          <div className="up-wrap">
            <h1 id="h1">Você já tem os mapas para revisar. Agora, acompanhe as <span className="up-green">explicações em vídeo</span>.</h1>
            <p className="up-sub">Acrescente aos seus estudos 183 aulas em vídeo, organizadas em 14 módulos, com 352 materiais de apoio.</p>
            <p className="up-mini">Conheça os conteúdos de fundamentos, gramática, pronúncia e expressões, além das práticas e revisões disponíveis ao longo do curso.</p>
            <Video cfg={upsell.vsl} label="Vídeo de apresentação (VSL)" />
            <p className="up-facts">{SUMMARY}</p>
            <p className="up-facts price">{PRICE_LINE}</p>
            <div className="up-actions">
              <ScrollCta>QUERO ADICIONAR O ELEVARE ENGLISH</ScrollCta>
              <Decline />
            </div>
          </div>
        </section>

        <section className="up-sec muted" aria-labelledby="dentro">
          <div className="up-wrap">
            <h2 id="dentro" className="up-h2">Conheça o Elevare English por dentro</h2>
            <p className="up-lead">Veja como as aulas e os materiais de apoio estão organizados para acompanhar seus estudos.</p>
            <div className="up-inside">
              <article className="up-card">
                <h3>Aulas e plataforma</h3>
                <Video cfg={upsell.demoVideo} label="Demonstração das aulas" />
                {(upsell.platformScreenshots.length > 0 || PREVIEW) && <Gallery items={upsell.platformScreenshots} label="Capturas da plataforma" />}
              </article>
              <article className="up-card">
                <h3>Materiais de apoio</h3>
                <p>Além dos vídeos, você recebe 352 materiais de apoio para acompanhar os estudos.</p>
                <Gallery items={upsell.materialSamples} label="Amostras dos materiais de apoio" />
              </article>
            </div>
          </div>
        </section>

        <section className="up-sec" aria-labelledby="caminho">
          <div className="up-wrap">
            <h2 id="caminho" className="up-h2">Entenda o caminho de estudos dentro do Elevare English</h2>
            <p className="up-lead">Reunimos as principais frentes do curso em seis etapas para você visualizar o conteúdo e entender o que poderá estudar.</p>
            <div className="up-steps">
              {ETAPAS.map((e, i) => (
                <article key={e.title} className="up-card">
                  <div className="up-step-head">
                    <span className="up-icon"><e.icon size={22} aria-hidden="true" /></span>
                    <div><span className="up-label">ETAPA {String(i + 1).padStart(2, "0")}</span><h3>{e.title}</h3></div>
                  </div>
                  <p className="up-hl">{e.hl}</p>
                  <p className="up-body">{e.body}</p>
                  {e.add && <p className="up-add">{e.add}</p>}
                  {e.badge && <span className="up-badge">{e.badge}</span>}
                </article>
              ))}
            </div>
            <div className="up-center"><ScrollCta>QUERO ACESSAR AS AULAS</ScrollCta></div>
          </div>
        </section>

        <section className="up-sec muted" aria-labelledby="rotina">
          <div className="up-wrap">
            <h2 id="rotina" className="up-h2">Acompanhe a explicação. Pratique. Revise com seus mapas.</h2>
            <p className="up-lead">Combine as explicações em vídeo com os materiais de acompanhamento e use os mapas para retomar assuntos relacionados.</p>
            <ol className="up-flow">
              {FLOW.map(([t, d], i) => (
                <li key={t}><span className="up-num" aria-hidden="true">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="up-sec" aria-labelledby="comparar">
          <div className="up-wrap">
            <h2 id="comparar" className="up-h2" style={{ marginBottom: 24 }}>Duas formas de estudar que você pode combinar</h2>
            <div className="up-compare">
              <article className="up-card">
                <div className="up-step-head"><span className="up-icon"><Map size={22} aria-hidden="true" /></span><h3>Mapa do Inglês</h3></div>
                <List items={["Consulta e revisão visual", "Conteúdo em mapas mentais", "Organização por níveis", "Exemplos apresentados no material"]} />
              </article>
              <article className="up-card accent">
                <div className="up-step-head"><span className="up-icon"><PlayCircle size={22} aria-hidden="true" /></span><h3>Elevare English</h3></div>
                <List items={["Explicações em vídeo", "Materiais de acompanhamento", "Conteúdos de gramática, pronúncia e expressões", "Shadowing, revisões e Story Time em diferentes módulos"]} />
              </article>
            </div>
            <p className="up-keep">Você mantém os materiais da compra anterior e pode acrescentar o curso como outra forma de estudar.</p>
          </div>
        </section>

        {(upsell.testimonials.length > 0 || PREVIEW) && (
          <section className="up-sec muted" aria-labelledby="depo">
            <div className="up-wrap">
              <h2 id="depo" className="up-h2" style={{ marginBottom: 24 }}>Veja a experiência de quem já estudou com o Elevare English</h2>
              {upsell.testimonials.length === 0 ? (
                <Placeholder title="Depoimentos reais pendentes">Adicione apenas depoimentos autênticos (imagem, vídeo ou texto). Esta seção fica oculta enquanto vazia.</Placeholder>
              ) : (
                <div className="up-testis">
                  {upsell.testimonials.map((t, i) =>
                    t.type === "image" ? <Gallery key={i} items={[{ src: t.src, alt: t.alt }]} label="Depoimento" /> :
                    t.type === "video" ? <Video key={i} cfg={{ src: t.src, kind: t.kind, poster: null, orientation: "vertical" }} label={t.title} /> :
                    <blockquote key={i} className="up-card"><p>“{t.quote}”</p><footer className="up-body">— {t.author}</footer></blockquote>,
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        <section id="investimento" className="up-sec" aria-labelledby="inv">
          <div className="up-wrap">
            <h2 id="inv" className="up-inv-title">SEU INVESTIMENTO</h2>
            <div className="investment-shell">
              <div className="investment-card">
                <h3>Adicione o Elevare English aos seus estudos</h3>
                <p className="up-body">Um ano de acesso às aulas em vídeo e aos materiais de apoio.</p>
                <List items={INCLUDED} />
                <p className="up-price-label">Tenha acesso por</p>
                <p className="up-price">R$37,90</p>
                <p className="up-price-sub">ao ano • 12 meses de acesso</p>
                {upsell.renewalTerms ? <p className="up-renew">{upsell.renewalTerms}</p> : PREVIEW && <p className="up-renew"><span className="up-ph-inline">Condição de renovação a confirmar</span></p>}
                <div className="up-actions">
                  <BuyButton />
                  <p className="up-note">Compra adicional e opcional de R$37,90 pelo plano anual.</p>
                  <Decline />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="up-sec muted" aria-labelledby="faq">
          <div className="up-wrap">
            <h2 id="faq" className="up-h2" style={{ marginBottom: 24 }}>Perguntas frequentes</h2>
            <div className="up-faq">
              {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="up-sec up-final" aria-labelledby="final">
          <div className="up-wrap">
            <h2 id="final" className="up-h2">Acrescente explicações em vídeo à sua rotina de inglês</h2>
            <p className="up-lead">Explore as aulas, acompanhe os materiais de apoio e combine o curso com seus mapas de revisão.</p>
            <p className="up-facts">{SUMMARY}</p>
            <p className="up-facts price">{PRICE_LINE}</p>
            <div className="up-actions"><ScrollCta>SIM, QUERO ADICIONAR O ELEVARE ENGLISH</ScrollCta><Decline /></div>
          </div>
        </section>
      </main>

      <footer className="up-footer">
        <div className="up-wrap">
          <p><BookOpen size={14} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px" }} /> Elevare English</p>
          {footerLinks.length > 0 ? (
            <nav aria-label="Links institucionais">{footerLinks.map(([l, u]) => <a key={l} href={u}>{l}</a>)}</nav>
          ) : PREVIEW && <p><span className="up-ph-inline"><Wrench size={12} aria-hidden="true" style={{ display: "inline" }} /> Links de suporte, termos e privacidade a configurar</span></p>}
        </div>
      </footer>
    </div>
  );
}