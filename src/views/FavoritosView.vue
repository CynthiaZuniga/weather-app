<template>
  <section class="city-list">
    <h2 class="city-list__title">Mis lugares favoritos</h2>

    <p v-if="favoritePlaces.length === 0" class="message">
      No tienes lugares favoritos.
    </p>

    <div class="cards-grid">
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
              <p class="city-card__temp">{{ place.temp }}°C</p>
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
import { mapGetters } from 'vuex'
import { places } from '../services/data'

export default {
  name: 'FavoritosView',

  computed: {
    ...mapGetters(['userFavorites']),

    favoritePlaces() {
      return places.filter(place => this.userFavorites.includes(place.id))
    }
  },

  methods: {
    goToDetail(id) {
      this.$router.push(`/lugar/${id}`)
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