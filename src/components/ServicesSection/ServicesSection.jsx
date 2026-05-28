import ServiceCard from '../ServiceCard/ServiceCard.jsx';

const ServiceSection = ({ services, onServiceSelect }) => {
    return (
        <section className="container my-5 py-5" id="services">
            <div className="text-center mb-5">
                <h2 className="fw-bold text-uppercase text-primary" style={{ fontSize: '2rem' }}>Nuestros Servicios</h2>
                <p className="text-muted" style={{ fontSize: '1rem' }}>Conoce cómo podemos ayudar a potenciar tu negocio.</p>
            </div>

            {/* Agregamos justify-content-center por si hay pocos servicios o si aparece la alerta, quede bien centrada */}
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
                    /* ESTADO VACÍO: Esto se muestra cuando el array services tiene length === 0 */
                    /* Le agregamos 'mx-auto' solo a esta columna para que la alerta siga quedando al centro */
                    <div className="col-12 col-md-8 mx-auto">
                        <div className="alert alert-warning text-center p-5 rounded-4 shadow-sm">
                            <i className="fa-solid fa-triangle-exclamation fs-1 mb-3 text-warning"></i>
                            <h4 className="fw-bold text-dark">No hay servicios disponibles</h4>
                            <p className="mb-0 text-secondary">Actualmente estamos actualizando nuestro catálogo de servicios. Por favor, intenta más tarde.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceSection;