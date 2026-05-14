import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { COURSES } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";
import { Mandala } from "@/components/Mandala";
import courseBeginner from "@/assets/course-beginner.jpg";
import courseBack from "@/assets/course-back.jpg";
import courseAntistress from "@/assets/course-antistress.jpg";
import studioSpace from "@/assets/studio-space.jpg";
import practiceRestorative from "@/assets/practice-restorative.jpg";

const COURSE_IMAGES: Record<string, string> = {
  "yoga-from-scratch": courseBeginner,
  "healthy-back": courseBack,
  "anti-stress": courseAntistress,
};

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Короткие курсы йоги и йогатерапии | Александра Марченко" },
      { name: "description", content: "Йога с нуля, здоровая спина, антистресс. Доступный вход в практику с поддержкой и понятной структурой." },
      { property: "og:title", content: "Короткие курсы — Александра Марченко" },
      { property: "og:description", content: "Три коротких курса для бережного входа в практику." },
    ],
  }),
  component: Courses,
});

function Courses() {
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 relative overflow-hidden">
        <Mandala className="absolute -right-40 -top-20 w-[560px] h-[560px] text-primary/10 pointer-events-none" petals={22} rings={8} />
        <div className="container-x grid md:grid-cols-12 gap-10 items-end relative">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Короткие курсы</p>
            <h1 className="h-display">Доступный вход <br /><span className="font-serif-italic text-primary">в практику</span></h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Три коротких курса, чтобы спокойно начать или решить конкретный запрос тела.
            </p>
          </div>
          <div className="md:col-span-5">
            <img src={studioSpace} alt="Атмосфера студии йоги" loading="lazy" width={1280} height={896} className="w-full h-64 md:h-80 object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x space-y-12 md:space-y-16">
          {COURSES.map((c, i) => (
            <div key={c.slug} className="grid md:grid-cols-12 gap-0 md:gap-10 items-stretch">
              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img
                  src={COURSE_IMAGES[c.slug]}
                  alt={c.title}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="w-full h-72 md:h-full md:min-h-[480px] object-cover rounded-sm"
                />
              </div>
              <div className={`md:col-span-6 bg-clay border border-ink/5 rounded-sm p-8 md:p-12 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-ink/15 rounded-full">Курс</span>
                  <span className="text-xs text-muted-foreground">{c.duration}</span>
                </div>
                <h2 className="text-3xl md:text-4xl leading-tight mb-5">{c.title}</h2>
                <p className="text-muted-foreground mb-2"><span className="text-ink/80">Для кого:</span> {c.forWhom}</p>
                <p className="text-muted-foreground mb-6"><span className="text-ink/80">Решает:</span> {c.problem}</p>

                <p className="eyebrow mb-3">Что внутри</p>
                <ul className="space-y-2 mb-6">
                  {c.inside.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="text-primary shrink-0 mt-1" />{x}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mb-3">Результат</p>
                <p className="text-ink/80 italic mb-8">{c.result}</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/courses/$slug" params={{ slug: c.slug }} className="btn-primary">Подробнее о курсе</Link>
                  <Link to="/consultations" className="btn-outline">Консультация</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <img src={practiceRestorative} alt="Восстановительная практика" loading="lazy" width={1280} height={896} className="w-full h-48 md:h-64 object-cover rounded-sm" />
            <img src={courseBeginner} alt="Утренняя медитация" loading="lazy" width={1280} height={896} className="w-full h-48 md:h-64 object-cover rounded-sm" />
            <img src={courseBack} alt="Работа со спиной" loading="lazy" width={1280} height={896} className="w-full h-48 md:h-64 object-cover rounded-sm" />
            <img src={courseAntistress} alt="Глубокое расслабление" loading="lazy" width={1280} height={896} className="w-full h-48 md:h-64 object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
