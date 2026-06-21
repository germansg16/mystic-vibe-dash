import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { PageHeader } from "@/components/app-shell";
import { TrendingUp, Clock, Tag, Award } from "lucide-react";

export const Route = createFileRoute("/app/analitica")({
  head: () => ({ meta: [{ title: "Analítica — Alpha Engine" }] }),
  component: Page,
});

const CATS = [
  { name: "Bolsos",        sales: 42, roi: 240, ttsAvg: 5,  profit: 1820, color: "var(--signal)",   pct: 32 },
  { name: "Zapatillas",    sales: 38, roi: 195, ttsAvg: 7,  profit: 1620, color: "#60a5fa",         pct: 28 },
  { name: "Ropa Vintage",  sales: 31, roi: 310, ttsAvg: 4,  profit: 1440, color: "#f59e0b",         pct: 22 },
  { name: "Streetwear",    sales: 18, roi: 165, ttsAvg: 9,  profit: 720,  color: "#a78bfa",         pct: 12 },
  { name: "Denim",         sales: 9,  roi: 92,  ttsAvg: 16, profit: 240,  color: "#94a3b8",         pct: 6 },
];

const REVENUE = [42, 31, 28, 55, 48, 62, 71, 58, 64, 80, 72, 88];
const PROFIT  = [18, 14, 12, 24, 22, 28, 32, 27, 30, 38, 35, 42];

function Page() {
  const max = Math.max(...REVENUE);
  return (
    <div className="space-y-6">
      <PageHeader kicker="Inteligencia · histórico" title="Analítica"
        subtitle="Qué categorías generan más beneficio, cuáles rotan más rápido y dónde reinvertir." />

      {/* Insight strip */}
      <section className="grid gap-3 md:grid-cols-4">
        <Kpi icon={TrendingUp} label="Mejor categoría" value="Vintage" sub="ROI +310% prom." tone="signal" />
        <Kpi icon={Clock}      label="Más rápida"    value="4 días"  sub="ropa vintage" />
        <Kpi icon={Tag}        label="Más vendida"  value="Bolsos"  sub="42 unidades" />
        <Kpi icon={Award}      label="Profit total" value="€5,840"  sub="últimos 90 días" tone="signal" />
      </section>

      {/* Chart + donut */}
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border/60 bg-card/40 p-5">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Revenue vs Profit · 12 meses</h2>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="flex items-center gap-1 text-signal"><span className="h-2 w-2 rounded-sm bg-signal" /> Revenue</span>
              <span className="flex items-center gap-1 text-muted-foreground"><span className="h-2 w-2 rounded-sm bg-muted-foreground/60" /> Profit</span>
            </div>
          </header>
          <div className="grid h-56 grid-cols-12 items-end gap-2">
            {REVENUE.map((v, i) => (
              <div key={i} className="group relative flex h-full flex-col items-stretch justify-end gap-0.5">
                <div className="relative rounded-t bg-gradient-to-t from-signal/80 to-signal/30 transition-all duration-500 group-hover:from-signal group-hover:to-signal/60"
                  style={{ height: `${(v / max) * 100}%` }}>
                  <div className="absolute inset-x-1 bottom-0 rounded-t bg-foreground/40"
                       style={{ height: `${(PROFIT[i] / v) * 100}%` }} />
                </div>
                <span className="block text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <Donut data={CATS} />
      </section>

      {/* Categories deep table */}
      <section className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <header className="border-b border-border/60 px-5 py-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Análisis por categoría</h2>
        </header>
        <table className="w-full text-sm">
          <thead className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-normal">Categoría</th>
              <th className="px-4 py-3 text-left font-normal">Distribución</th>
              <th className="px-4 py-3 text-right font-normal">Unidades</th>
              <th className="px-4 py-3 text-right font-normal">TTS prom.</th>
              <th className="px-4 py-3 text-right font-normal">ROI</th>
              <th className="px-4 py-3 text-right font-normal">Profit</th>
              <th className="px-4 py-3 text-right font-normal">Recomendación</th>
            </tr>
          </thead>
          <tbody>
            {CATS.map((c) => {
              const score = c.roi - c.ttsAvg * 6;
              const rec = score > 150 ? "Reinvertir" : score > 80 ? "Mantener" : "Reducir";
              const tone = rec === "Reinvertir" ? "text-signal" : rec === "Mantener" ? "text-foreground" : "text-warn";
              return (
                <tr key={c.name} className="border-t border-border/40 transition-colors hover:bg-background/40">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-card">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${c.pct}%`, background: c.color }} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{c.sales}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{c.ttsAvg} d</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-signal">+{c.roi}%</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">€{c.profit}</td>
                  <td className={`px-4 py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] ${tone}`}>{rec}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Heatmap */}
      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Velocidad de venta · día × hora</h2>
        <Heatmap />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Datos usados para entrenar el modelo de <span className="text-signal">Ganadores</span>
        </p>
      </section>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub, tone }:
  { icon: typeof TrendingUp; label: string; value: string; sub: string; tone?: "signal" }) {
  return (
    <div className="group rounded-lg border border-border/60 bg-card/40 p-4 transition-all duration-500 hover:border-signal/40 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <Icon className={`h-4 w-4 ${tone === "signal" ? "text-signal" : "text-muted-foreground"}`} />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      </div>
      <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${tone === "signal" ? "text-signal" : "text-foreground"}`}>{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Donut({ data }: { data: typeof CATS }) {
  const R = 56, C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-5">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Mix de profit</h2>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="var(--border)" strokeWidth="14" opacity={0.3} />
          {data.map((c) => {
            const len = (c.pct / 100) * C;
            const seg = <circle key={c.name} cx="70" cy="70" r={R} fill="none" stroke={c.color} strokeWidth="14"
              strokeDasharray={`${len} ${C}`} strokeDashoffset={-offset} className="transition-all duration-700" />;
            offset += len;
            return seg;
          })}
        </svg>
        <ul className="flex-1 space-y-1.5">
          {data.map((c) => (
            <li key={c.name} className="flex items-center gap-2 font-mono text-[11px]">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} />
              <span className="flex-1 text-foreground">{c.name}</span>
              <span className="tabular-nums text-muted-foreground">{c.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Heatmap() {
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const hours = Array.from({ length: 12 }, (_, i) => i * 2);
  // deterministic pseudo-data
  const v = (d: number, h: number) => Math.abs(Math.sin(d * 1.7 + h * 0.6)) ;
  return (
    <div className="overflow-x-auto">
      <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `auto repeat(${hours.length}, 1fr)` }}>
        <div />
        {hours.map((h) => <div key={h} className="text-center font-mono text-[9px] text-muted-foreground">{h}h</div>)}
        {days.map((d, di) => (
          <>
            <div key={d} className="pr-2 text-right font-mono text-[10px] text-muted-foreground">{d}</div>
            {hours.map((h) => {
              const val = v(di, h);
              return <div key={`${d}-${h}`} className="aspect-square min-w-[18px] rounded-[3px] transition-transform hover:scale-110"
                style={{ background: `oklch(0.86 0.2 142 / ${0.06 + val * 0.5})` }} title={`${d} ${h}h · ${(val * 100).toFixed(0)}%`} />;
            })}
          </>
        ))}
      </div>
    </div>
  );
}
