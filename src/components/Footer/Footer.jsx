import logo from '../../assets/img/logo/Logo_Sercotec.png';
// 1. Importamos el componente contenedor de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 2. Importamos los iconos específicos que vamos a usar
// import de iconos de redes sociales oficiales desde el paquete 'free-brands-svg-icons'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
// import de iconos comunes como (sobre, punto de mapa) traido del paquete free-solid-svg-icons:
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    // ================= INDICADOR 3 y 7: Accesibilidad, Usabilidad e Interfaz Intuitiva =================
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">

        {/* Fila principal: Se vuelve columna en móviles (col-12) y 3 columnas en pantallas grandes (md) */}
        <div className="row align-items-center text-center text-md-start gy-4">

          {/* 1. COLUMNA LOGO */}
          <div className="col-12 col-md-4 text-md-start text-center">
            <a href="https://sitios.sercotec.cl/" target="_blank">
              <img
                src={logo}
                alt="Logo Institucional SERCOTEC"
                style={{ maxHeight: '3.5rem', width: 'auto' }}
                className="mb-2"
              /></a>
          </div>

          {/* 2. COLUMNA INFORMACIÓN (CENTRAL) */}
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
          <div className="col-12 col-md-4 text-center"> {/* 👈 Forzamos el texto centrado global aquí */}
            <h6 className="small fw-bold text-uppercase text-light text-opacity-75 mb-2">
              Síguenos
            </h6>

            {/* Ajustamos las clases de Bootstrap para que los iconos siempre se centren */}
            <div className="d-flex justify-content-center gap-3"> {/* 👈 Quitamos el justify-content-md-end */}

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