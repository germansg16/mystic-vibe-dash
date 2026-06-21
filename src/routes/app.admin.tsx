import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Users, UserPlus, Crown, Ban, Gift, Ticket, X, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Administración — Alpha Engine" }] }),
  component: Page,
});

type Plan = "Free" | "Prime" | "Pro";
type State = "Activo" | "Baneado";
type User = { id: string; user: string; email: string; plan: Plan; state: State; joined: string; months: number };

const INITIAL: User[] = [
  { id: "u1", user: "alpha_admin",  email: "admin@alpha.io",   plan: "Pro",   state: "Activo",   joined: "01/01/26", months: 0 },
  { id: "u2", user: "vintedking",   email: "k@vintedking.es",  plan: "Prime", state: "Activo",   joined: "12/02/26", months: 3 },
  { id: "u3", user: "resell.kim",   email: "kim@resell.com",   plan: "Prime", state: "Activo",   joined: "03/03/26", months: 1 },
  { id: "u4", user: "ghost42",      email: "g42@mail.com",     plan: "Free",  state: "Activo",   joined: "21/04/26", months: 0 },
  { id: "u5", user: "spam_user",    email: "spam@x.com",       plan: "Free",  state: "Baneado",  joined: "10/05/26", months: 0 },
];

const CODES = [
  { code: "ALPHA50", discount: "50%", uses: "12/100", expires: "31/12/26" },
  { code: "WELCOME", discount: "20%", uses: "187/∞", expires: "—" },
];

