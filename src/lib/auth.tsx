import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { username: string; role: "admin" | "user" };
type AuthCtx = {
  user: User | null;
  ready: boolean;
  login: (u: string, p: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "alpha_engine_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const login: AuthCtx["login"] = (u, p) => {
    if (u === "admin" && p === "admin") {
      const next: User = { username: "admin", role: "admin" };
      localStorage.setItem(KEY, JSON.stringify(next));
      setUser(next);
      return { ok: true };
    }
    return { ok: false, error: "Credenciales inválidas. Prueba admin / admin." };
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, ready, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
