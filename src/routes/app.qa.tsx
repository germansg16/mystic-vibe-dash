import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, MessageSquare, Clock, CheckCircle2, AlertCircle, Send, X } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/qa")({
  head: () => ({ meta: [{ title: "Oráculo Alpha — Tickets" }] }),
  component: Page,
});

type Status = "abierto" | "respondido" | "cerrado";
type Reply = { from: "user" | "soporte"; text: string; at: string };
type Ticket = {
  id: string; title: string; category: string;
  status: Status; created: string; replies: Reply[];
};

const INITIAL: Ticket[] = [
  {
    id: "ALP-1042", title: "¿Cómo subo el coste de varios productos a la vez?",
    category: "Inventario", status: "respondido", created: "hace 2h",
    replies: [
      { from: "user", text: "Tengo 40 productos sin coste registrado, ¿hay forma masiva?", at: "hace 2h" },
      { from: "soporte", text: "Sí, desde Inventario → Filtros → Sin coste, puedes editarlos en lote. Te lo dejamos activado.", at: "hace 1h" },
    ],
  },
  {
    id: "ALP-1041", title: "Ghost Monitor no detecta mis nuevas subidas",
    category: "Monitor Fantasma", status: "abierto", created: "hace 5h", replies: [
      { from: "user", text: "He subido 3 productos esta mañana y el bot no los ve.", at: "hace 5h" },
    ],
  },
  {
    id: "ALP-1037", title: "Recomendación de precio para chaquetas vintage",
    category: "Estrategia", status: "cerrado", created: "ayer", replies: [
      { from: "user", text: "¿Qué horquilla recomendáis para Carhartt 90s?", at: "ayer" },
      { from: "soporte", text: "Entre €95 y €130 según condición. Datos en Analítica → Vintage.", at: "ayer" },
    ],
  },
];

function Page() {
  const [tickets, setTickets] = useState(INITIAL);
  const [open, setOpen] = useState<Ticket | null>(null);
  const [creating, setCreating] = useState(false);

  function create(t: Omit<Ticket, "id" | "status" | "created" | "replies"> & { text: string }) {
    const ticket: Ticket = {
      id: `ALP-${1043 + tickets.length}`, title: t.title, category: t.category,
      status: "abierto", created: "ahora",
      replies: [{ from: "user", text: t.text, at: "ahora" }],
    };
    setTickets((p) => [ticket, ...p]);
    setCreating(false);
    setOpen(ticket);
  }

  function reply(text: string) {
    if (!open) return;
    const updated = { ...open, replies: [...open.replies, { from: "user" as const, text, at: "ahora" }] };
    setOpen(updated);
    setTickets((p) => p.map((t) => (t.id === open.id ? updated : t)));
  }

  return (
    <div className="space-y-6">
      <PageHeader kicker="Soporte premium · Pro" title="Oráculo Alpha"
        subtitle="Sistema de tickets. Pregúntanos cualquier cosa y te ayudamos en horas."
        actions={
          <button onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
            <Plus className="h-3.5 w-3.5" /> Nuevo ticket
          </button>
        } />

      <div className="grid gap-3 md:grid-cols-3">
        <Kpi label="Abiertos" value={tickets.filter((t) => t.status === "abierto").length} icon={AlertCircle} tone="warn" />
        <Kpi label="Respondidos" value={tickets.filter((t) => t.status === "respondido").length} icon={MessageSquare} tone="signal" />
        <Kpi label="Resp. media" value="42min" icon={Clock} />
      </div>

      <ul className="space-y-2">
        {tickets.map((t) => (
          <li key={t.id}>
            <button onClick={() => setOpen(t)}
              className="group flex w-full items-center gap-4 rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-left transition-all hover:border-signal/40 hover:bg-signal/[0.03]">
              <StatusDot s={t.status} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="text-signal">{t.id}</span>
                  <span>·</span>
                  <span>{t.category}</span>
                  <span>·</span>
                  <span>{t.created}</span>
                </div>
                <p className="mt-1 truncate text-sm font-medium text-foreground">{t.title}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {t.replies.length} msg
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && <TicketModal ticket={open} onClose={() => setOpen(null)} onReply={reply} />}
      {creating && <CreateModal onClose={() => setCreating(false)} onCreate={create} />}
    </div>
  );
}

function StatusDot({ s }: { s: Status }) {
  const cfg = s === "abierto" ? { c: "bg-warn", t: "text-warn" }
            : s === "respondido" ? { c: "bg-signal", t: "text-signal" }
            : { c: "bg-muted-foreground", t: "text-muted-foreground" };
  return <span className={`relative grid h-2 w-2 place-items-center ${cfg.t}`}>
    {s === "abierto" && <span className="absolute inset-0 rounded-full bg-warn animate-ping opacity-60" />}
    <span className={`h-2 w-2 rounded-full ${cfg.c}`} />
  </span>;
}

function Kpi({ label, value, icon: Icon, tone }: { label: string; value: number | string; icon: typeof Clock; tone?: "signal" | "warn" }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <Icon className={`h-4 w-4 ${tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-muted-foreground"}`} />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      </div>
      <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

function TicketModal({ ticket, onClose, onReply }: { ticket: Ticket; onClose: () => void; onReply: (t: string) => void }) {
  const [msg, setMsg] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="flex w-[min(640px,94vw)] max-h-[88vh] flex-col rounded-xl border border-border bg-card shadow-2xl animate-in zoom-in-95">
        <header className="flex items-start justify-between border-b border-border/60 p-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">{ticket.id} · {ticket.category}</p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{ticket.title}</h3>
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-4 w-4" /></button>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {ticket.replies.map((r, i) => (
            <div key={i} className={`flex ${r.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${
                r.from === "user" ? "bg-signal/15 text-foreground" : "border border-border/60 bg-background/60 text-foreground"
              }`}>
                <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  {r.from === "soporte" ? "Soporte Alpha" : "Tú"} · {r.at}
                </p>
                {r.text}
              </div>
            </div>
          ))}
        </div>
        <form className="flex gap-2 border-t border-border/60 p-3" onSubmit={(e) => { e.preventDefault(); if (msg.trim()) { onReply(msg.trim()); setMsg(""); } }}>
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Escribe tu respuesta…"
            className="flex-1 rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-signal" />
          <button className="inline-flex items-center gap-2 rounded-md bg-signal px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground">
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (t: { title: string; category: string; text: string }) => void }) {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("Inventario");
  const [text, setText] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-[min(520px,92vw)] rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">Nuevo ticket</p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">Cuéntanos qué necesitas</h3>
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); if (title && text) onCreate({ title, category: cat, text }); }}>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Asunto</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-signal" />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Categoría</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)}
              className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-signal">
              {["Inventario", "Monitor Fantasma", "Estrategia", "Cuenta", "Otros"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Descripción</span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
              className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-signal" />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">Cancelar</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
              <CheckCircle2 className="h-3.5 w-3.5" /> Crear ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
