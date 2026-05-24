#!/usr/bin/env node
/**
 * Prerender script.
 *
 * Запускает локальный wrangler dev (workerd) на собранном dist/,
 * обходит все маршруты сайта, сохраняет HTML в dist/static/<route>/index.html
 * и копирует клиентские ассеты из dist/client.
 *
 * Результат — папка dist/static/, которую можно отдавать как статику
 * через nginx (try_files $uri $uri/ /index.html;).
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";

const PORT = process.env.PRERENDER_PORT || "4173";
const HOST = `http://127.0.0.1:${PORT}`;
const OUT = "dist/static";

// Список маршрутов. Динамические — перечисляем явно.
const ROUTES = [
  "/",
  "/about",
  "/consultations",
  "/contacts",
  "/courses",
  "/directions",
  "/program",
  "/courses/yoga-from-scratch",
  "/courses/healthy-back",
  "/courses/anti-stress",
  "/programs/vip-architect",
  "/programs/body-frame",
  "/programs/spine-reset",
];

if (!existsSync("dist/server/wrangler.json")) {
  console.error("dist/server/wrangler.json не найден. Сначала запусти `npm run build`.");
  process.exit(1);
}

console.log(`→ запускаю wrangler dev на порту ${PORT}…`);
const wrangler = spawn(
  "bunx",
  [
    "wrangler",
    "dev",
    "--local",
    "--ip", "127.0.0.1",
    "--port", PORT,
    "--config", "dist/server/wrangler.json",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);

wrangler.stdout.on("data", (d) => process.stdout.write(`[wrangler] ${d}`));
wrangler.stderr.on("data", (d) => process.stderr.write(`[wrangler] ${d}`));

// ждём, пока поднимется
const waitReady = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(HOST + "/");
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("wrangler dev не поднялся за 60 секунд");
};

try {
  await waitReady();
  console.log("✓ wrangler готов, начинаю обход…");

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const route of ROUTES) {
    const res = await fetch(HOST + route);
    if (!res.ok) {
      throw new Error(`route ${route} вернул ${res.status}`);
    }
    const html = await res.text();
    const filePath =
      route === "/"
        ? join(OUT, "index.html")
        : join(OUT, route, "index.html");
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, html);
    console.log(`  ✓ ${route}  →  ${filePath}`);
  }

  console.log("→ копирую клиентские ассеты из dist/client…");
  await cp("dist/client", OUT, { recursive: true });

  console.log(`\n✓ Готово. Статика лежит в ${OUT}/`);
} catch (e) {
  console.error("✗ prerender упал:", e);
  process.exitCode = 1;
} finally {
  wrangler.kill("SIGTERM");
}
