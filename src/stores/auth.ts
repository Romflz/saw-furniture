import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'auth.user'

const DEMO_USERNAME = 'demo'
const DEMO_PASSWORD = 'demo123'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<string | null>(localStorage.getItem(STORAGE_KEY))
  const isLoggedIn = computed(() => user.value !== null)

  // Here you would use a real fetch to the BE and store JWT or a cookie for example
  // Using this just as a dummy
  function login(username: string, password: string): boolean {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      user.value = username
      localStorage.setItem(STORAGE_KEY, username)
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, isLoggedIn, login, logout }
})
