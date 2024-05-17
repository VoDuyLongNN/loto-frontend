<template>
  <div>
    <Navigation />
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import Navigation from './components/Navigation.vue';

</script>