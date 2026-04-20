<template>
  <div v-if="city">
    <section class="city-detail mb-4">
      <h2 class="city-detail__name">{{ city.name }}</h2>

      <div class="card city-detail__card">
        <div class="card-body">
          <p class="city-detail__item">
            <strong>Temperatura:</strong> {{ city.temp }}°C
          </p>
          <p class="city-detail__item">
            <strong>Humedad:</strong> {{ city.humidity }}%
          </p>
          <p class="city-detail__item">
            <strong>Viento:</strong> {{ city.wind }} km/h
          </p>
          <p class="city-detail__item">
            <strong>Estado:</strong> {{ city.status }}
          </p>
        </div>
      </div>
    </section>

    <section class="forecast mb-4">
      <h2 class="forecast__title">Pronóstico semanal</h2>

      <div class="row forecast__grid">
        <div
          v-for="day in city.forecast"
          :key="day.day"
          class="col-6 col-md-4 col-lg-3 mb-3"
        >
          <div class="card text-center">
            <div class="card-body">
              <p>{{ day.day }}</p>
              <p>{{ day.status }}</p>
              <p>{{ day.min }}° / {{ day.max }}°</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats mb-4">
      <h2 class="stats__title">Estadísticas de la semana</h2>

      <div class="card">
        <div class="card-body">
          <p><strong>Temperatura mínima:</strong> {{ stats.min }}°C</p>
          <p><strong>Temperatura máxima:</strong> {{ stats.max }}°C</p>
          <p><strong>Promedio:</strong> {{ stats.avg.toFixed(1) }}°C</p>
          <p><strong>Días soleados:</strong> {{ stats.sunny }}</p>
          <p><strong>Días lluviosos:</strong> {{ stats.rainy }}</p>
          <p><strong>Resumen:</strong> {{ summary }}</p>
        </div>
      </div>
    </section>

    <section class="alerts mb-4">
      <h2 class="alerts__title">Alertas de clima</h2>

      <div class="card">
        <div class="card-body">
          <p v-if="alerts.length === 0">
            No hay alertas de clima para esta semana.
          </p>

          <p v-for="alert in alerts" :key="alert">
            {{ alert }}
          </p>
        </div>
      </div>
    </section>

    <button class="btn btn-secondary" @click="goHome">
      Volver
    </button>
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
    }
  }
}
</script>