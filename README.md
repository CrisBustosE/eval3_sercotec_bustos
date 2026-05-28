# Centro de Negocios SERCOTEC Santiago — Landing Page

> **Evaluación Sumativa Unidad 3 — Desarrollo Frontend**
> Instituto Profesional San Sebastián · T1-2026

---
## Link al Repositorio (GitHub)
>https://github.com/CrisBustosE/eval3_sercotec_bustos

## ⚠️ Nota importante para el evaluador

Este proyecto **no utiliza un backend ni una base de datos real**. Para simular el comportamiento de un CMS (Sistema de Gestión de Contenido) de manera completamente funcional y autónoma, se utilizó **`localStorage` del navegador** como capa de persistencia de datos.

**¿Cómo funciona?**

1. Al cargar la aplicación por primera vez, los datos se leen desde `src/data/mockApi.json` (archivo que simula una API REST) y se guardan automáticamente en `localStorage`.
2. A partir de ese momento, toda la información mostrada en la landing (servicios y testimonios) se lee y escribe exclusivamente desde `localStorage`.
3. El **Panel de Administración (CMS)** permite agregar, editar y eliminar servicios y testimonios. Los cambios persisten entre recargas de página en el mismo navegador.
4. Si se desea restaurar los datos originales, el botón **"Resetear"** del Panel Admin limpia el `localStorage` y recarga la página con los datos de fábrica del JSON.

> Esta arquitectura garantiza que el proyecto funcione de forma inmediata con solo `npm install && npm run dev`, sin necesidad de configurar servidores externos, variables de entorno ni bases de datos.

---

## Descripción del Proyecto

Landing page profesional desarrollada con **React + Vite + Bootstrap 5** para el **Centro de Negocios Santiago de SERCOTEC**, institución dedicada al apoyo integral de micro, pequeñas y medianas empresas.

El proyecto responde a la necesidad de modernizar la presencia digital del cliente, incorporando componentes reutilizables, consumo dinámico de datos, un panel CMS funcional, y cumpliendo con estándares de accesibilidad WCAG 2.1.

---

## Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19.x | Framework principal (componentes, estado, hooks) |
| Vite | 8.x | Bundler y servidor de desarrollo |
| Bootstrap | 5.3.x | Framework CSS + componentes JS (Carousel, Collapse, Accordion) |
| FontAwesome | 7.x | Iconografía vectorial |
| localStorage | Web API nativa | Persistencia de datos del CMS |

---

## Estructura del Proyecto

```
eval3_sercotec_bustos/
├── src/
│   ├── assets/
│   │   └── img/logo/             # Logos de SERCOTEC
│   ├── components/
│   │   ├── Navbar/               # Navegación sticky con scroll dinámico
│   │   │   └── Navbar.jsx
│   │   ├── Hero/                 # Sección principal de bienvenida
│   │   │   └── Hero.jsx
│   │   ├── AboutUs/              # Sección "Quiénes Somos" (consume mockApi)
│   │   │   └── AboutUs.jsx
│   │   ├── ServiceCard/          # Tarjeta de servicio reutilizable (Req. 1)
│   │   │   └── ServiceCard.jsx
│   │   ├── ServicesSection/      # Contenedor de ServiceCards (Req. 1 + 9)
│   │   │   └── ServicesSection.jsx
│   │   ├── Testimonials/         # Carrusel accesible de testimonios (Req. 2)
│   │   │   └── Testimonials.jsx
│   │   ├── FAQ/                  # Acordeón de preguntas frecuentes (Req. 9)
│   │   │   └── FAQ.jsx
│   │   ├── ContactForm/          # Formulario con seguridad honeypot (Req. 10)
│   │   │   └── ContactForm.jsx
│   │   ├── AdminCMS/             # Panel de administración CMS (Req. 3)
│   │   │   └── AdminCMS.jsx
│   │   ├── CustomModal/          # Modal reutilizable para feedback
│   │   │   └── CustomModal.jsx
│   │   └── Footer/               # Pie de página con datos de contacto
│   │       └── Footer.jsx
│   ├── data/
│   │   └── mockApi.json          # Datos semilla: servicios, testimonios, FAQ, nosotros
│   ├── hooks/
│   │   └── useMockApi.js         # Custom hook: carga de datos + lógica localStorage
│   ├── App.jsx                   # Componente raíz: orquestación y estados globales
│   └── main.jsx                  # Punto de entrada React
├── package.json
├── vite.config.js
└── README.md
```

---

## Instalación y Ejecución

### Prerrequisitos

- Node.js **v18 o superior**
- npm **v9 o superior**

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/CrisBustosE/eval3_sercotec_bustos.git

# 2. Acceder al directorio
cd eval3_sercotec_bustos

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

### Otros comandos

```bash
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar ESLint
```

---

## Guía de Uso de Componentes

### `ServiceCard`

Tarjeta reutilizable para mostrar un servicio. Recibe toda su información por props.

**Props:**

| Prop | Tipo | Descripción |
|---|---|---|
| `image` | `string` | URL de la imagen del servicio |
| `title` | `string` | Título del servicio |
| `description` | `string` | Descripción del servicio |
| `onContactClick` | `function` | Callback al hacer clic en "Contáctanos" |

**Ejemplo de uso:**

```jsx
import ServiceCard from './components/ServiceCard/ServiceCard';

<ServiceCard
  image="https://images.unsplash.com/photo-1522071820081?w=800&q=80"
  title="Asesoría Contable"
  description="Te ayudamos a ordenar las finanzas de tu negocio."
  onContactClick={(titulo) => console.log(`Servicio elegido: ${titulo}`)}
/>
```

