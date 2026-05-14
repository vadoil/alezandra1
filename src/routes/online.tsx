import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import onlineImg from "@/assets/online-practice.jpg";
import { FinalCta } from "@/components/FinalCta";
import { PROGRAMS } from "@/lib/site-data";

export const Route = createFileRoute("/online")({
  head: () => ({
    meta: [
      { title: "Онлайн-занятия йогой | Александра Марченко" },
      { name: "description", content: "Живые онлайн-классы и записи. Системная практика из любой точки в вашем ритме." },
      { property: "og:title", content: "Онлайн-формат — Александра Марченко" },
      { property: "og:description", content: "Йога и йогатерапия онлайн: живые встречи, записи, поддержка." },
    ],
  }),
  component: Online,
});

function Online() {
  return (
    <>
      <section className="pt-16 pb-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Онлайн</p>
            <h1 className="h-display">Практика <span className="font-serif-italic text-primary">из дома</span></h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Живые онлайн-встречи и записи. Удобно из любой точки, в вашем ритме — без потери качества методики.
            </p>
            <Link to="/consultations" className="btn-primary mt-10">Подобрать онлайн-формат</Link>
          </div>
          <div className="lg:col-span-6">
            <img src={onlineImg} alt="Онлайн-практика" width={1280} height={960} className="w-full aspect-[4/3] object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x">
          <h2 className="h-section mb-12 max-w-2xl">Что входит</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Живые встречи", d: "Регулярные онлайн-классы с возможностью задать вопрос и получить коррекцию." },
              { t: "Записи", d: "Все занятия остаются у вас. Можно вернуться и повторить в удобное время." },
              { t: "Поддержка", d: "Чат для вопросов, обратной связи и коротких заданий между встречами." },
            ].map((x) => (
              <div key={x.t} className="bg-cream border border-ink/5 p-8 rounded-sm">
                <h3 className="text-xl mb-3">{x.t}</h3>
                <p className="text-muted-foreground text-sm">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x max-w-3xl">
          <h2 className="h-section mb-8">Кому подходит</h2>
          <ul className="space-y-4 text-lg">
            {["Цените свободу формата и ритма", "Живёте далеко от центра «Сфера»", "Часто в разъездах", "Хотите практику дома, но с качественной методикой"].map((x) => (
              <li key={x} className="flex items-start gap-3"><Check size={18} className="text-primary mt-1.5" />{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <div>
              <p className="eyebrow mb-4">Программы онлайн</p>
              <h2 className="h-section max-w-2xl">Системные программы <span className="font-serif-italic text-primary">в онлайн-формате</span></h2>
            </div>
            <Link to="/program" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Все программы <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <Link
                key={p.slug}
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="group bg-cream border border-ink/5 p-8 rounded-sm hover:border-primary/40 transition-colors flex flex-col"
              >
                {p.flagship && <span className="eyebrow text-primary mb-3">Флагман</span>}
                <h3 className="text-2xl mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{p.tagline}</p>
                <ul className="text-xs text-ink/70 space-y-1 mb-6">
                  <li>{p.duration}</li>
                  <li>{p.format}</li>
                </ul>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-ink/5">
                  <span className="text-sm text-ink">{p.price}</span>
                  <span className="text-xs text-primary inline-flex items-center gap-1">Подробнее <ArrowRight size={12} /></span>
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
