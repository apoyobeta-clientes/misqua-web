import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CaretLeft, CaretRight, PaperPlaneTilt, ShoppingCartSimple } from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";

export function CandleModal({ candle, onClose }) {
  const [active, setActive] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    setActive(0);
  }, [candle]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!candle) return null;

  const next = () => setActive((i) => (i + 1) % candle.images.length);
  const prev = () => setActive((i) => (i - 1 + candle.images.length) % candle.images.length);

  return (
    <AnimatePresence>
      {candle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md px-4 py-8 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90dvh] overflow-y-auto rounded-[1.75rem] bg-brand-light ring-1 ring-black/10 shadow-2xl grid grid-cols-1 md:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark/80 text-white hover:bg-brand-dark transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative bg-[#F4F1EA] flex items-center justify-center p-6 md:p-10 min-h-[320px]">
              <img
                key={candle.images[active]}
                src={candle.images[active]}
                alt={`${candle.title}, foto ${active + 1} de ${candle.images.length}`}
                className="max-h-[50dvh] md:max-h-[70dvh] w-auto object-contain rounded-xl"
              />

              {candle.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-dark hover:bg-white transition-colors ring-1 ring-black/5"
                  >
                    <CaretLeft size={18} weight="bold" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Foto siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-dark hover:bg-white transition-colors ring-1 ring-black/5"
                  >
                    <CaretRight size={18} weight="bold" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {candle.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Ver foto ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-brand-purple" : "w-1.5 bg-brand-dark/20"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-8 md:p-10 flex flex-col">
              <span className="font-mono text-xs text-brand-gold">No. {candle.no}</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-serif text-brand-dark leading-tight">
                {candle.title}
              </h3>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm border-t border-black/10 pt-6">
                <div>
                  <dt className="text-brand-gray">Aroma</dt>
                  <dd className="text-brand-dark font-medium mt-1">{candle.scent}</dd>
                </div>
                <div>
                  <dt className="text-brand-gray">Formato</dt>
                  <dd className="text-brand-dark font-medium mt-1">{candle.size}</dd>
                </div>
              </dl>

              <p className="mt-6 text-base font-light text-brand-gray leading-relaxed">
                {candle.description}
              </p>

              <div className="mt-auto pt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => addItem(candle)}
                  className="inline-flex items-center gap-3 rounded-full bg-brand-purple px-6 py-3 text-sm font-medium text-white hover:bg-brand-purple-dark transition-colors"
                >
                  Añadir a mi selección
                  <ShoppingCartSimple weight="bold" size={16} />
                </button>
                <a
                  href="#pedido"
                  onClick={onClose}
                  className="inline-flex items-center gap-3 rounded-full ring-1 ring-black/10 px-6 py-3 text-sm font-medium text-brand-dark hover:bg-black/5 transition-colors"
                >
                  Pedir ahora
                  <PaperPlaneTilt weight="bold" size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
