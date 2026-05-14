import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import studioImg from "@/assets/studio-space.jpg";
import practiceImg from "@/assets/practice-restorative.jpg";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "«Полный путь» — флагманская программа Александры Марченко" },
      { name: "description", content: "12 недель сопровождения: онлайн + оффлайн в «Сфере». Самая глубокая программа практики и восстановления." },
      { property: "og:title", content: "Полный путь: онлайн + оффлайн" },
      { property: "og:description", content: "Флагманская программа Александры Марченко — 12 недель сопровождения." },
    ],
  }),
  component: Program,
});

function Program() {
  return (
    <>
      <section
        className="pt-24 pb-24 md:py-40 bg-ink text-cream relative overflow-hidden"
      >
        <img src={studioImg} alt="" loading="lazy" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary mb-6">Флагманская программа</p>
            <h1 className="h-display text-cream">
              Полный путь: <br />
              <span className="font-serif-italic text-primary">онлайн + оффлайн</span>
            </h1>
            <p className="mt-7 text-xl text-cream/75 leading-relaxed">
              12 недель сопровождения. Самая глубокая программа Александры — для тех, кто готов вложиться в системную и зрелую практику.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/consultations" className="btn-primary">Оставить заявку</Link>
              <a href="#about-program" className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium rounded-sm border border-cream/20 text-cream hover:border-primary hover:text-primary transition-all">Подробнее</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about-program" className="py-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Для кого</p>
            <h2 className="h-section">Кому подойдёт</h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-4 text-lg">
              {[
                "Прошли короткие курсы и хотите глубже",
                "Готовы к регулярной системной практике",
                "Хотите сочетать онлайн и живую работу в «Сфере»",
                "Ищете персональное сопровождение, а не общую программу",
                "Цените бережный, не агрессивный подход",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3"><Check size={18} className="text-primary mt-1.5 shrink-0" />{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img src={practiceImg} alt="Восстановительная практика" loading="lazy" width={1280} height={960} className="w-full aspect-[4/3] object-cover rounded-sm" />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="eyebrow mb-4">Трансформация</p>
            <h2 className="h-section">Ключевой результат</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Зрелая, устойчивая практика, которая остаётся с вами. Не набор упражнений, а собственный способ возвращаться к телу — на годы вперёд.
            </p>
            <p className="mt-4 text-muted-foreground italic">
              Почему одного курса мало: короткий курс даёт инструменты. Полный путь — собирает их в систему, которая работает в вашей жизни.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Что входит</p>
            <h2 className="h-section">Структура программы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Онлайн-компонент", d: "Еженедельные живые сессии, записи, короткие практики на каждый день, поддержка в чате." },
              { t: "Оффлайн в «Сфере»", d: "Глубокие живые занятия раз в две недели — для коррекции, контакта и атмосферы." },
              { t: "Персональная поддержка", d: "Индивидуальные онлайн-сессии, корректировки и обратная связь между встречами." },
            ].map((x) => (
              <div key={x.t} className="bg-clay border border-ink/5 p-8 rounded-sm">
                <h3 className="text-xl mb-3">{x.t}</h3>
                <p className="text-muted-foreground text-sm">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Диагностика", d: "Тело, образ жизни, цели и ограничения." },
              { n: "02", t: "Фундамент", d: "Базовые блоки и дыхание. Первые недели." },
              { n: "03", t: "Углубление", d: "Персонализация и работа с конкретным запросом." },
              { n: "04", t: "Интеграция", d: "Собственная устойчивая практика на выходе." },
            ].map((s) => (
              <div key={s.n} className="border-t border-ink/15 pt-6">
                <p className="eyebrow mb-3">Этап {s.n}</p>
                <h4 className="text-lg mb-2">{s.t}</h4>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x grid md:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow mb-4">Результаты</p>
            <h2 className="h-section">Что вы получаете</h2>
            <ul className="mt-8 space-y-3">
              {["Меньше напряжения и больше лёгкости в теле","Понятная личная практика на каждый день","Восстановленная нервная система и сон","Уверенность и контакт с собой","Привычка, которая остаётся"].map((x) => (
                <li key={x} className="flex items-start gap-3"><Check size={16} className="text-primary mt-1.5" />{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Не подойдёт</p>
            <h2 className="h-section">Кому это не нужно</h2>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              <li>· Вы ищете быстрый результат за неделю</li>
              <li>· Хотите силовой фитнес или интенсивную нагрузку</li>
              <li>· Не готовы к регулярной практике 12 недель</li>
              <li>· Ищете групповой класс без индивидуальной работы</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <p className="eyebrow mb-4">Отзывы</p>
          <h2 className="h-section mb-12 max-w-2xl">Слова учеников программы</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <div key={i} className="bg-clay border border-ink/5 p-8 rounded-sm">
                <p className="font-serif-italic text-xl leading-relaxed text-ink/85 mb-6">«{t.text}»</p>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.format}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <FinalCta />
    </>
  );
}
