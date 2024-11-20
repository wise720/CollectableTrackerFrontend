export interface CollectableList {
  id: number
  name: string
  items: Collectable[]
}

export interface Collectable {
  id: number
  name: string
  tag: string
  checked: boolean
}

const lists: CollectableList[] = [
  {
    id: 1,
    name: 'Warframe',
    items: [
      // random prime items foundrty from warframe
      { id: 1, name: 'Ash Prime', checked: false, tag: 'Warframe' },
      { id: 2, name: 'Banshee Prime', checked: false, tag: 'Warframe' },
      { id: 3, name: 'Ember Prime', checked: true, tag: 'Warframe' },
      { id: 4, name: 'Equinox Prime', checked: false, tag: 'Warframe' },
      { id: 5, name: 'Frost Prime', checked: false, tag: 'Warframe' },
      { id: 6, name: 'Hydroid Prime', checked: false, tag: 'Warframe' },
      { id: 7, name: 'Inaros Prime', checked: true, tag: 'Warframe' },
      { id: 8, name: 'Ivara Prime', checked: false, tag: 'Warframe' },
      { id: 9, name: 'Limbo Prime', checked: false, tag: 'Warframe' },
      { id: 10, name: 'Loki Prime', checked: true, tag: 'Warframe' },
      { id: 11, name: 'Mag Prime', checked: false, tag: 'Warframe' },
      { id: 12, name: 'Mesa Prime', checked: false, tag: 'Warframe' },
      { id: 13, name: 'Mirage Prime', checked: false, tag: 'Warframe' },
      { id: 14, name: 'Nekros Prime', checked: true, tag: 'Warframe' },
      { id: 15, name: 'Nezha Prime', checked: false, tag: 'Warframe' },
      { id: 16, name: 'Nidus Prime', checked: false, tag: 'Warframe' },
      { id: 17, name: 'Nova Prime', checked: true, tag: 'Warframe' },
      { id: 18, name: 'Nyx Prime', checked: false, tag: 'Warframe' },
      { id: 19, name: 'Oberon Prime', checked: false, tag: 'Warframe' },
      { id: 20, name: 'Octavia Prime', checked: false, tag: 'Warframe' },
      { id: 21, name: 'Rhino Prime', checked: false, tag: 'Warframe' },
      { id: 22, name: 'Saryn Prime', checked: false, tag: 'Warframe' },
      { id: 23, name: 'Titania Prime', checked: false, tag: 'Warframe' },
      { id: 24, name: 'Trinity Prime', checked: false, tag: 'Warframe' },
      { id: 25, name: 'Valkyr Prime', checked: true, tag: 'Warframe' },
      { id: 26, name: 'Vauban Prime', checked: false, tag: 'Warframe' },
      { id: 27, name: 'Volt Prime', checked: false, tag: 'Warframe' },
      { id: 28, name: 'Wukong Prime', checked: false, tag: 'Warframe' },
      { id: 29, name: 'Zephyr Prime', checked: false, tag: 'Warframe' },
      { id: 30, name: 'Akbronco Prime', checked: false, tag: 'Pistol' },
    ],
  },
]

export function getLists(): {
  id: number
  name: string
  complete: number
  total: number
  username: string
}[] {
  return lists.map(list => ({
    id: list.id,
    name: list.name,
    username: 'test',
    complete: list.items.filter(item => item.checked).length,
    total: list.items.length,
  }))
}

export function getList(id: number): CollectableList {
  return lists.find(list => list.id === id)!
}

export function getPublicLists(query: string) {
  return getLists()
}
