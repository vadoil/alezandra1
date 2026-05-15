import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Calendar, Sparkles } from "lucide-react";
import { KaleidoscopeMandala } from "@/components/KaleidoscopeMandala";
import heroSculpture from "@/assets/hero-sculpture.png";
import heroImg from "@/assets/alex-1.jpg";
import aboutImg from "@/assets/alex-10.jpg";
import onlineImg from "@/assets/online-practice.jpg";
import offlineImg from "@/assets/offline-class.jpg";
import consultationImg from "@/assets/alex-3.jpg";
import courseBeginner from "@/assets/alex-2.jpg";
import courseBack from "@/assets/alex-7.jpg";
import courseAntistress from "@/assets/alex-5.jpg";
import programBase from "@/assets/program-base.jpg";
import programRecovery from "@/assets/program-recovery.jpg";
import programFull from "@/assets/program-full.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import practiceRestorative from "@/assets/practice-restorative.jpg";
import studioSpace from "@/assets/studio-space.jpg";
import therapyHands from "@/assets/therapy-hands.jpg";
import { Reveal } from "@/components/Reveal";
import { Quiz } from "@/components/Quiz";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { Mandala } from "@/components/Mandala";
import seaYogaImg from "@/assets/video-sea-yoga.jpg";

const COURSE_IMAGES: Record<string, string> = {
  "yoga-from-scratch": courseBeginner,
  "healthy-back": courseBack,
  "anti-stress": courseAntistress,
};

