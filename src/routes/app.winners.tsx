import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Trophy, Star, Zap, Layers, BadgeEuro } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/winners")({
  head: () => ({ meta: [{ title: "Ganadores — Alpha Engine" }] }),
  component: Page,
});

type Winner = {
  rank: number; title: string; category: string;
  roi: number; tts: number; units: number; price: number; profit: number;
};

const ALL: Winner[] = [
  { rank: 1, title: "Bolso Longchamp azul marino",   category: "Bolsos",       roi: 240, tts: 3, units: 8,  price: 60, profit: 280 },
  { rank: 2, title: "Sudadera Nike Tech Fleece",     category: "Streetwear",   roi: 280, tts: 2, units: 12, price: 48, profit: 320 },
  { rank: 3, title: "Adidas Samba OG",               category: "Zapatillas",   roi: 210, tts: 3, units: 9,  price: 85, profit: 380 },
  { rank: 4, title: "Carhartt Detroit Jacket",       category: "Vintage",      roi: 195, tts: 4, units: 5,  price: 120, profit: 410 },
  { rank: 5, title: "Stüssy World Tour Tee",         category: "Streetwear",   roi: 180, tts: 5, units: 14, price: 32, profit: 220 },
  { rank: 6, title: "North Face 700 Puffer",         category: "Vintage",      roi: 160, tts: 6, units: 4,  price: 140, profit: 360 },
  { rank: 7, title: "Levi's 501 Vintage",            category: "Denim",        roi: 145, tts: 8, units: 11, price: 40, profit: 190 },
];

const SORTS = [
  { key: "price",  label: "Más precio",  icon: BadgeEuro, get: (w: Winner) => w.price },
  { key: "tts",    label: "Más rápidas", icon: Zap,       get: (w: Winner) => -w.tts },
  { key: "units",  label: "Más unidades", icon: Layers,   get: (w: Winner) => w.units },
  { key: "roi",    label: "Mejor ROI",   icon: Trophy,    get: (w: Winner) => w.roi },
] as const;

function Page() {
  const [sortKey, setSortKey] = useState<typeof SORTS[number]["key"]>("roi");

  const sorted = useMemo(() => {
    const fn = SORTS.find((s) => s.key === sortKey)!.get;
    return [...ALL].sort((a, b) => fn(b) - fn(a)).map((w, i) => ({ ...w, rank: i + 1 }));
  }, [sortKey]);

  return (
    <div className="space-y-6">
      <PageHeader kicker="Top performers" title="Ganadores"
        subtitle="Los productos que mejor han funcionado según el criterio que elijas." />

      <div className="flex flex-wrap gap-1.5 rounded-lg border border-border/60 bg-card/40 p-1.5">
        {SORTS.map((s) => {
          const Icon = s.icon;
          const active = s.key === sortKey;
          return (
            <button key={s.key} onClick={() => setSortKey(s.key)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
                active ? "bg-signal/15 text-signal" : "text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="h-3 w-3" /> {s.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((w, i) => (
          <article key={w.title}
            className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/40 p-5 transition-all duration-500 hover:border-signal/40 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 50}ms`, animation: "page-enter 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
            <div className="flex items-center justify-between">
              <span className={`grid h-8 w-8 place-items-center rounded-full font-mono text-xs font-bold ${
                w.rank === 1 ? "bg-warn/15 text-warn" : w.rank <= 3 ? "bg-signal/15 text-signal" : "bg-card text-muted-foreground"
              }`}>#{w.rank}</span>
              <span className="rounded border border-border/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{w.category}</span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-foreground">{w.title}</h3>
            <div className="mt-3 grid grid-cols-4 gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              <Cell value={`€${w.price}`} label="Precio" />
              <Cell value={`${w.tts}d`} label="TTS" />
              <Cell value={`${w.units}`} label="Unid." />
              <Cell value={`+${w.roi}%`} label="ROI" tone="signal" />
            </div>
            <Trophy className="absolute right-3 top-3 h-16 w-16 text-signal/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-signal/10" />
            <Star className="absolute right-10 bottom-3 h-3 w-3 text-signal/40 animate-pulse" />
          </article>
        ))}
      </div>
    </div>
  );
}

function Cell({ value, label, tone }: { value: string; label: string; tone?: "signal" }) {
  return (
    <div>
      <p className={`text-sm font-bold tabular-nums ${tone === "signal" ? "text-signal" : "text-foreground"}`}>{value}</p>
      <p>{label}</p>
    </div>
  );
}
