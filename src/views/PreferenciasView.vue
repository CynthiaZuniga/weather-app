<template>
  <section class="preferences-page">
    <h2>Mis preferencias</h2>

    <form @submit.prevent="savePreferences" class="login-form">
      <label>Unidad de temperatura</label>
      <select v-model="unit">
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
      </select>

      <label>Tema</label>
      <select v-model="theme">
        <option value="Claro">Claro</option>
        <option value="Oscuro">Oscuro</option>
      </select>

      <button type="submit">Guardar</button>
    </form>

    <p v-if="successMessage" class="message">
      {{ successMessage }}
    </p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PreferenciasView',

  data() {
    return {
      unit: 'metric',
      theme: 'Claro',
      successMessage: ''
    }
  },

  computed: {
    ...mapGetters(['userPreferences'])
  },

  mounted() {
    this.unit = this.userPreferences.unit || 'metric'
    this.theme = this.userPreferences.theme || 'Claro'
  },

  methods: {
    ...mapActions(['updatePreferences']),

    savePreferences() {
      this.updatePreferences({
        unit: this.unit,
        theme: this.theme
      })

      this.successMessage = 'Preferencias guardadas correctamente'
    }
  }
}
</script>