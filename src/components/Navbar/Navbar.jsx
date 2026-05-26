import logo from '../../assets/img/logo/logo-cdn-sercotec.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top" aria-label="Navegación principal">
      <div className="container">
        {/* Usamos el nombre del cliente real */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#"><img
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
            <li className="nav-item"><a className="nav-link active" href="#home">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#aboutUs">Nosotros</a></li>
            <li className="nav-item"><a className="nav-link" href="#services">Servicios</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contacto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;