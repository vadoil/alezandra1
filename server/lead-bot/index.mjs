#!/usr/bin/env node
// Микросервис: принимает заявки с сайта и шлёт их в Telegram-группу.
// ENV: BOT_TOKEN, CHAT_ID, PORT (default 8787), ALLOWED_ORIGIN (опц.)

import http from "node:http";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = Number(process.env.PORT || 8787);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("BOT_TOKEN и CHAT_ID обязательны");
  process.exit(1);
}

// Простой rate-limit по IP: 5 заявок / 10 минут
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
function rateLimit(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= LIMIT) return false;
  arr.push(now);
  hits.set(ip, arr);
  return true;
}

function clean(s, max = 500) {
  return String(s ?? "").replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, max);
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendToTelegram(text) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(`Telegram ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

const cors = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json", ...cors });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method !== "POST" || url.pathname !== "/api/lead") {
    res.writeHead(404, cors);
    res.end("Not found");
    return;
  }

  const ip = (req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "unknown").trim();
  if (!rateLimit(ip)) {
    res.writeHead(429, { "Content-Type": "application/json", ...cors });
    res.end(JSON.stringify({ ok: false, error: "Too many requests" }));
    return;
  }

  let raw = "";
  req.on("data", (c) => {
    raw += c;
    if (raw.length > 10_000) req.destroy();
  });
  req.on("end", async () => {
    try {
      const body = JSON.parse(raw || "{}");

      // honeypot — если поле заполнено, тихо «успешно» отбрасываем
      if (body.website) {
        res.writeHead(200, { "Content-Type": "application/json", ...cors });
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      const type = clean(body.type || "заявка", 60);
      const name = clean(body.name, 120);
      const contact = clean(body.contact, 200);
      const comment = clean(body.comment, 1000);
      const source = clean(body.source || "site", 200);

      if (!name || !contact) {
        res.writeHead(400, { "Content-Type": "application/json", ...cors });
        res.end(JSON.stringify({ ok: false, error: "name и contact обязательны" }));
        return;
      }

      const lines = [
        `🌿 <b>Новая заявка · ${escapeHtml(type)}</b>`,
        `👤 <b>Имя:</b> ${escapeHtml(name)}`,
        `📞 <b>Контакт:</b> ${escapeHtml(contact)}`,
      ];
      if (comment) lines.push(`💬 <b>Комментарий:</b> ${escapeHtml(comment)}`);
      lines.push(`🔗 ${escapeHtml(source)}`);
      lines.push(`🕒 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК`);

      await sendToTelegram(lines.join("\n"));

      res.writeHead(200, { "Content-Type": "application/json", ...cors });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      console.error("lead error:", e);
      res.writeHead(500, { "Content-Type": "application/json", ...cors });
      res.end(JSON.stringify({ ok: false, error: "internal" }));
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`lead-bot listening on 127.0.0.1:${PORT}`);
});
