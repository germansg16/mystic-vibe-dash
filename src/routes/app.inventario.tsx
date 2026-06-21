import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Pencil, Trash2, Filter, X, Save } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/inventario")({
  head: () => ({ meta: [{ title: "Inventario — Alpha Engine" }] }),
  component: Page,
});

type Item = {
  id: string;
  title: string; brand: string; size: string; condition: string;
  listed: string; daysIn: number; cost: number | null; listPrice: number;
  salePrice?: number; ttsDays?: number; url: string;
};

const INITIAL_STOCK: Item[] = [
  { id: "s1", title: "Bolso Longchamp azul marino L", brand: "Longchamp", size: "L", condition: "Muy bueno", listed: "18/06/26", daysIn: 3, cost: 25, listPrice: 60, url: "#" },
  { id: "s2", title: "Camiseta Stüssy World Tour", brand: "Stüssy", size: "L", condition: "Como nuevo", listed: "02/06/26", daysIn: 19, cost: 12, listPrice: 35, url: "#" },
  { id: "s3", title: "Zapatillas Nike Air Max", brand: "Nike", size: "42", condition: "Bueno", listed: "12/06/26", daysIn: 9, cost: 25, listPrice: 60, url: "#" },
  { id: "s4", title: "Vaquero Bershka", brand: "Bershka", size: "38", condition: "Bueno", listed: "10/05/26", daysIn: 42, cost: null, listPrice: 8, url: "#" },
];
const INITIAL_SOLD: Item[] = [
  { id: "v1", title: "Sudadera Champion Vintage", brand: "Champion", size: "L", condition: "Muy bueno", listed: "01/05/26", daysIn: 18, cost: 10, listPrice: 45, salePrice: 42, ttsDays: 18, url: "#" },
];

function Page() {
  const [tab, setTab] = useState<"stock" | "sold">("stock");
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [sold, setSold] = useState(INITIAL_SOLD);
  const [editing, setEditing] = useState<Item | null>(null);

  const items = tab === "stock" ? stock : sold;

  function save(updated: Item) {
    if (tab === "stock") setStock((s) => s.map((it) => (it.id === updated.id ? updated : it)));
    else setSold((s) => s.map((it) => (it.id === updated.id ? updated : it)));
    setEditing(null);
  }
  function remove(id: string) {
    if (tab === "stock") setStock((s) => s.filter((it) => it.id !== id));
    else setSold((s) => s.filter((it) => it.id !== id));
  }

  return (
    <div className="space-y-5">
      <PageHeader kicker="Operación · armario" title="Inventario"
        subtitle="Click en cualquier artículo para editar precio, coste o estado." />

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="flex gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
          <TabBtn active={tab === "stock"} onClick={() => setTab("stock")}>En stock ({stock.length})</TabBtn>
          <TabBtn active={tab === "sold"}  onClick={() => setTab("sold")}>Vendidos ({sold.length})</TabBtn>
        </div>
        <button className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
          <Filter className="h-3 w-3" /> Filtros
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-card/60">
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <Th>Producto</Th><Th>Talla</Th><Th>Listado</Th><Th>Días</Th>
                <Th>Coste</Th><Th>Precio</Th>
                {tab === "sold" && <><Th>Venta</Th><Th>ROI</Th></>}
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const net = it.salePrice && it.cost ? it.salePrice - it.cost - it.salePrice * 0.05 : null;
                const roi = net && it.cost ? (net / it.cost) * 100 : null;
                return (
                  <tr key={it.id} onClick={() => setEditing(it)}
                      className="cursor-pointer border-b border-border/40 last:border-none transition-colors duration-300 hover:bg-signal/[0.04]">
                    <Td>
                      <div className="font-medium text-foreground">{it.title}</div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{it.brand} · {it.condition}</div>
                    </Td>
                    <Td className="font-mono text-muted-foreground">{it.size}</Td>
                    <Td className="font-mono text-muted-foreground">{it.listed}</Td>
                    <Td className={`font-mono tabular-nums ${it.daysIn > 60 ? "text-warn" : "text-foreground"}`}>{it.daysIn} d</Td>
                    <Td>{it.cost === null
                      ? <span className="rounded border border-warn/40 bg-warn/10 px-2 py-0.5 font-mono text-[10px] text-warn">Sin registrar</span>
                      : <span className="font-mono tabular-nums">€{it.cost.toFixed(2)}</span>}</Td>
                    <Td className="font-mono tabular-nums text-foreground">€{it.listPrice.toFixed(2)}</Td>
                    {tab === "sold" && <>
                      <Td className="font-mono tabular-nums text-foreground">€{it.salePrice?.toFixed(2)}</Td>
                      <Td className="font-mono tabular-nums text-signal">+{roi?.toFixed(0)}%</Td>
                    </>}
                    <Td>
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <IconBtn title="Ver en Vinted" href={it.url}><ExternalLink className="h-3.5 w-3.5" /></IconBtn>
                        <IconBtn title="Editar" onClick={() => setEditing(it)}><Pencil className="h-3.5 w-3.5" /></IconBtn>
                        <IconBtn title="Eliminar" tone="danger" onClick={() => remove(it.id)}><Trash2 className="h-3.5 w-3.5" /></IconBtn>
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editing && <EditModal item={editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}

function EditModal({ item, onClose, onSave }: { item: Item; onClose: () => void; onSave: (it: Item) => void }) {
  const [draft, setDraft] = useState(item);
  const set = <K extends keyof Item>(k: K, v: Item[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-[min(520px,92vw)] rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">Editar artículo</p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <F label="Título" value={draft.title} onChange={(v) => set("title", v)} />
          <F label="Marca" value={draft.brand} onChange={(v) => set("brand", v)} />
          <F label="Talla" value={draft.size} onChange={(v) => set("size", v)} />
          <F label="Estado" value={draft.condition} onChange={(v) => set("condition", v)} />
          <F label="Coste (€)" type="number" value={draft.cost?.toString() ?? ""} onChange={(v) => set("cost", v ? parseFloat(v) : null)} />
          <F label="Precio (€)" type="number" value={draft.listPrice.toString()} onChange={(v) => set("listPrice", parseFloat(v) || 0)} />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">Cancelar</button>
          <button onClick={() => onSave(draft)} className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
            <Save className="h-3.5 w-3.5" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function F({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-signal" />
    </label>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
      active ? "bg-signal/15 text-signal" : "text-muted-foreground hover:text-foreground"
    }`}>{children}</button>
  );
}
function Th({ children }: { children: React.ReactNode }) { return <th className="px-4 py-3 text-left font-normal">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`px-4 py-3 ${className}`}>{children}</td>; }
function IconBtn({ children, title, href, tone, onClick }:
  { children: React.ReactNode; title: string; href?: string; tone?: "danger"; onClick?: () => void }) {
  const cls = `grid h-7 w-7 place-items-center rounded border border-transparent transition-all duration-300 ${
    tone === "danger"
      ? "text-muted-foreground hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
      : "text-muted-foreground hover:border-border hover:bg-background hover:text-foreground"
  }`;
  return href
    ? <a href={href} title={title} className={cls}>{children}</a>
    : <button title={title} onClick={onClick} className={cls}>{children}</button>;
}
