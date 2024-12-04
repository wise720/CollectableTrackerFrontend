<script setup lang="ts">
import AccountSettings from '@/components/AccountSettings.vue'
import PasswordChange from '@/components/PasswordChange.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { useAuthStore } from '@/stores/auth'

import Checkbox from '@/components/ui/checkbox/Checkbox.vue'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table'

import { useListStore } from '@/stores/list'
import type { Game } from '@/lib/api'
import { ref } from 'vue'
import api from '@/lib/api'

const user = useAuthStore().user
const listsStore = useListStore()
listsStore.$subscribe(() => {
  lists.value = listsStore.myGames || []
})
const lists = ref<Game[]>([])

const publish = async (game: Game, publish: boolean) => {
  api.lists.setListPublic(game.name, publish)
  game.public = publish
}
</script>
<template>
  <div style="width: 50vw">
    <h1 style="font-size: xx-large">Settings</h1>
    <AccountSettings v-if="user" :user="user"></AccountSettings>
    <Separator style="margin-top: 1rem; margin-bottom: 1rem" />
    <PasswordChange v-if="user" :user="user"></PasswordChange>

    <div class="mt-5" style="font-size: x-large">Visibility of List</div>
    <Table class="w-1/10 mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Public</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(list, i) in lists" v-bind:key="i">
          <TableCell>{{ list.name }}</TableCell>
          <TableCell
            ><Checkbox
              v-model="list.public"
              v-on:update:checked="publish(list, $event)"
              label="Public"
            ></Checkbox
          ></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
