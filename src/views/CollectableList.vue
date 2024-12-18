<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { valueUpdater } from '@/lib/utils'
import type {
  ColumnDef,
  ExpandedState,
  GlobalFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableHeader,
} from '@/components/ui/table'
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer'
import WikiItem from '@/components/WikiItem.vue'

console.log('CollectableList.vue')

import { VisuallyHidden } from 'radix-vue'

import { h, ref } from 'vue'

import api from '@/lib/api'
import { useListStore } from '@/stores/list'
import { type Collectable, type CollectableItem } from '@/types/collectableList'

const props = defineProps<{
  id: string | null
  userId: string | null
  listId: number | null
}>()

const readOnly = ref(false)
const game = ref('')
const data = ref<CollectableItem[]>([])
if (props.id) {
  useListStore()
    .getList(props.id)
    .then(e => (data.value = e.items))
  game.value = props.id
} else {
  api.getListById(props.userId!, props.listId!).then(e => {
    data.value = e.items
    game.value = e.game
  })
  readOnly.value = true
}

const updateCollectStatus = (id: number, state: boolean) =>
  api.lists.updateCollectStatus(props.id!, id, state)

const columns: ColumnDef<CollectableItem>[] = [
  {
    accessorKey: 'item',
    header: () => h('div', { class: 'text-left' }, 'name'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        (row.getValue('item') as Collectable).itemName,
      )
    },
  },
  {
    accessorKey: 'tag',
    header: () => h('div', { class: 'text-left' }, 'tag'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        (row.getValue('item') as Collectable).itemType,
      )
    },
  },
  {
    id: 'actions',
    header: ({ table }) => h('div', { class: 'text-right' }, 'Have'),
    cell: ({ row }) => {
      const item = row.original

      return h(Checkbox, {
        checked: item.collected,
        class: 'justify-center margin-auto text-right m-auto mr-6',
        disabled: readOnly.value,
        'onUpdate:checked': value => (item.collected = value),
        onClick: e => {
          item.collected = !item.collected
          updateCollectStatus(item.id, item.collected)
          e.stopPropagation()
        },
      })
    },
    meta: {
      align: 'right',
    },
    enableSorting: false,
    enableHiding: false,
  },
]

const sorting = ref<SortingState>([])
const globalFilter = ref<GlobalFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onGlobalFilterChange: updaterOrValue =>
    valueUpdater(updaterOrValue, globalFilter),
  onColumnVisibilityChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
  },
})

const collectableId = ref(-1)
const openDrawer = ref(false)
</script>

<template>
  <div class="w-full" style="width: 80vw">
    <div class="flex gap-2 items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="name"
        :model-value="globalFilter[0]?.value"
        @update:model-value="table.setGlobalFilter(String($event))"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto"> Columns </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter(column => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              value => {
                column.toggleVisibility(!!value)
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="rounded-md border">
      <Table class="w-full">
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow
                :data-state="row.getIsSelected() && 'selected'"
                @click="
                  () => {
                    if (readOnly) return
                    collectableId = row.original.item.collectableId
                    openDrawer = true
                    console.log('openHelp', openDrawer)
                  }
                "
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Drawer v-model:open="openDrawer">
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Help</DrawerTitle>
          <DrawerDescription>
            This is a drawer that contains help information.
          </DrawerDescription>
        </VisuallyHidden>
        <div style="height: 70vh">
          <WikiItem :collectable-id="collectableId" :game="game" />
        </div>
      </DrawerContent>
    </Drawer>
    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
