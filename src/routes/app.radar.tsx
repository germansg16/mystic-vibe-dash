import { createFileRoute } from "@tanstack/react-router";
import { Radar, Zap, TrendingUp, Filter } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/radar")({
  head: () => ({ meta: [{ title: "Market Radar — Alpha Engine" }] }),
  component: Page,
});

const LISTINGS = [
  { title: "North Face 700 Puffer", cat: "Outerwear", price: 24, market: 78, margin: 54, vel: "4d", conf: 92, src: "Vinted" },
  { title: "Carhartt Detroit Jacket", cat: "Workwear", price: 32, market: 95, margin: 63, vel: "3d", conf: 88, src: "Vinted" },
  { title: "Nike Tech Fleece Hoodie", cat: "Sportwear", price: 18, market: 62, margin: 44, vel: "2d", conf: 95, src: "Vinted" },
  { title: "Stüssy World Tour Tee",  cat: "Tees",      price: 12, market: 38, margin: 26, vel: "5d", conf: 84, src: "Vinted" },
  { title: "Levi's 501 Vintage",     cat: "Denim",     price: 15, market: 45, margin: 30, vel: "6d", conf: 76, src: "Vinted" },
  { title: "Adidas Samba OG",        cat: "Sneakers",  price: 42, market: 110, margin: 68, vel: "2d", conf: 96, src: "Vinted" },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader kicker="Sourcing · live" title="Market Radar"
        subtitle="Oportunidades en tiempo real con margen y demanda estimada."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"><Filter className="h-3 w-3" /> Filtros</button>
            <span className="hidden items-center gap-2 rounded-md border border-signal/30 bg-signal/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal sm:inline-flex"><Zap className="h-3 w-3" /> 124 nuevas / 1h</span>
          </>
        } />

      {/* Radar visual */}
      <div className="relative overflow-hidden rounded-lg border border-border/60 bg-card/40 p-6">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex items-center gap-6">
          <div className="relative grid h-32 w-32 place-items-center rounded-full border border-signal/40">
            <span className="absolute inset-0 rounded-full border border-signal/20" />
            <span className="absolute inset-4 rounded-full border border-signal/15" />
            <span className="absolute inset-8 rounded-full border border-signal/10" />
            <span className="absolute inset-0 origin-center animate-radar-sweep"
              style={{ background: "conic-gradient(from 0deg, oklch(0.86 0.2 142 / 0.4), transparent 30%)", borderRadius: "999px" }} />
            <Radar className="relative h-8 w-8 text-signal" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">Escaneando · Vinted · ES + FR</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-foreground">{LISTINGS.length} oportunidades</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Confianza media · 88%</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-card/60 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-normal">Producto</th>
              <th className="px-4 py-3 text-right font-normal">Precio</th>
              <th className="px-4 py-3 text-right font-normal">Market</th>
              <th className="px-4 py-3 text-right font-normal">Margen</th>
              <th className="px-4 py-3 text-right font-normal">Velocidad</th>
              <th className="px-4 py-3 text-right font-normal">Confianza</th>
            </tr>
          </thead>
          <tbody>
            {LISTINGS.map((l, i) => (
              <tr key={i} className="border-b border-border/40 last:border-none transition-colors hover:bg-background/40">
                <td className="px-4 py-3">
                  <div className="font-medium">{l.title}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{l.cat} · {l.src}</div>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">€{l.price}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">€{l.market}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-signal">€{l.margin}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums"><TrendingUp className="mr-1 inline h-3 w-3 text-signal" />{l.vel}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-block w-16 align-middle">
                    <span className="block h-1 rounded-full bg-card">
                      <span className="block h-full rounded-full bg-signal transition-all duration-700" style={{ width: `${l.conf}%` }} />
                    </span>
                  </span>
                  <span className="ml-2 font-mono text-xs tabular-nums text-foreground">{l.conf}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
