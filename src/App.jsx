import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { OrderForm } from "./components/OrderForm";
import { QuestionsForm } from "./components/QuestionsForm";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CartDrawer } from "./components/CartDrawer";

function App() {
  return (
    <CartProvider>
      <main className="relative min-h-screen w-full overflow-hidden bg-brand-light font-sans text-brand-dark selection:bg-brand-gold selection:text-white">
        <Navbar />
        <Hero />
        <Philosophy />
        <Gallery />
        <Testimonials />
        <OrderForm />
        <QuestionsForm />
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </main>
    </CartProvider>
  );
}

export default App;
