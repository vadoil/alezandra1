type Props = {
  className?: string;
  petals?: number;
  rings?: number;
  strokeWidth?: number;
};

/**
 * Decorative mandala SVG. Use as background ornament.
 * Color is taken from currentColor — set it via Tailwind text-* utility.
 */
export function Mandala({ className = "", petals = 16, rings = 6, strokeWidth = 0.5 }: Props) {
  const cx = 100;
  const cy = 100;
  const ringRadii = Array.from({ length: rings }, (_, i) => 18 + i * 13);

  const petalArr = Array.from({ length: petals }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {/* concentric rings */}
      {ringRadii.map((r) => (
        <circle key={`r-${r}`} cx={cx} cy={cy} r={r} />
      ))}

      {/* outer petal layer */}
      <g>
        {petalArr.map((i) => {
          const angle = (i * 360) / petals;
          return (
            <ellipse
              key={`p1-${i}`}
              cx={cx}
              cy={cy - 60}
              rx={6}
              ry={28}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
      </g>

      {/* inner petal layer (offset rotation, smaller) */}
      <g>
        {petalArr.map((i) => {
          const angle = (i * 360) / petals + 360 / petals / 2;
          return (
            <ellipse
              key={`p2-${i}`}
              cx={cx}
              cy={cy - 38}
              rx={4}
              ry={18}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
      </g>

      {/* radial spokes */}
      <g>
        {petalArr.map((i) => {
          const angle = (i * 360) / petals;
          return (
            <line
              key={`s-${i}`}
              x1={cx}
              y1={cy - ringRadii[ringRadii.length - 1]}
              x2={cx}
              y2={cy - ringRadii[0]}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
      </g>

      {/* core flower */}
      <g>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <circle
              key={`c-${i}`}
              cx={cx}
              cy={cy - 9}
              r={6}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={4} />
      </g>
    </svg>
  );
}
