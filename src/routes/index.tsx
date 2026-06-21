import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, Boxes, Check, ChevronRight, Crown, Cpu,
  Database, FlaskConical, Gauge, Ghost, LineChart, Lock, MessageSquare,
  Package, Radar, Radio, Rocket, Scan, Search, Send, ShieldCheck,
  Sparkles, Target, Terminal, Timer, Trophy, TrendingUp, Truck, Users,
  Zap,
} from "lucide-react";

import { AlphaLogo, LogoLink } from "@/components/alpha-logo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Alpha Engine · Sistema operativo para resellers de Vinted" },
      {
        name: "description",
        content:
          "Detecta, predice y domina Vinted. Ghost Monitor, Market Radar, Oracle de precios, Stealth Lab y leaderboard en vivo. La ventaja invisible del reseller profesional.",
      },
      { property: "og:title", content: "Alpha Engine · Vinted reseller OS" },
      { property: "og:description", content: "Detecta, predice y domina Vinted." },
    ],
  }),
});

/* ============================================================
   Static data
   ============================================================ */

const TICKER = [
  { market: "VINTED_ES", latency: "94ms",  match: "Nike Air Max 90 · 42",        profit: "+28.50€" },
  { market: "VINTED_FR", latency: "142ms", match: "Ralph Lauren Polo · M",       profit: "+22.50€" },
  { market: "VINTED_IT", latency: "117ms", match: "Tommy Hilfiger Shirt · L",    profit: "+16.00€" },
  { market: "VINTED_DE", latency: "108ms", match: "Carhartt WIP Jacket · M",     profit: "+41.20€" },
  { market: "VINTED_ES", latency: "88ms",  match: "Onitsuka Tiger Mexico 66",    profit: "+19.80€" },
  { market: "VINTED_UK", latency: "163ms", match: "Lacoste Live Hoodie · L",     profit: "+24.10€" },
  { market: "VINTED_PL", latency: "201ms", match: "Stone Island Beanie",         profit: "+33.00€" },
  { market: "VINTED_NL", latency: "121ms", match: "Arc'teryx Beta AR · M",       profit: "+72.40€" },
];

const MODULES = [
  { icon: Gauge,         tag: "01", name: "Dashboard",          desc: "Capital, revenue, ROI, stock y unidades vendidas en una sola vista.", color: "signal" },
  { icon: Package,       tag: "02", name: "Registro Oracle",    desc: "Alta de producto con sugerencia de precio asistida por IA.",          color: "signal" },
  { icon: Send,          tag: "03", name: "Registro de venta",  desc: "Precio, fees, coste, profit, ROI y time-to-sell antes de guardar.",   color: "signal" },
  { icon: Boxes,         tag: "04", name: "Inventario",         desc: "En stock vs Vendidos con datos densos. Filtros por edad y margen.",   color: "signal" },
  { icon: LineChart,     tag: "05", name: "Analítica",          desc: "Qué marca, talla y categoría te genera más profit por hora.",         color: "signal" },
  { icon: Radar,         tag: "06", name: "Market Radar",       desc: "Oportunidades de sourcing en tiempo real con confianza y velocidad.", color: "signal", premium: true },
  { icon: Trophy,        tag: "07", name: "Winners",            desc: "Ganadores internos, externos e híbridos rankeados por margen.",        color: "signal", premium: true },
  { icon: Crown,         tag: "08", name: "Leaderboard",        desc: "Ranking global y ligas privadas por ROI, velocidad y profit.",         color: "signal" },
  { icon: MessageSquare, tag: "09", name: "Alpha Oracle",       desc: "Preguntas y respuestas con contexto real de tu inventario.",          color: "signal", premium: true },
  { icon: FlaskConical,  tag: "10", name: "Stealth Lab",        desc: "A/B de copies, fotos y precios sin exponer el armario.",              color: "signal", premium: true },
  { icon: Ghost,         tag: "11", name: "Ghost Monitor",      desc: "Monitor invisible 24/7 de competidores. Detección de ventas en vivo.", color: "signal", premium: true },
  { icon: Terminal,      tag: "12", name: "API & Admin",        desc: "Documentación de API y centro admin (según permisos de rol).",         color: "signal" },
];

