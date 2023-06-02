import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useEventSource } from "@vueuse/core"

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  const { status, data, error, close } = useEventSource(
    "http://localhost:3000/counter",
  );

  return { count, doubleCount, increment, status, data, error, close }
})
