import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Star, X, Menu, ArrowRight, MessageCircle, BarChart2, PenLine } from "lucide-react";

function InstagramIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

// ─── Brand Tokens ────────────────────────────────────────────────────────────
const T = {
  bg: "#13151B",
  bgCard: "#1C1F28",
  slate: "#252834",
  cream: "#EEE7E0",
  creamDim: "rgba(238,231,224,0.68)",
  creamFaint: "rgba(238,231,224,0.32)",
  terra: "#A1421E",
  terraS: "#C05A2D",
  terraGlow: "rgba(161,66,30,0.3)",
  line: "rgba(238,231,224,0.1)",
  lineTerra: "rgba(161,66,30,0.2)",
};

const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', monospace";

const INSTAGRAM_URL = "https://www.instagram.com/nexo_easy?igsh=MWlvODM1Z210YmxtZQ%3D%3D&utm_source=qr";
const WA_URL = "https://wa.me/5511958642044?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Nexo";

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.2,.8,.2,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "O que fazemos", id: "modulos" },
    { label: "Como funciona", id: "como-funciona" },
    { label: "Planos", id: "planos" },
    { label: "Dúvidas", id: "faq" },
  ];

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(19,21,27,0.97)" : "rgba(19,21,27,0.82)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? T.lineTerra : "transparent"}`,
        transition: "all 0.35s ease",
        padding: "0 clamp(20px, 4vw, 48px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66, maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
              <circle cx="14" cy="14" r="14" fill="rgba(161,66,30,0.15)" />
              {[0, 120, 240].map((deg, i) => {
                const rad = (deg - 90) * (Math.PI / 180);
                const x = 14 + 7 * Math.cos(rad);
                const y = 14 + 7 * Math.sin(rad);
                return <circle key={i} cx={x} cy={y} r="2.2" fill="#A1421E" />;
              })}
              {[0, 120, 240].map((deg, i) => {
                const rad0 = (deg - 90) * (Math.PI / 180);
                const rad1 = (deg + 30) * (Math.PI / 180);
                const x0 = 14 + 7 * Math.cos(rad0); const y0 = 14 + 7 * Math.sin(rad0);
                const x1 = 14 + 11 * Math.cos(rad1); const y1 = 14 + 11 * Math.sin(rad1);
                return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="rgba(161,66,30,0.5)" strokeWidth="1" />;
              })}
              <circle cx="14" cy="14" r="3" fill="#C05A2D" />
            </svg>
            <div style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 700, color: T.cream, letterSpacing: "-0.02em" }}>
              Ne<span style={{ color: T.terra, fontStyle: "italic" }}>x</span>o
            </div>
          </div>

          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {links.map(l => (
              <button key={l.id} onClick={() => goTo(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: sans, fontSize: "0.875rem", fontWeight: 500,
                color: T.creamDim, transition: "color 0.2s", padding: 0,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                onMouseLeave={e => (e.currentTarget.style.color = T.creamDim)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener"
              style={{ color: T.creamDim, display: "flex", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
              onMouseLeave={e => (e.currentTarget.style.color = T.creamDim)}
            >
              <InstagramIcon size={18} />
            </a>
            <a href={WA_URL} target="_blank" rel="noopener" style={{
              fontFamily: sans, fontWeight: 600, fontSize: "0.85rem",
              background: T.terra, color: T.cream,
              padding: "9px 22px", borderRadius: 6, textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#8a3618")}
              onMouseLeave={e => (e.currentTarget.style.background = T.terra)}
            >
              Falar com a Nexo
            </a>
          </div>

          <button className="nav-burger" onClick={() => setMobileOpen(o => !o)} style={{
            display: "none", background: "none", border: "none", color: T.cream, cursor: "pointer", padding: 6,
          }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div className="mobile-menu" style={{
        position: "fixed", top: 66, left: 0, right: 0, zIndex: 49,
        background: "rgba(19,21,27,0.98)", backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${T.lineTerra}`,
        maxHeight: mobileOpen ? 400 : 0, overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ padding: "16px 24px 28px", display: "flex", flexDirection: "column", gap: 2 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => goTo(l.id)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: sans, fontSize: "1rem", fontWeight: 500,
              color: T.creamDim, padding: "14px 0",
              borderBottom: `1px solid rgba(238,231,224,0.06)`,
            }}>
              {l.label}
            </button>
          ))}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{
            fontFamily: sans, fontSize: "0.9rem", color: T.creamDim, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 8, padding: "14px 0",
          }}>
            <InstagramIcon size={16} /> @nexo_easy
          </a>
          <a href={WA_URL} target="_blank" rel="noopener" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: T.terra, color: T.cream, fontFamily: sans, fontWeight: 700, fontSize: "0.95rem",
            padding: "14px 20px", borderRadius: 8, textDecoration: "none", marginTop: 10,
          }}>
            Falar com a Nexo →
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* Rich dark background — no photo */}
      <div style={{ position: "absolute", inset: 0, background: "#0E1016" }} />
      {/* Terra ambient glow */}
      <div style={{
        position: "absolute",
        top: "10%", right: "-10%",
        width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(161,66,30,0.13) 0%, rgba(161,66,30,0.04) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-5%", left: "-15%",
        width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(161,66,30,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.1,
        backgroundImage: "linear-gradient(rgba(238,231,224,1) 1px, transparent 1px), linear-gradient(90deg, rgba(238,231,224,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />
      {/* Bottom fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,21,27,1) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,16,22,0.7) 0%, transparent 20%)" }} />

      {/* Large decorative wordmark — background layer */}
      <div style={{
        position: "absolute",
        right: "clamp(-60px, -4vw, 0px)",
        top: "50%", transform: "translateY(-50%)",
        fontFamily: serif, fontWeight: 900,
        fontSize: "clamp(180px, 30vw, 420px)",
        color: "transparent",
        WebkitTextStroke: "1px rgba(161,66,30,0.12)",
        letterSpacing: "-0.04em",
        lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
        opacity: 0.9,
      }}>
        Nexo
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        width: "100%",
        display: "flex", alignItems: "center",
        padding: "100px clamp(24px, 5vw, 80px) clamp(64px, 10vh, 100px)",
        maxWidth: 1360, margin: "0 auto",
      }}>
        {/* Left: text content */}
        <div style={{ flex: "1 1 0", minWidth: 0, maxWidth: 640 }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 2, background: T.terra, borderRadius: 2 }} />
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 500, color: T.terra, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Automação para pequenas empresas
            </span>
          </div>

          {/* Brand mark — the focal wordmark */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: serif, fontWeight: 900,
              fontSize: "clamp(4rem, 11vw, 8.5rem)",
              color: T.cream,
              letterSpacing: "-0.035em", lineHeight: 0.95,
              textShadow: `0 0 120px rgba(161,66,30,0.25)`,
            }}>
              Ne<span style={{
                color: T.terra, fontStyle: "italic",
                textShadow: `0 0 60px rgba(161,66,30,0.5)`,
              }}>x</span>o
            </div>
            <div style={{
              fontFamily: mono, fontSize: "clamp(10px, 1.2vw, 13px)",
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: T.creamFaint, marginTop: 10,
            }}>
              automação inteligente
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 48, height: 1, background: `linear-gradient(90deg, ${T.terra}, transparent)`, marginBottom: 28 }} />

          {/* Headline */}
          <h1 style={{
            fontFamily: serif, fontWeight: 700, color: T.creamDim,
            fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
            lineHeight: 1.3, letterSpacing: "-0.01em",
            maxWidth: 520, marginBottom: 28,
          }}>
            Seu negócio nunca para de atender
          </h1>

          {/* What Nexo does */}
          <div style={{ marginBottom: 40, maxWidth: 480 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Atendimento automático no WhatsApp — 24h por dia",
                "Painel de gestão: clientes, finanças e agenda",
                "Criação de conteúdo para Instagram e redes sociais",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: T.terra, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: sans, fontSize: "clamp(0.875rem, 1.1vw, 1rem)", color: T.creamDim, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: mono, fontSize: 11, color: T.creamFaint, marginTop: 16, letterSpacing: "0.04em" }}>
              Tudo pronto em até 7 dias. Sem você entender de tecnologia.
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <a href={WA_URL} target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: T.terra, color: T.cream,
              fontFamily: sans, fontWeight: 700, fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
              padding: "15px 32px", borderRadius: 8, textDecoration: "none",
              boxShadow: `0 8px 32px ${T.terraGlow}`,
              transition: "background 0.2s, transform 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#8a3618"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.terra; e.currentTarget.style.transform = "none"; }}
            >
              <MessageCircle size={18} /> Falar com a Nexo
            </a>
            <button onClick={() => document.getElementById("modulos")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: sans, fontSize: "0.9rem", color: T.creamFaint,
              display: "flex", alignItems: "center", gap: 6,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
              onMouseLeave={e => (e.currentTarget.style.color = T.creamFaint)}
            >
              Ver o que fazemos ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pillars ──────────────────────────────────────────────────────────────────
function Pillars() {
  const items = [
    {
      Icon: MessageCircle,
      title: "Atendimento no WhatsApp",
      desc: "Seu cliente manda mensagem às 23h num domingo. A Nexo responde, informa preços, confirma horários e agenda — tudo automático, com a linguagem do seu negócio.",
      img: "https://images.unsplash.com/photo-1610548822783-33fb5cb0e3a8?w=800&h=600&fit=crop&auto=format",
      imgAlt: "pessoa com celular",
    },
    {
      Icon: BarChart2,
      title: "Painel de Gestão",
      desc: "Um painel simples com seus clientes, receita, tarefas e relatórios. Você enxerga o negócio todo numa tela, sem planilha, sem complicação.",
      img: "https://images.unsplash.com/photo-1742837581522-111d23b69a04?w=800&h=600&fit=crop&auto=format",
      imgAlt: "laptop com painel de dados",
    },
    {
      Icon: PenLine,
      title: "Conteúdo para Redes Sociais",
      desc: "Posts, legendas e anúncios criados para o seu negócio toda semana. Você revisa, aprova e publica — sem precisar pensar no que escrever.",
      img: "https://images.unsplash.com/photo-1595039838779-f3780873afdd?w=800&h=600&fit=crop&auto=format",
      imgAlt: "pessoa criando conteúdo para redes sociais",
    },
  ];

  return (
    <section style={{ padding: "80px clamp(24px, 5vw, 80px)", maxWidth: 1360, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.terra, marginBottom: 12 }}>
            O que a Nexo faz
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: T.cream, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Três serviços. Uma solução.
          </h2>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 24 }}>
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              background: T.bgCard, border: `1px solid ${T.line}`,
              borderRadius: 16, overflow: "hidden",
              transition: "border-color 0.3s, transform 0.3s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.lineTerra; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.line; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <img
                  src={item.img} alt={item.imgAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,21,27,0.85) 0%, rgba(19,21,27,0.1) 60%)" }} />
                {/* Icon badge */}
                <div style={{
                  position: "absolute", bottom: 14, left: 16,
                  width: 40, height: 40, borderRadius: 10,
                  background: `linear-gradient(135deg, rgba(161,66,30,0.9), rgba(161,66,30,0.6))`,
                  border: `1px solid rgba(161,66,30,0.5)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(8px)",
                }}>
                  <item.Icon size={20} color={T.cream} />
                </div>
              </div>

              {/* Text */}
              <div style={{ padding: "24px 28px 28px" }}>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.2rem", color: T.cream, marginBottom: 12, lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: sans, fontSize: "0.9rem", color: T.creamDim, lineHeight: 1.75 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Chat Demo ────────────────────────────────────────────────────────────────
const CHAT_INITIAL = [
  { dir: "out", text: "Olá! 👋 Aqui é a Barbearia do João. Funcionamos de seg a sáb, das 9h às 20h. Posso ajudar?", time: "21:46" },
  { dir: "in",  text: "Qual o valor do corte?", time: "21:47" },
  { dir: "out", text: "Corte: R$45 · Corte + barba: R$65 · Platinado: R$90. Quer agendar?", time: "21:47" },
  { dir: "in",  text: "Quero sábado de manhã", time: "21:48" },
  { dir: "out", text: "Tenho 10h e 11h disponíveis no sábado. Qual prefere?", time: "21:48" },
  { dir: "in",  text: "10h", time: "21:49" },
  { dir: "out", text: "Perfeito! 10h de sábado reservado no seu nome. Te mando um lembrete na sexta ✓", time: "21:49" },
];

const BOT_REPLIES: Record<string, string> = {
  default: "Posso ajudar com agendamentos, preços ou informações. O que deseja?",
  preco: "Corte: R$45 · Corte + barba: R$65 · Platinado: R$90. Quer agendar?",
  agendar: "Tenho horários amanhã às 10h, 14h e 16h. Qual fica melhor?",
  horario: "Funcionamos de segunda a sábado, das 9h às 20h.",
};

function matchReply(input: string) {
  const q = input.toLowerCase();
  if (q.includes("prec") || q.includes("valor") || q.includes("quanto") || q.includes("custa")) return BOT_REPLIES.preco;
  if (q.includes("hor") || q.includes("funciona") || q.includes("abre") || q.includes("fecha")) return BOT_REPLIES.horario;
  if (q.includes("agenda") || q.includes("marcar") || q.includes("reserv") || q.includes("quero")) return BOT_REPLIES.agendar;
  return BOT_REPLIES.default;
}

function ChatDemo() {
  const [messages, setMessages] = useState(CHAT_INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    const userMsg = { dir: "in", text: input, time };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { dir: "out", text: matchReply(userMsg.text), time }]);
    }, 900);
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  return (
    <div style={{
      background: "#0D1117", borderRadius: 20, padding: 8,
      boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(161,66,30,0.15)",
      width: "min(340px, 100%)",
    }}>
      <div style={{ background: "#0B141A", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "#1F2C34", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, fontFamily: sans }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.terra, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: T.cream, flexShrink: 0 }}>N</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#E9EDEF" }}>Nexo · Barbearia</div>
            <div style={{ fontSize: 11, color: "#8FD4A8", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8FD4A8", display: "inline-block" }} /> online agora
            </div>
          </div>
        </div>

        <div ref={chatRef} style={{
          padding: "14px 12px", display: "flex", flexDirection: "column", gap: 8,
          minHeight: 280, maxHeight: 340, overflowY: "auto", background: "#0B141A",
          scrollbarWidth: "none",
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.dir === "out" ? "flex-start" : "flex-end", maxWidth: "84%" }}>
              <div style={{
                padding: "8px 12px", borderRadius: 10, fontSize: 12.5, lineHeight: 1.55, fontFamily: sans,
                background: m.dir === "out" ? "#1F2C34" : "#144D37",
                color: "#E9EDEF",
                borderTopLeftRadius: m.dir === "out" ? 2 : 10,
                borderTopRightRadius: m.dir === "in" ? 2 : 10,
              }}>
                {m.text}
                <div style={{ marginTop: 3, fontSize: 9.5, color: "rgba(233,237,239,0.4)", textAlign: "right" }}>{m.time} ✓✓</div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ alignSelf: "flex-start" }}>
              <div style={{ padding: "10px 14px", borderRadius: 10, borderTopLeftRadius: 2, background: "#1F2C34", display: "flex", gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#8FD4A8", animation: `typingBlink 1.2s infinite ${i * 0.18}s`, display: "block" }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, padding: "8px 10px", background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Digite uma mensagem..."
            maxLength={120}
            style={{
              flex: 1, background: "#1F2C34", border: "none",
              borderRadius: 100, padding: "9px 14px", fontFamily: sans,
              fontSize: 12.5, color: "#E9EDEF", outline: "none",
              WebkitAppearance: "none",
            }}
          />
          <button onClick={send} style={{
            width: 34, height: 34, flexShrink: 0, borderRadius: "50%", border: "none",
            background: T.terra, color: T.cream, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div style={{ fontSize: 10, color: T.creamFaint, textAlign: "center", marginTop: 8, fontFamily: mono }}>
        experimente enviar uma mensagem ↑
      </div>
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
interface CarouselCard {
  title: string;
  subtitle: string;
  tag: string;
  img: string;
  label?: string;
  rating?: string;
  desc: string;
  cta?: string;
  href?: string;
  onClick?: () => void;
}

function Carousel({ title, cards, wide = false }: { title: string; cards: CarouselCard[]; wide?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -500 : 500, behavior: "smooth" });
  };

  const cardW = wide ? 340 : 200;
  const cardH = wide ? 220 : 310;

  return (
    <div style={{ marginBottom: "clamp(40px, 6vw, 64px)", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, padding: "0 clamp(20px, 4vw, 48px)" }}>
        <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: T.cream, letterSpacing: "-0.01em" }}>{title}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {(["left", "right"] as const).map(dir => {
            const active = dir === "left" ? canLeft : canRight;
            return (
              <button key={dir} onClick={() => scroll(dir)} disabled={!active} style={{
                width: 34, height: 34, borderRadius: "50%",
                border: `1px solid ${active ? "rgba(238,231,224,0.2)" : "rgba(238,231,224,0.06)"}`,
                background: active ? "rgba(238,231,224,0.06)" : "transparent",
                color: active ? T.cream : T.creamFaint,
                cursor: active ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {dir === "left" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={scrollRef} onScroll={checkScroll} style={{
        display: "flex", gap: 14,
        overflowX: "auto", overflowY: "visible",
        scrollbarWidth: "none",
        padding: "8px clamp(20px, 4vw, 48px) 24px",
        scrollSnapType: "x mandatory",
      }}>
        {cards.map((card, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={card.onClick}
            style={{
              flexShrink: 0, width: cardW, height: cardH,
              borderRadius: 12, overflow: "hidden", position: "relative",
              cursor: card.onClick || card.href ? "pointer" : "default",
              scrollSnapAlign: "start",
              transform: hoveredIdx === i ? "translateY(-5px)" : "none",
              transition: "transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s",
              boxShadow: hoveredIdx === i
                ? "0 24px 48px rgba(0,0,0,0.7)"
                : "0 4px 16px rgba(0,0,0,0.4)",
              zIndex: hoveredIdx === i ? 5 : 1,
            }}
          >
            <img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,21,27,0.97) 0%, rgba(19,21,27,0.45) 55%, rgba(19,21,27,0.1) 100%)" }} />

            {card.label && (
              <div style={{
                position: "absolute", top: 10, left: 10,
                background: "rgba(19,21,27,0.82)", backdropFilter: "blur(8px)",
                color: T.cream, fontFamily: mono, fontSize: 9, fontWeight: 500,
                padding: "3px 9px", borderRadius: 4,
                letterSpacing: "0.1em", textTransform: "uppercase",
                border: `1px solid ${T.line}`,
              }}>
                {card.label}
              </div>
            )}

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 14px 14px" }}>
              <div style={{ fontFamily: mono, fontSize: 9, color: T.terra, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 5 }}>
                {card.tag}
              </div>
              <div style={{
                fontFamily: serif, fontWeight: 700,
                fontSize: wide ? "1.0rem" : "0.88rem",
                color: T.cream, lineHeight: 1.25, marginBottom: 4,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {card.title}
              </div>

              <div style={{
                overflow: "hidden",
                maxHeight: hoveredIdx === i ? 140 : 0,
                opacity: hoveredIdx === i ? 1 : 0,
                transition: "max-height 0.3s ease, opacity 0.25s ease",
              }}>
                <div style={{ fontFamily: sans, fontSize: 11, color: T.creamDim, lineHeight: 1.55, marginBottom: 10, marginTop: 4 }}>
                  {card.desc}
                </div>
                {card.rating && (
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 9 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={9} fill={s <= parseFloat(card.rating!) ? T.terra : "transparent"} color={T.terra} />
                    ))}
                    <span style={{ fontFamily: mono, fontSize: 9.5, color: T.creamFaint, marginLeft: 3 }}>{card.rating}</span>
                  </div>
                )}
                {card.cta && (
                  <a href={card.href || "#"} target={card.href ? "_blank" : undefined} rel="noopener"
                    onClick={e => { if (card.onClick) { e.preventDefault(); card.onClick!(); } }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: T.terra, color: T.cream,
                      fontFamily: sans, fontWeight: 600, fontSize: 11,
                      padding: "6px 13px", borderRadius: 6, textDecoration: "none",
                    }}>
                    <Play size={10} fill={T.cream} color={T.cream} /> {card.cta}
                  </a>
                )}
              </div>

              {hoveredIdx !== i && (
                <div style={{ fontFamily: sans, fontSize: 10.5, color: T.creamFaint, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  {card.subtitle}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard Modal ──────────────────────────────────────────────────────────
const CHART_VALS = [28, 41, 35, 58, 72, 89];
const CHART_MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

interface KpiItem {
  label: string;
  val: string;
  sub: string;
  c: string;
  accent?: boolean;
}

function DashboardModal({ onClose }: { onClose: () => void }) {
  const [chartMode, setChartMode] = useState<"bar" | "line">("bar");
  const maxVal = Math.max(...CHART_VALS);

  const kpis: KpiItem[] = [
    { label: "Receita", val: "R$ 11.940", sub: "↑ 23% este mês", c: "#4ade80" },
    { label: "Clientes", val: "38", sub: "↑ 18 novos", c: "#4ade80" },
    { label: "Pendentes", val: "4", sub: "tarefas", c: T.terraS },
    { label: "Satisfação", val: "9.4", sub: "Excelente", c: T.terraS, accent: true },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(19,21,27,0.92)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 600, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: T.creamDim, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: sans, fontSize: 13 }}>
          <X size={16} /> Fechar
        </button>
        <div style={{ background: T.bgCard, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.lineTerra}`, fontFamily: sans }}>
          <div style={{ background: T.slate, borderBottom: `1px solid ${T.line}`, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.cream }}>Painel de Gestão · Nexo</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: T.creamFaint, fontFamily: mono }}>ao vivo</span>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginBottom: 16 }}>
              {kpis.map(k => (
                <div key={k.label} style={{
                  background: k.accent ? `linear-gradient(135deg,rgba(161,66,30,.45),rgba(138,54,24,.18))` : T.slate,
                  border: `1px solid ${k.accent ? T.lineTerra : T.line}`,
                  borderRadius: 10, padding: "12px 14px",
                }}>
                  <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em", color: T.creamFaint, marginBottom: 6 }}>{k.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: T.cream }}>{k.val}</div>
                  <div style={{ fontSize: 10, color: k.c, marginTop: 3 }}>{k.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: T.slate, border: `1px solid ${T.line}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.creamDim }}>Receita mensal</div>
                  <div style={{ fontSize: 10, color: T.creamFaint }}>Jan – Jun 2025 (R$ mil)</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["bar", "line"] as const).map(m => (
                    <button key={m} onClick={() => setChartMode(m)} style={{
                      fontSize: 10, padding: "4px 10px", borderRadius: 6, cursor: "pointer",
                      border: `1px solid ${chartMode === m ? T.terra : T.line}`,
                      background: chartMode === m ? T.terra : "transparent",
                      color: chartMode === m ? T.cream : T.creamFaint, fontFamily: sans,
                    }}>{m === "bar" ? "Barras" : "Linha"}</button>
                  ))}
                </div>
              </div>
              {chartMode === "bar" ? (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 88 }}>
                  {CHART_VALS.map((v, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", height: "100%", gap: 4 }}>
                      <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: Math.round((v / maxVal) * 78), background: `linear-gradient(to top, ${T.terra}, ${T.terraS})` }} />
                      <div style={{ fontSize: 9, color: T.creamFaint }}>{CHART_MONTHS[i]}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: 78, overflow: "visible" }}>
                    <polygon points={`0,100 ${CHART_VALS.map((v, i) => `${i * (100 / (CHART_VALS.length - 1))},${100 - (v / maxVal) * 100}`).join(" ")} 100,100`} fill="rgba(161,66,30,0.18)" />
                    <polyline points={CHART_VALS.map((v, i) => `${i * (100 / (CHART_VALS.length - 1))},${100 - (v / maxVal) * 100}`).join(" ")} fill="none" stroke={T.terraS} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    {CHART_VALS.map((v, i) => <circle key={i} cx={i * (100 / (CHART_VALS.length - 1))} cy={100 - (v / maxVal) * 100} r="3" fill={T.terraS} vectorEffect="non-scaling-stroke" />)}
                  </svg>
                  <div style={{ display: "flex" }}>
                    {CHART_MONTHS.map(m => <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 9, color: T.creamFaint, marginTop: 4 }}>{m}</div>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Antes eu perdia cliente. Hoje o Nexo atende enquanto estou ocupado. Não dava conta de responder WhatsApp e cortar ao mesmo tempo.",
    name: "Marcos T.",
    role: "Barbearia",
    city: "São Paulo",
    initials: "MT",
    rating: 5,
    color: "#5C3D2E",
  },
  {
    quote: "O painel me mostrou que eu cobrava pouco no serviço mais pedido. Ajustei o preço no mesmo mês e fiz diferença real no faturamento.",
    name: "Renata A.",
    role: "Clínica de Estética",
    city: "Belo Horizonte",
    initials: "RA",
    rating: 5,
    color: "#2E3D5C",
  },
  {
    quote: "Meu Instagram está ativo toda semana sem eu pensar no que postar. A Nexo faz, eu aprovo em 2 minutos e publico.",
    name: "Diego S.",
    role: "Loja de Roupas",
    city: "Curitiba",
    initials: "DS",
    rating: 5,
    color: "#3D5C2E",
  },
  {
    quote: "Estava funcionando em 4 dias. Não precisei entender nada de tecnologia. A equipe da Nexo configurou tudo — eu só comecei a usar.",
    name: "Ana L.",
    role: "Salão de Beleza",
    city: "Rio de Janeiro",
    initials: "AL",
    rating: 5,
    color: "#5C2E4A",
  },
];

function Testimonials() {
  return (
    <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 80px)", maxWidth: 1360, margin: "0 auto" }}>
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.terra, marginBottom: 12 }}>
            Resultados reais
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: T.cream, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
              O que nossos clientes dizem
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={16} fill={T.terra} color={T.terra} />
              ))}
              <span style={{ fontFamily: mono, fontSize: 12, color: T.creamFaint, marginLeft: 4 }}>4.9 média · 200+ clientes</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
        gap: 20,
      }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{
              background: T.bgCard,
              border: `1px solid ${T.line}`,
              borderRadius: 16,
              padding: "32px 28px 28px",
              display: "flex", flexDirection: "column",
              transition: "border-color 0.3s, transform 0.3s",
              height: "100%",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.lineTerra; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = T.line; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              <div style={{
                fontFamily: serif, fontSize: "4.5rem", lineHeight: 0.7,
                color: T.terra, opacity: 0.35, marginBottom: 16,
                userSelect: "none", pointerEvents: "none",
              }}>"</div>

              <p style={{
                fontFamily: serif, fontStyle: "italic",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                color: T.cream, lineHeight: 1.7,
                flex: 1, marginBottom: 24,
              }}>
                {t.quote}
              </p>

              <div style={{ width: 32, height: 1, background: T.lineTerra, marginBottom: 20 }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  background: t.color, border: `1px solid rgba(238,231,224,0.12)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: sans, fontWeight: 700, fontSize: 13, color: T.cream,
                  letterSpacing: "0.02em",
                }}>
                  {t.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.875rem", color: T.cream }}>{t.name}</div>
                  <div style={{ fontFamily: sans, fontSize: "0.775rem", color: T.creamFaint, marginTop: 1 }}>{t.role} · {t.city}</div>
                </div>
                <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={10} fill={T.terra} color={T.terra} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Planos ───────────────────────────────────────────────────────────────────
function Planos() {
  return (
    <section id="planos" style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 80px)" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.terra, marginBottom: 12 }}>Investimento</div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: T.cream, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Escolha seu plano
          </h2>
          <p style={{ fontFamily: sans, fontSize: "clamp(0.9rem, 1.2vw, 1rem)", color: T.creamDim, marginTop: 14, maxWidth: 480, margin: "14px auto 0" }}>
            Preço transparente, sem letras miúdas. Você paga uma vez para ativar e uma mensalidade para manter tudo funcionando.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
        <Reveal delay={0.05}>
          <div style={{
            background: T.bgCard, border: `1px solid ${T.line}`,
            borderRadius: 20, padding: "40px 36px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.creamFaint, marginBottom: 12 }}>
              Plano Nexo
            </div>
            <h3 style={{ fontFamily: serif, fontWeight: 800, fontSize: "1.6rem", color: T.cream, marginBottom: 8 }}>
              Completo
            </h3>
            <p style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamDim, lineHeight: 1.6, marginBottom: 28 }}>
              Os três serviços da Nexo configurados e funcionando para o seu negócio.
            </p>

            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 11, color: T.creamFaint }}>Ativação</span>
              </div>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "2.8rem", color: T.cream, lineHeight: 1, letterSpacing: "-0.02em" }}>
                R$ 509
              </div>
              <div style={{ fontFamily: sans, fontSize: "0.8rem", color: T.creamFaint, marginTop: 4 }}>
                pago uma única vez para configurar tudo
              </div>
              <div style={{ width: "100%", height: 1, background: T.line, margin: "20px 0" }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: mono, fontSize: 11, color: T.creamFaint }}>Mensalidade</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: serif, fontWeight: 900, fontSize: "2.4rem", color: T.terra, lineHeight: 1, letterSpacing: "-0.02em" }}>R$ 259</span>
                <span style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamFaint }}>/mês</span>
              </div>
              <div style={{ fontFamily: sans, fontSize: "0.8rem", color: T.creamFaint, marginTop: 4 }}>
                sem fidelidade — cancele quando quiser
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                "Atendimento automático no WhatsApp",
                "Painel de gestão com clientes e receita",
                "Criação de conteúdo semanal",
                "Onboarding dedicado pela equipe Nexo",
                "Suporte direto nos primeiros 15 dias",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: T.terra, fontWeight: 700, fontSize: "0.9rem", flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamDim, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>

            <a href={WA_URL} target="_blank" rel="noopener" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: T.terra, color: T.cream,
              fontFamily: sans, fontWeight: 700, fontSize: "0.95rem",
              padding: "14px 24px", borderRadius: 10, textDecoration: "none",
              transition: "background 0.2s, transform 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#8a3618"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.terra; e.currentTarget.style.transform = "none"; }}
            >
              Quero começar → Falar com a Nexo
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{
            background: T.bgCard, border: `1px solid ${T.line}`,
            borderRadius: 20, padding: "40px 36px",
          }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.creamFaint, marginBottom: 12 }}>
              Plano Business
            </div>
            <h3 style={{ fontFamily: serif, fontWeight: 800, fontSize: "1.6rem", color: T.cream, marginBottom: 8 }}>
              Sob Medida
            </h3>
            <p style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamDim, lineHeight: 1.6, marginBottom: 28 }}>
              Para negócios com demandas específicas: integrações personalizadas, múltiplas unidades ou automações avançadas.
            </p>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: serif, fontWeight: 900, fontSize: "2rem", color: T.cream, lineHeight: 1 }}>
                Consulte
              </div>
              <div style={{ fontFamily: sans, fontSize: "0.8rem", color: T.creamFaint, marginTop: 6 }}>
                orçamento personalizado após conversa inicial
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                "Tudo do plano Completo",
                "Integrações e automações sob medida",
                "Conta dedicada com gerente Nexo",
                "Suporte prioritário via WhatsApp",
                "Relatórios personalizados",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: T.creamFaint, fontWeight: 700, fontSize: "0.9rem", flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamDim, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>

            <a href="https://wa.me/5511958642044?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20o%20Business" target="_blank" rel="noopener" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              color: T.cream, fontFamily: sans, fontWeight: 700, fontSize: "0.95rem",
              padding: "14px 24px", borderRadius: 10, textDecoration: "none",
              border: `1px solid ${T.line}`,
              transition: "border-color 0.2s, transform 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(238,231,224,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.transform = "none"; }}
            >
              Solicitar orçamento
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p style={{ textAlign: "center", fontFamily: mono, fontSize: 11, color: T.creamFaint, marginTop: 32, letterSpacing: "0.05em" }}>
          ✓ Sem contrato de fidelidade &nbsp;·&nbsp; ✓ Ativado em até 7 dias &nbsp;·&nbsp; ✓ Suporte incluso nos primeiros 15 dias
        </p>
      </Reveal>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: "Preciso entender de tecnologia para usar a Nexo?", a: "Não. Nossa equipe configura tudo do zero para o seu negócio. Você só aprova e começa a usar." },
    { q: "Quanto tempo leva para a Nexo entrar no ar?", a: "Em média 5 a 7 dias úteis. Casos com integrações personalizadas podem levar até 2 semanas." },
    { q: "Posso cancelar quando quiser?", a: "Sim. Não há fidelidade. Cancele a qualquer momento, sem multa e sem burocracia." },
    { q: "Funciona para qualquer tipo de negócio?", a: "Funciona para barbearias, clínicas, lojas, restaurantes, salões, escritórios e a maioria das pequenas empresas. Dúvida sobre o seu caso? Fale com a gente." },
    { q: "O que acontece depois dos 15 dias de suporte?", a: "Você continua com suporte por e-mail incluso no plano. Suporte WhatsApp prioritário está disponível no plano Business." },
  ];

  return (
    <section id="faq" style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 80px)", maxWidth: 820, margin: "0 auto" }}>
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <div style={{ width: 3, height: 26, background: T.terra, borderRadius: 2 }} />
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", color: T.cream }}>Dúvidas frequentes</h2>
        </div>
      </Reveal>
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 0.04}>
          <div style={{ borderBottom: `1px solid ${T.line}` }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              width: "100%", padding: "20px 0", background: "none", border: "none",
              cursor: "pointer", gap: 20, textAlign: "left",
            }}>
              <span style={{ fontFamily: sans, fontWeight: 600, fontSize: "clamp(0.875rem, 1.5vw, 0.975rem)", color: T.cream }}>{item.q}</span>
              <span style={{
                fontFamily: serif, fontSize: "1.4rem", color: T.terra, flexShrink: 0,
                display: "inline-block",
                transform: open === i ? "rotate(45deg)" : "none",
                transition: "transform 0.2s",
              }}>+</span>
            </button>
            <div style={{
              overflow: "hidden",
              maxHeight: open === i ? 200 : 0,
              opacity: open === i ? 1 : 0,
              transition: "max-height 0.35s ease, opacity 0.35s ease",
            }}>
              <p style={{ paddingBottom: 22, color: T.creamDim, fontSize: "0.925rem", fontFamily: sans, lineHeight: 1.75 }}>{item.a}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, padding: "52px clamp(24px, 5vw, 60px) 40px" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <svg width="24" height="24" viewBox="0 0 28 28" aria-hidden="true">
                <circle cx="14" cy="14" r="14" fill="rgba(161,66,30,0.15)" />
                {[0, 120, 240].map((deg, i) => {
                  const rad = (deg - 90) * (Math.PI / 180);
                  const x = 14 + 7 * Math.cos(rad);
                  const y = 14 + 7 * Math.sin(rad);
                  return <circle key={i} cx={x} cy={y} r="2.2" fill="#A1421E" />;
                })}
                <circle cx="14" cy="14" r="3" fill="#C05A2D" />
              </svg>
              <div style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 700, color: T.cream }}>
                Ne<span style={{ color: T.terra, fontStyle: "italic" }}>x</span>o
              </div>
            </div>
            <p style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamFaint, lineHeight: 1.75 }}>
              Atendimento automático no WhatsApp, painel de gestão e criação de conteúdo para pequenas e médias empresas — configurado em até 7 dias.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.terra, marginBottom: 16 }}>Serviços</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Atendimento no WhatsApp", "Painel de Gestão", "Criação de Conteúdo", "Como funciona", "Planos"].map(l => (
                  <a key={l} href="#" style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamFaint, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.creamFaint)}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: T.terra, marginBottom: 16 }}>Contato</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={WA_URL} target="_blank" rel="noopener" style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamFaint, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.creamFaint)}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{ fontFamily: sans, fontSize: "0.875rem", color: T.creamFaint, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.creamFaint)}>
                  <InstagramIcon size={14} /> @nexo_easy
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(161,66,30,0.12), rgba(161,66,30,0.05))",
          border: `1px solid ${T.lineTerra}`,
          borderRadius: 12, padding: "20px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          marginBottom: 32,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg, #E1306C, #F77737, #FCAF45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <InstagramIcon size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.9rem", color: T.cream }}>Siga a Nexo no Instagram</div>
              <div style={{ fontFamily: sans, fontSize: "0.8rem", color: T.creamFaint }}>Cases reais, dicas de automação e bastidores</div>
            </div>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "linear-gradient(135deg, #E1306C, #F77737)",
            color: "#fff", fontFamily: sans, fontWeight: 600, fontSize: "0.85rem",
            padding: "9px 18px", borderRadius: 8, textDecoration: "none",
            transition: "opacity 0.2s, transform 0.15s", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
          >
            <InstagramIcon size={14} /> @nexo_easy
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: "rgba(238,231,224,0.2)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Nexo · Todos os direitos reservados
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacidade", "Termos"].map(l => (
              <a key={l} href="#" style={{ fontFamily: sans, fontSize: "0.8rem", color: "rgba(238,231,224,0.2)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <a href={WA_URL} target="_blank" rel="noopener" aria-label="Falar com a Nexo" style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 60,
      width: 52, height: 52, borderRadius: "50%",
      background: T.terra, display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 10px 28px ${T.terraGlow}`,
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.7)",
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.3s ease, transform 0.3s ease, background 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget.style.background = "#8a3618")}
      onMouseLeave={e => (e.currentTarget.style.background = T.terra)}
    >
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", animation: "waPulse 2.4s infinite" }} />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: "relative" }}>
        <path d="M9.1 7.05c-.2-.45-.4-.46-.6-.47h-.5c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2 0 1.29.94 2.54 1.07 2.72.13.18 1.83 2.94 4.52 4 2.24.88 2.7.7 3.18.66.49-.04 1.58-.64 1.8-1.27.23-.62.23-1.15.16-1.27-.07-.11-.25-.18-.5-.3-.27-.13-1.58-.78-1.82-.87-.25-.09-.43-.13-.6.14-.19.27-.7.87-.86 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.34-.8-.71-1.33-1.58-1.49-1.85-.15-.27-.02-.42.12-.55.12-.13.27-.32.4-.48.13-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.6-1.49-.83-2.04Z" fill={T.cream} />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.92C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.24 8.24 0 0 1-1.27-4.28c0-4.55 3.71-8.26 8.27-8.26 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.84c0 4.56-3.71 8.15-8.27 8.15Z" fill={T.cream} />
      </svg>
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const modulesCards: CarouselCard[] = [
    {
      title: "Atendimento Automático no WhatsApp",
      subtitle: "Responde clientes 24h por dia",
      tag: "Serviço 01",
      label: "WhatsApp 24h",
      img: "https://images.unsplash.com/photo-1589985494639-69e60c82cab2?w=400&h=620&fit=crop&auto=format",
      rating: "4.9",
      desc: "Seu cliente pergunta, o bot responde. Preços, horários, agendamentos e confirmações — tudo automático com a voz do seu negócio.",
      cta: "Ver demo",
      onClick: () => document.getElementById("chat-demo")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      title: "Painel de Gestão do Negócio",
      subtitle: "Clientes, finanças e agenda",
      tag: "Serviço 02",
      label: "Mais contratado",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=620&fit=crop&auto=format",
      rating: "4.8",
      desc: "Visão completa do seu negócio numa tela só: receita, clientes, tarefas e relatórios simples de entender.",
      cta: "Ver painel",
      onClick: () => setShowDashboard(true),
    },
    {
      title: "Conteúdo para Redes Sociais",
      subtitle: "Posts e legendas toda semana",
      tag: "Serviço 03",
      img: "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?w=400&h=620&fit=crop&auto=format",
      rating: "4.7",
      desc: "A Nexo cria posts, legendas e anúncios com a identidade do seu negócio. Você só revisa e publica.",
      cta: "Saber mais",
      href: WA_URL,
    },
    {
      title: "Integração e Automação Business",
      subtitle: "Soluções sob medida para sua empresa",
      tag: "Business",
      label: "Sob medida",
      img: "https://images.unsplash.com/photo-1726056652635-7db7a936e7be?w=400&h=620&fit=crop&auto=format",
      rating: "5.0",
      desc: "Para negócios com demandas específicas: integrações com sistemas, múltiplas unidades e automações avançadas.",
      cta: "Solicitar proposta",
      href: "https://wa.me/5511958642044?text=Ol%C3%A1%2C%20quero%20o%20plano%20Business",
    },
    {
      title: "Relatórios e Insights Semanais",
      subtitle: "Análises automáticas do seu negócio",
      tag: "Em desenvolvimento",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=620&fit=crop&auto=format",
      rating: "4.9",
      desc: "Resumos automáticos do desempenho do seu negócio entregues toda semana diretamente no seu WhatsApp.",
      cta: "Me avise",
      href: WA_URL,
    },
  ];

  const stepsCards: CarouselCard[] = [
    {
      title: "Conversa Inicial",
      subtitle: "30 min · Online · Sem compromisso",
      tag: "Passo 1",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=620&h=340&fit=crop&auto=format",
      desc: "Você conta o que o seu negócio faz e quais são as maiores dores do dia a dia. Sem tecnês.",
      cta: "Agendar agora",
      href: WA_URL,
    },
    {
      title: "Configuração Completa",
      subtitle: "Feita por nós · Você não precisa fazer nada",
      tag: "Passo 2",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=620&h=340&fit=crop&auto=format",
      desc: "Nossa equipe configura o atendimento, o painel e o conteúdo com base no que você nos contou.",
    },
    {
      title: "Ativo em até 7 Dias",
      subtitle: "Garantido · Sem enrolação",
      tag: "Passo 3",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=620&h=340&fit=crop&auto=format",
      desc: "Em até 7 dias a Nexo está no ar respondendo seus clientes, organizando dados e publicando conteúdo.",
    },
    {
      title: "Suporte nos Primeiros 15 Dias",
      subtitle: "Suporte direto · Ajustes inclusos",
      tag: "Passo 4",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=620&h=340&fit=crop&auto=format",
      desc: "Os primeiros 15 dias têm suporte dedicado para qualquer ajuste fino. Você nunca fica sozinho.",
    },
  ];

  return (
    <div style={{ background: T.bg, color: T.cream, fontFamily: sans, lineHeight: 1.6, minHeight: "100vh", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        ::selection { background: #A1421E; color: #EEE7E0; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; height: 0px; }
        ::-webkit-scrollbar-thumb { background: rgba(161,66,30,0.3); border-radius: 3px; }
        a:focus-visible, button:focus-visible { outline: 2px solid rgba(161,66,30,0.5); outline-offset: 3px; border-radius: 4px; }
        input, textarea, select { outline: none !important; -webkit-appearance: none; -webkit-tap-highlight-color: transparent; box-shadow: none !important; }
        input:focus, textarea:focus { outline: none !important; box-shadow: none !important; }
        a, button { -webkit-tap-highlight-color: transparent; }
        @keyframes typingBlink { 0%, 80%, 100% { opacity: .2; } 40% { opacity: 1; } }
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(161,66,30,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(161,66,30,0); }
          100% { box-shadow: 0 0 0 0 rgba(161,66,30,0); }
        }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
          .nav-right { display: flex !important; }
          .nav-burger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .nav-right { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>

      <Nav />
      <Hero />
      <Pillars />

      <div id="modulos" style={{ paddingTop: "clamp(16px, 3vw, 32px)" }}>
        <Carousel title="O que a Nexo entrega" cards={modulesCards} />
      </div>

      <section id="chat-demo" style={{
        padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 80px)",
        background: "linear-gradient(180deg, transparent 0%, rgba(161,66,30,0.04) 50%, transparent 100%)",
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
      }}>
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.terra, marginBottom: 10 }}>
              Atendimento automático
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: T.cream, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 560 }}>
              Seu atendimento inteligente,<br />mesmo quando você está offline
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 6vw, 72px)", alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, width: "min(340px, 100%)" }}>
            <ChatDemo />
          </div>
          <div style={{ flex: 1, minWidth: "min(260px, 100%)" }}>
            <Reveal>
              <p style={{ color: T.creamDim, fontSize: "clamp(0.925rem, 1.2vw, 1rem)", lineHeight: 1.8, marginBottom: 28, maxWidth: 460 }}>
                Seu cliente manda mensagem de madrugada, no domingo, durante o almoço. A Nexo responde na hora — com informações do seu negócio, na sua linguagem.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Responde perguntas sobre preços e serviços",
                  "Confirma e agenda horários automaticamente",
                  "Envia lembretes para reduzir faltas",
                  "Funciona 24h por dia, 7 dias por semana",
                ].map(f => (
                  <div key={f} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "14px 16px",
                    background: "rgba(238,231,224,0.03)",
                    border: `1px solid ${T.line}`,
                    borderRadius: 10,
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: T.terra, color: T.cream,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, flexShrink: 0,
                    }}>✓</span>
                    <span style={{ fontFamily: sans, fontSize: "0.9rem", color: T.creamDim, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28,
                background: T.terra, color: T.cream,
                fontFamily: sans, fontWeight: 700, fontSize: "0.95rem",
                padding: "13px 24px", borderRadius: 8, textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#8a3618"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.terra; e.currentTarget.style.transform = "none"; }}
              >
                Quero esse atendimento →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <div id="como-funciona" style={{ paddingTop: "clamp(16px, 3vw, 32px)" }}>
        <Carousel title="Como funciona — 4 passos" cards={stepsCards} wide />
      </div>

      <Testimonials />
      <Planos />
      <FAQ />

      <section style={{
        margin: "0 clamp(16px, 4vw, 60px) clamp(40px, 6vw, 60px)",
        borderRadius: 16, overflow: "hidden", position: "relative",
        background: `linear-gradient(135deg, ${T.bgCard} 0%, ${T.bg} 60%)`,
        border: `1px solid ${T.lineTerra}`,
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: T.terra }} />
        <div style={{ padding: "clamp(40px, 8vw, 80px) clamp(24px, 6vw, 80px)", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.terra, marginBottom: 16 }}>
              Pronto para começar?
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: T.cream, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18 }}>
              WhatsApp automático, gestão simples<br />e conteúdo no ar — em 7 dias.
            </h2>
            <p style={{ fontFamily: sans, fontSize: "clamp(0.9rem, 1.2vw, 1rem)", color: T.creamDim, maxWidth: 420, margin: "0 auto 36px" }}>
              Nossa equipe configura tudo. Você só aprova e começa a usar.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WA_URL} target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: T.terra, color: T.cream,
                fontFamily: sans, fontWeight: 700, fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                padding: "15px 32px", borderRadius: 8, textDecoration: "none",
                boxShadow: `0 8px 24px ${T.terraGlow}`,
                transition: "background 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#8a3618"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.terra; e.currentTarget.style.transform = "none"; }}
              >
                <MessageCircle size={18} /> Falar com a Nexo
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: T.cream, fontFamily: sans, fontWeight: 500, fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                padding: "15px 26px", borderRadius: 8, textDecoration: "none",
                border: `1px solid ${T.line}`,
                transition: "border-color 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(238,231,224,0.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.transform = "none"; }}
              >
                <InstagramIcon size={16} /> Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />

      {showDashboard && <DashboardModal onClose={() => setShowDashboard(false)} />}
    </div>
  );
}
