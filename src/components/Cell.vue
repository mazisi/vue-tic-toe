<template>
  <button class="cell" :class="cellClass" @click="handleClick">{{ value }}</button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{ value: string | null }>();
const emit = defineEmits<{ cellClick: [] }>();

function handleClick() {
  if (!props.value) emit('cellClick');
}


const cellClass = computed(() => {
  if (props.value === 'X') return 'player-move';
  if (props.value === 'O') return 'bot-move';
  return '';
});
</script>

<style scoped>
.cell {
  width: 100px;
  height: 100px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  cursor: pointer;
}

.player-move {
  background-color: #a1c4fd; 
  color: #007bff; 
}

.bot-move {
  background-color: #fdcb9e; 
  color: #ff6f00; 
}
</style>
