import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Products from './components/Products';
import Aromas from './components/Aromas';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Products />
        <Aromas />
        <ProductDetail />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
