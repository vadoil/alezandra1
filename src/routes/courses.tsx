import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PROGRAMS, SITE } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";
import { Mandala } from "@/components/Mandala";
import { Reveal } from "@/components/Reveal";
import programBase from "@/assets/alex-6.jpg";
import programRecovery from "@/assets/alex-8.jpg";
import programFull from "@/assets/alex-9.jpg";
import studioSpace from "@/assets/alex-6.jpg";

const PROGRAM_IMAGES: Record<string, string> = {
  "vip-architect": programBase,
  "body-frame": programRecovery,
  "spine-reset": programFull,
};

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Курсы и программы | Александра Марченко" },
      { name: "description", content: "Три формата работы с телом: Spine-reset, Body Frame и VIP «Архитектор тела»." },
      { property: "og:title", content: "Курсы — Александра Марченко" },
      { property: "og:description", content: "От быстрого онлайн-урока до личного наставничества." },
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
            <p className="eyebrow mb-5">Тарифы и курсы</p>
            <h1 className="h-display">Выбери свой <br /><span className="font-serif-italic text-primary">формат</span></h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              От быстрого онлайн-урока до личного наставничества — три уровня погружения в работу с телом.
            </p>
          </div>
          <div className="md:col-span-5">
            <img src={studioSpace} alt="Атмосфера студии йоги" loading="lazy" width={1280} height={896} className="w-full h-64 md:h-80 object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((p, i) => {
              const dark = !!p.vip;
              const cardContent = (
                <>
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <img
                      src={PROGRAM_IMAGES[p.slug]}
                      alt={p.title}
                      loading="lazy"
                      width={1280}
                      height={896}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    {dark && <div className="absolute inset-0 bg-ink/30" />}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 border rounded-full ${
                          dark ? "border-cream/30 text-cream" : "border-ink/15"
                        }`}
                      >
                        {p.vip ? "VIP" : "Курс"}
                      </span>
                      <span className={`text-xs ${dark ? "text-cream/60" : "text-muted-foreground"}`}>{p.duration}</span>
                    </div>
                    <h3 className={`text-2xl mb-3 leading-tight ${dark ? "text-cream" : ""}`}>{p.title}</h3>
                    <p className={`text-sm mb-5 ${dark ? "text-cream/70" : "text-muted-foreground"}`}>{p.tagline}</p>
                    <ul className="space-y-2 mb-6">
                      {p.structure.slice(0, 4).map((x) => (
                        <li key={x} className={`text-sm flex items-start gap-2 ${dark ? "text-cream/85" : ""}`}>
                          <Check size={14} className={`shrink-0 mt-1 ${dark ? "text-cream" : "text-primary"}`} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`text-sm italic mb-5 ${dark ? "text-cream/60" : "text-ink/60"}`}>{p.result}</p>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <span className={`text-xl ${dark ? "text-cream" : "text-ink"}`}>{p.price}</span>
                      <span className={`inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all ${dark ? "text-cream" : "text-primary"}`}>
                        {p.vip ? "Отправить анкету" : "Принять участие"} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </>
              );
              const className = `rounded-sm h-full flex flex-col border overflow-hidden group transition-colors ${
                dark ? "bg-ink text-cream border-ink hover:border-primary" : "bg-cream border-ink/5 hover:border-primary/40"
              }`;
              return (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <a href={SITE.telegramUrl} target="_blank" rel="noreferrer" className={className}>
                    {cardContent}
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
