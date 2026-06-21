import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/api-docs")({
  head: () => ({ meta: [{ title: "API Docs — Alpha Engine" }] }),
  component: Page,
});

const ENDPOINTS = [
  { m: "GET",    p: "/api/v1/inventory",       d: "Lista productos en armario." },
  { m: "POST",   p: "/api/v1/inventory",       d: "Registra un nuevo producto." },
  { m: "POST",   p: "/api/v1/sales",           d: "Registra una venta." },
  { m: "GET",    p: "/api/v1/ghost/status",    d: "Estado del Ghost Monitor." },
  { m: "POST",   p: "/api/v1/ghost/scan",      d: "Lanza escaneo inmediato." },
  { m: "GET",    p: "/api/v1/leaderboard",     d: "Ranking global mensual." },
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader kicker="Integración" title="API Docs" subtitle="Endpoints autenticados de Alpha Engine v7.8 (FastAPI)." />

      <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-card/60 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-normal">Método</th>
                <th className="px-4 py-3 text-left font-normal">Endpoint</th>
                <th className="px-4 py-3 text-left font-normal">Descripción</th></tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((e) => (
              <tr key={e.p} className="border-b border-border/40 last:border-none transition-colors hover:bg-background/40">
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                    e.m === "GET" ? "bg-signal/15 text-signal" : "bg-warn/15 text-warn"
                  }`}>{e.m}</span>
                </td>
                <td className="px-4 py-3 font-mono text-foreground">{e.p}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-lg border border-border/60 bg-card/40 p-5">
        <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-foreground">Ejemplo · cURL</h3>
        <pre className="mt-3 overflow-x-auto rounded-md border border-border/40 bg-background/60 p-4 font-mono text-[11px] text-muted-foreground">
{`curl https://api.alphaengine.io/v1/inventory \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        </pre>
      </section>
    </div>
  );
}
