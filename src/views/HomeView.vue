<template>
  <div>
    <p v-if="isAuthenticated" class="message">
      Bienvenida, {{ currentUser.name }}. Revisa tus ciudades favoritas.
    </p>

    <section class="city-list">
      <h2 class="city-list__title">Ciudades</h2>

      <div class="search-box">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar ciudad"
          class="search-box__input"
        />
      </div>

      <p v-if="loading" class="message">
        Cargando clima...
      </p>

      <p v-else-if="error" class="message error">
        {{ error }}
      </p>

      <p v-else-if="filteredPlaces.length === 0" class="message">
        No se encontró el lugar.
      </p>

      <div v-else class="cards-grid">
        <div
          v-for="place in filteredPlaces"
          :key="place.id"
          class="city-card"
        >
          <div class="city-card__header">
            <h5 class="city-card__name">{{ place.name }}</h5>
          </div>

          <div class="city-card__body">
            <div class="city-card__weather">
              <span class="city-card__icon">
                {{ getWeatherIcon(place.status) }}
              </span>

              <div class="city-card__info">
                <p class="city-card__temp">{{ place.temp }}{{ unitSymbol }}</p>
                <p class="city-card__status">{{ place.status }}</p>
              </div>
            </div>

            <button
              class="city-card__button"
              @click="goToDetail(place.id)"
            >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',

  data() {
    return {
      search: ''
    }
  },

  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser',
      'allPlaces',
      'loading',
      'error',
      'userPreferences'
    ]),

    filteredPlaces() {
      return this.allPlaces.filter(place =>
        place.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    unitSymbol() {
      return this.userPreferences.unit === 'imperial' ? '°F' : '°C'
    }
  },

  methods: {
    ...mapActions(['fetchPlacesWeather']),

    goToDetail(id) {
      this.$router.push(`/lugar/${id}`)
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
    }
  },

  mounted() {
    this.fetchPlacesWeather()
  }
}
</script>