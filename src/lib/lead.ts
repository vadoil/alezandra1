// Отправка заявки на сервер /api/lead → Telegram
export type LeadPayload = {
  type: string;
  name: string;
  contact: string;
  comment?: string;
  source?: string;
  // honeypot — не заполняется людьми
  website?: string;
};

export async function sendLead(payload: LeadPayload): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      source: payload.source || (typeof window !== "undefined" ? window.location.href : "site"),
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `HTTP ${res.status}`);
  }
}
