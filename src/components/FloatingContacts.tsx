import { useEffect, useState } from "react";
import { Send, MessageCircle, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site-data";

/**
 * Плавающая кнопка контактов (низ-лево) с иконкой йоги.
 * Раскрывается в панель со всеми мессенджерами.
 */
export function FloatingContacts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { label: "Telegram", href: SITE.telegramUrl, color: "#229ED9", icon: <Send size={16} /> },
    { label: "WhatsApp", href: SITE.whatsappUrl, color: "#25D366", icon: <MessageCircle size={16} /> },
    {
      label: "Instagram",
      href: SITE.instagramUrl,
      color: "#E1306C",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "ВКонтакте",
      href: SITE.vkUrl,
      color: "#0077FF",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.4 17.5c-5.5 0-8.6-3.8-8.7-10h2.7c.1 4.6 2.1 6.5 3.7 6.9V7.5h2.6v3.9c1.6-.2 3.2-2 3.8-3.9h2.6c-.5 2.4-2.2 4.2-3.5 4.9 1.2.6 3.2 2.1 4 4.9h-2.8c-.6-1.9-2-3.4-4.1-3.6v3.6h-.3z"/>
        </svg>
      ),
    },
    { label: "Позвонить", href: `tel:${SITE.phoneHref}`, color: "#C9622A", icon: <Phone size={16} /> },
  ];

  return (
    <div className="fixed left-5 bottom-5 z-40 print:hidden">
      {/* Панель */}
      <div
        className={`mb-3 origin-bottom-left transition-all duration-300 ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-cream border border-ink/10 rounded-sm shadow-xl p-4 w-64">
          <p className="eyebrow mb-3">Связаться с Александрой</p>
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it.label}>
                <a
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-clay transition-colors text-sm"
                >
                  <span
                    className="w-8 h-8 rounded-full inline-flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: it.color }}
                  >
                    {it.icon}
                  </span>
                  <span className="text-ink/85">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Кнопка */}
      <button
        type="button"
        aria-label={open ? "Закрыть контакты" : "Открыть контакты"}
        onClick={() => setOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
      >
        {open ? (
          <X size={22} />
        ) : (
          // Силуэт йоги (лотос/медитация)
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* голова */}
            <circle cx="32" cy="14" r="4.2" />
            {/* туловище и руки в намасте */}
            <path d="M32 19c-3.5 4-3.5 9 0 13 3.5-4 3.5-9 0-13z" />
            <path d="M32 32c-7 0-14 3-18 9 6 4 12 5 18 5s12-1 18-5c-4-6-11-9-18-9z" />
            {/* колени-лотос */}
            <path d="M14 41c-1 2-1 4 0 5" />
            <path d="M50 41c1 2 1 4 0 5" />
          </svg>
        )}
        <span className="sr-only">Контакты</span>
      </button>
    </div>
  );
}
