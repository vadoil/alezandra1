import { createFileRoute, Link } from "@tanstack/react-router";
import { DIRECTIONS } from "@/lib/site-data";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/directions")({
  head: () => ({
    meta: [
      { title: "Направления — йога, йогатерапия, здоровая спина | Александра Марченко" },
      { name: "description", content: "Йога с нуля, йогатерапия, здоровая спина, антистресс, персональная практика, онлайн и оффлайн." },
      { property: "og:title", content: "Направления работы — Александра Марченко" },
      { property: "og:description", content: "Семь направлений практики: от йоги с нуля до персональной йогатерапии." },
    ],
  }),
  component: Directions,
});

function Directions() {
  return (
    <>
      <section className="pt-16 pb-16 md:py-24">
        <div className="container-x max-w-3xl">
          <p className="eyebrow mb-5">Направления</p>
          <h1 className="h-display">Как я работаю</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Семь направлений — от спокойного входа в йогу до персональной терапии. Если не знаете, что выбрать, начните с консультации.
          </p>
        </div>
      </section>
      <section className="pb-24 md:pb-32">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-sm overflow-hidden">
          {DIRECTIONS.map((d) => (
            <div key={d.title} className="bg-cream p-8">
              <h3 className="text-xl mb-3">{d.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{d.text}</p>
              <p className="text-xs text-ink/50 mb-6">{d.fit}</p>
              <Link to="/consultations" className="text-sm text-primary hover:underline">Подобрать формат →</Link>
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
