<template>
  <div v-if="city" class="detail-page">
    <section class="city-detail">
      <div class="city-detail__header">
        <h2 class="city-detail__name">{{ city.name }}</h2>
        <button class="back-button" @click="goHome">
          Volver
        </button>
      </div>

      <div class="detail-grid">
        <div class="detail-card">
          <h3 class="detail-card__title">Clima actual</h3>

          <div class="detail-card__weather">
            <span class="detail-card__icon">
              {{ getWeatherIcon(city.status) }}
            </span>

            <div>
              <p class="detail-card__temp">{{ city.temp }}°C</p>
              <p class="detail-card__status">{{ city.status }}</p>
            </div>
          </div>

          <p><strong>Humedad:</strong> {{ city.humidity }}%</p>
          <p><strong>Viento:</strong> {{ city.wind }} km/h</p>
        </div>

        <div class="detail-card">
          <h3 class="detail-card__title">Estadísticas</h3>

          <p><strong>Temperatura mínima:</strong> {{ stats.min }}°C</p>
          <p><strong>Temperatura máxima:</strong> {{ stats.max }}°C</p>
          <p><strong>Promedio:</strong> {{ stats.avg.toFixed(1) }}°C</p>
          <p><strong>Días soleados:</strong> {{ stats.sunny }}</p>
          <p><strong>Días lluviosos:</strong> {{ stats.rainy }}</p>
          <p><strong>Resumen:</strong> {{ summary }}</p>
        </div>
      </div>
    </section>

    <section class="forecast">
      <h2 class="forecast__title">Pronóstico semanal</h2>

      <div class="forecast-cards">
        <div
          v-for="day in city.forecast"
          :key="day.day"
          class="forecast-card"
        >
          <p class="forecast-card__day">{{ day.day }}</p>
          <p class="forecast-card__icon">{{ getWeatherIcon(day.status) }}</p>
          <p class="forecast-card__status">{{ day.status }}</p>
          <p class="forecast-card__temp">{{ day.min }}° / {{ day.max }}°</p>
        </div>
      </div>
    </section>

    <section class="alerts">
      <h2 class="alerts__title">Alertas de clima</h2>

      <div class="alerts-box">
        <p v-if="alerts.length === 0">
          No hay alertas de clima para esta semana.
        </p>

        <p
          v-for="alert in alerts"
          :key="alert"
          class="alerts-box__item"
        >
          {{ alert }}
        </p>
      </div>
    </section>
  </div>

  <p v-else class="message">
    No se encontró el lugar.
  </p>
</template>

<script>
import { places } from '../services/data'
import { calculateStats, getSummary, getAlerts } from '../services/utils'

export default {
  name: 'DetailView',

  data() {
    return {
      city: null,
      stats: {},
      summary: '',
      alerts: []
    }
  },

  created() {
    const id = this.$route.params.id
    const place = places.find(place => place.id == id)

    if (place) {
      this.city = place
      this.stats = calculateStats(place.forecast)
      this.summary = getSummary(this.stats)
      this.alerts = getAlerts(this.stats)
    }
  },

  methods: {
    goHome() {
      this.$router.push('/')
    },

    getWeatherIcon(status) {
      if (status === 'Soleado') return '☀️'
      if (status === 'Nublado') return '⛅'
      if (status === 'Lluvioso') return '🌧️'
      return '🌤️'
    }
  }
}
</script>