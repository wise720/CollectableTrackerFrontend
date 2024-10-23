import { defineStore } from 'pinia'
import router from '@/router'

import { useUsersStore } from '@/stores/user'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user') ?? 'null'),
    returnUrl: null,
  }),
  actions: {
    async login(username: string, password: string) {
      const user = useUsersStore().users.find(
        x => x.name === username && x.password === password,
      )
      if (!user) {
        return Promise.reject('Username or password is incorrect')
      }
      // update pinia state
      this.user = user

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/')
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/')
    },
  },
})
