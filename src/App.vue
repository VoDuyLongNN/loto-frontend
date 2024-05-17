<template>
  <div class="mt-[64px]">
    <Navigation v-if="!hideNavigation"/>
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import Navigation from './components/Navigation.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, watchEffect } from 'vue';

  const hideNavigation = ref(false);
  const route = useRoute();

  watchEffect(() => {
    hideNavigation.value = route.meta.hideNavigation || false;
  });
</script>