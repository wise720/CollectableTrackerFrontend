<script setup lang="ts">
import { reactive, ref } from 'vue'
import Comment from './Comment.vue'
import { Button } from './ui/button'
import { Textarea } from '@/components/ui/textarea'

import * as z from 'zod'
const props = defineProps<{
  collectableId: number
}>()

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
import { useItemStore } from '@/stores/comment'
import api from '@/lib/api'

useItemStore()
  .getComments(props.collectableId)
  .then(res => {
    data.loading = false
    data.comments = res
  })


const commentSchema = toTypedSchema(
  z.object({
    comment: z.string(),
  }),
)
const form = useForm({
  validationSchema: commentSchema,
})

const addComment = form.handleSubmit(values => {
  data.comments?.unshift({
    id: data.comments.length + 1,
    author: useAuthStore().user?.username || 'Anonymous',
    message: values.comment,
    created: Date.now(),
  })
  api.items.addComment(props.collectableId, values.comment)
  form.resetForm()
})

const data = reactive<{
  loading: boolean
  comments?: { id: number; author: string; message: string; created: number }[]
}>({ loading: true })


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
        v-for="(comment, i) in data.comments"
        :key="i"
        class="rounded-mb shadow"
      >
        <Comment
          :id="i"
          :author	="comment.author	"
          :message="comment.message"
          :created="comment.created"
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
