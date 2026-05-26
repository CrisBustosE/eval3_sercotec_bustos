import { useState } from 'react';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

// Recibimos el estado actual y la función para actualizarlo desde App.jsx
const AdminCMS = ({ services, setServices }) => {
    // Estado local para manejar lo que el usuario escribe en los inputs
    const [newService, setNewService] = useState({
        title: '',
        description: '',
        image: ''
    });

    const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '' });

    // Función que captura lo que se escribe y actualiza el estado local
    const handleChange = (e) => {
        setNewService({
            ...newService,
            [e.target.name]: e.target.value
        });
    };

    // Función que se ejecuta al darle al botón "Guardar"
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Creamos un nuevo ID automáticamente
        const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;

        const serviceToAdd = {
            id: newId,
            title: newService.title,
            description: newService.description,
            image: newService.image
        };

        // 2. Actualizamos la lista de servicios (Esto hace que aparezca al instante en pantalla)
        const updatedServices = [...services, serviceToAdd];
        setServices(updatedServices);

        // 3. Guardamos la nueva lista en el LocalStorage para que no se borre al actualizar
        localStorage.setItem('sercotec_services', JSON.stringify(updatedServices));

        // 4. Limpiamos el formulario y avisamos que todo salió bien
        setNewService({ title: '', description: '', image: '' });

        // Modal para darle feeedback al usuario
        setModalConfig({
            show: true,
            title: '¡Operación Exitosa!',
            message: 'El servicio se ha agregado correctamente al portal.'
        });
    };

    return (
        <section className="container my-5 p-4 bg-light rounded shadow-sm border border-warning" id="admin-cms">
            <h3 className="fw-bold text-warning mb-4">
                <i className="fa-solid fa-lock me-2"></i> Mantenedor CMS (Solo Administradores)
            </h3>
            <p className="text-muted mb-4">Agrega nuevos servicios al portal. Los cambios se reflejarán inmediatamente en la sección "Nuestros Servicios".</p>

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Título del Servicio</label>
                        <input type="text" className="form-control" name="title" value={newService.title} onChange={handleChange} required placeholder="Ej: Asesoría Contable" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">URL de la Imagen</label>
                        <input type="url" className="form-control" name="image" value={newService.image} onChange={handleChange} required placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Descripción</label>
                        <textarea className="form-control" name="description" value={newService.description} onChange={handleChange} required rows="3" placeholder="Descripción detallada del servicio..."></textarea>
                    </div>
                    <div className="col-12 text-end mt-4">
                        <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                            <i className="fa-solid fa-plus me-2"></i> Publicar Servicio
                        </button>
                    </div>
                </div>
            </form>
            <FeedbackModal
                show={modalConfig.show}
                title={modalConfig.title}
                message={modalConfig.message}
                onClose={() => setModalConfig({ ...modalConfig, show: false })}
            />
        </section>
    );
};

export default AdminCMS;