import logo from '../../assets/img/logo/Logo_Sercotec.png';
// Importamos el componente contenedor de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Importamos los iconos específicos que vamos a usar
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">

        {/* Fila principal */}
        <div className="row align-items-center text-center text-md-start gy-4">

          {/* 1. COLUMNA LOGO (Alineado a la izquierda en md) */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <a href="https://sitios.sercotec.cl/" target="_blank" rel="noreferrer">
              <img
                src={logo}
                alt="Logo Institucional SERCOTEC"
                style={{ maxHeight: '3.5rem', width: 'auto' }}
                className="mb-2"
              />
            </a>
          </div>

          {/* 2. COLUMNA INFORMACIÓN (Siempre centrada para equilibrar el peso visual) */}
          <div className="col-12 col-md-4 text-center">
            <p className="mb-1 fw-semibold text-light">Centro de Negocios Santiago de SERCOTEC</p>
            <p className="small mb-0 text-light text-opacity-75">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-info" />
              Dirección: Manuel Rodríguez Sur 749, Santiago (Metro Toesca)
            </p>
            <p className="small mb-0 text-light text-opacity-75">
              <FontAwesomeIcon icon={faEnvelope} className="me-2 text-info" />
              Correo: centro.santiago@centrossercotec.cl
            </p>
          </div>

          {/* 3. COLUMNA REDES SOCIALES */}
          {/* text-center centra en móviles, text-md-end empuja la 'caja' al final en desktop */}
          <div className="col-12 col-md-4 text-center text-md-end">

            {/* Utilizamos un div invisible que agrupa el título y los iconos para que se comporten como un solo bloque centrado */}
            <div className="d-inline-flex flex-column align-items-center">

              <h6 className="small fw-bold text-uppercase text-light text-opacity-75 mb-2">
                Síguenos
              </h6>

              <div className="d-flex gap-3">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light text-opacity-75 text-hover-info fs-4" title="Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>

                {/* X (Twitter) */}
                <a href="https://x.com" target="_blank" rel="noreferrer" className="text-light text-opacity-75 text-hover-info fs-4" title="X (Twitter)">
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>

                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-light text-opacity-75 text-hover-info fs-4" title="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 border-light opacity-10" />
        <div className="text-center">
          <p className="small mb-1 text-light text-opacity-75">&copy; 2026 Todos los derechos reservados.</p>
          <small className="text-light text-opacity-50">
            Imágenes ilustrativas cortesía de <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="text-decoration-none text-info">Unsplash</a>
          </small>
        </div>

      </div>
    </footer>
  );
};

export default Footer;