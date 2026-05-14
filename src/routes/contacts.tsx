import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Instagram, Send, MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import { SITE } from "@/lib/site-data";
import studioSpace from "@/assets/studio-space.jpg";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Александра Марченко · йога и йогатерапия" },
      { name: "description", content: "Связаться с Александрой Марченко: телефон, Telegram, WhatsApp, Instagram. Центр «Сфера», Санкт-Петербург." },
      { property: "og:title", content: "Контакты — Александра Марченко" },
      { property: "og:description", content: "Запишитесь на бесплатное первое занятие или консультацию." },
      { property: "og:image", content: studioSpace },
    ],
  }),
  component: Contacts,
});

const CHANNELS = [
  { icon: Phone, label: "Телефон", value: SITE.phone, href: `tel:${SITE.phoneHref}`, hint: "Звонок · 10:00–21:00" },
  { icon: Send, label: "Telegram", value: SITE.telegram, href: SITE.telegramUrl, hint: "Самый быстрый ответ" },
  { icon: MessageCircle, label: "WhatsApp", value: SITE.phone, href: SITE.whatsappUrl, hint: "Сообщение или голосовое" },
  { icon: Instagram, label: "Instagram", value: `@${SITE.instagram}`, href: SITE.instagramUrl, hint: "Практика · истории · отзывы" },
  { icon: MessageCircle, label: "ВКонтакте", value: SITE.vk, href: SITE.vkUrl, hint: "Сообщения ВК" },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, hint: "Для подробных вопросов" },
];

function Contacts() {
  return (
    <>
      <section className="pt-16 pb-20 md:pt-24 md:pb-24">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Контакты</p>
            <h1 className="h-display">
              Свяжитесь <span className="font-serif-italic text-primary">со мной</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Напишите в любом удобном мессенджере. Я отвечаю лично — обычно в течение нескольких часов.
              Первое знакомство и подбор формата — бесплатно.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                const external = c.href.startsWith("http");
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group bg-cream border border-ink/10 rounded-sm p-6 flex items-start gap-4 hover:border-primary hover:bg-clay/40 transition-all"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-full bg-clay flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-cream transition-colors">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="eyebrow mb-1">{c.label}</p>
                      <p className="font-display text-lg leading-snug truncate">{c.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.hint}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <img
              src={studioSpace}
              alt="Центр «Сфера», Санкт-Петербург"
              loading="lazy"
              width={1280}
              height={896}
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />

            <div className="bg-ink text-cream rounded-sm p-7">
              <p className="eyebrow text-primary mb-4">Студия</p>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-cream">{SITE.studio}</p>
                    <p className="text-cream/50 text-xs mt-1">Адрес и проход уточняются после записи</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-cream">Пн–Вс · 08:00–21:00</p>
                    <p className="text-cream/50 text-xs mt-1">По расписанию и предварительной записи</p>
                  </div>
                </div>
              </div>

              <Link
                to="/consultations"
                className="mt-7 inline-flex items-center justify-center w-full gap-2 bg-primary text-cream px-5 py-3 text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
              >
                Записаться на бесплатное занятие
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