const PROGRAM_IMAGES: Record<string, string> = {
  "vip-architect": programBase,
  "body-frame": programRecovery,
  "spine-reset": programFull,
};
import {
  COURSES,
  DIRECTIONS,
  PROGRAMS,
  SEGMENTS,
  TESTIMONIALS,
  TRUST,
  SCHEDULE,
  PRICING,
  SITE,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Александра Марченко — йога и йогатерапия в Санкт-Петербурге" },
      {
        name: "description",
        content:
          "Бережная йога и йогатерапия. Восстановление, снятие напряжения, системная практика. Онлайн и в центре «Сфера».",
      },
      { property: "og:title", content: "Александра Марченко — йога и йогатерапия" },
      {
        property: "og:description",
        content:
          "Бережная йога и йогатерапия. Онлайн и оффлайн в центре «Сфера», Санкт-Петербург.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FreeFirstBanner />
      <GalleryStrip />
      {/* <Courses /> — временно скрыт */}
      <Schedule />
      <VideoBlock />
      <Pricing />
      <TrustBar />
      <Story />
      <Segments />
      <Directions />
      <Programs />
      <Consultations />
      <Quiz />
      <Formats />
      <Testimonials />
      <FaqSection />
      <ContactsSection />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-cream pt-12 md:pt-16 pb-16 md:pb-20 overflow-hidden min-h-[88vh] flex flex-col">
      {/* Гигантская фоновая типографика */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none hidden md:block">
        <p className="text-[18vw] leading-[0.8] font-bold uppercase tracking-[-0.06em] text-ink/[0.04] text-center whitespace-nowrap">
          BODY&nbsp;FRAME
        </p>
      </div>

      <div className="container-x relative flex-1 flex flex-col">
        {/* Верхний бар */}
        <div className="hidden md:flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-ink/60 mb-10">
          <span>Александра Марченко</span>
          <span className="font-mono">№ 001 / Body Frame</span>
          <span>Saint Petersburg · 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch relative flex-1">
          {/* Левая колонка — заголовок */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative z-10 flex flex-col justify-center gap-7">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[0.95] tracking-[-0.035em] font-bold uppercase">
              Сила.<br />
              Гибкость.<br />
              <span className="font-serif-italic font-normal normal-case tracking-[-0.02em]">Тело,</span><br />
              которое<br />
              <span className="font-serif-italic font-normal normal-case tracking-[-0.02em]">диктует</span><br />
              правила.
            </h1>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs uppercase tracking-[0.28em] text-ink/70">
              <li>Ликвидация боли</li>
              <li aria-hidden className="w-1.5 h-1.5 rotate-45 bg-ink/40" />
              <li>Ресурс из нуля</li>
              <li aria-hidden className="w-1.5 h-1.5 rotate-45 bg-ink/40" />
              <li>Инвестиция в твою стать</li>
            </ul>
          </div>

          {/* Скульптура для mobile/tablet */}
          <div className="lg:hidden order-1 relative z-0">
            <img
              src={heroSculpture}
              alt="Александра Марченко — скульптура в позе йоги"
              className="w-full h-auto max-h-[60vh] object-contain mx-auto select-none"
              draggable={false}
            />
          </div>

          {/* Скульптура — точно по высоте заголовка */}
          <div className="hidden lg:flex lg:col-span-4 order-2 items-stretch justify-center relative z-0">
            <img
              src={heroSculpture}
              alt="Александра Марченко — скульптура в позе йоги"
              className="h-full w-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>

          {/* Правая колонка — текст и CTA */}
          <div className="lg:col-span-3 order-3 relative z-10">
            <p className="eyebrow mb-5">Body Frame · Авторский метод</p>
            <p className="text-base text-ink/75 leading-relaxed mb-7 whitespace-pre-line">
              Тело — твоя главная визитка. {"\n"}
              Я учу чувствовать каждый миллиметр каркаса, убирать зажимы и выстраивать осанку, которая заставляет оборачиваться.
            </p>
            <p className="text-sm italic text-ink/60 leading-relaxed mb-8 border-l-2 border-ink pl-4">
              Синтез силовой статики, критического выравнивания и перепрошивки биомеханики.
            </p>

            <div className="flex flex-col gap-3">
              <a href="#quiz" className="btn-primary w-full">
                Подобрать программу <ArrowRight size={14} />
              </a>
              <Link to="/consultations" className="btn-outline w-full">
                Бесплатная консультация
              </Link>
            </div>
          </div>
        </div>

        {/* Нижняя метрика-полоса */}
        <div className="mt-16 md:mt-24 pt-10 border-t border-ink/15 grid grid-cols-3 gap-6">
          <div>
            <p className="font-display font-bold text-4xl md:text-5xl leading-none">8</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/60 mt-3 leading-snug">
              лет практики<br />в йоге и фитнесе
            </p>
          </div>
          <div className="md:text-center md:border-x md:border-ink/15 md:px-6">
            <p className="font-display font-bold text-4xl md:text-5xl leading-none">400+</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/60 mt-3 leading-snug">
              клиентов онлайн<br />и оффлайн
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-display font-bold text-4xl md:text-5xl leading-none">98%</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/60 mt-3 leading-snug">
              отмечают облегчение<br />после практики
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="py-12 md:py-16 bg-clay border-y border-ink/5">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST.map((t) => (
          <div key={t.kicker} className="space-y-2">
            <p className="eyebrow">{t.kicker}</p>
            <p className="font-display text-lg md:text-xl leading-snug">{t.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <img
            src={aboutImg}
            alt="Александра у окна студии"
            loading="lazy"
            width={1080}
            height={1440}
            className="w-full aspect-[3/4] object-cover rounded-sm"
          />
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <p className="eyebrow mb-5">История</p>
          <h2 className="h-section">
            От фитнеса — <br />
            к <span className="font-serif-italic text-primary">бережной</span> йогатерапии
          </h2>
          <div className="mt-7 space-y-5 text-muted-foreground text-lg leading-relaxed max-w-xl">
            <p>
              Я начинала как персональный тренер в фитнес-клубе. Йога пришла в мою жизнь как личная практика — и постепенно стала глубже работы с мышцами.
            </p>
            <p>
              Я увидела в ней не только инструмент для тела, но и способ восстановить нервную систему, осанку и контакт с собой. Прошла обучение, стала преподавателем и сосредоточилась на йогатерапии.
            </p>
            <p>
              Сегодня я помогаю ученикам выстроить безопасную, осознанную и системную практику — без агрессии, перегруза и сравнения.
            </p>
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Подробнее обо мне <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Segments() {
  return (
    <section className="py-24 md:py-32 bg-clay">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Для кого</p>
          <h2 className="h-section">Узнайте свой формат</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Шесть запросов, с которыми чаще всего приходят. Выберите свой — подскажу следующий шаг.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEGMENTS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="bg-cream border border-ink/5 p-8 rounded-sm h-full flex flex-col group hover:border-primary/40 transition-colors">
                <h3 className="text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.text}</p>
                <Link
                  to={s.to}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all"
                >
                  {s.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Directions() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Направления</p>
            <h2 className="h-section">Как я работаю</h2>
          </div>
          <Link to="/directions" className="text-sm text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
            Все направления <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-sm overflow-hidden">
          {DIRECTIONS.map((d) => (
            <div key={d.title} className="bg-cream p-8 hover:bg-clay transition-colors">
              <h3 className="text-xl mb-3">{d.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{d.text}</p>
              <p className="text-xs text-ink/50">{d.fit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section className="py-24 md:py-32 bg-clay">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Короткие курсы</p>
          <h2 className="h-section">Доступный вход в практику</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Три коротких курса, чтобы спокойно начать или решить конкретный запрос.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link
                to="/courses/$slug"
                params={{ slug: c.slug }}
                className="bg-cream border border-ink/5 rounded-sm h-full flex flex-col overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={COURSE_IMAGES[c.slug]}
                    alt={c.title}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-ink/15 rounded-full">Курс</span>
                    <span className="text-xs text-muted-foreground">{c.duration}</span>
                  </div>
                  <h3 className="text-2xl mb-3 leading-tight">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{c.forWhom}</p>
                  <ul className="space-y-2 mb-6">
                    {c.inside.slice(0, 3).map((x) => (
                      <li key={x} className="text-sm flex items-start gap-2">
                        <Check size={14} className="text-primary shrink-0 mt-1" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-ink/70 mt-auto mb-5 italic">{c.result}</p>
                  <div className="flex items-end justify-between pt-5 border-t border-ink/10">
                    <div>
                      <p className="eyebrow mb-1">Стоимость</p>
                      <p className="font-display text-xl text-primary">{c.price}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                      Подробнее <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Тарифы и курсы</p>
          <h2 className="h-section">Выбери свой формат</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            От быстрого онлайн-урока до личного наставничества — три уровня погружения в работу с телом.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => {
            const dark = !!p.flagship || !!p.vip;
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
                    {p.structure.slice(0, p.vip ? 4 : 4).map((x) => (
                      <li key={x} className={`text-sm flex items-start gap-2 ${dark ? "text-cream/85" : ""}`}>
                        <Check size={14} className="text-primary shrink-0 mt-1" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-sm italic mb-5 ${dark ? "text-cream/60" : "text-ink/60"}`}>{p.result}</p>
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <span className={`text-xl ${dark ? "text-cream" : "text-ink"}`}>{p.price}</span>
                    <span className={`inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all text-primary`}>
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
  );
}

function Consultations() {
  return (
    <section className="py-24 md:py-32 bg-clay">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <img
            src={consultationImg}
            alt="Консультация Александры"
            loading="lazy"
            width={1280}
            height={960}
            className="w-full aspect-[4/3] object-cover rounded-sm"
          />
        </div>
        <div className="lg:col-span-6 lg:pl-8">
          <p className="eyebrow mb-4">Консультации</p>
          <h2 className="h-section">
            Лучший <span className="font-serif-italic text-primary">первый шаг</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Персональная диагностическая встреча — онлайн или в «Сфере». Я слушаю запрос, оцениваю состояние и подбираю безопасный формат практики.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Оценка тела, образа жизни и ограничений",
              "Чёткий следующий шаг — курс, программа или индивидуальные занятия",
              "Персональные рекомендации для самостоятельной практики",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3 text-sm">
                <Check size={16} className="text-primary shrink-0 mt-1" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/consultations" className="btn-primary">
              Записаться на консультацию
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Без давления и продаж. Если формат не подойдёт — честно скажу.
          </p>
        </div>
      </div>
    </section>
  );
}

function Formats() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Формат</p>
          <h2 className="h-section">Онлайн или в «Сфере»</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Можно выбрать одно. Можно совмещать. Я помогу подобрать ритм.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-cream border border-ink/5 rounded-sm overflow-hidden flex flex-col h-full">
              <img
                src={onlineImg}
                alt="Онлайн-практика"
                loading="lazy"
                width={1280}
                height={960}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl mb-3">Онлайн</h3>
                <p className="text-muted-foreground mb-6">
                  Живые встречи и записи. Свобода ритма и места.
                </p>
                <ul className="space-y-2 mb-8 text-sm">
                  <li>· Удобно из любой точки</li>
                  <li>· Записи остаются у вас</li>
                  <li>· Поддержка между встречами</li>
                </ul>
                <Link to="/online" className="btn-outline self-start mt-auto">
                  Подробнее об онлайн
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-cream border border-ink/5 rounded-sm overflow-hidden flex flex-col h-full">
              <img
                src={offlineImg}
                alt="Оффлайн в «Сфере»"
                loading="lazy"
                width={1600}
                height={1067}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl mb-3">Оффлайн в «Сфере»</h3>
                <p className="text-muted-foreground mb-6">
                  Живая практика, контакт и пространство для глубины.
                </p>
                <ul className="space-y-2 mb-8 text-sm">
                  <li>· Личная коррекция от Александры</li>
                  <li>· Атмосфера центра «Сфера»</li>
                  <li>· Группы и индивидуальные классы</li>
                </ul>
                <Link to="/offline" className="btn-outline self-start mt-auto">
                  Расписание оффлайн
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-clay">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">Отзывы</p>
          <h2 className="h-section">Слова учеников</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-cream border border-ink/5 p-8 rounded-sm h-full flex flex-col">
                <p className="font-serif-italic text-xl leading-relaxed text-ink/85 mb-6">
                  «{t.text}»
                </p>
                <div className="mt-auto pt-6 border-t border-ink/10 text-sm">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {t.format} · запрос: {t.request.toLowerCase()}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeFirstBanner() {
  return (
    <section className="bg-primary text-cream">
      <div className="container-x py-6 md:py-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Sparkles size={20} className="shrink-0" />
          <p className="text-sm md:text-base">
            <span className="font-display text-lg md:text-xl">Первое занятие — бесплатно.</span>{" "}
            <span className="opacity-80">Знакомство, диагностика и подбор формата.</span>
          </p>
        </div>
        <Link
          to="/consultations"
          className="inline-flex items-center gap-2 bg-cream text-ink px-5 py-3 text-sm font-medium rounded-sm hover:bg-cream/90 transition-colors"
        >
          Забронировать <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const imgs = [gallery1, practiceRestorative, gallery3, studioSpace, gallery2, therapyHands, gallery4, onlineImg];
  return (
    <section className="py-6 md:py-10">
      <div className="container-x">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Атмосфера практики"
              loading="lazy"
              width={1280}
              height={896}
              className="w-full aspect-square object-cover rounded-sm grayscale hover:grayscale-0 active:grayscale-0 focus:grayscale-0 transition-[filter] duration-500 ease-out"
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden py-24 md:py-32 bg-clay">
      <Mandala className="absolute -top-40 -right-40 w-[560px] h-[560px] text-ink/[0.06] pointer-events-none" petals={20} rings={8} />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Расписание</p>
            <h2 className="h-section">Регулярные тренировки на неделю</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Онлайн и в центре «Сфера». Группы небольшие — место бронируется заранее.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} className="text-primary" /> Обновлено еженедельно
          </div>
        </div>

        <div className="bg-cream border border-ink/5 rounded-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-ink/10 bg-clay/40">
            <div className="col-span-2">День</div>
            <div className="col-span-1">Время</div>
            <div className="col-span-4">Класс</div>
            <div className="col-span-2">Формат</div>
            <div className="col-span-2">Уровень</div>
            <div className="col-span-1 text-right">Запись</div>
          </div>
          {SCHEDULE.map((s) => (
            <div
              key={s.day + s.time}
              className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 px-6 md:px-8 py-5 md:py-6 items-center border-b border-ink/5 last:border-0 hover:bg-clay/30 transition-colors"
            >
              <div className="md:col-span-2">
                <p className="font-display text-base md:text-lg">{s.day}</p>
              </div>
              <div className="md:col-span-1 text-right md:text-left">
                <p className="font-display text-base md:text-lg text-primary">{s.time}</p>
              </div>
              <div className="md:col-span-4 col-span-2">
                <p className="text-base leading-snug">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.duration}</p>
              </div>
              <div className="md:col-span-2">
                <span
                  className={`inline-block text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded-full border ${
                    s.format === "Сфера"
                      ? "border-ink/15 bg-ink text-cream"
                      : "border-ink/15 text-ink"
                  }`}
                >
                  {s.format}
                </span>
              </div>
              <div className="md:col-span-2 text-xs text-muted-foreground">{s.level}</div>
              <div className="md:col-span-1 md:text-right col-span-2">
                <Link
                  to="/consultations"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
                >
                  Записаться <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Первое занятие бесплатно · отмена за 12 часов · можно перенести запись
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 md:py-32">
      <Mandala className="absolute -top-24 -left-24 w-[420px] h-[420px] text-primary/10 pointer-events-none" petals={12} rings={5} />
      <Mandala className="absolute -bottom-32 -right-32 w-[480px] h-[480px] text-ink/[0.05] pointer-events-none" petals={18} rings={7} />
      <div className="container-x relative">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Цены</p>
          <h2 className="h-section">Стоимость занятий</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Прозрачные цены на разовые занятия и абонементы. Курсы и программы — отдельно.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRICING.map((p) => (
            <div
              key={p.title}
              className={`p-8 rounded-sm border flex flex-col ${
                p.highlight
                  ? "bg-ink text-cream border-ink"
                  : "bg-cream border-ink/5"
              }`}
            >
              <p className={`eyebrow mb-3 ${p.highlight ? "text-primary" : ""}`}>{p.title}</p>
              <p
                className={`font-display text-3xl md:text-4xl mb-3 ${
                  p.highlight ? "text-primary" : "text-ink"
                }`}
              >
                {p.price}
              </p>
              <p className={`text-sm flex-1 ${p.highlight ? "text-cream/70" : "text-muted-foreground"}`}>
                {p.note}
              </p>
              <Link
                to="/consultations"
                className={`mt-6 inline-flex items-center gap-2 text-sm transition-all hover:gap-3 ${
                  p.highlight ? "text-primary" : "text-primary"
                }`}
              >
                {p.highlight ? "Забронировать бесплатно" : "Записаться"} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Стоимость курсов и программ указана на их страницах. Возможна оплата частями.
        </p>
      </div>
    </section>
  );
}

function ContactsSection() {
  const items = [
    { label: "Telegram", value: "@alexandramarchenkoo", href: "https://t.me/alexandramarchenkoo" },
    { label: "WhatsApp", value: "+7 927 020 41 61", href: "https://wa.me/79270204161" },
    { label: "Instagram", value: "@alexandramarchenkoo", href: "https://instagram.com/alexandramarchenkoo" },
    { label: "Телефон", value: "+7 927 020 41 61", href: "tel:+79270204161" },
  ];
  return (
    <section id="contacts" className="relative overflow-hidden py-24 md:py-32 bg-ink text-cream">
      <Mandala className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] text-primary/10 pointer-events-none" petals={24} rings={9} />
      <div className="container-x relative grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <p className="eyebrow text-primary mb-5">Контакты</p>
          <h2 className="h-section text-cream">
            Напишите <span className="font-serif-italic text-primary">в любой</span> мессенджер
          </h2>
          <p className="mt-6 text-cream/70 text-lg max-w-md">
            Я отвечаю лично. Подскажу формат, расписание и помогу записаться на бесплатное первое занятие.
          </p>
          <p className="mt-8 text-sm text-cream/50">Центр «Сфера», Санкт-Петербург · Пн–Вс 08:00–21:00</p>
          <Link to="/contacts" className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Все контакты <ArrowRight size={14} />
          </Link>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
          {items.map((it) => {
            const ext = it.href.startsWith("http");
            return (
              <a
                key={it.label}
                href={it.href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noreferrer" : undefined}
                className="group bg-cream/5 border border-cream/10 rounded-sm p-6 hover:bg-cream/10 hover:border-primary transition-all"
              >
                <p className="eyebrow text-primary mb-2">{it.label}</p>
                <p className="font-display text-xl text-cream group-hover:text-primary transition-colors break-all">
                  {it.value}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs text-cream/60 group-hover:gap-3 transition-all">
                  Открыть <ArrowRight size={12} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VideoBlock() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <Mandala className="absolute -top-32 -left-32 w-[420px] h-[420px] text-primary/20 pointer-events-none" />
      <Mandala className="absolute -bottom-40 -right-40 w-[520px] h-[520px] text-cream/10 pointer-events-none" petals={20} rings={7} />

      <div className="container-x relative py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow text-primary mb-5">Видео · скоро</p>
          <h2 className="h-section text-cream">
            Дыхание <span className="font-serif-italic text-primary">моря</span> в&nbsp;вашей практике
          </h2>
          <p className="mt-6 text-cream/70 text-lg max-w-md leading-relaxed">
            Короткое кино о том, как звучит йога у воды — медленные восходы, мягкие движения и тишина между волнами.
          </p>
          <p className="mt-8 text-xs text-cream/40 tracking-[0.2em] uppercase">Видео появится здесь</p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative group rounded-sm overflow-hidden aspect-video shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
            <img
              src={seaYogaImg}
              alt="Йога на берегу моря — превью видео"
              loading="lazy"
              width={1920}
              height={896}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Воспроизвести видео"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream/15 backdrop-blur border border-cream/40 flex items-center justify-center text-cream group-hover:bg-primary group-hover:border-primary transition-all"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="ml-1">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-5 left-6 text-cream text-xs tracking-[0.2em] uppercase opacity-80">
              Превью · место для видео
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
