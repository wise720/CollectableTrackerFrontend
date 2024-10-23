<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { getLists } from '@/lib/collectableList'
const components = getLists()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger
          ><RouterLink to="/lists">
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
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <RouterLink to="/">
          <NavigationMenuLink>About</NavigationMenuLink>
        </RouterLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
