# lead-bot

Маленький Node-сервис: принимает POST `/api/lead` и шлёт заявку в Telegram-группу.

## Установка на VPS (один раз)

```bash
sudo mkdir -p /opt/lead-bot
sudo cp index.mjs /opt/lead-bot/
sudo tee /opt/lead-bot/.env >/dev/null <<'EOF'
BOT_TOKEN=ВАШ_ТОКЕН_БОТА
CHAT_ID=-1003974899574
PORT=8787
ALLOWED_ORIGIN=https://alexandramarchenko.pro
EOF
sudo chown -R www-data:www-data /opt/lead-bot
sudo chmod 600 /opt/lead-bot/.env

sudo cp lead-bot.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now lead-bot
sudo systemctl status lead-bot --no-pager
```

## Nginx — добавь в server-блок сайта (внутри `server { ... }` для 443)

```nginx
location = /api/lead {
    proxy_pass http://127.0.0.1:8787/api/lead;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Затем `sudo nginx -t && sudo systemctl reload nginx`.

## ВАЖНО: добавь бота в группу

1. В Telegram открой свою группу → «Управление» → «Администраторы» → добавь бота.
2. Дай право «Отправлять сообщения».
3. Проверка:

```bash
curl -X POST https://alexandramarchenko.pro/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест","contact":"@test","type":"проверка"}'
```

В группе должно появиться сообщение.

## Что отправляется

Поля: `type`, `name`, `contact`, `comment`, `source` (откуда заявка).
Защита: rate-limit 5 заявок / 10 мин / IP, honeypot-поле `website`, валидация длины.
