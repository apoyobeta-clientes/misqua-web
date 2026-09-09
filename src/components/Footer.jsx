import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight, InstagramLogo, TiktokLogo, YoutubeLogo } from "@phosphor-icons/react";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/misquacandles/", icon: InstagramLogo },
  { label: "TikTok", href: "https://www.tiktok.com/@misquacandles", icon: TiktokLogo },
  { label: "YouTube", href: "https://www.youtube.com/@misquacandles", icon: YoutubeLogo },
];

export function Footer() {
  return (
    <footer id="contacto" className="w-full bg-brand-dark px-4 py-32 md:px-8 lg:px-12 text-white">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center space-y-16">
        <div className="space-y-6">
          <h2 className="text-6xl md:text-[8rem] font-serif tracking-tight leading-none">
            Enciende la magia.
          </h2>
          <p className="text-white/60 font-light max-w-[40ch] mx-auto text-lg">
            Descubre aromas únicos, inspirados en la naturaleza. Escríbenos para hacer tu pedido.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon size={24} weight="bold" />
            </a>
          ))}
        </div>

        <a href="https://www.instagram.com/misquacandles/" target="_blank" rel="noopener noreferrer">
          <MagneticButton primary={false} icon={<ArrowUpRight weight="bold" />}>
            Conecta por DM
          </MagneticButton>
        </a>

        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <span>© 2026 MISQUA Candles</span>
          <img src="/assets/MISQUA.png" alt="Misqua Logo" className="h-10 opacity-40 invert brightness-200 contrast-200" />
          <a href="mailto:productsmisqua@gmail.com" className="hover:text-white/70 transition-colors">
            productsmisqua@gmail.com
          </a>
          <span>Made in Portland, OR</span>
        </div>
      </div>
    </footer>
  );
}
