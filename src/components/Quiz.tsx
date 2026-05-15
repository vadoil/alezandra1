import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

type Option = { label: string; value: "A" | "B" | "V" };
type Question = { id: string; question: string; options: Option[] };

const questions: Question[] = [
  {
    id: "shoulders",
    question:
      "1. Чувствуете ли вы к концу дня тяжесть в плечах, будто несёте на себе чужую ответственность, или постоянное желание «втянуть» голову в плечи?",
    options: [
      {
        value: "A",
        label:
          "А: Плечи всегда опущены, шея длинная, двигаюсь легко. Не чувствую груза на плечах в конце дня.",
      },
      {
        value: "B",
        label:
          "Б: К вечеру плечи «подползают» к ушам. Хочется, чтобы кто-то их размял. Иногда чувствую скованность, как будто надела слишком тяжёлое пальто.",
      },
      {
        value: "V",
        label:
          "В: Плечи каменные, шея зажата постоянно. Есть «холка» (вдовий горб) или голова заметно выдвинута вперёд. Ощущение, что несу на себе всю ответственность мира.",
      },
    ],
  },
  {
    id: "jaw",
    question:
      "2. Замечаете ли вы, что ваша челюсть плотно сжата, когда вы сосредоточены или злитесь? Стираются ли зубы, есть ли щелчки при открывании рта?",
    options: [
      {
        value: "A",
        label: "А: Лицо спокойное, челюсть не напряжена. Зубы не смыкаются сами по себе.",
      },
      {
        value: "B",
        label:
          "Б: Ловлю себя на том, что сильно сжимаю челюсти, когда сосредоточена или раздражена. Лицо выглядит «жёстким».",
      },
      {
        value: "V",
        label:
          "В: Скриплю зубами во сне, челюсть щёлкает при открытии рта. По утрам болят жевательные мышцы. Трудно по-настоящему расслабить лицо даже в отпуске.",
      },
    ],
  },
  {
    id: "pelvis",
    question:
      "3. Насколько подвижен ваш таз? Ощущаете ли вы скованность в пояснице после долгого сидения?",
    options: [
      {
        value: "A",
        label:
          "А: Походка «от бедра», таз мягкий и подвижный. Поясница не беспокоит. В движениях чувствую полную свободу.",
      },
      {
        value: "B",
        label:
          "Б: Поясница часто ноет после сидения или прогулок. Таз кажется немного «деревянным», не хватает гибкости и кошачьей грации.",
      },
      {
        value: "V",
        label:
          "В: Ощущение, что нижняя часть тела живёт отдельно. Таз «заперт», движения механические. Либидо снижено, вечное напряжение в зоне таза.",
      },
    ],
  },
  {
    id: "feet",
    question:
      "4. Как вы стоите? Заваливаются ли стопы внутрь, есть ли плоскостопие или постоянное напряжение в икрах?",
    options: [
      {
        value: "A",
        label:
          "А: Стою уверенно, вес распределён равномерно. Походка лёгкая, стопы сильные и «живые».",
      },
      {
        value: "B",
        label:
          "Б: Быстро устаю на каблуках или при ходьбе. Стопы заваливаются внутрь (плоскостопие), часто подворачиваю ноги или чувствую слабость в коленях.",
      },
      {
        value: "V",
        label:
          "В: Ноги кажутся «тяжёлыми» или, наоборот, «ватными». Постоянное напряжение в икрах. Нет ощущения связи с полом, как будто стою на цыпочках, даже если в обуви.",
      },
    ],
  },
  {
    id: "breath",
    question:
      "5. Можете ли вы сделать глубокий вдох животом, или ваше дыхание всегда поверхностное, «запертое» в грудной клетке?",
    options: [
      {
        value: "A",
        label:
          "А: Дышу глубоко, животом. Вдох свободный, грудная клетка расширяется легко. Энергии хватает на весь день.",
      },
      {
        value: "B",
        label:
          "Б: Дыхание поверхностное, только верхней частью груди. При стрессе часто задерживаю дыхание или чувствую «спёртость» в груди.",
      },
      {
        value: "V",
        label:
          "В: Трудно сделать полный вдох, будто мешает невидимый обруч. Часто вздыхаю, чтобы «добрать» воздуха. Ощущение кома в горле или тяжести в районе сердца.",
      },
    ],
  },
];

const SCORE: Record<"A" | "B" | "V", number> = { A: 10, B: 5, V: 0 };

type Result = {
  level: string;
  index: string;
  title: string;
  text: string;
  pitch: string;
  price: string;
  cta: string;
  to: string;
};

