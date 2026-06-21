import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ghost, Link as LinkIcon, Play, Tag, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/ghost")({
  head: () => ({ meta: [{ title: "Monitor Fantasma — Alpha Engine" }] }),
  component: Page,
});

type Scraped = { id: number; title: string; brand: string; price: number; status: "nuevo" | "stock" | "vendido" };

const POOL: Omit<Scraped, "id">[] = [
  { title: "Bolso Longchamp azul marino L", brand: "Longchamp", price: 60, status: "stock" },
  { title: "Camiseta Stüssy World Tour", brand: "Stüssy", price: 32, status: "nuevo" },
  { title: "Zapatillas Nike Air Max 90", brand: "Nike", price: 78, status: "stock" },
  { title: "Sudadera Champion Vintage", brand: "Champion", price: 45, status: "vendido" },
  { title: "Vaquero Levi's 501", brand: "Levi's", price: 38, status: "stock" },
  { title: "North Face 700 Puffer", brand: "North Face", price: 120, status: "nuevo" },
  { title: "Adidas Samba OG talla 42", brand: "Adidas", price: 85, status: "stock" },
  { title: "Carhartt Detroit Jacket", brand: "Carhartt", price: 110, status: "stock" },
  { title: "Bolso Coach Pochette", brand: "Coach", price: 55, status: "nuevo" },
  { title: "Nike Tech Fleece negro", brand: "Nike", price: 48, status: "vendido" },
];

function Page() {
  const [url, setUrl] = useState("https://www.vinted.es/member/23269862");
  const [running, setRunning] = useState(false);
  const [items, setItems] = useState<Scraped[]>([]);
  const [progress, setProgress] = useState(0);

  function start() {
    setItems([]);
    setRunning(true);
    setProgress(0);
  }

  useEffect(() => {
    if (!running) return;
    let i = 0;
    const id = setInterval(() => {
      const item = POOL[i % POOL.length];
      setItems((p) => [{ ...item, id: Date.now() + i }, ...p].slice(0, 30));
      setProgress(Math.min(100, (i + 1) * 10));
      i++;
      if (i >= POOL.length) { clearInterval(id); setRunning(false); }
    }, 600);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="space-y-6">
      <PageHeader kicker="Bot premium · 24/7" title="Monitor Fantasma"
        subtitle="Pega un enlace de Vinted y observa cómo aparecen los productos en tiempo real." />

      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">URL del armario o búsqueda</span>
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background/60 px-3">
              <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <input value={url} onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent py-2.5 font-mono text-sm text-foreground outline-none" />
            </div>
            <button onClick={start} disabled={running}
              className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)] disabled:opacity-50">
              <Play className="h-3.5 w-3.5" /> {running ? "Escaneando…" : "Iniciar escaneo"}
            </button>
          </div>
        </label>

        <div className="mt-4 flex items-center gap-3">
          <Ghost className={`h-4 w-4 ${running ? "text-signal animate-bounce" : "text-muted-foreground"}`} />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-card">
            <div className="h-full rounded-full bg-gradient-to-r from-signal to-signal/40 transition-[width] duration-300"
              style={{ width: `${progress}%` }} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">{items.length} productos</span>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Productos detectados</h2>
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-lg border border-dashed border-border/60 bg-card/20 p-12 text-center">
            <Ghost className="h-10 w-10 text-muted-foreground/40 animate-float" />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {running ? "Conectando con Vinted…" : "Pulsa iniciar para empezar a scrapear"}
            </p>
          </div>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {items.map((it, i) => (
              <li key={it.id}
                className="group flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 p-3 transition-all hover:border-signal/40"
                style={{ animation: "fade-in 0.4s ease-out both", animationDelay: `${Math.min(i, 10) * 30}ms` }}>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-signal/10 text-signal">
                  <Tag className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{it.title}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{it.brand} · €{it.price}</p>
                </div>
                <span className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${
                  it.status === "vendido" ? "border-signal/40 bg-signal/10 text-signal" :
                  it.status === "nuevo"   ? "border-warn/40 bg-warn/10 text-warn" :
                                            "border-border bg-card text-muted-foreground"
                }`}>
                  {it.status === "vendido" && <CheckCircle2 className="mr-1 inline h-2.5 w-2.5" />}
                  {it.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
