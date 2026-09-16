"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const workTypes = ["SaaS que escala", "ERP que simplifica", "CRM que aproxima", "Agentes de IA úteis", "Integrações que fluem", "Automações que liberam tempo"];
const technologies = ["Node.js", "NestJS", "Next.js", "React", "PostgreSQL", "Redis", "AWS", "GitHub", "Python", "Django", "Docker", "Terraform", "Playwright", "RAG", "MCP", "ETL / ELT"];
const offerings = [
  ["01", "Produtos digitais", "SaaS, portais, plataformas B2B e aplicativos que transformam uma operação em produto."],
  ["02", "Sistemas de negócio", "ERP, CRM, financeiro, marketplace e fluxos internos com domínio, dados e experiência no centro."],
  ["03", "IA aplicada", "Agentes, RAG, busca semântica, avaliação de respostas e automações que resolvem um trabalho específico."],
  ["04", "Integrações e dados", "APIs, ETL, ELT, mensageria, observabilidade e uma base de dados preparada para decisões melhores."]
];
const outcomes = [
  ["50%", "menos carga operacional em fluxos críticos"],
  ["40%", "mais velocidade de entrega com engenharia consistente"],
  ["99,9%", "disponibilidade sustentada em integrações sensíveis"],
  ["8+", "anos convertendo complexidade em produto confiável"]
];
const knowledge = ["A IRTC é uma fábrica de software de Belém do Pará.", "Criamos SaaS, ERP, CRM, automações, integrações, plataformas de dados e soluções de IA aplicada.", "Nossa forma de trabalhar une descoberta, arquitetura pragmática, desenvolvimento, qualidade, observabilidade e suporte próximo.", "Tecnologias recorrentes: Node.js, NestJS, Next.js, React, PostgreSQL, Redis, AWS, GitHub, Python, Django, RAG, bancos vetoriais, ETL e ELT.", "A cultura IRTC prioriza clareza, responsabilidade, resposta rápida, qualidade sustentável e parceria de longo prazo."];