function getResult(score: number): Result {
  if (score <= 20) {
    return {
      level: "Критический уровень",
      index: "Индекс ниже 40%",
      title: "Тело в режиме выживания",
      text: "Энергия сливается в зажимы — отсюда апатия, нехватка ресурса, упадок либидо и доходов. Самостоятельно это уже не вывезти.",
      pitch:
        "Это твой SOS-сигнал. Работаем лично, убираем блоки на уровне физики и психики. Ты либо меняешься сейчас, либо привыкаешь жить в этом панцире.",
      price: "VIP-трансформация — 50 000 ₽",
      cta: "Записаться на VIP",
      to: "/program",
    };
  }
  if (score <= 40) {
    return {
      level: "Средний уровень",
      index: "Индекс 40–70%",
      title: "Ты функционируешь, но ресурс на исходе",
      text: "Тело уже начало «запоминать» стресс. Зажимы съедают твою привлекательность и доход. Если не изменить паттерны сейчас — через год это станет хронической болезнью.",
      pitch:
        "Тебе нужна системная перепрошивка и работа с осанкой. Построим твоё тело заново, пока оно не рассыпалось.",
      price: "Курс — 6 000 ₽",
      cta: "Перейти к курсу",
      to: "/courses",
    };
  }
  return {
    level: "Лёгкий уровень",
    index: "Индекс 70–100%",
    title: "Ты в отличной форме",
    text: "Тело в порядке — есть лишь микрозажимы от бытового стресса. Можно отточить детали до совершенства «Богини».",
    pitch:
      "Тебе не нужна глубокая терапия — просто научись снимать дневное напряжение самостоятельно.",
    price: "Мастер-класс — 2 000 ₽",
    cta: "Записаться на мастер-класс",
    to: "/consultations",
  };
}

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "V">>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const score = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + SCORE[v], 0),
    [answers],
  );
  const maxScore = questions.length * 10;
  const indexPct = Math.round((score / maxScore) * 100);

  const choose = (qid: string, val: "A" | "B" | "V") => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const result = submitted && allAnswered ? getResult(score) : null;

  return (
    <section id="quiz" className="py-24 md:py-32 bg-clay scroll-mt-24">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="eyebrow mb-4">Биомеханическая диагностика</p>
          <h2 className="h-section">Твой индекс телесной свободы</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            5 честных вопросов о теле — и ты увидишь, в каком режиме оно живёт. Без давления, без диагнозов: только зеркало.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-cream border border-ink/5 p-6 md:p-12 rounded-sm">
          {!result && (
            <>
              <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
                <span>
                  Отвечено {answeredCount} из {questions.length}
                </span>
                {answeredCount > 0 && (
                  <button onClick={reset} className="hover:text-primary transition-colors">
                    Сбросить
                  </button>
                )}
              </div>
              <div className="h-px bg-ink/10 mb-10 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>

              <div className="space-y-12">
                {questions.map((q) => (
                  <div key={q.id}>
                    <h3 className="text-xl md:text-2xl mb-5 leading-snug">{q.question}</h3>
                    <div className="grid gap-3">
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => choose(q.id, opt.value)}
                            className={
                              "text-left p-4 border rounded-sm transition-all text-sm leading-relaxed " +
                              (selected
                                ? "border-primary bg-primary/10"
                                : "border-ink/15 hover:border-primary hover:bg-primary/5")
                            }
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-ink/10 flex flex-col items-center gap-3">
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!allAnswered}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Узнать индекс телесной свободы
                </button>
                {!allAnswered && (
                  <p className="text-xs text-muted-foreground">
                    Ответьте на все {questions.length} вопросов, чтобы получить результат
                  </p>
                )}
              </div>
            </>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="eyebrow mb-3">{result.level}</p>
                <p className="font-display text-5xl md:text-6xl text-primary mb-2">
                  {indexPct}%
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-ink/50 mb-8">
                  {score} / {maxScore} баллов · {result.index}
                </p>
                <h3 className="text-3xl md:text-4xl mb-5">{result.title}</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
                  {result.text}
                </p>
                <p className="text-base italic text-ink/80 mb-8 max-w-xl mx-auto border-l-2 border-primary pl-5 text-left">
                  {result.pitch}
                </p>
                <p className="font-display text-2xl mb-8">{result.price}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to={result.to} className="btn-primary">
                    {result.cta}
                  </Link>
                  <Link to="/consultations" className="btn-outline">
                    Бесплатная консультация
                  </Link>
                </div>
                <button
                  onClick={reset}
                  className="mt-8 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Пройти заново
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
