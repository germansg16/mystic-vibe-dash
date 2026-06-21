import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/analitica")({
  head: () => ({ meta: [{ title: "Analítica — Alpha Engine" }] }),
  component: Page,
});

const BRANDS = [
  { name: "Nike",     sales: 28, profit: 524, ttsAvg: 6,  roi: 142 },
  { name: "Adidas",   sales: 21, profit: 388, ttsAvg: 9,  roi: 118 },
  { name: "Stüssy",   sales: 14, profit: 412, ttsAvg: 4,  roi: 210 },
  { name: "Carhartt", sales: 11, profit: 298, ttsAvg: 7,  roi: 168 },
  { name: "Bershka",  sales: 9,  profit: 64,  ttsAvg: 22, roi: 38 },
];
const BARS = [42, 31, 28, 55, 48, 62, 71, 58, 64, 80, 72, 88];

function Page() {
  const max = Math.max(...BARS);
  return (
    <div className="space-y-6">
      <PageHeader kicker="Inteligencia · histórico" title="Analítica"
        subtitle="Qué marcas y categorías generan más beneficio y rotan más rápido." />

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border/60 bg-card/40 p-5 lg:col-span-2">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Revenue · últimos 12 meses</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">+38.4% YoY</span>
          </header>
          <div className="grid h-48 grid-cols-12 items-end gap-2">
            {BARS.map((v, i) => (
              <div key={i} className="group relative h-full">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-signal/80 to-signal/30 transition-all duration-500 group-hover:from-signal group-hover:to-signal/50"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="mt-1 block text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  M{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/40 p-5">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Mix de categorías</h2>
          <ul className="space-y-3">
            {[
              { name: "Streetwear", pct: 42 },
              { name: "Vintage",    pct: 28 },
              { name: "Sneakers",   pct: 18 },
              { name: "Denim",      pct: 12 },
            ].map((c) => (
              <li key={c.name}>
                <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="text-foreground">{c.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-card">
                  <div className="h-full rounded-full bg-gradient-to-r from-signal to-signal/40 transition-all duration-700" style={{ width: `${c.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <header className="border-b border-border/60 px-5 py-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Top marcas</h2>
        </header>
        <table className="w-full text-sm">
          <thead className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-normal">Marca</th>
                <th className="px-4 py-3 text-right font-normal">Ventas</th>
                <th className="px-4 py-3 text-right font-normal">Profit</th>
                <th className="px-4 py-3 text-right font-normal">TTS prom.</th>
                <th className="px-4 py-3 text-right font-normal">ROI</th></tr>
          </thead>
          <tbody>
            {BRANDS.map((b) => (
              <tr key={b.name} className="border-t border-border/40 transition-colors hover:bg-background/40">
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{b.sales}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-signal">€{b.profit}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{b.ttsAvg} d</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-signal">+{b.roi}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
