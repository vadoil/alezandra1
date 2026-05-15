import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/lib/site-data";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Вопросы</p>
          <h2 className="h-section text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl break-words hyphens-auto">
            Что часто<br />спрашивают
          </h2>
          <p className="mt-5 text-muted-foreground max-w-sm">
            Если не нашли ответ — напишите в Telegram или приходите на консультацию.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="border-t border-ink/10">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-ink/10">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left gap-6"
                  >
                    <span className="text-base md:text-lg">{item.q}</span>
                    {isOpen ? <Minus size={18} className="shrink-0 text-primary" /> : <Plus size={18} className="shrink-0 text-primary" />}
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden text-muted-foreground max-w-2xl">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
