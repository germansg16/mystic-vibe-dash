import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, PackagePlus, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { PhotoDrop, type PhotoAnalysis } from "@/components/photo-drop";

export const Route = createFileRoute("/app/oracle")({
  head: () => ({ meta: [{ title: "Registro de producto — Alpha Engine" }] }),
  component: Page,
});

function Page() {
  const [a, setA] = useState<PhotoAnalysis | null>(null);
  const [cost, setCost] = useState("");
  const [saved, setSaved] = useState(false);

  function update<K extends keyof PhotoAnalysis>(k: K, v: PhotoAnalysis[K]) {
    if (!a) return;
    setA({ ...a, [k]: v });
  }

  return (
    <div className="space-y-6">
      <PageHeader kicker="Pipeline · entrada" title="Registro de producto"
        subtitle="Sube la foto y Oracle rellena título, descripción y precio sugerido." />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <PhotoDrop onAnalyze={(data) => { setA(data); setSaved(false); }} />
          <div className="rounded-lg border border-signal/30 bg-signal/5 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-signal" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">Precio sugerido</h3>
            </div>
            <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-foreground">
              {a ? `€${a.suggestedPrice.toFixed(2)}` : "—"}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {a ? `${Math.round(a.confidence * 100)}% confianza · 1,284 anuncios` : "Sube una foto"}
            </p>
          </div>
        </div>

        <form
          className="space-y-4 rounded-lg border border-border/60 bg-card/40 p-5"
          onSubmit={(e) => { e.preventDefault(); setSaved(true); }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Título" value={a?.title ?? ""} onChange={(v) => update("title", v)} />
            <Field label="Marca" value={a?.brand ?? ""} onChange={(v) => update("brand", v)} />
            <Field label="Categoría" value={a?.category ?? ""} onChange={(v) => update("category", v)} />
            <Field label="Talla" value={a?.size ?? ""} onChange={(v) => update("size", v)} />
            <Field label="Estado" value={a?.condition ?? ""} onChange={(v) => update("condition", v)} />
            <Field label="Color" value={a?.color ?? ""} onChange={(v) => update("color", v)} />
            <Field label="Coste de compra (€)" value={cost} onChange={setCost} type="number" placeholder="8.00" />
            <Field label="Precio publicado (€)" value={a ? a.suggestedPrice.toString() : ""} onChange={(v) => update("suggestedPrice", parseFloat(v) || 0)} type="number" />
          </div>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Descripción</span>
            <textarea
              value={a?.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-signal"
              placeholder="La descripción se rellena al analizar la foto…"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-signal" /> Datos sincronizados a tu inventario
            </p>
            <div className="flex gap-2">
              <button type="button" className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                Cancelar
              </button>
              <button type="submit"
                disabled={!a}
                className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground transition-all hover:shadow-[0_0_24px_-4px_var(--signal)] disabled:cursor-not-allowed disabled:opacity-50">
                <PackagePlus className="h-3.5 w-3.5" /> {saved ? "Guardado ✓" : "Registrar en stock"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }:
  { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none transition-all duration-300 focus:border-signal focus:shadow-[0_0_0_3px_oklch(0.86_0.2_142_/_0.15)]"
      />
    </label>
  );
}
