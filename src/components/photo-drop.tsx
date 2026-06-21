import { useRef, useState } from "react";
import { Upload, ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type PhotoAnalysis = {
  title: string;
  brand: string;
  category: string;
  size: string;
  condition: string;
  color: string;
  description: string;
  suggestedPrice: number;
  confidence: number;
};

const SAMPLE: PhotoAnalysis[] = [
  {
    title: "Bolso Longchamp azul marino talla L",
    brand: "Longchamp",
    category: "Bolsos de hombro",
    size: "L",
    condition: "Muy bueno",
    color: "Azul marino · Dorado",
    description: "Bolso de hombro Longchamp con detalles en dorado. Piel en excelente estado. Incluye certificado de compra.",
    suggestedPrice: 60,
    confidence: 0.92,
  },
  {
    title: "Sudadera Nike Tech Fleece negra",
    brand: "Nike",
    category: "Sudaderas",
    size: "M",
    condition: "Como nuevo",
    color: "Negro",
    description: "Sudadera Nike Tech Fleece en negro. Bolsillo con cremallera. Sin uso visible.",
    suggestedPrice: 48,
    confidence: 0.87,
  },
  {
    title: "Vaquero Levi's 501 vintage",
    brand: "Levi's",
    category: "Vaqueros",
    size: "32",
    condition: "Bueno",
    color: "Azul lavado",
    description: "Levi's 501 vintage corte recto. Lavado azul medio, sin roturas.",
    suggestedPrice: 35,
    confidence: 0.81,
  },
];

export function PhotoDrop({
  onAnalyze,
  label = "Sube la foto del producto",
}: {
  onAnalyze: (data: PhotoAnalysis) => void;
  label?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setBusy(true);
    setDone(false);
    setTimeout(() => {
      const data = SAMPLE[Math.floor(Math.random() * SAMPLE.length)];
      setBusy(false);
      setDone(true);
      onAnalyze(data);
    }, 1400);
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <label
        className={cn(
          "relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed transition-all duration-300",
          preview ? "border-signal/40" : "border-border/60 hover:border-signal/40 hover:bg-signal/[0.03]"
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {preview ? (
          <>
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
            {busy && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm">
                <div className="grid place-items-center">
                  <span className="absolute h-16 w-16 rounded-full border-2 border-signal/30 animate-ping" />
                  <Loader2 className="h-6 w-6 animate-spin text-signal" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
                  Analizando con Oracle…
                </p>
              </div>
            )}
            {done && !busy && (
              <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-md border border-signal/40 bg-signal/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
                <CheckCircle2 className="h-3 w-3" /> Detectado
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-signal/10 text-signal animate-float">
              <ImageIcon className="h-5 w-5" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">Arrastra una imagen o haz click</p>
          </div>
        )}
      </label>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <Upload className="h-3 w-3" /> {preview ? "Cambiar imagen" : "Seleccionar archivo"}
      </button>
    </div>
  );
}
