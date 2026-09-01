import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PaperPlaneTilt, Trash } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";
import { useCart } from "../context/CartContext";

const ORDER_EMAIL = "productsmisqua@gmail.com";

function cartToText(items) {
  return items.map((i) => `${i.qty} x ${i.title}`).join(", ");
}

export function OrderForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState("idle");
  const { items, removeItem, updateQty, clear } = useCart();
  const [producto, setProducto] = useState("");
  const lastAuto = useRef("");

  useEffect(() => {
    const auto = cartToText(items);
    if (producto === "" || producto === lastAuto.current) {
      setProducto(auto);
      lastAuto.current = auto;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
        setProducto("");
        lastAuto.current = "";
        clear();
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

          {items.length > 0 && (
            <div className="mt-10 rounded-2xl bg-white ring-1 ring-black/5 p-5">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-brand-gray mb-4">
                Resumen de tu selección
              </p>
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#F4F1EA] ring-1 ring-black/5">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-dark">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="text-xs text-brand-gray hover:text-brand-dark"
                        >
                          -
                        </button>
                        <span className="text-xs text-brand-dark">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="text-xs text-brand-gray hover:text-brand-dark"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Quitar ${item.title}`}
                      className="text-brand-gray hover:text-red-600 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-brand-gray">
                Sin cobro en línea todavía: confirmamos precio y forma de pago contigo antes de producir tu pedido.
              </p>
            </div>
          )}
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
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
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
