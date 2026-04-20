Weather App (Vue)

Proyecto del módulo 6 del bootcamp Frontend.
Evolución de la app de clima a una SPA usando Vue.js.

Funcionalidad
Lista de ciudades (Home)
Vista de detalle por ciudad
Navegación sin recargar (Vue Router)
Búsqueda de ciudades (v-model)
Render dinámico con v-for y v-if
Pronóstico semanal
Estadísticas (mín, máx, promedio)
Alertas de clima
Tecnologías
Vue 3
Vue Router
JavaScript (ES6)
HTML + CSS

Estructura

src/
├── views/
│   ├── HomeView.vue
│   └── DetailView.vue
├── router/
│   └── index.js
├── services/
│   ├── data.js
│   └── utils.js
├── App.vue
├── main.js
└── style.css
Arquitectura

La aplicación utiliza Vue como SPA:

HomeView: muestra lista y búsqueda
DetailView: muestra información completa
router: gestiona navegación
services: contiene datos y lógica reutilizable

Uso

Ejecutar el proyecto:
npm install
npm run dev
Abrir en el navegador
Buscar una ciudad
Ver el detalle del clima
Nota

Este proyecto reutiliza la lógica de módulos anteriores y la adapta a Vue para crear una aplicación dinámica sin recarga de página.