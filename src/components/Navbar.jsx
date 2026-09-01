import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-12 rounded-full bg-white/70 backdrop-blur-xl pl-8 pr-3 py-2 ring-1 ring-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <span className="font-serif text-xl font-medium tracking-[0.15em] text-brand-purple">MISQUA</span>
          <button 
            onClick={() => setIsOpen(true)} 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple text-white hover:bg-brand-purple-dark transition-colors"
          >
            <List size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-light/98 backdrop-blur-3xl"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-center">
              {['Inicio', 'Filosofía', 'Colección', 'Contacto'].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  className="font-serif text-5xl md:text-7xl font-light text-brand-dark hover:text-brand-gold transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
