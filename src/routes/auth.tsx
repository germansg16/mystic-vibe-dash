import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Lock, User } from "lucide-react";

import { AlphaLogo } from "@/components/alpha-logo";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Alpha Engine — Acceso" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { user, ready, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/app/dashboard", replace: true });
  }, [ready, user, navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const res = login(username.trim(), password);
      if (!res.ok) { setError(res.error || "Error"); setLoading(false); return; }
      navigate({ to: "/app/dashboard", replace: true });
    }, 450);
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      {/* Background grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />

      <div className="page-enter relative w-full max-w-[440px] rounded-xl border border-border/60 bg-card/70 p-8 shadow-deep backdrop-blur-xl">
        <div className="mb-7 flex flex-col items-center gap-3 text-center">
          <AlphaLogo size={64} mode="flicker" />
          <div>
            <h1 className="font-mono text-xl font-bold tracking-[0.18em] text-signal">ALPHA ENGINE</h1>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Acceso operador · v7.8
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field
            icon={<User className="h-3.5 w-3.5" />}
            label="Usuario"
            value={username}
            onChange={setUsername}
            placeholder="admin"
            autoFocus
          />
          <Field
            icon={<Lock className="h-3.5 w-3.5" />}
            label="Contraseña"
            value={password}
            onChange={setPassword}
            placeholder="admin"
            type="password"
          />

          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 font-mono text-[11px] text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-signal to-signal/70 px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-signal-foreground transition-all duration-300 hover:shadow-[0_0_30px_-4px_var(--signal)] active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Conectando…" : "Entrar"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Demo · usuario <span className="text-signal">admin</span> · pwd <span className="text-signal">admin</span>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  icon, label, value, onChange, placeholder, type = "text", autoFocus,
}: {
  icon: React.ReactNode; label: string; value: string;
  onChange: (v: string) => void; placeholder?: string; type?: string; autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {icon} {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-md border border-border bg-background/60 px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-signal focus:bg-background focus:shadow-[0_0_0_3px_oklch(0.86_0.2_142_/_0.15)]"
      />
    </label>
  );
}
