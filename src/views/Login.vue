<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
const error = ref('')
const login = async () => {
  console.log('logout')
  try {
    await useAuthStore().login(username.value, password.value)
  } catch (e) {
    console.log(e)
    error.value = (e as string) || 'An error occurred'
  }
}
</script>

<template>
  <Card class="w-full max-w-sm" style="margin-top: 8rem">
    <CardHeader>
      <CardTitle class="text-2xl"> Login </CardTitle>
      <CardDescription>
        Enter your email below to login to your account.
      </CardDescription>
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
        <Label for="password">Password</Label>
        <Input id="password" type="password" required v-model="password" />
      </div>
      <div class="text-sm text-red-800 dark:text-red-400" v-if="error">
        {{ error }}
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="login"> Sign in </Button>
    </CardFooter>
  </Card>
</template>
