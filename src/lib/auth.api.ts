import type { User } from '@/stores/auth'
import { authHeader } from './utils'

const API_URL = import.meta.env.VITE_API_URL || ''

export async function login(username: string, password: string): Promise<User> {
  try {
    console.log('login', username, password)
    const response = await fetch(
      `${API_URL}/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      throw new Error('Login failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error('Login failed')
  }
}

export async function register(
  username: string,
  password: string,
  email: string,
) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
    if (!response.ok) {
      throw new Error('Registration failed')
    }
    return await response.json()
  } catch (error) {
    throw new Error('Registration failed')
  }
}

export async function update(update: {
  oldPassword: string | undefined
  password: string | undefined
  name: string | undefined
  email: string | undefined
}) {
  try {
    const response = await fetch(`${API_URL}/auth/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(update),
    })
    if (!response.ok) {
      throw new Error('Update failed')
    }
    return await response.json()
  } catch (error) {
    throw new Error('Update failed')
  }
}

export async function logout() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      ...authHeader(),
    })
    if (!response.ok) {
      throw new Error('Logout failed')
    }
    return await response.json()
  } catch (error) {
    throw new Error('Logout failed')
  }
}

export async function refresh(refreshToken: string) {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify({ refreshToken }),
    })
    if (!response.ok) {
      throw new Error('Token refresh failed')
    }
    return await response.json()
  } catch (error) {
    throw new Error('Token refresh failed')
  }
}

export default {
  login,
  register,
  logout,
  refresh,
  update,
}
