<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref, watch } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/lib/api'
import type { CollectableListDescriptor } from '@/types/collectableList'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

const query = ref(route.query.query as string ?? '')
console.log(`query: ${query.value}`)
const data = ref<CollectableListDescriptor[]>([]) //getPublicLists(query.value))

api.public.getPublicLists(query.value).then(res => {
  data.value = res
  console.log(res)
})

watch(()=> route.query.query, () => {
    query.value = route.query.query as string ?? ''
    api.public.getPublicLists(query.value).then(res => {
    data.value = res
    console.log(res)
  })

})

const openList = (userid: string, listId: number) =>
  router.push(`/users/${userid}/list/${listId}`)
</script>
<template>
  <div>
    <Input
      type="search"
      placeholder="Search..."
      class="md:w-[100px] lg:w-[300px]"
      v-model="query"
    />
  </div>
  <div style="margin-top: 5rem; width: 80vw">
    <Table>
      <TableCaption>public Collectable Lists</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> User </TableHead>
          <TableHead class="w-[100px]"> Game </TableHead>
          <TableHead class="text-right"> Completion </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="row in data"
          :key="row.id"
          @click="openList(row.userId!, row.id)"
        >
          <TableCell class="font-medium">{{ row.username }} </TableCell>
          <TableCell class="font-medium">{{ row.game }} </TableCell>
          <TableCell class="text-right"
            >{{ ((row.complete * 100) / row.total).toFixed(2) }}%
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<style scoped>
.Uncommon {
  color: #b08d57;
}
.Rare {
  color: #0000ff;
}
.Legendary {
  color: #ff00ff;
}
</style>
