export interface CollectableList {
  id: number
  items: CollectableItem[]
}

export interface CollectableItem {
  id: number
  tag: string
  checked: boolean
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
