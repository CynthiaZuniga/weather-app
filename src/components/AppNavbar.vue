<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">Inicio</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
      <router-link to="/preferencias">Preferencias</router-link>
    </div>

    <div class="nav-right">
      <template v-if="isAuthenticated">
        <span>Hola, {{ currentUser.name }}</span>
        <button @click="handleLogout">Cerrar sesión</button>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4fa3ff;
  padding: 15px 20px;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 15px;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

span {
  color: white;
  font-weight: bold;
}

button {
  background: white;
  color: #4fa3ff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
</style>