import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Pencil, Trash2, Filter } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/inventario")({
  head: () => ({ meta: [{ title: "Inventario — Alpha Engine" }] }),
  component: Page,
});

type Item = {
  title: string; brand: string; size: string; condition: string;
  listed: string; daysIn: number; cost: number | null; listPrice: number;
  salePrice?: number; ttsDays?: number; url: string;
};

const STOCK: Item[] = [
  { title: "Guantes de Adidas", brand: "adidas Originals", size: "M", condition: "Muy bueno", listed: "10/05/26", daysIn: 542, cost: null, listPrice: 10, url: "#" },
  { title: "Vaquero largo de Bershka", brand: "Bershka", size: "38", condition: "Bueno", listed: "10/05/26", daysIn: 542, cost: null, listPrice: 8, url: "#" },
  { title: "Camiseta Stüssy World Tour", brand: "Stüssy", size: "L", condition: "Como nuevo", listed: "02/06/26", daysIn: 19, cost: 12, listPrice: 35, url: "#" },
  { title: "Zapatillas Nike Air Max", brand: "Nike", size: "42", condition: "Bueno", listed: "12/06/26", daysIn: 9, cost: 25, listPrice: 60, url: "#" },
];
const SOLD: Item[] = [
  { title: "Sudadera Champion Vintage", brand: "Champion", size: "L", condition: "Muy bueno", listed: "01/05/26", daysIn: 18, cost: 10, listPrice: 45, salePrice: 42, ttsDays: 18, url: "#" },
];

function Page() {
  const [tab, setTab] = useState<"stock" | "sold">("stock");
  const items = tab === "stock" ? STOCK : SOLD;

  return (
    <div className="space-y-5">
      <PageHeader kicker="Operación · armario" title="Inventario"
        subtitle="Control completo de tu stock y ventas en Vinted." />

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="flex gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
          <TabBtn active={tab === "stock"} onClick={() => setTab("stock")}>En stock ({STOCK.length})</TabBtn>
          <TabBtn active={tab === "sold"}  onClick={() => setTab("sold")}>Vendidos ({SOLD.length})</TabBtn>
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
                {tab === "sold" && <><Th>Venta</Th><Th>Net</Th><Th>ROI</Th></>}
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => {
                const net = it.salePrice && it.cost ? it.salePrice - it.cost - it.salePrice * 0.05 : null;
                const roi = net && it.cost ? (net / it.cost) * 100 : null;
                return (
                  <tr key={i} className="border-b border-border/40 last:border-none transition-colors duration-300 hover:bg-background/40">
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
                      <Td className="font-mono tabular-nums text-signal">€{net?.toFixed(2)}</Td>
                      <Td className="font-mono tabular-nums text-signal">+{roi?.toFixed(0)}%</Td>
                    </>}
                    <Td>
                      <div className="flex items-center gap-1">
                        <IconBtn title="Ver en Vinted" href={it.url}><ExternalLink className="h-3.5 w-3.5" /></IconBtn>
                        <IconBtn title="Editar"><Pencil className="h-3.5 w-3.5" /></IconBtn>
                        <IconBtn title="Eliminar" tone="danger"><Trash2 className="h-3.5 w-3.5" /></IconBtn>
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
      active ? "bg-signal/15 text-signal" : "text-muted-foreground hover:text-foreground"
    }`}>{children}</button>
  );
}
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left font-normal">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function IconBtn({ children, title, href, tone }:
  { children: React.ReactNode; title: string; href?: string; tone?: "danger" }) {
  const cls = `grid h-7 w-7 place-items-center rounded border border-transparent transition-all duration-300 ${
    tone === "danger"
      ? "text-muted-foreground hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
      : "text-muted-foreground hover:border-border hover:bg-background hover:text-foreground"
  }`;
  return href
    ? <a href={href} title={title} className={cls}>{children}</a>
    : <button title={title} className={cls}>{children}</button>;
}
