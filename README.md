 Weather App - Módulo 7

Descripción

Aplicación web del clima desarrollada con Vue 3 que permite visualizar información de distintas ciudades.  
En esta evolución (Módulo 7), se incorpora un sistema básico de usuarios con autenticación, estado global y personalización de la experiencia.

La aplicación ahora reconoce al usuario que inicia sesión y adapta ciertas secciones según sus preferencias y lugares favoritos.

---

Tecnologías utilizadas

- Vue 3
- Vue Router
- Vuex
- Vite
- JavaScript
- HTML + CSS

---

Sistema de autenticación

Se implementó un sistema de login simulado utilizando Vuex como gestor de estado global.

Funcionalidad:

- Inicio de sesión con email y contraseña
- Validación de credenciales en el frontend (usuarios mock)
- Manejo de sesión activa con Vuex
- Cierre de sesión (logout)
- Redirección automática después de login

Usuarios de prueba:
cynthia@email.com

1234

maria@email.com

abcd


---

Estado global (Vuex)

El store maneja:

- Usuario autenticado
- Estado de sesión (`isAuthenticated`)
- Lugares favoritos del usuario
- Preferencias (unidad de temperatura y tema)

---

Rutas de la aplicación

| Ruta | Descripción |
|------|------------|
| `/` | Página principal con listado de ciudades |
| `/lugar/:id` | Detalle del clima de una ciudad |
| `/login` | Inicio de sesión |
| `/favoritos` | Lugares favoritos del usuario (protegida) |
| `/preferencias` | Preferencias del usuario (protegida) |

---

Rutas protegidas

Las rutas `/favoritos` y `/preferencias` requieren que el usuario esté autenticado.

Si un usuario intenta acceder sin iniciar sesión:

Es redirigido automáticamente a `/login`
---

Personalización por usuario

Una vez logueado, la aplicación:

- Muestra el nombre del usuario en el navbar
- Permite cerrar sesión
- Filtra los lugares favoritos según el usuario
- Permite configurar preferencias:
  - Unidad de temperatura (°C / °F)
  - Tema (claro / oscuro)

---

Interfaz

- Navbar dinámica (cambia según estado de sesión)
- Vista de ciudades con búsqueda
- Vista de detalle del clima
- Vista de favoritos personalizada
- Vista de preferencias editable

---

Cómo ejecutar el proyecto

1. Clonar repositorio

```bash
git clone https://github.com/CynthiaZuniga/weather-app.git

2. Entrar al proyecto
cd weather-app
3. Instalar dependencias
npm install
4. Ejecutar el proyecto
npm run dev
5. Abrir en navegador
http://localhost:5173

📂 Estructura del proyecto
src/
├── components/
│   └── AppNavbar.vue
├── views/
│   ├── HomeView.vue
│   ├── DetailView.vue
│   ├── LoginView.vue
│   ├── FavoritosView.vue
│   └── PreferenciasView.vue
├── router/
├── store/
├── services/
└── App.vue