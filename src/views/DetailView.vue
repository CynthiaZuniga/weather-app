<template>
  <div>
    <p v-if="loading" class="message">
      Cargando detalle del clima...
    </p>

    <p v-else-if="error" class="message error">
      {{ error }}
    </p>

    <div v-else-if="city" class="detail-page">
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
                <p class="detail-card__temp">{{ city.temp }}{{ unitSymbol }}</p>
                <p class="detail-card__status">{{ city.status }}</p>
              </div>
            </div>

            <p><strong>Humedad:</strong> {{ city.humidity }}%</p>
            <p><strong>Viento:</strong> {{ city.wind }} km/h</p>
          </div>

          <div class="detail-card" v-if="stats">
            <h3 class="detail-card__title">Estadísticas</h3>

            <p><strong>Temperatura mínima:</strong> {{ stats.min }}{{ unitSymbol }}</p>
            <p><strong>Temperatura máxima:</strong> {{ stats.max }}{{ unitSymbol }}</p>
            <p><strong>Promedio:</strong> {{ stats.average }}{{ unitSymbol }}</p>
            <p><strong>Días soleados:</strong> {{ stats.clearDays }}</p>
            <p><strong>Días lluviosos:</strong> {{ stats.rainyDays }}</p>
            <p><strong>Días nublados:</strong> {{ stats.cloudyDays }}</p>
          </div>
        </div>
      </section>

      <section class="forecast">
        <h2 class="forecast__title">Pronóstico semanal</h2>

        <div class="forecast-cards">
          <div
            v-for="day in forecast"
            :key="day.date"
            class="forecast-card"
          >
            <p class="forecast-card__day">{{ formatDate(day.date) }}</p>
            <p class="forecast-card__icon">{{ getWeatherIcon(day.status) }}</p>
            <p class="forecast-card__status">{{ day.status }}</p>
            <p class="forecast-card__temp">
              {{ day.tempMin }}{{ unitSymbol }} / {{ day.tempMax }}{{ unitSymbol }}
            </p>
          </div>
        </div>
      </section>

      <section class="alerts">
        <h2 class="alerts__title">Alertas de clima</h2>

        <div class="alerts-box">
          <p class="alerts-box__item">
            {{ weatherAlert }}
          </p>
        </div>
      </section>
    </div>

    <p v-else class="message">
      No se encontró el lugar.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DetailView',

  computed: {
    ...mapGetters([
      'selectedPlace',
      'forecast',
      'weeklyStats',
      'weatherAlert',
      'loading',
      'error',
      'userPreferences'
    ]),

    city() {
      return this.selectedPlace
    },

    stats() {
      return this.weeklyStats
    },

    unitSymbol() {
      return this.userPreferences.unit === 'imperial' ? '°F' : '°C'
    }
  },

  methods: {
    ...mapActions(['fetchForecastByCity']),

    goHome() {
      this.$router.push('/')
    },

    getWeatherIcon(status) {
      const normalized = status.toLowerCase()

      if (normalized.includes('lluv') || normalized.includes('rain')) {
        return '🌧️'
      }

      if (normalized.includes('nubl') || normalized.includes('cloud')) {
        return '⛅'
      }

      if (
        normalized.includes('despejado') ||
        normalized.includes('sole') ||
        normalized.includes('clear')
      ) {
        return '☀️'
      }

      return '🌤️'
    },

    formatDate(dateString) {
      const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }

      return new Date(dateString).toLocaleDateString('es-CL', options)
    }
  },

  mounted() {
    this.fetchForecastByCity(this.$route.params.id)
  }
}
</script>