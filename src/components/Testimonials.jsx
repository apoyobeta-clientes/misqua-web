import { motion, useReducedMotion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";

const testimonials = [
  {
    quote: "El aroma dura semanas y se siente en toda la casa desde que la enciendo. La de mango colombiana es mi favorita.",
    name: "Camila Rojas",
    role: "Cliente en Portland, OR",
  },
  {
    quote: "Pedí la vela personalizada como regalo y la calidad de la cera y el vidrio superó lo que esperaba por el precio.",
    name: "Daniela Ortiz",
    role: "Cliente en Vancouver, WA",
  },
  {
    quote: "Quema pareja, sin humo negro ni túnel en el centro. Se nota que está hecha a mano con cuidado.",
    name: "Laura Méndez",
    role: "Cliente recurrente",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <section className="w-full px-4 py-32 md:py-40 md:px-8 lg:px-12 bg-[#ECEADD]">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="max-w-[20ch] text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark leading-tight mb-16 md:mb-20">
          La calidad que nuestras clientas notan.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col gap-6"
            >
              <Quotes size={28} weight="fill" className="text-brand-gold" />
              <blockquote className="text-lg font-light text-brand-dark leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="text-sm text-brand-gray">
                <span className="font-medium text-brand-dark">{t.name}</span>
                <br />
                {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
