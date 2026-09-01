import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { BentoGallery } from "./components/BentoGallery";
import { Testimonials } from "./components/Testimonials";
import { OrderForm } from "./components/OrderForm";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-brand-light font-sans text-brand-dark selection:bg-brand-gold selection:text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <BentoGallery />
      <Testimonials />
      <OrderForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default App;
