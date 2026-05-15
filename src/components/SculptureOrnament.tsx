import sculpture from "@/assets/hero-sculpture-2.png";

type Props = {
  className?: string;
  /** 0..1 — opacity of the sculpture silhouette */
  opacity?: number;
  /** flip horizontally */
  flip?: boolean;
};

/**
 * Декоративный полупрозрачный силуэт скульптуры — заменяет мандалы/орнаменты
 * как фоновый акцент секций. Чёрно-белый, не реагирует на hover.
 */
export function SculptureOrnament({ className = "", opacity = 0.08, flip = false }: Props) {
  return (
    <img
      src={sculpture}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none object-contain no-grayscale ${
        flip ? "scale-x-[-1]" : ""
      } ${className}`}
      style={{ opacity, filter: "grayscale(100%)" }}
      draggable={false}
    />
  );
}
