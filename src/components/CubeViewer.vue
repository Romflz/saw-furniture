<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps<{
  color: string
  size: number
  bgColor: string
}>()

const container = ref<HTMLDivElement | null>(null)

// Threejs objects live outside Vue reactivity, so plain let bindings.
// We assign them in onMounted and dispose in onBeforeUnmount (To avoid momory leaks)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> | null =
  null
let controls: OrbitControls | null = null
let raf = 0
let resizeObserver: ResizeObserver | null = null

// Entry. Build the scene once the container div is in the DOM.
onMounted(() => {
  const el = container.value
  if (!el) return // Add proper error handling in prod.

  // Initial size for renderer + camera aspect. ResizeObserver handles changes.
  const width = el.clientWidth
  const height = el.clientHeight

  // Scene holds everything (lights, meshes, helpers). Background is the
  // backdrop color that fills the canvas behind all 3D objects.
  scene = new THREE.Scene()
  scene.background = new THREE.Color(props.bgColor)

  // Perspective camera: (vertical FOV, aspect, near clip, far clip).
  // Position is in world units (x=right, y=up, z=toward viewer).
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(3, 2.5, 4)

  // Renderer creates its own canvas. We mount it inside our container div.
  // antialias smooths edges; pixel ratio keeps it sharp on Retina screens.
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  el.appendChild(renderer.domElement)

  // ----- Lights -----

  // Ambient: flat, directionless brightness floor so shadowed faces aren't black.
  scene.add(new THREE.AmbientLight(0xffffff, 0.6))

  // Key light: bright white directional from upper-right. Defines the cube's form.
  const dir = new THREE.DirectionalLight(0xffffff, 1.1)
  dir.position.set(5, 10, 7)
  scene.add(dir)

  // Fill light: weaker amber from the opposite side. Softens shadows + warms tone.
  const fill = new THREE.DirectionalLight(0xfbbf24, 0.4)
  fill.position.set(-6, -3, -5)
  scene.add(fill)

  // Floor grid for visual reference. Slight y-offset prevents z-fighting with cube. Would be the floor in prod or something similar.
  // Usually would restrict the camera going below it
  const grid = new THREE.GridHelper(20, 20, 0x57534e, 0x292524)
  grid.position.y = -1.001
  scene.add(grid)

  // ----- Cube -----

  // Geometry = the shape. Material = how it reacts to light. Mesh combines them.
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: props.color,
    roughness: 0.55,
    metalness: 0.05,
  })
  cube = new THREE.Mesh(geometry, material)
  cube.scale.setScalar(props.size)
  scene.add(cube)

  // OrbitControls: drag to rotate, scroll to zoom, right-click to pan.
  // Damping adds momentum so movement feels smooth instead of snappy.
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 2
  controls.maxDistance = 12

  // Render loop: 60fps. controls.update() advances damping each frame.
  const animate = () => {
    raf = requestAnimationFrame(animate)
    controls?.update()
    if (renderer && scene && camera) renderer.render(scene, camera)
  }
  animate()

  // Keep canvas + camera in sync with container size on any layout change.
  // The synchronous render after setSize prevents a black flicker on resize.
  resizeObserver = new ResizeObserver(() => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h || !camera || !renderer || !scene) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    renderer.render(scene, camera)
  })
  resizeObserver.observe(el)
})

// Reactive prop watchers: patch live Threejs objects in place.
// No scene rebuild needed; next render picks up the change.
watch(
  () => props.color,
  (next) => {
    cube?.material.color.set(next)
  },
)

watch(
  () => props.size,
  (next) => {
    cube?.scale.setScalar(next)
  },
)

watch(
  () => props.bgColor,
  (next) => {
    if (scene?.background instanceof THREE.Color) {
      scene.background.set(next)
    }
  },
)

// GPU resources aren't garbagecollected by JS. Dispose explicitly to avoid leaks. As mentioned above
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  controls?.dispose()
  cube?.geometry.dispose()
  cube?.material.dispose()
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<template>
  <div ref="container" class="h-full w-full" />
</template>
