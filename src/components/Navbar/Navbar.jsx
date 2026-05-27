import logo from '../../assets/img/logo/logo-cdn-sercotec.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLock } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'bootstrap';

const Navbar = ({ adminMode, setAdminMode }) => {

  // ================= FUNCIÓN: Auto-Cierre del menú en móviles =================
  const handleNavClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Usamos el objeto Collapse importado directamente desde node_modules
      const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" aria-label="Navegación principal">
      <div className="container">
        {/* Usamos el nombre del cliente real */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#home"><img
          src={logo}
          alt="Logo Centro de Negocios Sercotec"
          style={{ maxHeight: '3rem', width: 'auto' }}
          className="d-inline-block align-text-top me-2"
        /></a>

        {/* Botón hamburguesa responsivo con atributos de accesibilidad */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegación">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav fw-semibold text-end">
            <li className="nav-item">
              <a className="nav-link active" href="#home" onClick={handleNavClick}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#aboutUs" onClick={handleNavClick}>Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services" onClick={handleNavClick}>Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavClick}>Contacto</a>
            </li>
            <li className="nav-item ms-lg-2" style={{ marginTop: '0.4rem' }}>
              <a href='#admin-cms'><button
                className={`btn btn-sm fw-bold ${adminMode ? 'btn-danger' : 'btn-outline-warning text-dark'}`}
                onClick={() => {
                  handleNavClick(); // Ejecutamos el cierre del menú móvil al hacer clic aquí también
                  if (adminMode) window.location.hash = 'home';
                  setAdminMode(!adminMode);
                }}
              >
                <FontAwesomeIcon icon={adminMode ? faXmark : faLock} className="me-1" />
                {adminMode ? 'Salir Admin' : 'Panel Admin'}
              </button></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;