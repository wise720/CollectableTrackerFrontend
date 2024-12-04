import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref,
) {
  ref.value =
    typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    throw new Error('Unauth')
  }
}

export async function authFetch(url: string, options: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...authHeader(),
    },
  })
  if (res.status == 401) {
    router.push('/login')
  }
  if (!res.ok) {
    throw new Error('Fetch failed')
  }
  return res
}
