export interface CollectableListDescriptor {
  id: number
  game: string
  complete: number
  total: number
  public: boolean
  username: string | null
  userId: string | null
}

export interface CollectableList {
  id: number
  game: string
  items: CollectableItem[]
}

export interface CollectableItem {
  id: number
  tag: string
  collected: boolean
  item: Collectable
}

export interface Collectable {
  collectableId: number
  itemId: string
  game: string
  itemType: string
  itemName: string
  itemDescription: string
  itemIcon: string
  componentData: string
}

export interface Item {
  collectableId: number
  name: string
  description: string
  icon: string
  componentData: string
}
