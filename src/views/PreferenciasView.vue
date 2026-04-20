<template>
  <section class="preferences-page">
    <h2>Mis preferencias</h2>

    <form @submit.prevent="savePreferences" class="login-form">
      <label>Unidad de temperatura</label>
      <select v-model="unit">
        <option value="°C">°C</option>
        <option value="°F">°F</option>
      </select>

      <label>Tema</label>
      <select v-model="theme">
        <option value="Claro">Claro</option>
        <option value="Oscuro">Oscuro</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PreferenciasView',

  data() {
    return {
      unit: '',
      theme: ''
    }
  },

  computed: {
    ...mapGetters(['userPreferences'])
  },

  mounted() {
    this.unit = this.userPreferences.unit
    this.theme = this.userPreferences.theme
  },

  methods: {
    ...mapActions(['updatePreferences']),

    savePreferences() {
      this.updatePreferences({
        unit: this.unit,
        theme: this.theme
      })

      alert('Preferencias guardadas correctamente')
    }
  }
}
</script>