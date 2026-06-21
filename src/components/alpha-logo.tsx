import { Link } from "@tanstack/react-router";

import logoAsset from "@/assets/alpha-logo.png.asset.json";

type Props = { size?: number; className?: string; mode?: "flicker" | "pulse" };

export function AlphaLogo({ size = 56, className = "", mode = "pulse" }: Props) {
  const anim = mode === "flicker" ? "animate-led-flicker" : "animate-led-pulse";
  return (
    <span className={`relative inline-flex shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Soft halo */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[22%] blur-2xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, oklch(0.86 0.22 142 / 0.55), transparent 65%)",
        }}
      />
      {/* The logo itself */}
      <img
        src={logoAsset.url}
        alt="Alpha Engine"
        width={size}
        height={size}
        className={`relative z-10 ${anim} rounded-[22%]`}
        draggable={false}
      />
      {/* Top scan-line — faux LED circuit sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[22%] opacity-60 mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.92 0.22 142 / 0.55) 50%, transparent 100%)",
          backgroundSize: "100% 30%",
          backgroundRepeat: "no-repeat",
          animation: "scan-line 3.6s linear infinite",
        }}
      />
    </span>
  );
}

export function LogoLink() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3">
      <AlphaLogo size={36} mode="flicker" />
      <span className="flex flex-col leading-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground group-hover:text-foreground/80 transition-colors">
          Alpha
        </span>
        <span className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground">
          ENGINE
        </span>
      </span>
    </Link>
  );
}
