import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ghost, CheckCircle2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/ghost")({
  head: () => ({ meta: [{ title: "Ghost Monitor — Alpha Engine" }] }),
  component: Page,
});

const PHASES = [
  "Escaneo en cola",
  "Conectando con Vinted",
  "Analizando armario",
  "Calculando precios",
  "Escaneo completado",
];

function Page() {
  const [profile, setProfile] = useState("https://www.vinted.es/member/23269862");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(2);
  const [scanned, setScanned] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 1.5);
        setScanned(Math.floor((next / 100) * 76));
        if (next < 25) setPhase(1);
        else if (next < 80) setPhase(2);
        else if (next < 100) setPhase(3);
        else setPhase(4);
        return next >= 100 ? 0 : next;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader kicker="Bot premium · 24/7" title="Ghost Monitor"
        subtitle="Agente autónomo que detecta ventas y nuevos productos en tu armario de Vinted." />

      {/* Profile config */}
      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Configuración del armario</h2>
        <label className="mt-3 block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">ID numérico o URL del perfil</span>
          <div className="flex gap-2">
            <input value={profile} onChange={(e) => setProfile(e.target.value)}
              className="flex-1 rounded-md border border-border bg-background/60 px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-signal focus:shadow-[0_0_0_3px_oklch(0.86_0.2_142_/_0.15)]" />
            <button className="rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
              <CheckCircle2 className="h-4 w-4" />
            </button>
          </div>
        </label>
      </section>

      {/* Live status */}
      <section className="overflow-hidden rounded-lg border border-signal/30 bg-signal/5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ghost className="h-5 w-5 text-signal animate-pulse" />
            <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-signal">{PHASES[phase]}</p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {scanned} / 76 productos
          </p>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card">
          <div className="h-full rounded-full bg-gradient-to-r from-signal to-signal/40 transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Monitorizados" value="76" />
          <Stat label="En stock" value="75" />
          <Stat label="Ventas detectadas" value="1" tone="signal" />
          <Stat label="Próximo escaneo" value="~14 min" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Chip>LIVE · actualiza cada 20s</Chip>
          <Chip>Bot · armario cada 15-45 min</Chip>
          <Chip tone="signal">Precios publicados 76/76</Chip>
          <Chip tone="warn">Costes 1/76</Chip>
        </div>
      </section>

      {/* Console */}
      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Console · stream</h3>
        <pre className="max-h-64 overflow-y-auto rounded-md border border-border/40 bg-background/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`[ghost] worker.boot       OK
[ghost] vinted.session     OK · token=••••
[ghost] wardrobe.fetch     76 items
[ghost] wardrobe.diff      +0 new · −0 sold
[ghost] price.scan         ${scanned}/76
[ghost] price.publish      ${scanned}/76
[ghost] cost.complete      1/76  ⚠
[ghost] next.scheduled     +14m`}
        </pre>
        <a href="#" className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal hover:underline">
          Ver logs completos <ExternalLink className="h-3 w-3" />
        </a>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "signal" }) {
  return (
    <div className="rounded-md border border-border/60 bg-card/40 p-3">
      <p className={`font-mono text-2xl font-bold tabular-nums ${tone === "signal" ? "text-signal" : "text-foreground"}`}>{value}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
    </div>
  );
}
function Chip({ children, tone }: { children: React.ReactNode; tone?: "signal" | "warn" }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 ${
      tone === "signal" ? "border-signal/40 bg-signal/10 text-signal" :
      tone === "warn"   ? "border-warn/40 bg-warn/10 text-warn" :
                          "border-border bg-card/60"
    }`}>{children}</span>
  );
}
