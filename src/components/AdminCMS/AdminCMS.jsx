import { useState } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faPencil, faPlus, faSliders, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

// ==========================================
// Panel CMS (Requerimiento 3)
// ==========================================
const AdminCMS = ({ services, setServices, testimonials, setTestimonials }) => {
    const [activeTab, setActiveTab] = useState('services');

    const [serviceForm, setServiceForm] = useState({ title: '', description: '', image: '' });
    const [testimonialForm, setTestimonialForm] = useState({ name: '', business: '', text: '', imageUrl: '', location: '' });

    const [editingServiceId, setEditingServiceId] = useState(null);
    const [editingTestimonialId, setEditingTestimonialId] = useState(null);

    const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '' });
    const [confirmConfig, setConfirmConfig] = useState({ show: false, title: '', message: '', onConfirm: null });

    const handleServiceChange = (e) => setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
    const handleTestimonialChange = (e) => setTestimonialForm({ ...testimonialForm, [e.target.name]: e.target.value });

    // ================= SECCIÓN: SERVICIOS =================
    const handleServiceSubmit = (e) => {
        e.preventDefault();
        let updated;

        if (editingServiceId) {
            updated = services.map(s => s.id === editingServiceId ? { ...s, ...serviceForm } : s);
            setEditingServiceId(null);
            setModalConfig({ show: true, title: '¡Servicio Actualizado!', message: 'Los cambios se han guardado de forma exitosa.' });
        } else {
            const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
            updated = [...services, { id: newId, ...serviceForm }];
            setModalConfig({ show: true, title: '¡Servicio Publicado!', message: 'El servicio ya se encuentra disponible en la landing page.' });
        }

        setServices(updated);
        localStorage.setItem('sercotec_services', JSON.stringify(updated));
        setServiceForm({ title: '', description: '', image: '' });
    };

    const startEditService = (service) => {
        setEditingServiceId(service.id);
        setServiceForm({ title: service.title, description: service.description, image: service.image });
    };

    const triggerDeleteService = (id, title) => {
        setConfirmConfig({
            show: true,
            title: '¿Eliminar Servicio?',
            message: `¿Estás completamente seguro de que deseas quitar el servicio "${title}" del portal?`,
            onConfirm: () => {
                const updated = services.filter(s => s.id !== id);
                setServices(updated);
                localStorage.setItem('sercotec_services', JSON.stringify(updated));
                setConfirmConfig({ ...confirmConfig, show: false });
            }
        });
    };

    // ================= SECCIÓN: TESTIMONIOS =================
    const handleTestimonialSubmit = (e) => {
        e.preventDefault();
        let updated;

        // 1. Armamos el string oficial SIEMPRE, ya sea para crear o editar
        const locationInput = testimonialForm.location.trim();
        const locationFinal = locationInput !== '' 
            ? `Región Metropolitana (${locationInput})` 
            : 'Región Metropolitana (Santiago)';

        // 2. Creamos un objeto con los datos finales listos para guardar
        const finalTestimonialData = {
            ...testimonialForm,
            location: locationFinal
        };

        if (editingTestimonialId) {
            // Actualizamos inyectando la data formateada
            updated = testimonials.map(t => t.id === editingTestimonialId ? { ...t, ...finalTestimonialData } : t);
            setEditingTestimonialId(null);
            setModalConfig({ show: true, title: '¡Testimonio Modificado!', message: 'El testimonio ha sido actualizado con éxito.' });
        } else {
            const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
            // Creamos inyectando la data formateada
            updated = [...testimonials, { id: newId, ...finalTestimonialData, imageAlt: `Foto de ${testimonialForm.name}` }];
            setModalConfig({ show: true, title: '¡Testimonio Añadido!', message: 'El testimonio se ha incorporado al carrusel de clientes.' });
        }

        setTestimonials(updated);
        localStorage.setItem('sercotec_testimonials', JSON.stringify(updated));
        // Reseteamos el formulario
        setTestimonialForm({ name: '', business: '', text: '', imageUrl: '', location: '' });
    };

    const startEditTestimonial = (t) => {
        setEditingTestimonialId(t.id);
        
        let savedLocation = '';
        
        // Si tiene location y tiene paréntesis, extraemos lo de adentro
        if (t.location && t.location.includes('(')) {
            savedLocation = t.location.split('(')[1].replace(')', '');
            
            // UX Tweak: Si el valor interno era "Santiago" (el default), 
            // lo dejamos vacío para que el formulario se vea más limpio.
            if (savedLocation === 'Santiago') {
                savedLocation = '';
            }
        }

        setTestimonialForm({ 
            name: t.name, 
            business: t.business, 
            text: t.text, 
            imageUrl: t.imageUrl, 
            location: savedLocation 
        });
    };

    const triggerDeleteTestimonial = (id, name) => {
        setConfirmConfig({
            show: true,
            title: '¿Eliminar Testimonio?',
            message: `¿Estás seguro de que deseas borrar el testimonio de "${name}"?`,
            onConfirm: () => {
                const updated = testimonials.filter(t => t.id !== id);
                setTestimonials(updated);
                localStorage.setItem('sercotec_testimonials', JSON.stringify(updated));
                setConfirmConfig({ ...confirmConfig, show: false });
            }
        });
    };

    // ================= RESETEO DE FÁBRICA =================
    const triggerFactoryReset = () => {
        setConfirmConfig({
            show: true,
            title: '¿Resetear Datos de Fábrica?',
            message: 'Esto eliminará todos los cambios realizados y restaurará los servicios y testimonios originales del sistema. La página se recargará. ¿Deseas continuar?',
            onConfirm: () => {
                localStorage.removeItem('sercotec_services');
                localStorage.removeItem('sercotec_testimonials');
                window.location.hash = 'home';
                window.location.reload();
            }
        });
    };

    return (
        <section className="container my-5 p-4 bg-white rounded shadow border border-warning" id="admin-cms">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom pb-3 mb-4 gap-3">
                <h3 className="fw-bold text-warning mb-0 text-center text-md-start">
                    <FontAwesomeIcon icon={faSliders} className="me-2" />Panel de Administración
                </h3>
                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2 w-100 w-md-auto">
                    <button className="btn btn-sm btn-outline-danger fw-bold w-100 w-sm-auto mb-2 mb-sm-0" onClick={triggerFactoryReset} title="Restaurar datos originales">
                        <FontAwesomeIcon icon={faRotateLeft} className="me-1" /> Resetear
                    </button>
                    <div className="d-flex gap-2 w-100 w-sm-auto">
                        <button className={`btn btn-sm flex-grow-1 ${activeTab === 'services' ? 'btn-warning' : 'btn-outline-warning text-dark'}`} onClick={() => { setActiveTab('services'); setServiceForm({ title: '', description: '', image: '' }); setEditingServiceId(null); }}>
                            Servicios
                        </button>
                        <button className={`btn btn-sm flex-grow-1 ${activeTab === 'testimonials' ? 'btn-warning' : 'btn-outline-warning text-dark'}`} onClick={() => { setActiveTab('testimonials'); setTestimonialForm({ name: '', business: '', text: '', imageUrl: '', location: '' }); setEditingTestimonialId(null); }}>
                            Testimonios
                        </button>
                    </div>
                </div>
            </div>

            {activeTab === 'services' ? (
                <div className="row g-4">
                    <div className="col-12 col-lg-5">
                        <div className="card p-3 bg-light border-0 shadow-sm">
                            <h5 className="fw-bold text-secondary mb-3">
                                {editingServiceId ? (
                                    <><FontAwesomeIcon icon={faPencil} className="me-2 text-primary" /> Modificar Servicio</>
                                ) : (
                                    <><FontAwesomeIcon icon={faPlus} className="me-2 text-success" /> Nuevo Servicio</>
                                )}
                            </h5>
                            <form onSubmit={handleServiceSubmit}>
                                <div className="mb-2">
                                    <label className="form-label small fw-bold">Título</label>
                                    <input type="text" className="form-control form-control-sm" name="title" value={serviceForm.title} onChange={handleServiceChange} required placeholder="Ej: Asesoría Contable" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small fw-bold">URL Imagen</label>
                                    <input type="url" className="form-control form-control-sm" name="image" value={serviceForm.image} onChange={handleServiceChange} required placeholder="https://images.unsplash.com/..." />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Descripción</label>
                                    <textarea className="form-control form-control-sm" name="description" value={serviceForm.description} onChange={handleServiceChange} rows="3" required placeholder="Descripción detallada del servicio..."></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className={`btn btn-sm fw-bold flex-grow-1 ${editingServiceId ? 'btn-success' : 'btn-warning'}`}>
                                        {editingServiceId ? 'Guardar Cambios' : 'Agregar Servicio'}
                                    </button>
                                    {editingServiceId && (
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { setEditingServiceId(null); setServiceForm({ title: '', description: '', image: '' }); }}>Cancelar</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7">
                        <h5 className="fw-bold text-secondary mb-3">Listado de Servicios Activos</h5>
                        <div className="table-responsive" style={{ maxHeight: '18.75rem' }}>
                            <table className="table table-sm table-hover align-middle border">
                                <thead className="table-light">
                                    <tr>
                                        <th>Título</th>
                                        <th className="text-end px-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(s => (
                                        <tr key={s.id} className={editingServiceId === s.id ? 'table-warning' : ''}>
                                            <td className="fw-semibold text-truncate" style={{ maxWidth: '12.5rem' }}>{s.title}</td>
                                            <td className="text-end px-3">
                                                <button className="btn btn-outline-primary btn-sm py-0 px-2 me-2" onClick={() => startEditService(s)} title="Editar"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                <button className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => triggerDeleteService(s.id, s.title)} title="Eliminar"><FontAwesomeIcon icon={faTrashCan} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    <div className="col-12 col-lg-5">
                        <div className="card p-3 bg-light border-0 shadow-sm">
                            <h5 className="fw-bold text-secondary mb-3">
                                {editingTestimonialId ? (
                                    <><FontAwesomeIcon icon={faPencil} className="me-2 text-primary" /> Modificar Testimonio</>
                                ) : (
                                    <><FontAwesomeIcon icon={faPlus} className="me-2 text-success" /> Nuevo Testimonio</>
                                )}
                            </h5>
                            <form onSubmit={handleTestimonialSubmit}>
                                <div className="mb-2">
                                    <label className="form-label small fw-bold">Emprendedor</label>
                                    <input type="text" className="form-control form-control-sm" name="name" value={testimonialForm.name} onChange={handleTestimonialChange} required placeholder="Ej: Juan Perez" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small fw-bold">Empresa/PYME</label>
                                    <input type="text" className="form-control form-control-sm" name="business" value={testimonialForm.business} onChange={handleTestimonialChange} required placeholder="Ej: Juanito Soluciones" />
                                </div>
                                {/* Input de Comuna/Localidad */}
                                <div className="mb-2">
                                    <label className="form-label small fw-bold">Comuna/Localidad <span className="text-muted fw-normal">(Opcional - Por defecto: Santiago)</span></label>
                                    <input type="text" className="form-control form-control-sm" name="location" value={testimonialForm.location} onChange={handleTestimonialChange} placeholder="Ej: Macul, Providencia (Vacío para Santiago)..." />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label small fw-bold">URL Foto</label>
                                    <input type="url" className="form-control form-control-sm" name="imageUrl" value={testimonialForm.imageUrl} onChange={handleTestimonialChange} required placeholder="https://images.unsplash.com/..." />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Testimonio</label>
                                    <textarea className="form-control form-control-sm" name="text" value={testimonialForm.text} onChange={handleTestimonialChange} rows="3" required placeholder="Descripción detallada del testimonio..."></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className={`btn btn-sm fw-bold flex-grow-1 ${editingTestimonialId ? 'btn-success' : 'btn-warning'}`}>
                                        {editingTestimonialId ? 'Guardar Cambios' : 'Agregar Testimonio'}
                                    </button>
                                    {editingTestimonialId && (
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { setEditingTestimonialId(null); setTestimonialForm({ name: '', business: '', text: '', imageUrl: '', location: '' }); }}>Cancelar</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7">
                        <h5 className="fw-bold text-secondary mb-3">Listado de Testimonios Activos</h5>
                        <div className="table-responsive" style={{ maxHeight: '18.75rem' }}>
                            <table className="table table-sm table-hover align-middle border">
                                <thead className="table-light">
                                    <tr>
                                        <th>Autor / Empresa</th>
                                        <th className="text-end px-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testimonials.map(t => (
                                        <tr key={t.id} className={editingTestimonialId === t.id ? 'table-warning' : ''}>
                                            <td>
                                                <div className="fw-bold">{t.name}</div>
                                                <small className="text-muted d-block">{t.business}</small>
                                                {/* Mostramos la región en azulito para el admin */}
                                                <small className="text-info fw-semibold">{t.location}</small>
                                            </td>
                                            <td className="text-end px-3">
                                                <button className="btn btn-outline-primary btn-sm py-0 px-2 me-2" onClick={() => startEditTestimonial(t)} title="Editar"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                <button className="btn btn-outline-danger btn-sm py-0 px-2" onClick={() => triggerDeleteTestimonial(t.id, t.name)} title="Eliminar"><FontAwesomeIcon icon={faTrashCan} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <CustomModal
                show={modalConfig.show}
                title={modalConfig.title}
                message={modalConfig.message}
                type="success"
                onClose={() => setModalConfig({ ...modalConfig, show: false })}
            />

            <CustomModal
                show={confirmConfig.show}
                title={confirmConfig.title}
                message={confirmConfig.message}
                type="danger"
                confirmText={confirmConfig.title.includes('Resetear') ? 'Sí, resetear' : 'Eliminar'}
                onConfirm={confirmConfig.onConfirm}
                onClose={() => setConfirmConfig({ ...confirmConfig, show: false })}
            />
        </section>
    );
};

export default AdminCMS;