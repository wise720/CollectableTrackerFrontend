import { defineStore } from 'pinia'
import router from '@/router'
import api from '@/lib/api'
import { useListStore } from './list'

//https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial#users-store-js

export interface User {
  id: number
  username: string
  email: string
  token?: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user') ?? 'null') as User | null,
    returnUrl: null,
  }),
  actions: {
    async login(username: string, password: string) {
      const user = await api.auth.login(username, password)
      if (!user) {
        return Promise.reject('Username or password is incorrect')
      }
      // update pinia state
      this.user = user

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      useListStore().authInit()
      router.push('/')
    },
    logout() {
      api.auth.logout()
      this.user = null
      localStorage.removeItem('user')
      router.push('/')
    },
    async update(params: {
      oldPassword: string | undefined
      password: string | undefined
      name: string | undefined
      email: string | undefined
    }) {
      const user = this.user
      if (!user) {
        return Promise.reject('Not logged in')
      }
      await api.auth.update(params)
      this.setUser({
        ...user,
        ...params,
        name: params.name ?? user.name,
        email: params.email ?? user.email,
      })
    },
    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
})
