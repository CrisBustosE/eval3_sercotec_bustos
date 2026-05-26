const FeedbackModal = ({ show, title, message, onClose }) => {
  // Si el estado 'show' es falso, no renderizamos nada
  if (!show) return null;

  return (
    <>
      {/* Fondo oscuro semi-transparente (Backdrop) */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      
      {/* Contenedor del Modal */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow-lg">
            
            <div className="modal-header bg-success text-white border-0">
              <h5 className="modal-title fw-bold">
                <i className="fa-solid fa-circle-check me-2"></i> {title}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar"></button>
            </div>
            
            <div className="modal-body text-center py-4">
              <p className="fs-5 mb-0 text-secondary">{message}</p>
            </div>
            
            <div className="modal-footer justify-content-center border-0 bg-light">
              <button type="button" className="btn btn-success px-4 fw-bold shadow-sm" onClick={onClose}>
                Entendido
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;