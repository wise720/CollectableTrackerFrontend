<script setup lang="ts">
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

import { VisuallyHidden } from 'radix-vue'
const props = defineProps<{
  itemId: number
  data: {
    name: string
    components: {
      name: string
      relicList: { relic: string; rarity: string }[]
    }[]
  }
}>()

const components = props.data.components

const relicsRows: { relic: string; rarity: string }[][] = [[]]
const maxRelics = Math.max(...components.map(c => c.relicList.length))

for (let i = 0; i < components.length; i++) {
  const relics = components[i].relicList
  for (let j = 0; j < maxRelics; j++) {
    const relic = relics[j]
    if (!relicsRows[j]) {
      relicsRows[j] = []
    }
    if (!relic) {
      relicsRows[j].push({ relic: '', rarity: '' })
    } else {
      relicsRows[j].push(relic)
    }
  }
}
console.log(relicsRows)
</script>
<template>
  <div style="width: 80vw; margin: auto">
    <h1 style="font-size: xx-large">{{ props.data.name }}</h1>
    <div class="flex flex-wrap">
      <Table class="flex-1" :style="'width: ' + components.length * 10 + 'rem'">
        <VisuallyHidden>
          <TableCaption>Compontents</TableCaption>
        </VisuallyHidden>
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="comp in components"
              v-bind:key="comp.name"
              class="w-[100px] text-center"
            >
              {{ comp.name }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(row, i) in relicsRows" v-bind:key="i">
            <TableCell
              v-for="relic in row"
              v-bind:key="relic.relic"
              class="text-center"
            >
              <div
                :class="relic.rarity"
                class="rounded-full inline-block"
                style="padding: 0.5rem 1rem 0.5rem 1rem; margin: auto"
              >
                {{ relic.relic }}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="ms-5 flex-auto" style="position: relative">
        <slot name="comments"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Common {
  background-color: var(--bronze);
}
.Uncommon {
  background-color: var(--silver);
}
.Rare {
  background-color: var(--gold);
}
</style>
