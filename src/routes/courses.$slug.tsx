import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { COURSES, COURSE_LESSONS, type Course } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";
import { LessonsPreview } from "@/components/LessonsPreview";
import { Mandala } from "@/components/Mandala";
import courseBeginner from "@/assets/alex-2.jpg";
import courseBack from "@/assets/alex-7.jpg";
import courseAntistress from "@/assets/alex-5.jpg";
import practiceRestorative from "@/assets/alex-8.jpg";
import studioSpace from "@/assets/alex-6.jpg";
import therapyHands from "@/assets/alex-4.jpg";

const COURSE_IMAGES: Record<string, string> = {
  "yoga-from-scratch": courseBeginner,
  "healthy-back": courseBack,
  "anti-stress": courseAntistress,
};

const COURSE_GALLERY: Record<string, string[]> = {
  "yoga-from-scratch": [studioSpace, practiceRestorative, courseBeginner],
  "healthy-back": [therapyHands, studioSpace, courseBack],
  "anti-stress": [practiceRestorative, courseAntistress, studioSpace],
};

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = COURSES.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.course;
    if (!c) return {};
    return {
      meta: [
        { title: `${c.title} — курс Александры Марченко` },
        { name: "description", content: c.tagline },
        { property: "og:title", content: `${c.title} — Александра Марченко` },
        { property: "og:description", content: c.tagline },
        { property: "og:image", content: COURSE_IMAGES[c.slug] },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="h-display mb-6">Курс не найден</h1>
      <Link to="/courses" className="btn-primary">Все курсы</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-32 text-center">
      <h1 className="h-section mb-4">Что-то пошло не так</h1>
      <p className="text-muted-foreground mb-8">{error.message}</p>
      <Link to="/courses" className="btn-primary">К списку курсов</Link>
    </div>
  ),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: Course };
  const c = course;
  const heroImg = COURSE_IMAGES[c.slug];
  const gallery = COURSE_GALLERY[c.slug] ?? [];
  const otherCourses = COURSES.filter((x) => x.slug !== c.slug);

  return (
    <>
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <Mandala className="absolute -right-40 top-10 w-[520px] h-[520px] text-primary/10 pointer-events-none" petals={20} rings={7} />
        <div className="container-x">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
            <ArrowLeft size={14} /> Все курсы
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5">Короткий курс · {c.duration}</p>
              <h1 className="h-display">{c.title}</h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{c.tagline}</p>

              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                <div>
                  <p className="eyebrow mb-2">Длительность</p>
                  <p className="font-display text-lg">{c.duration}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Формат</p>
                  <p className="font-display text-lg">{c.format}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Стоимость</p>
                  <p className="font-display text-lg text-primary">{c.price}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Старт</p>
                  <p className="font-display text-lg">По записи</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/consultations" className="btn-primary">Записаться на курс</Link>
                <Link to="/consultations" className="btn-outline">Бесплатная консультация</Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img src={heroImg} alt={c.title} width={1280} height={896} className="w-full aspect-[4/3] object-cover rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-clay">
        <div className="container-x grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p className="eyebrow mb-4">Для кого</p>
            <h2 className="h-section mb-6">{c.forWhom}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{c.tone}</p>
          </div>
          <div className="bg-cream border border-ink/5 rounded-sm p-8 md:p-10">
            <p className="eyebrow mb-4">Запрос, с которым приходят</p>
            <p className="font-serif-italic text-2xl leading-snug text-ink/80">«{c.problem}»</p>
            <div className="mt-8 pt-8 border-t border-ink/10">
              <p className="eyebrow mb-3">Результат</p>
              <p className="text-ink/80">{c.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">Программа курса</p>
            <h2 className="h-section">Что мы пройдём по неделям</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.weeks.map((w, i) => (
              <div key={w.title} className="bg-cream border border-ink/5 rounded-sm p-8 flex gap-5">
                <span className="font-display text-3xl text-primary leading-none">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl mb-2">{w.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LessonsPreview
        title={`Уроки курса «${c.title}»`}
        lessons={COURSE_LESSONS[c.slug] ?? []}
        price={c.price}
      />

      <section className="py-20 md:py-24 bg-clay">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">Что входит</p>
            <h2 className="h-section">Содержание курса</h2>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-4">
              {c.inside.map((x) => (
                <li key={x} className="flex items-start gap-3 text-base border-b border-ink/10 pb-4">
                  <Check size={18} className="text-primary shrink-0 mt-1" /> {x}
                </li>
              ))}
            </ul>
            {c.bonuses && c.bonuses.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-4">В подарок</p>
                <ul className="space-y-3">
                  {c.bonuses.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">·</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container-x">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {gallery.map((src, i) => (
                <img key={i} src={src} alt="Атмосфера практики" loading="lazy" width={1280} height={896} className="w-full h-40 md:h-72 object-cover rounded-sm" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24 bg-clay">
        <div className="container-x max-w-3xl">
          <p className="eyebrow mb-4">Частые вопросы</p>
          <h2 className="h-section mb-10">О курсе «{c.title}»</h2>
          <div className="space-y-4">
            {c.faq.map((f) => (
              <details key={f.q} className="bg-cream border border-ink/5 rounded-sm p-6 group">
                <summary className="cursor-pointer list-none flex justify-between items-start gap-4 text-base">
                  <span>{f.q}</span>
                  <span className="text-primary text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="h-section">Другие курсы</h2>
            <Link to="/courses" className="text-sm text-primary inline-flex items-center gap-2">
              Все курсы <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {otherCourses.map((other) => (
              <Link
                key={other.slug}
                to="/courses/$slug"
                params={{ slug: other.slug }}
                className="bg-cream border border-ink/5 rounded-sm overflow-hidden flex flex-col sm:flex-row group hover:border-primary/40 transition-colors"
              >
                <img src={COURSE_IMAGES[other.slug]} alt={other.title} loading="lazy" width={1280} height={896} className="w-full sm:w-2/5 h-48 sm:h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground mb-2">{other.duration}</p>
                  <h3 className="text-xl mb-2">{other.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{other.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                    Подробнее <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
