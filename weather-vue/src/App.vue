<template>
  <div class="app-shell">
    <header class="main-header">
      <nav class="main-nav container">
        <router-link to="/" class="main-nav__brand">
          App de Clima
        </router-link>
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
export default {
  name: 'App'
}
</script>