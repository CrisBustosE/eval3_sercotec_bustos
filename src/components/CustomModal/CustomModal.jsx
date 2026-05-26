import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

//Modal universal para feedback y confirmaciones
const CustomModal = ({ 
  show, 
  title, 
  message, 
  onClose, 
  onConfirm, 
  type = 'success',
  confirmText = 'Confirmar', // Textos por defecto que podemos sobrescribir
  cancelText = 'Cancelar'
}) => {
  if (!show) return null;

  // Configuramos los estilos dinámicos según el tipo de modal
  const isConfirm = type === 'confirm' || type === 'danger';
  const headerBg = isConfirm ? 'bg-danger' : 'bg-success';
  const iconRef = isConfirm ? faTriangleExclamation : faCircleCheck;
  const actionBtnClass = isConfirm ? 'btn-danger' : 'btn-success';

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow-lg">
            
            <div className={`modal-header ${headerBg} text-white border-0`}>
              <h5 className="modal-title fw-bold">
                <FontAwesomeIcon icon={iconRef} className="me-2" /> {title}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar"></button>
            </div>
            
            <div className="modal-body text-center py-4">
              <p className="fs-5 mb-0 text-secondary">{message}</p>
            </div>
            
            <div className="modal-footer justify-content-center border-0 bg-light gap-3">
              {isConfirm && (
                <button type="button" className="btn btn-outline-secondary px-4 fw-bold" onClick={onClose}>
                  {cancelText}
                </button>
              )}
              
              <button 
                type="button" 
                className={`btn ${actionBtnClass} px-4 fw-bold shadow-sm`} 
                onClick={isConfirm ? onConfirm : onClose}
              >
                {/* Si no es confirmación, asume texto de éxito "Entendido", si no, usa el prop */}
                {isConfirm ? confirmText : 'Entendido'}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;