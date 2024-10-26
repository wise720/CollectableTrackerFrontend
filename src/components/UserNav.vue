<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const store = useAuthStore()
store.$subscribe(state => {
  console.log('state', state)
  user.value = store.user
})

const user = ref(store.user)

const logout = () => {
  console.log('logout')
  useAuthStore().logout()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent v-if="user" class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ user.name }}</p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ user.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <RouterLink to="/settings" style="padding: 0">
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
        </RouterLink>
        <DropdownMenuSeparator />

        <DropdownMenuItem @click="logout">
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
    <DropdownMenuContent v-else class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">Guest</p>
          <p class="text-xs leading-none text-muted-foreground">
            Not logged in
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <RouterLink to="/login" style="padding: 0">
          <DropdownMenuItem> Login </DropdownMenuItem>
        </RouterLink>
        <RouterLink to="/register" style="padding: 0">
          <DropdownMenuItem> Register </DropdownMenuItem>
        </RouterLink>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
router-link {
  padding: 0;
}
</style>
