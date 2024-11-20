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
import { getPublicLists } from '@/lib/collectableList'

const props = defineProps<{ query: string }>()

const query = ref(props.query)

const data = ref<
  {
    id: number
    name: string
    complete: number
    total: number
    username: string
  }[]
>(getPublicLists(query.value))

watch(query, () => {
  data.value = getPublicLists(query.value)
})

const test = () => console.log('test')
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
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> User </TableHead>
          <TableHead class="w-[100px]"> Game </TableHead>
          <TableHead class="text-right"> Completion </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow @click="test" v-for="row in data" :key="row.id">
          <TableCell class="font-medium">{{ row.username }} </TableCell>
          <TableCell class="font-medium">{{ row.name }} </TableCell>
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
