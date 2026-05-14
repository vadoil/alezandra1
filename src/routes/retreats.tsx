import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Users, Check } from "lucide-react";
import retreatHero from "@/assets/retreat-hero.jpg";
import retreatBali from "@/assets/retreat-bali.jpg";
import retreatKarelia from "@/assets/retreat-karelia.jpg";
import retreatTurkey from "@/assets/retreat-turkey.jpg";
import retreatAltai from "@/assets/retreat-altai.jpg";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/retreats")({
  head: () => ({
    meta: [
      { title: "Выездные туры и ретриты — Александра Марченко" },
      { name: "description", content: "Йога-туры в красивых местах: Бали, Турция, Карелия, Алтай. Глубокая практика, природа и восстановление." },
      { property: "og:title", content: "Выездные туры — йога с Александрой Марченко" },
      { property: "og:description", content: "Ретриты в Бали, Турции, Карелии и на Алтае. Места ограничены." },
      { property: "og:image", content: retreatHero },
    ],
  }),
  component: Retreats,
});

type Retreat = {
  slug: string;
  place: string;
  title: string;
  date: string;
  duration: string;
  group: string;
  price: string;
  description: string;
  inside: string[];
  image: string;
  status: "open" | "waitlist" | "soon";
};

const RETREATS: Retreat[] = [
  {
    slug: "bali",
    place: "Бали, Убуд",
    title: "Тропики и медленный ритм",
    date: "октябрь 2026",
    duration: "8 дней / 7 ночей",
    group: "10 человек",
    price: "от 145 000 ₽",
    description: "Утренние практики на открытой шале посреди джунглей, дневной отдых, вечерние нидры под звуки леса.",
    inside: [
      "2 практики в день: утренняя динамика и вечернее восстановление",
      "Йогатерапия и работа с осанкой",
      "Экскурсии к водопадам и рисовым террасам",
      "Полноценное вегетарианское питание",
      "Проживание в эко-вилле с бассейном",
    ],
    image: retreatBali,
    status: "open",
  },
  {
    slug: "turkey",
    place: "Турция, Ликийское побережье",
    title: "Море, скалы и закаты",
    date: "май 2026",
    duration: "6 дней / 5 ночей",
    group: "12 человек",
    price: "от 89 000 ₽",
    description: "Терраса над морем, кипарисы, тёплый ветер. Бережная практика для восстановления нервной системы.",
    inside: [
      "Утренние и закатные практики у моря",
      "Дыхательные сессии и нидра",
      "Прогулки по Ликийской тропе",
      "Средиземноморское меню",
      "Бутик-отель в 5 минутах от пляжа",
    ],
    image: retreatTurkey,
    status: "open",
  },
  {
    slug: "karelia",
    place: "Карелия, Ладожское озеро",
    title: "Тишина северных лесов",
    date: "июль 2026",
    duration: "5 дней / 4 ночи",
    group: "8 человек",
    price: "от 65 000 ₽",
    description: "Деревянные домики у воды, утренний туман над озером, баня и северный свет. Камерный ретрит для глубокого отдыха.",
    inside: [
      "Мягкие практики на пирсе и в зале",
      "Дыхание, медитации и нидра",
      "Финская баня и купания",
      "Локальная кухня",
      "Отдельный домик на двоих",
    ],
    image: retreatKarelia,
    status: "waitlist",
  },
  {
    slug: "altai",
    place: "Алтай, Чемальский район",
    title: "Горы и чистый воздух",
    date: "август 2026",
    duration: "7 дней / 6 ночей",
    group: "10 человек",
    price: "от 98 000 ₽",
    description: "Практики на платформе с видом на снежные пики. Утренние пробуждения, вечерние костры, перезагрузка.",
    inside: [
      "Утренняя хатха и динамика",
      "Восстановительные вечерние практики",
      "Походы к рекам и горным озёрам",
      "Сезонная локальная кухня",
      "Эко-домики у реки Катунь",
    ],
    image: retreatAltai,
    status: "soon",
  },
];

