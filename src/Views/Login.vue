<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LogoIcon from '../assets/icons/logo.svg'
import CheckIcon from '../assets/icons/check.svg'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  await new Promise((r) => setTimeout(r, 250))
  if (auth.login(username.value, password.value)) {
    router.push({ name: 'home' })
  } else {
    error.value = 'Invalid username or password'
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen grid lg:grid-cols-2 bg-white">
    <!-- Form side -->
    <div class="flex items-center justify-center px-6 py-10 sm:px-10">
      <div class="w-full max-w-sm">
        <div class="mb-10 flex items-center gap-2">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-amber-600 to-orange-700 text-white shadow-sm"
          >
            <LogoIcon class="h-5 w-5" />
          </div>
          <span class="text-base font-semibold tracking-tight text-gray-900">
            Saw<span class="text-amber-700"> Ltd</span>
          </span>
        </div>

        <header class="space-y-2 mb-8">
          <h1
            class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            Sign in to your workshop
          </h1>
          <p class="text-sm text-gray-500">
            Welcome back. Use
            <span class="font-medium text-gray-700">demo</span> /
            <span class="font-medium text-gray-700">demo123</span> to continue.
          </p>
        </header>

        <form class="space-y-5" @submit.prevent="onSubmit">
          <div class="space-y-1.5">
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              autocomplete="username"
              required
              placeholder="demo"
              class="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
            />
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="••••••••"
              class="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
            />
          </div>

          <p
            v-if="error"
            class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200"
          >
            {{ error }}
          </p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-gray-900 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-gray-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Marketing side -->
    <div
      class="relative hidden overflow-hidden bg-linear-to-br from-stone-900 via-amber-950 to-orange-950 lg:block"
    >
      <div
        class="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_25%_15%,white_1px,transparent_1px),radial-gradient(circle_at_75%_85%,white_1px,transparent_1px)] bg-size-[42px_42px]"
      />
      <div
        class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500/25 blur-3xl"
      />
      <div
        class="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-orange-600/25 blur-3xl"
      />

      <div
        class="relative flex h-full flex-col justify-between p-12 text-white"
      >
        <div />

        <div class="space-y-6 max-w-md">
          <h2 class="text-4xl font-semibold leading-tight tracking-tight">
            Furniture, made to fit your space.
          </h2>
          <p class="text-base text-white/70 leading-relaxed">
            Bespoke pieces, measured, crafted in our workshop, and delivered to
            your door. Customize every joint, finish, and dimension.
          </p>
          <ul class="space-y-3 text-sm text-white/80">
            <li class="flex items-center gap-3">
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
              >
                <CheckIcon class="h-3 w-3" />
              </span>
              Sustainably sourced hardwoods
            </li>
            <li class="flex items-center gap-3">
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
              >
                <CheckIcon class="h-3 w-3" />
              </span>
              Made-to-measure customization
            </li>
            <li class="flex items-center gap-3">
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
              >
                <CheckIcon class="h-3 w-3" />
              </span>
              White-glove delivery & assembly
            </li>
          </ul>
        </div>

        <p class="text-xs text-white/50">
          © {{ new Date().getFullYear() }} Saw Ltd. Crafted in our workshop.
        </p>
      </div>
    </div>
  </div>
</template>
