<template>

  <div class="container">

    <h2>Ciudades</h2>

    <!-- BÚSQUEDA (v-model obligatorio) -->
    <input v-model="search" placeholder="Buscar ciudad" />

    <div class="row">

      <div
        v-for="place in filteredPlaces"
        :key="place.id"
        class="col-4"
      >

        <div class="card">
          <h5>{{ place.name }}</h5>
          <p>{{ place.temp }}°C - {{ place.status }}</p>

          <button @click="goToDetail(place.id)">
            Ver detalle
          </button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { places } from "../services/data"

export default {

  data() {
    return {
      places,
      search: ""
    }
  },

  computed: {
    filteredPlaces() {
      return this.places.filter(p =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },

  methods: {
    goToDetail(id) {
      this.$router.push(`/lugar/${id}`)
    }
  }

}
</script>