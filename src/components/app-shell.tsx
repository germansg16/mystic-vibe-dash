import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LayoutDashboard, PackagePlus, Receipt, Boxes, BarChart3, Radar,
  Trophy, Crown, MessageSquare, FlaskConical, Ghost, Shield,
  LogOut, Menu, Sparkles,
} from "lucide-react";

import { AlphaLogo } from "@/components/alpha-logo";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  group: "Operación" | "Inteligencia" | "Comunidad" | "Sistema";
  premium?: boolean;
  adminOnly?: boolean;
};

const NAV: NavItem[] = [
  { to: "/app/dashboard",   label: "Dashboard",     icon: LayoutDashboard, group: "Operación" },
  { to: "/app/oracle",      label: "Reg. Producto", icon: PackagePlus,     group: "Operación" },
  { to: "/app/venta",       label: "Reg. Venta",    icon: Receipt,         group: "Operación" },
  { to: "/app/inventario",  label: "Inventario",    icon: Boxes,           group: "Operación" },
  { to: "/app/analitica",   label: "Analítica",     icon: BarChart3,       group: "Inteligencia" },
  { to: "/app/radar",       label: "Market Radar",  icon: Radar,           group: "Inteligencia", premium: true },
  { to: "/app/winners",     label: "Ganadores",     icon: Trophy,          group: "Inteligencia", premium: true },
  { to: "/app/ghost",       label: "Monitor Fantasma", icon: Ghost,        group: "Inteligencia", premium: true },
  { to: "/app/leaderboard", label: "Leaderboard",   icon: Crown,           group: "Comunidad" },
  { to: "/app/qa",          label: "Oráculo Alpha", icon: MessageSquare,   group: "Comunidad" },
  { to: "/app/stealth",     label: "Laboratorio",   icon: FlaskConical,    group: "Sistema", premium: true },
  { to: "/app/admin",       label: "Admin",         icon: Shield,          group: "Sistema", adminOnly: true },
];

const GROUP_ORDER: NavItem["group"][] = ["Operación", "Inteligencia", "Comunidad", "Sistema"];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function AppShell() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
    <div className="relative flex min-h-screen w-full bg-background text-foreground">
      {/* Ambient layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-signal/[0.08] blur-[120px]" />
      </div>

      {/* Sidebar — desktop */}
      <aside
        className={cn(
          "sticky top-0 z-20 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-border/50 bg-card/30 backdrop-blur-xl transition-[width] duration-300 ease-out lg:flex",
          collapsed ? "w-0 border-r-0" : "w-[240px]"
        )}
      >
        <div className={cn("h-full w-[240px] transition-opacity duration-200", collapsed && "opacity-0")}>
          <SidebarContent items={items} pathname={pathname} onNavigate={() => {}} />
        </div>
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[260px] border-r border-border bg-card animate-in slide-in-from-left duration-300">
            <SidebarContent
              items={items}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/50 bg-background/70 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            className="group flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-2.5 py-1.5 text-muted-foreground transition-all hover:border-signal/40 hover:text-signal"
            onClick={() => {
              if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
                setCollapsed((c) => !c);
              } else {
                setMobileOpen(true);
              }
            }}
            aria-label="Alternar menú"
            title="Alternar menú"
          >
            <Menu className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] sm:inline">
              Menú
            </span>
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute inset-0 rounded-full bg-signal animate-pulse-dot" />
              <span className="h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="hidden sm:inline">Sistema operativo</span>
            <span className="hidden md:inline text-muted-foreground/50">·</span>
            <span className="hidden md:inline tabular-nums">{now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-signal sm:inline-flex">
              <Sparkles className="h-3 w-3" />
              Alpha
            </span>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-2.5 py-1">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-signal/80 to-signal/30 font-mono text-[10px] font-bold text-signal-foreground">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
              <span className="hidden font-mono text-xs text-foreground sm:inline">{user.username}</span>
              <button
                onClick={() => { logout(); navigate({ to: "/auth" }); }}
                title="Cerrar sesión"
                className="ml-0.5 rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        <main key={pathname} className="relative flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8 page-enter">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


function SidebarContent({
  items, pathname, onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const grouped = useMemo(() => {
    const map = new Map<NavItem["group"], NavItem[]>();
    for (const g of GROUP_ORDER) map.set(g, []);
    items.forEach((it) => map.get(it.group)!.push(it));
    return GROUP_ORDER.map((g) => [g, map.get(g) ?? []] as const).filter(([, v]) => v.length);
  }, [items]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border/50 px-4 py-5">
        <AlphaLogo size={34} mode="flicker" />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="font-mono text-sm font-bold tracking-[0.18em] text-signal">
            ALPHA
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Engine · v7.8
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {grouped.map(([group, list], gi) => (
          <div key={group} className={cn(gi > 0 && "mt-4")}>
            <p className="px-3 pb-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground/60">
              {group}
            </p>
            <div className="space-y-0.5">
              {list.map((it, idx) => {
                const active = pathname === it.to;
                const Icon = it.icon;
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-md px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 nav-item",
                      active
                        ? "bg-signal/10 text-signal"
                        : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                    )}
                    style={{ animationDelay: `${(gi * 4 + idx) * 25}ms` }}
                  >
                    {active && (
                      <span aria-hidden className="absolute inset-y-1 left-0 w-[2px] rounded-r bg-signal shadow-[0_0_8px_var(--signal)]" />
                    )}
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.premium && (
                      <span className={cn(
                        "rounded-sm px-1 py-px font-mono text-[8px] tracking-[0.18em]",
                        active ? "bg-signal/15 text-signal" : "bg-warn/10 text-warn/80"
                      )}>
                        PRO
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

    </div>
  );
}

export function PageHeader({
  title, subtitle, kicker, actions,
}: { title: string; subtitle?: string; kicker?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        {kicker && (
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-signal">{kicker}</p>
        )}
        <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
