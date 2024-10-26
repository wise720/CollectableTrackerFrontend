<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNav from './components/MainNav.vue'
import Search from './components/Search.vue'
import UserNav from './components/UserNav.vue'
import DarkModeSelector from './components/DarkModeSelector.vue'
import router from './router'

const handleSearch = () => {
  router.push({ name: 'search', query: { query: 'test' } })
}
</script>
<template>
  <div class="hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <Search v-on:keyup.enter="handleSearch" />
          <DarkModeSelector />
          <UserNav />
        </div>
      </div>
    </div>
  </div>
  <div
    style="
      width: 100%;
      display: flex;
      place-items: center;
      align-items: center;
      margin-top: 2rem;
    "
  >
    <div style="margin: auto">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.top-layout {
  margin-top: 1rem;
}
</style>
