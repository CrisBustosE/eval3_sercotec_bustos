import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const FAQ = ({ faqData }) => {
  if (!faqData || faqData.length === 0) return null;

  return (
    <section className="py-5 bg-light" id="faq">
      <div className="container my-4">
        
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase text-primary" style={{ fontSize: '2rem' }}>
            Preguntas Frecuentes
          </h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>
            Resolvemos tus dudas más comunes antes de dar el siguiente paso.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            
            {/* Contenedor del Acordeón de Bootstrap */}
            <div className="accordion shadow-sm rounded-4 overflow-hidden" id="accordionFAQ">
              
              {/* Iteramos sobre los datos de la Mock API */}
              {faqData.map((item, index) => (
                <div className="accordion-item border-0 border-bottom" key={item.id}>
                  <h2 className="accordion-header" id={`heading-${item.id}`}>
                    <button 
                      className={`accordion-button fw-bold text-dark ${index !== 0 ? 'collapsed' : ''}`} 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse-${item.id}`} 
                      aria-expanded={index === 0 ? "true" : "false"} 
                      aria-controls={`collapse-${item.id}`}
                    >
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-warning me-3 fs-5" />
                      {item.question}
                    </button>
                  </h2>
                  <div 
                    id={`collapse-${item.id}`} 
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                    aria-labelledby={`heading-${item.id}`} 
                    data-bs-parent="#accordionFAQ"
                  >
                    <div className="accordion-body text-secondary lh-lg px-5">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;