import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { BentoGallery } from "./components/BentoGallery";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-brand-light font-sans text-brand-dark selection:bg-brand-gold selection:text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <BentoGallery />
      <Footer />
    </main>
  );
}

export default App;
