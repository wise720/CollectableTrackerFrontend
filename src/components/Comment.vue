<script setup lang="ts">
const props = defineProps<{
  id: number
  user: string
  comment: string
  date: number
}>()
const formatDate = date => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>
<template>
  <div class="flex justify-between items-start bg-secondary rounded p-2">
    <div>
      <h3 class="text-lg font-semibold">{{ props.user }}</h3>
      <p class="mt-1">{{ props.comment }}</p>
    </div>
    <span class="text-sm">{{ formatDate(props.date) }}</span>
  </div>
</template>
