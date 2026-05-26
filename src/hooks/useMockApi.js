import { useState, useEffect } from 'react';
const useMockApi = () => {
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faq, setFaq] = useState([]);
    const [aboutUs, setAboutUs] = useState([]);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const response = await fetch('/mockApi.json');
                const data = await response.json();
                setServices(data.services);
                setTestimonials(data.testimonials);
                setFaq(data.faq);
                setAboutUs(data.aboutUs);

            } catch (error) {
                console.error("Error al consumir la API:", error);
            }
        };
        fetchDatos();
    }, []);

    return { services, testimonials, faq, aboutUs };
};

export default useMockApi;