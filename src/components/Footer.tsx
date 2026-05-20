import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-32">
      <div className="container-x py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="font-serif-italic text-3xl text-cream leading-tight max-w-md">
              «Моя задача — научить вас слышать тело раньше, чем оно начнёт болеть».
            </p>
            <p className="mt-6 text-sm text-cream/50">— Александра Марченко</p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-primary mb-5">Навигация</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Главная</Link></li>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-primary transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-primary mb-5">Контакты</p>
            <ul className="space-y-3 text-sm">
              <li>{SITE.studio}</li>
              <li>
                <a href={SITE.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  Telegram: {SITE.telegram}
                </a>
              </li>
              <li>
                <a href={SITE.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  YouTube: @{SITE.youtube}
                </a>
              </li>
              <li>
                <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  GRAM: @{SITE.instagram}
                </a>
              </li>
              <li>
                <a href={SITE.vkUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
          <p>Личный бренд преподавателя йоги и йогатерапии</p>
        </div>
      </div>
    </footer>
  );
}
