import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'bootstrap';

const Testimonials = ({ testimonials }) => {
  const carouselRef = useRef(null); // Guardamos la instancia aquí

  useEffect(() => {
    const carouselElement = document.getElementById('testimonialsCarousel');

    if (carouselElement && testimonials.length > 0) {
      // Hacemos dispose de cualquier instancia anterior antes de crear una nueva para evitar race condition
      if (carouselRef.current) {
        carouselRef.current.dispose();
      }
      carouselRef.current = new Carousel(carouselElement, {
        interval: 6000,
        ride: 'carousel'
      });
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.dispose();
        carouselRef.current = null;
      }
    };
  }, [testimonials]);


  // Creamos una "llave" única basada en los IDs actuales.
  // Si borramos o agregamos uno, esta llave cambia, y React reinicia el HTML por completo.
  const carouselKey = testimonials.map(t => t.id).join('-');

  return (
    <section className="bg-light py-5 border-top" id="testimonials">
      <div className="container my-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase text-primary" style={{ fontSize: '2rem' }}>Casos de Éxito</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Conoce a los emprendedores que han potenciado su negocio con nosotros.</p>
        </div>

        {testimonials.length === 0 ? (
          <div className="alert alert-info text-center p-5 rounded-4 shadow-sm">
            <h4 className="fw-bold mb-0">Aún no hay testimonios publicados.</h4>
            <p className="mb-0 mt-2">Vuelve pronto para conocer las historias de nuestros emprendedores.</p>
          </div>
        ) : (
          <div key={carouselKey} id="testimonialsCarousel" className="carousel slide shadow-lg rounded-4 bg-white overflow-hidden"> {/* Le inyectamos la llave aquí para que React lo formatee y Bootstrap no se maree */}

            <div className="carousel-inner">
              {testimonials.map((t, index) => (
                <div key={t.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="row g-0 align-items-center">
                    {/* Columna imagenes */}
                    <div className="col-12 col-md-5 col-lg-4">
                      <img
                        src={t.imageUrl}
                        className="w-100 rounded ms-2"
                        alt={t.imageAlt || `Fotografía de ${t.name}`}
                        style={{ objectFit: 'cover', height: '25rem' }}
                        loading="lazy"
                      />
                    </div>
                    {/* Columna de texto */}
                    <div className="col-12 col-md-7 col-lg-8 px-5 py-4 p-md-5 pb-5">
                      <div className="d-flex flex-column justify-content-center h-100" style={{ minHeight: '22rem' }}>
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-warning mb-3 opacity-50" size="2x" />
                        <p className="lead fst-italic text-secondary mb-4" style={{ fontSize: '1.15rem' }}>
                          "{t.text}"
                        </p>
                        <div className="mt-auto">
                          <h5 className="fw-bold text-dark mb-1">{t.name}</h5>
                          <p className="text-primary fw-semibold mb-1">{t.business}</p>
                          <small className="text-muted d-block">
                            <FontAwesomeIcon icon={faLocationDot} className="me-2 text-danger" />
                            {t.location}
                          </small>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            {/* Botones slider */}
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev" style={{ width: '3rem' }}>
              <span
                className="carousel-control-prev-icon bg-primary rounded-circle shadow flex-shrink-0"
                aria-hidden="true"
                style={{ width: '2.75rem', height: '2.75rem' }}
              ></span>
              <span className="visually-hidden">Anterior</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next" style={{ width: '3rem' }}>
              <span
                className="carousel-control-next-icon bg-primary rounded-circle shadow flex-shrink-0"
                aria-hidden="true"
                style={{ width: '2.75rem', height: '2.75rem' }}
              ></span>
              <span className="visually-hidden">Siguiente</span>
            </button>

            <div className="carousel-indicators position-relative m-0 py-3 bg-light d-flex flex-wrap justify-content-center w-100 border-top">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#testimonialsCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Testimonio ${index + 1}`}
                  style={{
                    width: '0.875rem', height: '0.875rem', borderRadius: '50%',
                    backgroundColor: '#0d6efd', margin: '0.375rem 0.375rem', border: 'none'
                  }}
                ></button>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;