const FEED = [
  { brand: "Nike",       item: "Air Max 90 OG",       buy: "12€", sell: "62€", roi: "+416%", ttsHrs: 3,  hot: true },
  { brand: "Carhartt",   item: "Chase Sweatshirt M",  buy: "8€",  sell: "44€", roi: "+450%", ttsHrs: 7,  hot: true },
  { brand: "Ralph Lauren", item: "Polo Custom Fit L", buy: "5€",  sell: "26€", roi: "+420%", ttsHrs: 11, hot: false },
  { brand: "Adidas",     item: "Samba OG 41",         buy: "18€", sell: "78€", roi: "+333%", ttsHrs: 5,  hot: true },
  { brand: "Stone Island", item: "Beanie marina",     buy: "20€", sell: "82€", roi: "+310%", ttsHrs: 2,  hot: true },
  { brand: "Lacoste",    item: "Hoodie Live L",       buy: "10€", sell: "39€", roi: "+290%", ttsHrs: 14, hot: false },
];

/* ============================================================
   Page
   ============================================================ */

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
      <AmbientBG />
      <Ticker />
      <Nav />
      <Hero />
      <TrustStrip />
      <ConveyorBelt />
      <Modules />
      <GhostMonitorShowcase />
      <LiveBoard />
      <HowItWorks />
      <Leaderboard />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

/* ============================================================
   Background — ambient layers
   ============================================================ */

function AmbientBG() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-x-0 top-0 h-[80vh]"
        style={{ background: "var(--gradient-fade)" }}
      />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, oklch(0.86 0.22 142 / 0.6), transparent 60%)" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.18 200 / 0.5), transparent 60%)" }} />
    </div>
  );
}

