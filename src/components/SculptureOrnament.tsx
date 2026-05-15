import sculpture from "@/assets/hero-sculpture-2.png";

type Props = {
  className?: string;
  /** 0..1 — opacity of the sculpture silhouette */
  opacity?: number;
  /** flip horizontally */
  flip?: boolean;
  /** invert colors (for dark backgrounds) */
  invert?: boolean;
};

/**
 * Декоративный полупрозрачный силуэт скульптуры — заменяет мандалы/орнаменты
 * как фоновый акцент секций. Чёрно-белый, не реагирует на hover.
 */
export function SculptureOrnament({
  className = "",
  opacity = 0.1,
  flip = false,
  invert = false,
}: Props) {
  const filter = `grayscale(100%)${invert ? " invert(1)" : ""}`;
  return (
    <img
      src={sculpture}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none object-contain no-grayscale ${
        flip ? "scale-x-[-1]" : ""
      } ${className}`}
      style={{ opacity, filter }}
      draggable={false}
    />
  );
}
