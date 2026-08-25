<script setup>
import { nextTick, ref } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
const tabElements = ref([])

function selectTab(tab, { focus = false } = {}) {
  emit('update:modelValue', tab.id)
  if (focus) nextTick(() => tabElements.value[props.tabs.findIndex((item) => item.id === tab.id)]?.focus({ preventScroll: true }))
}

function handleKeydown(event, index) {
  let nextIndex = null
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectTab(props.tabs[index], { focus: true })
    return
  }
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % props.tabs.length
  if (event.key === 'ArrowLeft') nextIndex = (index - 1 + props.tabs.length) % props.tabs.length
  if (event.key === 'Home') nextIndex = 0
  if (event.key === 'End') nextIndex = props.tabs.length - 1
  if (nextIndex === null) return
  event.preventDefault()
  selectTab(props.tabs[nextIndex], { focus: true })
}
</script>

<template>
  <div class="border-y-2 border-black bg-[#F2ECE1] shadow-[0_5px_0_rgba(0,0,0,0.18)]">
    <div class="grid grid-cols-2 md:grid-cols-4" role="tablist" aria-label="Résumé sections">
      <button
        v-for="(tab, index) in tabs"
        :id="`tab-${tab.id}`"
        :key="tab.id"
        :ref="(element) => { if (element) tabElements[index] = element }"
        type="button"
        role="tab"
        class="inline-flex min-h-14 w-full min-w-0 touch-manipulation cursor-pointer items-center justify-center gap-2 border-b-2 border-r-2 border-[#111111] bg-[#F2ECE1] px-4 py-[0.8rem] text-[0.78rem] font-extrabold uppercase tracking-[0.04em] text-[#111111] transition-shadow duration-150 ease-[ease] even:border-r-0 nth-[n+3]:border-b-0 [&[aria-selected=false]:hover]:[box-shadow:inset_0_-6px_0_#ff5c35] aria-selected:[box-shadow:inset_0_-6px_0_#ff5c35] focus-visible:z-10 focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600 md:min-h-15 md:border-b-0 md:border-r-2 md:even:border-r-2 md:[&:last-child]:border-r-0 motion-reduce:duration-[0.01ms]"
        :aria-selected="modelValue === tab.id"
        :aria-controls="tab.id"
        :tabindex="modelValue === tab.id ? 0 : -1"
        @click="selectTab(tab)"
        @keydown="handleKeydown($event, index)"
      >
        <span>{{ tab.label }}</span>
        <sup v-if="tab.count" class="font-mono text-[0.65rem]">{{ tab.count }}</sup>
      </button>
    </div>
  </div>
</template>
