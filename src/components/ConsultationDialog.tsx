import { useState, ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendLead } from "@/lib/lead";

type Props = {
  trigger: ReactNode;
};

export function ConsultationDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim() || !contact.trim()) {
      toast.error("Заполните имя и контакт");
      return;
    }
    setLoading(true);
    try {
      await sendLead({
        type: "Вводная консультация",
        name,
        contact,
        comment,
        website,
      });
      toast.success("Заявка отправлена. Я свяжусь с вами в ближайшее время.");
      setOpen(false);
      setName("");
      setContact("");
      setComment("");
    } catch (e) {
      console.error(e);
      toast.error("Не удалось отправить. Напишите мне в Telegram или попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-cream border-ink/10 text-ink">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Вводная консультация
          </DialogTitle>
          <DialogDescription className="text-ink/70">
            1 час онлайн · 3 000 ₽. Оставьте контакты — я свяжусь и подберу время.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-white border border-ink/15 rounded-sm focus:outline-none focus:border-primary text-sm"
          />
          <input
            type="text"
            placeholder="Телефон, Telegram или WhatsApp"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="px-4 py-3 bg-white border border-ink/15 rounded-sm focus:outline-none focus:border-primary text-sm"
          />
          <textarea
            placeholder="Запрос или комментарий (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="px-4 py-3 bg-white border border-ink/15 rounded-sm focus:outline-none focus:border-primary text-sm resize-none"
          />
          {/* honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
        </div>
        <DialogFooter className="mt-4">
          <button onClick={submit} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Отправляем…</> : <>Отправить заявку <ArrowRight size={14} /></>}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
