const ServiceCard = ({ image, title, description, onContactClick }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 interactive-card">
        <img
          src={image}
          className="card-img-top"
          alt={`Imagen representativa del servicio: ${title}`}
          style={{ height: '12.5rem', objectFit: 'cover' }}
          loading="lazy"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-primary">{title}</h5>
          <p className="card-text text-muted mb-4">{description}</p>
          <button
            className="btn btn-outline-primary mt-auto fw-bold"
            onClick={() => onContactClick(title)}
          >
            Contáctanos <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;