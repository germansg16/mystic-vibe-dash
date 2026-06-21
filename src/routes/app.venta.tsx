import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Receipt, TrendingUp, Clock, BadgeEuro } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { PhotoDrop, type PhotoAnalysis } from "@/components/photo-drop";

export const Route = createFileRoute("/app/venta")({
  head: () => ({ meta: [{ title: "Registro de venta — Alpha Engine" }] }),
  component: Page,
});

function Page() {
  const [a, setA] = useState<PhotoAnalysis | null>(null);
  const [cost, setCost] = useState("");
  const [buyer, setBuyer] = useState("");
  const [days, setDays] = useState("12");
  const [saved, setSaved] = useState(false);

  const m = useMemo(() => {
    const p = a?.suggestedPrice ?? 0;
    const c = parseFloat(cost) || 0;
    const fees = p * 0.05;
    const net = p - fees - c;
    const roi = c > 0 ? (net / c) * 100 : 0;
    return { net, roi, fees, price: p };
  }, [a, cost]);

  return (
    <div className="space-y-6">
      <PageHeader kicker="Pipeline · cierre" title="Registro de venta"
        subtitle="Sube la foto del artículo vendido. Solo necesitas indicar el coste de compra." />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <PhotoDrop onAnalyze={(data) => { setA(data); setSaved(false); }} label="Sube la foto del vendido" />
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-border/60 bg-card/40 p-3">
            <Mini icon={BadgeEuro} label="Venta" value={`€${m.price.toFixed(0)}`} />
            <Mini icon={TrendingUp} label="ROI" value={`${m.roi >= 0 ? "+" : ""}${m.roi.toFixed(0)}%`} tone="signal" />
            <Mini icon={Clock} label="TTS" value={`${days}d`} />
          </div>
        </div>

        <form
          className="space-y-4 rounded-lg border border-border/60 bg-card/40 p-5"
          onSubmit={(e) => { e.preventDefault(); setSaved(true); }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Producto" value={a?.title ?? ""} onChange={(v) => a && setA({ ...a, title: v })} readonly={!a} />
            <Field label="Marca" value={a?.brand ?? ""} readonly />
            <Field label="Comprador" value={buyer} onChange={setBuyer} placeholder="@usuario" />
            <Field label="Días en stock" value={days} onChange={setDays} type="number" />
            <Field label="Precio de venta (€)" value={a ? a.suggestedPrice.toString() : ""} onChange={(v) => a && setA({ ...a, suggestedPrice: parseFloat(v) || 0 })} type="number" />
            <Field
              label="Coste de compra (€) *"
              value={cost}
              onChange={setCost}
              type="number"
              placeholder="Lo que pagaste tú"
              highlight
            />
          </div>

          <div className="rounded-md border border-border/60 bg-background/50 p-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat label="Comisiones" value={`€${m.fees.toFixed(2)}`} />
              <Stat label="Beneficio neto" value={`€${m.net.toFixed(2)}`} tone={m.net >= 0 ? "signal" : "warn"} />
              <Stat label="ROI" value={`${m.roi >= 0 ? "+" : ""}${m.roi.toFixed(1)}%`} tone={m.roi >= 0 ? "signal" : "warn"} />
            </div>
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              El coste cuenta para estadísticas y Leaderboard
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">Cancelar</button>
            <button type="submit" disabled={!a || !cost}
              className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)] disabled:cursor-not-allowed disabled:opacity-50">
              <Receipt className="h-3.5 w-3.5" /> {saved ? "Venta guardada ✓" : "Guardar venta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", readonly, highlight }:
  { label: string; value: string; onChange?: (v: string) => void; placeholder?: string; type?: string; readonly?: boolean; highlight?: boolean }) {
  return (
    <label className="block">
      <span className={`mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] ${highlight ? "text-signal" : "text-muted-foreground"}`}>{label}</span>
      <input
        type={type} value={value} readOnly={readonly}
        onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}
        className={`w-full rounded-md border bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none transition-all focus:border-signal focus:shadow-[0_0_0_3px_oklch(0.86_0.2_142_/_0.15)] ${
          highlight ? "border-signal/40 bg-signal/[0.04]" : "border-border"
        } ${readonly ? "opacity-70" : ""}`}
      />
    </label>
  );
}
function Mini({ icon: Icon, label, value, tone }: { icon: typeof TrendingUp; label: string; value: string; tone?: "signal" }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-2 text-center">
      <Icon className={`mx-auto h-3 w-3 ${tone === "signal" ? "text-signal" : "text-muted-foreground"}`} />
      <p className={`mt-1 font-mono text-sm font-bold tabular-nums ${tone === "signal" ? "text-signal" : "text-foreground"}`}>{value}</p>
      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
    </div>
  );
}
function Stat({ label, value, tone }: { label: string; value: string; tone?: "signal" | "warn" }) {
  return (
    <div>
      <p className={`font-mono text-base font-bold tabular-nums ${tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-foreground"}`}>{value}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
    </div>
  );
}
