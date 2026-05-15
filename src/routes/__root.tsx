import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContacts } from "@/components/FloatingContacts";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display">404</h1>
        <h2 className="mt-4 text-xl">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Похоже, страница переехала или её больше нет.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">На главную</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
      <div className="max-w-md text-center">
        <h1 className="text-xl">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Обновить
          </button>
          <a href="/" className="btn-outline">На главную</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Александра Марченко — йога и йогатерапия" },
      {
        name: "description",
        content:
          "Бережная йога и йогатерапия для восстановления, снятия напряжения и системной практики. Онлайн и в центре «Сфера».",
      },
      { name: "author", content: "Александра Марченко" },
      { property: "og:title", content: "Александра Марченко — йога и йогатерапия" },
      {
        property: "og:description",
        content:
          "Бережная йога и йогатерапия. Онлайн и оффлайн в центре «Сфера», Санкт-Петербург.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Александра Марченко — йога и йогатерапия" },
      { name: "description", content: "A premium wellness website for yoga and yoga therapy, designed to attract clients and drive sales for courses and sessions." },
      { property: "og:description", content: "A premium wellness website for yoga and yoga therapy, designed to attract clients and drive sales for courses and sessions." },
      { name: "twitter:description", content: "A premium wellness website for yoga and yoga therapy, designed to attract clients and drive sales for courses and sessions." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e3ee1c13-e4ef-4e41-acaf-92e801780398/id-preview-75cda19d--14da0283-916b-4c79-986e-ea9fb8287218.lovable.app-1778754369904.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e3ee1c13-e4ef-4e41-acaf-92e801780398/id-preview-75cda19d--14da0283-916b-4c79-986e-ea9fb8287218.lovable.app-1778754369904.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=Anton&family=Bebas+Neue&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <FloatingContacts />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
