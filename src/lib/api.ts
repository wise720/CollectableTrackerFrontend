import type { CollectableList } from './collectableList'

import auth from './auth.api'
import { authHeader } from './utils'

const API_URL = import.meta.env.VITE_API_URL || ''

console.log(API_URL)

export interface Game {
  name: string
  amount: number
  total: number
  public: boolean
}

async function getAvailabeGames(): Promise<string[]> {
  const data = await fetch(API_URL + '/public/games')
  const json: { name: string; version: string }[] = await data.json()
  return json.map(e => e.name)
}

async function getMyGames(): Promise<Game[]> {
  const data = await fetch(API_URL + '/lists/games', { headers: authHeader() })
  return data.json()
}

async function addList(game: string) {
  await fetch(`${API_URL}/lists/${game}/new`, {
    method: 'POST',
    headers: authHeader(),
  })
}

async function setListPublic(game: string, isPublic: boolean) {
  await fetch(`${API_URL}/lists/${game}/public?${isPublic}`, {
    method: 'POST',
    headers: authHeader(),
  })
}

async function getList(game: string): Promise<CollectableList> {
  const data = await fetch(`${API_URL}/lists/${game}`, {
    headers: authHeader(),
  })
  return data.json()
}

async function getPublicLists(): Promise<
  {
    id: number
    name: string
    complete: number
    total: number
    username: string
  }[]
> {
  const data = await fetch(`${API_URL}/public/lists`)
  return data.json()

  //todo: add pagination
}

async function getListById(
  userid: string,
  id: number,
): Promise<CollectableList> {
  const data = await fetch(`${API_URL}/users/${userid}/list/${id}`, {
    headers: authHeader(),
  })
  return data.json()
}

export default {
  auth,
  lists: { addList, setListPublic, getMyGames, getList },
  public: { getPublicLists, getAvailabeGames },
  getListById,
}