/* ============================================================
   Ticker
   ============================================================ */

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 border-b border-border/60 bg-card/60 backdrop-blur-md overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2 text-[11px] font-mono uppercase tracking-wider">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-6 text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
            <span className="text-foreground/80">{t.market}</span>
            <span className="opacity-50">·</span>
            <span>{t.latency}</span>
            <span className="opacity-50">·</span>
            <span className="text-foreground">{t.match}</span>
            <span className="text-signal">{t.profit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Nav
   ============================================================ */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <LogoLink />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#modules"   className="hover:text-foreground transition-colors">Módulos</a>
          <a href="#ghost"     className="hover:text-foreground transition-colors">Ghost Monitor</a>
          <a href="#flow"      className="hover:text-foreground transition-colors">Cómo opera</a>
          <a href="#league"    className="hover:text-foreground transition-colors">Leaderboard</a>
          <a href="#pricing"   className="hover:text-foreground transition-colors">Planes</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Iniciar sesión
          </button>
          <button className="group inline-flex items-center gap-1.5 rounded-md bg-signal px-4 py-2 text-sm font-medium text-signal-foreground signal-glow hover:brightness-110 transition">
            Acceder
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Hero — animated logo + live mock dashboard
   ============================================================ */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Left */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground animate-float-up">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
              SYSTEM ONLINE · v4.2.1
            </div>

            <h1 className="mt-6 font-mono text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[0.95] tracking-tight text-balance animate-float-up">
              <span className="block">DETECTA.</span>
              <span className="block text-signal-gradient animate-led-pulse">PREDICE.</span>
              <span className="block">DOMINA.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg text-muted-foreground text-balance animate-float-up" style={{ animationDelay: "0.15s" }}>
              El sistema operativo invisible para resellers de Vinted.
              <span className="text-foreground"> Ghost Monitor, Oracle de precios, Market Radar y Stealth Lab</span>{" "}
              trabajando 24/7 mientras tú decides qué comprar.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 animate-float-up" style={{ animationDelay: "0.3s" }}>
              <button className="group inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-medium text-signal-foreground signal-glow hover:brightness-110 transition">
                <Zap className="h-4 w-4" />
                Activar Alpha Engine
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm text-foreground hover:bg-card transition">
                <Radio className="h-4 w-4 text-signal" />
                Ver demo en vivo
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md font-mono animate-float-up" style={{ animationDelay: "0.45s" }}>
              <KpiMini value="14.7M" label="Listings escaneados" />
              <KpiMini value="312%"   label="ROI medio top 10" />
              <KpiMini value="<150ms" label="Latencia detección" />
            </div>
          </div>

          {/* Right — animated logo orbit + mock card */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function KpiMini({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-foreground tabular-nums">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      {/* Orbit rings */}
      <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="oklch(0.86 0.22 142 / 0)" />
            <stop offset="100%" stopColor="oklch(0.86 0.22 142 / 0.25)" />
          </radialGradient>
        </defs>
        {[170, 140, 105].map((r, i) => (
          <circle
            key={r}
            cx="200" cy="200" r={r}
            fill="none"
            stroke="oklch(0.86 0.22 142 / 0.25)"
            strokeWidth="1"
            strokeDasharray="3 6"
            style={{
              transformOrigin: "200px 200px",
              animation: `radar-sweep ${18 + i * 6}s linear ${i % 2 ? "reverse" : "normal"} infinite`,
            }}
          />
        ))}
        <circle cx="200" cy="200" r="180" fill="url(#ringFade)" />
        {/* Diagonal data line */}
        <path
          d="M30 380 C 120 250, 200 220, 380 40"
          fill="none"
          stroke="oklch(0.86 0.22 142 / 0.55)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          style={{ animation: "data-flow 1.6s linear infinite" }}
        />
      </svg>

      {/* Orbiting chips */}
      <OrbitChip icon={Package} label="Inbound" radius={170} duration={22} delay={0} />
      <OrbitChip icon={Truck}   label="Shipped" radius={140} duration={18} delay={3} reverse />
      <OrbitChip icon={Ghost}   label="Ghost"   radius={205} duration={28} delay={6} />
      <OrbitChip icon={Radar}   label="Radar"   radius={115} duration={14} delay={1} reverse />

      {/* Centerpiece — Alpha logo, big & glowing */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <div className="absolute inset-0 -m-20 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.86 0.22 142 / 0.45), transparent 70%)" }} />
          <AlphaLogo size={210} mode="flicker" />
        </div>
      </div>

      {/* Floating mock card top-right */}
      <FloatingMockCard />
    </div>
  );
}

function OrbitChip({
  icon: Icon, label, radius, duration, delay = 0, reverse = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  radius: number;
  duration: number;
  delay?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        // outer container orbits via rotation; inner counter-rotates so chip stays upright
        animation: `radar-sweep ${duration}s linear ${reverse ? "reverse" : "normal"} infinite`,
        animationDelay: `-${delay}s`,
        transformOrigin: "0 0",
      }}
    >
      <div
        className="relative"
        style={{ transform: `translate(-50%, -50%) translateX(${radius}px)` }}
      >
        <div
          className="flex items-center gap-1.5 rounded-full border border-signal/40 bg-background/80 px-2.5 py-1 backdrop-blur"
          style={{
            animation: `radar-sweep ${duration}s linear ${reverse ? "normal" : "reverse"} infinite`,
            animationDelay: `-${delay}s`,
          }}
        >
          <Icon className="h-3 w-3 text-signal" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/90">{label}</span>
        </div>
      </div>
    </div>
  );
}

function FloatingMockCard() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 2200);
    return () => clearInterval(id);
  }, []);
  const sample = FEED[n % FEED.length];
  return (
    <div
      className="absolute -right-2 sm:right-4 bottom-2 w-[260px] rounded-lg border border-border/70 bg-card/90 p-3 backdrop-blur-xl shadow-2xl"
      style={{ animation: "pkg-float 6s ease-in-out infinite" }}
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
        <span className="inline-flex items-center gap-1.5 text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
          MATCH DETECTED
        </span>
        <span className="text-muted-foreground">+0.4s</span>
      </div>
      <div className="mt-2 text-sm font-semibold text-foreground" key={sample.item}>
        <span style={{ animation: "count-tick 0.4s ease-out both" }} className="inline-block">
          {sample.brand} · {sample.item}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
        <Tiny label="BUY" value={sample.buy} />
        <Tiny label="SELL" value={sample.sell} />
        <Tiny label="ROI" value={sample.roi} highlight />
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded bg-muted">
        <div className="h-full w-2/3 rounded bg-signal"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.86 0.22 142), transparent)", backgroundSize: "200% 100%", animation: "shimmer 1.8s linear infinite" }}
        />
      </div>
    </div>
  );
}

