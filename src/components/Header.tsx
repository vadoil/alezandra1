import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-cream/95 backdrop-blur border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-[72px]">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-display text-base font-medium tracking-tight">
            {SITE.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
            йога · йогатерапия
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 mr-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-ink/75 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/consultations" className="btn-primary !py-3 !px-5 text-xs">
            Консультация
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-ink/5">
          <div className="container-x py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-base text-ink/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/consultations"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 self-start"
            >
              Записаться на консультацию
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
