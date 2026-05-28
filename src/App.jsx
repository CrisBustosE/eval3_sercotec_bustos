import 'bootstrap/dist/css/bootstrap.min.css'; // Import del CSS de boostrap
import { useEffect, useState } from 'react';

import useMockApi from './hooks/useMockApi'; //Import de la ruta de nuestro fetch de mockApi
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import AboutUs from './components/AboutUs/AboutUs';

import ServicesSection from './components/ServicesSection/ServicesSection';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQ/FAQ';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';

import AdminCMS from './components/AdminCMS/AdminCMS';



const App = () => {
  // Consumo único de nuestra mockApi para rellenar tarjetas y ruleta
  const { services, testimonials, aboutUs, faq, setServices, setTestimonials, isLoading } = useMockApi();
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
    setChosenService(serviceTitle);

    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      const navbarElement = document.querySelector('.navbar');

      if (contactSection && navbarElement) {
        const navbarHeight = navbarElement.offsetHeight;
        const elementPosition = contactSection.getBoundingClientRect().top;
        
        // Restamos la altura del sticky navbar para la ubicación del formulario sea la esperada
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary shadow-sm" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <h5 className="mt-4 fw-bold text-secondary">Conectando con SERCOTEC...</h5>
      </div>
    );
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar adminMode={adminMode} setAdminMode={setAdminMode} />
      <main className="flex-grow-1">
        {/* Si el usuario clickea comienza tu asesoria hoy, defaulteamos a Otro / Consulta General */}
        <Hero startToday={() => handleContactClick('Otro asunto')} />
        <AboutUs aboutUs={aboutUs} />
        {/* Aquí insertaremos dinámicamente los servicios y testimonios más adelante */}
        <ServicesSection
          services={services}
          onServiceSelect={handleContactClick} />


        <Testimonials testimonials={testimonials} />
        <FAQ faqData={faq} />

        <ContactForm services={services} chosenService={chosenService} />
        {/* Pasamos los servicios,setServices, testimonials y setTestimonials para que el CMS pueda modificarlos */}
        {adminMode && (
          <AdminCMS
            services={services}
            setServices={setServices}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;