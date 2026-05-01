<script setup lang="ts">
import { ref } from 'vue'
import CubeViewer from '../components/CubeViewer.vue'

const woodTones = [
  { name: 'Walnut', value: '#5c3a21' },
  { name: 'Mahogany', value: '#762f26' },
  { name: 'Oak', value: '#c68642' },
  { name: 'Maple', value: '#e8c77c' },
  { name: 'Ash', value: '#a89580' },
  { name: 'Ebony', value: '#1f1410' },
]

const backdrops = [
  { name: 'Studio', value: '#1c1917' },
  { name: 'Linen', value: '#f5f0e8' },
  { name: 'Slate', value: '#475569' },
  { name: 'Sand', value: '#d6c5a8' },
  { name: 'Forest', value: '#1f3a2e' },
  { name: 'Clay', value: '#8b4513' },
]

const color = ref(woodTones[0].value)
const width = ref(1)
const height = ref(1)
const depth = ref(1)
const bgColor = ref(backdrops[0].value)

const dimensionAxes = [
  { label: 'Width', model: width },
  { label: 'Height', model: height },
  { label: 'Depth', model: depth },
] as const
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:py-10">
    <header class="mb-4 sm:mb-6 lg:mb-8">
      <p class="text-[11px] font-medium uppercase tracking-wider text-amber-700 sm:text-xs">
        Workshop preview
      </p>
      <h1
        class="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl lg:text-3xl"
      >
        Customize your piece
      </h1>
      <p class="mt-1 text-xs text-stone-500 sm:text-sm">
        Adjust the wood finish and dimensions. Drag to rotate the camera.
      </p>
    </header>

    <div class="grid gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
      <div
        class="relative h-[55vh] min-h-72 overflow-hidden rounded-xl bg-stone-900 shadow-md ring-1 ring-stone-200 sm:h-[60vh] sm:rounded-2xl sm:shadow-lg lg:h-[70vh]"
      >
        <CubeViewer
          :color="color"
          :width="width"
          :height="height"
          :depth="depth"
          :bg-color="bgColor"
        />
        <div
          class="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/45 px-2 py-1 text-[10px] font-medium text-white/85 backdrop-blur sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-[11px]"
        >
          Drag to rotate, pinch to zoom
        </div>
      </div>

      <aside
        class="space-y-5 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:space-y-6 sm:rounded-2xl sm:p-5"
      >
        <div>
          <div class="mb-3 flex items-baseline justify-between">
            <h2 class="text-sm font-semibold text-stone-900">Wood finish</h2>
            <span class="text-xs text-stone-500">
              {{ woodTones.find((t) => t.value === color)?.name ?? 'Custom' }}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
            <button
              v-for="tone in woodTones"
              :key="tone.value"
              type="button"
              :title="tone.name"
              :aria-label="tone.name"
              :aria-pressed="color === tone.value"
              class="aspect-square rounded-lg ring-2 ring-transparent transition active:scale-95 sm:hover:scale-105"
              :class="
                color === tone.value
                  ? 'ring-amber-600 ring-offset-2 ring-offset-white'
                  : 'ring-stone-200'
              "
              :style="{ backgroundColor: tone.value }"
              @click="color = tone.value"
            />
          </div>

          <label
            class="mt-3 flex items-center justify-between gap-3 rounded-lg border border-stone-200 px-3 py-2"
          >
            <span class="text-xs font-medium text-stone-600">Custom color</span>
            <input
              v-model="color"
              type="color"
              class="h-8 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
            />
          </label>
        </div>

        <div>
          <div class="mb-3 flex items-baseline justify-between">
            <h2 class="text-sm font-semibold text-stone-900">Backdrop</h2>
            <span class="text-xs text-stone-500">
              {{ backdrops.find((b) => b.value === bgColor)?.name ?? 'Custom' }}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
            <button
              v-for="bg in backdrops"
              :key="bg.value"
              type="button"
              :title="bg.name"
              :aria-label="bg.name"
              :aria-pressed="bgColor === bg.value"
              class="aspect-square rounded-lg ring-2 ring-transparent transition active:scale-95 sm:hover:scale-105"
              :class="
                bgColor === bg.value
                  ? 'ring-amber-600 ring-offset-2 ring-offset-white'
                  : 'ring-stone-200'
              "
              :style="{ backgroundColor: bg.value }"
              @click="bgColor = bg.value"
            />
          </div>

          <label
            class="mt-3 flex items-center justify-between gap-3 rounded-lg border border-stone-200 px-3 py-2"
          >
            <span class="text-xs font-medium text-stone-600">Custom backdrop</span>
            <input
              v-model="bgColor"
              type="color"
              class="h-8 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
            />
          </label>
        </div>

        <div>
          <h2 class="mb-3 text-sm font-semibold text-stone-900">Dimensions</h2>
          <div class="space-y-4">
            <div v-for="axis in dimensionAxes" :key="axis.label">
              <div class="mb-1 flex items-baseline justify-between">
                <span class="text-xs font-medium text-stone-600">
                  {{ axis.label }}
                </span>
                <span class="font-mono text-xs text-stone-500">
                  {{ axis.model.value.toFixed(2) }}m
                </span>
              </div>
              <input
                v-model.number="axis.model.value"
                type="range"
                min="0.4"
                max="2.5"
                step="0.05"
                class="h-2 w-full cursor-pointer accent-amber-700"
              />
              <div class="mt-1 flex justify-between text-[11px] text-stone-400">
                <span>0.4m</span>
                <span>2.5m</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="border-t border-stone-200 pt-3 text-[11px] leading-relaxed text-stone-500 sm:pt-4 sm:text-xs"
        >
          Preview only. Final pieces are crafted to your exact specs in our
          workshop.
        </div>
      </aside>
    </div>
  </section>
</template>
