import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { candles, categories } from "../data/candles";
import { CandleModal } from "./CandleModal";

export function Gallery() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("todas");
  const [selected, setSelected] = useState(null);

  const visible = filter === "todas" ? candles : candles.filter((c) => c.category === filter);

  return (
    <section id="colección" className="w-full px-4 py-32 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 max-w-[52ch]">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-dark leading-tight">
            Elige la que se parece a ti.
          </h2>
          <p className="mt-6 text-lg font-light text-brand-gray leading-relaxed">
            Cada pieza se vierte, marmolea y decora a mano una por una, y se puede personalizar en color, forma o mensaje. Estas fotos no están recortadas: así se ven las velas de verdad. Toca una pieza para ver más fotos y su descripción.
          </p>
        </div>

        <div className="mb-16 md:mb-20 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium ring-1 transition-colors ${
                filter === cat.id
                  ? "bg-brand-purple text-white ring-brand-purple"
                  : "bg-transparent text-brand-dark ring-black/10 hover:ring-black/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:_balance]">
          {visible.map((piece, i) => (
            <motion.button
              key={piece.id}
              onClick={() => setSelected(piece)}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.32, 0.72, 0, 1] }}
              className="mb-6 md:mb-8 block w-full text-left break-inside-avoid group"
            >
              <div className="p-1.5 ring-1 ring-black/5 bg-[#F4F1EA] rounded-[1.5rem] relative">
                <div className="overflow-hidden rounded-[calc(1.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  <img
                    src={piece.images[0]}
                    alt={`${piece.title}, vela artesanal Misqua`}
                    className="w-full h-auto object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
                  />
                </div>
                {piece.images.length > 1 && (
                  <span className="absolute bottom-4 left-4 flex h-9 items-center rounded-full bg-white/90 px-3 text-brand-dark text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-black/5">
                    +{piece.images.length - 1} fotos
                  </span>
                )}
                <span className="absolute -top-3 -right-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple text-white shadow-lg ring-4 ring-white transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-125">
                  <span className="font-serif text-lg font-bold leading-none">${piece.price}</span>
                </span>
              </div>
              <div className="mt-5">
                <span className="inline-block rounded-full bg-brand-gold/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-brand-gold">
                  {piece.tag}
                </span>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-brand-dark leading-tight">{piece.title}</h3>
                <p className="mt-1 text-sm text-brand-gray">{piece.note}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CandleModal candle={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
