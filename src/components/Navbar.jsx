import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X, ShoppingCartSimple } from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { count, setIsOpen: setCartOpen } = useCart();

  return (
    <>
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-2xl px-4">
        <nav className="flex items-center gap-4 rounded-full bg-white/80 backdrop-blur-xl pl-6 pr-3 py-2.5 ring-1 ring-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <span className="font-serif text-2xl md:text-3xl font-semibold tracking-[0.1em] text-brand-purple">MISQUA</span>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Ver mi selección"
            className="relative ml-auto flex h-14 items-center gap-2 rounded-full bg-brand-purple/10 px-5 text-brand-purple hover:bg-brand-purple/15 transition-colors"
          >
            <ShoppingCartSimple size={24} weight="bold" />
            <span className="hidden sm:inline text-base font-semibold">Mi selección</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-brand-gold px-1.5 text-sm font-bold text-brand-dark ring-2 ring-white">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-white hover:bg-brand-purple-dark transition-colors"
          >
            <List size={24} />
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
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Filosofía', href: '#filosofía' },
                { label: 'Colección', href: '#colección' },
                { label: 'Pedido', href: '#pedido' },
                { label: 'Contacto', href: '#contacto' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  className="font-serif text-5xl md:text-7xl font-light text-brand-dark hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
