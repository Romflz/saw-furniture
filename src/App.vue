<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import LogoIcon from './assets/icons/logo.svg'
import LogoutIcon from './assets/icons/logout.svg'

const auth = useAuthStore()
const router = useRouter()

function onLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <nav
    v-if="auth.isLoggedIn"
    class="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur"
  >
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
      <RouterLink to="/" class="flex items-center gap-2.5 group">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-amber-600 to-orange-700 text-white shadow-sm ring-1 ring-amber-700/20 transition group-hover:shadow-md"
        >
          <LogoIcon class="h-5 w-5" />
        </span>
        <span class="flex flex-col leading-tight">
          <span class="text-base font-semibold tracking-tight text-stone-900">
            Saw<span class="text-amber-700"> Ltd</span>
          </span>
          <span
            class="hidden text-[11px] font-medium uppercase tracking-wider text-stone-400 sm:block"
          >
            Custom Furniture
          </span>
        </span>
      </RouterLink>

      <div class="ml-auto flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 active:bg-stone-100 focus:outline-none focus:ring-4 focus:ring-stone-900/10"
          @click="onLogout"
        >
          <LogoutIcon class="h-4 w-4 text-stone-500" />
          <span class="hidden sm:inline">Log out</span>
        </button>
      </div>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
