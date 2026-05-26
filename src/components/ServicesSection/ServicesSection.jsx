
import { useState } from 'react';

import ServiceCard from '../ServiceCard/ServiceCard.jsx'

const ServiceSection = ({ services, onServiceSelect }) => {
    return (
        <section className="container my-5 py-5" id="services">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-uppercase text-primary" style={{ fontSize: '2rem' }}>Nuestros Servicios</h2>
                <p className="text-muted" style={{ fontSize: '1rem' }}>Conoce cómo podemos ayudar a potenciar tu negocio.</p>
            </div>

            <div className="row">
                {services && services.length > 0 ? (
                    services.map((serviceMap) => (
                        <ServiceCard
                            key={serviceMap.id}
                            image={serviceMap.image}
                            title={serviceMap.title}
                            description={serviceMap.description}
                            onContactClick={onServiceSelect}
                        />
                    ))
                ) : (
                    <p className="text-center">Cargando servicios...</p>
                )}
            </div>
        </section>
    );
};

export default ServiceSection;
/*
const serviceSection = () => {
    const [chosenSubject, setChosenSubject] = useState('');

    

    const handleContactClick = (serviceTitle) => {
        console.log(`El usuario quiere consultar sobre: ${serviceTitle}`);
        setChosenSubject(serviceTitle);

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (<section className="container my-5 py-5" id="services">
        <div className="text-center mb-5">
            <h2 className="fw-bold text-uppercase text-primary" style={{ fontSize: '2rem' }}>Nuestros Servicios</h2>
            <p className="text-muted" style={{ fontSize: '1rem' }}>Conoce cómo podemos ayudar a potenciar tu negocio.</p>
        </div>

        <div className="row">
            {services?.map((serviceMap) => (
                <ServiceCard
                    key={serviceMap.id}
                    image={serviceMap.image}
                    title={serviceMap.title}
                    description={serviceMap.description}
                    onContactClick={handleContactClick}
                />
            ))}
        </div>
    </section>
    );
};
*/
//export default ServicesSection;