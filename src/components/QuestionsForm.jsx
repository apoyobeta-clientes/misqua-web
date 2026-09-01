import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

const CONTACT_EMAIL = "productsmisqua@gmail.com";

export function QuestionsForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full px-4 py-24 md:py-32 md:px-8 lg:px-12 bg-[#ECEADD]">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="max-w-[720px] mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark leading-tight">
          ¿Tienes una duda antes de pedir?
        </h2>
        <p className="mt-4 text-base font-light text-brand-gray leading-relaxed">
          Escríbenos tu pregunta sobre aromas, tiempos de entrega o personalización. Te respondemos por correo a {CONTACT_EMAIL}.
        </p>

        <form
          action={`https://formsubmit.co/${CONTACT_EMAIL}`}
          method="POST"
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row gap-3 text-left"
        >
          <input type="hidden" name="_subject" value="Nueva pregunta desde misqua-web" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />

          <label htmlFor="pregunta-email" className="sr-only">
            Tu correo
          </label>
          <input
            id="pregunta-email"
            name="Correo"
            type="email"
            required
            placeholder="tucorreo@ejemplo.com"
            className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-gray/60 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-colors"
          />
          <label htmlFor="pregunta-mensaje" className="sr-only">
            Tu pregunta
          </label>
          <input
            id="pregunta-mensaje"
            name="Pregunta"
            type="text"
            required
            placeholder="Escribe tu pregunta"
            className="flex-[2] rounded-xl border border-black/10 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-gray/60 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-colors"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-medium text-white hover:bg-brand-purple-dark transition-colors"
          >
            {status === "sending" ? "Enviando..." : "Preguntar"}
            <PaperPlaneTilt weight="bold" size={16} />
          </button>
        </form>

        {status === "sent" && (
          <p className="mt-4 text-sm text-brand-purple">Pregunta enviada. Te respondemos pronto.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-600">No se pudo enviar. Escríbenos directo a {CONTACT_EMAIL}.</p>
        )}
      </motion.div>
    </section>
  );
}
