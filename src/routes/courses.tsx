import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PROGRAMS, SITE } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";
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
      { title: "Курсы | Александра Марченко | построение тела | body frame" },
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
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-x grid md:grid-cols-12 gap-10 items-end">
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
        <div className="container-x space-y-12 md:space-y-16">
          {PROGRAMS.map((p, i) => {
            const dark = !!p.vip;
            return (
              <div key={p.slug} className="grid md:grid-cols-12 gap-0 md:gap-10 items-stretch">
                <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img
                    src={PROGRAM_IMAGES[p.slug]}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="w-full h-72 md:h-full md:min-h-[480px] object-cover rounded-sm"
                  />
                </div>
                <div
                  className={`md:col-span-6 border rounded-sm p-8 md:p-12 ${
                    dark ? "bg-ink text-cream border-ink" : "bg-clay border-ink/5"
                  } ${i % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 border rounded-full ${
                        dark ? "border-cream/30 text-cream" : "border-ink/15"
                      }`}
                    >
                      {p.vip ? "VIP" : "Курс"}
                    </span>
                    <span className={`text-xs ${dark ? "text-cream/60" : "text-muted-foreground"}`}>{p.duration}</span>
                  </div>
                  <h2 className={`text-3xl md:text-4xl leading-tight mb-5 ${dark ? "text-cream" : ""}`}>{p.title}</h2>
                  <p className={`mb-6 ${dark ? "text-cream/75" : "text-muted-foreground"}`}>{p.tagline}</p>

                  <p className={`eyebrow mb-3 ${dark ? "text-cream/60" : ""}`}>Что внутри</p>
                  <ul className="space-y-2 mb-6">
                    {p.structure.map((x) => (
                      <li key={x} className={`flex items-start gap-2 text-sm ${dark ? "text-cream/85" : ""}`}>
                        <Check size={14} className={`shrink-0 mt-1 ${dark ? "text-cream" : "text-primary"}`} />
                        {x}
                      </li>
                    ))}
                  </ul>

                  <p className={`eyebrow mb-3 ${dark ? "text-cream/60" : ""}`}>Результат</p>
                  <p className={`italic mb-8 ${dark ? "text-cream/80" : "text-ink/80"}`}>{p.result}</p>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`font-display text-2xl ${dark ? "text-cream" : "text-primary"}`}>{p.price}</span>
                    <a
                      href={SITE.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={dark ? "btn-outline border-cream text-cream hover:bg-cream hover:text-ink" : "btn-primary"}
                    >
                      {p.vip ? "Отправить анкету" : "Принять участие"}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
