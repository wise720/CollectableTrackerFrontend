import { useAuthStore } from './auth'
import { defineStore } from 'pinia'

//https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial#users-store-js

interface User {
  id: number
  name: string
  password: string
  email?: string
}

interface State {
  users: User[]
  user: User | null
}

export const useUsersStore = defineStore({
  id: 'users',
  state: (): State => ({
    users: [
      { name: 'test', id: 1, password: 'test' },
      {
        name: 'shadcn',
        email: 'm@example.com',
        id: 2,
        password: 'test',
      },
    ],
    user: null,
  }),
  actions: {
    async register(user: { username: string; password: string }) {
      if (this.users.map(e => e.name).includes(user.username)) {
        return Promise.reject(`Username ${user.username} is already taken`)
      }
      this.users.push({
        id: this.users.length + 1,
        name: user.username,
        password: user.password,
      })
    },
    async getAll() {
      //this.users = [{ name: 'test', id: 1, password: 'test' }]
    },
    async getById(id: number) {
      this.user = this.users.find(x => x.id === id) || null
      if (!this.user) {
        return Promise.reject(`User with id ${id} not found`)
      }
    },
    async update(
      id: number,
      params: { name: string | undefined; password: string | undefined },
    ) {
      const user = this.users.find(x => x.id === id)
      if (!user) {
        return Promise.reject(`User with id ${id} not found`)
      }

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params }
        localStorage.setItem('user', JSON.stringify(user))

        // update auth user in pinia state
        authStore.user = user
      }
    },
    async delete(id: number) {
      // add isDeleting prop to user being deleted
      this.users = this.users.filter(x => x.id !== id)

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        authStore.logout()
      }
    },
  },
})
