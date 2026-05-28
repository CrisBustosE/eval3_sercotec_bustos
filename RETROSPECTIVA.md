## Retrospectiva del Equipo

### Sesión realizada al cierre del desarrollo

**Metodología:** Start / Stop / Continue

#### Continue — Lo que funcionó bien

- Separar los componentes desde el inicio facilitó trabajar en paralelo sin conflictos.
- Usar `useMockApi` como único punto de verdad para los datos evitó duplicación de lógica.
- Los comentarios por indicador de rúbrica en el código ayudaron a no perder el foco evaluativo.
- Bootstrap 5 con imports ESM resultó más predecible que el bundle completo al integrarlo con React.

#### Stop — Lo que no repetiremos

- Mezclar el `bootstrap.bundle.min.js` con imports ESM genera conflictos de instancias difíciles de depurar. Se debe elegir uno desde el inicio.
- Acumular cambios grandes en pocos commits. Commits atómicos y descriptivos son más fáciles de revisar y revertir.
- Cambiar la estructura de `localStorage` (de claves separadas a objeto unificado) a mitad del proyecto sin actualizar todos los archivos que la consumen.

#### Start — Lo que incorporaremos en la próxima iteración

- **React Router** para separar la ruta `/admin` de la landing pública, mejorando la arquitectura de la aplicación.
- **json-server** o **MockServiceWorker (MSW)** para simular endpoints REST reales con métodos GET, POST, PUT y DELETE, eliminando la dependencia de `localStorage`.
- **Pruebas unitarias con Vitest** para los componentes críticos como `ServiceCard` y `useMockApi`.
- **Variables CSS personalizadas** para centralizar la paleta de colores de SERCOTEC y facilitar futuros cambios de branding.
- **React.memo** en `ServiceCard` para evitar re-renders innecesarios cuando el componente padre actualiza estado no relacionado.

#### Plan de acción para la próxima iteración

| Prioridad | Acción | Responsable | Plazo |
|---|---|---|---|
| Alta | Migrar a React Router con rutas `/` y `/admin` | Equipo | Sprint 1 |
| Alta | Reemplazar localStorage por json-server o MSW | Equipo | Sprint 1 |
| Media | Implementar pruebas unitarias con Vitest | Equipo | Sprint 2 |
| Media | Agregar variables CSS para colores corporativos | Equipo | Sprint 2 |
| Baja | Optimizar re-renders con React.memo y useMemo | Equipo | Sprint 3 |

---