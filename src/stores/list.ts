import { defineStore } from 'pinia'
import api from '@/lib/api'
import type { CollectableList } from '@/lib/collectableList'

export const useListStore = defineStore({
  id: 'tracker',
  state: () => {
    const data = {
      games: [] as string[],
      myGames: [] as string[],
      list: {} as CollectableList | null,
      readOnlyList: {} as CollectableList | null,
    }
    api.public.getAvailabeGames().then(games => {
      console.log('games', games)
      data.games = games
    })
    return data
  },
  actions: {
    async authInit() {
      this.myGames = await api.lists.getMyGames()
    },
    addList(game: string) {
      this.myGames.push(game)
      api.lists.addList(game)
    },
    async getMyGames() {
      if (!this.myGames.length) return []
      this.myGames = await api.lists.getMyGames()
      return this.myGames
    },
    async getList(game: string) {
      this.list = await api.lists.getList(game)
    },
    async getListById(userid: string, id: number) {
      this.readOnlyList = await api.getListById(userid, id)
    },
  },
})