---

### `Testimonials`

Carrusel accesible construido sobre Bootstrap 5. Gestiona el ciclo de vida de la instancia con `useRef` para evitar condiciones de carrera al actualizar datos dinámicamente.

**Props:**

| Prop | Tipo | Descripción |
|---|---|---|
| `testimonials` | `array` | Lista de objetos testimonio |

**Estructura de un objeto testimonio:**

```js
{
  id: 1,
  name: "María Pérez",
  business: "Verdulería Del Monte",
  location: "Región Metropolitana (Santiago)",
  text: "Gracias al apoyo de Sercotec...",
  imageUrl: "https://images.unsplash.com/...",
  imageAlt: "Descripción accesible de la imagen"
}
```

**Ejemplo de uso:**

```jsx
import Testimonials from './components/Testimonials/Testimonials';

<Testimonials testimonials={testimonials} />
```

---

### `AdminCMS` — Panel de Administración

Panel CMS accesible desde el botón **"Panel Admin"** en el Navbar. Permite gestionar servicios y testimonios en tiempo real.

**Funcionalidades:**

- **Agregar** servicios o testimonios mediante formulario
- **Editar** registros existentes (fila se resalta en amarillo al editar)
- **Eliminar** con confirmación modal
- **Resetear** datos a valores de fábrica

**Props:**

```jsx
<AdminCMS
  services={services}
  setServices={setServices}
  testimonials={testimonials}
  setTestimonials={setTestimonials}
/>
```

---

### `useMockApi` — Custom Hook

Hook encargado de la carga de datos con lógica de seed para `localStorage`.

```js
import useMockApi from './hooks/useMockApi';

const {
  services,           // Array de servicios
  testimonials,       // Array de testimonios
  aboutUs,            // Objeto con misión y visión
  faq,                // Array de preguntas frecuentes
  isLoading,          // Boolean: true mientras cargan los datos
  setServices,        // Setter para actualizar servicios desde el CMS
  setTestimonials     // Setter para actualizar testimonios desde el CMS
} = useMockApi();
```

**Lógica interna:**

```js
// Pseudocódigo del flujo de datos
if (localStorage.tiene('sercotec_services')) {
  usar datos del localStorage  // Prioriza cambios del CMS
} else {
  usar datos del mockApi.json  // Primera carga: datos de fábrica
  guardar en localStorage      // Seed inicial
}
```

---

### `ContactForm`

Formulario de contacto con medidas de seguridad implementadas.

**Seguridad implementada (Req. 10):**

1. **Honeypot anti-bot:** campo oculto `bot_field`. Si viene relleno, el envío se bloquea silenciosamente.
2. **Validación del lado del cliente (HTML5):** atributos `required`, `type="email"`, `minLength`.
3. **Validación simulada del servidor:** verificación adicional en `handleSubmit` antes de procesar.

**Comportamiento del select dinámico:**
Al hacer clic en "Contáctanos" en una `ServiceCard`, el campo "Servicio" del formulario se pre-rellena automáticamente con el servicio seleccionado.

---

## Accesibilidad (WCAG 2.1)

Medidas implementadas a lo largo del proyecto:

- `aria-label` en el Navbar y botones de navegación del carrusel
- `aria-expanded` y `aria-controls` en el menú hamburguesa
- `aria-current` en indicadores del carrusel
- `visually-hidden` para textos de soporte en lectores de pantalla
- Atributos `alt` descriptivos en todas las imágenes
- `htmlFor`/`id` correctamente enlazados en todos los campos del formulario
- `tabIndex="-1"` en el campo honeypot para excluirlo de la navegación por teclado
- `loading="lazy"` en imágenes dinámicas para mejorar rendimiento y experiencia
- Área de toque mínima de 44×44px en botones del carrusel (WCAG 2.5.5)

---

## Optimizaciones de Rendimiento

| Estrategia | Implementación |
|---|---|
| Lazy loading de imágenes | `loading="lazy"` en `ServiceCard` y `Testimonials` |
| Compresión de imágenes | URLs de Unsplash con parámetros `?auto=format&w=800&q=80` |
| Scroll padding dinámico | `ResizeObserver` recalcula en tiempo real según altura del Navbar |
| Gestión de memoria | `useRef` para instancias Bootstrap; cleanup con `dispose()` en `useEffect` |
| Simulación de latencia | `setTimeout` de 1.6s en `useMockApi` para demostrar estado de carga |
| Imports ESM de Bootstrap | Sin `bootstrap.bundle.min.js`; se importan solo módulos necesarios (`Carousel`, `Collapse`) |

---

## Seguridad

| Medida | Descripción |
|---|---|
| Honeypot | Campo oculto `bot_field` en formulario de contacto |
| Validación cliente | HTML5 nativo: `required`, `type="email"`, `minLength="10"` |
| Validación simulada servidor | Verificación secundaria en `handleSubmit` antes de procesar el envío |
| Bloqueo silencioso | El bot recibe respuesta aparente de éxito sin que el envío se procese |

---

## Equipo de Desarrollo

| Integrante | Rol |
|---|---|
| Cristóbal Bustos | Desarrollador Frontend |

---

## Licencia

Proyecto de carácter académico — Instituto Profesional San Sebastián, T1-2026.
Las imágenes utilizadas son cortesía de [Unsplash](https://unsplash.com) bajo licencia libre de uso.
