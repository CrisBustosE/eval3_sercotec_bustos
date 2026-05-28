## Guía de Buenas Prácticas

### 1. Nomenclatura de Componentes

**PascalCase** para componentes React, **camelCase** para funciones y variables, **kebab-case** para archivos CSS.

```jsx
// Correcto
const ServiceCard = ({ title, description }) => { ... }
const handleContactClick = (serviceTitle) => { ... }

// Incorrecto
const servicecard = () => { ... }
const HandleContactClick = () => { ... }
```

### 2. Un componente, una responsabilidad

`ServiceCard` solo pinta una tarjeta. `ServicesSection` solo orquesta las tarjetas y el fetch. No mezclar lógica de datos con presentación.

```jsx
// ServiceCard: solo presentación
const ServiceCard = ({ image, title, description, onContactClick }) => (
  <div className="card">...</div>
);

// ServicesSection: orquestación
const ServicesSection = ({ services, onServiceSelect }) => (
  services.map(s => <ServiceCard key={s.id} {...s} onContactClick={onServiceSelect} />)
);
```

### 3. Custom Hooks para lógica reutilizable

Extraer lógica de estado y efectos secundarios a hooks personalizados.

```js
// BIEN: Lógica encapsulada y reutilizable
const { services, isLoading } = useMockApi();

// MAL: Lógica directamente en App.jsx mezclada con el render
useEffect(() => { fetch(...).then(...) }, []);
```

### 4. Cleanup obligatorio en useEffect con Bootstrap

Siempre destruir instancias de Bootstrap al desmontar el componente para evitar condiciones de carrera.

```js
// BIEN: Con cleanup usando useRef
const carouselRef = useRef(null);
useEffect(() => {
  carouselRef.current = new Carousel(element, options);
  return () => {
    carouselRef.current?.dispose();
    carouselRef.current = null;
  };
}, [data]);
```

### 5. Props con valores por defecto

Proteger componentes ante datos faltantes.

```jsx
// BIEN: Con valor por defecto
const ContactForm = ({ services = [], chosenService = '' }) => { ... }

// MAL: Sin protección
const ContactForm = ({ services, chosenService }) => { ... }
```

### 6. Accesibilidad desde el primer día

Incluir atributos ARIA y alt texts descriptivos en el desarrollo inicial, no como corrección posterior.

```jsx
// BIEN: Alt text descriptivo
<img alt={`Fotografía de ${t.name} en su negocio ${t.business}`} />

// MAL: Alt text genérico o vacío
<img alt="foto" />
<img alt="" />
```

### 7. Un único punto de importación de Bootstrap JS

No mezclar `bootstrap.bundle.min.js` con imports ESM de Bootstrap. Elegir uno y usarlo consistentemente en todo el proyecto.

```js
// BIEN: Solo imports ESM (recomendado con Vite)
import { Carousel } from 'bootstrap';
import { Collapse } from 'bootstrap';

// MAL: Bundle + ESM al mismo tiempo (genera dos registros de instancias)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Collapse } from 'bootstrap'; // Conflicto
```

### 8. Scroll manual para elementos con Navbar sticky

Compensar la altura del Navbar al hacer scroll programático.

```js
// BIEN: Cálculo con offset del Navbar
const navbarHeight = document.querySelector('.navbar').offsetHeight;
const offsetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

// MAL: scrollIntoView sin compensación
element.scrollIntoView(); // Queda tapado por el Navbar sticky
```

### 9. Estado vacío siempre contemplado

Todo componente que recibe un array debe manejar el caso de array vacío.

```jsx
// BIEN: Estado vacío con mensaje informativo
{services.length === 0 ? (
  <div className="alert alert-warning">No hay servicios disponibles.</div>
) : (
  services.map(s => <ServiceCard key={s.id} {...s} />)
)}
```

### 10. Llaves únicas en listas de React

Usar siempre el `id` del objeto como `key`, nunca el índice del array.

```jsx
// BIEN: key por id único
services.map(s => <ServiceCard key={s.id} {...s} />)

// MAL: key por índice (causa bugs al reordenar o eliminar)
services.map((s, index) => <ServiceCard key={index} {...s} />)
```

### 11. Uso de Variables y Desestructuración

Declaración inmutable por defecto: Se utiliza const para todas las variables y funciones que no reasignarán su valor, reservando let estrictamente para contadores o valores mutables. Está estrictamente prohibido el uso de var.
Desestructuración: Se extraen las propiedades de los objetos (como los props o la respuesta de un hook) al inicio del componente para mejorar la legibilidad.

```jsx
// BIEN: Uso de const y desestructuración clara
const ServiceCard = ({ title, description }) => { ... }

// MAL: Uso de let innecesario y acceso por punto
let ServiceCard = (props) => { 
  console.log(props.title); 
}
```