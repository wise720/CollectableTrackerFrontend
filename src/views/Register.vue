<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const email = ref('')

const register = () => {
  console.log('register')
  useAuthStore().login(username.value, password.value)
}
</script>

<template>
  <Card class="w-full max-w-sm" style="width: 700px; margin-top: 8rem">
    <CardHeader>
      <CardTitle class="text-2xl">Register</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input
          id="username"
          placeholder="username"
          v-model="username"
          required
        />
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          placeholder="user@domain.tld"
          v-model="email"
          required
        />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required v-model="password" />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="login"> Sign up </Button>
    </CardFooter>
  </Card>
</template>
