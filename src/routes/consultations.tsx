import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import consultationImg from "@/assets/alex-3.jpg";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/consultations")({
  head: () => ({
    meta: [
      { title: "Консультация по йоге и йогатерапии | Александра Марченко" },
      { name: "description", content: "Персональная диагностическая встреча: оценка запроса, состояния и подбор безопасного формата практики." },
      { property: "og:title", content: "Консультация — Александра Марченко" },
      { property: "og:description", content: "Вводная онлайн-консультация: 1 час персональной работы с вашим запросом за 3 000 ₽." },
    ],
  }),
  component: Consultations,
});

function Consultations() {
  return (
    <>
      <section className="pt-16 pb-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Консультации</p>
            <h1 className="h-display">Лучший <span className="font-serif-italic text-primary">первый шаг</span></h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Персональная встреча онлайн. Я слушаю запрос, оцениваю состояние и подбираю безопасный формат.
            </p>
            <Link to="/consultations" className="btn-primary mt-10">Пройти вводную консультацию</Link>
            <p className="mt-4 text-xs text-muted-foreground">1 час · онлайн · 3 000 ₽</p>
          </div>
          <div className="lg:col-span-6">
            <img src={consultationImg} alt="Консультация" width={1280} height={960} className="w-full aspect-[4/3] object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow mb-4">Структура встречи</p>
            <h2 className="h-section">Что мы делаем</h2>
            <ul className="mt-8 space-y-4">
              {[
                "Знакомство и обсуждение запроса",
                "Оценка состояния, образа жизни и ограничений",
                "Короткая телесная диагностика",
                "Рекомендации по формату и ритму",
                "Ответы на ваши вопросы",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3"><Check size={18} className="text-primary shrink-0 mt-1" />{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">После встречи</p>
            <h2 className="h-section">Что вы получаете</h2>
            <ul className="mt-8 space-y-4">
              {[
                "Понимание, какой формат подходит именно вам",
                "Чёткий следующий шаг — курс, программа или личная работа",
                "Базовые рекомендации для самостоятельной практики",
                "Спокойствие: вы знаете, как двигаться дальше",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3"><Check size={18} className="text-primary shrink-0 mt-1" />{x}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground italic">
              Если формат не подойдёт — я скажу честно. Без давления и продаж.
            </p>
          </div>
        </div>
      </section>

      <FinalCta />

      <section className="py-20 md:py-28 bg-cream border-t border-ink/5">
        <div className="container-x grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { n: "01", t: "Бережно", d: "Без давления и оценки. Темп и нагрузка — по вашему состоянию." },
            { n: "02", t: "Индивидуально", d: "Программа собирается под ваш запрос, опыт и образ жизни." },
            { n: "03", t: "С опорой", d: "Вы уходите со встречи с понятным следующим шагом." },
          ].map((x) => (
            <div key={x.n} className="flex flex-col">
              <span className="font-serif-italic text-3xl text-primary">{x.n}</span>
              <h3 className="mt-3 text-xl">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
