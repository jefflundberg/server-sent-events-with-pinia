<script setup>
import { computed } from "vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const counterStore = useCounterStore();
const { data, status } = storeToRefs(counterStore);
const counter = computed(() => {
  return JSON.parse(data.value)?.ticker
});

const closeConnection = () => {
  counterStore.close();
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      This is a sample component that uses a Pinia Store that maintains an SSE connection for live updates from the server
    </h3>
    <div v-if="data">Data: {{ data }}</div>
    <div v-if="counter">Counter: {{ counter }}</div>
    <div v-if="status">Status: {{ status }}</div>
    <div>
      <button @click="closeConnection">Close Connection</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