type Message = { role: "user" | "assistant"; content: string };

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function SiteExperience() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [closeConfirm, setCloseConfirm] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Olá, sou Iris. Posso explicar a IRTC ou rascunhar seu MVP em até 250 caracteres." }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [scope, setScope] = useState("");
  const [contactState, setContactState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const chatEnd = useRef<HTMLDivElement>(null);
  const phrase = workTypes[typedIndex];

  useEffect(() => {
    const finished = typedLength === phrase.length;
    const empty = typedLength === 0;
    const pause = finished && !deleting ? 1500 : empty && deleting ? 380 : deleting ? 24 : 65;
    const timer = window.setTimeout(() => {
      if (finished && !deleting) return setDeleting(true);
      if (empty && deleting) {
        setDeleting(false);
        return setTypedIndex((current) => (current + 1) % workTypes.length);
      }
      setTypedLength((current) => current + (deleting ? -1 : 1));
    }, pause);
    return () => window.clearTimeout(timer);
  }, [deleting, phrase.length, typedLength]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, chatLoading]);

  const structuredData = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "IRTC", url: "https://irtc.com.br", email: "iago@irtc.com.br", description: "Fábrica de software em Belém do Pará especializada em sistemas, dados e IA aplicada.", areaServed: "BR", address: { "@type": "PostalAddress", addressLocality: "Belém", addressRegion: "PA", addressCountry: "BR" }, founder: { "@type": "Person", name: "Iago Rodrigues Melo Rocha", sameAs: "https://www.linkedin.com/in/iago-rodrigues/" }, knowsAbout: ["Software engineering", "Artificial intelligence", "RAG", "Vector databases", "Node.js", "PostgreSQL", "AWS", "SaaS", "ERP", "CRM", "ETL", "ELT"] },
      { "@type": "ProfessionalService", name: "IRTC", url: "https://irtc.com.br", serviceType: ["Desenvolvimento de SaaS", "Sistemas ERP e CRM", "Engenharia de IA", "Integrações e automações", "Engenharia de dados"] },
      { "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "O que a IRTC desenvolve?", acceptedAnswer: { "@type": "Answer", text: "A IRTC desenvolve SaaS, ERP, CRM, automações, integrações, plataformas de dados e soluções de IA aplicada." } }, { "@type": "Question", name: "Onde fica a IRTC?", acceptedAnswer: { "@type": "Answer", text: "A IRTC é uma fábrica de software de Belém do Pará que atende negócios no Brasil e internacionalmente." } }] }
    ]
  }), []);

  async function sendChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message || chatLoading) return;
    const history = [...messages, { role: "user" as const, content: message }];
    setMessages(history);
    setChatInput("");
    setChatLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, history: history.slice(-6), knowledge }) });
      const data = await response.json() as { answer?: string; error?: string };
      setMessages((current) => [...current, { role: "assistant", content: data.answer ?? data.error ?? "Não consegui responder agora. Tente novamente em instantes." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "Não consegui responder agora. Tente novamente em instantes." }]);
    } finally {
      setChatLoading(false);
    }
  }

  async function sendContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setContactState("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      if (!response.ok) throw new Error();
      setContactState("sent");
      event.currentTarget.reset();
    } catch {
      setContactState("error");
    }
  }

  async function approveScope() {
    if (!scope.trim()) return;
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Lead via Iris", email: "não informado", message: `Rascunho aprovado no Iris:\n${scope}`, kind: "scope_approval" }) });
      setMessages((current) => [...current, { role: "assistant", content: "Rascunho encaminhado à IRTC. Vamos transformar a ideia em uma próxima conversa objetiva." }]);
      setScope("");
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "Não consegui encaminhar agora. Use o formulário de contato e mencione seu rascunho." }]);
    }
  }

  function closeChat() {
    setMessages([{ role: "assistant", content: "Olá, sou Iris. Posso explicar a IRTC ou rascunhar seu MVP em até 250 caracteres." }]);
    setChatInput("");
    setScope("");
    setCloseConfirm(false);
    setChatOpen(false);
  }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="IRTC, início"><span>IR</span><i>TC</i></a>
      <nav aria-label="Navegação principal"><a href="#oferta">O que fazemos</a><a href="#metodo">Como fazemos</a><a href="#confianca">Confiança</a><a href="#contato">Contato</a></nav>
      <a className="header-cta" href="#contato">Começar projeto <Arrow /></a>
    </header>
    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="river-glow" aria-hidden="true" />
        <p className="eyebrow reveal">Belém do Pará · Brasil · Mundo</p>
        <h1 id="hero-title" className="reveal delay-1">Tecnologia que <em>avança</em> o seu negócio.</h1>
        <p className="hero-copy reveal delay-2">Projetamos e entregamos <strong>{phrase.slice(0, typedLength)}<b aria-hidden="true">|</b></strong> com engenharia de verdade: clareza no plano, velocidade na execução e presença depois do lançamento.</p>
        <div className="hero-actions reveal delay-3"><a className="button primary" href="#contato">Fale com a IRTC <Arrow /></a><a className="button text-link" href="#oferta">Explore possibilidades <span aria-hidden="true">↓</span></a></div>
        <div className="hero-current" aria-label="Status da IRTC"><span>Engenharia</span><span>Dados</span><span>IA aplicada</span><span className="pulse">Disponível para construir</span></div>
      </section>

      <section className="statement" aria-labelledby="statement-title">
        <p className="section-kicker">Nosso ponto de partida</p>
        <h2 id="statement-title">A gente não entrega <em>features.</em><br />Entrega clareza, ritmo e sistemas que sustentam o próximo passo.</h2>
        <div className="statement-detail"><span className="index">[ 01 ]</span><p>A IRTC reúne arquitetura, produto e execução para transformar operações complexas em experiências simples, estáveis e mensuráveis.</p></div>
      </section>

      <section className="offerings" id="oferta" aria-labelledby="offerings-title">
        <div className="section-heading"><p className="section-kicker">Capacidades</p><h2 id="offerings-title">Da ideia à operação <em>inteira.</em></h2><p>Escolhemos a tecnologia pelo impacto que ela cria — e não pelo brilho da novidade.</p></div>
        <div className="offering-grid">{offerings.map(([number, title, description]) => <article className="offering-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><div aria-hidden="true">↗</div></article>)}</div>
      </section>

      <section className="tech-field" aria-labelledby="tech-title">
        <div className="tech-copy"><p className="section-kicker">Stack com propósito</p><h2 id="tech-title">Tecnologia que aguenta a <em>correnteza.</em></h2><p>Arquiteturas bem escolhidas diminuem custo de mudança, aumentam confiança e abrem espaço para o negócio crescer.</p></div>
        <ul className="tech-cloud" aria-label="Tecnologias de trabalho">{technologies.map((technology, index) => <li className={`tech-${(index % 5) + 1}`} key={technology}>{technology}</li>)}</ul>
      </section>

      <section className="method" id="metodo" aria-labelledby="method-title">
        <div className="method-intro"><p className="section-kicker">Nosso jeito</p><h2 id="method-title">Ritmo de fábrica.<br /><em>Olhar de parceiro.</em></h2></div>
        <ol><li><span>01</span><div><h3>Entender o que importa</h3><p>Descoberta objetiva para revelar restrições, oportunidades e o menor caminho até valor real.</p></div></li><li><span>02</span><div><h3>Desenhar para durar</h3><p>Produto, arquitetura e dados trabalhando juntos antes de o código virar custo futuro.</p></div></li><li><span>03</span><div><h3>Entregar em ciclos curtos</h3><p>Visibilidade contínua, validação cedo e entregas que colocam o negócio em movimento.</p></div></li><li><span>04</span><div><h3>Operar com responsabilidade</h3><p>Qualidade, observabilidade e suporte próximo para sua equipe avançar com segurança.</p></div></li></ol>
      </section>

      <section className="outcomes" id="confianca" aria-labelledby="outcomes-title">
        <div className="outcomes-heading"><p className="section-kicker">Confiança construída</p><h2 id="outcomes-title">Resultado é o nosso <em>argumento.</em></h2><p>Indicadores de trajetórias de entrega em produtos de marketplace, finanças, saúde e operações de dados.</p></div>
        <div className="outcome-grid">{outcomes.map(([number, label]) => <article key={number}><strong>{number}</strong><p>{label}</p></article>)}</div>
        <p className="proof-note">Experiência reunida em projetos e times com necessidades reais de escala, segurança, dados e experiência do usuário.</p>
      </section>

      <section className="culture" aria-labelledby="culture-title"><div className="culture-orbit" aria-hidden="true"><span>claro</span><span>presente</span><span>rápido</span><span>rigoroso</span></div><div><p className="section-kicker">Cultura IRTC</p><h2 id="culture-title">Da Amazônia, aprendemos a respeitar sistemas <em>vivos.</em></h2><p>O contexto muda, as variáveis se conectam e a melhor tecnologia é aquela que melhora a vida de quem depende dela. Trabalhamos com escuta, responsabilidade e energia para fazer acontecer.</p><a className="button dark" href="#contato">Construir com a IRTC <Arrow /></a></div></section>

      <section className="contact" id="contato" aria-labelledby="contact-title"><div className="contact-title"><p className="section-kicker">Próximo movimento</p><h2 id="contact-title">Existe uma ideia<br />pedindo <em>estrutura?</em></h2><p>Conte o contexto. A primeira resposta chega com clareza, não com uma proposta genérica.</p><a href="mailto:iago@irtc.com.br">iago@irtc.com.br <Arrow /></a></div><form onSubmit={sendContact} aria-describedby="contact-status"><div className="field-row"><label>Nome<input name="name" required autoComplete="name" maxLength={100} /></label><label>E-mail<input name="email" type="email" required autoComplete="email" maxLength={160} /></label></div><label>Empresa<input name="company" autoComplete="organization" maxLength={120} /></label><label>O que você quer transformar?<textarea name="message" required rows={5} maxLength={1800} /></label><input className="honeypot" name="website" aria-label="Não preencher" tabIndex={-1} autoComplete="off" /><button className="button primary" disabled={contactState === "sending"}>{contactState === "sending" ? "Enviando..." : "Enviar contexto"} <Arrow /></button><p id="contact-status" className="form-status" aria-live="polite">{contactState === "sent" ? "Recebemos seu contexto. A IRTC retorna em breve." : contactState === "error" ? "Não foi possível enviar agora. Escreva para iago@irtc.com.br." : "Seus dados são usados somente para este contato."}</p></form></section>
    </main>
    <footer><a className="brand" href="#inicio" aria-label="IRTC - Voltar ao início"><span>IR</span><i>TC</i></a><p>Software, dados e IA aplicada com origem em Belém do Pará.</p><a href="https://www.linkedin.com/in/iago-rodrigues/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><small>© {new Date().getFullYear()} IRTC. Todos os direitos reservados.</small></footer>
    <button className="iris-launcher" onClick={() => setChatOpen(true)} aria-haspopup="dialog" aria-expanded={chatOpen}><span aria-hidden="true">✦</span><span>Falar com Iris</span></button>
    {chatOpen ? <aside className={`iris ${maximized ? "maximized" : ""}`} role="dialog" aria-modal="true" aria-labelledby="iris-title"><header><div><p>IRTC · assistente de descoberta</p><h2 id="iris-title">Iris <span aria-hidden="true">✦</span></h2></div><div className="iris-actions"><button onClick={() => setMaximized((value) => !value)} aria-label={maximized ? "Reduzir chat" : "Expandir chat"}>{maximized ? "↙" : "↗"}</button><button onClick={() => setCloseConfirm(true)} aria-label="Fechar Iris">×</button></div></header>{closeConfirm ? <div className="close-confirm"><strong>Encerrar esta conversa?</strong><p>Ao confirmar, o histórico será limpo.</p><div><button className="button dark" onClick={() => setCloseConfirm(false)}>Continuar</button><button className="button primary" onClick={closeChat}>Sim, encerrar</button></div></div> : <><div className="iris-messages" aria-live="polite" aria-label="Mensagens do Iris">{messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}>{message.content}</p>)}{chatLoading ? <p className="assistant loading">Iris está pensando<span>.</span><span>.</span><span>.</span></p> : null}<div ref={chatEnd} /></div><div className="scope-draft"><label>Rascunho de escopo opcional<textarea value={scope} onChange={(event) => setScope(event.target.value)} maxLength={500} placeholder="Cole ou anote o escopo para aprovar" rows={2} /></label><button onClick={approveScope} disabled={!scope.trim()}>Aprovar e enviar</button></div><form className="iris-form" onSubmit={sendChat}><label className="sr-only" htmlFor="iris-message">Pergunte à Iris</label><input id="iris-message" value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ex.: preciso de um MVP para..." maxLength={800} disabled={chatLoading} /><button aria-label="Enviar mensagem" disabled={chatLoading}>↑</button></form><p className="iris-limit">Iris responde apenas sobre a IRTC e ideias iniciais de MVP.</p></>}</aside> : null}
  </>;
}
