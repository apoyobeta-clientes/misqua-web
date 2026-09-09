import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash, ShoppingCartSimple, WhatsappLogo } from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";

const WHATSAPP_NUMBER = "13603280435";

export function CartDrawer() {
  const { items, removeItem, updateQty, isOpen, setIsOpen, count, total } = useCart();

  const whatsappHref = (() => {
    const lines = items.map((i) => `${i.qty} x ${i.title} ($${i.price} c/u)`).join("\n");
    const message = `Hola Misqua, quiero pedir:\n${lines}\n\nTotal: $${total}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[120] bg-brand-dark/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 z-[130] h-[100dvh] w-full max-w-md bg-brand-light shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-black/10">
              <div className="flex items-center gap-3">
                <ShoppingCartSimple size={22} weight="bold" className="text-brand-purple" />
                <h3 className="font-serif text-2xl text-brand-dark">Tu selección</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar carrito"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-brand-gray font-light">
                  Aún no has agregado velas. Explora la colección y toca "Añadir a mi selección" en la pieza que te guste.
                </p>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F4F1EA] ring-1 ring-black/5">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="font-serif text-lg text-brand-dark leading-tight">{item.title}</p>
                          <span className="font-serif text-2xl font-semibold text-brand-purple shrink-0">${item.price}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Reducir cantidad"
                            className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/10 hover:bg-black/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium text-brand-dark w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Aumentar cantidad"
                            className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/10 hover:bg-black/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Quitar ${item.title}`}
                            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-brand-gray hover:text-red-600 transition-colors"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-black/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-brand-gray">
                    {count} {count === 1 ? "vela seleccionada" : "velas seleccionadas"}
                  </p>
                  <p className="font-serif text-3xl font-semibold text-brand-dark">${total}</p>
                </div>
                <p className="text-sm text-brand-gray">
                  Sin cobro en línea: confirmamos el pago contigo por correo o WhatsApp.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:brightness-95 transition-[filter]"
                >
                  <WhatsappLogo weight="fill" size={18} />
                  Pedir ya por WhatsApp
                </a>
                <a
                  href="#pedido"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-full ring-1 ring-black/10 px-6 py-3 text-sm font-medium text-brand-dark hover:bg-black/5 transition-colors"
                >
                  O completar formulario de pedido
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
