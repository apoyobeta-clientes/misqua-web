import { motion, useReducedMotion } from "motion/react";
import { DoubleBezel } from "./DoubleBezel";

export function Philosophy() {
  const reduce = useReducedMotion();
  return (
    <section id="filosofía" className="w-full px-4 py-32 md:py-48 md:px-8 lg:px-12 bg-brand-light">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
        <div className="md:col-span-7">
          <motion.h2 
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="text-5xl md:text-6xl lg:text-[6rem] font-serif leading-[1.1] tracking-tight text-brand-dark"
          >
            No es el aroma.<br />Eres tú, en cera.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="mt-8 text-lg font-light text-brand-gray max-w-[45ch] leading-relaxed"
          >
            El concepto de MISQUA no es vender velas aromáticas. Es que cada vela refleje tu personalidad: el color, la forma, el mensaje y el aroma se eligen o se personalizan para contar quién eres. Vertida a mano, pieza por pieza.
          </motion.p>
        </div>
        <div className="md:col-span-5">
           <DoubleBezel className="aspect-square w-full" innerClassName="bg-[#ECEADD]">
              <img
                src="/assets/philosophy-candle.jpg"
                alt="Vela Misqua encendida"
                className="w-full h-full object-cover object-center opacity-95 transition-all duration-1000 hover:scale-105"
              />
           </DoubleBezel>
        </div>
      </div>
    </section>
  );
}
