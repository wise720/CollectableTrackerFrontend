interface CollectableList {
  id: number
  name: string
  items: Collectable[]
}

export interface Collectable {
  id: number
  name: string
  description: string
  checked: boolean
}

const lists: CollectableList[] = [
  {
    id: 1,
    name: 'Warframe',
    items: [
      // random prime items foundrty from warframe
      {
        id: 1,
        name: 'Ash Prime Blueprint',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 2,
        name: 'Ash Prime Chassis',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 3,
        name: 'Ash Prime Neuroptics',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 4,
        name: 'Ash Prime Systems',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 5,
        name: 'Banshee Prime Blueprint',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 6,
        name: 'Banshee Prime Chassis',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 7,
        name: 'Banshee Prime Neuroptics',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 8,
        name: 'Banshee Prime Systems',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 9,
        name: 'Ember Prime Blueprint',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 10,
        name: 'Ember Prime Chassis',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 11,
        name: 'Ember Prime Neuroptics',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 12,
        name: 'Ember Prime Systems',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 13,
        name: 'Frost Prime Blueprint',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 14,
        name: 'Frost Prime Chassis',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 15,
        name: 'Frost Prime Neuroptics',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 16,
        name: 'Frost Prime Systems',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 17,
        name: 'Hydroid Prime Blueprint',
        description: 'Relict 9V',
        checked: false,
      },
      {
        id: 18,
        name: 'Hydroid Prime Chassis',
        description: 'Relict 9V',
        checked: true,
      },
      {
        id: 19,
        name: 'Hydroid Prime Neuroptics',
        description: 'Relict 9V',
        checked: false,
      },
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
