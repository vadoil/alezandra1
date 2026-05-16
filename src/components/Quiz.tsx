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
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const score = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + SCORE[v], 0),
    [answers],
  );
  const maxScore = questions.length * 10;
  const indexPct = Math.round((score / maxScore) * 100);

  const choose = (qid: string, val: "A" | "B" | "V") => {
    const next = { ...answers, [qid]: val };
    setAnswers(next);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 220);
    } else {
      setTimeout(() => setShowResult(true), 280);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  };

  const result = showResult ? getResult(score) : null;
  const current = questions[step];

  return (
    <section id="quiz" className="py-24 md:py-32 bg-clay scroll-mt-24">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="eyebrow mb-4">Биомеханическая диагностика</p>
          <h2 className="h-section">Твой индекс телесной свободы</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            5 честных вопросов о теле — и ты увидишь, в каком режиме оно живёт.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-cream border border-ink/5 p-6 md:p-12 rounded-sm min-h-[420px]">
          {!result && (
            <>
              <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
                <span>
                  Вопрос {step + 1} из {questions.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      aria-label={`К вопросу ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === step
                          ? "w-8 bg-ink"
                          : i < step
                          ? "w-4 bg-ink/60"
                          : "w-4 bg-ink/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <h3 className="text-xl md:text-2xl mb-7 leading-snug">
                    {current.question}
                  </h3>
                  <div className="grid gap-3">
                    {current.options.map((opt) => {
                      const selected = answers[current.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => choose(current.id, opt.value)}
                          className={
                            "text-left p-4 md:p-5 border rounded-sm transition-all text-sm leading-relaxed flex gap-4 items-start " +
                            (selected
                              ? "border-ink bg-ink/5"
                              : "border-ink/15 hover:border-ink hover:bg-ink/5")
                          }
                        >
                          <span
                            className={
                              "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold " +
                              (selected
                                ? "bg-ink text-cream border-ink"
                                : "border-ink/30 text-ink")
                            }
                          >
                            {opt.value === "V" ? "В" : opt.value === "B" ? "Б" : "А"}
                          </span>
                          <span className="flex-1 pt-1">{opt.label.replace(/^[АБВA-Z]:\s*/, "")}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Назад
                </button>
                <button onClick={reset} className="hover:text-ink transition-colors">
                  Сбросить
                </button>
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
                    Вводная консультация · 3 000 ₽
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
