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

const passwordSchema = toTypedSchema(
  z.object({
    oldPassword: z.string().min(6).max(128),
    newPassword: z.string().min(6).max(128),
  }),
)

const passwordForm = useForm({
  validationSchema: passwordSchema,
})

const onPasswordSubmit = passwordForm.handleSubmit(values => {
  console.log('Form submitted!', values)
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
    <Button type="submit">Update Pasword</Button>
  </form>
</template>
