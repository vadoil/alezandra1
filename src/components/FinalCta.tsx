import { ConsultationDialog } from "@/components/ConsultationDialog";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32 bg-ink text-cream">
      <div className="container-x text-center max-w-3xl mx-auto">
        <p className="eyebrow text-primary mb-6">Следующий шаг</p>
        <h2 className="h-section text-cream">
          Начните спокойно. <span className="font-serif-italic">Без перегруза и сравнения.</span>
        </h2>
        <p className="mt-6 text-cream/70 text-lg">
          Запишитесь на вводную консультацию или пройдите биомеханическую диагностику — я помогу подобрать формат, который подходит именно вам.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ConsultationDialog
            trigger={
              <button className="inline-flex items-center justify-center gap-2 bg-cream text-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] rounded-none border border-cream transition-all duration-300 hover:bg-transparent hover:text-cream">
                Пройти вводную консультацию
              </button>
            }
          />
          <a
            href="/#quiz"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-cream px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] rounded-none border border-cream/40 transition-all duration-300 hover:bg-cream hover:text-ink hover:border-cream"
          >
            Пройти биомеханическую диагностику
          </a>
        </div>
        <p className="mt-6 text-xs text-cream/40">
          Вводная консультация · 1 час · 3 000 ₽
        </p>
      </div>
    </section>
  );
}
