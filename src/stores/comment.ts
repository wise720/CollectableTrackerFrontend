import api from '@/lib/api'
import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
  state: () => ({
    collectableId: null as number | null,
    comments: [] as Comment[],
    description: '',
    customData: '',
    icon: '',
    name: '',
  }),
  actions: {
    async getComments(collectableId: number) {
      const comments = await api.items.getComments(collectableId)
      this.comments = comments
      return comments
    },
    async addComment(collectableId: number, comment: string) {
      await api.items.addComment(collectableId, comment)
      this.getComments(collectableId)
    },
    async getItem(collectableId: number) {
      this.collectableId = collectableId
      const item = await api.items.get(collectableId)
      this.name = item.name
      this.description = item.description
      this.customData = item.componentData
      this.icon = item.icon
    },
  },
})
