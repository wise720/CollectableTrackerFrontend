<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import NewListDialog from './NewListDialog.vue'
import { useAuthStore } from '@/stores/auth'
import { useListStore } from '@/stores/list'
import { ref } from 'vue'
import type { Game } from '@/lib/api'

const store = useAuthStore()
store.$subscribe(state => {
  console.log('state', state)
  user.value = store.user
})

const user = ref(store.user)

const myGames = ref<Game[]>([])
const listStore = useListStore()
listStore.$subscribe(() => (myGames.value = listStore.myGames || []))
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem v-if="user">
        <NavigationMenuTrigger
          ><RouterLink to="/list">
            <NavigationMenuLink>Lists</NavigationMenuLink>
          </RouterLink>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul>
            <li
              v-for="c in myGames"
              :key="c.name"
              style="padding: 1rem; text-wrap: nowrap"
            >
              <RouterLink :to="'/list/' + c.name"
                ><NavigationMenuLink>{{
                  c.name
                }}</NavigationMenuLink></RouterLink
              >
            </li>
            <li style="padding: 1rem; text-align: left; text-wrap: nowrap">
              <NavigationMenuLink>
                <NewListDialog></NewListDialog>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
