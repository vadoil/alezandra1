# Деплой alexandramarchenko.pro на VPS

Сайт собирается в GitHub Actions, пререндерится в статику и заливается
по rsync в `/var/www/alezandra1/dist/`. На VPS статику отдаёт nginx.

## Один раз — настройка

### 1. SSH-ключ для деплоя

На VPS:
```bash
ssh-keygen -t ed25519 -f ~/.ssh/gh_deploy -N ""
cat ~/.ssh/gh_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/gh_deploy            # приватный — скопировать в GitHub Secrets
mkdir -p /var/www/alezandra1/dist
```

### 2. Секреты репозитория

GitHub → Settings → Secrets and variables → Actions → New repository secret:

- `VPS_HOST` — IP или домен сервера
- `VPS_USER` — пользователь (`root` или `deploy`)
- `VPS_SSH_KEY` — содержимое `~/.ssh/gh_deploy` (приватный ключ целиком)

### 3. Nginx-конфиг

`/etc/nginx/sites-available/alexandramarchenko.pro.conf`:

```nginx
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

    # SPA-fallback + pretty URLs (/about → /about/index.html)
    location / {
        try_files $uri $uri/index.html $uri.html /index.html;
    }

    # Долгий кеш для хешированных ассетов
    location ~* \.(js|css|woff2?|png|jpe?g|svg|webp|ico|mp4)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # gzip
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
```

Активировать:
```bash
ln -s /etc/nginx/sites-available/alexandramarchenko.pro.conf \
      /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d alexandramarchenko.pro -d www.alexandramarchenko.pro
```

### 4. Убрать старый pm2 (если есть)

```bash
pm2 delete alezandra1 2>/dev/null
pm2 save
```

## Дальше

Каждый push в `main` → GitHub Actions сам соберёт и зальёт обновление.
Запустить вручную можно через Actions → «Deploy to VPS» → Run workflow.
