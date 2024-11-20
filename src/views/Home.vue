<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NewListDialog from '@/components/NewListDialog.vue'
import { ref } from 'vue'

const store = useAuthStore()
store.$subscribe(state => {
  console.log('state', state)
  user.value = store.user
})

const user = ref(store.user)

const hasLists = ref(true)
</script>
<template>
  <div>
    <div style="font-size: xx-large; font-weight: bolder">
      Track your game collection progress now
    </div>
    <div v-if="!user" style="margin-top: 5rem; font-size: xx-large">
      Getting Started by creating an account
    </div>
    <div v-else-if="!hasLists">
      <div style="margin-top: 5rem; font-size: xx-large">
        No Game Tracked Yet create a
        <div class="text-primary inline">
          <NewListDialog></NewListDialog>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="margin-top: 5rem; font-size: xx-large">
        Welcome back
        <div class="text-primary inline">{{ store.user!.username }}</div>
      </div>
    </div>
  </div>
</template>
