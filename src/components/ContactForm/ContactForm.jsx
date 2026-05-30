import { useState, useEffect } from 'react';
import CustomModal from '../CustomModal/CustomModal';

// Recibimos services por props para que el select sea dinámico
const ContactForm = ({ chosenService, services = [] }) => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '', bot_field:'' });
  
  // Estado para controlar nuestro CustomModal de éxito
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '' });

  useEffect(() => {
    if (chosenService) {
      setFormData((prevData) => ({ ...prevData, service: chosenService }));
    }
  }, [chosenService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ==========================================
    // MEDIDAS DE SEGURIDAD (Requerimiento 10)
    // ==========================================

    // 1. Protección contra bots (Honeypot)
    if (formData.bot_field !== '') {
      console.warn("Envío bloqueado: Actividad de bot detectada.");
      return; // Abortamos silenciosamente, el bot creerá que funcionó
    }

    // 2. Validación "del lado del servidor" (Simulada)
    // Nos aseguramos que no se salten el HTML inyectando datos vacíos
    if (formData.name.trim().length < 3 || !formData.email.includes('@') || formData.message.trim().length < 10) {
      setModalConfig({
        show: true,
        title: 'Error de Validación',
        message: 'Por favor, asegúrate de ingresar un nombre válido y un mensaje detallado.',
        type: 'danger'
      });
      return;
    }
    
    // Dejamos evidencia de que se recibieron los datos exitosamente
    console.log("Datos enviados de manera exitosa:", formData);
    
    // Disparamos nuestro modal elegante en lugar del alert()
    setModalConfig({
      show: true,
      title: '¡Mensaje Enviado!',
      message: `Gracias ${formData.name}. Hemos recibido tu consulta sobre "${formData.service}". Un asesor de Sercotec se pondrá en contacto contigo al correo ${formData.email}.`
    });

    // Limpiamos el formulario
    setFormData({ name: '', email: '', service: '', message: '', bot_field: '' });
  };

  return (
    <section className="py-5" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow border-0 rounded-4 p-4 p-md-5" id="contact-form-container">
              <h3 className="fw-bold text-primary mb-2 text-center">Contáctanos</h3>
              <p className="text-center text-muted mb-4">Déjanos tus datos y te ayudaremos a potenciar tu negocio.</p>

              <form onSubmit={handleSubmit}>

                {/* HONEYPOT - INVISIBLE PARA HUMANOS */}
                <input 
                  type="text" 
                  name="bot_field" 
                  value={formData.bot_field} 
                  onChange={handleChange} 
                  style={{ display: 'none' }} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />
                
                <div className="row g-3">
                  {/* Campo: Nombre */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold small text-secondary">Nombre Completo</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej: Juan Pérez" minLength="3"/>
                  </div>

                  {/* Campo: Correo */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold small text-secondary">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="correo@ejemplo.com" />
                  </div>

                  {/* Campo: Selector de Asunto (Dinámico) */}
                  <div className="col-12">
                    <label htmlFor="service" className="form-label fw-semibold small text-secondary">Asunto / Servicio de Interés</label>
                    <select className="form-select" id="service" name="service" value={formData.service} onChange={handleChange} required>
                      <option value="" disabled>-- Selecciona un servicio --</option>
                      
                      {/* Generamos las opciones dinámicamente desde el CMS */}
                      {services.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      
                      <option value="Otro asunto">Otro / Consulta General</option>
                    </select>
                  </div>

                  {/* Campo: Mensaje */}
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold small text-secondary">¿En qué podemos ayudarte?</label>
                    <textarea className="form-control" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} minLength="10" required placeholder="Cuéntanos un poco sobre tu PYME..."></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
                      <i className="fa-regular fa-paper-plane me-2"></i> Enviar Solicitud
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

        {/* Modal */}
      <CustomModal 
        show={modalConfig.show} 
        title={modalConfig.title} 
        message={modalConfig.message} 
        type="success"
        onClose={() => setModalConfig({ ...modalConfig, show: false })} 
      />
    </section>
  );
};

export default ContactForm;