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

const store = useAuthStore()
store.$subscribe(state => {
  console.log('state', state)
  user.value = store.user
})

const user = ref(store.user)

const noNewGames = ref(false)

const listStore = useListStore()
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
              v-for="c in listStore.myGames"
              :key="c.game"
              style="padding: 1rem; text-wrap: nowrap"
            >
              <RouterLink :to="'/list/' + c.game"
                ><NavigationMenuLink>{{
                  c.game
                }}</NavigationMenuLink></RouterLink
              >
            </li>
            <li
              v-if="!noNewGames"
              style="padding: 1rem; text-align: left; text-wrap: nowrap"
            >
              <NavigationMenuLink>
                <NewListDialog v-model="noNewGames"></NewListDialog>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
