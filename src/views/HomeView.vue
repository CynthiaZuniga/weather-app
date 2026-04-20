<template>
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

    <p v-if="filteredPlaces.length === 0" class="message">
      No se encontró el lugar.
    </p>

    <div class="cards-grid">
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
  name: 'HomeView',

  data() {
    return {
      places,
      search: ''
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    filteredPlaces() {
      return this.places.filter(place =>
        place.name.toLowerCase().includes(this.search.toLowerCase())
      )
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