import { createFileRoute, Link, notFound, Navigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROGRAMS, PROGRAM_LESSONS, type Program } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";
import { LessonsPreview } from "@/components/LessonsPreview";
import { Mandala } from "@/components/Mandala";
import programBase from "@/assets/alex-9.jpg";
import programRecovery from "@/assets/alex-8.jpg";
import programFull from "@/assets/alex-6.jpg";
import studioSpace from "@/assets/alex-6.jpg";
import practiceRestorative from "@/assets/alex-8.jpg";
import therapyHands from "@/assets/alex-4.jpg";

const PROGRAM_IMAGES: Record<string, string> = {
  base: programBase,
  recovery: programRecovery,
  "full-path": programFull,
};

const PROGRAM_GALLERY: Record<string, string[]> = {
  base: [studioSpace, programBase, practiceRestorative],
  recovery: [therapyHands, programRecovery, studioSpace],
  "full-path": [programFull, studioSpace, therapyHands],
};

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = PROGRAMS.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} | Александра Марченко | построение тела | body frame` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Александра Марченко` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: PROGRAM_IMAGES[p.slug] },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="h-display mb-6">Программа не найдена</h1>
      <Link to="/" className="btn-primary">На главную</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-32 text-center">
      <h1 className="h-section mb-4">Что-то пошло не так</h1>
      <p className="text-muted-foreground mb-8">{error.message}</p>
      <Link to="/" className="btn-primary">На главную</Link>
    </div>
  ),
  component: ProgramDetail,
});

function ProgramDetail() {
  const { program } = Route.useLoaderData() as { program: Program };
  const p = program;

  // Флагман имеет собственный лендинг /program — сразу редиректим
  if (p.flagship) return <Navigate to="/program" />;

  const heroImg = PROGRAM_IMAGES[p.slug];
  const gallery = PROGRAM_GALLERY[p.slug] ?? [];
  const others = PROGRAMS.filter((x) => x.slug !== p.slug);

  return (
    <>
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <Mandala className="absolute -left-32 top-0 w-[480px] h-[480px] text-primary/10 pointer-events-none" petals={18} rings={6} />
        <div className="container-x">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
            <ArrowLeft size={14} /> Все программы
          </Link>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5">Полная программа · {p.duration}</p>
              <h1 className="h-display">{p.title}</h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{p.tagline}</p>
              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                <div>
                  <p className="eyebrow mb-2">Длительность</p>
                  <p className="font-display text-lg">{p.duration}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Формат</p>
                  <p className="font-display text-lg">{p.format}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Стоимость</p>
                  <p className="font-display text-lg text-primary">{p.price}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Старт</p>
                  <p className="font-display text-lg">По записи</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/consultations" className="btn-primary">Записаться на программу</Link>
                <Link to="/consultations" className="btn-outline">Вводная консультация · 3 000 ₽</Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <img src={heroImg} alt={p.title} width={1280} height={896} className="w-full aspect-[4/3] object-cover rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-clay">
        <div className="container-x grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p className="eyebrow mb-4">Для кого</p>
            <h2 className="h-section mb-6">{p.forWhom}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{p.diff}</p>
          </div>
          <div className="bg-cream border border-ink/5 rounded-sm p-8 md:p-10">
            <p className="eyebrow mb-4">Позиционирование</p>
            <p className="font-serif-italic text-2xl leading-snug text-ink/80">«{p.positioning}»</p>
            <div className="mt-8 pt-8 border-t border-ink/10">
              <p className="eyebrow mb-3">Результат</p>
              <p className="text-ink/80">{p.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">Структура программы</p>
            <h2 className="h-section">Этапы пути</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.stages.map((s, i) => (
              <div key={s.title} className="bg-cream border border-ink/5 rounded-sm p-8 flex gap-5">
                <span className="font-display text-3xl text-primary leading-none">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LessonsPreview
        title={`Уроки программы «${p.title}»`}
        lessons={PROGRAM_LESSONS[p.slug] ?? []}
        price={p.price}
      />

      <section className="py-20 md:py-24 bg-clay">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">Что входит</p>
            <h2 className="h-section">Содержание программы</h2>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-4">
              {p.structure.map((x) => (
                <li key={x} className="flex items-start gap-3 text-base border-b border-ink/10 pb-4">
                  <Check size={18} className="text-primary shrink-0 mt-1" /> {x}
                </li>
              ))}
            </ul>
            {p.bonuses.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-4">В подарок</p>
                <ul className="space-y-3">
                  {p.bonuses.map((b) => (
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
          <h2 className="h-section mb-10">О программе «{p.title}»</h2>
          <div className="space-y-4">
            {p.faq.map((f) => (
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
            <h2 className="h-section">Другие программы</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={o.flagship ? "/program" : "/programs/$slug"}
                params={o.flagship ? undefined : { slug: o.slug }}
                className="bg-cream border border-ink/5 rounded-sm overflow-hidden flex flex-col sm:flex-row group hover:border-primary/40 transition-colors"
              >
                <img src={PROGRAM_IMAGES[o.slug]} alt={o.title} loading="lazy" width={1280} height={896} className="w-full sm:w-2/5 h-48 sm:h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground mb-2">{o.duration}</p>
                  <h3 className="text-xl mb-2">{o.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{o.tagline}</p>
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
