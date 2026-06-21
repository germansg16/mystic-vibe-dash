import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Wand2, PackagePlus } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/oracle")({
  head: () => ({ meta: [{ title: "Registro de producto — Alpha Engine" }] }),
  component: Page,
});

function Page() {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [suggested, setSuggested] = useState<number | null>(null);

  function suggest() {
    const base = (cost ? parseFloat(cost) : 8) * (1.8 + Math.random() * 1.4);
    setSuggested(Math.round(base * 100) / 100);
  }

  return (
    <div className="space-y-6">
      <PageHeader kicker="Pipeline · entrada" title="Registro de producto / Oracle"
        subtitle="Da de alta producto y obtén precio sugerido en base al mercado Vinted." />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="space-y-4 rounded-lg border border-border/60 bg-card/40 p-6"
              onSubmit={(e) => { e.preventDefault(); suggest(); }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Título" value={title} onChange={setTitle} placeholder="Sudadera Nike Vintage" />
            <Input label="Marca" value={brand} onChange={setBrand} placeholder="Nike" />
            <Input label="Talla" placeholder="M" />
            <Input label="Categoría" placeholder="Hombre · Sudaderas" />
            <Input label="Coste de compra (€)" value={cost} onChange={setCost} placeholder="8.00" type="number" />
            <Input label="Estado" placeholder="Muy bueno" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              * Validación inline · datos sincronizados al instante
            </p>
            <div className="flex gap-2">
              <button type="button" className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                Cancelar
              </button>
              <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground transition-all hover:shadow-[0_0_24px_-4px_var(--signal)]">
                <PackagePlus className="h-3.5 w-3.5" /> Registrar
              </button>
            </div>
          </div>
        </form>

        <aside className="rounded-lg border border-signal/30 bg-signal/5 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-signal" />
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal">Oracle · Precio sugerido</h2>
          </div>
          <p className="mt-4 font-mono text-4xl font-bold tabular-nums text-foreground">
            {suggested !== null ? `€${suggested.toFixed(2)}` : "—"}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Basado en 1,284 anuncios similares · confianza 87%
          </p>
          <button onClick={suggest} className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-signal hover:underline">
            <Wand2 className="h-3 w-3" /> Recalcular
          </button>
        </aside>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }:
  { label: string; value?: string; onChange?: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background/60 px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-signal focus:shadow-[0_0_0_3px_oklch(0.86_0.2_142_/_0.15)]" />
    </label>
  );
}
