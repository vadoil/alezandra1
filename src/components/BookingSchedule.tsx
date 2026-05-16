import { useMemo, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Mandala } from "@/components/Mandala";

type Slot = {
  time: string;
  title: string;
  format: "Онлайн" | "Сфера";
  level: string;
  duration: string;
  available?: boolean;
};

// Расписание по дням недели (0 = воскресенье, 1 = пн … 6 = сб)
// «available» можно потом регулировать вручную — это просто метка свободного места.
const WEEKLY: Record<number, Slot[]> = {
  1: [
    { time: "08:00", title: "Утренний пробуждающий поток", format: "Онлайн", level: "Все уровни", duration: "60 мин", available: true },
    { time: "19:30", title: "Body Frame · силовая статика", format: "Сфера", level: "С опытом", duration: "75 мин", available: true },
  ],
  2: [
    { time: "10:00", title: "Мягкая практика и дыхание", format: "Онлайн", level: "Начинающие", duration: "45 мин", available: true },
    { time: "19:30", title: "Здоровая спина · йогатерапия", format: "Сфера", level: "Терапевтический", duration: "75 мин", available: true },
  ],
  3: [
    { time: "07:30", title: "Утренняя растяжка", format: "Онлайн", level: "Все уровни", duration: "45 мин", available: true },
    { time: "20:00", title: "Хатха для восстановления", format: "Сфера", level: "Все уровни", duration: "75 мин", available: false },
  ],
  4: [
    { time: "09:00", title: "Body Frame · выравнивание", format: "Онлайн", level: "С опытом", duration: "60 мин", available: true },
    { time: "20:00", title: "Хатха для восстановления", format: "Сфера", level: "Все уровни", duration: "75 мин", available: true },
  ],
  5: [
    { time: "08:00", title: "Утренний поток", format: "Онлайн", level: "Все уровни", duration: "60 мин", available: true },
    { time: "19:00", title: "Антистресс · нидра", format: "Онлайн", level: "Все уровни", duration: "60 мин", available: true },
  ],
  6: [
    { time: "10:30", title: "Глубокий класс в «Сфере»", format: "Сфера", level: "С опытом", duration: "90 мин", available: true },
    { time: "12:30", title: "Персональная сессия", format: "Сфера", level: "Индивидуально", duration: "60 мин", available: true },
  ],
  0: [
    { time: "11:00", title: "Restorative · мягкое восстановление", format: "Сфера", level: "Все уровни", duration: "75 мин", available: true },
  ],
};

const DAY_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const DAY_FULL = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const MONTH = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

export function BookingSchedule() {
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }, []);

  const [active, setActive] = useState(days[0].toISOString().slice(0, 10));
  const [booking, setBooking] = useState<{ day: Date; slot: Slot } | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("Заполните имя и телефон");
      return;
    }
    toast.success("Заявка отправлена", {
      description: `${booking!.slot.title} · ${formatDay(booking!.day)} в ${booking!.slot.time}. Я свяжусь, чтобы подтвердить.`,
    });
    setBooking(null);
    setName("");
    setPhone("");
  };

  return (
    <section id="schedule" className="relative overflow-hidden py-14 md:py-20 bg-clay">
      <Mandala className="absolute -top-40 -right-40 w-[560px] h-[560px] text-ink/[0.06] pointer-events-none" petals={20} rings={8} />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Расписание</p>
            <h2 className="h-section">Запись на ближайшую неделю</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Выберите день и удобное время. Группы небольшие — место бронируется заранее.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} className="text-primary" /> 7 дней вперёд
          </div>
        </div>

        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="flex w-full h-auto bg-transparent p-0 gap-2 mb-6 overflow-x-auto justify-start">
            {days.map((d) => {
              const key = d.toISOString().slice(0, 10);
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex-1 min-w-[90px] flex flex-col items-center gap-1 py-3 px-2 rounded-sm border border-ink/10 bg-cream/60 data-[state=active]:bg-ink data-[state=active]:text-cream data-[state=active]:border-ink hover:border-ink/40 transition-all"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                    {isToday ? "Сегодня" : DAY_SHORT[d.getDay()]}
                  </span>
                  <span className="font-display text-xl">{d.getDate()}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] opacity-60">
                    {MONTH[d.getMonth()]}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {days.map((d) => {
            const key = d.toISOString().slice(0, 10);
            const slots = WEEKLY[d.getDay()] ?? [];
            return (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="bg-cream border border-ink/5 rounded-sm overflow-hidden">
                  {slots.length === 0 && (
                    <div className="px-8 py-10 text-center text-muted-foreground">
                      В этот день регулярных классов нет — напишите для индивидуальной сессии.
                    </div>
                  )}
                  {slots.map((s, i) => (
                    <div
                      key={s.time + i}
                      className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 px-6 md:px-8 py-5 md:py-6 items-center border-b border-ink/5 last:border-0 hover:bg-clay/30 transition-colors"
                    >
                      <div className="md:col-span-2">
                        <p className="font-display text-xl md:text-2xl text-primary">{s.time}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.duration}</p>
                      </div>
                      <div className="md:col-span-5 col-span-2">
                        <p className="text-base leading-snug">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.level}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span
                          className={`inline-block text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded-full border ${
                            s.format === "Сфера"
                              ? "border-ink/15 bg-ink text-cream"
                              : "border-ink/15 text-ink"
                          }`}
                        >
                          {s.format}
                        </span>
                      </div>
                      <div className="md:col-span-3 md:text-right col-span-2">
                        {s.available === false ? (
                          <span className="inline-flex items-center text-sm text-muted-foreground">
                            Мест нет
                          </span>
                        ) : (
                          <button
                            onClick={() => setBooking({ day: d, slot: s })}
                            className="inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
                          >
                            Записаться <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        <p className="mt-6 text-xs text-muted-foreground">
          Вводная консультация 3 000 ₽ · отмена за 12 часов · можно перенести запись
        </p>
      </div>

      <Dialog open={!!booking} onOpenChange={(o) => !o && setBooking(null)}>
        <DialogContent className="bg-cream border-ink/10">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Запись на занятие</DialogTitle>
            {booking && (
              <DialogDescription className="text-ink/70">
                {booking.slot.title} · {formatDay(booking.day)} в {booking.slot.time} · {booking.slot.format}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 bg-white border border-ink/15 rounded-sm focus:outline-none focus:border-primary text-sm"
            />
            <input
              type="tel"
              placeholder="Телефон или Telegram"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-3 bg-white border border-ink/15 rounded-sm focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <DialogFooter className="mt-4">
            <button onClick={submit} className="btn-primary w-full justify-center">
              Подтвердить запись <ArrowRight size={14} />
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function formatDay(d: Date) {
  return `${DAY_FULL[d.getDay()]}, ${d.getDate()} ${MONTH[d.getMonth()]}`;
}
