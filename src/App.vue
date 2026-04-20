<template>
  <div class="app-shell">
    <header class="main-header">
      <nav class="main-nav container">
        <div class="main-nav__left">
          <router-link to="/" class="main-nav__brand">
            App de Clima
          </router-link>

          <router-link to="/favoritos">
            Favoritos
          </router-link>

          <router-link to="/preferencias">
            Preferencias
          </router-link>
        </div>

        <div class="main-nav__right">
          <template v-if="isAuthenticated">
            <span>Hola, {{ currentUser.name }}</span>
            <button @click="handleLogout">Cerrar sesión</button>
          </template>

          <template v-else>
            <router-link to="/login">Login</router-link>
          </template>
        </div>
      </nav>
    </header>

    <main class="container app-shell__content">
      <router-view />
    </main>

    <footer class="main-footer">
      <p>@Cynthia's Head 2026 Copyright</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },

  methods: {
    ...mapActions(['logout']),

    handleLogout() {
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>