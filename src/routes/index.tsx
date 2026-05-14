import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Calendar, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import aboutImg from "@/assets/about-portrait.jpg";
import onlineImg from "@/assets/online-practice.jpg";
import offlineImg from "@/assets/offline-class.jpg";
import consultationImg from "@/assets/consultation.jpg";
import courseBeginner from "@/assets/course-beginner.jpg";
import courseBack from "@/assets/course-back.jpg";
import courseAntistress from "@/assets/course-antistress.jpg";
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
  "base": programBase,
  "recovery": programRecovery,
  "full-path": programFull,
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
      <Courses />
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
    <section className="pt-12 md:pt-20 pb-24 md:pb-32">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <p className="eyebrow mb-6">Александра Марченко · йогатерапия</p>
          <h1 className="h-display">
            Бережная йога <br />
            и <span className="font-serif-italic text-primary">возвращение</span> <br />
            к телу
          </h1>
          <p className="mt-7 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Системная практика для восстановления, снятия напряжения и спокойного входа в йогу. Без перегруза, давления и сравнения.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#quiz" className="btn-primary">
              Подобрать программу <ArrowRight size={16} />
            </a>
            <Link to="/consultations" className="btn-outline">
              Записаться на консультацию
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Первичная встреча 20 минут · бесплатно · без обязательств
          </p>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative">
            <img
              src={heroImg}
              alt="Александра Марченко — преподаватель йоги и йогатерапии"
              width={1280}
              height={1600}
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-cream border border-ink/5 p-5 max-w-[240px] rounded-sm shadow-sm">
              <p className="eyebrow mb-2">Сертификация</p>
              <p className="text-sm leading-snug">
                Йогатерапия · 5+ лет в фитнесе и йоге
              </p>
            </div>
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
          <p className="eyebrow mb-4">Полные программы</p>
          <h2 className="h-section">Глубже и системнее</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Когда короткого курса мало и нужна структура, поддержка и глубина.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => {
            const dark = !!p.flagship;
            return (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to={p.flagship ? "/program" : "/programs/$slug"}
                  params={p.flagship ? undefined : { slug: p.slug }}
                  className={`rounded-sm h-full flex flex-col border overflow-hidden group transition-colors ${
                    dark
                      ? "bg-ink text-cream border-ink hover:border-primary"
                      : "bg-cream border-ink/5 hover:border-primary/40"
                  }`}
                >
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
                        {dark ? "Флагман" : "Программа"}
                      </span>
                      <span className={`text-xs ${dark ? "text-cream/60" : "text-muted-foreground"}`}>{p.duration}</span>
                    </div>
                    <h3 className={`text-2xl mb-3 leading-tight ${dark ? "text-cream" : ""}`}>{p.title}</h3>
                    <p className={`text-sm mb-5 ${dark ? "text-cream/70" : "text-muted-foreground"}`}>{p.tagline}</p>
                    <ul className="space-y-2 mb-6">
                      {p.structure.slice(0, 3).map((x) => (
                        <li key={x} className="text-sm flex items-start gap-2">
                          <Check size={14} className="text-primary shrink-0 mt-1" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`text-sm italic mt-auto mb-5 ${dark ? "text-cream/60" : "text-ink/60"}`}>{p.result}</p>
                    <span className={`inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all ${dark ? "text-primary" : "text-primary"}`}>
                      {dark ? "О программе «Полный путь»" : "Подробнее"} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
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
  const imgs = [gallery1, practiceRestorative, gallery3, studioSpace, gallery2, therapyHands, gallery4, courseAntistress];
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
              className="w-full aspect-square object-cover rounded-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="py-24 md:py-32 bg-clay">
      <div className="container-x">
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
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-x">
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
    <section id="contacts" className="py-24 md:py-32 bg-ink text-cream">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
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
