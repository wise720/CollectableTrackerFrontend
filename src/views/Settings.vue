<script setup lang="ts">
import AccountSettings from '@/components/AccountSettings.vue'
import PasswordChange from '@/components/PasswordChange.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { useAuthStore } from '@/stores/auth'

const user = useAuthStore().user
</script>
<template>
  <div style="width: 50vw">
    <h1 style="font-size: xx-large">Settings</h1>
    <AccountSettings v-if="user" :user="user"></AccountSettings>
    <Separator style="margin-top: 1rem; margin-bottom: 1rem" />
    <PasswordChange v-if="user" :user="user"></PasswordChange>
  </div>
</template>
