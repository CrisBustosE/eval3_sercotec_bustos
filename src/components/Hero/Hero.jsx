const Hero = () => {
  return (
    <header className="bg-light py-5 text-center shadow-sm" id="home">
      <div className="container my-5 py-4">
        <h1 className="display-4 fw-bold text-primary mb-3">Centro de Negocios SERCOTEC Santiago</h1>
        <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: '43.75rem' }}>
          Potenciamos tu negocio con asesoría experta, capacitación y acompañamiento integral.
          Garantizamos el correcto funcionamiento y sostenibilidad de las PYMES.
        </p>
        <a href="#contact" className="btn btn-primary btn-lg px-4 shadow-sm fw-bold">
          Comienza tu asesoría hoy
        </a>
      </div>
    </header>
  );
};

export default Hero;