import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";

const REELS = [
  { src: "/videos/video-1.mp4", poster: "/videos/poster-1.jpg", title: "Body Frame · Сила", description: "Силовая статика и выравнивание — фундамент осанки, которая заставляет оборачиваться." },
  { src: "/videos/video-2.mp4", poster: "/videos/poster-2.jpg", title: "Гибкость без перегруза", description: "Бережная мобилизация суставов и работа с дыханием — длинные мышцы, лёгкое тело." },
  { src: "/videos/video-3.mp4", poster: "/videos/poster-3.jpg", title: "Осанка и линия плеч", description: "Раскрытие грудного отдела и работа с лопатками — спина перестаёт ныть, шея удлиняется." },
  { src: "/videos/video-4.mp4", poster: "/videos/poster-4.jpg", title: "Лёгкий низ · сильный кор", description: "Глубокие мышцы живота и таза — рельеф появляется сам, когда есть правильная опора." },
  { src: "/videos/video-5.mp4", poster: "/videos/poster-5.jpg", title: "Ритуал в моменте", description: "Короткая практика, после которой тело собирается, а голова становится тише." },
];

type ReelPlayerProps = {
  src: string;
  poster: string;
  muted: boolean;
  active: boolean;
  className?: string;
};

function ReelPlayer({ src, poster, muted, active, className = "" }: ReelPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Пауза когда слайд неактивен
  useEffect(() => {
    if (!active && videoRef.current) videoRef.current.pause();
  }, [active]);

  const handlePlay = () => {
    setLoaded(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      {loaded && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted={muted}
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {!loaded && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Воспроизвести видео"
          className="absolute inset-0 flex items-center justify-center group/play"
        >
          <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream/95 text-ink flex items-center justify-center shadow-2xl transition-transform group-hover/play:scale-110 group-active/play:scale-95">
            <Play size={26} className="ml-1 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoReels() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);

  const total = REELS.length;
  const go = (dir: -1 | 1) => setActive((i) => (i + dir + total) % total);

  const current = REELS[active];
  const nextIdx = (active + 1) % total;

  return (
    <section className="relative overflow-hidden bg-ink text-cream py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] select-none">
        <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-[20vw] leading-none font-bold uppercase tracking-[-0.06em] whitespace-nowrap text-cream">
          REELS
        </p>
      </div>

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-xl">
            <p className="eyebrow text-gold mb-4">Видео · практика</p>
            <h2 className="h-section text-cream">
              Метод <span className="font-serif-italic text-cream/70">в движении</span>
            </h2>
          </div>
          <div className="text-xs text-cream/60 uppercase tracking-[0.2em]">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          <div className="col-span-5 flex flex-col justify-between min-h-[560px]">
            <div>
              <p className="eyebrow text-gold mb-5">{current.title}</p>
              <p className="text-2xl xl:text-3xl font-display leading-snug text-cream">
                {current.description}
              </p>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex gap-2">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Перейти к видео ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-12 bg-gold" : "w-6 bg-cream/25 hover:bg-cream/50"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => go(-1)} aria-label="Предыдущее видео"
                  className="w-14 h-14 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Следующее видео"
                  className="w-14 h-14 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors">
                  <ChevronRight size={20} />
                </button>
                <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Включить звук" : "Выключить звук"}
                  className="ml-2 w-14 h-14 rounded-full border border-cream/30 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors">
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-7 grid grid-cols-2 gap-5">
            <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-ink/60 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
              <ReelPlayer
                key={current.src}
                src={current.src}
                poster={current.poster}
                muted={muted}
                active
              />
            </div>

            <button type="button" onClick={() => setActive(nextIdx)}
              className="relative group block aspect-[9/16] overflow-hidden rounded-sm bg-ink/40"
              aria-label="Открыть следующее видео">
              <img src={REELS[nextIdx].poster} alt="" loading="lazy" decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-5">
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cream/70 mb-1">Следующее</p>
                  <p className="font-display text-lg text-cream leading-snug">{REELS[nextIdx].title}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="relative px-1">
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-sm bg-ink/60">
              <ReelPlayer
                key={current.src}
                src={current.src}
                poster={current.poster}
                muted={muted}
                active
              />
            </div>

            <button type="button" onClick={() => go(-1)} aria-label="Предыдущее"
              className="absolute z-20 left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/88 border border-cream/30 flex items-center justify-center text-cream pointer-events-auto touch-manipulation active:scale-95 transition-transform">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Следующее"
              className="absolute z-20 right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/88 border border-cream/30 flex items-center justify-center text-cream pointer-events-auto touch-manipulation active:scale-95 transition-transform">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-6">
            <p className="eyebrow text-gold mb-3">{current.title}</p>
            <p className="text-base leading-relaxed text-cream/85">{current.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                {REELS.map((_, i) => (
                  <button key={i} type="button" aria-label={`К видео ${i + 1}`} onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-10 bg-gold" : "w-5 bg-cream/25"
                    }`} />
                ))}
              </div>
              <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Включить звук" : "Выключить звук"}
                className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
