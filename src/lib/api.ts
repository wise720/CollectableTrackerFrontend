import type {
  CollectableList,
  CollectableListDescriptor,
  Item,
} from '../types/collectableList'

import auth, { update } from './auth.api'
import { authFetch } from './utils'

const API_URL = import.meta.env.VITE_API_URL || ''

console.log(API_URL)

async function getAvailabeGames(): Promise<string[]> {
  const data = await fetch(API_URL + '/public/games')
  const json: { name: string; version: string }[] = await data.json()
  return json.map(e => e.name)
}

async function getMyGames(): Promise<CollectableListDescriptor[]> {
  const data = await authFetch(API_URL + '/lists/games')
  return data!.json()
}

async function addList(game: string) {
  await authFetch(`${API_URL}/lists/${game}/new`, {
    method: 'POST',
  })
}

async function setListPublic(game: string, isPublic: boolean) {
  await authFetch(`${API_URL}/lists/${game}/public?public=${isPublic}`, {
    method: 'POST',
  })
}

async function getList(game: string): Promise<CollectableList> {
  const data = await authFetch(`${API_URL}/lists/${game}`)
  return data!.json()
}

async function getPublicLists(query:string): Promise<CollectableListDescriptor[]> {
  const data = await fetch(`${API_URL}/public/lists?query=${query}`)
  return data.json()

  //todo: add pagination
}

async function getListById(
  userid: string,
  id: number,
): Promise<CollectableList> {
  const data = await authFetch(`${API_URL}/users/${userid}/list/${id}`)
  return data!.json()
}

async function getComments(collectableId: number) {
  const data = await fetch(`${API_URL}/items/${collectableId}/comments`)
  return data.json()
}

async function addComment(collectableId: number, message: string) {
  await authFetch(`${API_URL}/items/${collectableId}/comments`, {
    method: 'POST',
    headers:{"Content-Type": 'application/json',},
    body:  JSON.stringify(message),
  })
}

async function getItem(collectableId: number): Promise<Item> {
  const data = await fetch(`${API_URL}/items/${collectableId}`)
  return data.json()
}

async function updateCollectStatus(
  game: string,
  itemId: number,
  collected: boolean,
): Promise<void> {
  await authFetch(
    `${API_URL}/lists/${game}/${itemId}/collect?collected=${collected}`,
    {
      method: 'POST',
      body: JSON.stringify({ collected }),
    },
  )
}

export default {
  auth,
  lists: { addList, setListPublic, getMyGames, getList, updateCollectStatus },
  public: { getPublicLists, getAvailabeGames },
  items: { getComments, addComment, get: getItem },
  getListById,
}
