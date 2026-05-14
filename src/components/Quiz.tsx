import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

type Option = { label: string; value: string };
type Question = { id: string; question: string; options: Option[] };

const questions: Question[] = [
  {
    id: "experience",
    question: "Какой у вас опыт практики?",
    options: [
      { label: "Никогда не занималась йогой", value: "novice" },
      { label: "Пробовала, но без системы", value: "some" },
      { label: "Регулярно практикую", value: "regular" },
      { label: "Возвращаюсь после долгой паузы", value: "return" },
    ],
  },
  {
    id: "request",
    question: "Что для вас сейчас важнее всего?",
    options: [
      { label: "Снять напряжение и боль в спине", value: "back" },
      { label: "Восстановиться от усталости и стресса", value: "stress" },
      { label: "Спокойно начать заниматься", value: "start" },
      { label: "Выстроить системную практику", value: "system" },
    ],
  },
  {
    id: "format",
    question: "Какой формат вам ближе?",
    options: [
      { label: "Только онлайн", value: "online" },
      { label: "Только оффлайн", value: "offline" },
      { label: "Смешанный — и онлайн, и живые занятия", value: "mixed" },
      { label: "Пока не определилась", value: "any" },
    ],
  },
  {
    id: "frequency",
    question: "Как часто готовы заниматься?",
    options: [
      { label: "1 раз в неделю", value: "1" },
      { label: "2–3 раза в неделю", value: "23" },
      { label: "Каждый день, но коротко", value: "daily" },
      { label: "Пока не знаю", value: "unknown" },
    ],
  },
  {
    id: "support",
    question: "Нужна ли персональная поддержка?",
    options: [
      { label: "Да, хочу индивидуальный маршрут", value: "personal" },
      { label: "Достаточно групповой практики", value: "group" },
      { label: "Хочу попробовать оба варианта", value: "both" },
    ],
  },
  {
    id: "ready",
    question: "Готовы ли начать с консультации?",
    options: [
      { label: "Да, это лучший первый шаг", value: "yes" },
      { label: "Хочу сначала попробовать практику", value: "later" },
      { label: "Нужна программа, не консультация", value: "program" },
    ],
  },
];

type ResultKey =
  | "consultation"
  | "yoga-zero"
  | "recovery"
  | "online"
  | "offline"
  | "flagship";

type Result = {
  title: string;
  text: string;
  cta: string;
  to: string;
};

const results: Record<ResultKey, Result> = {
  consultation: {
    title: "Начните с консультации",
    text: "У вас есть телесный запрос или вы выбираете маршрут — встреча с Александрой поможет собрать персональный план.",
    cta: "Записаться на консультацию",
    to: "/consultations",
  },
  "yoga-zero": {
    title: "Курс «Йога с нуля»",
    text: "Спокойный вход в практику. 4 недели, 8 занятий, понятные шаги без давления.",
    cta: "Подробнее о курсе",
    to: "/courses",
  },
  recovery: {
    title: "Программа «Восстановление тела»",
    text: "Терапевтический персональный маршрут на 10 недель — для работы с конкретным запросом тела.",
    cta: "Смотреть программу",
    to: "/program",
  },
  online: {
    title: "Онлайн-формат",
    text: "Живые встречи и записи. Практика в вашем ритме из любой точки.",
    cta: "Перейти к онлайн",
    to: "/online",
  },
  offline: {
    title: "Оффлайн в «Сфере»",
    text: "Живая практика и коррекция в пространстве центра. Контакт и атмосфера.",
    cta: "Расписание оффлайн",
    to: "/offline",
  },
  flagship: {
    title: "Флагман: «Полный путь»",
    text: "12 недель сопровождения — онлайн + оффлайн. Самая глубокая программа Александры.",
    cta: "О программе",
    to: "/program",
  },
};

function decide(answers: Record<string, string>): ResultKey {
  if (answers.ready === "yes") return "consultation";
  if (answers.support === "personal" && answers.request === "back") return "recovery";
  if (answers.format === "mixed" || answers.support === "both") return "flagship";
  if (answers.request === "start" || answers.experience === "novice") return "yoga-zero";
  if (answers.format === "online") return "online";
  if (answers.format === "offline") return "offline";
  if (answers.request === "system") return "flagship";
  return "consultation";
}

export function Quiz() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const start = () => setStep(0);
  const reset = () => { setStep(-1); setAnswers({}); };

  const choose = (val: string) => {
    const q = questions[step];
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (step === questions.length - 1) {
      setStep(questions.length);
    } else {
      setStep(step + 1);
    }
  };

  const result = step === questions.length ? results[decide(answers)] : null;
  const progress = step >= 0 && step < questions.length ? ((step + 1) / questions.length) * 100 : 0;

  return (
    <section id="quiz" className="py-24 md:py-32 bg-clay">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="eyebrow mb-4">Подобрать формат</p>
          <h2 className="h-section">Не знаете, с чего начать?</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            6 коротких вопросов — и я подскажу, какой формат подойдёт именно вам. Без давления и продаж.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-cream border border-ink/5 p-8 md:p-12 rounded-sm">
          <AnimatePresence mode="wait">
            {step === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-serif-italic text-2xl mb-6">~ 2 минуты, 6 вопросов</p>
                <button onClick={start} className="btn-primary">
                  Пройти квиз
                </button>
                <p className="mt-4 text-xs text-muted-foreground">
                  Результат покажется на этой же странице.
                </p>
              </motion.div>
            )}

            {step >= 0 && step < questions.length && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
                  <span>Вопрос {step + 1} из {questions.length}</span>
                  <button onClick={reset} className="hover:text-primary transition-colors">
                    Сбросить
                  </button>
                </div>
                <div className="h-px bg-ink/10 mb-8 relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <h3 className="text-2xl mb-8">{questions[step].question}</h3>
                <div className="grid gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className="text-left p-4 border border-ink/15 rounded-sm hover:border-primary hover:bg-primary/5 transition-all text-sm"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="eyebrow mb-4">Ваша рекомендация</p>
                <h3 className="text-3xl mb-4">{result.title}</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">{result.text}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to={result.to} className="btn-primary">{result.cta}</Link>
                  <Link to="/consultations" className="btn-outline">Сначала консультация</Link>
                </div>
                <button
                  onClick={reset}
                  className="mt-6 text-xs text-muted-foreground hover:text-primary transition-colors"
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
