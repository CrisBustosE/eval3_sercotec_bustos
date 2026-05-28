import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faLightbulb, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';

const AboutUs = ({ aboutUs }) => {
  // Si los datos de la API aún no cargan, evitamos que la interfaz se rompa
  if (!aboutUs) return null;

  return (
    <section id="aboutUs" className="py-5 bg-white">
      <div className="container my-5">
        
        {/* Fila Superior: Introducción e Imagen */}
        <div className="row align-items-center mb-5 pb-4 border-bottom">
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 pe-lg-5">
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faHandshakeAngle} size="2x" className="text-warning me-3" />
              <h2 className="fw-bold text-uppercase text-primary mb-0" style={{ fontSize: '2rem' }}>
                Quiénes Somos
              </h2>
            </div>
            <p className="lead text-secondary mb-4" style={{ fontSize: '1.15rem' }}>
              Somos el <strong>Centro de Negocios Sercotec Santiago</strong>. Nuestro compromiso es estar en el terreno, entendiendo las necesidades reales de los emprendedores para transformar el esfuerzo local en empresas formales, innovadoras y sostenibles.
            </p>
          </div>
          
          <div className="col-12 col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
              alt="Equipo de asesores trabajando con emprendedores" 
              className="img-fluid rounded-4 shadow-lg w-100"
              style={{ objectFit: 'cover', height: '20rem' }}
            />
          </div>
        </div>

        {/* Fila Inferior: Misión y Visión consumidas desde el JSON */}
        <div className="row g-4">
          
          {/* Tarjeta de Misión */}
          <div className="col-12 col-md-6">
            <div className="card h-100 border-0 bg-light rounded-4 p-4 p-md-5 hover-shadow transition-all">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-4">
                  <FontAwesomeIcon icon={faBullseye} size="2x" className="text-primary" />
                </div>
                <h4 className="fw-bold text-dark mb-3">Nuestra Misión</h4>
                <p className="text-muted mb-0 fs-5">
                  {aboutUs.mision}
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Visión */}
          <div className="col-12 col-md-6">
            <div className="card h-100 border-0 bg-light rounded-4 p-4 p-md-5 hover-shadow transition-all">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle mb-4">
                  <FontAwesomeIcon icon={faLightbulb} size="2x" className="text-warning" />
                </div>
                <h4 className="fw-bold text-dark mb-3">Nuestra Visión</h4>
                <p className="text-muted mb-0 fs-5">
                  {aboutUs.vision}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;