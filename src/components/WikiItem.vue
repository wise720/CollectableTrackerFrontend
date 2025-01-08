<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import CommentSection from '@/components/CommentSection.vue'
import { useItemStore } from '@/stores/comment'

const props = defineProps<{
  collectableId: number
  game: string
}>()

console.log(import.meta.env.VITE_PLUGINS_PATH)



const data = ref({ loading: true })
const c = defineAsyncComponent(() =>
  import(`./../plugins/${props.game}/${props.game}.es.js`).then(e => {
    import(`./../plugins/${props.game}/plugin.css`)
    return e.default
  }),
)
const itemStore = useItemStore()

itemStore.getComments(props.collectableId)
itemStore.getItem(props.collectableId).then(() => {
  data.value.loading = false
})
</script>
<template>
  <c
    v-if="!data.loading"
    :itemId="props.collectableId"
    :data="JSON.parse(itemStore.customData)"
    :description="itemStore.description"
    :icon="itemStore.icon"
    :name="itemStore.name"
  >
    <template v-slot:comments>
      <CommentSection :collectableId="props.collectableId"> </CommentSection>
    </template>
  </c>
</template>
