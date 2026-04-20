<template>
  <section class="login-page">
    <h2>Iniciar sesión</h2>

    <form @submit.prevent="handleLogin" class="login-form">
      <input v-model="email" type="email" placeholder="Correo" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>

    <p v-if="errorMessage" class="message error">
      {{ errorMessage }}
    </p>

    <div class="demo-users">
      <p><strong>Usuarios de prueba:</strong></p>
      <p>cynthia@email.com / 1234</p>
      <p>maria@email.com / abcd</p>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    ...mapActions(['login']),

    async handleLogin() {
      const success = await this.login({
        email: this.email,
        password: this.password
      })

      if (success) {
        this.errorMessage = ''
        this.$router.push('/')
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos'
      }
    }
  }
}
</script>