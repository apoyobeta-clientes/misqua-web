import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";

export function MagneticButton({
  children,
  className = "",
  onClick,
  icon,
  primary = true,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useTransform(x, (val) => val * 0.1);
  const ySpring = useTransform(y, (val) => val * 0.1);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = primary
    ? "bg-brand-purple text-white ring-1 ring-brand-purple-dark"
    : "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex items-center justify-center rounded-full px-6 py-3 font-sans text-sm font-medium transition-colors ${baseStyles} ${className}`}
      style={{
        x: xSpring,
        y: ySpring,
      }}
    >
      <span className="relative z-10 font-medium tracking-wide">{children}</span>
      
      {icon && (
        <span className="relative z-10 ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[1px] group-hover:translate-x-1 group-hover:scale-105">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
