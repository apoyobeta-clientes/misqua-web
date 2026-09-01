import { motion } from "motion/react";
import { DoubleBezel } from "./DoubleBezel";

const bentoItems = [
  { img: "/assets/bento-wine.jpg", title: "Vendimia Tinta", cols: "md:col-span-8", rows: "md:row-span-2", aspect: "aspect-[16/9]" },
  { img: "/assets/bento-flower.jpg", title: "Flor Silvestre", cols: "md:col-span-4", rows: "md:row-span-1", aspect: "aspect-square" },
  { img: "/assets/bento-tin.jpg", title: "Cree en Ti", cols: "md:col-span-4", rows: "md:row-span-1", aspect: "aspect-[4/5]" },
];

export function BentoGallery() {
  return (
    <section id="colección" className="w-full px-4 py-32 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 md:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-dark leading-tight"
          >
            Aromas que<br/>te transportan.
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-6 md:gap-8">
          {bentoItems.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.2 }}
               transition={{ duration: 0.8, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
               className={`${item.cols} ${item.rows} relative group`}
             >
                <DoubleBezel className={`w-full ${item.aspect} md:h-full`}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <h3 className="absolute bottom-8 left-8 text-white font-serif text-3xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">{item.title}</h3>
                </DoubleBezel>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
