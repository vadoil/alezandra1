import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import aboutImg from "@/assets/alex-10.jpg";
import therapyImg from "@/assets/alex-4.jpg";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Обо мне | Александра Марченко | построение тела | body frame" },
      { name: "description", content: "Путь от персонального тренера к йогатерапии. Бережный, осознанный и системный подход к практике." },
      { property: "og:title", content: "Обо мне — Александра Марченко" },
      { property: "og:description", content: "Бережный, осознанный и системный подход к йоге и йогатерапии." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-16 pb-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img src={aboutImg} alt="Александра Марченко" width={1080} height={1440} className="w-full aspect-[3/4] object-cover rounded-sm" />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <p className="eyebrow mb-5">Обо мне</p>
            <h1 className="h-display">Александра <br /><span className="font-serif-italic text-primary">Марченко</span></h1>
            <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
              Сертифицированный преподаватель йоги и йогатерапии. 5+ лет в фитнесе и йоге. Помогаю выстроить безопасную, осознанную и системную практику.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-clay">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Как я пришла в йогу</p>
            <h2 className="h-section">Не искать себя — <span className="font-serif-italic text-primary">создавать</span></h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>Я пришла в йогу не за поиском себя, а за созданием себя. В мире, где все стремятся к «расслаблению», я выбрала дисциплину. Для меня тело — это не оболочка, а архитектурный объект, который требует идеальных пропорций, силы и статики.</p>
            <p>Мой метод <span className="text-ink font-medium">«Body Frame»</span> — это не про мягкие перекаты на коврике. Это про геометрию, жёсткий контроль и осознанное владение каждым миллиметром своего пространства.</p>
            <p className="text-ink font-medium pt-2">Почему я?</p>
            <p>Я не предлагаю вам «женские практики» или медитации. Я предлагаю систему критического выравнивания и силовой работы, которая меняет не только осанку, но и внутреннее состояние. Когда твой «каркас» непоколебим, ты транслируешь уверенность ещё до того, как начинаешь говорить.</p>
            <p>Я работаю с теми, кто ценит эстетику, результат и понимает, что тело — это главный актив. Мы не будем искать гармонию. Мы будем строить форму, которая подчиняется вашей воле.</p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img src={therapyImg} alt="Йогатерапия" loading="lazy" width={1280} height={960} className="w-full aspect-[4/3] object-cover rounded-sm" />
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="eyebrow mb-4">Принципы</p>
            <h2 className="h-section">Как я работаю</h2>
            <ul className="mt-8 space-y-4">
              {[
                "Бережно — без давления, силового насилия и сравнения",
                "Системно — практика выстраивается из шагов, а не случайных занятий",
                "Персонально — мы учитываем тело, образ жизни и ограничения",
                "Безопасно — внимание к выравниванию и нервной системе",
                "Честно — если формат не подойдёт, я скажу прямо",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <Check size={18} className="text-primary shrink-0 mt-1" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <Link to="/consultations" className="btn-primary mt-10">Записаться на консультацию</Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
