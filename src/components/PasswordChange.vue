<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import { useForm } from 'vee-validate'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const passwordSchema = toTypedSchema(
  z.object({
    oldPassword: z.string().min(6).max(128),
    newPassword: z.string().min(6).max(128),
  }),
)

const passwordForm = useForm({
  validationSchema: passwordSchema,
})

const error = ref('')

const onPasswordSubmit = passwordForm.handleSubmit(values => {
  useAuthStore()
    .update({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      name: undefined,
      email: undefined,
    })
    .catch(e => {
      error.value = (e as string) || 'An error occurred'
    })
})
</script>
<template>
  <form class="space-y-8" @submit="onPasswordSubmit">
    <FormField v-slot="{ componentField }" name="oldPassword">
      <FormItem>
        <FormLabel>Old Password</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Old Password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="newPassword">
      <FormItem>
        <FormLabel>New Password</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="New Password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div v-if="error" class="text-sm text-red-800 dark:text-red-400">
      {{ error }}
    </div>
    <Button type="submit">Update Pasword</Button>
  </form>
</template>
