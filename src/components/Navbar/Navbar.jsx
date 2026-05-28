import logo from '../../assets/img/logo/logo-cdn-sercotec.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLock } from '@fortawesome/free-solid-svg-icons';
import { ScrollSpy } from 'bootstrap';
import { useEffect } from 'react';
const Navbar = ({ adminMode, setAdminMode }) => {

  useEffect(() => {
    const scrollSpy = new ScrollSpy(document.body, {
      // Le indica qué navbar observar
      target: '#navbarNav',
      smoothScroll: true,
      rootMargin: '0px 0px -70%'
    });
    // Cleanup al desmontar
    return () => scrollSpy.dispose();
  }, []);

  const handleNavClick = (e, targetId) => {
    // Evitamos el salto brusco nativo del HTML si hay un target
    if (e && targetId) {
      e.preventDefault();
    }

    // Cierre del menú móvil
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarCollapse && navbarCollapse.classList.contains('show') && navbarToggler) {
      navbarToggler.click();
    }

    // Cálculo de scroll dinámico perfecto
    // Debido a que las imagenes cargan de manera lazy aveces no se obtienen los pixeles precisos, con esta técnica buscamos 
    // Corregir con precisión el movimiento despues de clickear un enlace del navbar
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      const navbarElement = document.querySelector('.navbar');

      if (targetElement && navbarElement) {
        // Obtenemos la altura exacta del navbar en ese milisegundo
        const navbarHeight = navbarElement.offsetHeight;
        // Calculamos dónde está el elemento respecto a la pantalla
        const elementPosition = targetElement.getBoundingClientRect().top;
        // Le sumamos lo que ya hemos scrolleado y le restamos el navbar
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        // Le decimos a la ventana que haga un scroll suave a esa coordenada exacta
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" aria-label="Navegación principal">
      <div className="container">

        <a className="navbar-brand fw-bold d-flex align-items-center" href="#home" onClick={(e) => handleNavClick(e, 'home')}>
          <img
            src={logo}
            alt="Logo Centro de Negocios Sercotec"
            style={{ maxHeight: '3rem', width: 'auto' }}
            className="d-inline-block align-text-top me-2"
          />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegación">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav fw-semibold text-end">
            <li className="nav-item">
              <a className="nav-link active" href="#home" onClick={(e) => handleNavClick(e, 'home')}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#aboutUs" onClick={(e) => handleNavClick(e, 'aboutUs')}>Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services" onClick={(e) => handleNavClick(e, 'services')}>Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contacto</a>
            </li>

            <li className="nav-item ms-lg-2" style={{ marginTop: '0.4rem' }}>
              <a href='#admin-cms' onClick={(e) => handleNavClick(e, 'admin-cms')}>
                <button
                  className={`btn btn-sm fw-bold ${adminMode ? 'btn-danger' : 'btn-outline-warning text-dark'}`}
                  onClick={(e) => {
                    // Evitamos que el clic en el botón dispare eventos no deseados
                    e.stopPropagation();

                    handleNavClick(null, null); // Solo cerramos el menú móvil si está abierto
                    if (adminMode) {
                      // Si estamos saliendo del admin, subimos suavemente al inicio
                      handleNavClick(e, 'home');
                    }
                    setAdminMode(!adminMode);
                  }}
                >
                  <FontAwesomeIcon icon={adminMode ? faXmark : faLock} className="me-1" />
                  {adminMode ? 'Salir Admin' : 'Panel Admin'}
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;