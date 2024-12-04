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
import type { User } from '@/stores/auth'
import api from '@/lib/api'

const props = defineProps<{
  user: User
}>()

const accountSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(128),
    email: z
      .string({
        required_error: 'Please select an email to display.',
      })
      .email(),
  }),
)

const accountForm = useForm({
  validationSchema: accountSchema,
  initialValues: {
    username: props.user.username,
    email: props.user.email,
  },
})

const onAccSubmit = accountForm.handleSubmit(values => {
  api.auth.update({
    oldPassword: undefined,
    newPassword: undefined,
    name: values.username,
    email: values.email,
  })
})
</script>
<template>
  <form class="space-y-8" @submit="onAccSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="username" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Update Account</Button>
  </form>
</template>
