import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

const ORDER_EMAIL = "productsmisqua@gmail.com";

export function OrderForm() {
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
    <section id="pedido" className="w-full px-4 py-32 md:py-40 md:px-8 lg:px-12 bg-brand-light">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-5">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark leading-tight">
            Haz tu pedido.
          </h2>
          <p className="mt-6 text-lg font-light text-brand-gray max-w-[42ch] leading-relaxed">
            Cuéntanos qué vela quieres y para cuándo la necesitas. Te respondemos por correo a {ORDER_EMAIL} para confirmar detalles y pago.
          </p>
        </div>

        <motion.form
          action={`https://formsubmit.co/${ORDER_EMAIL}`}
          method="POST"
          onSubmit={handleSubmit}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <input type="hidden" name="_subject" value="Nuevo pedido desde misqua-web" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />

          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="text-sm font-medium text-brand-dark">
              Nombre
            </label>
            <input
              id="nombre"
              name="Nombre"
              type="text"
              required
              placeholder="Tu nombre completo"
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-gray/60 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contacto" className="text-sm font-medium text-brand-dark">
              Correo o teléfono
            </label>
            <input
              id="contacto"
              name="Contacto"
              type="text"
              required
              placeholder="tucorreo@ejemplo.com"
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-gray/60 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-colors"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-2">
            <label htmlFor="producto" className="text-sm font-medium text-brand-dark">
              Producto y cantidad
            </label>
            <input
              id="producto"
              name="Producto"
              type="text"
              required
              placeholder="Ej. 2 velas Colombiana Mango, 10oz"
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-gray/60 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-colors"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-2">
            <label htmlFor="mensaje" className="text-sm font-medium text-brand-dark">
              Mensaje (opcional)
            </label>
            <textarea
              id="mensaje"
              name="Mensaje"
              rows={4}
              placeholder="Fecha de entrega, personalización, preguntas..."
              className="resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-gray/60 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-colors"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col items-start gap-3 pt-2">
            <MagneticButton icon={<PaperPlaneTilt weight="bold" />}>
              {status === "sending" ? "Enviando..." : "Enviar pedido"}
            </MagneticButton>

            {status === "sent" && (
              <p className="text-sm text-brand-purple">
                Pedido enviado. Te contactaremos pronto a tu correo.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">
                No se pudo enviar. Escríbenos directo a {ORDER_EMAIL}.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
