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
              <button className="btn-primary">
                Пройти вводную консультацию
              </button>
            }
          />
          <a
            href="/#quiz"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-cream px-7 py-4 text-sm font-medium rounded-sm border border-cream/20 hover:border-primary hover:text-primary transition-all"
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
