import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp, TrendingDown, Package, ShoppingBag, Wallet, Percent,
  AlertTriangle, Activity, CheckCircle2, ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Alpha Engine" }] }),
  component: Dashboard,
});

const KPIS = [
  { icon: Wallet,       label: "Capital deployed", value: "€2,840.00", delta: "+12.4%", up: true,  tone: "signal" as const },
  { icon: TrendingUp,   label: "Total revenue",    value: "€4,932.00", delta: "+38.4%", up: true,  tone: "signal" as const },
  { icon: Percent,      label: "Net profit",       value: "€1,094.20", delta: "+22.1%", up: true,  tone: "signal" as const },
  { icon: TrendingDown, label: "Avg ROI",          value: "+38.4%",    delta: "−1.2%",  up: false, tone: "warn" as const },
  { icon: Package,      label: "Stock",            value: "75",        delta: "items en armario", tone: "muted" as const },
  { icon: ShoppingBag,  label: "Units sold",       value: "42",        delta: "este mes", tone: "muted" as const },
];

const ACTIVITY = [
  { type: "sale",  text: "Venta detectada — Sudadera Nike Vintage", meta: "€42 · ROI +120%", time: "hace 4 min", tone: "signal" },
  { type: "new",   text: "Producto monitorizado — Zapatillas Adidas Samba", meta: "Stock #76", time: "hace 12 min", tone: "muted" },
  { type: "warn",  text: "Coste no registrado en 1 producto", meta: "Vaquero Bershka", time: "hace 38 min", tone: "warn" },
  { type: "sale",  text: "Venta detectada — Camiseta Stüssy", meta: "€28 · ROI +180%", time: "hace 1 h", tone: "signal" },
  { type: "scan",  text: "Ghost Monitor · escaneo completado", meta: "76/76 productos", time: "hace 2 h", tone: "muted" },
  { type: "new",   text: "5 nuevos productos publicados en armario", meta: "Sync OK", time: "hace 3 h", tone: "muted" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Operación · tiempo real"
        title="Dashboard"
        subtitle="Visión operativa de tu inventario, ventas y ROI en Vinted."
      />

      {/* KPI grid */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {KPIS.map((k, i) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/50 p-4 transition-all duration-500 hover:border-signal/40 hover:bg-card/80 hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 60}ms`, animation: "page-enter 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {k.label}
                </span>
                <Icon className={`h-3.5 w-3.5 ${k.tone === "signal" ? "text-signal" : k.tone === "warn" ? "text-warn" : "text-muted-foreground"}`} />
              </div>
              <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-foreground">{k.value}</p>
              <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                k.tone === "signal" ? "text-signal" : k.tone === "warn" ? "text-warn" : "text-muted-foreground"
              }`}>
                {k.delta}
              </p>
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <div className="lg:col-span-2 rounded-lg border border-border/60 bg-card/40 p-5">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-signal" />
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Actividad reciente</h2>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
              LIVE
            </span>
          </header>
          <ul className="space-y-2">
            {ACTIVITY.map((a, i) => (
              <li
                key={i}
                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-transparent px-3 py-2.5 transition-all duration-300 hover:border-border hover:bg-background/40"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-full text-[10px] ${
                  a.tone === "signal" ? "bg-signal/15 text-signal" :
                  a.tone === "warn"   ? "bg-warn/15 text-warn"   : "bg-muted/40 text-muted-foreground"
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
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                  {a.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* System / next actions */}
        <aside className="space-y-4">
          <div className="rounded-lg border border-signal/30 bg-signal/5 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">Ghost Monitor</p>
            <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-foreground">76 / 76</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Productos verificados</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-card">
              <div className="h-full w-full bg-gradient-to-r from-signal to-signal/40 animate-pulse" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Próximo escaneo · en 14 min
            </p>
          </div>

          <div className="rounded-lg border border-border/60 bg-card/40 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Calidad de datos</p>
            <ul className="mt-3 space-y-2 text-sm">
              <Row label="Precios completos" value="76/76" tone="signal" />
              <Row label="Costes registrados" value="1/76" tone="warn" />
              <Row label="Categorías" value="74/76" tone="muted" />
            </ul>
            <a href="/app/inventario" className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal hover:underline">
              Completar datos <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: "signal" | "warn" | "muted" }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono tabular-nums ${
        tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-foreground"
      }`}>{value}</span>
    </li>
  );
}
