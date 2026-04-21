<template>
  <section class="city-list">
    <h2 class="city-list__title">Mis lugares favoritos</h2>

    <p v-if="loading" class="message">
      Cargando favoritos...
    </p>

    <p v-else-if="error" class="message error">
      {{ error }}
    </p>

    <p v-else-if="favoritePlaces.length === 0" class="message">
      No tienes lugares favoritos.
    </p>

    <div v-else class="cards-grid">
      <div
        v-for="place in favoritePlaces"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FavoritosView',

  computed: {
    ...mapGetters([
      'userFavorites',
      'allPlaces',
      'loading',
      'error',
      'userPreferences'
    ]),

    favoritePlaces() {
      return this.allPlaces.filter(place => this.userFavorites.includes(place.id))
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
    if (!this.allPlaces.length) {
      this.fetchPlacesWeather()
    }
  }
}
</script>