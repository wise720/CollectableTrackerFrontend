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
import { getLists } from '@/lib/collectableList'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const store = useAuthStore()
store.$subscribe(state => {
  console.log('state', state)
  user.value = store.user
})

const user = ref(store.user)

const components = getLists()
console.log('user', user.value)
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
              v-for="c in components"
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
