import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { COURSES } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";

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
      <section className="pt-16 pb-16 md:py-24">
        <div className="container-x max-w-3xl">
          <p className="eyebrow mb-5">Короткие курсы</p>
          <h1 className="h-display">Доступный вход <br /><span className="font-serif-italic text-primary">в практику</span></h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Три коротких курса, чтобы спокойно начать или решить конкретный запрос тела.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x space-y-6">
          {COURSES.map((c) => (
            <div key={c.slug} className="bg-clay border border-ink/5 rounded-sm p-8 md:p-12 grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-ink/15 rounded-full">Курс</span>
                  <span className="text-xs text-muted-foreground">{c.duration}</span>
                </div>
                <h2 className="text-3xl md:text-4xl leading-tight mb-4">{c.title}</h2>
                <p className="text-muted-foreground mb-3"><span className="text-ink/80">Для кого:</span> {c.forWhom}</p>
                <p className="text-muted-foreground"><span className="text-ink/80">Решает:</span> {c.problem}</p>
              </div>
              <div className="md:col-span-7 md:pl-8 md:border-l border-ink/10">
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
                <Link to="/consultations" className="btn-primary">Записаться на курс</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
