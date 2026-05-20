import { forwardRef, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const video1 = "/videos/video-1.mp4";
const video2 = "/videos/video-2.mp4";

type Reel = {
  src: string;
  title: string;
  description: string;
};

const REELS: Reel[] = [
  {
    src: video1,
    title: "Body Frame · Сила",
    description:
      "Силовая статика и выравнивание — фундамент осанки, которая заставляет оборачиваться.",
  },
  {
    src: video2,
    title: "Гибкость без перегруза",
    description:
      "Бережная мобилизация суставов и работа с дыханием — длинные мышцы, лёгкое тело.",
  },
];

export function VideoReels() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const total = REELS.length;
  const go = (dir: -1 | 1) => setActive((i) => (i + dir + total) % total);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      videoRefs.current.forEach((v) => v && (v.muted = next));
      return next;
    });
  };

  const current = REELS[active];
  const nextIdx = (active + 1) % total;
  const prevIdx = (active - 1 + total) % total;

  return (
    <section className="relative overflow-hidden bg-ink text-cream py-16 md:py-24">
      {/* Декоративный фон */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] select-none">
        <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-[20vw] leading-none font-bold uppercase tracking-[-0.06em] whitespace-nowrap text-cream">
          REELS
        </p>
      </div>
      <div className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl" />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-xl">
            <p className="eyebrow text-primary mb-4">Видео · практика</p>
            <h2 className="h-section text-cream">
              Метод <span className="font-serif-italic text-cream/70">в движении</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-cream/50 uppercase tracking-[0.2em]">
            <span>
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Описание + контролы */}
          <div className="col-span-5 flex flex-col justify-between min-h-[560px]">
            <div>
              <p className="eyebrow text-primary mb-5">{current.title}</p>
              <p className="text-2xl xl:text-3xl font-display leading-snug text-cream">
                {current.description}
              </p>
            </div>

            <div className="space-y-8">
              {/* Прогресс-точки */}
              <div className="flex gap-2">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Перейти к видео ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-12 bg-primary" : "w-6 bg-cream/20 hover:bg-cream/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Предыдущее видео"
                  className="w-14 h-14 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Следующее видео"
                  className="w-14 h-14 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Включить звук" : "Выключить звук"}
                  className="ml-2 w-14 h-14 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors"
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* 2 вертикальных видео справа */}
          <div className="col-span-7 grid grid-cols-2 gap-5">
            <ReelTile
              ref={(el: HTMLVideoElement | null) => {
                videoRefs.current[active] = el;
              }}
              key={`main-${active}`}
              src={current.src}
              muted={muted}
              featured
            />
            <button
              type="button"
              onClick={() => setActive(nextIdx)}
              className="relative group block aspect-[9/16] overflow-hidden rounded-sm bg-ink/40"
              aria-label="Открыть следующее видео"
            >
              <ReelTile
                key={`peek-${nextIdx}`}
                src={REELS[nextIdx].src}
                muted
                dim
              />
              <div className="absolute inset-0 flex items-end p-5">
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cream/60 mb-1">
                    Следующее
                  </p>
                  <p className="font-display text-lg text-cream leading-snug">
                    {REELS[nextIdx].title}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile / tablet — карусель */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-sm">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {REELS.map((r, i) => (
                  <div key={i} className="min-w-full px-1">
                    <ReelTile
                      ref={(el: HTMLVideoElement | null) => {
                        videoRefs.current[i] = el;
                      }}
                      src={r.src}
                      muted={muted || i !== active}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/70 backdrop-blur border border-cream/20 flex items-center justify-center text-cream"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/70 backdrop-blur border border-cream/20 flex items-center justify-center text-cream"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-6">
            <p className="eyebrow text-primary mb-3">{current.title}</p>
            <p className="text-base leading-relaxed text-cream/85">{current.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`К видео ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-10 bg-primary" : "w-5 bg-cream/20"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Включить звук" : "Выключить звук"}
                className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type TileProps = {
  src: string;
  muted: boolean;
  active?: boolean;
  featured?: boolean;
  dim?: boolean;
};

const ReelTile = forwardRef<HTMLVideoElement, TileProps>(function ReelTile(
  { src, muted, featured, dim },
  ref,
) {
  return (
    <div
      className={`relative w-full aspect-[9/16] overflow-hidden rounded-sm bg-ink/60 ${
        featured ? "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]" : ""
      }`}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${
          dim ? "opacity-70 group-hover:opacity-100 transition-opacity" : ""
        }`}
      />
      {dim && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      )}
    </div>
  );
});
