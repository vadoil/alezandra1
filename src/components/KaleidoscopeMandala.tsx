import { useEffect, useState } from "react";

type Props = {
  images: string[];
  intervalMs?: number;
  className?: string;
};

/**
 * Калейдоскоп-мандала в стиле индийского лотоса:
 * фото проступают сквозь маску из 8 лепестков + центрального круга,
 * сверху наслаивается орнамент Flower-of-Life и контур лотоса.
 */
export function KaleidoscopeMandala({ images, intervalMs = 3800, className = "" }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  // 8-лепестковый лотос: центральный круг + лепестки в форме «капли»
  const petalsOuter = Array.from({ length: 8 });

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: "1 / 1" }}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id="lotus-clip" clipPathUnits="objectBoundingBox">
            <circle cx="0.5" cy="0.5" r="0.34" />
            {petalsOuter.map((_, i) => {
              const a = (i * 360) / 8;
              return (
                <path
                  key={i}
                  d="M0.5,0.06 C0.58,0.18 0.58,0.32 0.5,0.42 C0.42,0.32 0.42,0.18 0.5,0.06 Z"
                  transform={`rotate(${a} 0.5 0.5)`}
                />
              );
            })}
          </clipPath>
        </defs>
      </svg>

      {/* Серый круг-подложка — чуть меньше внешнего вращающегося кольца */}
      <div className="absolute inset-[4%] rounded-full bg-ink/10" aria-hidden />

      {/* Внешний контур-лотос (вращается медленно) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -inset-[6%] w-[112%] h-[112%] text-primary/80 animate-[mandala-spin_80s_linear_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* большой круг рамка */}
        <circle cx="100" cy="100" r="98" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="92" strokeWidth="0.5" opacity="0.6" />
        <circle cx="100" cy="100" r="86" strokeWidth="0.3" opacity="0.4" />

        {/* 24 длинных лепестков лотоса по периметру */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 360) / 24;
          return (
            <path
              key={`pl-${i}`}
              d="M100,2 C110,26 110,50 100,72 C90,50 90,26 100,2 Z"
              transform={`rotate(${a} 100 100)`}
              strokeWidth="0.6"
            />
          );
        })}
      </svg>

      {/* Flower-of-life — пересекающиеся круги (статично) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[10%] w-[80%] h-[80%] text-primary/40 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        aria-hidden
      >
        <circle cx="100" cy="100" r="42" />
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * 360) / 6;
          const rad = (a * Math.PI) / 180;
          const cx = 100 + Math.cos(rad - Math.PI / 2) * 42;
          const cy = 100 + Math.sin(rad - Math.PI / 2) * 42;
          return <circle key={`fol-${i}`} cx={cx} cy={cy} r="42" />;
        })}
      </svg>

      {/* Стек фото внутри лепестковой маски */}
      <div
        className="absolute inset-[5%] overflow-hidden"
        style={{ clipPath: "url(#lotus-clip)", WebkitClipPath: "url(#lotus-clip)" }}
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[1600ms] ease-in-out"
            style={{
              opacity: i === active ? 1 : 0,
              transform: `scale(${i === active ? 1 : 1.12}) rotate(${i === active ? 0 : 6}deg)`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Внутренний цветок-сердцевина (вращается обратно) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[36%] w-[28%] h-[28%] text-primary/70 animate-[mandala-spin-rev_50s_linear_infinite] pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * 360) / 6;
          return (
            <path
              key={`core-${i}`}
              d="M100,40 C115,70 115,100 100,120 C85,100 85,70 100,40 Z"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        <circle cx="100" cy="100" r="14" />
      </svg>

      {/* Точки-индикаторы */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Кадр ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
