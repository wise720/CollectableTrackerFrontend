import { defineStore } from 'pinia'
import api from '@/lib/api'
import type { CollectableList } from '@/lib/collectableList'

export const useListStore = defineStore({
  id: 'tracker',
  state: () => {
    const data = {
      games: [] as string[],
      myGames: null as string[] | null,
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
      this.getMyGames()
    },
    addList(game: string) {
      this.myGames?.push(game)
      api.lists.addList(game)
    },
    async getMyGames() {
      if (this.myGames != null) return this.myGames

      this.myGames = await api.lists.getMyGames()
      return this.myGames
    },
    async getList(game: string) {
      this.list = await api.lists.getList(game)
      return this.list
    },
    async getListById(userid: string, id: number) {
      this.readOnlyList = await api.getListById(userid, id)
      return this.readOnlyList
    },
  },
})
