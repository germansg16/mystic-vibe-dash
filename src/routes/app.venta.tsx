import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/venta")({
  head: () => ({ meta: [{ title: "Registro de venta — Alpha Engine" }] }),
  component: Page,
});

function Page() {
  const [price, setPrice] = useState("28");
  const [fees, setFees]   = useState("2.10");
  const [cost, setCost]   = useState("8");
  const [days, setDays]   = useState("12");

  const m = useMemo(() => {
    const p = parseFloat(price) || 0;
    const f = parseFloat(fees) || 0;
    const c = parseFloat(cost) || 0;
    const net = p - f - c;
    const roi = c > 0 ? (net / c) * 100 : 0;
    return { net, roi };
  }, [price, fees, cost]);

  return (
    <div className="space-y-6">
      <PageHeader kicker="Pipeline · cierre" title="Registro de venta"
        subtitle="Calcula precio neto, ROI y TTS antes de guardar." />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="space-y-4 rounded-lg border border-border/60 bg-card/40 p-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Producto" placeholder="Sudadera Nike Vintage" />
            <Input label="Comprador" placeholder="@usuario" />
            <Input label="Precio venta (€)" value={price} onChange={setPrice} type="number" />
            <Input label="Comisiones (€)" value={fees} onChange={setFees} type="number" />
            <Input label="Coste origen (€)" value={cost} onChange={setCost} type="number" />
            <Input label="Días en stock" value={days} onChange={setDays} type="number" />
          </div>

          <div className="flex justify-end gap-2">
            <button className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">Cancelar</button>
            <button className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
              <Receipt className="h-3.5 w-3.5" /> Guardar venta
            </button>
          </div>
        </form>

        <aside className="space-y-3 rounded-lg border border-border/60 bg-card/40 p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Resumen</h2>
          <Stat label="Net profit" value={`€${m.net.toFixed(2)}`} tone={m.net >= 0 ? "signal" : "warn"} />
          <Stat label="ROI" value={`${m.roi >= 0 ? "+" : ""}${m.roi.toFixed(1)}%`} tone={m.roi >= 0 ? "signal" : "warn"} />
          <Stat label="Time-to-sell" value={`${days} días`} />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            * Validación previa al guardado
          </p>
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
        className="w-full rounded-md border border-border bg-background/60 px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-signal focus:shadow-[0_0_0_3px_oklch(0.86_0.2_142_/_0.15)]" />
    </label>
  );
}
function Stat({ label, value, tone }: { label: string; value: string; tone?: "signal" | "warn" }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/60 pb-2 last:border-none">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <span className={`font-mono text-lg font-bold tabular-nums ${
        tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-foreground"
      }`}>{value}</span>
    </div>
  );
}
