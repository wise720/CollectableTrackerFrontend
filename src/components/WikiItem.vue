<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import CommentSection from '@/components/CommentSection.vue'
import { loadModule } from 'vue3-sfc-loader'

const props = defineProps<{
  itemId: number
  game: string
}>()

const pluginPath = import.meta.env.VITE_PLUGINS_PATH
console.log(import.meta.env.VITE_PLUGINS_PATH)

const requestData = async (itemId, game) => {
  return {
    name: 'Ash Prime',
    components: [
      {
        name: 'Blueprint',
        relicList: [
          { relic: 'Axi I3', rarity: 'Uncommon' },
          { relic: 'Lith S3', rarity: 'Uncommon' },
          { relic: 'Lith V7', rarity: 'Uncommon' },
          { relic: 'Meso C1', rarity: 'Uncommon' },
          { relic: 'Meso S3', rarity: 'Uncommon' },
        ],
      },
      {
        name: 'Chassis',
        relicList: [
          { relic: 'Axi B1', rarity: 'Uncommon' },
          { relic: 'Axi K12', rarity: 'Uncommon' },
          { relic: 'Lith V8', rarity: 'Uncommon' },
          { relic: 'Meso V2', rarity: 'Uncommon' },
          { relic: 'Neo N4', rarity: 'Uncommon' },
        ],
      },
      {
        name: 'Systems',
        relicList: [
          { relic: 'Axi A7', rarity: 'Rare' },
          { relic: 'Axi N1', rarity: 'Rare' },
          { relic: 'Neo A10', rarity: 'Rare' },
          { relic: 'Neo N5', rarity: 'Uncommon' },
        ],
      },
      {
        name: 'Neuroptics',
        relicList: [
          { relic: 'Axi N2', rarity: 'Uncommon' },
          { relic: 'Meso N2', rarity: 'Uncommon' },
          { relic: 'Meso P12', rarity: 'Uncommon' },
          { relic: 'Meso V4', rarity: 'Uncommon' },
          { relic: 'Neo A4', rarity: 'Uncommon' },
          { relic: 'Neo N3', rarity: 'Uncommon' },
          { relic: 'Neo V4', rarity: 'Uncommon' },
        ],
      },
    ],
  }
}

const data = ref({ loading: true })
requestData(props.itemId, props.game).then(res => {
  data.value = res
})

const c = defineAsyncComponent(() =>
  import(`../plugins/${props.game}/${props.game}.es.js`).then(e => {
    import(`../plugins/${props.game}/plugin.css`)
    return e.default
  }),
)
</script>
<template>
  <c v-if="!data.loading" :itemId="props.itemId" :data="data">
    <template v-slot:comments>
      <CommentSection :game="props.game" :itemId="props.itemId">
      </CommentSection>
    </template>
  </c>
</template>
