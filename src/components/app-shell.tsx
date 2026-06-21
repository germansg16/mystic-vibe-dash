import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, PackagePlus, Receipt, Boxes, BarChart3, Radar,
  Trophy, Crown, MessageSquare, FlaskConical, Ghost, Code2, Shield,
  LogOut, Menu, X, Activity, Sparkles,
} from "lucide-react";

import { AlphaLogo } from "@/components/alpha-logo";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  premium?: boolean;
  adminOnly?: boolean;
};

const NAV: NavItem[] = [
  { to: "/app/dashboard",   label: "Dashboard",        icon: LayoutDashboard },
  { to: "/app/oracle",      label: "Reg. Producto",    icon: PackagePlus },
  { to: "/app/venta",       label: "Reg. Venta",       icon: Receipt },
  { to: "/app/inventario",  label: "Inventario",       icon: Boxes },
  { to: "/app/analitica",   label: "Analítica",        icon: BarChart3 },
  { to: "/app/radar",       label: "Market Radar",     icon: Radar, premium: true },
  { to: "/app/winners",     label: "Winners",          icon: Trophy, premium: true },
  { to: "/app/leaderboard", label: "Leaderboard",      icon: Crown },
  { to: "/app/qa",          label: "Alpha Oracle Q&A", icon: MessageSquare },
  { to: "/app/stealth",     label: "Stealth Lab",      icon: FlaskConical, premium: true },
  { to: "/app/ghost",       label: "Ghost Monitor",    icon: Ghost, premium: true },
  { to: "/app/api-docs",    label: "API Docs",         icon: Code2 },
  { to: "/app/admin",       label: "Admin Center",     icon: Shield, adminOnly: true },
];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function AppShell() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const now = useNow();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/auth", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
          Cargando sistema…
        </div>
      </div>
    );
  }

  const items = NAV.filter((n) => !n.adminOnly || user.role === "admin");

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar — desktop */}
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-border/60 bg-card/30 backdrop-blur-xl lg:flex">
        <SidebarContent items={items} pathname={pathname} />
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[280px] border-r border-border bg-card animate-in slide-in-from-left duration-300">
            <SidebarContent items={items} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl">
          <button
            className="rounded-md border border-border/60 p-2 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="hidden items-center gap-2 sm:flex">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute inset-0 rounded-full bg-signal animate-pulse-dot" />
                <span className="h-2 w-2 rounded-full bg-signal" />
              </span>
              Sistema operativo
            </span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">v7.8 · FastAPI</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline tabular-nums">{now.toLocaleTimeString("es-ES")}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-signal sm:inline-flex">
              <Sparkles className="h-3 w-3" />
              Alpha · 20€/mes
            </span>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-signal/80 to-signal/30 font-mono text-[10px] font-bold text-signal-foreground">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
              <span className="hidden font-mono text-xs text-foreground sm:inline">{user.username}</span>
              <button
                onClick={() => { logout(); navigate({ to: "/auth" }); }}
                title="Cerrar sesión"
                className="ml-1 rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Ticker / status strip */}
        <div className="border-b border-border/60 bg-card/20">
          <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex items-center gap-2 text-signal">
              <Activity className="h-3 w-3 animate-pulse" /> LIVE
            </span>
            <Tick label="Capital" value="€2,840" />
            <Tick label="ROI" value="+38.4%" tone="signal" />
            <Tick label="Stock" value="75 items" />
            <Tick label="Ventas mes" value="42" />
            <Tick label="Net profit" value="€1,094" tone="signal" />
            <Tick label="Latencia API" value="84ms" />
            <Tick label="Ghost" value="Activo" tone="signal" />
          </div>
        </div>

        <main key={pathname} className="flex-1 px-4 py-6 sm:px-6 lg:px-8 page-enter">
          <Outlet />
        </main>

        <footer className="border-t border-border/60 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
          Alpha Engine · {new Date().getFullYear()} · Vinted resale intelligence
        </footer>
      </div>
    </div>
  );
}

function Tick({ label, value, tone }: { label: string; value: string; tone?: "signal" }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-muted-foreground/70">{label}</span>
      <span className={cn("text-foreground", tone === "signal" && "text-signal")}>{value}</span>
    </span>
  );
}

function SidebarContent({
  items, pathname, onNavigate,
}: { items: NavItem[]; pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border/60 px-5 py-5">
        <AlphaLogo size={36} mode="flicker" />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="font-mono text-sm font-bold tracking-[0.18em] text-signal-gradient text-signal">
            ALPHA ENGINE
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Vinted · v7.8
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {items.map((it, idx) => {
          const active = pathname === it.to || (it.to !== "/app/dashboard" && pathname.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-md px-3 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 nav-item",
                active
                  ? "bg-signal/10 text-signal shadow-[inset_2px_0_0_0_var(--signal)]"
                  : "text-muted-foreground hover:bg-accent/40 hover:text-foreground hover:translate-x-0.5"
              )}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <span className={cn(
                "grid h-6 w-6 place-items-center rounded transition-transform duration-300 group-hover:scale-110",
                active ? "text-signal" : "text-muted-foreground group-hover:text-foreground"
              )}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 truncate">{it.label}</span>
              {it.premium && (
                <span className={cn(
                  "rounded-sm border px-1.5 py-0.5 font-mono text-[8px] tracking-[0.18em]",
                  active
                    ? "border-signal/50 bg-signal/10 text-signal"
                    : "border-warn/40 bg-warn/5 text-warn"
                )}>
                  PRO
                </span>
              )}
              {active && (
                <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-px bg-signal/60 shadow-[0_0_10px_var(--signal)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 p-4">
        <div className="rounded-md border border-signal/30 bg-signal/5 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-signal">Status</p>
          <p className="mt-1 font-mono text-xs text-foreground">Workers ON · 0 errores</p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-card">
            <div className="h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r from-signal to-signal/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title, subtitle, kicker, actions,
}: { title: string; subtitle?: string; kicker?: string; actions?: ReactNode }) {
  return (
    <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        {kicker && (
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-signal">{kicker}</p>
        )}
        <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
