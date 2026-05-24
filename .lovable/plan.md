## Цель

Перевести `alexandramarchenko.pro` на чистую статику (SPA) и автодеплой из GitHub на VPS в `/var/www/alezandra1/dist`, по аналогии с твоими соседними сайтами. Lovable preview при этом продолжит работать.

## Что меняем в коде

Текущая сборка — TanStack **Start** (SSR через Cloudflare Worker). Для статики переключаемся на TanStack **Router** + Vite SPA. Это безопасно: вся бизнес-логика сайта чисто фронтовая (контент, квиз на `useState`, формы через toast), серверных функций нет.

Изменения:

1. **Удалить SSR-обвязку:**
   - `src/server.ts`, `src/start.ts`, `wrangler.jsonc`
   - из `package.json` убрать `@cloudflare/vite-plugin`, `wrangler`, `@tanstack/react-start`
2. **Добавить SPA-точку входа:**
   - `index.html` в корне (с `<div id="root">`, мета, шрифты Google Fonts, favicon)
   - `src/main.tsx` — `createRoot(...).render(<RouterProvider router={...} />)`
3. **Переписать `src/router.tsx`** — обычный `createRouter` из `@tanstack/react-router` (без `createStart`).
4. **Переписать `src/routes/__root.tsx`** — убрать `shellComponent`, `HeadContent`, `Scripts`. Заголовки/мета страниц переехать в `react-helmet-async` (или просто в `useEffect` через `document.title` для простых случаев — но helmet чище для SEO).
5. **Заменить `vite.config.ts`** на обычный Vite + `@tanstack/router-plugin/vite` + tailwind + react.
6. **Скрипты:** `build` → обычный `vite build`, артефакт в `dist/`.
7. **`public/_redirects` и/или `404.html`** не нужны — SPA-фоллбек делает nginx через `try_files`.

Lovable preview продолжит работать: SPA билд Vite полностью поддерживается превью-средой Lovable.

## GitHub Actions

Файл `.github/workflows/deploy.yml`:

```text
on: push к main → checkout → setup-node 20 → npm ci → npm run build →
  rsync dist/ → user@VPS:/var/www/alezandra1/dist/
```

Используем секреты репозитория: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (приватный ключ для деплоя).

## Nginx на VPS

Файл `/etc/nginx/sites-available/alexandramarchenko.pro.conf`:

```text
server {
  listen 80;
  server_name alexandramarchenko.pro www.alexandramarchenko.pro;
  return 301 https://alexandramarchenko.pro$request_uri;
}

server {
  listen 443 ssl http2;
  server_name alexandramarchenko.pro;

  root /var/www/alezandra1/dist;
  index index.html;

  # SPA fallback
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Кеш статики
  location ~* \.(js|css|woff2?|png|jpe?g|svg|webp|ico)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }

  # certbot подставит ssl_certificate сам
}
```

Дальше `certbot --nginx -d alexandramarchenko.pro -d www.alexandramarchenko.pro`.

PM2-процесс `alezandra1` больше не нужен — статику отдаёт сам nginx.

## Что от тебя нужно

1. **Сгенерировать SSH-ключ для деплоя** на VPS (если ещё нет общего):
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/gh_deploy -N ""
   cat ~/.ssh/gh_deploy.pub >> ~/.ssh/authorized_keys
   cat ~/.ssh/gh_deploy   # приватный — в GitHub Secrets
   ```
2. **Завести секреты в репо** (`Settings → Secrets and variables → Actions`):
   - `VPS_HOST` = IP/домен сервера
   - `VPS_USER` = пользователь (например `root` или `deploy`)
   - `VPS_SSH_KEY` = содержимое `~/.ssh/gh_deploy`
3. **Создать каталог:** `mkdir -p /var/www/alezandra1/dist && chown -R $USER:$USER /var/www/alezandra1`
4. **После первого деплоя** — применить nginx-конфиг и certbot.

## Порядок выполнения

1. Делаю код-миграцию SPA + workflow в одном коммите.
2. Ты пушишь секреты + ключ на VPS.
3. Первый запуск Actions кладёт билд в `/var/www/alezandra1/dist`.
4. Активируем nginx-конфиг + certbot → сайт живёт.

## Риски / нюансы

- TanStack Start head() во всех route-файлах придётся переписать на helmet. Это механическая, но широкая правка (8 страниц).
- Lovable preview после миграции работает на SPA — никаких визуальных изменений быть не должно, но превью может разок мигнуть после первого билда.
- Если в будущем понадобится SSR (например, динамические OG для соцсетей) — придётся возвращаться к Start или ставить пререндер. Для статического контента сейчас это не нужно.

Подтверди — начинаю миграцию.