import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp, Package, ShoppingBag, Wallet,
  AlertTriangle, Activity, CheckCircle2, ArrowUpRight,
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