function Tiny({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/60 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 ${highlight ? "text-signal" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

/* ============================================================
   Trust strip
   ============================================================ */

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: "Cifrado E2E" },
    { icon: Lock,        label: "Sin exposición de armario" },
    { icon: Cpu,         label: "Workers distribuidos" },
    { icon: Database,    label: "Realtime · Redis + Celery" },
    { icon: Activity,    label: "99.95% uptime" },
    { icon: Users,       label: "+8.400 resellers activos" },
  ];
  return (
    <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="inline-flex items-center gap-2">
            <Icon className="h-3.5 w-3.5 text-signal/80" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Conveyor belt — packages crossing the screen
   ============================================================ */

function ConveyorBelt() {
  const lanes = [
    { items: [Package, Package, Truck, Package], dur: 22, top: "30%" },
    { items: [Truck,   Package, Package, Truck], dur: 28, top: "60%" },
  ];
  return (
    <section aria-hidden className="relative h-40 overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Dashed lane lines */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
      <div className="absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent" />

      {lanes.map((lane, li) =>
        lane.items.map((Icon, i) => {
          const delay = (lane.dur / lane.items.length) * i;
          return (
            <div
              key={`${li}-${i}`}
              className="absolute"
              style={{
                top: lane.top,
                left: 0,
                animation: `conveyor ${lane.dur}s linear infinite`,
                animationDelay: `-${delay}s`,
              }}
            >
              <div className="flex items-center gap-2 rounded-md border border-signal/40 bg-card/80 px-2.5 py-1.5 shadow-[0_0_24px_-6px_oklch(0.86_0.22_142/0.55)] backdrop-blur">
                <Icon className="h-4 w-4 text-signal" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/90">
                  PKG · {String((i + 1) * 47).padStart(4, "0")}
                </span>
              </div>
            </div>
          );
        }),
      )}

      <div className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, var(--color-background) 0%, transparent 12%, transparent 88%, var(--color-background) 100%)" }}
      />
    </section>
  );
}

/* ============================================================
   Modules grid — all 12 modules
   ============================================================ */

function Modules() {
  return (
    <section id="modules" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          tag="MODULES · 12"
          title={<>Una pieza para cada decisión.</>}
          subtitle="Todo el ciclo del reseller cubierto. Desde el primer escaneo hasta el envío del paquete."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <ModuleCard key={m.name} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({
  m, index,
}: {
  m: (typeof MODULES)[number];
  index: number;
}) {
  const Icon = m.icon;
  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-border/70 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-signal/50 hover:-translate-y-0.5"
      style={{ animation: `ascend 0.7s ${index * 0.04}s ease-out both` }}
    >
      {/* Scan sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-signal/10 to-transparent transition-transform duration-1000 group-hover:translate-y-full" />

      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-md border border-signal/30 bg-signal/10 text-signal transition-all group-hover:shadow-[0_0_20px_-2px_oklch(0.86_0.22_142/0.7)]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          {m.premium && (
            <span className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-signal">
              <Sparkles className="h-2.5 w-2.5" /> Alpha
            </span>
          )}
          <span className="font-mono text-[10px] text-muted-foreground">{m.tag}</span>
        </div>
      </div>

      <h3 className="mt-5 text-base font-semibold text-foreground">{m.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>

      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-wider text-muted-foreground">→ Abrir módulo</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-signal" />
      </div>
    </div>
  );
}

/* ============================================================
   Ghost Monitor — live scan showcase
   ============================================================ */

function GhostMonitorShowcase() {
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(0);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1.7));
      setFound((f) => (Math.random() > 0.7 ? f + 1 : f));
      setSales((s) => (Math.random() > 0.92 ? s + 1 : s));
    }, 220);
    return () => clearInterval(id);
  }, []);

  const states = useMemo(
    () => [
      { from: 0,  to: 5,  label: "Escaneo en cola" },
      { from: 5,  to: 12, label: "Conectando con worker" },
      { from: 12, to: 95, label: "Analizando armario" },
      { from: 95, to: 100, label: "Escaneo completado" },
    ],
    [],
  );
  const current = states.find((s) => progress >= s.from && progress < s.to) ?? states[states.length - 1];

  return (
    <section id="ghost" className="relative py-24 border-y border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHead
            align="left"
            tag="PREMIUM · GHOST MONITOR"
            title={<>Tu bot invisible, <span className="text-signal-gradient">siempre despierto.</span></>}
            subtitle="Detecta nuevas publicaciones y ventas de cualquier armario en tiempo real. Sin recargas, sin reenviar el perfil."
          />
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Worker distribuido por mercado · 24/7",
              "Detección de venta con confianza > 96%",
              "KPIs e inventario se refrescan solos",
              "Reintentos con backoff exponencial",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 text-signal" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Live scan panel */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-background/80 p-5 backdrop-blur-xl shadow-2xl animate-glow-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ghost className="h-4 w-4 text-signal" />
              <span className="font-mono text-xs uppercase tracking-wider text-foreground">ghost_monitor.live</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">node-eu-04</span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs font-mono">
            <span className="inline-flex items-center gap-2 text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
              {current.label}
              <span className="animate-blink">_</span>
            </span>
            <span className="text-muted-foreground">{Math.floor(progress)}%</span>
          </div>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-signal transition-[width] duration-200" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 font-mono text-xs">
            <StatBox label="Revisados" value={Math.floor(140 + progress * 12)} />
            <StatBox label="Nuevos" value={found} highlight />
            <StatBox label="Ventas detectadas" value={sales} highlight />
          </div>

          {/* Console */}
          <div className="mt-5 rounded-md border border-border/70 bg-card/60 p-3 font-mono text-[11px] leading-relaxed">
            <ConsoleStream />
          </div>

          {/* Scan sweep overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-12 opacity-50"
            style={{
              background: "linear-gradient(180deg, oklch(0.86 0.22 142 / 0.18), transparent)",
              animation: "scan-line 5s linear infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="rounded-md border border-border/70 bg-card/60 p-3">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-xl tabular-nums ${highlight ? "text-signal" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

function ConsoleStream() {
  const LINES = [
    "› auth.session OK · token rotated",
    "› GET /closet/8421 · 24 items",
    "› diff[+3] · Nike Air Max 90 42, Carhartt Chase M, Lacoste Live L",
    "› price.oracle suggest · 62.00€ (conf 0.91)",
    "› ghost.heartbeat 142ms · queue 0",
    "› SOLD detected · Stone Island Beanie · +33.00€",
    "› inventory.sync OK · kpis.refresh queued",
  ];
  const [n, setN] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(LINES.length, v + 1)), 900);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (n >= LINES.length) {
      const t = setTimeout(() => setN(2), 1500);
      return () => clearTimeout(t);
    }
  }, [n]);
  return (
    <div className="space-y-1">
      {LINES.slice(0, n).map((l, i) => (
        <div
          key={`${l}-${i}`}
          className={i === n - 1 ? "text-signal" : "text-muted-foreground"}
          style={{ animation: "count-tick 0.35s ease-out both" }}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Live board — feed of detected opportunities
   ============================================================ */

function LiveBoard() {
  const repeated = [...FEED, ...FEED];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          tag="MARKET RADAR · LIVE"
          title={<>Oportunidades en vivo, <span className="text-signal-gradient">no editoriales bonitas.</span></>}
          subtitle="Filas densas con precio, margen esperado, velocidad de venta y confianza. Decide rápido."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border/60 px-4 py-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <span>Producto</span>
              <span className="text-right">Buy</span>
              <span className="text-right">Sell</span>
              <span className="text-right">ROI</span>
              <span className="text-right">TTS</span>
            </div>
            <div className="relative h-[320px] overflow-hidden">
              <div className="absolute inset-x-0 animate-marquee-up">
                {repeated.map((f, i) => (
                  <div
                    key={`${f.item}-${i}`}
                    className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border/40 px-4 py-3 text-sm hover:bg-signal/5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-foreground">{f.brand} · {f.item}</span>
                        {f.hot && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-warn/40 bg-warn/10 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-warn">
                            <Target className="h-2.5 w-2.5" /> hot
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">conf 0.{80 + (i % 18)} · vel {((i % 5) + 1) * 0.4}/d</div>
                    </div>
                    <div className="text-right font-mono text-muted-foreground">{f.buy}</div>
                    <div className="text-right font-mono text-foreground">{f.sell}</div>
                    <div className="text-right font-mono text-signal">{f.roi}</div>
                    <div className="text-right font-mono text-muted-foreground">{f.ttsHrs}h</div>
                  </div>
                ))}
              </div>
              {/* Top/bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-card/80 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card/80 to-transparent" />
            </div>
          </div>

          {/* Side stats */}
          <div className="space-y-4">
            <BigKpi icon={TrendingUp} label="Profit últimas 24h" value="+1.842,30€" delta="+12.4%" />
            <BigKpi icon={Timer}      label="Velocidad media" value="6.2h"        delta="-1.1h" good />
            <BigKpi icon={Scan}       label="Listings escaneados/min" value="1.420" delta="+3.8%" />
            <BigKpi icon={Bell}       label="Alertas activas" value="48"          delta="+9" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BigKpi({
  icon: Icon, label, value, delta, good = true,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; delta: string; good?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur transition hover:border-signal/40">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-signal" />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="font-mono text-3xl font-semibold text-foreground tabular-nums">{value}</span>
        <span className={`font-mono text-xs ${good ? "text-signal" : "text-destructive"}`}>{delta}</span>
      </div>
    </div>
  );
}

/* ============================================================
   How it works — pipeline
   ============================================================ */

function HowItWorks() {
  const steps = [
    { icon: Search,  title: "1 · Conecta tu perfil",  desc: "ID numérico de Vinted o URL. El sistema valida el armario en segundos." },
    { icon: Radar,   title: "2 · Calibra Market Radar", desc: "Categorías, tallas y marcas que quieres monitorizar de cerca." },
    { icon: Ghost,   title: "3 · Despliega Ghost Monitor", desc: "Workers escanean en background y refrescan KPIs solos." },
    { icon: Rocket,  title: "4 · Decide y vende",     desc: "Stealth Lab itera precios y copies sin exponer tu armario." },
  ];
  return (
    <section id="flow" className="relative py-24 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          tag="PIPELINE"
          title={<>Cuatro pasos. <span className="text-signal-gradient">Cero recargas.</span></>}
          subtitle="Una vez configurado, Alpha Engine opera solo. Tú solo decides qué comprar y a qué precio."
        />
        <div className="relative mt-14">
          {/* Connecting line */}
          <div aria-hidden className="absolute left-0 right-0 top-9 hidden lg:block">
            <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="h-5 w-full">
              <path d="M0 10 H1000" stroke="oklch(0.86 0.22 142 / 0.4)" strokeWidth="1.5" strokeDasharray="6 8"
                style={{ animation: "data-flow 1.6s linear infinite" }} />
            </svg>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative" style={{ animation: `ascend 0.7s ${i * 0.1}s ease-out both` }}>
                <div className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-full border border-signal/40 bg-background shadow-[0_0_30px_-6px_oklch(0.86_0.22_142/0.6)]">
                  <s.icon className="h-7 w-7 text-signal" />
                </div>
                <h4 className="mt-5 text-center text-sm font-semibold text-foreground">{s.title}</h4>
                <p className="mt-2 text-center text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Leaderboard preview
   ============================================================ */

function Leaderboard() {
  const rows = [
    { rank: 1, name: "ghost_iberia",   roi: "412%", vel: "4.1h", profit: "+8.420€", trophy: true },
    { rank: 2, name: "alpha.lyon",     roi: "388%", vel: "5.0h", profit: "+7.812€" },
    { rank: 3, name: "carmen_ks",      roi: "356%", vel: "6.4h", profit: "+6.940€" },
    { rank: 4, name: "0xreseller",     roi: "311%", vel: "7.1h", profit: "+5.230€" },
    { rank: 5, name: "milan_drops",    roi: "298%", vel: "8.0h", profit: "+4.110€" },
  ];
  return (
    <section id="league" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHead
            align="left"
            tag="LEADERBOARD · MENSUAL"
            title={<>Compite contra <span className="text-signal-gradient">los mejores resellers de Europa.</span></>}
            subtitle="Ranking global por ROI, velocidad y profit. Crea ligas privadas con tu equipo y comparte un link de invitación."
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur shadow-2xl">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 border-b border-border/60 px-5 py-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            <span>#</span><span>Reseller</span><span className="text-right">ROI</span><span className="text-right">Vel</span><span className="text-right">Profit</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.name}
              className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-3 text-sm ${i % 2 ? "bg-background/40" : ""}`}
              style={{ animation: `ascend 0.6s ${i * 0.08}s ease-out both` }}>
              <span className={`font-mono ${r.trophy ? "text-signal" : "text-muted-foreground"}`}>
                {r.trophy ? <Crown className="inline h-4 w-4 -mt-0.5" /> : `0${r.rank}`}
              </span>
              <span className="text-foreground truncate">{r.name}</span>
              <span className="text-right font-mono text-signal">{r.roi}</span>
              <span className="text-right font-mono text-muted-foreground">{r.vel}</span>
              <span className="text-right font-mono text-foreground">{r.profit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pricing
   ============================================================ */

function Pricing() {
  return (
    <section id="pricing" className="relative py-24 border-y border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          tag="PRICING"
          title={<>Dos formas de operar. <span className="text-signal-gradient">Una ventaja.</span></>}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <PriceCard
            name="Cadete"
            price="0€"
            tagline="Empieza a operar y entiende tu inventario."
            features={[
              "Dashboard + Inventario",
              "Registro de producto y venta",
              "Analítica básica",
              "Leaderboard global",
            ]}
          />
          <PriceCard
            featured
            name="Alpha"
            price="20€"
            sub="/mes"
            tagline="Ghost Monitor, Oracle, Stealth Lab y Market Radar."
            features={[
              "Todo lo de Cadete",
              "Ghost Monitor 24/7",
              "Market Radar con confianza > 90%",
              "Stealth Lab · A/B precios y copies",
              "Alpha Oracle · IA contextual",
              "Ligas privadas ilimitadas",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  name, price, sub, tagline, features, featured = false,
}: {
  name: string; price: string; sub?: string; tagline: string; features: string[]; featured?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-7 backdrop-blur transition ${
      featured ? "border-signal/50 bg-card animate-glow-pulse" : "border-border bg-card/60 hover:border-signal/30"
    }`}>
      {featured && (
        <div className="absolute -top-px right-7 inline-flex items-center gap-1 rounded-b-md bg-signal px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-signal-foreground">
          <Sparkles className="h-3 w-3" /> Recomendado
        </div>
      )}
      <h3 className="font-mono text-sm uppercase tracking-[0.22em] text-muted-foreground">{name}</h3>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-5xl font-bold text-foreground tabular-nums">{price}</span>
        {sub && <span className="mb-1.5 text-sm text-muted-foreground">{sub}</span>}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
      <ul className="mt-6 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-signal shrink-0" />
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>
      <button className={`mt-7 w-full rounded-md py-2.5 text-sm font-medium transition ${
        featured
          ? "bg-signal text-signal-foreground signal-glow hover:brightness-110"
          : "border border-border bg-background hover:bg-card"
      }`}>
        {featured ? "Activar Alpha" : "Empezar gratis"}
      </button>
    </div>
  );
}

/* ============================================================
   CTA
   ============================================================ */

function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <AlphaLogo size={88} className="mx-auto" mode="flicker" />
        <h2 className="mt-8 font-mono text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          La ventaja invisible <br />
          de los <span className="text-signal-gradient animate-led-pulse">resellers profesionales.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground text-balance">
          Activa Alpha Engine en menos de 90 segundos. Ghost Monitor empieza a escanear tu primer armario al instante.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md bg-signal px-6 py-3 text-sm font-medium text-signal-foreground signal-glow hover:brightness-110 transition">
            <Zap className="h-4 w-4" /> Activar Alpha Engine
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-6 py-3 text-sm">
            Hablar con el equipo
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <LogoLink />
        <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <a href="#" className="hover:text-foreground">Estado del sistema</a>
          <a href="#" className="hover:text-foreground">Docs · API</a>
          <a href="#" className="hover:text-foreground">Términos</a>
          <a href="#" className="hover:text-foreground">Privacidad</a>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          © 2026 Alpha Engine · Built for resellers
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Shared
   ============================================================ */

function SectionHead({
  tag, title, subtitle, align = "center",
}: {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground ${align === "center" ? "" : ""}`}>
        <span className="h-1 w-1 rounded-full bg-signal animate-pulse-dot" /> {tag}
      </div>
      <h2 className="mt-5 font-mono text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-muted-foreground text-balance">{subtitle}</p>}
    </div>
  );
}
