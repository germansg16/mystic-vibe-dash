import { createFileRoute } from "@tanstack/react-router";
import { Shield, Users, ServerCog, Database } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin Center — Alpha Engine" }] }),
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader kicker="Centro de control" title="Admin Center"
        subtitle="Solo visible para operadores con rol admin." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card icon={Users} label="Usuarios" value="1,284" sub="+12 esta semana" />
        <Card icon={ServerCog} label="Workers ON" value="8 / 8" sub="0 errores" tone="signal" />
        <Card icon={Database} label="DB latencia" value="84 ms" sub="estable" />
        <Card icon={Shield} label="Sesiones" value="312" sub="activas" />
      </div>

      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-foreground">Sistema</h3>
        <ul className="space-y-2 font-mono text-xs text-muted-foreground">
          <li className="flex justify-between border-b border-border/40 pb-2"><span>API</span><span className="text-signal">OK</span></li>
          <li className="flex justify-between border-b border-border/40 pb-2"><span>Celery</span><span className="text-signal">OK</span></li>
          <li className="flex justify-between border-b border-border/40 pb-2"><span>Redis</span><span className="text-signal">OK</span></li>
          <li className="flex justify-between"><span>Vinted scraper</span><span className="text-warn">DEGRADED</span></li>
        </ul>
      </section>
    </div>
  );
}

function Card({ icon: Icon, label, value, sub, tone }:
  { icon: typeof Shield; label: string; value: string; sub: string; tone?: "signal" }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-5 transition-all duration-500 hover:border-signal/40 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      </div>
      <p className={`mt-2 font-mono text-2xl font-bold tabular-nums ${tone === "signal" ? "text-signal" : "text-foreground"}`}>{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{sub}</p>
    </div>
  );
}
