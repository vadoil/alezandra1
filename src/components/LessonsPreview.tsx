import { Lock, PlayCircle, ShieldCheck, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Mandala } from "@/components/Mandala";

type Lesson = {
  title: string;
  duration: string;
  free?: boolean;
};

type Props = {
  title?: string;
  lessons: Lesson[];
  price: string;
  ctaTo?: string;
};

/**
 * Превью уроков курса/программы. Доступ закрыт до оплаты.
 * Скачивание/контекст-меню/выделение отключены — это превью, а не материал.
 */
export function LessonsPreview({ title = "Уроки внутри", lessons, price, ctaTo = "/consultations" }: Props) {
  const preventCtx = (e: React.MouseEvent) => e.preventDefault();
  const preventDrag = (e: React.DragEvent) => e.preventDefault();

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden select-none"
      onContextMenu={preventCtx}
      onDragStart={preventDrag}
    >
      <Mandala
        className="absolute -left-32 -top-24 w-[440px] h-[440px] text-primary/8 pointer-events-none"
        petals={20}
        rings={7}
      />
      <Mandala
        className="absolute -right-40 bottom-0 w-[520px] h-[520px] text-primary/6 pointer-events-none"
        petals={24}
        rings={8}
      />

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-3">Программа уроков</p>
            <h2 className="h-section">{title}</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Полный доступ открывается после оплаты. Материалы доступны только для просмотра — без скачивания.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-cream border border-ink/5 rounded-full px-4 py-2">
            <ShieldCheck size={14} className="text-primary" />
            Защищено · просмотр без скачивания
          </div>
        </div>

        <div className="bg-cream border border-ink/5 rounded-sm overflow-hidden">
          <ul className="divide-y divide-ink/8">
            {lessons.map((l, i) => {
              const locked = !l.free;
              return (
                <li
                  key={l.title + i}
                  className="flex items-center gap-4 md:gap-6 px-5 md:px-8 py-5 group"
                >
                  <span className="font-display text-2xl md:text-3xl text-primary/70 w-10 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg leading-snug truncate">{l.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {l.duration} · видео-урок
                    </p>
                  </div>
                  {locked ? (
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-ink/10 rounded-full px-3 py-1.5">
                      <Lock size={12} /> Закрыто
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-xs text-primary border border-primary/30 rounded-full px-3 py-1.5">
                      <PlayCircle size={12} /> Превью
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="border-t border-ink/8 bg-clay/50 px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 line-through opacity-60">
                <Download size={14} /> Скачивание
              </span>
              <span className="text-ink/70">·</span>
              <span>Только онлайн-просмотр после оплаты</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-xl text-primary">{price}</span>
              <Link to={ctaTo} className="btn-primary">Открыть доступ</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
