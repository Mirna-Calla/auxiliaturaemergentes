# Capítulo 2: Migración a React

## Conceptos de React Aprendidos

### 1. Componentes Funcionales
- **Functional Components**: Uso de funciones en lugar de clases
- **JSX**: Sintaxis que mezcla JavaScript y HTML
- **Componentes Anidados**: Estructura de componentes padre-hijo

### 2. Hooks
- **useState**: Gestión del estado local del componente
- **useEffect**: Efectos secundarios y ciclo de vida
- **Reglas de Hooks**: Uso correcto en el nivel superior del componente

### 3. Props y Comunicación entre Componentes
- **Paso de Props**: De componentes padres a hijos
- **Destructuring**: Extracción de propiedades
- **Props inmutables**: Las props son de solo lectura

### 4. Manejo de Eventos
- **Synthetic Events**: Sistema de eventos unificado de React
- **Arrow Functions**: Para mantener el contexto de `this`
- **Prevención de Comportamiento por Defecto**

### 5. Listas y Keys
- **Renderizado de Listas**: Uso de `map()` para arrays
- **Key Prop**: Identificador único para elementos de lista
- **Reconciliación**: Cómo React actualiza el DOM eficientemente

### 6. Separación de Responsabilidades
- **Componente TaskList**: Maneja la lista completa
- **Componente TaskItem**: Maneja cada tarea individual
- **App Component**: Componente principal con estado global

## Diferencias con JavaScript Puro

### Ventajas de React:
- ✅ **Componentes Reutilizables**
- ✅ **Gestión Automática del DOM**
- ✅ **Estado Predecible**
- ✅ **Mejor Organización del Código**
- ✅ **Herramientas de Desarrollo (React DevTools)**

### Conceptos Clave:
```jsx
// Estado con useState
const [tasks, setTasks] = useState([]);

// Efectos con useEffect
useEffect(() => {
  // Código que se ejecuta al montar el componente
}, []);

// Renderizado condicional
{tasks.length === 0 && <p>No hay tareas</p>}