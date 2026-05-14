import { useEffect, useState } from "react";

type Props = {
  images: string[];
  intervalMs?: number;
  className?: string;
};

/**
 * «Калейдоскоп-мандала»: круглая композиция из фото, замаскированная
 * лепестками индийской мандалы. Кадры медленно перелистываются,
 * сверху вращается орнамент.
 */
export function KaleidoscopeMandala({ images, intervalMs = 3800, className = "" }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      {/* SVG defs: маска-мандала и градиент окантовки */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id="mandala-clip" clipPathUnits="objectBoundingBox">
            {/* центральный круг */}
            <circle cx="0.5" cy="0.5" r="0.46" />
            {/* 12 лепестков по окружности */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <ellipse
                  key={i}
                  cx="0.5"
                  cy="0.08"
                  rx="0.05"
                  ry="0.12"
                  transform={`rotate(${angle} 0.5 0.5)`}
                />
              );
            })}
          </clipPath>
        </defs>
      </svg>

      {/* Внешнее вращающееся кольцо-орнамент */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full text-primary/40 animate-[mandala-spin_60s_linear_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        aria-hidden
      >
        {[94, 88, 82].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} />
        ))}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 360) / 24;
          return (
            <ellipse
              key={i}
              cx="100"
              cy="14"
              rx="3"
              ry="10"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 360) / 36;
          return (
            <line
              key={i}
              x1="100"
              y1="6"
              x2="100"
              y2="12"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
      </svg>

      {/* Стек фото внутри маски-мандалы */}
      <div
        className="absolute inset-[6%] overflow-hidden"
        style={{ clipPath: "url(#mandala-clip)", WebkitClipPath: "url(#mandala-clip)" }}
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1600ms] ease-in-out ${
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            style={{
              transform: `${i === active ? "rotate(0deg)" : "rotate(8deg)"} scale(${i === active ? 1 : 1.1})`,
            }}
          />
        ))}
        {/* мягкое тонирование */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Внутреннее вращающееся кольцо в обратную сторону */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[8%] w-[84%] h-[84%] text-primary/30 animate-[mandala-spin-rev_45s_linear_infinite] pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden
      >
        <circle cx="100" cy="100" r="98" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 360) / 16;
          return (
            <ellipse
              key={i}
              cx="100"
              cy="20"
              rx="2"
              ry="6"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
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
