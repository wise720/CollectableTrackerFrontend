<script setup lang="ts">
import { ref } from 'vue'
import { Share2 as Share2Icon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth';
import { useListStore } from '@/stores/list';
import { Button } from './ui/button'

const isHovered = ref(false)
const msg = ref("Copy share link")
const copyShareLink = () => {
    const userId = useAuthStore().user?.id
    const listId = useListStore().list?.id
    const shareLink = `${window.location.origin}/users/${userId}/list/${listId}`
    
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        msg.value = "Copied!"
        setTimeout(() => {
          msg.value = "Copy share link"
        }, 1000)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }
</script>

<template>
    <div class="relative inline-block">
      <button
        variant="default"
        size="icon"
        class="relative z-10 w-10 h-10 p-0 overflow-hidden group"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @click="copyShareLink"
      >
        <Share2Icon class="h-5 w-5 relative z-10 ms-2" />
        <span
          class="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out bg-muted-foreground transform translate-x-full group-hover:translate-x-0"
        />
      </button>
      <div
        :class="`absolute right-full top-0 h-full flex items-center transition-all duration-300 ease-in-out transform ${
          isHovered ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`"
      >
        <span class="whitespace-nowrap px-3 py-2 text-sm text-primary-foreground bg-primary rounded-l-md">
          {{ msg }}
        </span>
      </div>
    </div>
  </template>
  
