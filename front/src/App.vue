<template>
  <div id="app">
    <!-- Inclure AppTopbar ici -->
    <AppTopbar />

    <!-- Le reste du contenu de votre application -->
    <router-view/>
  </div>
</template>

<script>
import AppTopbar from './components/AppTopbar.vue';

export default {
  name: 'App',
  components: {
    AppTopbar
  }
};
</script>

<!-- Votre style existant ici -->
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
