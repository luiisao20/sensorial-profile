<template>
  <SideBar />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SideBar from '@/components/SideBar.vue';
</script>
