import { defineStore } from 'pinia'
import api from '@/lib/api'
import { ref } from 'vue'
import type {
  CollectableList,
  CollectableListDescriptor,
} from '@/types/collectableList'

export const useListStore = defineStore('tracker', {
  state: () => {
    const data = {
      games: [] as string[],
      myGames: ref<CollectableListDescriptor[] | null>(null),
      list: {} as CollectableList | null,
      readOnlyList: {} as CollectableList | null,
      valid: false,
    }
    api.public.getAvailabeGames().then(games => {
      data.games = games
    })
    return data
  },
  actions: {
    async authInit() {
      this.getMyGames()
      
    },
    async addList(game: string) {
      await api.lists.addList(game)
      this.getMyGames()
    },
    async getMyGames() {
      if (this.valid) return this.myGames
      this.myGames = await api.lists.getMyGames()
      this.valid = true
      return this.myGames
    },
    async getList(game: string) {
      if (this.valid && this.list?.game === game) return this.list
      this.list = await api.lists.getList(game)
      this.valid = true
      return this.list
    },
    async getListById(userid: string, id: number) {
      if (this.readOnlyList?.id === id) return this.readOnlyList
      this.readOnlyList = await api.getListById(userid, id)
      return this.readOnlyList
    },
    reset() {
      this.myGames = null
      this.list = null
      this.readOnlyList = null
    }
  },
})
