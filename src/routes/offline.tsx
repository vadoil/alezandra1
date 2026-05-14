import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import offlineImg from "@/assets/offline-class.jpg";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/offline")({
  head: () => ({
    meta: [
      { title: "Оффлайн-занятия в центре «Сфера» | Александра Марченко" },
      { name: "description", content: "Живая практика в центре «Сфера», Санкт-Петербург. Личная коррекция и атмосфера пространства." },
      { property: "og:title", content: "Оффлайн в «Сфере» — Александра Марченко" },
      { property: "og:description", content: "Йога и йогатерапия офлайн в центре «Сфера»." },
    ],
  }),
  component: Offline,
});

function Offline() {
  return (
    <>
      <section className="pt-16 pb-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Оффлайн</p>
            <h1 className="h-display">Живая практика <br /><span className="font-serif-italic text-primary">в «Сфере»</span></h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Я веду групповые и индивидуальные классы в центре «Сфера», Санкт-Петербург. Атмосфера, контакт и точная коррекция.
            </p>
            <Link to="/consultations" className="btn-primary mt-10">Записаться на оффлайн</Link>
          </div>
          <div className="lg:col-span-6">
            <img src={offlineImg} alt="Оффлайн-класс в «Сфере»" width={1600} height={1067} className="w-full aspect-[4/3] object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x grid md:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow mb-4">Преимущества</p>
            <h2 className="h-section">Почему живая практика</h2>
            <ul className="mt-8 space-y-4">
              {["Личная коррекция от Александры", "Атмосфера и тишина пространства", "Контакт с другими учениками", "Глубже погружение в практику"].map((x) => (
                <li key={x} className="flex items-start gap-3"><Check size={18} className="text-primary mt-1.5" />{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Форматы</p>
            <h2 className="h-section">Как заниматься</h2>
            <ul className="mt-8 space-y-4">
              <li><span className="text-ink/80">Групповые классы.</span> <span className="text-muted-foreground">Регулярное расписание в «Сфере».</span></li>
              <li><span className="text-ink/80">Индивидуальные занятия.</span> <span className="text-muted-foreground">Один на один, по вашему запросу.</span></li>
              <li><span className="text-ink/80">Программа «Полный путь».</span> <span className="text-muted-foreground">Сочетание онлайн и оффлайн.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
