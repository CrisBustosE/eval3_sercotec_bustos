import 'bootstrap/dist/css/bootstrap.min.css'; // Imports de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import ServicesSection from './components/ServicesSection/ServicesSection';
import useMockApi from './hooks/useMockApi'; //Import de la ruta de nuestro fetch de mockApi
import AdminCMS from './components/AdminCMS/AdminCMS';

const App = () => {
  // Consumo único de nuestra mockApi para rellenar tarjetas y ruleta
  const { services, testimonials, aboutUs, faq, setServices, setTestimonials } = useMockApi();
  // Definimos las variables para el servicio que elija el usuario
  const [chosenService, setChosenService] = useState('');

  // Modo admin para habilitar el AdminCMS
  const [adminMode, setAdminMode] = useState(false);
  useEffect(() => {
    const navbarElement = document.querySelector('.navbar');
    if (!navbarElement) return;

    const updateScrollPadding = () => {
      // Ajusta dinámicamente el espacio según la altura real y actual del Navbar
      document.documentElement.style.scrollPaddingTop = `${navbarElement.offsetHeight}px`;
    };

    document.documentElement.style.scrollBehavior = 'smooth';

    // ResizeObserver: Observa cambios físicos en el elemento, incluyendo animaciones de apertura/cierre
    const resizeObserver = new ResizeObserver(() => {
      updateScrollPadding();
    });

    // Ponemos al observador a vigilar exclusivamente al Navbar
    resizeObserver.observe(navbarElement);

    // Limpieza de memoria
    return () => resizeObserver.disconnect();
  }, [adminMode]); // Cada vez que adminMode cambie, se recalculará la altura automáticamente



  const handleContactClick = (serviceTitle) => {
    console.log(`El usuario quiere consultar sobre: ${serviceTitle}`);
    setChosenService(serviceTitle);

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar adminMode={adminMode} setAdminMode={setAdminMode} />
      <main className="flex-grow-1">
        <Hero />
        {/* Aquí insertaremos dinámicamente los servicios y testimonios más adelante */}
        <ServicesSection
          services={services}
          onServiceSelect={handleContactClick} />

        {/* Pasamos los servicios,setServices, testimonials y setTestimonials para que el CMS pueda modificarlos */}
        {adminMode && (
          <AdminCMS
            services={services}
            setServices={setServices}
            testimonials={testimonials} // A implementar
            setTestimonials={setTestimonials}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;