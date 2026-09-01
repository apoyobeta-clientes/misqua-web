import { motion } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import { DoubleBezel } from "./DoubleBezel";
import { ArrowRight } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100dvh] w-full px-4 py-24 md:px-8 lg:px-12 flex flex-col md:flex-row items-center pt-32 gap-12 max-w-[1600px] mx-auto">
      <div className="flex-1 space-y-8 z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex items-center rounded-full bg-brand-purple/5 px-3 py-1 ring-1 ring-brand-purple/10"
        >
          <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-brand-purple">Made in Portland, OR</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-6xl md:text-7xl lg:text-[7.5rem] font-serif leading-[0.9] tracking-tight text-brand-dark text-balance"
        >
          Transita con los sentidos.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-[40ch] text-lg text-brand-gray font-light"
        >
          Velas artesanales inspiradas en viajes, cultura y naturaleza. Detalles que convierten lo cotidiano en mágico.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <a href="#colección">
            <MagneticButton icon={<ArrowRight weight="bold" />}>
              Descubre la colección
            </MagneticButton>
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="flex-1 w-full relative"
      >
        {/* Backdrop mesh gradient blur for ethereal feel */}
        <div className="absolute inset-0 bg-brand-purple opacity-20 blur-[100px] rounded-full translate-y-20 scale-90" />
        <DoubleBezel className="aspect-[4/5] md:aspect-[3/4] md:h-[80vh] w-full max-w-[600px] mx-auto" innerClassName="bg-brand-purple-dark relative">
          <img
            src="/assets/hero-candle.jpg"
            alt="Vela Misqua Artesanal"
            className="h-full w-full object-cover opacity-90 object-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
          />
        </DoubleBezel>
      </motion.div>
    </section>
  );
}
