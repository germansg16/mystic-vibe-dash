import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/app/qa")({
  head: () => ({ meta: [{ title: "Alpha Oracle — Alpha Engine" }] }),
  component: Page,
});

type Msg = { role: "user" | "oracle"; text: string };

function Page() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "oracle", text: "Soy Alpha Oracle. Pregúntame por precios, marcas o estrategias de reselling en Vinted." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "oracle", text: `Análisis: "${q}" — la demanda está en alza un 18% esta semana. Precio óptimo entre €22 y €28.` }]);
    }, 600);
  }

  return (
    <div className="space-y-6">
      <PageHeader kicker="Asistente predictivo" title="Preguntas & Respuestas · Alpha Oracle"
        subtitle="Consulta tendencias, precios y estrategias en lenguaje natural." />

      <div className="flex h-[58vh] flex-col overflow-hidden rounded-lg border border-border/60 bg-card/40">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-lg px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-signal/20 text-foreground"
                  : "border border-border/60 bg-background/60 text-foreground"
              }`}>
                {m.role === "oracle" && (
                  <p className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                    <Sparkles className="h-3 w-3" /> Oracle
                  </p>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t border-border/60 p-3">
          <span className="grid place-items-center pl-2 text-muted-foreground"><MessageSquare className="h-4 w-4" /></span>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="¿Qué quieres saber?"
            className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50" />
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground hover:shadow-[0_0_24px_-4px_var(--signal)]">
            <Send className="h-3.5 w-3.5" /> Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
