import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Crown, Share2, Users, Clock } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — Alpha Engine" }] }),
  component: Page,
});

const GLOBAL = [
  { rank: 1, user: "ghostflip",    score: 9821, roi: 218, sales: 142, vel: 3,  profit: 4820 },
  { rank: 2, user: "alpha_resell", score: 9410, roi: 198, sales: 128, vel: 4,  profit: 4210 },
  { rank: 3, user: "jesuseron",    score: 8990, roi: 178, sales: 96,  vel: 5,  profit: 3140 },
  { rank: 4, user: "thrift_king",  score: 8120, roi: 152, sales: 81,  vel: 7,  profit: 2480 },
  { rank: 5, user: "vintage_vlt",  score: 7644, roi: 140, sales: 74,  vel: 8,  profit: 2210 },
];

function Page() {
  const [tab, setTab] = useState<"global" | "mis">("global");
  const [cat, setCat] = useState<"roi" | "vel" | "profit">("roi");

  return (
    <div className="space-y-5">
      <PageHeader kicker="Competición mensual" title="Leaderboard"
        subtitle="Ranking real basado en ROI, velocidad de venta y beneficio neto." />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
          {(["global", "mis"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
              tab === t ? "bg-signal/15 text-signal" : "text-muted-foreground hover:text-foreground"
            }`}>{t === "global" ? "Global" : "Mis ligas"}</button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
          {([["roi", "ROI"], ["vel", "Velocidad"], ["profit", "Profit"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setCat(k)} className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
              cat === k ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}>{l}</button>
          ))}
        </div>
      </div>

      {tab === "global" ? (
        <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-card/60 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-normal">Rank</th>
                <th className="px-4 py-3 text-left font-normal">Operador</th>
                <th className="px-4 py-3 text-right font-normal">Alpha Score</th>
                <th className="px-4 py-3 text-right font-normal">ROI</th>
                <th className="px-4 py-3 text-right font-normal">Ventas</th>
                <th className="px-4 py-3 text-right font-normal">Vel.</th>
                <th className="px-4 py-3 text-right font-normal">Profit</th>
              </tr>
            </thead>
            <tbody>
              {GLOBAL.map((g) => (
                <tr key={g.rank} className={`border-b border-border/40 last:border-none transition-colors hover:bg-background/40 ${
                  g.user === "jesuseron" ? "bg-signal/5" : ""
                }`}>
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-2 font-mono">
                    {g.rank === 1 && <Crown className="h-4 w-4 text-warn" />}#{g.rank}
                  </span></td>
                  <td className="px-4 py-3 font-medium">{g.user}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-signal">{g.score}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">+{g.roi}%</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{g.sales}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{g.vel}d</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">€{g.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-signal/30 bg-signal/5 p-5">
            <header className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-signal">Liga: GhostSquad</h3>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><Users className="h-3 w-3" /> 8</span>
            </header>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><Clock className="mr-1 inline h-3 w-3" /> 12 días restantes</p>
            <p className="mt-4 font-mono text-3xl font-bold tabular-nums text-foreground">#2 <span className="text-base font-normal text-muted-foreground">de 8</span></p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal hover:bg-signal/20">
              <Share2 className="h-3 w-3" /> Compartir invitación
            </button>
          </article>
          <article className="rounded-lg border border-dashed border-border/60 bg-card/30 p-5 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Únete a otra liga privada o créala</p>
            <button className="mt-3 rounded-md border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground hover:bg-accent">
              Crear nueva liga
            </button>
          </article>
        </div>
      )}
    </div>
  );
}
