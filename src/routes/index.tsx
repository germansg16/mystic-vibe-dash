import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const TICKER = [
  { market: "VINTED_ES", latency: "94ms", match: "Nike Air Max 90 · 42", profit: "+28.50€" },
  { market: "VINTED_FR", latency: "142ms", match: "Ralph Lauren Polo · M", profit: "+22.50€" },
  { market: "VINTED_IT", latency: "117ms", match: "Tommy Hilfiger Shirt · L", profit: "+16.00€" },
  { market: "VINTED_DE", latency: "108ms", match: "Carhartt WIP Jacket · M", profit: "+41.20€" },
  { market: "VINTED_ES", latency: "88ms", match: "Onitsuka Tiger Mexico 66", profit: "+19.80€" },
  { market: "VINTED_UK", latency: "163ms", match: "Lacoste Live Hoodie · L", profit: "+24.10€" },
  { market: "VINTED_PL", latency: "201ms", match: "Stone Island Beanie", profit: "+33.00€" },
  { market: "VINTED_NL", latency: "121ms", match: "Arc'teryx Beta AR · M", profit: "+72.40€" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
      <Ticker />
      <Nav />
      <Hero />
      <Modules />
      <LiveBoard />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="border-b border-border bg-card/40 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2 text-[11px] font-mono uppercase tracking-wider">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-6 text-muted-foreground">
            <span className="text-signal">◆ SCAN</span>
            <span>{t.market}</span>
            <span className="text-muted-foreground/60">{t.latency}</span>
            <span className="text-signal">▸ MATCH</span>
            <span className="text-foreground">{t.match}</span>
            <span className="text-signal font-semibold">PROFIT {t.profit}</span>
            <span className="text-border">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">vinted · v0.9</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal">fantablack</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#modulos" className="hover:text-foreground transition-colors">Módulos</a>
          <a href="#engine" className="hover:text-foreground transition-colors">Engine</a>
          <a href="#flujo" className="hover:text-foreground transition-colors">Flujo</a>
          <a href="#planes" className="hover:text-foreground transition-colors">Planes</a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="relative h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
            engine live · 3 markets
          </span>
          <a href="#planes" className="hidden sm:inline-flex items-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Iniciar sesión
          </a>
          <a
            href="#planes"
            className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-signal-foreground hover:opacity-90 transition signal-glow"
          >
            Ver planes <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative grid h-8 w-8 place-items-center rounded-md border border-signal/40 bg-signal/10">
        <span className="font-mono text-lg font-bold text-signal leading-none">α</span>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
      </div>
      <span className="font-mono text-sm font-semibold tracking-widest uppercase">Alpha Engine</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-signal/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 sm:pt-28 sm:pb-36">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur animate-float-up">
          <span className="relative h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // arbitrage intelligence · vinted network
          </span>
        </div>

        <h1 className="font-mono text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.9] tracking-tight text-balance animate-float-up" style={{ animationDelay: "60ms" }}>
          DETECTA.<br />
          PREDICE.<br />
          <span className="text-signal-gradient">DOMINA.</span>
        </h1>

        <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-float-up" style={{ animationDelay: "180ms" }}>
          Escanea Vinted en <span className="text-foreground font-medium">tiempo real</span>,
          calcula el ROI al instante y ejecuta antes que cualquier otro vendedor del mercado.
          Inventario, ventas y oportunidades en un solo motor.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 animate-float-up" style={{ animationDelay: "300ms" }}>
          <a
            href="#planes"
            className="group inline-flex items-center gap-3 rounded-md bg-signal px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-widest text-signal-foreground signal-glow hover:translate-y-[-1px] transition"
          >
            Comenzar a cazar
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#modulos"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-6 py-3.5 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-card hover:border-signal/40 transition"
          >
            Ver módulos
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // empieza gratis · 18 tokens de IA de regalo
          </span>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4 animate-float-up" style={{ animationDelay: "420ms" }}>
          {[
            { k: "14,209", l: "chollos detectados hoy" },
            { k: "3", l: "markets activos · ES · FR · IT" },
            { k: "<150ms", l: "latencia media de scan" },
            { k: "+38%", l: "ROI medio de la red" },
          ].map((s) => (
            <div key={s.l} className="bg-card p-6">
              <div className="font-mono text-3xl font-bold text-signal">{s.k}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MODULES = [
  { tag: "01", title: "Ghost Monitor", desc: "Agente autónomo que vigila tu armario 24/7. Detecta ventas, escasez y movimientos antes que tú.", premium: true },
  { tag: "02", title: "Market Radar", desc: "Cazador de oportunidades en tiempo real. Filtros por margen, demanda, velocidad y confianza.", premium: true },
  { tag: "03", title: "Winners", desc: "Motor híbrido de productos ganadores. Datos internos + mercado, rotación diaria.", premium: false },
  { tag: "04", title: "Oracle de Precios", desc: "Sugerencia de precio basada en ventas similares recientes. Sin adivinar, sin perder margen.", premium: false },
  { tag: "05", title: "Stealth Lab", desc: "Limpieza de metadatos y hashing para reutilizar fotos sin rastro entre cuentas.", premium: true },
  { tag: "06", title: "Leaderboard Alpha", desc: "Ranking mensual de rendimiento real. Compite globalmente o en tus ligas privadas.", premium: false },
];

function Modules() {
  return (
    <section id="modulos" className="relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-signal mb-4">// 02 · arsenal</div>
            <h2 className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-balance max-w-2xl">
              Un motor. <span className="text-muted-foreground">Doce módulos.</span> Cero ruido.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Cada módulo está diseñado para una decisión específica. Sin dashboards inflados, sin tarjetas decorativas. Solo datos accionables.
          </p>
        </div>

        <div className="grid gap-px bg-border rounded-xl overflow-hidden border border-border sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <div key={m.tag} className="group relative bg-card p-8 hover:bg-accent transition-colors duration-300">
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">/ {m.tag}</span>
                {m.premium && (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-signal border border-signal/40 rounded px-1.5 py-0.5">
                    Alpha
                  </span>
                )}
              </div>
              <h3 className="font-mono text-xl font-semibold mb-3">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-signal opacity-0 group-hover:opacity-100 transition-opacity">
                Explorar módulo →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveBoard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(i);
  }, []);

  const rows = [
    { brand: "Onitsuka Tiger", item: "Mexico 66 · 41", price: "59.88€", roi: "+184%", vel: "14h", state: "hot" },
    { brand: "Carhartt WIP", item: "Active Jacket · M", price: "40.00€", roi: "+122%", vel: "19h", state: "hot" },
    { brand: "Lacoste Live", item: "Hoodie · L", price: "43.00€", roi: "+98%", vel: "19h", state: "warm" },
    { brand: "Ralph Lauren", item: "Polo Shirt · M", price: "17.67€", roi: "+74%", vel: "1d", state: "warm" },
    { brand: "Stone Island", item: "Beanie · OS", price: "55.00€", roi: "+210%", vel: "8h", state: "hot" },
    { brand: "Arc'teryx", item: "Beta AR · M", price: "240.00€", roi: "+88%", vel: "2d", state: "cold" },
  ];

  return (
    <section id="engine" className="relative border-t border-border py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-signal mb-4">// engine · live feed</div>
            <h2 className="font-mono text-5xl font-bold tracking-tight text-balance">
              La señal antes que el ruido.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              El núcleo de Alpha es un motor de scraping distribuido sobre Vinted ES, FR, IT, DE, UK, NL y PL.
              Cada match se enriquece con datos históricos de venta, velocidad de rotación y márgenes reales.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["// scan", "Latencia <150ms en 3 mercados simultáneos"],
                ["// match", "Coincidencia por marca, modelo, talla, estado"],
                ["// score", "ROI predictivo basado en 2.4M ventas históricas"],
                ["// alert", "Push instantáneo cuando aparece un chollo verificado"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-4 border-l border-signal/40 pl-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-signal w-20 shrink-0 pt-1">{k}</span>
                  <span className="text-sm text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl border border-border bg-card/80 backdrop-blur shadow-[var(--shadow-deep)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-background/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  <span className="h-2.5 w-2.5 rounded-full bg-signal/60" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  alpha.engine / live_matches
                </span>
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
                streaming
              </span>
            </div>

            <div className="divide-y divide-border">
              {rows.map((r, i) => (
                <div
                  key={r.brand}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 hover:bg-accent/40 transition"
                  style={{ animation: "float-up 0.6s ease-out both", animationDelay: `${i * 60}ms` }}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          r.state === "hot" ? "bg-signal animate-pulse-dot" : r.state === "warm" ? "bg-warn" : "bg-muted-foreground/40"
                        }`}
                      />
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{r.brand}</span>
                    </div>
                    <div className="mt-1 font-medium truncate">{r.item}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{r.price}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">vel · {r.vel}</div>
                  </div>
                  <div className="font-mono text-sm font-semibold text-signal min-w-[60px] text-right">{r.roi}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-background/50">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                tick #{tick.toString().padStart(4, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                next scan · <span className="text-signal">02s</span>
                <span className="animate-blink ml-0.5 text-signal">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Conecta tu perfil", d: "Pega tu ID de Vinted o URL. Ghost Monitor sincroniza tu armario en segundos." },
    { n: "02", t: "Configura tu radar", d: "Define marcas, márgenes y velocidad mínima. El motor filtra por ti, 24/7." },
    { n: "03", t: "Ejecuta antes que nadie", d: "Recibe alertas, compra al instante y registra la venta con ROI calculado." },
  ];
  return (
    <section id="flujo" className="border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-signal mb-4">// 03 · protocolo</div>
        <h2 className="font-mono text-5xl sm:text-6xl font-bold tracking-tight mb-16 text-balance max-w-3xl">
          Tres pasos. <span className="text-muted-foreground">Cero fricción.</span>
        </h2>

        <div className="relative grid gap-12 md:grid-cols-3">
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent hidden md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="relative z-10 grid h-16 w-16 place-items-center rounded-lg border border-signal/40 bg-card font-mono text-xl font-bold text-signal signal-glow">
                {s.n}
              </div>
              <h3 className="mt-6 font-mono text-2xl font-semibold">{s.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const features = {
    cadete: ["Registro de ventas + Inventario", "Dashboard KPIs", "IA Vision · 10/mes", "Oracle Chat · 10/mes", "Leaderboard (sin links)"],
    alpha: ["Todo lo del Cadete", "Oracle Chat ilimitado", "IA Vision ilimitada", "Winners + links directos", "Market Radar tiempo real", "Ghost Monitor 24/7", "Stealth Lab completo", "DAC7 + Templates legales", "Soporte prioritario"],
  };
  return (
    <section id="planes" className="border-t border-border py-28 relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-[var(--gradient-fade)] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="font-mono text-[10px] uppercase tracking-widest text-signal mb-4">// 04 · planes</div>
          <h2 className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-balance">
            Empieza gratis.<br />
            <span className="text-signal-gradient">Escala con Alpha.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            18 tokens de IA gratis. Cuando veas los resultados, desbloquea todo por 20€/mes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PricingCard
            tag="cadete"
            price="0"
            tagline="Para probar el motor sin compromiso."
            features={features.cadete}
            cta="Crear cuenta gratis"
          />
          <PricingCard
            tag="alpha"
            price="20"
            tagline="Arsenal completo. Chollos con links directos. IA ilimitada."
            features={features.alpha}
            cta="Suscribirse — 20€/mes"
            featured
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tag, price, tagline, features, cta, featured,
}: {
  tag: string; price: string; tagline: string; features: string[]; cta: string; featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border p-8 transition ${
        featured
          ? "border-signal/40 bg-card signal-glow"
          : "border-border bg-card/60 hover:border-border/80"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 right-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-signal-foreground">
          Recomendado
        </span>
      )}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ {tag}</span>
        {featured && <span className="font-mono text-[10px] uppercase tracking-widest text-signal">alpha tier</span>}
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-mono text-6xl font-bold tracking-tight">{price}€</span>
        {tag === "alpha" && <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ mes</span>}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{tagline}</p>

      <ul className="mt-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${featured ? "bg-signal" : "bg-muted-foreground/60"}`} />
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md py-3.5 font-mono text-xs font-semibold uppercase tracking-widest transition ${
          featured
            ? "bg-signal text-signal-foreground hover:opacity-90"
            : "border border-border bg-background/40 text-foreground hover:bg-accent"
        }`}
      >
        {cta} →
      </a>
    </div>
  );
}

function CTA() {
  return (
    <section className="border-t border-border py-28 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-balance">
          El mercado <span className="text-signal-gradient">no espera</span>.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Cada minuto sin Alpha, otro reseller compra el chollo que era tuyo.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#planes"
            className="inline-flex items-center gap-3 rounded-md bg-signal px-7 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-signal-foreground signal-glow hover:translate-y-[-1px] transition"
          >
            Iniciar protocolo
            <span className="animate-blink">_</span>
          </a>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          // conexión cifrada · sistema de autenticación alpha
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 · arbitrage intelligence
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Términos</a>
          <a href="#" className="hover:text-foreground transition">Privacidad</a>
          <a href="#" className="hover:text-foreground transition">DAC7</a>
          <a href="#" className="hover:text-foreground transition">API Docs</a>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
            engine live
          </span>
        </div>
      </div>
    </footer>
  );
}
