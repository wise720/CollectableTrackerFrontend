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
          v-for="list in useListStore().myGames"
          @click="router.push('/list/' + list.game)"
          :key="list.id"
          style="text-wrap: nowrap"
        >
          <TableCell>
            {{ list.game }}
          </TableCell>
          <TableCell class="text-right">
            {{ list.complete }}/{{ list.total }}</TableCell
          >
        </TableRow>
      </TableHeader>
    </Table>
  </div>
</template>
