import { motion } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "13603280435";
const DEFAULT_MESSAGE = "Hola Misqua, quiero hacer un pedido de velas.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] ring-1 ring-black/5 hover:brightness-105 transition-[filter]"
    >
      <WhatsappLogo size={28} weight="fill" />
    </motion.a>
  );
}
