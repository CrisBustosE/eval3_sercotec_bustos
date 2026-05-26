import { useState, useEffect } from 'react';

const useMockApi = () => {
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faq, setFaq] = useState([]);
    const [aboutUs, setAboutUs] = useState([]);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Hacemos el fetch base a nuestro archivo
                const response = await fetch('/mockApi.json');
                const data = await response.json();

                // ================= INDICADOR 3: Lógica base para el CMS (LocalStorage) =================
                // 1. Buscamos si hay servicios guardados previamente en el navegador
                const savedServices = localStorage.getItem('sercotec_services');
                const savedTestimonials = localStorage.getItem('sercotec_testimonials');
                
                if (savedServices) {
                    // Si existen, los transformamos de texto a arreglo de JS y los usamos
                    setServices(JSON.parse(savedServices));
                } else {
                    // Si no existen (primera vez que entra), usamos los del JSON
                    setServices(data.services);
                    // Y los guardamos en el localStorage para futuras visitas
                    localStorage.setItem('sercotec_services', JSON.stringify(data.services));
                }
                if (savedTestimonials){
                    setTestimonials(JSON.parse(savedTestimonials));
                }else{
                    localStorage.setItem('sercotec_testimonials', JSON.stringify(data.testimonials));
                }


                // Para el resto de los datos (que no modificaremos en el CMS), usamos el JSON directo
                setFaq(data.faq);
                setAboutUs(data.aboutUs);

            } catch (error) {
                console.error("Error al consumir la API:", error);
            }
        };
        
        fetchDatos();
    }, []);

    // Exportamos también 'setServices' para que cuando el profe agregue 
    // un servicio en el CMS, la pantalla se actualice al instante sin tener que recargar la página
    return { services, testimonials, faq, aboutUs, setServices, setTestimonials };
};

export default useMockApi;