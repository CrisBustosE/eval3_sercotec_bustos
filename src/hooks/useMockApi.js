import { useState, useEffect } from 'react';

import mockData from '../data/mockApi.json';

export const useMockApi = () => {
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [aboutUs, setAboutUs] = useState(null);
    const [faq, setFaq] = useState([]);

    // Estado de carga para simular un spinner de carga de recursos
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulamos un retraso de 1600ms / 1.6seg para emular la latencia de Internet
        const fetchTimer = setTimeout(() => {
            // Leemos si existen datos en localstorage, caso contrario consumimos la api
            const savedServices = localStorage.getItem('sercotec_services');
            const savedTestimonials = localStorage.getItem('sercotec_testimonials');

            setServices(savedServices ? JSON.parse(savedServices) : mockData.services);
            setTestimonials(savedTestimonials ? JSON.parse(savedTestimonials) : mockData.testimonials);

            if (!savedServices) localStorage.setItem('sercotec_services', JSON.stringify(mockData.services));
            if (!savedTestimonials) localStorage.setItem('sercotec_testimonials', JSON.stringify(mockData.testimonials));

            setAboutUs(mockData.aboutUs);
            setFaq(mockData.faq);

            // Apagamos el spinner una vez los datos están listos
            setIsLoading(false);
        }, 1600);

        return () => clearTimeout(fetchTimer);
    }, []);

    return { services, testimonials, aboutUs, faq, isLoading, setServices, setTestimonials };
};
export default useMockApi;
