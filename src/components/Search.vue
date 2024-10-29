<script setup lang="ts">
import { Input } from '@/components/ui/input'
import router from '@/router'
import { ref } from 'vue'
const query = ref('')
const handleSearch = () => {
  router.push({ name: 'search', query: { query: query.value }, force: true })
}
</script>
<template>
  <div>
    <Input
      type="search"
      placeholder="Search..."
      class="md:w-[100px] lg:w-[300px]"
      v-model="query"
      v-on:keyup.enter="handleSearch"
    />
  </div>
</template>
