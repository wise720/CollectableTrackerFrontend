<script setup lang="ts">
import { reactive, ref } from 'vue'
import Comment from './Comment.vue'
import { Button } from './ui/button'
import { Textarea } from '@/components/ui/textarea'

import * as z from 'zod'
const props = defineProps<{
  itemId: number
  game: string
}>()

import { TransitionGroup } from 'vue'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

import { useAuthStore } from '@/stores/auth'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { VisuallyHidden } from 'radix-vue'

const getComments = async (itemId, game) => {
  return [
    {
      id: 1,
      user: 'John Doe',
      comment: 'This is a comment',
      date: Date.now() - 1000 * 60 * 30,
    },
    {
      id: 2,
      user: 'Jane Doe',
      comment: 'This is another comment',
      date: Date.now() - 1000 * 60 * 60,
    },
  ]
}

const commentSchema = toTypedSchema(
  z.object({
    comment: z.string(),
  }),
)
const form = useForm({
  validationSchema: commentSchema,
})

const addComment = form.handleSubmit(values => {
  console.log(data.comments)
  data.comments?.unshift({
    id: Date.now(),
    user: useAuthStore().user?.name || 'Anonymous',
    comment: values.comment,
    date: new Date().valueOf(),
  })
  form.resetForm()
})

const data = reactive<{
  loading: boolean
  comments?: { id: number; user: string; comment: string; date: number }[]
}>({ loading: true })

getComments(props.itemId, props.game).then(res => {
  data.loading = false
  data.comments = res
})
</script>
<template>
  <div v-if="!data.loading" style="width: 90%; margin-left: auto">
    <TransitionGroup
      name="comment-list"
      tag="ul"
      class="space-y-4"
      style="width: 100%"
    >
      <li
        v-for="comment in data.comments"
        :key="comment.id"
        class="rounded-mb shadow"
      >
        <Comment
          :id="comment.id"
          :user="comment.user"
          :comment="comment.comment"
          :date="comment.date"
        />
      </li>
    </TransitionGroup>

    <form @submit="addComment">
      <FormField v-slot="{ componentField }" name="comment">
        <FormItem>
          <FormLabel>Comment</FormLabel>
          <FormControl>
            <Textarea
              v-bind="componentField"
              placeholder="Type your message here. "
              rows="3"
              class="mt-1 block w-full"
            ></Textarea>
          </FormControl>
          <VisuallyHidden>
            <FormDescription>add comment now </FormDescription>
          </VisuallyHidden>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit"> Add Comment </Button>
    </form>
  </div>
</template>
<style scoped>
.comment-list-enter-active,
.comment-list-leave-active {
  transition: all 0.5s ease;
}
.comment-list-enter-from,
.comment-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
