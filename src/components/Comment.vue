<script setup lang="ts">
const props = defineProps<{
  id: number
  author: string
  message: string
  created: number
}>()
const formatDate = (created:number) => {
  console.log(new Date( created))
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date( created * 1000))
}
</script>
<template>
  <div class="flex justify-between items-start bg-secondary rounded p-2">
    <div>
      <h3 class="text-lg font-semibold">{{ props.author }}</h3>
      <p class="mt-1">{{ props.message }}</p>
    </div>
    <span class="text-sm">{{ formatDate(props.created) }}</span>
  </div>
</template>