function Page() {
  const [users, setUsers] = useState(INITIAL);
  const [creating, setCreating] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [codes, setCodes] = useState(CODES);
  const [codeOpen, setCodeOpen] = useState(false);

  function update(id: string, patch: Partial<User>) {
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    setMenu(null);
  }
  function remove(id: string) {
    setUsers((u) => u.filter((x) => x.id !== id));
    setMenu(null);
  }
  function create(u: Omit<User, "id" | "joined" | "months" | "state">) {
    setUsers((p) => [{ ...u, id: `u${Date.now()}`, joined: "hoy", months: 0, state: "Activo" }, ...p]);
    setCreating(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader kicker="Centro de control · solo admins" title="Administración"
        subtitle="Gestiona usuarios, planes, meses gratis y códigos de descuento." />

      <div className="grid gap-3 md:grid-cols-4">
        <Kpi icon={Users}  label="Usuarios"   value={users.length.toString()} />
        <Kpi icon={Crown}  label="Prime/Pro"  value={users.filter((u) => u.plan !== "Free").length.toString()} tone="signal" />
        <Kpi icon={Ban}    label="Baneados"   value={users.filter((u) => u.state === "Baneado").length.toString()} tone="warn" />
        <Kpi icon={Ticket} label="Códigos"    value={codes.length.toString()} />
      </div>

      {/* Users */}
      <section className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Usuarios</h2>
          <button onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-md bg-signal px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
            <UserPlus className="h-3 w-3" /> Crear usuario
          </button>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-normal">Usuario</th>
                <th className="px-4 py-3 text-left font-normal">Plan</th>
                <th className="px-4 py-3 text-left font-normal">Estado</th>
                <th className="px-4 py-3 text-left font-normal">Alta</th>
                <th className="px-4 py-3 text-right font-normal">Meses gratis</th>
                <th className="px-4 py-3 text-right font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="relative border-t border-border/40 transition-colors hover:bg-background/40">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{u.user}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="px-4 py-3"><Pill tone={u.plan === "Pro" ? "signal" : u.plan === "Prime" ? "warn" : "muted"}>{u.plan}</Pill></td>
                  <td className="px-4 py-3"><Pill tone={u.state === "Activo" ? "signal" : "danger"}>{u.state}</Pill></td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{u.joined}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground">{u.months}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setMenu(menu === u.id ? null : u.id)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                    {menu === u.id && (
                      <div className="absolute right-4 z-20 mt-1 w-56 rounded-md border border-border bg-card p-1 shadow-xl animate-in fade-in zoom-in-95">
                        <MenuItem onClick={() => update(u.id, { plan: "Prime" })}><Crown className="h-3 w-3" /> Dar de alta Prime</MenuItem>
                        <MenuItem onClick={() => update(u.id, { plan: "Free" })}><Crown className="h-3 w-3" /> Dar de baja</MenuItem>
                        <MenuItem onClick={() => update(u.id, { months: u.months + 1 })}><Gift className="h-3 w-3" /> +1 mes gratis</MenuItem>
                        <MenuItem onClick={() => update(u.id, { state: u.state === "Activo" ? "Baneado" : "Activo" })}><Ban className="h-3 w-3" /> {u.state === "Activo" ? "Banear" : "Desbanear"}</MenuItem>
                        <MenuItem danger onClick={() => remove(u.id)}><X className="h-3 w-3" /> Eliminar</MenuItem>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Codes */}
      <section className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Códigos de descuento</h2>
          <button onClick={() => setCodeOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground hover:bg-accent">
            <Ticket className="h-3 w-3" /> Nuevo código
          </button>
        </header>
        <table className="w-full text-sm">
          <thead className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-normal">Código</th>
                <th className="px-4 py-3 text-left font-normal">Descuento</th>
                <th className="px-4 py-3 text-left font-normal">Usos</th>
                <th className="px-4 py-3 text-left font-normal">Expira</th></tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.code} className="border-t border-border/40 hover:bg-background/40">
                <td className="px-4 py-3 font-mono font-bold text-signal">{c.code}</td>
                <td className="px-4 py-3 font-mono">{c.discount}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{c.uses}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{c.expires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* System */}
      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h3 className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground">
          <Shield className="h-3.5 w-3.5 text-signal" /> Sistema
        </h3>
        <ul className="grid gap-2 font-mono text-xs text-muted-foreground sm:grid-cols-2">
          <li className="flex justify-between border-b border-border/40 pb-2"><span>API</span><span className="text-signal">OK</span></li>
          <li className="flex justify-between border-b border-border/40 pb-2"><span>Celery</span><span className="text-signal">OK</span></li>
          <li className="flex justify-between border-b border-border/40 pb-2"><span>Redis</span><span className="text-signal">OK</span></li>
          <li className="flex justify-between"><span>Vinted scraper</span><span className="text-warn">DEGRADED</span></li>
        </ul>
      </section>

      {creating && <CreateModal onClose={() => setCreating(false)} onCreate={create} />}
      {codeOpen && <CodeModal onClose={() => setCodeOpen(false)} onCreate={(c) => { setCodes((p) => [c, ...p]); setCodeOpen(false); }} />}
    </div>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone: "signal" | "warn" | "danger" | "muted" }) {
  const cls = tone === "signal" ? "border-signal/40 bg-signal/10 text-signal"
            : tone === "warn"   ? "border-warn/40 bg-warn/10 text-warn"
            : tone === "danger" ? "border-destructive/40 bg-destructive/10 text-destructive"
            :                     "border-border bg-card text-muted-foreground";
  return <span className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${cls}`}>{children}</span>;
}
function MenuItem({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
      danger ? "text-destructive hover:bg-destructive/10" : "text-foreground hover:bg-accent"
    }`}>{children}</button>
  );
}
function Kpi({ icon: Icon, label, value, tone }: { icon: typeof Users; label: string; value: string; tone?: "signal" | "warn" }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4 transition-all hover:border-signal/40 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <Icon className={`h-4 w-4 ${tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-muted-foreground"}`} />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      </div>
      <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${tone === "signal" ? "text-signal" : tone === "warn" ? "text-warn" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (u: { user: string; email: string; plan: Plan }) => void }) {
  const [user, setUser] = useState(""); const [email, setEmail] = useState(""); const [plan, setPlan] = useState<Plan>("Free");
  return (
    <Modal title="Crear usuario" onClose={onClose}>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (user && email) onCreate({ user, email, plan }); }}>
        <In label="Usuario" value={user} onChange={setUser} />
        <In label="Email" value={email} onChange={setEmail} />
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Plan</span>
          <select value={plan} onChange={(e) => setPlan(e.target.value as Plan)}
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-signal">
            <option>Free</option><option>Prime</option><option>Pro</option>
          </select>
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">Cancelar</button>
          <button type="submit" className="rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">Crear</button>
        </div>
      </form>
    </Modal>
  );
}
function CodeModal({ onClose, onCreate }: { onClose: () => void; onCreate: (c: typeof CODES[number]) => void }) {
  const [code, setCode] = useState(""); const [discount, setDiscount] = useState("20%"); const [expires, setExpires] = useState("");
  return (
    <Modal title="Nuevo código" onClose={onClose}>
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (code) onCreate({ code: code.toUpperCase(), discount, uses: "0/∞", expires: expires || "—" }); }}>
        <In label="Código" value={code} onChange={setCode} />
        <In label="Descuento" value={discount} onChange={setDiscount} />
        <In label="Expira" value={expires} onChange={setExpires} placeholder="dd/mm/aa" />
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">Cancelar</button>
          <button type="submit" className="rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">Crear</button>
        </div>
      </form>
    </Modal>
  );
}
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-[min(440px,92vw)] rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function In({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-signal" />
    </label>
  );
}
