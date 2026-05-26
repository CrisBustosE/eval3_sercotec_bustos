import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  useEffect(() => {
    // Aplicamos un smooth para cualquier redirección dentro de la página, además un espacio para que el navbar se desplace lo suficiente para no tapar contenido
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '13.625rem'; // Altura del navbar
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Hero />
        {/* Aquí insertaremos dinámicamente los servicios y testimonios más adelante */}
      </main>
      <Footer />
    </div>
  );
};

export default App;