const STATUS_LABEL: Record<Retreat["status"], { text: string; cls: string }> = {
  open: { text: "Открыт набор", cls: "bg-primary text-cream" },
  waitlist: { text: "Лист ожидания", cls: "bg-ink text-cream" },
  soon: { text: "Скоро", cls: "bg-cream text-ink border border-ink/20" },
};

function Retreats() {
  return (
    <>
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={retreatHero}
          alt="Йога-ретрит на берегу океана"
          width={1600}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70" />
        <div className="relative h-full container-x flex flex-col justify-end pb-16 md:pb-24 text-cream">
          <p className="eyebrow text-cream/80 mb-5">Выездные туры</p>
          <h1 className="h-display max-w-3xl">
            Практика <span className="font-serif-italic text-primary">в красивых</span> местах
          </h1>
          <p className="mt-6 text-lg text-cream/85 max-w-xl">
            Камерные ретриты там, где пространство само работает на восстановление —
            океан, горы, северные леса и южное побережье.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#retreats" className="btn-primary">
              Смотреть туры <ArrowRight size={16} />
            </a>
            <Link to="/consultations" className="inline-flex items-center justify-center gap-2 bg-cream/10 text-cream backdrop-blur px-7 py-4 text-sm font-medium rounded-sm border border-cream/30 hover:bg-cream/20 transition-all">
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-clay">
        <div className="container-x grid md:grid-cols-3 gap-10">
          {[
            { title: "Камерные группы", text: "8–12 человек. Я успеваю работать с каждым лично." },
            { title: "Бережный ритм", text: "Практика, отдых, природа, тишина. Без перегруза и марафонов." },
            { title: "Всё включено", text: "Программа, проживание и питание — обо всём позабочусь." },
          ].map((b) => (
            <div key={b.title}>
              <h3 className="font-display text-2xl mb-3">{b.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="retreats" className="py-24 md:py-32">
        <div className="container-x">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">Ближайшие туры</p>
            <h2 className="h-section">Куда мы едем в этом сезоне</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Каждое место выбрано лично — атмосфера, природа и пространство для практики.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {RETREATS.map((r, i) => {
              const status = STATUS_LABEL[r.status];
              return (
                <article key={r.slug} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                  <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-sm group">
                      <img
                        src={r.image}
                        alt={`${r.place} — ${r.title}`}
                        loading="lazy"
                        width={1280}
                        height={896}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      <span className={`absolute top-5 left-5 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${status.cls}`}>
                        {status.text}
                      </span>
                    </div>
                  </div>

                  <div className={`md:col-span-5 flex flex-col ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <p className="eyebrow text-primary mb-3 flex items-center gap-2">
                      <MapPin size={12} /> {r.place}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl leading-tight mb-5">{r.title}</h3>
                    <p className="text-muted-foreground mb-7 leading-relaxed">{r.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-ink/10">
                      <div>
                        <p className="eyebrow mb-1.5 flex items-center gap-1.5"><Calendar size={11} /> Когда</p>
                        <p className="text-sm font-display">{r.date}</p>
                      </div>
                      <div>
                        <p className="eyebrow mb-1.5">Длительность</p>
                        <p className="text-sm font-display">{r.duration}</p>
                      </div>
                      <div>
                        <p className="eyebrow mb-1.5 flex items-center gap-1.5"><Users size={11} /> Группа</p>
                        <p className="text-sm font-display">{r.group}</p>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-8">
                      {r.inside.map((x) => (
                        <li key={x} className="flex items-start gap-2.5 text-sm">
                          <Check size={14} className="text-primary shrink-0 mt-1" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-end justify-between gap-4 pt-6 border-t border-ink/10">
                      <div>
                        <p className="eyebrow mb-1">Стоимость</p>
                        <p className="font-display text-2xl text-primary">{r.price}</p>
                      </div>
                      <Link to="/consultations" className="btn-primary">
                        Забронировать
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-clay">
        <div className="container-x max-w-3xl text-center">
          <p className="eyebrow mb-4">Хотите свой ретрит?</p>
          <h2 className="h-section">Корпоративные и частные группы</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Соберу программу под вашу компанию или дружескую группу: место, ритм и фокус — под вас.
          </p>
          <Link to="/consultations" className="btn-primary mt-10">
            Обсудить формат
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
