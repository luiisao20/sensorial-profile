<template>
  <SideBar v-if="route.name !== 'Login'" />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SideBar from '@/components/SideBar.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

const route = useRoute();

onMounted(() => {
  initFlowbite();
})
</script>
