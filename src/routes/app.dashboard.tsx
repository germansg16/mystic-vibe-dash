import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp, Package, ShoppingBag, Wallet,
  AlertTriangle, Activity, CheckCircle2, ArrowUpRight,
  Tag, Truck, Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Alpha Engine" }] }),
  component: Dashboard,
});

const PRIMARY = [
  { icon: Wallet,      label: "Capital",     value: "€2.840", delta: "+12,4%", up: true },
  { icon: TrendingUp,  label: "Beneficio",   value: "€1.094", delta: "+22,1%", up: true },
  { icon: ShoppingBag, label: "Ventas mes",  value: "42",     delta: "+9",     up: true },
  { icon: Package,     label: "Stock",       value: "75",     delta: "items",  up: true },
];

const ACTIVITY = [
  { type: "sale",  text: "Sudadera Nike Vintage", meta: "€42 · ROI +120%", time: "4 min",  tone: "signal" as const },
  { type: "new",   text: "Adidas Samba añadidas al monitor", meta: "#76", time: "12 min", tone: "muted" as const },
  { type: "warn",  text: "Coste no registrado", meta: "Vaquero Bershka", time: "38 min", tone: "warn" as const },
  { type: "sale",  text: "Camiseta Stüssy",  meta: "€28 · ROI +180%", time: "1 h", tone: "signal" as const },
  { type: "scan",  text: "Escaneo completado", meta: "76/76", time: "2 h", tone: "muted" as const },
];

function Dashboard() {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Operación · tiempo real"
        title="Dashboard"
        subtitle="Lo esencial de tu negocio en Vinted, sin ruido."
      />

      {/* Creative hero — reselling pipeline */}
      <ResellingHero />



      {/* KPIs */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PRIMARY.map((k, i) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 p-5 transition-all duration-500 hover:border-signal/30 hover:bg-card/60"
              style={{ animationDelay: `${i * 60}ms`, animation: "page-enter 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <Icon className="h-4 w-4 text-muted-foreground/70" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {k.label}
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-foreground">{k.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{k.delta}</p>
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Activity */}
        <div className="lg:col-span-2">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Actividad
            </h2>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
              LIVE
            </span>
          </header>
          <ul className="divide-y divide-border/40 rounded-xl border border-border/40 bg-card/20">
            {ACTIVITY.map((a, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-background/40"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-full ${
                  a.tone === "signal" ? "bg-signal/10 text-signal" :
                  a.tone === "warn"   ? "bg-warn/10 text-warn"     : "bg-muted/30 text-muted-foreground"
                }`}>
                  {a.type === "sale" ? <CheckCircle2 className="h-3.5 w-3.5" /> :
                   a.type === "warn" ? <AlertTriangle className="h-3.5 w-3.5" /> :
                   a.type === "new"  ? <Package className="h-3.5 w-3.5" /> :
                                       <Activity className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">{a.text}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{a.meta}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  {a.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Side */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-signal/25 bg-signal/[0.04] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">Ghost Monitor</p>
            <p className="mt-3 font-mono text-2xl font-semibold tabular-nums text-foreground">76 / 76</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Productos verificados
            </p>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-card">
              <div className="h-full w-full bg-gradient-to-r from-signal to-signal/40 animate-pulse" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Próximo escaneo · 14 min
            </p>
          </div>

          <Link
            to="/app/inventario"
            className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/30 p-5 transition-all hover:border-signal/30 hover:bg-card/60"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Datos pendientes
              </p>
              <p className="mt-2 font-mono text-lg font-semibold text-warn">1 producto</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Coste sin registrar
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
          </Link>
        </aside>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Reselling Hero — animated visual showing the resell pipeline:
   sourcing → listing → shipping → profit. Pure SVG/CSS, no deps.
--------------------------------------------------------------------------- */
function ResellingHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 via-card/30 to-background p-6 sm:p-8">
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* signal glow */}
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
      <div aria-hidden className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-signal/[0.06] blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* Left — message */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
            <Sparkles className="h-3 w-3" /> Pipeline activo
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            De armario a venta,
            <span className="block bg-gradient-to-r from-signal to-foreground bg-clip-text text-transparent">
              en segundos.
            </span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Monitorizamos tu Vinted, detectamos oportunidades y calculamos cada ROI
            en tiempo real. Tú solo decides qué publicar.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/app/oracle"
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-signal-foreground transition-all hover:shadow-[0_0_24px_-4px_var(--signal)]"
            >
              Registrar producto
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/app/ghost"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-signal/40 hover:text-foreground"
            >
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute inset-0 rounded-full bg-signal animate-pulse-dot" />
                <span className="h-2 w-2 rounded-full bg-signal" />
              </span>
              Ghost Monitor
            </Link>
          </div>
        </div>

        {/* Right — pipeline animation */}
        <div className="relative h-[200px] sm:h-[220px]">
          {/* orbital ring */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-[180px] w-[180px]">
              <div className="absolute inset-0 rounded-full border border-signal/20" />
              <div className="absolute inset-4 rounded-full border border-signal/10" />
              <div className="absolute inset-0 rounded-full border-t-2 border-signal/60 animate-radar-sweep" />
              {/* center */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-signal/40 bg-card/80 backdrop-blur shadow-[0_0_30px_-4px_var(--signal)]">
                  <span className="font-mono text-sm font-bold text-signal">α</span>
                </div>
              </div>
              {/* orbiting chips */}
              {[
                { icon: Tag,     deg: 0,   tone: "signal" as const, label: "€42" },
                { icon: Package, deg: 120, tone: "muted"  as const, label: "Nike" },
                { icon: Truck,   deg: 240, tone: "signal" as const, label: "Ship" },
              ].map((it, i) => {
                const Icon = it.icon;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate(-50%,-50%) rotate(${it.deg}deg) translateX(90px) rotate(-${it.deg}deg)`,
                      animation: `orbit 16s linear infinite`,
                      animationDelay: `${-i * 5.3}s`,
                      // @ts-expect-error css var
                      "--orbit-r": "90px",
                    }}
                  >
                    <div className={`flex items-center gap-1.5 rounded-full border px-2 py-1 backdrop-blur ${
                      it.tone === "signal"
                        ? "border-signal/40 bg-signal/10 text-signal"
                        : "border-border/60 bg-card/70 text-muted-foreground"
                    }`}>
                      <Icon className="h-3 w-3" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{it.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* floating ping rings */}
          <span aria-hidden className="absolute right-6 top-6 h-3 w-3 rounded-full border border-signal/60" style={{ animation: "ping-ring 2.4s ease-out infinite" }} />
          <span aria-hidden className="absolute left-4 bottom-6 h-2 w-2 rounded-full border border-signal/60" style={{ animation: "ping-ring 3.2s ease-out infinite", animationDelay: "0.8s" }} />
        </div>
      </div>
    </section>
  );
}
