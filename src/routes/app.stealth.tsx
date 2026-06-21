import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Beaker, Eye, Zap } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/stealth")({
  head: () => ({ meta: [{ title: "Stealth Lab — Alpha Engine" }] }),
  component: Page,
});

const EXPERIMENTS = [
  { name: "Ghost Drop · cuenta sombra", status: "Activo", icon: Eye, desc: "Publicación temporal sin ranking público." },
  { name: "Price Cycling A/B",          status: "Beta",   icon: Zap, desc: "Rota precios cada 6h y mide CTR." },
  { name: "Lab Conditioner",            status: "Pausado",icon: Beaker, desc: "Mejora fotos automáticamente." },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader kicker="Laboratorio · técnicas avanzadas" title="Stealth Lab"
        subtitle="Experimentos premium para ganar ventaja operativa." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {EXPERIMENTS.map((e) => {
          const Icon = e.icon;
          return (
            <article key={e.name}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/40 p-5 transition-all duration-500 hover:border-signal/40 hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-signal" />
                <span className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${
                  e.status === "Activo" ? "border-signal/40 bg-signal/10 text-signal" :
                  e.status === "Beta"   ? "border-warn/40 bg-warn/10 text-warn" :
                                          "border-border bg-card text-muted-foreground"
                }`}>{e.status}</span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-foreground">{e.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
              <button className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal hover:underline">
                <FlaskConical className="h-3 w-3" /> Configurar experimento
              </button>
              <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-signal/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          );
        })}
      </div>
    </div>
  );
}
