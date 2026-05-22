import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles, MessageCircle, Activity, Apple, ShieldCheck, ArrowRight } from "lucide-react";
import heroImg from "@/assets/alex-6.jpg";
import detailImg from "@/assets/alex-8.jpg";
import portraitImg from "@/assets/alex-9.jpg";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/FinalCta";
import { PROGRAMS, SITE } from "@/lib/site-data";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "VIP «Архитектор тела» | Александра Марченко | построение тела | body frame" },
      { name: "description", content: "Тотальное наставничество: инженерный аудит и пересборка тела. 10 персональных сессий в месяц, личный контакт 24/7 и протокол питания." },
      { property: "og:title", content: "VIP «Архитектор тела»" },
      { property: "og:description", content: "Персональное наставничество. 50 000 ₽ / мес. Доступ после предварительного разбора." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ProgramVIP,
});

function ProgramVIP() {
  const vip = PROGRAMS.find((p) => p.slug === "vip-architect")!;

  const pillars = [
    {
      icon: Activity,
      title: "Инженерная диагностика",
      text: "Находим истинные причины зажимов и болей, а не просто тянем мышцы.",
    },
    {
      icon: Sparkles,
      title: "10 персональных сессий / мес",
      text: "Прямой эфир с коррекцией каждого миллиметра движения.",
    },
    {
      icon: MessageCircle,
      title: "Личный контакт 24/7",
      text: "Мой прямой контакт в твоём доступе. Твой прогресс — моя ответственность.",
    },
    {
      icon: Apple,
      title: "Протокол питания",
      text: "Под твои реальные потребности, ритм и цели.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-cream pt-32 pb-24 md:pt-40 md:pb-32">
        <img src={heroImg} alt="" loading="eager" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/60 rounded-full text-gold text-[11px] uppercase tracking-[0.25em] mb-8">
                <Crown size={14} /> VIP · Только по разбору
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="h-display text-cream leading-[0.95]">
                Архитектор<br />
                <span className="font-serif-italic text-gold">тела</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-xl md:text-2xl text-cream/80 leading-relaxed max-w-2xl">
                Тотальное наставничество — инженерный аудит и пересборка твоего тела.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <a href={SITE.telegramUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  Отправить анкету
                </a>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl md:text-4xl text-gold">50 000 ₽</span>
                  <span className="text-cream/60 text-sm">/ мес</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-5">Позиционирование</p>
            <h2 className="h-section leading-tight">
              Для тех, кто понимает: тело — <span className="font-serif-italic text-primary">фундамент личной власти</span> и успеха.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              {vip.diff}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <img src={portraitImg} alt="Александра Марченко" width={900} height={1100} className="w-full aspect-[4/5] object-cover rounded-sm" />
          </Reveal>
        </div>
      </section>

      {/* PILLARS — 4 ключевых блока */}
      <section className="py-24 md:py-32 bg-clay">
        <div className="container-x">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Что внутри</p>
            <h2 className="h-section">Четыре опоры наставничества</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/10 rounded-sm overflow-hidden">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-cream p-8 md:p-10">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-ink text-gold flex items-center justify-center">
                    <p.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES — путь */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-x">
          <Reveal className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Путь</p>
            <h2 className="h-section">Как мы работаем</h2>
          </Reveal>
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-5">
              <img src={detailImg} alt="Практика" loading="lazy" width={900} height={1200} className="w-full aspect-[3/4] object-cover rounded-sm sticky top-28" />
            </div>
            <div className="md:col-span-7">
              <ol className="space-y-10">
                {vip.stages.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.08}>
                    <div className="border-l-2 border-ink/15 pl-8 relative">
                      <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-gold text-ink font-display text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h3 className="text-2xl md:text-3xl mb-3">{s.title.replace(/^Этап \d+ · /, "")}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{s.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT — итоги */}
      <section className="py-24 md:py-32 bg-ink text-cream">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold mb-4">Результат</p>
            <h2 className="h-section text-cream leading-tight">
              Тело как <span className="font-serif-italic text-gold">точно собранный механизм</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.15}>
            <ul className="space-y-5">
              {[
                "Уходят хронические боли — потому что устранена их причина",
                "Осанка становится новой нормой, а не задачей",
                "Тело двигается экономично, легко и точно",
                "Энергия и ресурс — на твои настоящие задачи",
                "Привычка владеть телом — навсегда",
              ].map((x) => (
                <li key={x} className="flex items-start gap-4 text-lg text-cream/85 border-b border-cream/10 pb-5">
                  <Check size={20} className="text-gold mt-1 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ACCESS — условия входа */}
      <section className="py-24 md:py-32 bg-clay">
        <div className="container-x max-w-4xl">
          <Reveal className="text-center mb-12">
            <ShieldCheck className="mx-auto text-primary mb-6" size={32} />
            <p className="eyebrow mb-4">Условия входа</p>
            <h2 className="h-section">Доступ — только после предварительного разбора</h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Я работаю не со всеми. Нам обоим важно совпасть по задаче, темпу и готовности к ответственности за собственное тело.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="bg-ink text-cream rounded-sm p-10 md:p-14 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-cream/50 mb-4">Стоимость наставничества</p>
            <div className="flex items-baseline justify-center gap-3 mb-8">
              <span className="font-display text-5xl md:text-6xl text-gold">50 000 ₽</span>
              <span className="text-cream/60">/ месяц</span>
            </div>
            <p className="text-cream/70 mb-10 max-w-md mx-auto">
              Рассрочка обсуждается индивидуально на разборе. Формат — гибкий: онлайн, оффлайн или смешанно.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={SITE.telegramUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
                Отправить анкету <ArrowRight size={16} />
              </a>
              <Link to="/consultations" className="btn-outline border-cream text-cream hover:bg-cream hover:text-ink">
                Сначала консультация
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">Частые вопросы</p>
            <h2 className="h-section mb-10">О наставничестве</h2>
          </Reveal>
          <div className="space-y-4">
            {vip.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="bg-clay border border-ink/5 rounded-sm p-6 group">
                  <summary className="cursor-pointer list-none flex justify-between items-start gap-4 text-base md:text-lg">
                    <span>{f.q}</span>
                    <span className="text-primary text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
