import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FlaskConical, Upload, Download, Wand2, ImageIcon, ShieldCheck, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/stealth")({
  head: () => ({ meta: [{ title: "Laboratorio — Alpha Engine" }] }),
  component: Page,
});

function Page() {
  const [orig, setOrig] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [oldHash, setOldHash] = useState<string | null>(null);
  const [newHash, setNewHash] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  function fakeHash() {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  }

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setOrig(url);
    setProcessed(null);
    setOldHash(fakeHash());
    setNewHash(null);
  }

  function process() {
    if (!orig) return;
    setBusy(true);
    setTimeout(() => {
      setProcessed(orig);
      setNewHash(fakeHash());
      setCount((c) => c + 1);
      setBusy(false);
    }, 1200);
  }

  return (
    <div className="space-y-6">
      <PageHeader kicker="Laboratorio · multicuenta" title="Cambio de hash de imagen"
        subtitle="Sube una foto y genera variantes con hash único para evitar bans en multicuenta." />

      <section className="grid gap-3 md:grid-cols-3">
        <Stat icon={ShieldCheck} label="Variantes generadas" value={count.toString()} tone="signal" />
        <Stat icon={Wand2}       label="Cuentas activas"     value="4" />
        <Stat icon={RefreshCw}   label="Última rotación"     value={count > 0 ? "ahora" : "—"} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {/* Upload + original */}
        <div className="rounded-lg border border-border/60 bg-card/40 p-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground">1 · Imagen original</h3>
          <label className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-border/60 transition-all hover:border-signal/40 hover:bg-signal/[0.03]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}>
            <input ref={ref} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {orig ? (
              <img src={orig} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-signal/10 text-signal animate-float">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">Sube tu foto</p>
              </div>
            )}
          </label>
          {oldHash && (
            <p className="mt-3 truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              hash: <span className="text-foreground">{oldHash}</span>
            </p>
          )}
          <button onClick={() => ref.current?.click()}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
            <Upload className="h-3 w-3" /> {orig ? "Cambiar" : "Seleccionar"}
          </button>
        </div>

        {/* Processed */}
        <div className="rounded-lg border border-signal/30 bg-signal/5 p-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-signal">2 · Variante con nuevo hash</h3>
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-md border border-border/60 bg-background/40">
            {processed ? (
              <>
                <img src={processed} alt="" className="h-full w-full object-cover" style={{ filter: "hue-rotate(2deg) brightness(1.01)" }} />
                <div className="absolute inset-0 bg-gradient-to-tr from-signal/[0.04] via-transparent to-signal/[0.06] mix-blend-overlay" />
              </>
            ) : busy ? (
              <div className="flex flex-col items-center gap-2">
                <FlaskConical className="h-6 w-6 text-signal animate-spin" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">Aplicando ruido perceptual…</p>
              </div>
            ) : (
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Resultado aquí</p>
            )}
          </div>
          {newHash && (
            <p className="mt-3 truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              hash: <span className="text-signal">{newHash}</span>
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button onClick={process} disabled={!orig || busy}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-signal px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)] disabled:opacity-50">
              <Wand2 className="h-3 w-3" /> Generar variante
            </button>
            <a href={processed ?? "#"} download={processed ? "alpha-stealth.jpg" : undefined}
              aria-disabled={!processed}
              className={`inline-flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] ${processed ? "text-foreground hover:bg-accent" : "pointer-events-none opacity-50 text-muted-foreground"}`}>
              <Download className="h-3 w-3" /> Descargar
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Cómo funciona</h3>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
          <li><span className="text-signal">·</span> Aplica micro-ruido perceptual invisible</li>
          <li><span className="text-signal">·</span> Recoloca metadatos EXIF aleatorios</li>
          <li><span className="text-signal">·</span> Cambia el fingerprint sin alterar la imagen</li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Wand2; label: string; value: string; tone?: "signal" }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <Icon className={`h-4 w-4 ${tone === "signal" ? "text-signal" : "text-muted-foreground"}`} />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      </div>
      <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${tone === "signal" ? "text-signal" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
