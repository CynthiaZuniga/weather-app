# 🌤️ Weather App - Portafolio Final

## Descripción

Aplicación web del clima desarrollada con Vue 3 como proyecto final de portafolio.  
La app consume una API real de clima, permite navegar entre vistas, consultar el detalle de cada ciudad, revisar estadísticas semanales, mostrar alertas meteorológicas y gestionar preferencias de usuario.

## Tecnologías usadas

- Vue 3
- Vue Router
- Vuex
- Vite
- OpenWeather API
- JavaScript
- HTML
- CSS

## Funcionalidades principales

- Home con listado de ciudades y clima actual
- Vista de detalle por ciudad
- Pronóstico de varios días
- Estadísticas semanales:
  - temperatura mínima
  - temperatura máxima
  - temperatura promedio
  - conteo de días lluviosos, nublados y soleados
- Alertas meteorológicas simples
- Sistema de login simulado
- Favoritos por usuario
- Preferencias de unidad de temperatura y tema
- Manejo de estados de carga y error

## API utilizada

La aplicación utiliza la API de OpenWeather.

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

```env
VITE_OPENWEATHER_API_KEY=TU_API_KEY_AQUI

Usuarios de prueba

Usuario 1

correo: cynthia@email.com
contraseña: 1234

Usuario 2

correo: maria@email.com
contraseña: abcd


Rutas principales

/ → Home
/lugar/:id → Detalle del clima
/login → Inicio de sesión
/favoritos → Favoritos del usuario
/preferencias → Preferencias del usuario

Cómo ejecutar el proyecto en local

Clonar el repositorio

Instalar dependencias:

npm install

Crear archivo .env

Ejecutar el proyecto:

npm run dev

Abrir en navegador:

http://localhost:5173

Repositorio GitHub

https://github.com/CynthiaZuniga/weather-app

Conclusión

Esta versión final integra Vue, Vue Router, Vuex, consumo de API real, manejo de estado global, estadísticas y alertas meteorológicas, quedando lista para ser presentada como proyecto de portafolio.