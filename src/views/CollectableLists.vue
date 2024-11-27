<script setup lang="ts">
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import router from '@/router'
import { useListStore } from '@/stores/list'
import { ref } from 'vue'
const lists = ref<
  { name: string; id: string; complete: number; total: number }[]
>([])
useListStore()
  .getMyGames()
  .then(
    e =>
      (lists.value = e.map(el => ({
        name: el,
        id: '',
        complete: 0,
        total: 100,
      }))),
  )
</script>

<template>
  <div style="width: 80vw">
    <Table>
      <TableCaption>List of all game u have a list of</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Name </TableHead>
          <TableHead class="text-right"> completed </TableHead>
        </TableRow>

        <TableRow
          @click="router.push('/list/' + list.name)"
          v-for="list in lists"
          :key="list.id"
          style="text-wrap: nowrap"
        >
          <TableCell>
            {{ list.name }}
          </TableCell>
          <TableCell class="text-right"
            >{{ list.complete }}/{{ list.total }}</TableCell
          >
        </TableRow>
      </TableHeader>
    </Table>
  </div>
</template>
