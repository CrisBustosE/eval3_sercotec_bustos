import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import ServicesSection from './components/ServicesSection/ServicesSection';
import useMockApi from './hooks/useMockApi'; //Import de la ruta de nuestro fetch de mockApi
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  // Consumo único de nuestra mockApi para rellenar tarjetas y ruleta
  const { services, testimonials, aboutUs, faq } = useMockApi();
  // Definimos las variables para el servicio que elija el usuario
  const [chosenService, setChosenService] = useState('');
  useEffect(() => {
    // Aplicamos un smooth para cualquier redirección dentro de la página, además un espacio para que el navbar se desplace lo suficiente para no tapar contenido
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '13.625rem'; // Altura del navbar

    
  }, []);

  

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
      <Navbar />
      <main className="flex-grow-1">
        <Hero />
        {/* Aquí insertaremos dinámicamente los servicios y testimonios más adelante */}
        <ServicesSection 
        services={services}
        onServiceSelect={handleContactClick}/>
      </main>
      <Footer />
    </div>
  );
};

export default App;