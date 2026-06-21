import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Star } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/winners")({
  head: () => ({ meta: [{ title: "Winners — Alpha Engine" }] }),
  component: Page,
});

const WINNERS = [
  { rank: 1, title: "Nike Tech Fleece Hoodie", roi: 280, vel: 2, src: "Interno", profit: 78 },
  { rank: 2, title: "Adidas Samba OG", roi: 210, vel: 3, src: "Híbrido", profit: 92 },
  { rank: 3, title: "Carhartt Detroit Jacket", roi: 195, vel: 4, src: "Externo", profit: 110 },
  { rank: 4, title: "Stüssy World Tour Tee", roi: 180, vel: 5, src: "Interno", profit: 45 },
  { rank: 5, title: "North Face 700 Puffer", roi: 160, vel: 6, src: "Externo", profit: 88 },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader kicker="Top performers" title="Winners" subtitle="Productos con mejor ROI y velocidad de venta." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WINNERS.map((w, i) => (
          <article key={w.rank}
            className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/40 p-5 transition-all duration-500 hover:border-signal/40 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 70}ms`, animation: "page-enter 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
            <div className="flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-signal/15 font-mono text-xs font-bold text-signal">#{w.rank}</span>
              <span className="rounded border border-border/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{w.src}</span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-foreground">{w.title}</h3>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <div><p className="text-signal text-base">+{w.roi}%</p>ROI</div>
              <div><p className="text-foreground text-base">{w.vel}d</p>TTS</div>
              <div><p className="text-foreground text-base">€{w.profit}</p>Profit</div>
            </div>
            <Trophy className="absolute right-3 top-3 h-16 w-16 -z-0 text-signal/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-signal/10" />
            <Star className="absolute right-10 bottom-3 h-3 w-3 text-signal/40 animate-pulse" />
          </article>
        ))}
      </div>
    </div>
  );
}
